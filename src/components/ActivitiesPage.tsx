import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, ShieldAlert, Sparkles, BookOpen, Lightbulb, Users, HelpCircle, 
  ChevronDown, GraduationCap, Trophy, Music, Landmark, Heart, HeartHandshake, Check,
  Leaf, BrainCircuit, Microscope, Stethoscope, Wheat, Award, Target, Calendar, X, ExternalLink, Flag
} from 'lucide-react';

interface ActivitiesPageProps {
  activeLang: 'EN' | 'MR';
  onJoinClick?: () => void;
}

export default function ActivitiesPage({ activeLang, onJoinClick }: ActivitiesPageProps) {
  const [selectedWing, setSelectedWing] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleNavigation = (scrollId?: string, tabId?: string) => {
      const sId = scrollId || localStorage.getItem('navScrollTarget');
      const tId = tabId || localStorage.getItem('navTabTarget');

      if (tId) {
        setSelectedWing(tId);
        localStorage.removeItem('navTabTarget');
      }

      if (sId) {
        localStorage.removeItem('navScrollTarget');
        const element = document.getElementById(sId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      }
    };

    handleNavigation();

    const listener = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        handleNavigation(customEvent.detail.scrollTarget, customEvent.detail.tabTarget);
      }
    };

    window.addEventListener('navSectionChange', listener);
    return () => {
      window.removeEventListener('navSectionChange', listener);
    };
  }, []);

  const stats = [
    { value: '500+', label: 'Activities Conducted', labelMr: 'आयोजित उपक्रम' },
    { value: '50K+', label: 'Student Participants', labelMr: 'सहभागी विद्यार्थी' },
    { value: '200+', label: 'Annual Workshops', labelMr: 'वार्षिक कार्यशाळा' },
    { value: '10K+', label: 'Active Volunteers', labelMr: 'सक्रिय स्वयंसेवक' }
  ];

  const wings = [
    { 
      id: 'think-india', 
      title: 'Think India', 
      titleMr: 'थिंक इंडिया', 
      desc: 'Policy and research initiative for premier institute students to promote intellectual discourse.', 
      descMr: 'प्रमुख शैक्षणिक संस्थांमधील विद्यार्थ्यांमध्ये बौद्धिक विचार आणि संशोधनाला चालना देणे.', 
      icon: BrainCircuit,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-600',
      longDesc: 'Think India is an elite platform fostering nationalistic policy discussions, research fellowships, legal internships, and institutional governance initiatives among students of premier institutes like IITs, IIMs, NLUs, and central universities.',
      longDescMr: 'थिंक इंडिया हा आयआयटी, आयआयएम, एनएलयू आणि केंद्रीय विद्यापीठांसारख्या नामांकित संस्थांमधील विद्यार्थ्यांमध्ये राष्ट्रहिताचे धोरणात्मक विषय, संशोधन फेलोशिप, कायदेशीर इंटर्नशिप आणि संस्थात्मक प्रशासनाला चालना देणारा मंच आहे.',
      email: 'thinkindiadelhi@gmail.com',
      website: 'https://thinkindia.foundation'
    },
    { 
      id: 'sfd', 
      title: 'SFD', 
      titleMr: 'एस.एफ.डी.', 
      desc: 'Students For Development: Driving sustainable growth, environmental protection and eco-consciousness.', 
      descMr: 'शाश्वत विकास, पर्यावरण संरक्षण आणि पर्यावरण-जागरूकतेला चालना देणारा मंच.', 
      icon: Leaf,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-600',
      longDesc: 'Students For Development (SFD) advocates for eco-friendly practices, conducting extensive water-harvesting audits, major tree plantations, renewable energy propagation, and comprehensive rural village adoptions.',
      longDescMr: 'स्टुडंट्स फॉर डेव्हलपमेंट (SFD) शाश्वत आणि पर्यावरणपूरक विकासासाठी काम करते. या अंतर्गत पाणी संवर्धन, वृक्षारोपण मोहिमा, सौर ऊर्जेचा प्रचार आणि ग्रामीण दत्तक गाव योजना राबविल्या जातात.',
      email: 'sfdindia@gmail.com',
      website: 'https://sfdindia.org'
    },
    { 
      id: 'sfs', 
      title: 'SFS', 
      titleMr: 'एस.एफ.एस.', 
      desc: 'Students For Seva: Dedicated volunteering wing for disaster relief, blood donation camps & community service.', 
      descMr: 'आपत्ती निवारण, रक्तदान शिबिरे आणि समाजसेवेसाठी समर्पित स्वयंसेवक दल.', 
      icon: ShieldAlert,
      color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-600',
      longDesc: 'Students For Seva (SFS) drives active societal transformation. Volunteers serve inside underprivileged schools, run immediate medical camps, coordinate disaster relief efforts, and champion daily blood bank networks.',
      longDescMr: 'स्टुडंट्स फॉर सेवा (SFS) तळागाळातील सामाजिक बदलासाठी कार्य करते. वंचित शाळांमध्ये शिक्षण मदत, विनामूल्य वैद्यकीय शिबिरे, आपत्ती व्यवस्थापन आणि २४/७ रक्तदान साहाय्य पुरवले जाते.',
      email: 'abvp.sfs@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'jignasa', 
      title: 'Jignasa', 
      titleMr: 'जिज्ञासा', 
      desc: 'Ayurveda and traditional Indian medicine student wing fostering research and clinical wisdom.', 
      descMr: 'आयुर्वेद आणि पारंपरिक भारतीय वैद्यकीय शाखांमधील संशोधन आणि ज्ञानाचे व्यासपीठ.', 
      icon: Microscope,
      color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-600',
      longDesc: 'Jignasa is dedicated to nurturing deep academic passion, modern empirical research, and clinical superiority in Indian Traditional Medicine, primarily Ayurveda, among medical aspirants.',
      longDescMr: 'जिज्ञासा मंचाचा मुख्य उद्देश वैद्यकीय विद्यार्थ्यांमध्ये आयुर्वेद आणि पारंपरिक भारतीय चिकित्सा पद्धतींमधील आधुनिक संशोधन आणि क्लिनिकल कौशल्य वृद्धिंगत करणे हा आहे.',
      email: 'abvpjignasa@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'agrivision', 
      title: 'AgriVision', 
      titleMr: 'अॅग्रीव्हिजन', 
      desc: 'Empowering students of agricultural sciences, promoting sustainable farming models.', 
      descMr: 'कृषी शाखेच्या विद्यार्थ्यांचे सबलीकरण आणि शाश्वत शेती मॉडेलचा प्रसार.', 
      icon: Wheat,
      color: 'bg-lime-50 border-lime-200 text-lime-700 hover:bg-lime-600',
      longDesc: 'AgriVision connects agricultural science students with the grassroot farm challenges, introducing advanced organic techniques, weather analysis forums, and direct village counseling.',
      longDescMr: 'अॅग्रीव्हिजन कृषी शाखेच्या विद्यार्थ्यांना प्रत्यक्ष शेतातील समस्यांशी जोडते, सेंद्रिय शेती तंत्रज्ञान, हवामान अंदाज मंच आणि थेट गावपातळीवर शेतकरी संवाद घडवून आणते.',
      email: 'agrivisionabvp@gmail.com',
      website: 'https://agrivision.org.in'
    },
    { 
      id: 'medivision', 
      title: 'Medivision', 
      titleMr: 'मेडीव्हिजन', 
      desc: 'Professional leadership and academic support network for medical & healthcare students.', 
      descMr: 'वैद्यकीय आणि आरोग्य विज्ञान विद्यार्थ्यांसाठी व्यावसायिक नेतृत्व आणि शैक्षणिक साहाय्य.', 
      icon: Stethoscope,
      color: 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-600',
      longDesc: 'Medivision builds an robust academic and professional peer network for future healthcare experts, helping them with medical policy discussions, moral medical guidelines, and multi-specialty camps.',
      longDescMr: 'मेडीव्हिजन भावी वैद्यकीय तज्ज्ञांसाठी एक मजबूत व्यावसायिक मंच प्रदान करते. आरोग्य धोरण चर्चा, नैतिक वैद्यकीय मार्गदर्शन आणि आरोग्य शिबिरांचे आयोजन यात विद्यार्थी सहभागी होतात.',
      email: 'medivisionabvp@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'pharmavision', 
      title: 'Pharmavision', 
      titleMr: 'फार्मॉव्हिजन', 
      desc: 'Platform for innovation, industry interactions, and skill development in pharmaceutical sciences.', 
      descMr: 'औषधनिर्माण शास्त्र क्षेत्रात नाविन्यता आणि कौशल्य विकासासाठी व्यासपीठ.', 
      icon: Award,
      color: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-600',
      longDesc: 'Pharmavision creates key industrial linkages for pharmacy majors, assisting with professional skill seminars, lab innovation forums, and global compliance knowledge hubs.',
      longDescMr: 'फार्मॉव्हिजन फार्मसीच्या विद्यार्थ्यांसाठी उद्योगांशी व्यावसायिक संपर्क साधते. कौशल्य विकास परिसंवाद, प्रयोगशाळा नवोपक्रम आणि जागतिक नियमावली ज्ञान केंद्र यात विद्यार्थ्यांना मदत करते.',
      email: 'pharmavisionabvp@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'tsvk', 
      title: 'TSVK', 
      titleMr: 'टी.एस.व्ही.के.', 
      desc: 'Tribal Student Vikas Kendra: Fostering inclusive educational growth & support for tribal scholars.', 
      descMr: 'वनवासी विद्यार्थी विकास केंद्र: वनवासी विद्यार्थ्यांसाठी सर्वसमावेशक शैक्षणिक विकास आणि साहाय्य.', 
      icon: GraduationCap,
      color: 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-600',
      longDesc: 'Tribal Student Vikas Kendra (TSVK) runs specialized community hostels, primary learning aids, and scholarships to support students from interior tribal blocks.',
      longDescMr: 'वनवासी विद्यार्थी विकास केंद्र (TSVK) दुर्गम वनवासी क्षेत्रातील विद्यार्थ्यांसाठी विशेष वसतिगृहे, प्राथमिक शिक्षण साहित्य आणि शिष्यवृत्ती साहाय्य उपक्रम चालवते.',
      email: 'tsvk@abvp.org',
      website: 'https://abvp.org'
    },
    { 
      id: 'indgenius', 
      title: 'IndGenius', 
      titleMr: 'इंडजीनियस', 
      desc: 'Nurturing creative thinking, indigenous innovation, and technological entrepreneurship.', 
      descMr: 'सर्जनशील विचार, स्वदेशी तंत्रज्ञान संशोधन आणि उद्योजकतेला प्रोत्साहन.', 
      icon: Lightbulb,
      color: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-600',
      longDesc: 'IndGenius sparks localized technological thinking, supporting patent registration assistance, young entrepreneur incubation, and indigenous business modules.',
      longDescMr: 'इंडजीनियस स्थानिक तंत्रज्ञान संशोधन आणि नवउद्योजकतेला प्रोत्साहन देते, ज्यामध्ये पेटंट नोंदणी मार्गदर्शन, नवउद्योजक इनक्युबेशन आणि स्वदेशी उद्योग मॉडेलचा समावेश आहे.',
      email: 'indgenius@abvp.org',
      website: 'https://abvp.org'
    },
    { 
      id: 'shodh', 
      title: 'Shodh', 
      titleMr: 'शोध', 
      desc: 'Academic research support and national PhD scholars association driving qualitative research.', 
      descMr: 'शैक्षणिक संशोधन साहाय्य आणि राष्ट्रीय पीएचडी संशोधक संघटना.', 
      icon: BookOpen,
      color: 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-600',
      longDesc: 'Shodh coordinates PhD circles on higher campuses, offering quantitative methodology support, academic paper reviews, and collaborative research grants.',
      longDescMr: 'शोध ही पीएचडी संशोधकांसाठी राष्ट्रीय संघटना आहे. उच्च शैक्षणिक संस्थांमध्ये गुणात्मक संशोधन पद्धती, शोधनिबंध पुनरावलोकन आणि शैक्षणिक संशोधन सहकार्यासाठी हा मंच काम करतो.',
      email: 'shodhabvp@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'eklavya', 
      title: 'Eklavya', 
      titleMr: 'एकलव्य', 
      desc: 'Promotion of traditional Indian sports, athletic training camps, and physical fitness.', 
      descMr: 'पारंपरिक भारतीय खेळांचे संवर्धन, क्रीडा प्रशिक्षण आणि शारीरिक सुदृढता.', 
      icon: Trophy,
      color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-600',
      longDesc: 'Eklavya revives traditional athletic forms (Kabaddi, Kho-Kho, Mallakhamb) and sponsors regional fitness assemblies and student-athlete coaching clinics.',
      longDescMr: 'एकलव्य मंच पारंपरिक भारतीय खेळांचे (कबड्डी, खो-खो, मल्लखांब) संवर्धन करतो आणि स्थानिक स्तरावर क्रीडा प्रशिक्षण शिबिरे व शारीरिक सुदृढता महोत्सवांचे आयोजन करतो.',
      email: 'eklavya@abvp.org',
      website: 'https://abvp.org'
    },
    { 
      id: 'kala-manch', 
      title: 'National Kala Manch', 
      titleMr: 'राष्ट्रीय कला मंच', 
      desc: 'Cultivating classical & folk arts, national heritage appreciation, and campus cultural festivals.', 
      descMr: 'शास्त्रीय आणि लोककलांचे संवर्धन आणि कॅम्पस सांस्कृतिक महोत्सवांचे आयोजन.', 
      icon: Music,
      color: 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-600',
      longDesc: 'National Kala Manch celebrates classical visual arts, coordinates inter-collegiate drama fests, and maintains rich oral traditions across college platforms.',
      longDescMr: 'राष्ट्रीय कला मंच शास्त्रीय आणि लोककलांचे जतन करतो. महाविद्यालयांमध्ये सांस्कृतिक महोत्सव, नाटक स्पर्धा आणि भारतीय वारसा संवर्धन व्याख्यानांचे आयोजन करतो.',
      email: 'rashtriyakalamanch@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'vidyarthini', 
      title: 'Vidyarthini Work', 
      titleMr: 'विद्यार्थिनी कार्य', 
      desc: 'Dedicated programs for female student empowerment, health awareness, and leadership.', 
      descMr: 'विद्यार्थिनी सबलीकरण, आरोग्य जागरूकता आणि नेतृत्व विकासासाठी समर्पित उपक्रम.', 
      icon: Heart,
      color: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-600',
      longDesc: 'Vidyarthini Work shapes female student leaders, running sanitary hygiene camps, gender defense workshops, and professional career seminars across Deogiri.',
      longDescMr: 'विद्यार्थिनी कार्य विद्यार्थिनींच्या सर्वांगीण विकासासाठी आणि सबलीकरणासाठी कार्य करते. आरोग्य जागरूकता, स्वरक्षण कार्यशाळा आणि महिला नेतृत्व प्रशिक्षण आयोजित केले जाते.',
      email: 'vidyarthini@abvp.org',
      website: 'https://abvp.org'
    },
    { 
      id: 'tribal', 
      title: 'Tribal Student Work', 
      titleMr: 'वनवासी छात्र कार्य', 
      desc: 'Field-based support initiatives for remote tribal communities, education and hostel aids.', 
      descMr: 'दुर्गम वनवासी पाड्यांवरील विद्यार्थ्यांसाठी शिक्षण आणि वसतिगृह मदत कार्य.', 
      icon: HeartHandshake,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-600',
      longDesc: 'Field-based active development campaigns facilitating basic computer literacy, winter clothes donation, and secondary academic support for tribal schools.',
      longDescMr: 'वनवासी क्षेत्रात कार्यरत राहून विद्यार्थ्यांना प्राथमिक संगणक साक्षरता, हिवाळी साहित्य वाटप आणि माध्यमिक शिक्षणासाठी पूरक शैक्षणिक साहाय्य देणे.',
      email: 'tribalwork@abvp.org',
      website: 'https://abvp.org'
    }
  ];

  const faqs = [
    {
      q: 'Can non-members participate in specialized wings activities?',
      qMr: 'अभाविपचे सदस्य नसलेले विद्यार्थी विशेष मंचांच्या उपक्रमांमध्ये सहभागी होऊ शकतात का?',
      a: 'Yes! All student seminars, research panel reviews, sports meets, and green initiatives are open to all college students. We encourage active participation from everyone who shares our developmental vision.',
      aMr: 'होय नक्कीच! सर्व परिसंवाद, चर्चासत्रे, क्रीडा संमेलने आणि पर्यावरण उपक्रम सर्व विद्यार्थ्यांसाठी खुले असतात. आमच्या विकासात्मक दृष्टीकोनाला पाठिंबा देणाऱ्या प्रत्येक विद्यार्थ्याला आम्ही आमंत्रित करतो.'
    },
    {
      q: 'How can I register my project under Think India or SFD?',
      qMr: 'थिंक इंडिया किंवा एस.एफ.डी. अंतर्गत माझ्या प्रकल्पाची नोंदणी कशी करावी?',
      a: 'Students can submit their research proposals, policy review briefs, or eco-action plans directly through our web interface or contact the respective Wing coordinator listed in the directory.',
      aMr: 'विद्यार्थी आपले संशोधन प्रस्ताव, धोरणात्मक पुनरावलोकन मसुदे किंवा पर्यावरणपूरक कृती आराखडे थेट आमच्या संकेतस्थळावरून पाठवू शकतात किंवा संबंधित मंचाच्या समन्वयकांशी संपर्क साधू शकतात.'
    },
    {
      q: 'Is academic performance a criteria to lead these wings?',
      qMr: 'या मंचाचे नेतृत्व करण्यासाठी शैक्षणिक कामगिरी निकष आहे का?',
      a: 'While we encourage strong academic excellence, leadership in wings is primarily based on organizational ability, commitment to student welfare, and real contribution on the ground.',
      aMr: 'आम्ही शैक्षणिक गुणवत्तेला नेहमीच प्रोत्साहन देतो, परंतु मंचाचे नेतृत्व करण्यासाठी विद्यार्थ्यांची संघटन कौशल्ये, विद्यार्थी कल्याणाची तळमळ आणि जमिनीवर केलेल्या प्रत्यक्ष कामाचे योगदान महत्त्वाचे मानले जाते.'
    }
  ];

  const activeWingObj = selectedWing ? wings.find(w => w.id === selectedWing) : null;

  return (
    <div className="flex-grow bg-[#F8F9FA] text-[#121c2a]">
      
      {/* 1. Page Title Hero */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="ABVP Youth Rally Activities" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLu4UXbIwTIJ2pd2-pgogwh3OUC_Yb2lV-njfiRABzH43RMNui7Zf6TV4i7-eIU2YYDVoysj1WtZuYoIjfO9IQ6ig1KE_vmVHqzj_NVNO2vYbKSxGoY7i9Dozk4hzrvaRzmEam9bmk80COedlwkCWEELvcD1q_7NS_3YGLMSrKjIPwkD5OVdoUIx1_bE-ulkAYcvVRMxoYEc5W_man_rk8bSL7-lNjpdiKh-wEiJYqFPBVVVL00pTKvCgYMN"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001847]/90 to-[#001847]/40"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-white text-left">
          <div className="max-w-3xl">
            <h1 className="font-sans font-black text-5xl sm:text-6xl text-white mb-6 leading-tight text-shadow-sm">
              {activeLang === 'EN' ? 'Activities' : 'विविध उपक्रम आणि मंच'}
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/95 mb-10 max-w-2xl leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'Empowering Students Through Leadership, Service, Innovation and Nation Building. Join the largest student organization in the world.'
                : 'नेतृत्व, सेवा, नाविन्यता आणि राष्ट्र उभारणीद्वारे विद्यार्थ्यांचे सबलीकरण. जगातील सर्वात मोठ्या विद्यार्थी संघटनेत सामील व्हा.'}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('specialized-wings');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold rounded-lg hover:scale-103 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>{activeLang === 'EN' ? 'Explore Activities' : 'उपक्रम शोधा'}</span>
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/></svg>
              </button>
              <button 
                onClick={onJoinClick}
                className="px-8 py-4 border-2 border-white/30 text-white font-extrabold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
              >
                {activeLang === 'EN' ? 'Join ABVP' : 'अभाविप मध्ये सामील व्हा'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          <div className="space-y-6">
            <span className="text-[#fc820c] font-bold tracking-widest uppercase text-xs sm:text-sm block">
              {activeLang === 'EN' ? 'OUR MISSION' : 'आमचे ध्येय'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] leading-tight">
              {activeLang === 'EN' ? 'Why We Lead' : 'आम्ही नेतृत्व का करतो?'}
            </h2>
            <div className="w-20 h-1 bg-[#fc820c] rounded-full mb-6" />
            <div className="space-y-4 text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-light">
              <p>
                {activeLang === 'EN' 
                  ? 'ABVP Deogiri focuses on the holistic development of students. Our activities and wings are structured to foster a profound sense of national pride, social responsibility, and scientific temperament while building modern vocational skills.'
                  : 'अभाविप देवगिरी विद्यार्थ्यांच्या सर्वांगीण विकासावर लक्ष केंद्रित करते. आमचे उपक्रम आणि मंच विद्यार्थ्यांमध्ये राष्ट्रीय अभिमान, सामाजिक जबाबदारी आणि वैज्ञानिक दृष्टिकोन वाढवण्यासोबतच आधुनिक कौशल्ये निर्माण करण्यासाठी तयार केले आहेत.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[#fc820c] bg-orange-50 p-2.5 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-[#001847] text-sm">Student Development</h4>
                  <p className="text-xs text-slate-400 font-light mt-1">Creating environments for academic and personal growth.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[#fc820c] bg-orange-50 p-2.5 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-[#001847] text-sm">Leadership & Excellence</h4>
                  <p className="text-xs text-slate-400 font-light mt-1">Mentoring the next generation of thought leaders and changemakers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[#fc820c] bg-orange-50 p-2.5 rounded-lg flex items-center justify-center">
                  <Flag className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-[#001847] text-sm">Nation Building</h4>
                  <p className="text-xs text-slate-400 font-light mt-1">Aligning student energy with the long-term progress of India.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida/AP1WRLvDEYlgiY4mcz_gAZjdO6XmVNmYESzfTK06FLSVgyfgByU4JWWE9TvyxeGUL8ZRgnWb2zungC0svX-fnafaiG1YDq8rhqsoPEEGIxSIhlctiCynHC5HNj_LxVRZjAK4kjL9qo8SjOtEvvmo_tGhREAQyqO8arZu7ioEZZvfo_xui6t8By_YXthvo5JwGezYecpOciQoZI_9W82QZI3tVk5ZU4yXl_hW4-uCsMuBch9_LSG3vDzkGN71oqTa"
              alt="Students Collaboration Classroom discussion"
              className="rounded-2xl shadow-2xl relative z-10 w-full h-[500px] object-cover border-4 border-white"
            />
            <div className="absolute -bottom-6 -right-6 p-6 bg-[#001847] text-white rounded-xl shadow-xl z-20 hidden lg:block">
              <p className="text-2xl font-bold">75+ Years</p>
              <p className="text-xs opacity-80">of Student Excellence</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Initiatives (Think India & SFD) */}
      <section id="flagship-section" className="py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 text-left md:text-center">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'FLAGSHIP PROGRAMS' : 'मुख्य उपक्रम'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
              {activeLang === 'EN' ? 'Featured Initiatives' : 'अग्रगण्य मोहिमा'}
            </h2>
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
              {activeLang === 'EN'
                ? 'Pioneering student-led programs driving intellectual, environmental, and social transformations across India.'
                : 'भारतामध्ये बौद्धिक, पर्यावरणीय आणि सामाजिक परिवर्तनासाठी विद्यार्थी-चालित अग्रगण्य कार्यक्रम.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Think India */}
            <div className="group relative bg-[#001847] rounded-3xl overflow-hidden min-h-[400px] flex flex-col justify-between p-8 sm:p-10 border border-white/5 shadow-xl transition-all duration-300">
              <div 
                className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9X2W0nAmF8MuxqK8yzhY3Gb7ILZ1ZLhC39RjDO89IlTop7t-rrBKrEyFxFZiO-aYbCxmqp7O9TCv6IJSR_Rm_HlBJOtdyKESdNU7m_3DZ0Q5Kt_MmmEUoJ5TxqJVyGt9ggfSeHQcCsUAiTrFmzSsGIqiPQIpdl83NMowf52yjxU-JD1L7e7yDJhpM69fmrfRBIatquig9BaZAJdfyas9eOCEz6f0c6VGqdcy1otCR8JL2uQ_UtLUMZgqEkpwedS5kIQGttH1V5Pdk')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001847] via-[#001847]/40 to-transparent"></div>
              
              <div className="relative z-10">
                <span className="bg-[#fc820c] text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded mb-3 inline-block">
                  Flagship Program
                </span>
                <h3 className="font-sans font-extrabold text-3xl text-white mb-2">Think India</h3>
                <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Bridging the gap between premier institutes and the social landscape of India through policy and innovation.
                </p>
              </div>
              <button 
                onClick={() => setSelectedWing('think-india')}
                className="relative z-10 bg-white text-[#001847] px-6 py-2 rounded font-extrabold hover:bg-neutral-100 transition-colors w-max text-xs cursor-pointer uppercase tracking-wider"
              >
                Learn More
              </button>
            </div>

            {/* SFD */}
            <div className="group relative bg-[#964900] rounded-3xl overflow-hidden min-h-[400px] flex flex-col justify-between p-8 sm:p-10 border border-white/5 shadow-xl transition-all duration-300">
              <div 
                className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCI_xZetA-ClJZ6Hst44qPwMYrrp8S7QnZbb1GqLYzyMZ3duD_YxOLeOG3__9NIQwqf3_JPac0DbRb7d_tYV852Tw4zzRTUy3njQerCAw6L9cWf9eFAQBjx0temHaVrRBGX8LKPdpb_HYm6-26p_87AWcwzM_nl7pMptkDxvTH8yGJzn3b_INxiO7rr95pLM6oCWLKSCGs_FICRHsYro5SU9j12jzrctSMgjDaCvk8dBcRICNOY1IowrMxhX3b0R3XAE6A7ba76uU4F')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#964900] via-[#964900]/40 to-transparent"></div>
              
              <div className="relative z-10">
                <span className="bg-[#001847] text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded mb-3 inline-block">
                  Social Impact
                </span>
                <h3 className="font-sans font-extrabold text-3xl text-white mb-2">SFD</h3>
                <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Students For Development: Driving sustainable growth and environmental consciousness through student action.
                </p>
              </div>
              <button 
                onClick={() => setSelectedWing('sfd')}
                className="relative z-10 bg-white text-[#964900] px-6 py-2 rounded font-extrabold hover:bg-neutral-100 transition-colors w-max text-xs cursor-pointer uppercase tracking-wider"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Specialized Wings Grid (14 wings) */}
      <section id="specialized-wings" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'OUR DIVISIONS' : 'आमचे विविध मंच'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
              {activeLang === 'EN' ? 'Our Specialized Wings' : 'अभाविपचे विशेष मंच'}
            </h2>
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
              {activeLang === 'EN'
                ? 'ABVP Deogiri operates through various specialized forums catering to diverse fields of interest, professional study, and social needs.'
                : 'अभाविप देवगिरी विविध आवडीनिवडी, व्यावसायिक अभ्यासक्रम आणि सामाजिक गरजा पूर्ण करण्यासाठी स्वतंत्र मंचांच्या माध्यमातून काम करते.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {wings.map((wing, idx) => {
              const IconComp = wing.icon;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedWing(wing.id)}
                  className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between border-slate-200/60 min-h-[220px]`}
                >
                  <div>
                    <div className="w-11 h-11 bg-orange-50 text-[#fc820c] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <IconComp className="h-5.5 w-5.5" />
                    </div>
                    <h4 className="font-sans font-extrabold text-base text-[#001847] mb-2">
                      {activeLang === 'EN' ? wing.title : wing.titleMr}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {activeLang === 'EN' ? wing.desc : wing.descMr}
                    </p>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-[11px] font-black uppercase text-[#fc820c] tracking-widest opacity-80 group-hover:opacity-100">
                    <span>{activeLang === 'EN' ? 'Explore Wing' : 'अधिक माहिती'}</span>
                    <svg className="h-3 w-3 fill-current ml-1" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wing Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedWing && activeWingObj && (
          <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl relative overflow-hidden text-left border border-slate-100"
            >
              <button 
                onClick={() => setSelectedWing(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-full flex items-center justify-center transition-colors border border-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 bg-orange-50 text-[#fc820c] rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  {(() => {
                    const IconComp = activeWingObj.icon;
                    return <IconComp className="h-8 w-8" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-sans font-black text-2xl text-[#001847] leading-none">
                    {activeLang === 'EN' ? activeWingObj.title : activeWingObj.titleMr}
                  </h3>
                  <span className="inline-block mt-2 bg-orange-500/10 text-[#fc820c] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                    {activeLang === 'EN' ? 'Specialized Forum' : 'विशेष कार्य मंच'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light border-y border-slate-100 py-6 my-6">
                <p className="font-medium text-[#001847]">
                  {activeLang === 'EN' ? activeWingObj.desc : activeWingObj.descMr}
                </p>
                <p>
                  {activeLang === 'EN' ? activeWingObj.longDesc : activeWingObj.longDescMr}
                </p>

                {(activeWingObj.email || activeWingObj.website) && (
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                    <h4 className="font-sans font-black text-xs uppercase tracking-widest text-[#fc820c]">
                      {activeLang === 'EN' ? 'Official Contact & Network' : 'अधिकृत संपर्क आणि संकेतस्थळ'}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                      {activeWingObj.email && (
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-slate-400">{activeLang === 'EN' ? 'Email:' : 'ईमेल:'}</span>
                          <a href={`mailto:${activeWingObj.email}`} className="text-[#001847] hover:text-[#fc820c] font-mono hover:underline transition-all">
                            {activeWingObj.email}
                          </a>
                        </div>
                      )}
                      {activeWingObj.website && (
                        <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-6">
                          <span className="font-sans font-bold text-slate-400">{activeLang === 'EN' ? 'Website:' : 'संकेतस्थळ:'}</span>
                          <a 
                            href={activeWingObj.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#001847] hover:text-[#fc820c] font-mono hover:underline transition-all flex items-center gap-1"
                          >
                            {activeWingObj.website.replace('https://', '')}
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-2">
                <button 
                  onClick={() => setSelectedWing(null)}
                  className="px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Close Details' : 'बंद करा'}
                </button>
                <button 
                  onClick={() => {
                    setSelectedWing(null);
                    onJoinClick?.();
                  }}
                  className="px-6 py-3 bg-[#fc820c] hover:bg-[#d96a00] text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/10 cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Join This Wing' : 'या मंचात सामील व्हा'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Stats Ribbon */}
      <section className="py-20 bg-[#001847] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-sans font-black text-4xl sm:text-5xl text-[#fc820c]">
                {stat.value}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-wide uppercase">
                {activeLang === 'EN' ? stat.label : stat.labelMr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Glimpses of Impact Gallery */}
      <section className="py-24 bg-white border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <h2 className="font-sans font-black text-3xl text-[#001847]">Glimpses of Impact</h2>
            <p className="text-slate-500 font-sans text-sm mt-2">Moments of change captured on ground.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-[450px]">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Green Campus Drive" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLuaSwl3wKWDrCTN79LRvz9wmENUj6iN9Ms-fWq7iL9RgnW3CEG7cO4n0HU7-NIteIiQBHqvOMJqKx2cdhi0vhNnqiNxJKl03GNOddyJHFyEtrDaV2ncP9YRgYXfUzZZolN1yS7eK5Y7xy-DMs_x8hgdEObqIl6G5gEm8bL2Rs-JhlAyX-KwSFZrMvURkpEq8DjITvRBwiV7FO75VR2wk3YOZBqKj8r7pSrcnf2ehsw84VTYUT_d2r7AXKde"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-left">
                <h4 className="text-white text-xl font-bold">Green Campus Drive 2024</h4>
                <p className="text-white/70 text-sm font-light">Aurangabad Division</p>
              </div>
            </div>
            
            <div className="grid grid-rows-2 gap-6 h-[450px]">
              <div className="relative group overflow-hidden rounded-2xl">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Jignasa Seminar Discussion" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBweqyJdhPKhw4LFlz3XfKxSHhMtEGnRbib0sq7okzVTpDQ7kI4GSUyMlXEmAujfD9ry7T8pnGBp_6jonHFPgq474HXS6-DIK2WLZZMfEN0YI8dqAJHY6_omwJhRQiHFdh-h00_djnc5lFtbKFWxuSc2-BKN3bCb_zWhHlKhOs62lKSCvHVuQivV85RfevMU26apZva9QoYcJ7d0M23bzXiHNV7dFh1rKGCRmaIjZVUxQfnnFMqI1GtZZXXniFx8ENNskEqQjoQIs0E"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="ABVP Youth Rally" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATDMlQkvagZqooqjgynOr1_rNxNGyANYNDxtfx2of5fWf3A9ybs4BTDV3ymqcuFuhzEJ0Ef52Mq1CQS1ktA3d3jFotc9jfvV2kYGutz6K8zVA1zqy-m-rfZcI2ZRWGrPdAcJYWz4witlVuO1Un-W7kQsGN7MWsnFVjxUUhOYSVLxwZGqLsPsCwbFaDDrXDl1L-Tk4R8ayPRPRpkNQgOb-QGowrgfXJvob3sgtFrrInJ54SNqA9B4kvGULvw9jENXn3SzHGj1ca5xiQ"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA / Invitation Section */}
      <section className="py-24 bg-[#fc820c] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            {activeLang === 'EN' ? 'Be the Change. Lead the Future.' : 'बदलाचे वाहक बना. उद्याचे नेतृत्व करा.'}
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            {activeLang === 'EN'
              ? 'Join thousands of student leaders working towards a stronger, self-reliant, and highly educated Bharat. Your journey of transformation begins here.'
              : 'एक मजबूत, स्वावलंबी आणि उच्च शिक्षित भारतासाठी कार्यरत असलेल्या हजारो विद्यार्थी नेत्यांमध्ये सामील व्हा. तुमचा विकासाचा प्रवास आजच सुरू करा.'}
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button 
              onClick={onJoinClick}
              className="px-10 py-5 bg-[#001847] hover:bg-neutral-800 text-white font-extrabold rounded-xl shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {activeLang === 'EN' ? 'Join ABVP Today' : 'अभाविप मध्ये आजच सहभागी व्हा'}
            </button>
            <a 
              href="mailto:deogiri@abvp.org"
              className="px-10 py-5 border-2 border-white text-white font-extrabold rounded-xl hover:bg-white hover:text-slate-900 transition-all text-center inline-block"
            >
              {activeLang === 'EN' ? 'Contact Us' : 'संपर्क साधा'}
            </a>
          </div>
        </div>
      </section>

      {/* 8. Activities FAQ Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-3xl mx-auto text-left">
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'ACTIVITIES QUESTIONS' : 'उपक्रम प्रश्न आणि उत्तरे'}
            </span>
            <h2 className="font-sans font-black text-3xl text-[#001847]">
              {activeLang === 'EN' ? 'Activities FAQs' : 'उपक्रम व मंचांविषयी विचारले जाणारे प्रश्न'}
            </h2>
            <p className="text-slate-500 mt-4 font-light text-sm sm:text-base">
              {activeLang === 'EN' ? 'Understanding how our wings and programs operate.' : 'विविध मंचाचे कार्य आणि नियोजन समजून घ्या.'}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="font-sans font-extrabold text-base text-[#001847]">
                    {activeLang === 'EN' ? faq.q : faq.qMr}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-[#001847] transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-[#fc820c]' : ''}`} />
                </button>
                
                {activeFaq === idx && (
                  <div className="p-6 pt-0 font-sans text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                    {activeLang === 'EN' ? faq.a : faq.aMr}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
