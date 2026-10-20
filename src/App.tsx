import { useCallback, useEffect, useRef, useState } from 'react'
import MobileDeck from './MobileDeck'
import { cases, headline, facts, profile, closing, type Case, type Metric } from './data/work'

/* ── deck plumbing ───────────────────────────────────────────────────────── */

const TOTAL = cases.length + 2 // cover + cases + also-shipped + closing

/** Which slide is snapped into view. Drives the dots, counter, and animation. */
function useDeck(total: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const go = useCallback((i: number) => {
    const el = ref.current
    if (!el) return
    const next = Math.max(0, Math.min(total - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, [total])

  // Derive the index from scroll position so swipe, keyboard, and dot clicks
  // all stay in sync from one source of truth.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setIndex(Math.round(el.scrollLeft / el.clientWidth))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || (e.target instanceof HTMLElement && e.target.closest('input,select,textarea,button,[contenteditable]'))) return
      const el = ref.current
      if (!el) return
      const i = Math.round(el.scrollLeft / el.clientWidth)
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(i + 1) }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(i - 1) }
      else if (e.key === 'Home') { e.preventDefault(); go(0) }
      else if (e.key === 'End') { e.preventDefault(); go(total - 1) }
      else if (e.key.toLowerCase() === 'f') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen?.().catch(() => {})
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, total])

  return { ref, index, go }
}

/* ── pieces ──────────────────────────────────────────────────────────────── */

