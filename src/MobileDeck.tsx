import { useRef, useState } from 'react'
import { cases, profile, facts, closing } from './data/work'
import './mobile.css'

const pages = [
  { caseIndex: -1, phase: 0 },
  ...cases.flatMap((_, caseIndex) => [0, 1, 2].map(phase => ({ caseIndex, phase }))),
    { caseIndex: -2, phase: 0 },
]
const stages = ['Overview', 'Engineering', 'Deliverables']

export default function MobileDeck() {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const go = (i: number) => {
    const el = track.current
    if (el) el.scrollTo({ left: Math.max(0, Math.min(pages.length - 1, i)) * el.clientWidth, behavior: 'instant' })
  }
  const current = pages[index]
  return <div className="mobile-story">
    <header className="story-header">
      <a href={`mailto:${profile.email}`} aria-label="Email Zidane">Z / SC</a>
      <select aria-label="Choose project" value={current.caseIndex} onChange={e => {
        const c = Number(e.target.value)
        go(pages.findIndex(p => p.caseIndex === c))
      }}>
        <option value={-1}>Introduction</option>
        {cases.map((c, i) => <option value={i} key={c.id}>{c.org} · {c.title}</option>)}
        <option value={-2}>Contact</option>
      </select>
    </header>
    <div className="story-track" ref={track} onScroll={e => {
      const el = e.currentTarget
      setIndex(Math.max(0, Math.min(pages.length - 1, Math.round(el.scrollLeft / el.clientWidth))))
    }}>
      {pages.map(({ caseIndex, phase }, i) => {
        const c = cases[caseIndex]
        return <section className="story-page" key={i} aria-label={c ? `${c.org}: ${stages[phase]}` : 'Introduction or contact'} inert={index !== i}>
          {caseIndex === -1 ? <>
            <p className="story-kicker">ENGINEERING PORTFOLIO</p>
            <h1>{profile.name}</h1>
            <p className="story-lead">{profile.role}</p>
            <p>{profile.thesis}</p>
            <div className="story-note">One project, three short chapters.<br/>Swipe to explore, or choose a project above.</div>
            <button className="story-primary" onClick={() => go(1)}>Explore the work <span>→</span></button>
            <a className="story-link" href={profile.cv}>Download CV ↗</a><a className="story-link" href={`mailto:${profile.email}`}>Email me</a><a className="story-link" href={profile.linkedin}>LinkedIn</a><a className="story-link" href={profile.github}>GitHub</a>
          </> : caseIndex === -2 ? <>
            <p className="story-kicker">LET'S TALK</p>
            <h2>{closing.title}</h2>
            <p>{closing.body}</p>
            <ul className="story-features">{facts.map(f => <li key={f}>{f}</li>)}</ul><p>{profile.location}</p><p>{closing.note}</p><a className="story-link" href={profile.github}>GitHub</a><a className="story-primary" href={`mailto:${profile.email}`}>Email me ↗</a>
            <a className="story-link" href={profile.cv}>Download CV ↗</a>
            <a className="story-link" href={profile.linkedin}>LinkedIn ↗</a>
          </> : <>
            <div className="story-kicker">{c.org} <span>{phase + 1} / 3</span></div>
            <div className="story-stages">{stages.map((s, n) => <button aria-current={n === phase ? 'step' : undefined} key={s} onClick={() => go(i - phase + n)}>{s}</button>)}</div>
            {phase === 0 ? <>
              <h2>{c.title}</h2>
              <p className="story-role">{c.role} · {c.period}</p>
              <div className="story-note"><h3>The challenge</h3><p>{c.problem}</p></div>
              <div className="story-tags">{c.stack.map(s => <span key={s}>{s}</span>)}</div>
              <button className="story-primary" onClick={() => go(i + 1)}>Engineering decisions <span>→</span></button>
            </> : phase === 1 ? <>
              <h2>What I built.</h2>
              <ol className="story-actions">{c.actions.map((a, n) => <li key={a}><span>0{n + 1}</span><p>{a}</p></li>)}</ol>
            </> : <>
              <h2>Architectural Outcomes</h2>
              {c.flow && (
                <div className="story-flow-box">
                  <h3 className="story-flow-title">SYSTEM ARCHITECTURE FLOW</h3>
                  <ol className="story-flow-list">
                    {c.flow.map((s, idx) => (
                      <li key={s} className="story-flow-item">
                        {idx > 0 && <span className="story-flow-arrow" aria-hidden="true">→</span>}
                        <span className="story-flow-text">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <ul className="story-features">
                {c.features.map(f => (
                  <li key={f.name}>
                    <h3>{f.name}</h3>
                    <p>{f.detail}</p>
                  </li>
                ))}
              </ul>
            </>}
          </>}
        </section>
      })}
    </div>
    <footer className="story-footer">
      <button aria-label="Previous page" disabled={index === 0} onClick={() => go(index - 1)}>←</button>
      <div><span>{index + 1} / {pages.length}</span><progress value={index + 1} max={pages.length} aria-label="Portfolio progress"/></div>
      <button aria-label="Next page" disabled={index === pages.length - 1} onClick={() => go(index + 1)}>→</button>
    </footer>
  </div>
}
