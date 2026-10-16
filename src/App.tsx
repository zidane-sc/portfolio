import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES, type SlideData } from './data/slides';
import { InteractiveDiagram } from './components/InteractiveDiagram';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Download, ExternalLink, Terminal, 
  CheckCircle2, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // 1 = next, -1 = prev
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number>(0);

  const totalSlides = SLIDES.length;
  const slide: SlideData = SLIDES[currentSlideIndex];

  // Touch gesture handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Navigation handlers with animation direction
  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
      setSelectedScreenshotIndex(0);

      // Trigger celebratory confetti on last slide
      if (currentSlideIndex === totalSlides - 2) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
      setSelectedScreenshotIndex(0);
    }
  }, [currentSlideIndex]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides && index !== currentSlideIndex) {
      setDirection(index > currentSlideIndex ? 1 : -1);
      setCurrentSlideIndex(index);
      setSelectedScreenshotIndex(0);
    }
  };

  // Keyboard navigation
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
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe events
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Detect horizontal swipe (at least 45px distance and horizontal > vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: 'easeOut' as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.18, ease: 'easeIn' as const }
    })
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-screen h-[100dvh] bg-[#070b14] text-slate-100 flex flex-col justify-between overflow-hidden relative select-none"
    >
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP BAR / RUNNING HEADER (With Safe-Area Inset Support) */}
      <header className="pt-[env(safe-area-inset-top,0px)] border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-20 bg-[#070b14]/90 backdrop-blur-md h-14 sm:h-16">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono font-extrabold text-xs sm:text-sm tracking-wider text-slate-100">
            ZIDANE SC
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">
            SOFTWARE ENGINEER | FULL STACK & PLATFORM ARCHITECTURE
          </span>
        </div>

        {/* Desktop Stepper Dots (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto max-w-[45%] px-2">
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
        <div className="flex sm:hidden flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-400 transition-all duration-300 rounded-full"
            style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
          <a
            href="/portfolio/Muhammad-Zidane-Sc-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors text-[11px]"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>CV</span>
          </a>

          <button
            onClick={() => setShowHelp(true)}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Keyboard Shortcuts (H)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/50 transition-colors min-w-[36px] min-h-[36px] items-center justify-center"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN SLIDE STAGE (Split Layout with Smooth Transitions) */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 overflow-y-auto z-10 flex flex-col justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center"
          >
            {/* LEFT PANEL: Interactive Diagram OR Screenshot Showcase (Hidden on Cover Slide in Mobile) */}
            <div className={`lg:col-span-5 h-[260px] sm:h-[320px] lg:h-[430px] w-full flex flex-col justify-center ${
              slide.id === 'cover' ? 'hidden lg:flex' : 'flex'
            }`}>
              {slide.diagramType ? (
                <InteractiveDiagram type={slide.diagramType} />
              ) : slide.screenshots && slide.screenshots.length > 0 ? (
                <div className="w-full h-full flex flex-col bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  {/* Screenshot Display */}
                  <div className="flex-1 relative bg-black/60 flex items-center justify-center p-2 overflow-hidden group">
                    <img
                      src={slide.screenshots[selectedScreenshotIndex].src}
                      alt={slide.screenshots[selectedScreenshotIndex].title}
                      className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Multi-Screenshot Selector Tabs if > 1 */}
                  {slide.screenshots.length > 1 && (
                    <div className="p-1.5 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto">
                      {slide.screenshots.map((shot, idx) => (
                        <button
                          key={shot.title}
                          onClick={() => setSelectedScreenshotIndex(idx)}
                          className={`px-2 py-1 text-[11px] rounded font-mono transition-colors whitespace-nowrap ${
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

                  {/* Caption */}
                  <div className="px-3 py-1.5 bg-slate-900/90 text-[11px] text-slate-400 font-mono border-t border-slate-800/80 truncate">
                    {slide.screenshots[selectedScreenshotIndex].caption || slide.screenshots[selectedScreenshotIndex].title}
                  </div>
                </div>
              ) : (
                // Fallback Cover Visual Badge
                <div className="w-full h-full flex flex-col justify-center items-center p-6 bg-slate-950/60 border border-slate-800 rounded-xl relative overflow-hidden">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/20 mb-4"
                  >
                    <Terminal className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="font-mono text-xs text-slate-200 font-bold tracking-wider">
                    PLATFORM & DISTRIBUTED SYSTEMS
                  </div>
                  <div className="text-[11px] text-slate-500 text-center mt-1.5 font-mono">
                    5+ Years • 100+ Production Features • Squad Lead
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: High-Density Technical Specifications */}
            <div className={`${slide.id === 'cover' ? 'lg:col-span-7 col-span-12' : 'lg:col-span-7 col-span-12'} flex flex-col justify-center space-y-2 sm:space-y-2.5 max-h-full py-1`}>
              
              {/* Category Eyebrow Badge */}
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(slide.categoryColor)}`}>
                  {slide.category}
                </span>
              </div>

              {/* Slide Title & Subtitle */}
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {slide.title}
                </h1>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  {slide.subtitle}
                </p>
              </div>

              {/* Problem Statement Box */}
              <div className="p-2.5 bg-slate-900/80 border-l-2 border-amber-500 rounded-r-lg text-xs leading-relaxed text-slate-300">
                <span className="font-bold text-amber-400 uppercase tracking-wide mr-1.5 font-mono text-[10px]">
                  Challenge:
                </span>
                {slide.problem}
              </div>

              {/* Architectural Solution Bullets */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Architectural Solution:
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {slide.solution.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantified Production Impact Cards */}
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Verified Production Impact:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {slide.impact.map((imp, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.01 }}
                      className="p-1.5 sm:p-2 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-200">{imp}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills & Direct Links */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1">
                  {slide.stack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-slate-800/80 border border-slate-700/60 rounded text-[10px] font-mono text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Direct External Links if any */}
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
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROL DOCK (With Safe-Area Inset Support) */}
      <footer className="pb-[env(safe-area-inset-bottom,0px)] border-t border-slate-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#070b14]/90 backdrop-blur-md z-20 h-14 sm:h-16">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="font-bold text-slate-200 text-sm">
            {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline truncate max-w-sm">{slide.title}</span>
        </div>

        {/* Navigation Buttons with large touch targets */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all min-h-[40px] ${
              currentSlideIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all min-h-[40px] ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20 active:scale-95'
            }`}
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* KEYBOARD SHORTCUTS MODAL */}
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
                <span className="text-slate-400">Swipe (Mobile)</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-sky-400">Swipe Left / Right</span>
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
