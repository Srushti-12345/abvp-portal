import { Eye, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPreviewProps {
  activeLang: 'EN' | 'MR';
}

export default function AboutPreview({ activeLang }: AboutPreviewProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left side: content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left"
        >
          <span className="text-[#fc820c] font-sans font-extrabold text-xs tracking-[0.2em] uppercase mb-4">
            {activeLang === 'EN' ? 'Our Legacy' : 'आपला वारसा'}
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#001847] leading-tight tracking-tight mb-6">
            {activeLang === 'EN' 
              ? 'Shaping the Future through Digital Sovereignty' 
              : 'डिजिटल सार्वभौमत्वातून भावी पिढीची जडणघडण'}
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            {activeLang === 'EN' 
              ? 'ABVP Deogiri is a vibrant chapter of the Akhil Bharatiya Vidyarthi Parishad, committed to student welfare and national integrity. Through our digital portal, we aim to bridge the gap between administration and the student body, providing transparent resources and engagement opportunities.'
              : 'अभाविप देवगिरी ही अखिल भारतीय विद्यार्थी परिषदेची एक सक्रिय शाखा असून ती विद्यार्थी कल्याण आणि राष्ट्रीय एकात्मतेसाठी कटिबद्ध आहे. आमच्या डिजिटल पोर्टलद्वारे, आमचे उद्दिष्ट प्रशासन आणि विद्यार्थी यांच्यातील दुवा साधणे, पारदर्शक संसाधने आणि सहभागाच्या संधी प्रदान करणे हे आहे.'}
          </p>

          {/* Core pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#001847]/5 rounded-xl flex items-center justify-center text-[#001847] flex-shrink-0">
                <Eye className="h-5 w-5 text-[#fc820c]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 mb-1">
                  {activeLang === 'EN' ? 'Vision' : 'दृष्टीकोन (Vision)'}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {activeLang === 'EN' 
                    ? 'Global educational excellence rooted in Indian values.' 
                    : 'भारतीय जीवनमूल्यांवर आधारित जागतिक दर्जाची शैक्षणिक उत्कृष्टता.'}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#001847]/5 rounded-xl flex items-center justify-center text-[#001847] flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-[#fc820c]" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 mb-1">
                  {activeLang === 'EN' ? 'Mission' : 'ध्येय (Mission)'}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {activeLang === 'EN' 
                    ? 'Empowering every student through constructive activism.' 
                    : 'रचनात्मक छात्र आंदोलनाच्या माध्यमातून विद्यार्थ्यांचे सक्षमीकरण.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side: image layout with decorations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Accent colored floating backgrounds */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#fc820c]/5 rounded-2xl -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#001847]/5 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative">
            <img 
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="ABVP Deogiri Professional HQ Campus Building with Flagpole"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIXYfWw3v8j7K7seRaX6n9JwobGacW1F17VGVlvS-jntYrJZxHZfEnCUGXVbuchxhlLooD2cACX-F0_TWDxIMgKFM28mKBaAsmzfdlQqB7aTRxPjRTRpuYPJwYb5L-b9i_7kCCODWeQZB5PM30aJIaZLINu3vrA1nNrgeIM8sAq_njwkkAVU27azGJAmVQ2v5RuEhjWVea4osmbWD62NC-WWO-p9N39WfhUSN6nyOPnPXDUwxQpsQK0PdYnrmKvD1nRLQmcNmsPlFf"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
