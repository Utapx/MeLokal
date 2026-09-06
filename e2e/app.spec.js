import { expect, test } from '@playwright/test'

const mainRoutes = ['/', '/explore', '/map', '/plan', '/favorites', '/about']

test('main routes render successfully', async ({ page }) => {
  for (const route of mainRoutes) {
    const response = await page.goto(route)
    expect(response?.ok(), `${route} should return a successful response`).toBe(true)
    await expect(page.locator('main')).toBeVisible()
  }
})

test('planner falls back safely for an invalid destination', async ({ page }) => {
  await page.goto('/plan?destination=unknown')

  await expect(page.getByRole('heading', { name: 'Smart Trip Planner' })).toBeVisible()
  await expect(page.getByRole('combobox')).toHaveValue('center')
})

test('footer navigates to About without a full page route failure', async ({ page }) => {
  await page.goto('/favorites')
  await page.getByRole('link', { name: 'About MeLokal' }).click()

  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
})

test('mobile navigation exposes a clear Home link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/explore')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.getByRole('link', { name: 'Home', exact: true }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('link', { name: 'Explore Indonesia', exact: true })).toBeVisible()
})

test('mobile header fits without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/map')

  const layoutWidth = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }))
  expect(layoutWidth.documentWidth).toBeLessThanOrEqual(layoutWidth.viewportWidth)

  const logo = await page.getByRole('link', { name: 'MeLokal home' }).boundingBox()
  const language = await page.getByRole('button', { name: 'Switch language' }).boundingBox()
  const menu = await page.getByRole('button', { name: 'Open navigation menu' }).boundingBox()

  expect(logo).not.toBeNull()
  expect(language).not.toBeNull()
  expect(menu).not.toBeNull()
  expect(logo.x + logo.width).toBeLessThan(language.x)
  expect(language.x + language.width).toBeLessThan(menu.x)
})
