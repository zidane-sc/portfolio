import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES, type SlideData } from './data/slides';
import { InteractiveDiagram } from './components/InteractiveDiagram';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Download, ExternalLink, Terminal, 
  CheckCircle2, HelpCircle, ArrowUp, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number>(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const totalSlides = SLIDES.length;
  const slide: SlideData = SLIDES[currentSlideIndex];

  // Hash-based initial routing & synchronisation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const idx = SLIDES.findIndex((s) => s.id === hash);
      if (idx !== -1) {
        setCurrentSlideIndex(idx);
      }
    }
  }, []);

  useEffect(() => {
    if (SLIDES[currentSlideIndex]) {
      window.history.replaceState(null, '', `#${SLIDES[currentSlideIndex].id}`);
    }
  }, [currentSlideIndex]);

  // Mobile scroll spy & progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const scrollPosition = window.scrollY + 180;
      for (let i = SLIDES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SLIDES[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setMobileActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMobileSection = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      const targetId = SLIDES[index].id;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (index === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Navigation handlers for desktop slide mode
  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setSelectedScreenshotIndex(0);

      if (currentSlideIndex === totalSlides - 2) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setSelectedScreenshotIndex(0);
    }
  }, [currentSlideIndex]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides && index !== currentSlideIndex) {
      setCurrentSlideIndex(index);
      setSelectedScreenshotIndex(0);
    }
  };

  // Keyboard navigation for desktop mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;
        case 'Escape':
          setShowHelp(false);
          setMobileMenuOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const getCategoryBadgeClass = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40';
      case 'amber':
        return 'text-amber-400 bg-amber-950/70 border-amber-500/40';
      case 'purple':
        return 'text-purple-400 bg-purple-950/70 border-purple-500/40';
      default:
        return 'text-sky-400 bg-sky-950/70 border-sky-500/40';
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between relative selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Background Subtle Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          UNIVERSAL HEADER
          ========================================================================= */}
      <header className="sticky top-0 lg:fixed lg:top-0 w-full z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/portfolio/" className="font-mono font-extrabold text-sm tracking-wider text-slate-100 hover:text-sky-400 transition-colors">
            ZIDANE SC
          </a>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-xs font-mono text-slate-400 hidden lg:inline">
            SOFTWARE ENGINEER | FULL STACK & PLATFORM ARCHITECTURE
          </span>
        </div>

        {/* Desktop Stepper Dots (Desktop only) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIndex
                  ? 'w-7 bg-sky-400 shadow-sm shadow-sky-400/50'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Slide ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Mobile Linear Progress Indicator */}
        <div className="flex lg:hidden flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-400 transition-all duration-150 rounded-full"
            style={{ width: `${Math.max(8, scrollProgress || ((mobileActiveIndex + 1) / totalSlides) * 100)}%` }}
          />
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <a
            href="/portfolio/Muhammad-Zidane-Sc-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-semibold">CV PDF</span>
          </a>

          {/* Desktop Shortcuts Button */}
          <button
            onClick={() => setShowHelp(true)}
            className="hidden lg:flex p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors"
            title="Keyboard Shortcuts (H)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Desktop Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden lg:flex p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Table of Contents"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE JUMP NAVIGATION DRAWER
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-14 bg-slate-950/95 border-b border-slate-800 z-50 p-4 lg:hidden max-h-[75vh] overflow-y-auto backdrop-blur-xl shadow-2xl"
          >
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-bold">
              Table of Contents
            </div>
            <div className="space-y-1">
              {SLIDES.map((s, idx) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
                >
                  <span className="truncate pr-2">{idx + 1}. {s.title}</span>
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded border ${getCategoryBadgeClass(s.categoryColor)}`}>
                    {s.category.split(' ')[0]}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          DESKTOP VIEW: 100vh Interactive Split Presentation Deck (lg:flex)
          ========================================================================= */}
      <div className="hidden lg:flex flex-col justify-between w-full h-screen pt-16 pb-16 overflow-hidden">
        <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-3 overflow-hidden flex items-center">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full grid grid-cols-12 gap-8 items-center"
          >
            {/* Left Panel: Interactive Diagram OR Screenshot Showcase */}
              <div className="col-span-5 h-[480px] w-full flex flex-col justify-center">
                {slide.diagramType ? (
                  <InteractiveDiagram type={slide.diagramType} />
                ) : slide.screenshots && slide.screenshots.length > 0 ? (
                  <div className="w-full h-full flex flex-col bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <div className="flex-1 relative bg-black/60 flex items-center justify-center p-2 overflow-hidden group">
                      <img
                        src={slide.screenshots[selectedScreenshotIndex].src}
                        alt={slide.screenshots[selectedScreenshotIndex].title}
                        className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    {slide.screenshots.length > 1 && (
                      <div className="p-1.5 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto">
                        {slide.screenshots.map((shot, idx) => (
                          <button
                            key={shot.title}
                            onClick={() => setSelectedScreenshotIndex(idx)}
                            className={`px-2.5 py-1 text-[11px] rounded font-mono transition-colors whitespace-nowrap ${
                              idx === selectedScreenshotIndex
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {shot.title}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="px-3.5 py-2 bg-slate-900/90 text-[11px] text-slate-400 font-mono border-t border-slate-800/80 leading-snug">
                      {slide.screenshots[selectedScreenshotIndex].caption || slide.screenshots[selectedScreenshotIndex].title}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-slate-950/60 border border-slate-800 rounded-xl relative overflow-hidden">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/20 mb-6"
                    >
                      <Terminal className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="font-mono text-sm text-slate-200 font-bold tracking-wider">
                      PLATFORM & DISTRIBUTED SYSTEMS
                    </div>
                    <div className="text-xs text-slate-500 text-center mt-2 font-mono">
                      5+ Years • 100+ Production Features • Squad Lead
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel: Technical Breakdown */}
              <div className="col-span-7 flex flex-col justify-center space-y-3.5 max-h-full py-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(slide.categoryColor)}`}>
                    {slide.category}
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {slide.title}
                  </h1>
                  <p className="text-sm font-medium text-slate-400 mt-0.5">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="p-3 bg-slate-900/80 border-l-2 border-amber-500 rounded-r-lg text-xs leading-relaxed text-slate-300">
                  <span className="font-bold text-amber-400 uppercase tracking-wide mr-1.5 font-mono text-[10px]">
                    Challenge:
                  </span>
                  {slide.problem}
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Architectural Solution:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {slide.solution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Verified Production Impact:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {slide.impact.map((imp, idx) => (
                      <div 
                        key={idx} 
                        className="p-2 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-200">{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {slide.stack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-slate-800/80 border border-slate-700/60 rounded text-[10px] font-mono text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {slide.links && slide.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {slide.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
        </main>

        {/* Desktop Bottom Control Dock */}
        <footer className="fixed bottom-0 w-full h-16 border-t border-slate-800/80 px-8 flex items-center justify-between bg-[#070b14]/90 backdrop-blur-md z-30">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="font-bold text-slate-200 text-sm">
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="text-slate-600">|</span>
            <span className="truncate max-w-md xl:max-w-xl text-slate-300 font-semibold">{slide.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                currentSlideIndex === 0
                  ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                  : 'bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREV</span>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                currentSlideIndex === totalSlides - 1
                  ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20 active:scale-95'
              }`}
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          MOBILE VIEW: Continuous Modern Vertical Case-Study Feed (lg:hidden)
          ========================================================================= */}
      <div className="flex lg:hidden flex-col w-full px-4 py-6 space-y-12 pb-24">
        
        {/* Mobile Hero Introduction */}
        <section id="cover" className="space-y-4 pt-2 scroll-mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-950/50 text-[11px] font-mono text-sky-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>EXECUTIVE TECH PORTFOLIO</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Muhammad Zidane Sc
          </h1>
          <p className="text-sm font-semibold text-sky-400 font-mono">
            Software Engineer | Full Stack & Platform Architecture
          </p>

          <p className="text-xs text-slate-300 leading-relaxed">
            5+ years building scalable microservices, search engines, and distributed platforms across Golang, TypeScript, and PostgreSQL. Currently Squad Lead (Backend) for Dealls & KantorKu HRIS.
          </p>

          {/* Core Stats Metric Strip */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="text-lg font-extrabold text-sky-400 font-mono">1.74M</div>
              <div className="text-[11px] text-slate-400">Talents Matched</div>
            </div>
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="text-lg font-extrabold text-emerald-400 font-mono">&lt; 100ms</div>
              <div className="text-[11px] text-slate-400">P95 Search Latency</div>
            </div>
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="text-lg font-extrabold text-purple-400 font-mono">936</div>
              <div className="text-[11px] text-slate-400">Batch Ingestion Sync</div>
            </div>
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <div className="text-lg font-extrabold text-amber-400 font-mono">&lt; 10ms</div>
              <div className="text-[11px] text-slate-400">Retail POS Query Time</div>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://github.com/zidane-sc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-center text-xs font-mono font-bold text-slate-200 flex items-center justify-center gap-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/zidane-sc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-lg bg-sky-950/60 border border-sky-800/80 text-center text-xs font-mono font-bold text-sky-300 flex items-center justify-center gap-1.5"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Continuous Showcase of All 12 Projects */}
        {SLIDES.slice(1).map((item, idx) => (
          <section key={item.id} id={item.id} className="pt-6 border-t border-slate-800/80 space-y-4 scroll-mt-20">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${getCategoryBadgeClass(item.categoryColor)}`}>
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  CASE {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {item.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {item.subtitle}
              </p>
            </div>

            {/* Visual Diagram or Image Container (Generous Height for Mobile) */}
            <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60">
              {item.diagramType ? (
                <div className="min-h-[300px]">
                  <InteractiveDiagram type={item.diagramType} />
                </div>
              ) : item.screenshots && item.screenshots.length > 0 ? (
                <div className="space-y-2 p-2">
                  <div className="relative bg-black/70 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={item.screenshots[0].src}
                      alt={item.screenshots[0].title}
                      className="w-full h-auto object-contain max-h-[340px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 px-2 py-1">
                    {item.screenshots[0].caption || item.screenshots[0].title}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Problem Box */}
            <div className="p-3 bg-slate-900/90 border-l-2 border-amber-500 rounded-r-lg text-xs leading-relaxed text-slate-300">
              <span className="font-bold text-amber-400 uppercase tracking-wide mr-1.5 font-mono text-[10px]">
                Challenge:
              </span>
              {item.problem}
            </div>

            {/* Solutions */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Architectural Solution:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {item.solution.map((sol, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Impact Grid */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Verified Production Impact:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.impact.map((imp, iIdx) => (
                  <div key={iIdx} className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-200">{imp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips & Links */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60">
              <div className="flex flex-wrap gap-1">
                {item.stack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-slate-800/80 border border-slate-700/60 rounded text-[10px] font-mono text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 w-full">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-mono font-bold text-sky-400 hover:text-sky-300"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Mobile Floating Back-to-Top Button */}
        <div className="pt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 shadow-xl"
          >
            <ArrowUp className="w-4 h-4 text-sky-400" />
            <span>Back to Top</span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          MOBILE STICKY BOTTOM ACTION BAR (lg:hidden)
          ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 bg-[#070b14]/95 backdrop-blur-md border-t border-slate-800 px-4 py-2.5 flex lg:hidden items-center justify-between z-30 shadow-2xl pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToMobileSection(mobileActiveIndex - 1)}
            disabled={mobileActiveIndex === 0}
            className={`p-2 rounded-lg font-mono text-xs font-bold transition-all min-h-[38px] min-w-[38px] flex items-center justify-center ${
              mobileActiveIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 active:scale-95'
            }`}
            aria-label="Previous section"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs font-bold text-slate-300 px-1">
            {String(mobileActiveIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>

          <button
            onClick={() => scrollToMobileSection(mobileActiveIndex + 1)}
            disabled={mobileActiveIndex === totalSlides - 1}
            className={`px-3 py-2 rounded-lg font-mono text-xs font-bold transition-all min-h-[38px] flex items-center gap-1 ${
              mobileActiveIndex === totalSlides - 1
                ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold active:scale-95 shadow-md shadow-sky-500/20'
            }`}
            aria-label="Next section"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/portfolio/Muhammad-Zidane-Sc-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-mono text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>CV</span>
          </a>
          <a
            href="mailto:zidanesc02@gmail.com"
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-mono text-xs font-bold"
          >
            Contact
          </a>
        </div>
      </div>

      {/* KEYBOARD SHORTCUTS MODAL (Desktop) */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-bold text-sm text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" /> Navigation Shortcuts
              </h3>
              <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Next Slide</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-sky-400">Arrow Right / Space</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Previous Slide</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-sky-400">Arrow Left / Backspace</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Toggle Fullscreen</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-sky-400">F</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Toggle Help</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-sky-400">H</span>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold text-slate-200 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default App;
