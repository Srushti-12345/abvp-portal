import { motion } from 'motion/react';
import { ArrowRight, Landmark, Layers, MapPin, Building, GraduationCap } from 'lucide-react';

interface OrganizationalFabricProps {
  activeLang: 'EN' | 'MR';
}

export default function OrganizationalFabric({ activeLang }: OrganizationalFabricProps) {
  const steps = [
    {
      level: activeLang === 'EN' ? 'State' : 'प्रांत',
      marathi: activeLang === 'EN' ? 'DEOGIRI PRANT' : 'देवगिरी प्रांत',
      icon: Landmark,
      color: 'border-[#fc820c] text-[#fc820c]',
      bg: 'bg-[#fc820c]/10',
    },
    {
      level: activeLang === 'EN' ? 'Division' : 'विभाग',
      marathi: activeLang === 'EN' ? 'VIBHAG' : 'विभाग स्तर',
      icon: Layers,
      color: 'border-white/30 text-white',
      bg: 'bg-white/5',
    },
    {
      level: activeLang === 'EN' ? 'District' : 'जिल्हा',
      marathi: activeLang === 'EN' ? 'DISTRICT' : 'जिल्हा स्तर',
      icon: MapPin,
      color: 'border-white/30 text-white',
      bg: 'bg-white/5',
    },
    {
      level: activeLang === 'EN' ? 'City' : 'नगर',
      marathi: activeLang === 'EN' ? 'NAGAR' : 'नगर स्तर',
      icon: Building,
      color: 'border-white/30 text-white',
      bg: 'bg-white/5',
    },
    {
      level: activeLang === 'EN' ? 'Unit' : 'शाखा',
      marathi: activeLang === 'EN' ? 'CAMPUS UNIT' : 'महाविद्यालय शाखा',
      icon: GraduationCap,
      color: 'border-white/30 text-white',
      bg: 'bg-white/5',
    },
  ];

  return (
    <section id="organization" className="py-20 lg:py-24 bg-[#001847] text-white overflow-hidden relative">
      {/* Subtle architectural design grids in background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
      <div className="absolute -top-40 right-10 w-96 h-96 bg-[#fc820c]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4"
          >
            {activeLang === 'EN' ? 'Organizational Fabric' : 'घटनात्मक संरचना'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {activeLang === 'EN' 
              ? 'Connecting our diverse ecosystem from state leadership to every college campus across the Deogiri region.'
              : 'देवगिरी प्रांतातील राज्य नेतृत्वापासून ते प्रत्येक महाविद्यालयीन शाखेपर्यंत आमच्या वैविध्यपूर्ण रचनेला जोडत आहोत.'}
          </motion.p>
        </div>

        {/* Steps Hierarchy Flow Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 xl:gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                
                {/* Step Circle Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={`w-28 h-28 rounded-full border-2 ${step.color} ${step.bg} flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 hover:bg-[#fc820c] hover:border-[#fc820c] hover:text-white group-hover:shadow-lg group-hover:shadow-[#fc820c]/25 relative`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="font-sans font-bold text-lg leading-none tracking-tight">
                      {step.level}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white/50 mt-4 group-hover:text-white transition-colors">
                    {step.marathi}
                  </span>
                </motion.div>

                {/* Connector Arrow */}
                {idx < steps.length - 1 && (
                  <div className="my-4 lg:my-0 lg:mx-3 xl:mx-5 text-white/25 flex items-center justify-center rotate-90 lg:rotate-0">
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
