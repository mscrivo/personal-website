import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test('renders the title and every section heading', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Michael Scrivo/)

    // Section headings (rendered outside the 3D canvases).
    for (const heading of ['About Me', 'Technologies', 'Work Experience']) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    }
    await expect(
      page.getByRole('heading', { name: 'Projects' }).first(),
    ).toBeVisible()
    // "Get in touch" is a styled <p>, not a heading (exact match avoids the
    // Hero's "Get In Touch" CTA link).
    await expect(page.getByText('Get in touch', { exact: true })).toBeVisible()
  })

  test('shows the contact email and LinkedIn link', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('mscrivo [at] gmail [dot] com')).toBeVisible()
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/michaelscrivo/',
    )
  })
})
