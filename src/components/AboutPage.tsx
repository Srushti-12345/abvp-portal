import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Award, BookOpen, Flag, Shield, HeartHandshake, Compass, 
  ChevronDown, Star, Landmark, Target, ShieldCheck, CheckCircle2,
  HelpCircle, Image as ImageIcon, Sparkles, Mail, Phone, Calendar
} from 'lucide-react';

interface AboutPageProps {
  activeLang: 'EN' | 'MR';
  onJoinClick?: () => void;
  onExploreOrgClick?: () => void;
}

export default function AboutPage({ activeLang, onJoinClick, onExploreOrgClick }: AboutPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = (targetId?: string) => {
      const id = targetId || localStorage.getItem('navScrollTarget');
      if (id) {
        localStorage.removeItem('navScrollTarget');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      }
    };

    handleScroll();

    const listener = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.scrollTarget) {
        handleScroll(customEvent.detail.scrollTarget);
      }
    };

    window.addEventListener('navSectionChange', listener);
    return () => {
      window.removeEventListener('navSectionChange', listener);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const coreValues = [
    { name: 'Integrity', nameMr: 'प्रामाणिकपणा', desc: 'Adherence to moral principles', icon: Shield },
    { name: 'Discipline', nameMr: 'शिस्त', desc: 'Systematic code of conduct', icon: ShieldCheck },
    { name: 'Leadership', nameMr: 'नेतृत्व विकास', desc: 'Inspiring collective action', icon: Award },
    { name: 'Patriotism', nameMr: 'राष्ट्रभक्ती', desc: 'Devotion to nation-building', icon: Flag },
    { name: 'Service', nameMr: 'सेवाभाव', desc: 'Unconditional welfare for all', icon: HeartHandshake },
    { name: 'Unity', nameMr: 'एकता', desc: 'Strength in social harmony', icon: Users },
  ];

  const timeline = [
    {
      year: '1949',
      title: 'The Foundation',
      titleMr: 'स्थापना',
      desc: 'Established with the motto of character building and educational reform on a national level.',
      descMr: 'राष्ट्रीय पातळीवर चरित्र निर्मिती आणि शैक्षणिक सुधारणेच्या ध्येयाने स्थापना.'
    },
    {
      year: '1975',
      title: 'Resisting Emergency',
      titleMr: 'आणीबाणीचा प्रतिकार',
      desc: 'Played a pivotal role in the struggle for democracy during the Emergency era, defending student rights.',
      descMr: 'आणीबाणीच्या काळात लोकशाहीच्या रक्षणासाठी आणि विद्यार्थ्यांच्या हक्कांसाठी महत्त्वपूर्ण लढा दिला.'
    },
    {
      year: '1990s',
      title: 'Deogiri Expansion',
      titleMr: 'देवगिरी विस्तार',
      desc: 'Strengthening presence across universities and colleges in the Aurangabad (Deogiri) region.',
      descMr: 'औरंगाबाद (देवगिरी) विभागातील विद्यापीठे आणि महाविद्यालयांमध्ये संघटन मजबूत केले.'
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      titleMr: 'डिजिटल परिवर्तन',
      desc: 'Launching the Digital Portal to empower students with technology and transparent governance.',
      descMr: 'विद्यार्थ्यांना तंत्रज्ञान आणि पारदर्शक कारभाराद्वारे सक्षम करण्यासाठी डिजिटल पोर्टलचे अनावरण.'
    }
  ];

  const faqs = [
    {
      q: 'What is ABVP?',
      qMr: 'अभाविप म्हणजे काय?',
      a: 'ABVP (Akhil Bharatiya Vidyarthi Parishad) is a right-wing, nationalist student organization in Bharat. It was founded in 1949 and is currently the world\'s largest student organization.',
      aMr: 'अभाविप (अखिल भारतीय विद्यार्थी परिषद) ही भारतातील राष्ट्रभक्त विद्यार्थी संघटना आहे. १९४९ मध्ये स्थापन झालेली ही आज जगातील सर्वात मोठी विद्यार्थी संघटना आहे.'
    },
    {
      q: 'Who can join ABVP?',
      qMr: 'अभाविपमध्ये कोण सामील होऊ शकते?',
      a: 'Any student currently enrolled in an educational institution (School, College, or University) who believes in the principles of nationalism and character building can join ABVP.',
      aMr: 'राष्ट्रभक्ती आणि चरित्र निर्मितीवर विश्वास असणारा आणि कोणत्याही मान्यताप्राप्त शाळेत किंवा महाविद्यालयात शिकणारा कोणताही विद्यार्थी अभाविपमध्ये सामील होऊ शकतो.'
    },
    {
      q: 'Is ABVP only active in politics?',
      qMr: 'अभाविप केवळ राजकारणातच सक्रिय आहे का?',
      a: 'No, ABVP is a student organization that works for overall personality development through sports, art, literacy campaigns, social service, and academic excellence alongside student rights advocacy.',
      aMr: 'नाही, अभाविप ही क्रीडा, कला, साक्षरता मोहीम, समाजसेवा, शैक्षणिक गुणवत्ता आणि विद्यार्थ्यांच्या हक्कांच्या रक्षणासह सर्वांगीण व्यक्तिमत्त्व विकासासाठी कार्य करणारी संघटना आहे.'
    }
  ];

  return (
    <div className="flex-grow bg-[#F8F9FA]">
      
      {/* 1. Page Title Hero */}
      <section className="relative py-24 sm:py-32 bg-[#001847] text-white overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#001847]/75 mix-blend-multiply z-10" />
          <img 
            alt="ABVP Leadership Workshop" 
            className="w-full h-full object-cover" 
            src="public/about_hero.webp"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-20 text-left w-full">
          <motion.span 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-[#fc820c] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider mb-6"
          >
            {activeLang === 'EN' ? 'Student Power – Nation Power' : 'छात्र शक्ति - राष्ट्र शक्ति'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4"
          >
            {activeLang === 'EN' ? 'About ABVP Deogiri' : 'अभाविप देवगिरी बद्दल'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-lg sm:text-xl lg:text-2xl text-orange-200 max-w-3xl mb-10 leading-relaxed font-light"
          >
            {activeLang === 'EN' 
              ? 'Building Student Leaders Since Decades. Empowering the youth to lead the future of India.'
              : 'दशकांपासून विद्यार्थी नेत्यांची जडणघडण. भारताच्या भविष्याचे नेतृत्व करण्यासाठी तरुणांना सक्षम करत आहोत.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={onExploreOrgClick}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold px-8 py-4 rounded-xl transition-all hover:scale-103 cursor-pointer"
            >
              {activeLang === 'EN' ? 'Explore Organization' : 'संघटना तपासा'}
            </button>
            <button 
              onClick={onJoinClick}
              className="bg-[#fc820c] hover:bg-[#d96a00] text-white font-extrabold px-8 py-4 rounded-xl transition-all hover:scale-103 shadow-lg hover:shadow-orange-500/20 cursor-pointer"
            >
              {activeLang === 'EN' ? 'Join ABVP' : 'अभाविप मध्ये सामील व्हा'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Overview Introduction */}
      <section id="overview-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#fc820c]/20 rounded-full blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-100 aspect-[4/3]">
              <img 
                alt="Green Campus Drive" 
                className="w-full h-full object-cover" 
                src="public/home_img/news1.jpg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-l-4 border-[#fc820c] border border-slate-100 max-w-[280px]">
              <p className="font-sans font-black text-2xl text-[#001847] mb-1">
                {activeLang === 'EN' ? 'Since 1949' : '१९४९ पासून'}
              </p>
              <p className="font-sans text-xs text-slate-500 font-medium leading-relaxed">
                {activeLang === 'EN' ? 'Leading the student movement with character and integrity.' : 'चारित्र्य आणि सचोटीने विद्यार्थी चळवळीचे नेतृत्व करत आहोत.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#001847] leading-tight mb-2">
              {activeLang === 'EN' ? 'Akhil Bharatiya Vidyarthi Parishad (ABVP)' : 'अखिल भारतीय विद्यार्थी परिषद (अभाविप)'}
            </h2>
            <div className="w-20 h-1 bg-[#fc820c] mb-8 rounded-full" />
            
            <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8">
              <p>
                {activeLang === 'EN' 
                  ? "Akhil Bharatiya Vidyarthi Parishad (ABVP) is India's premier student organization, dedicated to the holistic development of students and the progress of the nation. For over seven decades, we have been the vanguard of educational reforms and nationalist sentiment on campuses across Bharat."
                  : "अखिल भारतीय विद्यार्थी परिषद (अभाविप) ही भारतातील अग्रगण्य विद्यार्थी संघटना असून ती विद्यार्थ्यांच्या सर्वांगीण विकासासाठी आणि देशाच्या प्रगतीसाठी समर्पित आहे. सात दशकांहून अधिक काळ आम्ही संपूर्ण भारतात कॅम्पसमध्ये शैक्षणिक सुधारणा आणि राष्ट्रवादाचे नेतृत्व करत आहोत."}
              </p>
              <p>
                {activeLang === 'EN' 
                  ? "In the Deogiri region, ABVP has been instrumental in addressing regional educational challenges, fostering local talent, and creating a robust network of student leaders who contribute significantly to society. We believe that students are not just citizens of tomorrow, but critical stakeholders of today."
                  : "देवगिरी विभागात, अभाविपने प्रादेशिक शैक्षणिक आव्हाने सोडवण्यात, स्थानिक गुणवत्तेला वाव देण्यात आणि समाजात सक्रिय योगदान देणाऱ्या विद्यार्थी नेत्यांचे जाळे निर्माण करण्यात मोलाची भूमिका बजावली आहे. आपला विश्वास आहे की विद्यार्थी हे केवळ उद्याचे मतदार नाहीत, तर आजचे राष्ट्रनिर्माते आहेत."}
              </p>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#001847] font-extrabold text-sm sm:text-base">
                <CheckCircle2 className="h-5 w-5 text-[#fc820c] flex-shrink-0" />
                <span>{activeLang === 'EN' ? "World's largest student organization" : "जगातील सर्वात मोठी विद्यार्थी संघटना"}</span>
              </li>
              <li className="flex items-center gap-3 text-[#001847] font-extrabold text-sm sm:text-base">
                <CheckCircle2 className="h-5 w-5 text-[#fc820c] flex-shrink-0" />
                <span>{activeLang === 'EN' ? "Non-partisan, mission-driven approach" : "बिगर राजकीय, ध्येयवादी दृष्टिकोन"}</span>
              </li>
              <li className="flex items-center gap-3 text-[#001847] font-extrabold text-sm sm:text-base">
                <CheckCircle2 className="h-5 w-5 text-[#fc820c] flex-shrink-0" />
                <span>{activeLang === 'EN' ? "Fostering leadership through constructive activities" : "रचनात्मक उपक्रमांद्वारे नेतृत्व विकास"}</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Our Vision & Mission */}
      <section id="vision-mission-section" className="bg-slate-50 py-24 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
              {activeLang === 'EN' ? 'Our Vision & Mission' : 'दृष्टीकोन आणि ध्येय'}
            </h2>
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'Guiding the youth towards national excellence through character building and academic discipline.'
                : 'चरित्र निर्मिती आणि शैक्षणिक शिस्तीच्या माध्यमातून तरुणांना राष्ट्रीय उत्कृष्टतेकडे नेणे.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dark Blue Vision Card */}
            <div className="lg:col-span-1 bg-[#001847] text-white p-10 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div>
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl mb-6">
                  {activeLang === 'EN' ? 'Our Vision' : 'आमचा दृष्टीकोन'}
                </h3>
                <p className="font-sans text-base sm:text-lg italic leading-relaxed mb-8 border-l-4 border-[#fc820c] pl-6 opacity-90">
                  {activeLang === 'EN' 
                    ? '"To build a cadre of disciplined and patriotic youth who will lead Bharat to its position as Vishwa Guru."'
                    : '"शिस्तबद्ध आणि राष्ट्रभक्त तरुणांची फळी निर्माण करणे, जी भारताला विश्वगुरूच्या पदावर नेण्यासाठी नेतृत्व करेल."'}
                </p>
              </div>
              <div className="pt-8 border-t border-white/20">
                <p className="font-mono text-xs text-orange-400 font-bold uppercase tracking-widest mb-1">
                  {activeLang === 'EN' ? 'ABVP Philosophy' : 'अभाविप तत्वज्ञान'}
                </p>
                <p className="font-sans font-extrabold text-lg">
                  {activeLang === 'EN' ? 'National Reconstruction' : 'राष्ट्रीय पुनर्निर्माण'}
                </p>
              </div>
            </div>

            {/* Mission Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-8 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-slate-50 text-[#001847] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#001847] group-hover:text-white transition-all">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-3">
                  {activeLang === 'EN' ? 'Student Development' : 'विद्यार्थी विकास'}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                  {activeLang === 'EN'
                    ? 'Focusing on academic excellence, skill acquisition, and personality growth through workshops and seminars.'
                    : 'विविध कार्यशाळा आणि चर्चासत्रांच्या माध्यमातून शैक्षणिक उत्कृष्टता, कौशल्य संपादन आणि व्यक्तिमत्त्व विकासावर भर.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-slate-50 text-[#001847] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#001847] group-hover:text-white transition-all">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-3">
                  {activeLang === 'EN' ? 'Educational Reforms' : 'शैक्षणिक सुधारणा'}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                  {activeLang === 'EN'
                    ? "Striving for student-centric policies and a nationalist education system that honors India's heritage."
                    : "विद्यार्थी-केंद्रित धोरणे आणि भारताच्या महान वारशाचा सन्मान करणाऱ्या राष्ट्रीय शैक्षणिक व्यवस्थेसाठी धडपड."}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-slate-50 text-[#001847] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#001847] group-hover:text-white transition-all">
                  <Flag className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-3">
                  {activeLang === 'EN' ? 'Nation Building' : 'राष्ट्र उभारणी'}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                  {activeLang === 'EN'
                    ? 'Instilling a sense of duty and patriotism through active social service and environmental initiatives.'
                    : 'समाजसेवा आणि पर्यावरणपूरक उपक्रमांद्वारे विद्यार्थ्यांमध्ये कर्तव्य भावना आणि देशप्रेम रुजवणे.'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-slate-50 text-[#001847] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#001847] group-hover:text-white transition-all">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-3">
                  {activeLang === 'EN' ? 'Social Equality' : 'सामाजिक समता'}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                  {activeLang === 'EN'
                    ? 'Promoting harmony and equal opportunities for students from all sections of society.'
                    : 'समाजातील सर्व स्तरांतील विद्यार्थ्यांसाठी बंधुभाव, समरसता आणि समान संधींचा प्रसार करणे.'}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section id="core-values-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
            {activeLang === 'EN' ? 'Core Values' : 'जीवनमूल्ये'}
          </h2>
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-12 h-1 bg-[#fc820c] rounded-full" />
            <div className="w-4 h-1 bg-[#fc820c]/50 rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors duration-300 shadow-sm hover:shadow-md">
                  <div className="w-12 h-12 text-[#001847] flex items-center justify-center mb-4">
                    <IconComp className="h-10 w-10 text-[#001847] stroke-[1.5]" />
                  </div>
                  <h5 className="font-sans font-extrabold text-sm text-[#001847] uppercase tracking-wider">
                    {activeLang === 'EN' ? val.name : val.nameMr}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Journey / Timeline of ABVP Deogiri */}
      <section id="timeline-section" className="py-24 bg-white relative border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 relative">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] text-center mb-20">
            {activeLang === 'EN' ? 'Journey of ABVP Deogiri' : 'अभाविप देवगिरीचा प्रवास'}
          </h2>

          {/* Timeline central vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-[75%] top-40 w-[2px] bg-gradient-to-b from-[#001847] to-[#fc820c] hidden md:block" />

          <div className="space-y-24">
            {timeline.map((item, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-center ${
                  idx % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`md:w-1/2 text-center mb-8 md:mb-0 ${
                  idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                }`}>
                  <span className="font-sans font-black text-5xl lg:text-6xl text-[#fc820c] opacity-20 block mb-2 font-mono">
                    {item.year}
                  </span>
                  <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-[#001847] mb-2">
                    {activeLang === 'EN' ? item.title : item.titleMr}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                    {activeLang === 'EN' ? item.desc : item.descMr}
                  </p>
                </div>

                {/* Bullet */}
                <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md z-10 hidden md:block ${
                  idx % 2 === 0 ? 'bg-[#001847]' : 'bg-[#fc820c]'
                }`} />

                <div className="md:w-1/2" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Objectives & Why Join ABVP Split Section */}
      <section id="objectives-section" className="py-24 px-6 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Objectives Card */}
          <div className="bg-white p-10 sm:p-12 rounded-3xl border border-slate-200/60 shadow-md text-left flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#001847] mb-8 flex items-center gap-4">
                <Target className="h-8 w-8 text-[#fc820c]" />
                {activeLang === 'EN' ? 'Our Objectives' : 'आमचे मुख्य उद्देश'}
              </h3>

              <div className="space-y-8">
                {[
                  {
                    num: '01',
                    title: 'Student Welfare',
                    titleMr: 'विद्यार्थी कल्याण',
                    desc: 'Safeguarding the rights and interests of students in all academic environments.',
                    descMr: 'सर्व शैक्षणिक परिसरांमध्ये विद्यार्थ्यांच्या हक्कांचे आणि हितसंबंधांचे रक्षण करणे.'
                  },
                  {
                    num: '02',
                    title: 'Character Building',
                    titleMr: 'चारित्र्य निर्मिती',
                    desc: 'Nurturing ethical behavior, leadership qualities, and spiritual growth.',
                    descMr: 'नैतिक वर्तन, नेतृत्व कौशल्य आणि देशप्रेमाची भावना रुजविणे.'
                  },
                  {
                    num: '03',
                    title: 'Constructive Activism',
                    titleMr: 'रचनात्मक चळवळ',
                    desc: 'Engaging in social work, disaster relief, and village adoption programs.',
                    descMr: 'समाजसेवा, वृक्षारोपण, आणि ग्रामविकास उपक्रमांमध्ये सक्रिय सहभाग.'
                  }
                ].map((obj, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[#fc820c] font-mono text-xs">
                      {obj.num}
                    </div>
                    <div>
                      <h5 className="font-sans font-extrabold text-base text-[#001847] mb-1">
                        {activeLang === 'EN' ? obj.title : obj.titleMr}
                      </h5>
                      <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                        {activeLang === 'EN' ? obj.desc : obj.descMr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Join ABVP Card */}
          <div className="bg-[#001847] text-white p-10 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl border border-white/5 text-left">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            
            <div>
              <h3 className="font-sans font-black text-2xl sm:text-3xl mb-8 flex items-center gap-4">
                <Users className="h-8 w-8 text-orange-400" />
                {activeLang === 'EN' ? 'Why Join ABVP?' : 'अभाविप मध्ये का सामील व्हावे?'}
              </h3>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed mb-10 font-light">
                {activeLang === 'EN'
                  ? "Being part of India's largest student network offers unparalleled opportunities for personal and professional growth."
                  : "भारतातील सर्वात मोठ्या विद्यार्थी नेटवर्कचा भाग असणे वैयक्तिक विकास, समाजसेवा आणि युवा नेतृत्वाच्या अतुलनीय संधी प्रदान करते."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: 'hub', label: 'Networking', labelMr: 'नेटवर्किंग' },
                  { icon: 'psychology', label: 'Skill Training', labelMr: 'कौशल्य प्रशिक्षण' },
                  { icon: 'workspace_premium', label: 'Leadership', labelMr: 'नेतृत्व विकास' },
                  { icon: 'public', label: 'Social Impact', labelMr: 'सामाजिक प्रभाव' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Star className="h-4 w-4 text-orange-400" />
                    </div>
                    <span className="font-sans font-extrabold text-sm">
                      {activeLang === 'EN' ? item.label : item.labelMr}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={onJoinClick}
                className="w-full py-4 bg-[#fc820c] hover:bg-[#d96a00] text-white font-extrabold rounded-xl transition-all hover:scale-103 shadow-lg hover:shadow-orange-500/25 cursor-pointer block text-center"
              >
                {activeLang === 'EN' ? 'Enroll as Member' : 'सदस्य म्हणून नोंदणी करा'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Leadership Philosophy Diagram */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          <div>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-8">
              {activeLang === 'EN' ? 'Leadership Philosophy' : 'नेतृत्व सिद्धांत'}
            </h2>
            <div className="space-y-8">
              <blockquote className="border-l-4 border-[#fc820c] pl-8 py-2">
                <p className="font-sans text-xl sm:text-2xl text-slate-800 italic mb-4 leading-relaxed font-light">
                  {activeLang === 'EN' 
                    ? '"A true leader is not one who creates followers, but one who creates more leaders."'
                    : '"खरा नेता तो नाही जो अनुयायी तयार करतो, तर तो आहे जो आणखी नवीन नेते घडवतो."'}
                </p>
                <footer className="font-sans font-extrabold text-xs tracking-wider text-[#fc820c] uppercase">
                  {activeLang === 'EN' ? '— ABVP Mantra' : '— अभाविप मंत्र'}
                </footer>
              </blockquote>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {activeLang === 'EN'
                  ? 'At ABVP, leadership is not about position; it\'s about responsibility. Our structure ensures every student from a local college unit to the national executive has a voice and a platform to lead.'
                  : 'अभाविपमध्ये नेतृत्व हे केवळ पदापुरते मर्यादित नसून ती एक जबाबदारी आहे. आमची रचना प्रत्येक विद्यार्थ्याला स्थानिक महाविद्यालयापासून राष्ट्रीय पातळीवर नेतृत्व करण्याची संधी देते.'}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Abstract Coordinate Grid Chart */}
            <div className="aspect-square w-full max-w-sm bg-slate-50 rounded-full flex items-center justify-center p-8 border-4 border-white shadow-xl relative">
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Orbiting ring */}
                <div className="absolute inset-0 border-2 border-dashed border-[#001847]/20 rounded-full animate-[spin_40s_linear_infinite]" />
                
                {/* Core block */}
                <div className="z-10 bg-[#001847] p-6 sm:p-8 rounded-2xl shadow-lg text-center text-white max-w-[140px] border border-orange-400/30">
                  <Star className="h-8 w-8 text-orange-400 mx-auto mb-2 animate-pulse" />
                  <p className="font-sans font-black text-xs uppercase tracking-wider">
                    {activeLang === 'EN' ? 'Student Center' : 'छात्र केंद्र'}
                  </p>
                </div>

                {/* Cardinal Points */}
                <div className="absolute -top-4 bg-white px-4 py-1.5 rounded-lg border border-[#001847]/20 shadow-sm font-sans font-extrabold text-xs text-[#001847]">
                  {activeLang === 'EN' ? 'Discipline' : 'शिस्त'}
                </div>
                <div className="absolute -bottom-4 bg-white px-4 py-1.5 rounded-lg border border-[#001847]/20 shadow-sm font-sans font-extrabold text-xs text-[#001847]">
                  {activeLang === 'EN' ? 'Education' : 'शिक्षण'}
                </div>
                <div className="absolute -left-12 bg-white px-4 py-1.5 rounded-lg border border-[#001847]/20 shadow-sm font-sans font-extrabold text-xs text-[#001847]">
                  {activeLang === 'EN' ? 'Society' : 'समाज'}
                </div>
                <div className="absolute -right-12 bg-white px-4 py-1.5 rounded-lg border border-[#001847]/20 shadow-sm font-sans font-extrabold text-xs text-[#001847]">
                  {activeLang === 'EN' ? 'Nation' : 'राष्ट्र'}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Frequently Asked Questions Accordion */}
      <section id="faq-section" className="py-24 bg-slate-50 px-6 border-t border-slate-200/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] text-center mb-12">
            {activeLang === 'EN' ? 'Frequently Asked Questions' : 'वारंवार विचारले जाणारे प्रश्न'}
          </h2>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="font-sans font-extrabold text-base sm:text-lg text-[#001847]">
                    {activeLang === 'EN' ? item.q : item.qMr}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-[#001847] transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-[#fc820c]' : ''}`} />
                </button>
                
                {openFaq === index && (
                  <div className="p-6 pt-0 font-sans text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                    {activeLang === 'EN' ? item.a : item.aMr}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Moments of Impact & Gallery Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-8 text-left">
            {activeLang === 'EN' ? 'Moments of Impact' : 'प्रेरणादायी क्षणचित्रे'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            
            {/* Image 1 (col-span-2) */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md col-span-2 relative group">
              <img 
                alt="Student Discussion Panel" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="public/protest1.jpg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 2 */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative group">
              <img 
                alt="Students tree plantation drive"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="public/protest2.jpg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 3 (row-span-2) */}
            <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-md row-span-2 relative group">
              <img 
                alt="Student leader at podium"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="public/stud_panel.jpg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 4 */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative group">
              <img 
                alt="Large student assembly outdoors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="public/images (3).jpg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 5 */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md relative group">
              <img 
                alt="Students brainstorming in workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="public/academic_excellence.jpg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Grid Box 6: Action Call */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-md bg-[#fc820c] flex flex-col items-center justify-center text-white cursor-pointer hover:bg-[#d96a00] transition-colors p-4">
              <ImageIcon className="h-10 w-10 mb-2" />
              <span className="font-sans font-extrabold text-sm uppercase tracking-wider text-center">
                {activeLang === 'EN' ? 'View All Gallery' : 'संपूर्ण गॅलरी पहा'}
              </span>
            </div>

          </div>
        </div>

        {/* Dynamic Final Banner */}
        <div className="relative w-full bg-[#001847] py-24 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,130,12,0.15),transparent_60%)]" />
          <div className="relative z-10 px-6 max-w-2xl mx-auto space-y-6">
            <h3 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl leading-tight text-white">
              {activeLang === 'EN' 
                ? 'Become a Part of India\'s Largest Student Organization' 
                : 'भारतातील सर्वात मोठ्या विद्यार्थी संघटनेचे भाग व्हा'}
            </h3>
            <p className="text-orange-200 text-sm sm:text-base font-light leading-relaxed">
              {activeLang === 'EN'
                ? 'Your journey towards leadership and national service starts here. Join ABVP Deogiri today.'
                : 'तुमचा नेतृत्व आणि राष्ट्रसेवेचा प्रवास इथून सुरू होतो. आजच अभाविप देवगिरीत सामील व्हा.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button 
                onClick={onJoinClick}
                className="bg-[#fc820c] hover:bg-[#d96a00] text-white px-10 py-5 rounded-xl font-extrabold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
              >
                {activeLang === 'EN' ? 'Join ABVP Today' : 'आजच सहभागी व्हा'}
              </button>
              <a 
                href="mailto:deogiri@abvp.org"
                className="bg-transparent border-2 border-white/40 text-white px-10 py-5 rounded-xl font-extrabold text-lg hover:bg-white/10 hover:border-white transition-all text-center inline-block"
              >
                {activeLang === 'EN' ? 'Contact Us' : 'संपर्क साधा'}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
