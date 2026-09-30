import { test, expect } from '@playwright/test'

test('navbar dan form karir memiliki CSS komponen pada hasil build', async ({ page, isMobile }) => {
  await page.goto('/')
  await expect(page.locator('.site-header')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Buka menu' })
    await expect(menu).toHaveCSS('padding', '6px')
  } else {
    const links = page.getByRole('navigation', { name: 'Navigasi utama' }).locator('[data-slot="link"]')
    await expect(links.first()).toHaveCSS('padding', '6px 10px')
    await expect(page.getByRole('link', { name: 'Diskusi Proyek' })).toHaveCSS('padding', '6px 10px')
  }

  await page.goto('/karir')
  const panel = page.locator('.career-form-panel')
  await panel.scrollIntoViewIfNeeded()
  await expect(panel).toHaveCSS('background-color', 'rgb(250, 250, 248)')
  await expect(panel).toHaveCSS('border-top-width', '3px')
  await expect(page.locator('.career-form [name="name"]')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  const formGrid = page.locator('.career-form .form-grid').first()
  await expect(formGrid).toHaveCSS('display', 'grid')
  const columns = await formGrid.evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)
  expect(columns).toBe(isMobile ? 1 : 2)
})
