import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { NewsItem } from '../types';

interface MediaPreviewProps {
  news: NewsItem[];
  onViewAllClick?: () => void;
  activeLang: 'EN' | 'MR';
}

export default function MediaPreview({ news, onViewAllClick, activeLang }: MediaPreviewProps) {
  if (!news || news.length < 4) return null;

  return (
    <section id="media" className="py-20 lg:py-24 bg-[#111827] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <span className="text-[#fc820c] font-sans font-extrabold text-xs tracking-[0.2em] uppercase mb-2 block">
              {activeLang === 'EN' ? 'In Focus' : 'थोडक्यात माहिती'}
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {activeLang === 'EN' ? 'News & Gallery' : 'बातम्या आणि दालन'}
            </h2>
          </div>
          <button 
            onClick={onViewAllClick}
            className="text-white/70 hover:text-white transition-colors underline underline-offset-8 decoration-[#fc820c] font-bold text-sm lg:text-base cursor-pointer hover:decoration-white"
          >
            {activeLang === 'EN' ? 'View All Stories' : 'सर्व बातम्या पहा'}
          </button>
        </div>

        {/* Masonry / Grid of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] lg:auto-rows-[280px]">
          
          {/* Card 1: Main (Col Span 2, Row Span 2) */}
          {news[0] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-1 sm:col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl border border-white/5"
            >
              <img 
                alt={activeLang === 'MR' && news[0].titleMr ? news[0].titleMr : news[0].title} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                src={news[0].image}
              />
              {/* Tonal overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 pr-6">
                <span className="bg-[#fc820c] text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase mb-3 inline-block">
                  {activeLang === 'MR' && news[0].tagMr ? news[0].tagMr : (news[0].tag || 'LATEST')}
                </span>
                <h4 className="font-sans font-extrabold text-xl sm:text-2xl lg:text-3xl text-white mt-1 leading-snug group-hover:text-orange-400 transition-colors text-left">
                  {activeLang === 'MR' && news[0].titleMr ? news[0].titleMr : news[0].title}
                </h4>
                <p className="text-white/60 text-xs sm:text-sm font-medium mt-2 text-left">
                  {activeLang === 'MR' && news[0].dateMr ? news[0].dateMr : news[0].date}
                </p>
              </div>
              
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          )}

          {/* Card 2: Student celebration (Col Span 1, Row Span 1) */}
          {news[1] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                alt={activeLang === 'MR' && news[1].titleMr ? news[1].titleMr : news[1].title} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                src={news[1].image}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left">
                <span className="text-orange-400 text-[10px] font-bold tracking-wider">
                  {activeLang === 'MR' && news[1].tagMr ? news[1].tagMr : news[1].tag}
                </span>
                <p className="text-white text-xs font-bold line-clamp-2 mt-1">
                  {activeLang === 'MR' && news[1].titleMr ? news[1].titleMr : news[1].title}
                </p>
              </div>
            </motion.div>
          )}

          {/* Card 3: Award ceremony (Col Span 1, Row Span 2) */}
          {news[3] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                alt={activeLang === 'MR' && news[3].titleMr ? news[3].titleMr : news[3].title} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                src={news[3].image}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Hover details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end text-left">
                <span className="bg-[#fc820c] text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase w-fit mb-2">
                  {activeLang === 'MR' && news[3].tagMr ? news[3].tagMr : (news[3].tag || 'AWARDS')}
                </span>
                <h5 className="font-sans font-bold text-white text-base leading-snug group-hover:text-orange-400 transition-colors line-clamp-3">
                  {activeLang === 'MR' && news[3].titleMr ? news[3].titleMr : news[3].title}
                </h5>
                <p className="text-white/60 text-xs mt-2">
                  {activeLang === 'MR' && news[3].dateMr ? news[3].dateMr : news[3].date}
                </p>
              </div>
            </motion.div>
          )}

          {/* Card 4: Twilight Campus (Col Span 1, Row Span 1) */}
          {news[2] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                alt={activeLang === 'MR' && news[2].titleMr ? news[2].titleMr : news[2].title} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                src={news[2].image}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left">
                <span className="text-orange-400 text-[10px] font-bold tracking-wider">
                  {activeLang === 'MR' && news[2].tagMr ? news[2].tagMr : news[2].tag}
                </span>
                <p className="text-white text-xs font-bold line-clamp-2 mt-1">
                  {activeLang === 'MR' && news[2].titleMr ? news[2].titleMr : news[2].title}
                </p>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
