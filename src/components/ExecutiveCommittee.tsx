import { Mail, Share2, ArrowRight } from 'lucide-react';
import { CommitteeMember } from '../types';
import { motion } from 'motion/react';

interface ExecutiveCommitteeProps {
  members: CommitteeMember[];
  onViewAllClick?: () => void;
  activeLang: 'EN' | 'MR';
}

export default function ExecutiveCommittee({ members, onViewAllClick, activeLang }: ExecutiveCommitteeProps) {
  return (
    <section className="py-20 lg:py-28 bg-white max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <span className="text-[#fc820c] font-sans font-extrabold text-xs tracking-[0.2em] uppercase mb-2 block">
            {activeLang === 'EN' ? 'Leadership' : 'नेतृत्व'}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#001847] tracking-tight">
            {activeLang === 'EN' ? 'Executive Committee' : 'कार्यकारिणी समिती'}
          </h2>
        </div>
        <button 
          onClick={onViewAllClick}
          className="flex items-center gap-2 text-[#001847] hover:text-[#fc820c] font-bold text-sm lg:text-base group/btn transition-colors shrink-0"
        >
          {activeLang === 'EN' ? 'View All Members' : 'सर्व सदस्य पहा'} 
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Grid Layout of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, idx) => {
          const nameText = activeLang === 'MR' && member.nameMr ? member.nameMr : member.name;
          const roleText = activeLang === 'MR' && member.roleMr ? member.roleMr : member.role;

          return (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Wrap */}
              <div className="h-72 overflow-hidden relative bg-slate-50">
                <img 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  alt={`${nameText} - ${roleText}`}
                  src={member.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001847]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Member Details */}
              <div className="p-6">
                <h3 className="font-sans font-extrabold text-lg lg:text-xl text-[#001847] tracking-tight mb-1 text-left">
                  {nameText}
                </h3>
                <p className="text-xs text-[#fc820c] font-black uppercase tracking-wider mb-5 text-left">
                  {roleText}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#001847] hover:text-white transition-colors"
                    title="Send Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <button 
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#001847] hover:text-white transition-colors"
                    title="Share Contact"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
