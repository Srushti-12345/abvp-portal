import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import { InitiativeItem } from '../types';

interface ActivitiesPreviewProps {
  initiatives: InitiativeItem[];
  onAccessPortalClick?: () => void;
  onDownloadResourcesClick?: () => void;
  activeLang: 'EN' | 'MR';
}

export default function ActivitiesPreview({ 
  initiatives, 
  onAccessPortalClick,
  onDownloadResourcesClick,
  activeLang
}: ActivitiesPreviewProps) {
  
  return (
    <section id="activities" className="py-20 lg:py-28 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#001847] text-center mb-16 tracking-tight">
          {activeLang === 'EN' ? 'Key Initiatives & Activities' : 'प्रमुख उपक्रम व मोहिमा'}
        </h2>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Think India (Col Span 2, Row Span 1) */}
          {initiatives[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col justify-between group relative overflow-hidden min-h-[300px]"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#001847]/5 rounded-bl-full -mr-6 -mt-6 group-hover:bg-[#001847]/10 transition-colors duration-300" />
              <div>
                <div className="w-14 h-14 bg-[#001847] text-white rounded-2xl flex items-center justify-center mb-6">
                  {(() => {
                    const Icon = (LucideIcons as any)[initiatives[0].icon] || LucideIcons.Lightbulb;
                    return <Icon className="h-7 w-7" />;
                  })()}
                </div>
                <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-[#001847] mb-3 text-left">
                  {activeLang === 'MR' && initiatives[0].titleMr ? initiatives[0].titleMr : initiatives[0].title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-md text-left">
                  {activeLang === 'MR' && initiatives[0].descriptionMr ? initiatives[0].descriptionMr : initiatives[0].description}
                </p>
              </div>
              <a 
                href={initiatives[0].link}
                className="text-[#001847] font-extrabold inline-flex items-center gap-1.5 group/link hover:text-[#fc820c] transition-colors"
              >
                {(activeLang === 'MR' && initiatives[0].actionTextMr ? initiatives[0].actionTextMr : initiatives[0].actionText) || (activeLang === 'EN' ? 'Learn More' : 'अधिक माहिती')}
                <LucideIcons.ArrowRight className="h-4 w-4 group-hover/link:translate-x-1.5 transition-transform" />
              </a>
            </motion.div>
          )}

          {/* Card 2: SFD (Col Span 1, Saffron custom style) */}
          {initiatives[1] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-1 bg-[#964900] text-white p-8 rounded-3xl shadow-sm flex flex-col justify-between group min-h-[300px]"
            >
              <div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {(() => {
                    const Icon = (LucideIcons as any)[initiatives[1].icon] || LucideIcons.Leaf;
                    return <Icon className="h-7 w-7" />;
                  })()}
                </div>
                <h3 className="font-sans font-extrabold text-2xl mb-3 text-left">
                  {activeLang === 'MR' && initiatives[1].titleMr ? initiatives[1].titleMr : initiatives[1].title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 text-left">
                  {activeLang === 'MR' && initiatives[1].descriptionMr ? initiatives[1].descriptionMr : initiatives[1].description}
                </p>
              </div>
              <a 
                href={initiatives[1].link}
                className="text-white font-extrabold inline-flex items-center gap-1.5 group/link hover:underline underline-offset-4"
              >
                {(activeLang === 'MR' && initiatives[1].actionTextMr ? initiatives[1].actionTextMr : initiatives[1].actionText) || (activeLang === 'EN' ? 'Join Drive' : 'सहभागी व्हा')}
                <LucideIcons.ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          )}

          {/* Card 3: SFS (Col Span 1, Deep Navy custom style) */}
          {initiatives[2] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-1 bg-[#001847] text-white p-8 rounded-3xl shadow-sm flex flex-col justify-between group min-h-[300px]"
            >
              <div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {(() => {
                    const Icon = (LucideIcons as any)[initiatives[2].icon] || LucideIcons.Shield;
                    return <Icon className="h-7 w-7" />;
                  })()}
                </div>
                <h3 className="font-sans font-extrabold text-2xl mb-3 text-left">
                  {activeLang === 'MR' && initiatives[2].titleMr ? initiatives[2].titleMr : initiatives[2].title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 text-left">
                  {activeLang === 'MR' && initiatives[2].descriptionMr ? initiatives[2].descriptionMr : initiatives[2].description}
                </p>
              </div>
              <a 
                href={initiatives[2].link}
                className="text-white font-extrabold inline-flex items-center gap-1.5 group/link hover:underline underline-offset-4"
              >
                {(activeLang === 'MR' && initiatives[2].actionTextMr ? initiatives[2].actionTextMr : initiatives[2].actionText) || (activeLang === 'EN' ? 'Volunteer' : 'स्वयंसेवक बना')}
                <LucideIcons.ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          )}

          {/* Card 4: Jignasa (Col Span 1, White card) */}
          {initiatives[3] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col justify-between group min-h-[300px]"
            >
              <div>
                <div className="w-12 h-12 bg-[#001847]/5 text-[#001847] rounded-xl flex items-center justify-center mb-4">
                  {(() => {
                    const Icon = (LucideIcons as any)[initiatives[3].icon] || LucideIcons.FlaskConical;
                    return <Icon className="h-6 w-6 text-[#fc820c]" />;
                  })()}
                </div>
                <h3 className="font-sans font-extrabold text-xl text-[#001847] mb-2 text-left">
                  {activeLang === 'MR' && initiatives[3].titleMr ? initiatives[3].titleMr : initiatives[3].title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 text-left">
                  {activeLang === 'MR' && initiatives[3].descriptionMr ? initiatives[3].descriptionMr : initiatives[3].description}
                </p>
              </div>
              <a 
                href={initiatives[3].link}
                className="text-[#001847] font-extrabold text-sm hover:text-[#fc820c] transition-colors text-left block"
              >
                {(activeLang === 'MR' && initiatives[3].actionTextMr ? initiatives[3].actionTextMr : initiatives[3].actionText) || (activeLang === 'EN' ? 'Project Details' : 'प्रकल्पाची माहिती')}
              </a>
            </motion.div>
          )}

          {/* Card 5: Educational Directory Preview (Col Span 3, Row Span 1) */}
          <motion.div 
            id="portal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-3 relative rounded-3xl overflow-hidden shadow-xl group min-h-[300px]"
          >
            {/* Background Image & Zoom effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-700" 
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMP0g_hGdzn4LGjj74L6qFIYb9FgbAjId4asCj9u2OeRxzlYaqApTo8ZbQ7tCazMBGPyDchgL4w7c1tsjBmEotGp6f0O_ArB-HrkOAy9OhpJkwCopHABpwB6V-krfiuS0okWBkUKu0uFJ6YSdcJHFI0ikCZ2bocbwMp1X3-On_cxKKHKLzwx69sxt0ZQWNzLawdKXA6X7NjH8jRGb5LPGDF3Zn4Tzlol_YN2jhPjWEoj9NsIj5Ue762GHUgHixpvPDym135OPQUIOl')`
              }}
            />
            {/* Tonal gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#001847] via-[#001847]/75 to-transparent" />
            
            {/* Content inside */}
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-center text-white max-w-lg">
              <span className="inline-block px-3 py-1 bg-[#fc820c] text-white text-xs font-extrabold rounded-md mb-4 w-fit uppercase tracking-widest">
                {activeLang === 'EN' ? 'Highlight' : 'विशेष आकर्षण'}
              </span>
              <h3 className="font-sans font-extrabold text-2xl lg:text-3xl mb-4 text-white tracking-tight text-left">
                {activeLang === 'EN' ? 'Educational Excellence Portal' : 'शैक्षणिक उत्कृष्टता पोर्टल'}
              </h3>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed mb-8 font-light text-left">
                {activeLang === 'EN' 
                  ? 'Access all university documents, educational laws, and committee structures in one place.'
                  : 'सर्व विद्यापीठ दस्तऐवज, शैक्षणिक कायदे आणि समिती रचना एकाच ठिकाणी मिळवा.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onAccessPortalClick}
                  className="bg-white hover:bg-slate-100 text-[#001847] px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Access Portal' : 'पोर्टलमध्ये प्रवेश करा'}
                </button>
                <button 
                  onClick={onDownloadResourcesClick}
                  className="bg-transparent border border-white/50 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-extrabold text-sm active:scale-95 transition-all cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Download Resources' : 'साधने डाउनलोड करा'}
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
