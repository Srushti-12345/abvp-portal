import { useState, useEffect } from 'react';
import { Megaphone, X, ArrowRight, Bell } from 'lucide-react';
import { AnnouncementItem } from '../types';

interface AnnouncementBarProps {
  announcements: AnnouncementItem[];
  activeLang: 'EN' | 'MR';
}

export default function AnnouncementBar({ announcements, activeLang }: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  const current = announcements[currentIndex];
  const displayTitle = activeLang === 'MR' && current.titleMr ? current.titleMr : current.title;

  return (
    <div className="w-full bg-[#964900] text-white py-2 px-6 relative overflow-hidden transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2.5 overflow-hidden w-full">
          <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase shrink-0 font-extrabold animate-pulse">
            <Bell className="h-3 w-3 inline text-white" /> {activeLang === 'EN' ? 'Announcement' : 'महत्त्वाची सूचना'}
          </span>
          <p className="truncate text-white/95 text-left font-light tracking-wide w-full">
            {displayTitle}
          </p>
          {current.link && (
            <a 
              href={current.link} 
              className="inline-flex items-center gap-0.5 hover:text-white text-orange-200 underline shrink-0 text-xs font-bold whitespace-nowrap"
            >
              {activeLang === 'EN' ? 'Learn More' : 'अधिक जाणून घ्या'}
              <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
          aria-label="Close Announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
