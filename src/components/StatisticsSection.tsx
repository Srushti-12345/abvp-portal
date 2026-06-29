import * as LucideIcons from 'lucide-react';
import { StatItem } from '../types';

interface StatisticsSectionProps {
  stats: StatItem[];
  activeLang: 'EN' | 'MR';
}

export default function StatisticsSection({ stats, activeLang }: StatisticsSectionProps) {
  return (
    <section className="relative -mt-16 z-30 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-100">
        {stats.map((stat, idx) => {
          // Dynamic icon resolver
          const IconComponent = (LucideIcons as any)[stat.icon] || LucideIcons.Compass;
          const displayLabel = activeLang === 'MR' && stat.labelMr ? stat.labelMr : stat.label;

          return (
            <div 
              key={stat.id} 
              className={`p-6 text-center flex flex-col items-center justify-center transition-all duration-300 hover:bg-slate-50 group ${
                idx < stats.length - 1 ? 'border-r border-b lg:border-b-0 border-slate-100' : 'border-b sm:border-b-0'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#001847]/5 flex items-center justify-center mb-3 group-hover:bg-[#fc820c]/10 group-hover:scale-110 transition-all duration-300">
                <IconComponent className="h-6 w-6 text-[#001847] group-hover:text-[#fc820c] transition-colors" />
              </div>
              <span className="font-sans font-extrabold text-2xl lg:text-3xl text-[#001847] tracking-tight mb-1">
                {stat.value}
              </span>
              <span className="font-sans text-xs font-semibold text-slate-500 uppercase tracking-widest leading-none">
                {displayLabel}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
