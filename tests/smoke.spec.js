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

test.describe('without WebGL', () => {
  // Firefox can fail to create a WebGL context; that used to throw inside the
  // tech balls effect and unmount the whole app once the section scrolled in.
  test('page survives scrolling past the tech section', async ({ page }) => {
    await page.addInitScript(() => {
      const getContext = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        return type.startsWith('webgl')
          ? null
          : getContext.call(this, type, ...rest)
      }
    })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    // The WebGL chunk loads lazily once the section is near the viewport.
    const chunk = page.waitForResponse(/TechBallsOGL/)
    await page
      .getByRole('heading', { name: 'Technologies' })
      .scrollIntoViewIfNeeded()
    await chunk
    await page.waitForTimeout(500)
    await page
      .getByText('Get in touch', { exact: true })
      .scrollIntoViewIfNeeded()
    await expect(page.getByText('Get in touch', { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeAttached()
    expect(errors).toEqual([])
  })
})
