import { test, expect } from '@playwright/test'

test('karir: kosong, navigasi, form responsif, validasi dan hasil kirim', async ({ page, isMobile }, testInfo) => {
  test.setTimeout(60000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/karir')
  await expect(page.locator('.career-empty')).toBeVisible()
  await expect(page.locator('form[name="career"]')).toHaveCount(0)

  // Populate only this browser's navigation payload, never the published CMS content.
  await page.route('**/karir/_payload.json*', async route => {
    const response = await route.fetch()
    const payload = await response.json()
    const data = payload[payload[payload[0].data][1]]
    const append = (value: any): number => {
      const index = payload.length
      payload.push(null)
      payload[index] = Array.isArray(value) ? value.map(append)
        : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, val]) => [key, append(val)])) : value
      return index
    }
    payload[data['career-jobs']] = [append({ title: 'Site Engineer — Pengawasan Proyek Konstruksi', path: '/karir/site-engineer', location: 'Sukabumi',
      employmentType: 'Penuh waktu', description: 'Koordinasi pekerjaan dan pengawasan mutu proyek.', active: true,
      body: { type: 'minimark', value: [['p', {}, 'Pengalaman di bidang konstruksi.']] } })]
    await route.fulfill({ response, json: payload })
  })
  await page.goto('/')
  // Open the hydrated menu before injecting client-only jobs: a document reload
  // would pair empty server HTML with mocked non-empty data and cause a mismatch.
  if (isMobile) await page.getByRole('button', { name: 'Buka menu' }).click()
  const navigation = page.getByRole('navigation', { name: isMobile ? 'Navigasi seluler' : 'Navigasi utama', exact: true })
  await navigation.getByRole('button', { name: 'Perusahaan' }).click()
  await navigation.getByRole('link', { name: /Karir/ }).click()
  await expect(page.locator('.career-card')).toHaveCount(1)
  await expect(page.locator('.career-grid')).not.toHaveClass(/career-empty/)
  const grid = await page.locator('.career-grid').boundingBox()
  const card = await page.locator('.career-card').boundingBox()
  expect(card!.width).toBeGreaterThan(grid!.width - 2)
  await page.getByRole('button', { name: 'Lamar posisi ini' }).click()
  await expect(page.getByRole('textbox', { name: 'Nama lengkap' })).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const panel = page.locator('.career-form-panel')
  expect(await panel.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)
  await page.screenshot({ path: `artifacts/karir-form-${testInfo.project.name}.png`, fullPage: true })
  await page.getByRole('button', { name: 'Kirim Lamaran' }).click()
  await expect(page.getByText('Masukkan nama minimal 2 karakter.')).toBeVisible()
  await page.getByRole('textbox', { name: 'Nama lengkap' }).fill('Pelamar Pengujian')
  await page.getByRole('textbox', { name: 'Nomor telepon' }).fill('081234567890')
  await page.getByRole('textbox', { name: 'Alamat email' }).fill('pelamar@example.com')
  await page.getByRole('textbox', { name: 'Tautan CV' }).fill('https://example.com/cv.pdf')
  await page.getByRole('textbox', { name: 'Pesan pengantar' }).fill('Saya memiliki pengalaman mengawasi pekerjaan konstruksi.')
  await page.getByRole('checkbox').check()
  let submitted: URLSearchParams | undefined
  await page.route('**/', async route => {
    if (route.request().method() !== 'POST') return route.continue()
    submitted = new URLSearchParams(route.request().postData() || '')
    await route.fulfill({ status: 200, body: '' })
  })
  await page.getByRole('button', { name: 'Kirim Lamaran' }).click()
  await expect(page.getByRole('status')).toContainText('Lamaran Anda sudah terkirim')
  expect(submitted?.get('form-name')).toBe('career')
  expect(submitted?.get('subject')).toContain('Pelamar Pengujian')
  expect(submitted?.get('position')).toContain('Site Engineer')
  await expect(page.getByRole('textbox', { name: 'Nama lengkap' })).toHaveValue('')
})

test('navbar ringkas dan gambar Nuxt Image', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) await page.getByRole('button', { name: 'Buka menu' }).click()
  const navigation = page.getByRole('navigation', { name: isMobile ? 'Navigasi seluler' : 'Navigasi utama', exact: true })
  await navigation.getByRole('button', { name: 'Perusahaan' }).click()
  await navigation.getByRole('link', { name: /Karir/ }).click()
  await expect(page).toHaveURL(/\/karir$/)
  await expect(page.locator('.career-showcase-photo img')).toHaveAttribute('src', /\/_ipx\//)
  await expect.poll(() => page.locator('.career-showcase-photo img').evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('navbar tablet tetap menyediakan kontak tanpa bertumpuk', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto('/karir')
  const header = page.getByRole('banner')
  await expect(header.getByRole('link', { name: 'Diskusi Proyek' })).toBeVisible()
  const links = await header.locator('a:visible').all()
  let previousRight = 0
  for (const link of links) {
    const box = await link.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(previousRight)
    previousRight = box!.x + box!.width
  }
  expect(previousRight).toBeLessThanOrEqual(1024)
})
