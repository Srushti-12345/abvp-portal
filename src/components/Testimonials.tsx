import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialsProps {
  activeLang: 'EN' | 'MR';
}

export default function Testimonials({ activeLang }: TestimonialsProps) {
  return (
    <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 sm:p-12 lg:p-20 relative">
        
        {/* Decorative blur elements for modern UI feel */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fc820c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#001847]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Quote icon */}
          <div className="w-16 h-16 bg-[#fc820c]/10 rounded-full flex items-center justify-center mb-6">
            <Quote className="h-8 w-8 text-[#fc820c] rotate-180" />
          </div>

          {/* Quote body text */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-[#001847] mb-10 italic leading-snug"
          >
            {activeLang === 'EN' 
              ? '"ABVP provided me the platform to transition from being just a student to a responsible citizen leader. Their focus on national development is truly inspiring."'
              : '"अभाविपने मला केवळ एक विद्यार्थी असण्यापासून ते एका जबाबदार नागरिक नेत्यापर्यंत विकसित होण्यासाठी व्यासपीठ मिळवून दिले. त्यांचा राष्ट्र उभारणीवरील भर खरोखरच प्रेरणादायी आहे."'}
          </motion.p>

          {/* Author info */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-white shadow-xl overflow-hidden mb-3 bg-slate-200">
              <img 
                className="w-full h-full object-cover" 
                alt="Siddharth Mahajan - ABVP Representative Student"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBosMa9Y0DDDf8hoURp7MtHqDfXX6riAdAbn_WGf5ZxREp-_ogGTdRLw6oZav_SZ4U2QAjgHdmwtLN-_O7aLnXfCuTkBKABv7-4TItGD3yZdJl1xXIu_WbsrNLfP9xyKX9cTtAzJmaN3icQJUuxzjerRnRTIlkzc5ImZ0sOIyfALbdGHTLkWf2_uDsdResiJROC5j5VmclzttmowZDGj_YTE8421jA0vveG3hpHmhcyJFFEtd91Qeg72H8iFDh1pg7A85P83HRlOjoI"
              />
            </div>
            <h5 className="font-sans font-extrabold text-[#001847] text-lg">
              {activeLang === 'EN' ? 'Siddharth Mahajan' : 'सिद्धार्थ महाजन'}
            </h5>
            <p className="text-sm text-slate-500 font-medium">
              {activeLang === 'EN' ? 'Student, Government Engineering College' : 'विद्यार्थी, शासकीय अभियांत्रिकी महाविद्यालय'}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
