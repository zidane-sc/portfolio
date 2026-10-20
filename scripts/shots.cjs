
const { chromium } = require('playwright-core')
const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`
;(async () => {
  const b = await chromium.launch({ executablePath: CHROME })
  const grab = async (tag, w, h, steps) => {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 })
    await p.goto('http://127.0.0.1:4181/portfolio-v2/', {waitUntil:'networkidle'})
    await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(700)
    await p.screenshot({path:`/tmp/deck-${tag}-00.png`})
    for (let i=1;i<=steps;i++){ await p.keyboard.press('ArrowRight'); await p.waitForTimeout(650) }
    await p.screenshot({path:`/tmp/deck-${tag}-${String(steps).padStart(2,'0')}.png`})
    await p.close()
  }
  await grab('mobile', 390, 844, 1)   // cover -> first case
  await grab('mobile-k', 390, 844, 6) // kamiko (images)
  await grab('desk', 1600, 900, 1)
  await grab('desk-k', 1600, 900, 6)
  await b.close()
})()
