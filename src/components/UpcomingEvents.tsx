import { useState } from 'react';
import { MapPin, Clock, Share2, Calendar } from 'lucide-react';
import { EventItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface UpcomingEventsProps {
  events: EventItem[];
  onRegisterClick?: (event: EventItem) => void;
  activeLang: 'EN' | 'MR';
}

export default function UpcomingEvents({ events, onRegisterClick, activeLang }: UpcomingEventsProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'workshop' | 'conference'>('all');

  const filteredEvents = events.filter((evt) => {
    if (activeFilter === 'all') return true;
    return evt.type === activeFilter;
  });

  return (
    <section id="events" className="py-20 lg:py-28 max-w-7xl mx-auto px-6">
      
      {/* Title & Filter Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 border-b border-slate-100 pb-8">
        <div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#001847] tracking-tight">
            {activeLang === 'EN' ? 'Major Upcoming Events' : 'आगामी प्रमुख कार्यक्रम'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {activeLang === 'EN' 
              ? 'Participate, learn, and engage with the student community.' 
              : 'सहभागी व्हा, शिका आणि विद्यार्थी चळवळीशी जोडले जा.'}
          </p>
        </div>
        
        {/* Toggle Filters */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl self-start lg:self-center">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'all' 
                ? 'bg-white text-[#001847] shadow-md' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {activeLang === 'EN' ? 'All Events' : 'सर्व कार्यक्रम'}
          </button>
          <button 
            onClick={() => setActiveFilter('workshop')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'workshop' 
                ? 'bg-white text-[#001847] shadow-md' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {activeLang === 'EN' ? 'Workshops' : 'कार्यशाळा'}
          </button>
          <button 
            onClick={() => setActiveFilter('conference')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === 'conference' 
                ? 'bg-white text-[#001847] shadow-md' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {activeLang === 'EN' ? 'Conferences' : 'परिषदा'}
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3"
            >
              <Calendar className="h-10 w-10 text-slate-300" />
              <p className="text-slate-500 font-medium text-base">
                {activeLang === 'EN' 
                  ? 'No scheduled events for this category at the moment.' 
                  : 'या श्रेणीमध्ये सध्या कोणतेही कार्यक्रम नियोजित नाहीत.'}
              </p>
            </motion.div>
          ) : (
            filteredEvents.map((evt, idx) => {
              const displayTitle = activeLang === 'MR' && evt.titleMr ? evt.titleMr : evt.title;
              const displayCategory = activeLang === 'MR' && evt.categoryMr ? evt.categoryMr : evt.category;
              const displayMonth = activeLang === 'MR' && evt.monthMr ? evt.monthMr : evt.month;
              const displayLocation = activeLang === 'MR' && evt.locationMr ? evt.locationMr : evt.location;
              const displayTime = activeLang === 'MR' && evt.timeMr ? evt.timeMr : evt.time;

              return (
                <motion.div 
                  key={evt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#001847]/40 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center"
                >
                  {/* Date Square Card */}
                  <div className={`flex flex-col items-center justify-center text-white w-24 h-24 rounded-xl flex-shrink-0 shadow-lg ${
                    evt.type === 'celebration' ? 'bg-[#001847]' : 'bg-[#0b2c6b]'
                  }`}>
                    <span className="text-3xl font-extrabold tracking-tight leading-none mb-1">
                      {evt.date}
                    </span>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
                      {displayMonth} {evt.year}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow text-center md:text-left w-full">
                    <span className="text-[#fc820c] text-xs font-black uppercase tracking-widest block mb-1">
                      {displayCategory}
                    </span>
                    <h4 className="font-sans font-extrabold text-xl lg:text-2xl text-[#001847] hover:text-[#fc820c] transition-colors leading-snug">
                      {displayTitle}
                    </h4>
                    
                    {/* Location & Time info row */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-slate-500 text-sm mt-3">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-[#fc820c]" />
                        {displayLocation}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#fc820c]" />
                        {displayTime}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="flex gap-3 shrink-0 w-full md:w-auto justify-center md:justify-end">
                    <button 
                      onClick={() => onRegisterClick?.(evt)}
                      className="bg-[#001847] hover:bg-[#0b2c6b] text-white px-8 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer shadow-md shadow-[#001847]/10 active:scale-95 transition-all w-full sm:w-auto"
                    >
                      {evt.type === 'seminar' 
                        ? (activeLang === 'EN' ? 'View Agenda' : 'कार्यक्रम पत्रिका पहा') 
                        : (activeLang === 'EN' ? 'Register Now' : 'नोंदणी करा')}
                    </button>
                    <button 
                      className="w-12 h-12 border border-slate-200 hover:border-[#001847] hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#001847] transition-all cursor-pointer shrink-0"
                      title="Share Event"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
