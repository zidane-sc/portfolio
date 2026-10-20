const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const { chromium } = require('playwright-core')
;(async () => {
 const source = fs.readFileSync('src/data/work.ts','utf8').replaceAll('import.meta.env.BASE_URL',"'/portfolio-v2/'")
 const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText
 const {cases,profile,alsoShipped,facts,closing} = await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'))
 const expected = [profile.name,profile.role,profile.thesis,profile.location,...Object.values(closing),...facts]
 for(const c of cases){ assert(c.actions.length<=4); expected.push(c.org,c.title,c.role,c.period,c.problem,...c.actions,...c.stack,...(c.features||[]).flatMap(f=>[f.name,f.detail])) }
 for(const p of alsoShipped) expected.push(p.org,p.what,p.detail,...p.stack,...(p.link?[p.link.label]:[]))
 const links=[profile.cv,`mailto:${profile.email}`,profile.github,profile.linkedin,...alsoShipped.flatMap(p=>p.link?[p.link.url]:[])]
 const browser=await chromium.launch({executablePath:`${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome`})
 for(const [width,height,mobile] of [[1366,768,false],[1920,1080,false],[768,1024,false],[320,568,true],[390,844,true],[412,915,true],[844,390,true]]){
  const page=await browser.newPage({viewport:{width,height},isMobile:mobile,hasTouch:mobile,reducedMotion:'reduce'})
  const errors=[];page.on('pageerror',e=>errors.push(e.message))
  await page.goto(process.env.URL||'http://127.0.0.1:4181/portfolio-v2/',{waitUntil:'networkidle'})
  const selector=mobile?'.story-page':'.slide'
  const count=await page.locator(selector).count();assert(count>cases.length)
  let text=''; const hrefs=new Set()
  for(let i=0;i<count;i++){
   if(mobile){if(i) await page.getByLabel('Next page',{exact:true}).click()}
   else await page.getByLabel('Choose slide',{exact:true}).selectOption(String(i))
   await page.waitForTimeout(70)
   const active=page.locator(mobile?'.story-page:not([inert])':'.slide[data-active="true"]')
   assert.equal(await active.count(),1)
   const result=await active.evaluate(el=>{
    const box=el.getBoundingClientRect()
    return {text:el.innerText,links:[...el.querySelectorAll('a')].map(a=>a.getAttribute('href')),overflow:el.scrollWidth>el.clientWidth+2,zoom:getComputedStyle(el).zoom,controls:[...document.querySelectorAll('button,select,a')].filter(e=>!e.closest('[inert]')&&e.getBoundingClientRect().width>0&&e.getBoundingClientRect().left>=0&&e.getBoundingClientRect().right<=innerWidth).map(e=>({text:e.textContent,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})),box:{left:box.left,right:box.right}}
   })
   text+='\n'+result.text;result.links.forEach(l=>hrefs.add(l))
   assert(!result.overflow,`${width}: horizontal overflow page ${i}`)
   if(mobile){assert.equal(result.zoom,'1');assert(result.controls.every(c=>c.h>=44&&c.w>=24),`${width} small controls ${JSON.stringify(result.controls)}`)}
   if((mobile&&width===390&&[0,2,count-1].includes(i))||(!mobile&&width===1366&&[1,7,count-1].includes(i))) await page.screenshot({path:`/tmp/portfolio-parity-${width}-${i}.png`})
  }
  const normalize=s=>s.replace(/\s+/g,' ').trim().toLowerCase()
  for(const item of expected) assert(normalize(text).includes(normalize(item)),`${width}: missing ${item}`)
  for(const link of links) assert(hrefs.has(link),`${width}: missing link ${link}`)
  const cv=await page.request.get(new URL(profile.cv,page.url()).href);assert.equal(cv.status(),200);assert((await cv.body()).subarray(0,4).toString()==='%PDF')
  assert.deepEqual(errors,[])
  console.log(`PASS parity ${width}x${height}: ${count} pages navigated; ${expected.length} canonical strings, ${links.length} links, fourth actions, roles/dates, features, stack, facts; CV PDF 200; no horizontal overflow`)
  await page.close()
 }
 await browser.close()
})().catch(e=>{console.error(e);process.exit(1)})
