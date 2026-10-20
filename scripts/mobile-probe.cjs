
const { chromium } = require('playwright-core')
const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`
;(async () => {
  const b = await chromium.launch({ executablePath: CHROME })
  // real phone metrics incl. landscape, which is what "force landscape" would give
  for (const [tag,w,h] of [['portrait',390,844],['landscape',844,390],['se',375,667]]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:3, isMobile:true, hasTouch:true })
    await p.goto('http://127.0.0.1:4181/portfolio-v2/', {waitUntil:'networkidle'})
    await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(500)
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(600)
    const r = await p.evaluate(()=>{
      const s=document.querySelectorAll('.slide')[1]
      const inner=s.querySelector('.slide-inner')
      const cs=getComputedStyle(inner)
      const body=[...s.querySelectorAll('li span:last-child, p')].map(e=>parseFloat(getComputedStyle(e).fontSize))
      const dots=[...document.querySelectorAll('button[aria-label^="Go to"]')].map(d=>{const r=d.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]})
      const fit=Math.round(inner.getBoundingClientRect().height)-s.clientHeight
      return {zoom:cs.zoom, minBodyPx:Math.min(...body), bodySizes:[...new Set(body)].sort(), dot:dots[0], dotCount:dots.length, fitDelta:fit, h2:getComputedStyle(s.querySelector('h2')).fontSize}
    })
    console.log(tag, w+'x'+h, JSON.stringify(r))
    await p.screenshot({path:`/tmp/m-${tag}.png`})
    await p.close()
  }
  await b.close()
})()