function Eyebrow({ children, tone = 'sky' }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    sky: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
    emerald: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    amber: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    violet: 'text-violet-400 border-violet-400/30 bg-violet-400/10',
  }
  return (
    <span className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] sm:text-xs ${tones[tone]}`}>
      {children}
    </span>
  )
}

function Stat({ m, size = 'md' }: { m: Metric; size?: 'md' | 'lg' }) {
  return (
    /* Phones: value and label share a row so three metrics cost three lines
       instead of a cramped three-column grid. From lg the grid-rows layout
       returns, pinning the source line so check rows align across columns. */
    <div className="flex items-baseline gap-2.5 lg:grid lg:h-full lg:grid-rows-[auto_1fr_auto] lg:gap-0">
      <div
        className={`shrink-0 font-mono font-semibold tabular-nums tracking-tight text-white ${
          size === 'lg' ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-2xl'
        }`}
      >
        {m.value}
      </div>
      <div className="min-w-0 lg:mt-1">
        <div className="text-[12.5px] leading-snug text-muted sm:text-sm">{m.label}</div>
        {m.source && (
          <div className="mt-0.5 hidden font-mono text-[10px] text-muted sm:block">✓ {m.source}</div>
        )}
      </div>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded border border-line bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-muted sm:text-[11px]">
          {s}
        </li>
      ))}
    </ul>
  )
}

/* Pipeline chips. Arrow leads its chip so a wrap never strands an arrow. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1 whitespace-nowrap">
          {i > 0 && <span aria-hidden className="text-sky-400/40">→</span>}
          <span className="rounded bg-white/[0.06] px-1.5 py-1 font-mono text-[10px] leading-none text-slate-200">
            {s}
          </span>
        </li>
      ))}
    </ol>
  )
}

function Slide({
  children,
  active,
  id,
}: {
  children: React.ReactNode
  active: boolean
  id: string
}) {
  return (
    <section className="slide" data-active={active} id={id} aria-hidden={!active}>
      <div className="slide-inner mx-auto w-full max-w-6xl lg:max-w-[1700px] 2xl:max-w-[1900px]">{children}</div>
    </section>
  )
}

/* ── slides ──────────────────────────────────────────────────────────────── */

function Cover({ active }: { active: boolean }) {
  return (
    <Slide id="cover" active={active}>
      <div className="anim">
        <Eyebrow>Portfolio · 2026</Eyebrow>
      </div>
      <h1 className="anim mt-5 text-[2rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl" style={{ animationDelay: '60ms' }}>
        {profile.name}
      </h1>
      <p className="anim mt-3 text-base text-sky-400 sm:text-2xl" style={{ animationDelay: '110ms' }}>
        {profile.role}
      </p>
      <p className="anim mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-lg" style={{ animationDelay: '160ms' }}>
        {profile.thesis}
      </p>

      <div className="anim mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line pt-5 sm:mt-8 sm:max-w-3xl sm:grid-cols-4 sm:gap-y-5 sm:pt-6 lg:mt-10 lg:max-w-4xl lg:pt-7" style={{ animationDelay: '210ms' }}>
        {headline.map((m) => (
          <Stat key={m.label} m={m} size="lg" />
        ))}
      </div>

      <div className="anim mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap" style={{ animationDelay: '260ms' }}>
        <a href={profile.cv} className="rounded-lg bg-white px-4 py-3 text-center text-sm font-medium text-ink hover:bg-slate-200">
          Download CV
        </a>
        <a href={`mailto:${profile.email}`} className="rounded-lg border border-line bg-white/[0.03] px-4 py-3 text-center text-sm font-medium hover:border-sky-400/40">
          Email me
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-line bg-white/[0.03] px-4 py-3 text-center text-sm font-medium hover:border-sky-400/40">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-lg border border-line bg-white/[0.03] px-4 py-3 text-center text-sm font-medium hover:border-sky-400/40">
          GitHub
        </a>
      </div>

      <p className="anim hide-on-landscape mt-5 font-mono text-[11px] text-muted/70 sm:mt-7 sm:text-xs" style={{ animationDelay: '310ms' }}>
        {profile.location} · swipe or press → to continue
      </p>
    </Slide>
  )
}

const TONES = ['sky', 'sky', 'sky', 'emerald', 'sky', 'amber']

function CaseSlide({ c, n, active }: { c: Case; n: number; active: boolean }) {
  const tone = TONES[n - 1] ?? 'sky'
  return (
    <Slide id={c.id} active={active}>
      <div className="anim flex flex-wrap items-center gap-x-3 gap-y-2">
        <Eyebrow tone={tone}>{c.org}</Eyebrow>
        <span className="font-mono text-[11px] text-muted sm:text-xs">{c.period}</span>
      </div>

      <h2 className="anim mt-4 max-w-4xl text-balance text-[1.6rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl lg:max-w-[30ch] lg:text-5xl 2xl:text-[4rem]" style={{ animationDelay: '60ms' }}>
        {c.title}
      </h2>
      <p className="anim mt-2 font-mono text-[11px] text-muted sm:text-sm" style={{ animationDelay: '90ms' }}>
        {c.role}
      </p>

      {/* Two columns on desktop: the story left, the evidence right.
          flex-1 + min-h-0 lets the grid consume the slide's free height so
          the canvas fills instead of floating in the upper third.
          Image slides give the evidence column more width so four
          thumbnails stay legible in a single row. */}
      <div
        className="anim mt-4 grid min-h-0 gap-4 sm:mt-6 sm:gap-6 lg:mt-6 lg:flex-1 lg:grid-cols-[1.35fr_1fr] lg:items-stretch lg:gap-8"

        style={{ animationDelay: '130ms' }}
      >
        <div className="lg:flex lg:flex-col lg:justify-center lg:gap-6 [&_p]:max-w-[62ch] [&_span]:max-w-[62ch]">
          <div className="border-l-2 border-sky-400/40 pl-3 sm:pl-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:text-[10px]">Problem</h3>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-300 sm:text-base lg:text-[18px] 2xl:text-[20px]">{c.problem}</p>
          </div>

          <div className="mt-4 border-l-2 border-sky-400/40 pl-3 sm:mt-5 sm:pl-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:text-[10px]">What I did</h3>
            <ul className="mt-2 space-y-1.5 sm:space-y-2 lg:space-y-3">
              {c.actions.map((a) => (
                <li key={a} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-300 sm:text-[15px] lg:text-[17px] 2xl:text-[19px]">
                  <span aria-hidden className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-sky-400/70 lg:mt-[0.6rem]" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:justify-center lg:gap-5">
          {!!c.results?.length && (
            <div className="rounded-xl border border-line bg-panel p-3.5 sm:p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Result</h3>
              {/* Three columns is too narrow at 390px — captions broke
                  mid-phrase. Value and label sit on one row per metric on
                  phones, and stack into the column again from lg. */}
              <div className="mt-2.5 flex flex-col gap-2 lg:grid lg:grid-cols-1 lg:gap-4">
                {c.results.map((r) => (
                  <Stat key={r.label} m={r} />
                ))}
              </div>
            </div>
          )}

          {/* Architectural Outcomes & Deliverables */}
          {c.features && (
            <div className="rounded-xl border border-line bg-panel p-3.5 sm:p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Architectural Outcomes</h3>
              <ul className="mt-2.5 flex flex-col gap-2.5 lg:gap-3">
                {c.features.map((f) => (
                  <li key={f.name}>
                    <div className="text-[13px] font-medium text-white sm:text-[14px]">{f.name}</div>
                    <div className="mt-0.5 text-[12px] leading-snug text-muted sm:text-[12.5px]">{f.detail}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {c.flow && (
            <div className="hidden shrink-0 rounded-xl border border-line bg-panel p-4 lg:block">
              <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Flow</h3>
              <Flow steps={c.flow} />
            </div>
          )}

          <Chips items={c.stack} />
        </div>
      </div>
    </Slide>
  )
}


function Closing({ active }: { active: boolean }) {
  return (
    <Slide id="closing" active={active}>
      <div className="anim">
        <Eyebrow>Let's talk</Eyebrow>
      </div>
      <h2 className="anim mt-4 max-w-3xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ animationDelay: '60ms' }}>
        {closing.title}
      </h2>
      <p className="anim mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-lg" style={{ animationDelay: '110ms' }}>
        {closing.body}
      </p>

      <ul className="anim mt-6 grid gap-2 sm:max-w-2xl sm:grid-cols-2" style={{ animationDelay: '160ms' }}>
        {facts.map((f) => (
          <li key={f} className="flex gap-2.5 rounded-lg border border-line bg-panel px-3 py-2.5 text-[13px] leading-snug text-slate-300">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400/70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="anim mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" style={{ animationDelay: '210ms' }}>
        <a href={profile.cv} className="rounded-lg bg-white px-5 py-3 text-center text-sm font-medium text-ink hover:bg-slate-200">
          Download CV
        </a>
        <a href={`mailto:${profile.email}`} className="rounded-lg border border-line bg-white/[0.03] px-5 py-3 text-center text-sm font-medium hover:border-sky-400/40">
          Email me
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-line bg-white/[0.03] px-5 py-3 text-center text-sm font-medium hover:border-sky-400/40">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-lg border border-line bg-white/[0.03] px-5 py-3 text-center text-sm font-medium hover:border-sky-400/40">
          GitHub
        </a>
      </div>

      <p className="anim mt-7 font-mono text-[11px] text-muted/70" style={{ animationDelay: '260ms' }}>
        {closing.note}
      </p>
    </Slide>
  )
}

/* ── app ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px), (max-height: 500px) and (pointer: coarse)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px), (max-height: 500px) and (pointer: coarse)')
    const update = () => setMobile(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return mobile ? <MobileDeck /> : <DesktopDeck />
}

function DesktopDeck() {
  const { ref, index, go } = useDeck(TOTAL)
  const labels = ['Cover', ...cases.map((c) => `${c.org} · ${c.title}`), 'Contact']

  return (
    <div className="relative h-full">
      <div ref={ref} className="deck" tabIndex={-1} aria-roledescription="carousel" aria-label="Portfolio slides">
        <Cover active={index === 0} />
        {cases.map((c, i) => (
          <CaseSlide key={c.id} c={c} n={i + 1} active={index === i + 1} />
        ))}
        <Closing active={index === TOTAL - 1} />
      </div>

      <nav className="desktop-dock" aria-label="Presentation controls">
        <div className="dock-top">
          <label htmlFor="slide-picker">SLIDES <span>{index + 1} / {TOTAL}</span></label>
          <select id="slide-picker" aria-label="Choose slide" value={index} onChange={e => go(Number(e.target.value))}>
            {labels.map((label, i) => <option value={i} key={i}>{String(i + 1).padStart(2, '0')} · {label}</option>)}
          </select>
        </div>
        <progress value={index + 1} max={TOTAL} aria-label="Slide progress" />
        <div className="dock-actions">
          <button title="Previous slide (←)" aria-label="Previous slide" disabled={index === 0} onClick={() => go(index - 1)}>← <span>Prev</span></button>
          <button title="Toggle fullscreen (F)" aria-label="Toggle fullscreen" onClick={() => {
            const action = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.()
            action?.catch(() => {})
          }}>⛶</button>
          <button className="dock-next" title="Next slide (→)" aria-label="Next slide" disabled={index === TOTAL - 1} onClick={() => go(index + 1)}><span>{index === TOTAL - 2 ? 'Contact' : 'Next'}</span> →</button>
        </div>
        <span className="sr-only" aria-live="polite">Slide {index + 1}: {labels[index]}</span>
      </nav>
    </div>
  )
}
