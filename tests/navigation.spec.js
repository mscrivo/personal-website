import { test, expect } from '@playwright/test'

test('desktop shows nav links and hides the hamburger', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'desktop-only layout')

  await page.goto('/')
  for (const label of ['About', 'Projects', 'Experience', 'Contact']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible()
  }
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()
})

test('mobile hamburger opens and closes the menu', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only layout')

  await page.goto('/')
  const openBtn = page.getByRole('button', { name: 'Open menu' })
  await expect(openBtn).toBeVisible()

  await openBtn.click()
  const closeBtn = page.getByRole('button', { name: 'Close menu' })
  await expect(closeBtn).toBeVisible()

  await closeBtn.click()
  await expect(openBtn).toBeVisible()
})
