
const { chromium } = require('playwright-core')
const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`
;(async () => {
  const b = await chromium.launch({ executablePath: CHROME })
  for (const [w,h] of [[1920,1080],[1600,900],[1366,768],[2560,1440]]) {
    const p = await b.newPage({ viewport:{width:w,height:h} })
    await p.goto('http://127.0.0.1:4181/portfolio-v2/', {waitUntil:'networkidle'})
    await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(350)
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(600)
    const r = await p.evaluate(()=>{
      const vw=document.documentElement.clientWidth
      const inner=document.querySelectorAll('.slide')[1].querySelector('.slide-inner')
      const ib=inner.getBoundingClientRect()
      const cs=getComputedStyle(inner)
      const h2=document.querySelectorAll('.slide')[1].querySelector('h2').getBoundingClientRect()
      return {vw, innerL:Math.round(ib.left), innerR:Math.round(ib.right), innerW:Math.round(ib.width),
              padL:cs.paddingLeft, maxW:cs.maxWidth, gutter:Math.round(ib.left), h2w:Math.round(h2.width)}
    })
    console.log(w+'x'+h, JSON.stringify(r))
    await p.close()
  }
  await b.close()
})()
