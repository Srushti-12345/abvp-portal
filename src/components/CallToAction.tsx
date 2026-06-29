import { HeartHandshake, Award, BookOpen, Network } from 'lucide-react';
import { motion } from 'motion/react';

interface CallToActionProps {
  onJoinClick?: () => void;
  onSupportClick?: () => void;
  activeLang: 'EN' | 'MR';
}

export default function CallToAction({ onJoinClick, onSupportClick, activeLang }: CallToActionProps) {
  const benefitCards = [
    {
      label: activeLang === 'EN' ? 'Social Impact' : 'सामाजिक प्रभाव',
      icon: HeartHandshake,
      yOffset: 'translate-y-0',
    },
    {
      label: activeLang === 'EN' ? 'Leadership' : 'नेतृत्व विकास',
      icon: Award,
      yOffset: 'translate-y-6',
    },
    {
      label: activeLang === 'EN' ? 'Scholarship' : 'ज्ञान व चारित्र्य',
      icon: BookOpen,
      yOffset: 'translate-y-0',
    },
    {
      label: activeLang === 'EN' ? 'Networking' : 'संपर्क व संघटन',
      icon: Network,
      yOffset: 'translate-y-6',
    },
  ];

  return (
    <section className="mb-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="bg-[#001847] rounded-3xl overflow-hidden relative min-h-[440px] flex items-center p-8 lg:p-16">
        
        {/* Background designs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fc820c]/15 translate-x-1/4 -skew-x-12 transition-transform duration-700" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 translate-x-1/4 -skew-x-12" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left side text */}
          <div className="text-white text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight tracking-tight"
            >
              {activeLang === 'EN' ? 'Be the Change You Wish to See in Bharat.' : 'तुम्हाला भारतात जो बदल पाहायचा आहे, तो स्वतः बना.'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/70 font-sans text-base sm:text-lg mb-10 max-w-md leading-relaxed font-light"
            >
              {activeLang === 'EN' 
                ? "Join the world's largest student movement today and contribute to building a stronger, self-reliant nation."
                : 'आजच जगातील सर्वात मोठ्या विद्यार्थी चळवळीत सामील व्हा आणि मजबूत, स्वावलंबी राष्ट्र उभारणीत योगदान द्या.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={onJoinClick}
                className="bg-[#fc820c] hover:bg-[#d96a00] text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-xl hover:scale-103 transition-all cursor-pointer active:scale-95"
              >
                {activeLang === 'EN' ? 'Apply for Membership' : 'सदस्यत्वासाठी अर्ज करा'}
              </button>
              <button 
                onClick={onSupportClick}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all cursor-pointer active:scale-95"
              >
                {activeLang === 'EN' ? 'Support Our Cause' : 'सहकार्य करा'}
              </button>
            </motion.div>
          </div>

          {/* Right side benefits grid (only visible on large viewports, or beautifully adjusted for mobile) */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4 pb-6">
              {benefitCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${card.yOffset}`}
                  >
                    <div className="w-12 h-12 bg-[#fc820c]/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-[#fc820c]" />
                    </div>
                    <h4 className="font-sans font-bold text-white text-base tracking-tight">
                      {card.label}
                    </h4>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
