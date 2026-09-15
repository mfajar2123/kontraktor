import { test, expect } from '@playwright/test'

test('all routes render with unique metadata, one heading, and no overflow', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error' || /hydration/i.test(message.text())) errors.push(message.text()) })
  const titles = new Set<string>()
  for (const route of ['/', '/experience', '/stack', '/about', '/contact', '/resume']) {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
    titles.add(await page.title())
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (route === '/') {
      await expect(page.locator('.portrait')).toBeVisible()
      expect(await page.locator('.portrait').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
    }
  }
  expect(titles.size).toBe(6)
  expect(errors).toEqual([])
})

test('contact intent generates appropriate email and clipboard feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/contact')
  const email = page.getByRole('link', { name: 'Write an email' })
  expect(decodeURIComponent(await email.getAttribute('href') || '')).toContain('Project overview:')
  await page.getByLabel('I’m hiring', { exact: true }).check()
  expect(decodeURIComponent(await email.getAttribute('href') || '')).toContain('Company:')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('status')).toContainText('Email copied.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('mfajar2123@gmail.com')
})

test('mobile menu opens, closes with Escape and navigates', async ({ page, isMobile }) => {
  test.skip(!isMobile)
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Experience', exact: true }).click()
  await expect(page).toHaveURL(/\/experience$/)
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('reduced motion and printable résumé', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await page.locator('.hero-visual').evaluate(el => getComputedStyle(el).animationName)).toBe('none')
  await page.goto('/resume')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.site-header')).not.toBeVisible()
  await expect(page.locator('.resume-actions')).not.toBeVisible()
  await expect(page.getByRole('heading', { name: 'Muhamad Fajar', exact: true })).toBeVisible()
})
