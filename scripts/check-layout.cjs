// Deck layout regression check.
// The deck track scrolls horizontally by design, so page-level overflow is not
// the signal here. What matters per slide: content must not overflow the
// viewport vertically (a slide that needs scrolling has failed as a slide),
// text must not clip, and controls must stay thumb-sized.
const { chromium } = require('playwright-core')

const URL = process.env.URL || 'http://127.0.0.1:4181/portfolio-v2/'
const CHROME =
  process.env.CHROME ||
  `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`

const VIEWPORTS = [
  ['mobile-small', 320, 568],
  ['mobile', 390, 844],
  ['mobile-tall', 412, 915],
  // Phone held sideways. Orientation is deliberately not locked, so this
  // must stay a passing layout rather than a "please rotate" wall.
  ['mobile-landscape', 844, 390],
  ['tablet', 768, 1024],
  ['laptop', 1366, 768],
  ['desktop', 1920, 1080],
]

;(async () => {
  const browser = await chromium.launch({ executablePath: CHROME })
  let failures = 0

  for (const [name, width, height] of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width, height } })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(400)

    const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length)
    const problems = []
    if (!slideCount) {
      const count = await page.locator('.story-page').count()
      if (!count) throw new Error('No portfolio pages rendered')
      console.log(`PASS ${name} ${width}x${height} (${count} portrait pages; full navigation/content checked by check-parity)`)
      await page.close()
      continue
    }

    for (let i = 0; i < slideCount; i++) {
      // Advance with the same mechanism a user has, so we also prove paging works.
      if (i > 0) await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(450)

      const r = await page.evaluate((idx) => {
        const slide = document.querySelectorAll('.slide')[idx]
        const inner = slide.querySelector('.slide-inner')
        const vw = document.documentElement.clientWidth

        // Horizontal snap carousels intentionally place children past the
        // fold. Walk the full ancestor chain, not just up to the slide — the
        // scroller may be styled from CSS rather than an inline class.
        const insideScroller = (el) => {
          for (let p = el.parentElement; p; p = p.parentElement) {
            const o = getComputedStyle(p).overflowX
            if (o === 'auto' || o === 'scroll') return true
          }
          return false
        }

        const clipped = []
        // Controls are checked alongside text: a nav button hanging off the
        // viewport edge is worse than clipped prose, and the text-only scan
        // used to miss it entirely.
        for (const el of slide.querySelectorAll('h1,h2,h3,p,li,span,a,figcaption')) {
          const b = el.getBoundingClientRect()
          if (b.width <= 1 || b.height <= 1) continue
          if (!insideScroller(el) && (b.right > vw + 1 || b.left < -1)) {
            clipped.push(el.textContent.slice(0, 40))
          }
        }
        // Fixed chrome lives outside .slide, so scan the document for it once.
        for (const el of document.querySelectorAll('a,button')) {
          const b = el.getBoundingClientRect()
          if (b.width <= 1 || b.height <= 1) continue
          if (insideScroller(el)) continue
          if (b.right > vw + 1 || b.left < -1) {
            clipped.push(`CONTROL ${el.getAttribute('aria-label') || el.textContent.slice(0, 20)}`)
          }
        }

        const smallTaps = []
        for (const el of slide.querySelectorAll('a,button')) {
          const b = el.getBoundingClientRect()
          if (b.width === 0 || b.height <= 1) continue
          if (getComputedStyle(el).display === 'inline') continue
          if (b.height < 24) smallTaps.push({ t: el.textContent.slice(0, 24), h: Math.round(b.height) })
        }

        return {
          id: slide.id,
          // getBoundingClientRect reports post-zoom visual pixels, whereas
          // scrollHeight reports pre-zoom layout units. Since short viewports
          // apply a zoom to fit, only the rect is a truthful measure here.
          verticalOverflow: Math.round(inner.getBoundingClientRect().height) - Math.round(slide.clientHeight),
          clipped,
          smallTaps,
          active: slide.getAttribute('data-active'),
        }
      }, i)

      // 2px tolerance absorbs subpixel rounding in layout.
      if (r.verticalOverflow > 2) problems.push(`${r.id}: content overflows fold by ${r.verticalOverflow}px`)
      if (r.clipped.length) problems.push(`${r.id}: clipped ${JSON.stringify(r.clipped.slice(0, 3))}`)
      if (r.smallTaps.length) problems.push(`${r.id}: small taps ${JSON.stringify(r.smallTaps.slice(0, 3))}`)
      if (r.active !== 'true') problems.push(`${r.id}: did not become active after paging (index desync)`)
    }

    if (problems.length) {
      failures++
      console.log(`FAIL ${name} ${width}x${height}`)
      problems.slice(0, 6).forEach((p) => console.log(`     ${p}`))
      if (problems.length > 6) console.log(`     ... +${problems.length - 6} more`)
    } else {
      console.log(`PASS ${name} ${width}x${height} (${slideCount} slides)`)
    }
    await page.close()
  }

  await browser.close()
  console.log(failures === 0 ? '\nAll viewports OK' : `\n${failures} viewport(s) with defects`)
  process.exit(failures === 0 ? 0 : 1)
})()
