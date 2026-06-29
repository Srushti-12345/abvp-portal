import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CarouselSlide } from '../types';

interface HeroSectionProps {
  slides: CarouselSlide[];
  activeLang: 'EN' | 'MR';
  onNavigate?: (link: string) => void;
}

export default function HeroSection({ slides, activeLang, onNavigate }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds auto rotation
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  
  // Choose language specific text
  const tagText = activeLang === 'MR' && currentSlide.tagMr ? currentSlide.tagMr : currentSlide.tag;
  const titleText = activeLang === 'MR' && currentSlide.titleMr ? currentSlide.titleMr : currentSlide.title;
  const subtitleText = activeLang === 'MR' && currentSlide.subtitleMr ? currentSlide.subtitleMr : currentSlide.subtitle;
  const primaryBtnText = activeLang === 'MR' && currentSlide.primaryButtonTextMr ? currentSlide.primaryButtonTextMr : currentSlide.primaryButtonText;
  const secondaryBtnText = activeLang === 'MR' && currentSlide.secondaryButtonTextMr ? currentSlide.secondaryButtonTextMr : currentSlide.secondaryButtonText;

  return (
    <section 
      className="relative w-full h-[580px] lg:h-[660px] overflow-hidden bg-[#001847]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          {/* Background image with lazy-loading fallback */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${currentSlide.image}')`,
            }}
          />
          {/* Tonal overlay: high quality navy blue gradient overlay as per design guidelines */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001847]/40 via-[#001847]/75 to-[#001847]/95" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
            className="max-w-3xl text-left"
          >
            {/* Tag/Badge */}
            {tagText && (
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="inline-block px-4 py-1.5 bg-[#fc820c] text-white font-extrabold text-xs tracking-[0.15em] rounded mb-6 uppercase"
              >
                {tagText}
              </motion.span>
            )}

            {/* Display Heading */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6"
            >
              {titleText}
            </motion.h1>

            {/* Description Body */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="font-sans text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl font-light"
            >
              {subtitleText}
            </motion.p>

            {/* Dynamic CTAs */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-wrap gap-4"
            >
              {primaryBtnText && (
                <button 
                  onClick={() => onNavigate?.(currentSlide.primaryButtonLink || '#')}
                  className="inline-flex items-center gap-2 bg-[#fc820c] hover:bg-[#d96a00] text-white text-sm lg:text-base font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer text-left"
                >
                  {primaryBtnText}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              {secondaryBtnText && (
                <button 
                  onClick={() => onNavigate?.(currentSlide.secondaryButtonLink || '#')}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm lg:text-base font-bold px-8 py-4 rounded-xl hover:bg-white/25 active:scale-95 transition-all cursor-pointer text-left"
                >
                  {secondaryBtnText}
                </button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Left/Right Arrow Navigation buttons (only on hover or on desktop) */}
      <button 
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors active:scale-90"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors active:scale-90"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators/Bullets */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-12 bg-[#fc820c]' : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
