import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MapPin, Phone, Mail, Clock, Award, Star, 
  ChevronDown, Check, GraduationCap, Network, Map, Landmark,
  ShieldCheck, HelpCircle, Image as ImageIcon, HeartHandshake, Compass, X
} from 'lucide-react';

interface OrganizationPageProps {
  activeLang: 'EN' | 'MR';
  onJoinClick?: () => void;
}

export default function OrganizationPage({ activeLang, onJoinClick }: OrganizationPageProps) {
  const [activeTab, setActiveTab] = useState<'regional' | 'division' | 'district'>('regional');
  const [selectedNode, setSelectedNode] = useState<string>('region');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [selectedMapRegion, setSelectedMapRegion] = useState<'sambhajinagar' | 'nanded' | 'latur' | 'beed'>('sambhajinagar');
  const [selectedWing, setSelectedWing] = useState<any | null>(null);

  useEffect(() => {
    const handleNavigation = (scrollId?: string, tabId?: string) => {
      const sId = scrollId || localStorage.getItem('navScrollTarget');
      const tId = tabId || localStorage.getItem('navTabTarget');

      if (tId && ['regional', 'division', 'district'].includes(tId)) {
        setActiveTab(tId as any);
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

  const mapDetails = {
    sambhajinagar: {
      title: 'Chhatrapati Sambhajinagar Center',
      titleMr: 'छत्रपती संभाजीनगर केंद्र',
      description: 'As the cultural and administrative hub of Deogiri, Sambhajinagar handles over 100+ active units. Key wings like Think India and Students For Seva are highly integrated.',
      descriptionMr: 'देवगिरीचे सांस्कृतिक आणि प्रशासकीय केंद्र म्हणून, संभाजीनगर १००+ पेक्षा जास्त सक्रिय युनिट्स सांभाळते. थिंक इंडिया आणि स्टुडंट्स फॉर सेवा यांसारख्या प्रमुख शाखा येथे कार्यरत आहेत.',
      officeBearers: '340+',
      colleges: '112'
    },
    nanded: {
      title: 'Nanded Center',
      titleMr: 'नांदेड केंद्र',
      description: 'Connecting the eastern borders of the region, Nanded possesses strong rural engagement networks, steering the Students For Development (SFD) wing actively.',
      descriptionMr: 'विभागाच्या पूर्व सीमा जोडणारे नांदेड केंद्र, मजबूत ग्रामीण संपर्क जाळे आणि एस.एफ.डी. शाखांद्वारे पर्यावरण रक्षणासाठी सक्रिय कार्य करत आहे.',
      officeBearers: '280+',
      colleges: '85'
    },
    latur: {
      title: 'Latur Center',
      titleMr: 'लातूर केंद्र',
      description: 'An educational superpower of Maharashtra, Latur hosts heavy concentration of academic institutions and student volunteer initiatives.',
      descriptionMr: 'महाराष्ट्राची शैक्षणिक पंढरी असलेल्या लातूरमध्ये शैक्षणिक संस्थांचे मोठे जाळे आणि सेवाभावी विद्यार्थी स्वयंसेवक उपक्रम मोठ्या प्रमाणावर आहेत.',
      officeBearers: '310+',
      colleges: '94'
    },
    beed: {
      title: 'Beed Center',
      titleMr: 'बीड केंद्र',
      description: 'Representing the core grassroots leadership, Beed focuses on district development and connecting youth with policy-making and nationalist volunteerism.',
      descriptionMr: 'तळागाळातील विद्यार्थी नेतृत्वाचे प्रतिनिधित्व करणारे बीड केंद्र, युवा शक्तीला धोरण-निर्मिती आणि राष्ट्रवादाशी जोडण्यावर लक्ष केंद्रित करते.',
      officeBearers: '190+',
      colleges: '45'
    }
  };

  const committeeMembers = {
    regional: [
      { 
        name: 'Dr. Rajesh Deshpande', 
        nameMr: 'डॉ. राजेश देशपांडे', 
        role: 'Regional President', 
        roleMr: 'प्रांत अध्यक्ष', 
        dept: 'Professor of Political Science', 
        deptMr: 'राज्यशास्त्र प्राध्यापक', 
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhitv0Iaarwm6nnwRXU87SV9-5i3A3rSOVwFzbnD5o6UP2ZLAwPPgKuUTBRqzAiF8-fpXWcntgSv1i403jjFaR86HyaD0IJCC5mAzulW7hHFxp7BnHsLmrmM3GWN5oUfb4FwsOdhLLS56CPPZiOWCBLWpiMko6e5qt8ojbLBkG7j--3FKfysW9XYzlAUh5dndMXHcZWZmJY7SpjMa4CHS3lBb3CrL6pSfVmjSlNoJlXqykWJQpvJO-3W951B-XofVG2LnhuSYP3yj1' 
      },
      { 
        name: 'Adv. Anil Kulkarni', 
        nameMr: 'एड. अनिल कुलकर्णी', 
        role: 'Regional Secretary', 
        roleMr: 'प्रांत मंत्री', 
        dept: 'Law Professional & Organizer', 
        deptMr: 'अधिवक्ता आणि संघटक', 
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyxhJFp7yFXq6tPmOlY7B_5HD6XUGSFy1V-IkSdGWGoTgBUgNwa65gSWAKvXz_upGa3Nh5mjk0bcixMBmzxdBBBm0r2k-Ok2CDXTmUE4zPhuGcBjebeU8zcydI6nUsTMfylOG2fm7zrTr-nLszFP5dI64qWvU31t1tuxX4pyKs4NnvNNTsab6hW0inuabWO8PCIu_yoHGsMswWHJ94Le05fHzAGmak8SI1wksL-3kJ7p0aoUm_LUQAKGK4Egw6Eb6IsNIZACYzE17s' 
      },
      { 
        name: 'Sanjay Patil', 
        nameMr: 'संजय पाटील', 
        role: 'Regional Joint Secretary', 
        roleMr: 'प्रांत सह-मंत्री', 
        dept: 'Student Leader - Nanded Div', 
        deptMr: 'विद्यार्थी प्रतिनिधी - नांदेड विभाग', 
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3PzP8spaKbyUVUfRAHmsZyLUx5wfTc8g7H016Xg0UULQZA5pgaOqfltd92rli6d4fv1l1mq7_M9eJGKV3doWNLHOFeDjO3NVlV4FiN42hQowIO5ZA7OgRMkUcnG1z0_9wvhqQKPMGrXWA6LttSVRWzh_EDPx0S95dYrbOjE-6gxe25mwa4Lt472tMxYIXWyMBT-Tj-FRQhtdGqMl66ugwGaFVbHYsWlls8OkNbMiyd2Je7sVBtZNuqNbl61Cfuokt4xjR3fT_aZje' 
      },
      { 
        name: 'Priya Sharma', 
        nameMr: 'प्रिया शर्मा', 
        role: 'Regional Girls In-charge', 
        roleMr: 'प्रांत विद्यार्थिनी प्रमुख', 
        dept: 'PhD Scholar - Latur Div', 
        deptMr: 'पीएचडी संशोधिका - लातूर विभाग', 
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRCNyzmTm-nUHkpKzt0_fb1EBN5hvbcjNdOidSO6WqfuxZ7so7h3ZpNKDyrputc3v4sAeTLx913F641FNk-DVQnIoKa_fKSWkAD0aZTf7wSp8IBoM5HVDa7vgaImNg4qwiyhscaX_SJU4G4RYh_jjF3upbqeiqJTE74O0qjvgZo8vOf1cZduKzjqJbTs9ex4oyhFnMW_SKToJeNu4kXkPq9110Vncpj8aT6IvNFOpqILqdmY1bAoH7ULaD-N-asUbroQK98JUAEykw' 
      }
    ],
    division: [
      { 
        name: 'Dr. Nitin Shinde', 
        nameMr: 'डॉ. नितीन शिंदे', 
        role: 'Chh. Sambhajinagar Div Head', 
        roleMr: 'छत्रपती संभाजीनगर विभाग प्रमुख', 
        dept: 'Associate Professor of History', 
        deptMr: 'सहयोगी प्राध्यापक', 
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' 
      },
      { 
        name: 'Prof. Ramesh Shinde', 
        nameMr: 'प्रा. रमेश शिंदे', 
        role: 'Nanded Division Head', 
        roleMr: 'नांदेड विभाग प्रमुख', 
        dept: 'HOD, Science Department', 
        deptMr: 'विभाग प्रमुख, विज्ञान विभाग', 
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' 
      },
      { 
        name: 'Prof. Sandeep Laturkar', 
        nameMr: 'प्रा. संदीप लातूरकर', 
        role: 'Latur Division Head', 
        roleMr: 'लातूर विभाग प्रमुख', 
        dept: 'Senior Lecturer in Commerce', 
        deptMr: 'वरिष्ठ व्याख्याते, वाणिज्य', 
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80' 
      },
      { 
        name: 'Dr. Vivek Joshi', 
        nameMr: 'डॉ. विवेक जोशी', 
        role: 'Beed Division Head', 
        roleMr: 'बीड विभाग प्रमुख', 
        dept: 'Practicing Advocate & Mentor', 
        deptMr: 'अधिवक्ता आणि मार्गदर्शक', 
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' 
      }
    ],
    district: [
      { 
        name: 'Dnyaneshwar Rathod', 
        nameMr: 'ज्ञानेश्वर राठोड', 
        role: 'Jalna District President', 
        roleMr: 'जालना जिल्हा अध्यक्ष', 
        dept: 'Post Graduate Scholar', 
        deptMr: 'पदव्युत्तर संशोधक', 
        img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80' 
      },
      { 
        name: 'Snehal Gaikwad', 
        nameMr: 'स्नेहल गायकवाड', 
        role: 'Parbhani District President', 
        roleMr: 'परभणी जिल्हा अध्यक्ष', 
        dept: 'Engineering Student Leader', 
        deptMr: 'अभियांत्रिकी विद्यार्थिनी प्रतिनिधी', 
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' 
      },
      { 
        name: 'Rahul Mundhe', 
        nameMr: 'राहुल मुंडे', 
        role: 'Beed District President', 
        roleMr: 'बीड जिल्हा अध्यक्ष', 
        dept: 'Social Science Graduate', 
        deptMr: 'सामाजिक शास्त्र पदवीधर', 
        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' 
      },
      { 
        name: 'Shrikant Deshmukh', 
        nameMr: 'श्रीकांत देशमुख', 
        role: 'Dharashiv District President', 
        roleMr: 'धाराशिव जिल्हा अध्यक्ष', 
        dept: 'Law Graduate', 
        deptMr: 'विधी पदवीधर', 
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' 
      }
    ]
  };

  const divisions = [
    { 
      id: 'sambhajinagar',
      name: 'Aurangabad Division', 
      nameMr: 'छत्रपती संभाजीनगर विभाग', 
      units: 112, 
      members: '8,400', 
      activePercent: '92%', 
      status: 'Growth Rank #1', 
      statusMr: 'ग्रोथ रँक #१' 
    },
    { 
      id: 'nanded',
      name: 'Nanded Division', 
      nameMr: 'नांदेड विभाग', 
      units: 85, 
      members: '6,100', 
      activePercent: '78%', 
      status: 'Strong Hold', 
      statusMr: 'मजबूत पकड' 
    },
    { 
      id: 'latur',
      name: 'Latur Division', 
      nameMr: 'लातूर विभाग', 
      units: 94, 
      members: '7,200', 
      activePercent: '85%', 
      status: 'Impact Leader', 
      statusMr: 'प्रभावशाली' 
    },
    { 
      id: 'beed',
      name: 'Beed Division', 
      nameMr: 'बीड विभाग', 
      units: 45, 
      members: '3,500', 
      activePercent: '60%', 
      status: 'Emerging', 
      statusMr: 'उदयोन्मुख' 
    }
  ];

  const wings = [
    { 
      id: 'think-india',
      title: 'Think India', 
      titleMr: 'थिंक इंडिया', 
      desc: 'Fostering nationalist discourse and policy research in premier academic institutes.', 
      descMr: 'प्रमुख शैक्षणिक संस्थांमध्ये राष्ट्रवादी विचार आणि धोरण संशोधनाला चालना देणे.', 
      icon: Landmark,
      longDesc: 'Think India is an elite platform fostering nationalistic policy discussions, research fellowships, legal internships, and institutional governance initiatives among students of premier institutes like IITs, IIMs, NLUs, and central universities.',
      longDescMr: 'थिंक इंडिया हा आयआयटी, आयआयएम, एनएलयू आणि केंद्रीय विद्यापीठांसारख्या नामांकित संस्थांमधील विद्यार्थ्यांमध्ये राष्ट्रहिताचे धोरणात्मक विषय, संशोधन फेलोशिप, कायदेशीर इंटर्नशिप आणि संस्थात्मक प्रशासनाला चालना देणारा मंच आहे.',
      email: 'thinkindiadelhi@gmail.com',
      website: 'https://thinkindia.foundation'
    },
    { 
      id: 'sfd',
      title: 'SFD', 
      titleMr: 'एस.एफ.डी.', 
      desc: 'Students For Development: Driving environmental sustainability and rural transformation initiatives.', 
      descMr: 'पर्यावरण संवर्धन आणि ग्रामीण विकासासाठी कार्यरत असलेला शाश्वत विकास मंच.', 
      icon: Star,
      longDesc: 'Students For Development (SFD) advocates for eco-friendly practices, conducting extensive water-harvesting audits, major tree plantations, renewable energy propagation, and comprehensive rural village adoptions.',
      longDescMr: 'स्टुडंट्स फॉर डेव्हलपमेंट (SFD) शाश्वत आणि पर्यावरणपूरक विकासासाठी काम करते. या अंतर्गत पाणी संवर्धन, वृक्षारोपण मोहिमा, सौर ऊर्जेचा प्रचार आणि ग्रामीण दत्तक गाव योजना राबविल्या जातात.',
      email: 'sfdindia@gmail.com',
      website: 'https://sfdindia.org'
    },
    { 
      id: 'sfs',
      title: 'SFS', 
      titleMr: 'एस.एफ.एस.', 
      desc: 'Students For Seva: Dedicated wing for social volunteerism, relief work, and community service.', 
      descMr: 'आपत्ती निवारण, रक्तपेढी मदत आणि समाजसेवेसाठीचे समर्पित स्वयंसेवक दल.', 
      icon: Users,
      longDesc: 'Students For Seva (SFS) drives active societal transformation. Volunteers serve inside underprivileged schools, run immediate medical camps, coordinate disaster relief efforts, and champion daily blood bank networks.',
      longDescMr: 'स्टुडंट्स फॉर सेवा (SFS) तळागाळातील सामाजिक बदलासाठी कार्य करते. वंचित शाळांमध्ये शिक्षण मदत, विनामूल्य वैद्यकीय शिबिरे, आपत्ती व्यवस्थापन आणि २४/७ रक्तदान साहाय्य पुरवले जाते.',
      email: 'abvp.sfs@gmail.com',
      website: 'https://abvp.org'
    },
    { 
      id: 'jignasa',
      title: 'Jignasa', 
      titleMr: 'जिज्ञासा', 
      desc: 'Promoting science, innovation, and indigenous research methodologies among students.', 
      descMr: 'विद्यार्थ्यांमध्ये स्वदेशी विज्ञान, नाविन्यता आणि संशोधन पद्धतींचा प्रसार.', 
      icon: GraduationCap,
      longDesc: 'Jignasa is dedicated to nurturing deep academic passion, modern empirical research, and clinical superiority in Indian Traditional Medicine, primarily Ayurveda, among medical aspirants.',
      longDescMr: 'जिज्ञासा मंचाचा मुख्य उद्देश वैद्यकीय विद्यार्थ्यांमध्ये आयुर्वेद आणि पारंपरिक भारतीय चिकित्सा पद्धतींमधील आधुनिक संशोधन आणि क्लिनिकल कौशल्य वृद्धिंगत करणे हा आहे.',
      email: 'abvpjignasa@gmail.com',
      website: 'https://abvp.org'
    }
  ];

  const faqs = [
    {
      q: 'How are office bearers appointed?',
      qMr: 'पदाधिकाऱ्यांची नियुक्ती कशी केली जाते?',
      a: 'Appointments are made through a consensus-driven democratic process during annual regional conferences. Active workers are evaluated based on their commitment, leadership skills, and impact at the grassroots level.',
      aMr: 'वार्षिक प्रादेशिक परिषदांदरम्यान संमती-आधारित लोकशाही प्रक्रियेद्वारे नियुक्त्या केल्या जातात. सक्रिय कार्यकर्त्यांचे त्यांच्या बांधिलकी, नेतृत्व कौशल्य आणि तळागाळातील प्रभावाच्या आधारे मूल्यांकन केले जाते.'
    },
    {
      q: 'Can any student join the leadership hierarchy?',
      qMr: 'कोणताही विद्यार्थी नेतृत्व उतरंडीमध्ये सामील होऊ शकतो का?',
      a: 'Yes, ABVP is a merit-based organization. Any student who is a member and shows dedication to student welfare can rise through the ranks, from a campus unit secretary to the regional or even national executive committee.',
      aMr: 'होय, अभाविप ही गुणवत्तेवर आधारित संघटना आहे. कोणताही विद्यार्थी जो सदस्य आहे आणि विद्यार्थी कल्याणासाठी समर्पित आहे तो कॉलेज युनिट मंत्र्यापासून प्रांत किंवा राष्ट्रीय कार्यकारिणीपर्यंत पोहोचू शकतो.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* 1. Page Title Hero */}
      <section className="relative w-full min-h-[75vh] py-24 sm:py-32 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#001847]/75 mix-blend-multiply z-10"></div>
          <img 
            alt="ABVP Leadership Conference" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLu4UXbIwTIJ2pd2-pgogwh3OUC_Yb2lV-njfiRABzH43RMNui7Zf6TV4i7-eIU2YYDVoysj1WtZuYoIjfO9IQ6ig1KE_vmVHqzj_NVNO2vYbKSxGoY7i9Dozk4hzrvaRzmEam9bmk80COedlwkCWEELvcD1q_7NS_3YGLMSrKjIPwkD5OVdoUIx1_bE-ulkAYcvVRMxoYEc5W_man_rk8bSL7-lNjpdiKh-wEiJYqFPBVVVL00pTKvCgYMN"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-white text-left">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-[#fc820c] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider mb-6">
              {activeLang === 'EN' ? 'Student Power – Nation Power' : 'छात्र शक्ति - राष्ट्र शक्ति'}
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6 leading-tight">
              {activeLang === 'EN' 
                ? 'Organization - Building a Strong Student Leadership Network Across Deogiri Region' 
                : 'संघटन - देवगिरी विभागात एक मजबूत विद्यार्थी नेतृत्व जाळे निर्माण करत आहोत'}
            </h1>
            <p className="font-sans text-lg sm:text-xl text-orange-200 mb-10 opacity-90 max-w-2xl leading-relaxed font-light">
              {activeLang === 'EN'
                ? "Ensuring every student's voice is integrated into a disciplined and democratic framework for regional development."
                : "प्रादेशिक विकासासाठी प्रत्येक विद्यार्थ्याचा आवाज शिस्तबद्ध आणि लोकशाही चौकटीत समाविष्ट करण्याची खात्री देणे."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('hierarchy-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#fc820c] text-white font-extrabold rounded-xl hover:scale-103 transition-transform flex items-center gap-2 shadow-lg hover:bg-[#d96a00] cursor-pointer"
              >
                {activeLang === 'EN' ? 'Explore Organization' : 'संघटन तपासा'}
              </button>
              <button 
                onClick={() => document.getElementById('executive-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-white/30 backdrop-blur-md text-white font-extrabold rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                {activeLang === 'EN' ? 'Meet Our Leadership' : 'नेतृत्वाला भेटा'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About the Organization */}
      <section className="py-24 bg-white border-b border-slate-100 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center text-left">
          <div className="space-y-6">
            <span className="text-[#fc820c] font-bold tracking-widest uppercase text-xs sm:text-sm block">
              {activeLang === 'EN' ? 'GOVERNANCE & PHILOSOPHY' : 'प्रशासन आणि तत्वज्ञान'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] leading-tight">
              {activeLang === 'EN' ? 'A Systematic Bridge from Campus to Region' : 'कॅम्पस ते विभाग जोडणारा पद्धतशीर दुवा'}
            </h2>
            <div className="w-20 h-1 bg-[#fc820c] rounded-full mb-6" />
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-light">
              {activeLang === 'EN'
                ? "The organizational structure of ABVP Deogiri is designed to empower students at every level. From the smallest campus unit to the Regional Executive Committee, our framework ensures democratic participation and accountability."
                : "अभाविप देवगिरीची संघटन रचना प्रत्येक स्तरावर विद्यार्थ्यांना सक्षम करण्यासाठी तयार केली गेली आहे. अगदी लहान महाविद्यालयीन युनिटपासून ते प्रादेशिक कार्यकारिणी समितीपर्यंत, आमचे व्यासपीठ लोकशाही भागीदारी आणि जबाबदारी सुनिश्चित करते."}
            </p>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-light">
              {activeLang === 'EN'
                ? "Our leadership philosophy revolves around 'Chhatra Shakti' (Student Power) as 'Rashtra Shakti' (National Power). We focus on identifying talent, nurturing leadership qualities, and providing a platform for students to address local issues while contributing to national goals."
                : "आमचे नेतृत्व तत्वज्ञान 'छात्र शक्ती हीच राष्ट्र शक्ती' या संकल्पनेभोवती फिरते. आम्ही गुणवत्ता ओळखण्यावर, नेतृत्व गुणांचे संगोपन करण्यावर आणि विद्यार्थ्यांना स्थानिक समस्या सोडवण्यासोबतच राष्ट्रीय उद्दिष्टांमध्ये योगदान देण्यास व्यासपीठ देण्यावर भर देतो."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-[#fc820c] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Democratic Merit' : 'लोकशाही गुणवत्ता'}
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    {activeLang === 'EN' ? 'Positions are based on performance and contribution.' : 'पदे कार्य आणि कर्तृत्वावर आधारित असतात.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Network className="h-5 w-5 text-[#fc820c] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Decentralized Power' : 'विकेंद्रित अधिकार'}
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    {activeLang === 'EN' ? 'Autonomous functioning at city and district levels.' : 'शहर आणि जिल्हा पातळीवर स्वायत्त काम पद्धत.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group lg:mt-0 mt-8">
            {/* Accent colored floating backgrounds to pop off */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#fc820c]/10 rounded-2xl -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#001847]/5 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative aspect-[4/3] z-10">
              <img 
                alt="Strategic Illustration" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLvDEYlgiY4mcz_gAZjdO6XmVNmYESzfTK06FLSVgyfgByU4JWWE9TvyxeGUL8ZRgnWb2zungC0svX-fnafaiG1YDq8rhqsoPEEGIxSIhlctiCynHC5HNj_LxVRZjAK4kjL9qo8SjOtEvvmo_tGhREAQyqO8arZu7ioEZZvfo_xui6t8By_YXthvo5JwGezYecpOciQoZI_9W82QZI3tVk5ZU4yXl_hW4-uCsMuBch9_LSG3vDzkGN71oqTa"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Highly visible, layered floating pop-off badge */}
            <div className="absolute -bottom-6 -left-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-l-4 border-[#fc820c] border-slate-100 max-w-[280px] z-20 hover:scale-105 transition-transform duration-300">
              <p className="font-sans font-black text-[#001847] text-sm sm:text-base leading-snug">
                {activeLang === 'EN' ? 'Empowering 50,000+ Students' : '५०,०००+ विद्यार्थ्यांना सक्षम करत आहोत'}
              </p>
              <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                {activeLang === 'EN' ? 'Across Deogiri Region' : 'देवगिरी प्रांतात'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Organization Structure */}
      <section id="hierarchy-section" className="relative py-24 bg-[#001847] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,130,12,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-3 block">
            {activeLang === 'EN' ? 'GOVERNANCE STRUCTURE' : 'प्रशासकीय रचना'}
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white mb-4">
            {activeLang === 'EN' ? 'Organizational Hierarchy' : 'संघटन रचना आणि उतरंड'}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            {activeLang === 'EN'
              ? 'A multi-tier structure ensuring effective communication and implementation across the Deogiri landscape. Click on any level to explore details.'
              : 'देवगिरी विभागातील प्रभावी समन्वय आणि उपक्रमांची जलद अंमलबजावणी सुनिश्चित करणारी बहुस्तरीय रचना. माहितीसाठी स्तरावर क्लिक करा.'}
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Tree Map Representation */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center min-h-[450px]">
            
            {/* Level 1: Prant Node */}
            <button 
              onClick={() => setSelectedNode('region')}
              className={`w-64 p-5 rounded-2xl shadow-xl border transition-all text-center cursor-pointer ${selectedNode === 'region' ? 'bg-[#fc820c] border-[#fc820c] text-white scale-103' : 'bg-white/10 border-white/10 text-white hover:bg-white/20'}`}
            >
              <Network className="h-6 w-6 mx-auto mb-2 text-white" />
              <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider">
                {activeLang === 'EN' ? 'ABVP Deogiri Region' : 'अभाविप देवगिरी प्रांत'}
              </h3>
              <p className="text-[10px] opacity-75 mt-1 uppercase tracking-widest">
                {activeLang === 'EN' ? 'State Level Authority' : 'प्रांत पातळीवरील अधिकार'}
              </p>
            </button>

            {/* Down Connector */}
            <div className="h-8 w-0.5 bg-orange-400" />

            {/* Level 2: Divisions Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full relative">
              <div className="absolute top-0 left-1/6 right-1/6 h-0.5 bg-orange-400/55 hidden sm:block" />

              {/* Sambhajinagar Node */}
              <button 
                onClick={() => setSelectedNode('sambhajinagar')}
                className={`p-4 rounded-xl border transition-all text-center cursor-pointer relative ${selectedNode === 'sambhajinagar' ? 'bg-[#fc820c] border-[#fc820c] text-white scale-103' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/15'}`}
              >
                <div className="w-0.5 h-4 bg-orange-400 mx-auto -mt-8 mb-4 hidden sm:block" />
                <h4 className="font-extrabold text-xs">
                  {activeLang === 'EN' ? 'Chh. Sambhajinagar Div' : 'छत्रपती संभाजीनगर विभाग'}
                </h4>
                <p className="text-[9px] opacity-75 mt-1">
                  {activeLang === 'EN' ? '4 Districts Included' : '४ जिल्ह्यांचा समावेश'}
                </p>
              </button>

              {/* Nanded Node (Active representation) */}
              <button 
                onClick={() => setSelectedNode('nanded')}
                className={`p-4 rounded-xl border transition-all text-center cursor-pointer relative ${selectedNode === 'nanded' ? 'bg-[#fc820c] border-[#fc820c] text-white scale-103' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/15'}`}
              >
                <div className="w-0.5 h-4 bg-orange-400 mx-auto -mt-8 mb-4 hidden sm:block" />
                <h4 className="font-extrabold text-xs">
                  {activeLang === 'EN' ? 'Nanded Division' : 'नांदेड विभाग'}
                </h4>
                <p className="text-[9px] opacity-75 mt-1 text-orange-300 font-bold">
                  {activeLang === 'EN' ? '3 Districts | 85 Colleges' : '३ जिल्हे | ८५ महाविद्यालये'}
                </p>
              </button>

              {/* Latur Node */}
              <button 
                onClick={() => setSelectedNode('latur')}
                className={`p-4 rounded-xl border transition-all text-center cursor-pointer relative ${selectedNode === 'latur' ? 'bg-[#fc820c] border-[#fc820c] text-white scale-103' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/15'}`}
              >
                <div className="w-0.5 h-4 bg-orange-400 mx-auto -mt-8 mb-4 hidden sm:block" />
                <h4 className="font-extrabold text-xs">
                  {activeLang === 'EN' ? 'Latur Division' : 'लातूर विभाग'}
                </h4>
                <p className="text-[9px] opacity-75 mt-1">
                  {activeLang === 'EN' ? '2 Districts Included' : '२ जिल्ह्यांचा समावेश'}
                </p>
              </button>
            </div>

            {/* Down Connector */}
            <div className="h-8 w-0.5 bg-orange-400" />

            {/* Level 3: District Units */}
            <button 
              onClick={() => setSelectedNode('district')}
              className={`w-60 p-4 rounded-xl border transition-all text-center cursor-pointer ${selectedNode === 'district' ? 'bg-[#fc820c] border-[#fc820c] text-white scale-103' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/15'}`}
            >
              <h4 className="font-extrabold text-xs">
                {activeLang === 'EN' ? 'District & City Units' : 'जिल्हा व नगर युनिट्स'}
              </h4>
              <p className="text-[9px] opacity-75 mt-1">
                {activeLang === 'EN' ? 'Grassroots Level Executions' : 'तळागाळातील उपक्रम अंमलबजावणी'}
              </p>
            </button>

          </div>

          {/* Details Card on Right */}
          <div className="bg-white text-[#121c2a] rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between text-left min-h-[450px]">
            <div>
              <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-4 block">
                {activeLang === 'EN' ? 'Structure Details' : 'रचना तपशील'}
              </span>

              <AnimatePresence mode="wait">
                {selectedNode === 'region' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#001847]">
                      {activeLang === 'EN' ? 'ABVP Deogiri Region' : 'अभाविप देवगिरी प्रांत'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {activeLang === 'EN' 
                        ? 'The apex level authority coordinate body directing all youth movements, policy statements, and specialized divisions across Marathwada region.'
                        : 'मराठवाडा विभागातील सर्व युवा आंदोलने, धोरणात्मक विधाने आणि विशेष मंचांचे समन्वय साधणारी सर्वोच्च प्राधिकरण समिती.'}
                    </p>
                    <div className="pt-4 space-y-2.5 text-xs border-t border-slate-100 font-medium">
                      <div className="flex justify-between text-slate-400"><span>Divisions:</span> <span className="text-[#001847] font-black">08 Divisions</span></div>
                      <div className="flex justify-between text-slate-400"><span>Districts Covered:</span> <span className="text-[#001847] font-black">8 Districts</span></div>
                      <div className="flex justify-between text-slate-400"><span>Headquarters:</span> <span className="text-[#fc820c] font-black">Chh. Sambhajinagar</span></div>
                    </div>
                  </motion.div>
                )}

                {selectedNode === 'sambhajinagar' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#001847]">
                      {activeLang === 'EN' ? 'Chh. Sambhajinagar Div' : 'छत्रपती संभाजीनगर विभाग'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {activeLang === 'EN'
                        ? 'Includes the district coordinates of Aurangabad, Jalna, Beed, and Parbhani with professional college committees.'
                        : 'छत्रपती संभाजीनगर, जालना, बीड आणि परभणी जिल्हा युनिट्स आणि व्यावसायिक महाविद्यालयांचे संचलन या केंद्राद्वारे होते.'}
                    </p>
                    <div className="pt-4 space-y-2.5 text-xs border-t border-slate-100 font-medium">
                      <div className="flex justify-between text-slate-400"><span>Colleges Covered:</span> <span className="text-[#001847] font-black">112 Colleges</span></div>
                      <div className="flex justify-between text-slate-400"><span>Active Members:</span> <span className="text-[#fc820c] font-black">8,400+ Students</span></div>
                    </div>
                  </motion.div>
                )}

                {selectedNode === 'nanded' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#001847]">
                      {activeLang === 'EN' ? 'Nanded Division' : 'नांदेड विभाग'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {activeLang === 'EN'
                        ? 'Directly coordinating SRTMU university councils, technical engineering camps, and active sports cells.'
                        : 'स्वामी रामानंद तीर्थ विद्यापीठाचे सिनेट प्रश्न, अभियांत्रिकी महाविद्यालये आणि क्रीडा मंचांचे प्रत्यक्ष समन्वय केंद्र.'}
                    </p>
                    <div className="pt-4 space-y-2.5 text-xs border-t border-slate-100 font-medium">
                      <div className="flex justify-between text-slate-400"><span>Colleges Covered:</span> <span className="text-[#001847] font-black">85 Colleges</span></div>
                      <div className="flex justify-between text-slate-400"><span>Active Members:</span> <span className="text-[#fc820c] font-black">6,100+ Students</span></div>
                    </div>
                  </motion.div>
                )}

                {selectedNode === 'latur' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#001847]">
                      {activeLang === 'EN' ? 'Latur Division' : 'लातूर विभाग'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {activeLang === 'EN'
                        ? 'Major competitive preparation coaching coordinates and dedicated tribal hostel aid programs.'
                        : 'स्पर्धा परीक्षा विद्यार्थ्यांचे केंद्र, अभ्यासिका समन्वय आणि वनवासी वसतिगृह सहाय्य उपक्रम.'}
                    </p>
                    <div className="pt-4 space-y-2.5 text-xs border-t border-slate-100 font-medium">
                      <div className="flex justify-between text-slate-400"><span>Colleges Covered:</span> <span className="text-[#001847] font-black">94 Colleges</span></div>
                      <div className="flex justify-between text-slate-400"><span>Active Members:</span> <span className="text-[#fc820c] font-black">7,200+ Students</span></div>
                    </div>
                  </motion.div>
                )}

                {selectedNode === 'district' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#001847]">
                      {activeLang === 'EN' ? 'District & City Units' : 'जिल्हा व नगर युनिट्स'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {activeLang === 'EN'
                        ? 'Local administrative and planning units executing campaigns, sports meets, blood donation drives, and cultural festivals.'
                        : 'स्थानिक स्तरावरील विविध उपक्रम, आंदोलने, रक्तदान शिबिरे आणि क्रीडा-सांस्कृतिक महोत्सवांचे आयोजन करणारे अंतिम केंद्र.'}
                    </p>
                    <div className="pt-4 space-y-2.5 text-xs border-t border-slate-100 font-medium">
                      <div className="flex justify-between text-slate-400"><span>Total Units:</span> <span className="text-[#001847] font-black">500+ Units</span></div>
                      <div className="flex justify-between text-slate-400"><span>Youth Volunteers:</span> <span className="text-[#fc820c] font-black">25,000+ Active</span></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={onJoinClick}
              className="mt-8 w-full py-4 bg-[#fc820c] text-white font-extrabold rounded-xl hover:bg-[#d96a00] transition-colors shadow-md text-center cursor-pointer"
            >
              {activeLang === 'EN' ? 'Join ABVP Hierarchy' : 'अभाविप संघटनमध्ये सामील व्हा'}
            </button>
          </div>

        </div>
      </section>

      {/* 4. Executive Committee */}
      <section id="executive-section" className="py-24 bg-slate-50 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
            {activeLang === 'EN' ? 'OUR LEADERSHIP COUNCIL' : 'आमची कार्यकारिणी परिषद'}
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
            {activeLang === 'EN' ? 'Executive Committee' : 'कार्यकारिणी समिती'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed mb-10">
            {activeLang === 'EN'
              ? 'Guided by experienced academic professionals and dynamic student leaders.'
              : 'अनुभवी प्राध्यापक मार्गदर्शक आणि धडाडीच्या विद्यार्थी नेत्यांद्वारे संचलित कार्यकारिणी समिती.'}
          </p>

          {/* Committee Tabs */}
          <div className="flex justify-center flex-wrap gap-3 mb-16">
            {[
              { id: 'regional', label: 'Regional Executive', labelMr: 'प्रांत कार्यकारिणी' },
              { id: 'division', label: 'Division Heads', labelMr: 'विभाग प्रमुख' },
              { id: 'district', label: 'District Presidents', labelMr: 'जिल्हा अध्यक्ष' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === tab.id ? 'bg-[#001847] text-white shadow-md' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-600'}`}
              >
                {activeLang === 'EN' ? tab.label : tab.labelMr}
              </button>
            ))}
          </div>

          {/* Members Grid with Grayscale to Color Effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {committeeMembers[activeTab].map((member, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    src={member.img}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001847]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-xs text-orange-300 font-bold uppercase tracking-wider">
                      {activeLang === 'EN' ? member.role : member.roleMr}
                    </p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-bold text-[#001847] text-lg">
                    {activeLang === 'EN' ? member.name : member.nameMr}
                  </h4>
                  <p className="text-[#fc820c] text-xs font-bold uppercase tracking-widest mt-1">
                    {activeLang === 'EN' ? member.role : member.roleMr}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 italic font-light">
                    {activeLang === 'EN' ? member.dept : member.deptMr}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Regional Office HQ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          <div className="space-y-10">
            <div>
              <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
                {activeLang === 'EN' ? 'VISIT OUR HEADQUARTERS' : 'प्रादेशिक कार्यालयाला भेट द्या'}
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
                {activeLang === 'EN' ? 'Regional Headquarters' : 'प्रादेशिक मुख्यालय'}
              </h2>
              <p className="text-slate-500 font-sans text-sm font-light leading-relaxed">
                {activeLang === 'EN'
                  ? 'The central coordination hub for all activities, educational inquiries, and student mobilization across the Deogiri (Marathwada) region.'
                  : 'देवगिरी (मराठवाडा) विभागातील सर्व शैक्षणिक चौकशी, विद्यार्थी संघटना आणि उपक्रमांचे मध्यवर्ती समन्वय केंद्र.'}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#001847] shrink-0 border border-slate-100">
                  <MapPin className="h-6 w-6 text-[#fc820c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Office Address' : 'कार्यालयाचा पत्ता'}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                    ABVP Deogiri Bhawan, Samarth Nagar, Opp. Varad Ganesh Temple, Chh. Sambhajinagar - 431001
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#001847] shrink-0 border border-slate-100">
                  <Phone className="h-6 w-6 text-[#fc820c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Contact Details' : 'संपर्क तपशील'}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                    +91 240 2345678 • deogiri@abvp.org
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#001847] shrink-0 border border-slate-100">
                  <Clock className="h-6 w-6 text-[#fc820c]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Working Hours' : 'कामकाजाची वेळ'}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                    Monday - Saturday: 10:00 AM - 07:00 PM
                  </p>
                  <p className="text-[#fc820c] text-xs font-bold mt-1">
                    {activeLang === 'EN' ? 'Closed on Sundays & Public Holidays' : 'रविवार आणि सार्वजनिक सुट्ट्यांच्या दिवशी कार्यालय बंद राहील'}
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#001847] text-white rounded-xl font-extrabold hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
            >
              {activeLang === 'EN' ? 'Get Directions' : 'नकाशात पहा'}
            </a>
          </div>

          <div className="h-[450px] bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200 relative group">
            {/* Map Preview Background (Vite Safe Image / UI layout) */}
            <div className="absolute inset-0 bg-slate-50 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center justify-center">
              <div className="w-72 p-6 bg-white rounded-2xl shadow-xl border border-slate-100 text-center space-y-4">
                <div className="w-12 h-12 bg-orange-100 text-[#fc820c] rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Deogiri Bhawan, HQ' : 'देवगिरी भवन, मुख्यालय'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Samarth Nagar, Opp. Varad Ganesh Temple, Chh. Sambhajinagar
                  </p>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block w-full py-2 bg-[#fc820c] hover:bg-[#d96a00] text-white rounded-lg text-xs font-bold transition-colors"
                >
                  {activeLang === 'EN' ? 'Open in Google Maps' : 'गुगल मॅपमध्ये उघडा'}
                </a>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg text-[10px] font-bold text-slate-400 shadow">
              Interactive GPS Preview
            </div>
          </div>
        </div>
      </section>

      {/* 6. Division & District Overviews */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'DIVISION PERFORMANCE' : 'विभागीय कामगिरी'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Division Performance' : 'विभागीय प्रगती अहवाल'}
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base font-light">
              {activeLang === 'EN' 
                ? 'Annual metrics across the 4 key administrative divisions of Deogiri.' 
                : 'देवगिरी मधील ४ मुख्य प्रशासकीय विभागांचे वार्षिक आकडेवारी विश्लेषण.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div, idx) => (
              <div 
                key={idx} 
                className="bg-white border-t-4 border-t-[#001847] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-sans font-extrabold text-[#001847] text-lg sm:text-xl">
                      {activeLang === 'EN' ? div.name.split(' ')[0] : div.nameMr.split(' ')[0]}
                    </h3>
                    <span className="bg-orange-50 text-[#fc820c] text-[9px] font-black uppercase px-2 py-1 rounded">
                      {activeLang === 'EN' ? div.status : div.statusMr}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 text-xs sm:text-sm border-t border-slate-100">
                    <div className="flex justify-between text-slate-400 font-medium">
                      <span>{activeLang === 'EN' ? 'College Units' : 'कॉलेज युनिट्स'}</span>
                      <span className="font-extrabold text-[#001847]">{div.units}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 font-medium">
                      <span>{activeLang === 'EN' ? 'Active Members' : 'सक्रिय सदस्य'}</span>
                      <span className="font-extrabold text-[#001847]">{div.members}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 font-medium">
                      <span>{activeLang === 'EN' ? 'Campus Presence' : 'कॅम्पस उपस्थिती'}</span>
                      <span className="font-extrabold text-[#fc820c]">{div.activePercent}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setSelectedMapRegion(div.id as any)}
                    className="w-full py-2 bg-slate-50 text-[#001847] font-black text-xs rounded hover:bg-[#001847] hover:text-white transition-all uppercase tracking-wider cursor-pointer"
                  >
                    {activeLang === 'EN' ? 'Select Division' : 'विभाग निवडा'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Departments / Wings */}
      <section id="wings-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'SPECIALIZED ORGANIZATIONAL WINGS' : 'आमचे विशेष कार्य मंच'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-4">
              {activeLang === 'EN' ? 'Specialized Wings' : 'विशेष मंच'}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-light">
              {activeLang === 'EN'
                ? 'Focused organizational verticals to cater to diverse student interests and social needs.'
                : 'विविध क्षेत्रातील विद्यार्थ्यांच्या गरजा आणि आवडीनिवडी लक्षात घेऊन कार्यरत असलेले विशेष मंच.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wings.map((wing, idx) => {
              const IconComp = wing.icon;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedWing(wing)}
                  className="group p-8 rounded-2xl bg-slate-50 hover:bg-[#001847] hover:text-white transition-all duration-500 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between text-left cursor-pointer"
                >
                  <div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#001847] mb-6 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                      <IconComp className="h-8 w-8 text-[#fc820c]" />
                    </div>
                    <h4 className="font-sans font-extrabold text-xl mb-3 text-[#001847] group-hover:text-white leading-tight">
                      {activeLang === 'EN' ? wing.title : wing.titleMr}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm opacity-90 leading-relaxed font-light group-hover:text-slate-300">
                      {activeLang === 'EN' ? wing.desc : wing.descMr}
                    </p>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 mt-6 font-extrabold text-xs text-[#fc820c] group-hover:translate-x-2 transition-transform tracking-widest uppercase">
                    <span>{activeLang === 'EN' ? 'Learn More' : 'अधिक माहिती'}</span>
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Organization Wing Expanded Modal Overlay */}
          <AnimatePresence>
            {selectedWing && (
              <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl relative overflow-hidden text-left border border-slate-100 text-slate-800"
                >
                  <button 
                    onClick={() => setSelectedWing(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-full flex items-center justify-center transition-colors border border-slate-100 cursor-pointer animate-none"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 bg-orange-50 text-[#fc820c] rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                      {(() => {
                        const IconComp = selectedWing.icon;
                        return <IconComp className="h-8 w-8 text-[#fc820c]" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-sans font-black text-2xl text-[#001847] leading-none">
                        {activeLang === 'EN' ? selectedWing.title : selectedWing.titleMr}
                      </h3>
                      <span className="inline-block mt-2 bg-orange-500/10 text-[#fc820c] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                        {activeLang === 'EN' ? 'Specialized Forum' : 'विशेष कार्य मंच'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light border-y border-slate-100 py-6 my-6">
                    <p className="font-medium text-[#001847]">
                      {activeLang === 'EN' ? selectedWing.desc : selectedWing.descMr}
                    </p>
                    <p>
                      {activeLang === 'EN' ? selectedWing.longDesc : selectedWing.longDescMr}
                    </p>

                    {(selectedWing.email || selectedWing.website) && (
                      <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                        <h4 className="font-sans font-black text-xs uppercase tracking-widest text-[#fc820c]">
                          {activeLang === 'EN' ? 'Official Contact & Network' : 'अधिकृत संपर्क आणि संकेतस्थळ'}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                          {selectedWing.email && (
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-bold text-slate-400">{activeLang === 'EN' ? 'Email:' : 'ईमेल:'}</span>
                              <a href={`mailto:${selectedWing.email}`} className="text-[#001847] hover:text-[#fc820c] font-mono hover:underline transition-all">
                                {selectedWing.email}
                              </a>
                            </div>
                          )}
                          {selectedWing.website && (
                            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-6">
                              <span className="font-sans font-bold text-slate-400">{activeLang === 'EN' ? 'Website:' : 'संकेतस्थळ:'}</span>
                              <a 
                                href={selectedWing.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[#001847] hover:text-[#fc820c] font-mono hover:underline transition-all flex items-center gap-1"
                              >
                                {selectedWing.website.replace('https://', '')}
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
        </div>
      </section>

      {/* 8. Statistics Ribbon */}
      <section className="py-20 bg-[#001847] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-black text-[#fc820c] font-mono">08</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-slate-300">
              {activeLang === 'EN' ? 'Divisions' : 'विभाग'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-black text-[#fc820c] font-mono">24</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-slate-300">
              {activeLang === 'EN' ? 'Districts' : 'जिल्हे'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-black text-[#fc820c] font-mono">500+</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-slate-300">
              {activeLang === 'EN' ? 'Units' : 'युनिट्स'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-black text-[#fc820c] font-mono">12</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-slate-300">
              {activeLang === 'EN' ? 'Universities' : 'विद्यापीठ'}
            </div>
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <div className="text-4xl md:text-5xl font-black text-[#fc820c] font-mono">25k+</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-slate-300">
              {activeLang === 'EN' ? 'Members' : 'सदस्य'}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive Regional Map */}
      <section className="py-24 bg-slate-900 overflow-hidden relative text-white border-y border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(252,130,12,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          <div className="space-y-8">
            <div>
              <span className="text-[#fc820c] font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
                {activeLang === 'EN' ? 'VISUAL REACH' : 'क्षेत्रीय व्याप्ती'}
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-white">
                {activeLang === 'EN' ? 'Deogiri Regional Presence' : 'देवगिरी विभागीय उपस्थिती'}
              </h2>
              <p className="text-slate-400 font-sans text-sm sm:text-base font-light leading-relaxed mt-4">
                {activeLang === 'EN'
                  ? 'Our influence spans across the historic Deogiri region. Click on any sector on the map or select below to view localized statistics.'
                  : 'अभाविपचे कार्य संपूर्ण ऐतिहासिक देवगिरी प्रांतात पसरले आहे. खालील विभागात क्लिक करून विभागीय आकडेवारी तपासा.'}
              </p>
            </div>

            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-3 h-3 bg-[#fc820c] rounded-full animate-ping flex-shrink-0" />
                <span className="text-white font-extrabold text-base sm:text-lg">
                  {activeLang === 'EN' ? 'Selected Center:' : 'निवडलेले केंद्र:'} <span className="text-orange-400">{activeLang === 'EN' ? mapDetails[selectedMapRegion].title : mapDetails[selectedMapRegion].titleMr}</span>
                </span>
              </div>
              
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                {activeLang === 'EN' ? mapDetails[selectedMapRegion].description : mapDetails[selectedMapRegion].descriptionMr}
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                    {activeLang === 'EN' ? 'OFFICE BEARERS' : 'सक्रिय कार्यकर्ते'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {mapDetails[selectedMapRegion].officeBearers}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                    {activeLang === 'EN' ? 'COLLEGES PRESENCE' : 'कॉलेज उपस्थिती'}
                  </p>
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {mapDetails[selectedMapRegion].colleges}
                  </p>
                </div>
                <div className="col-span-2 pt-4 border-t border-white/5">
                  <button 
                    onClick={onJoinClick}
                    className="w-full py-3 bg-[#fc820c] hover:bg-[#d96a00] text-white rounded-lg font-bold text-xs tracking-wider uppercase cursor-pointer"
                  >
                    {activeLang === 'EN' ? 'View Local Directory' : 'स्थानिक निर्देशिका पहा'}
                  </button>
                </div>
              </div>
            </div>

            {/* Manual selector buttons */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(mapDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedMapRegion(key as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedMapRegion === key ? 'bg-white text-slate-900' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'}`}
                >
                  {activeLang === 'EN' ? mapDetails[key as keyof typeof mapDetails].title.split(' ')[0] : mapDetails[key as keyof typeof mapDetails].titleMr.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Map Section */}
          <div className="relative flex justify-center">
            <div className="w-full aspect-square max-w-[450px] bg-slate-850 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              
              <svg className="w-full h-full p-12 text-slate-700" viewBox="0 0 500 500">
                {/* Simulated map boundaries */}
                <path 
                  className={`transition-colors cursor-pointer stroke-white/20 stroke-2 ${selectedMapRegion === 'sambhajinagar' ? 'fill-orange-500/25' : 'fill-white/5 hover:fill-white/10'}`}
                  d="M100 100 L250 80 L350 150 L280 250 L120 220 Z"
                  onClick={() => setSelectedMapRegion('sambhajinagar')}
                />
                <path 
                  className={`transition-colors cursor-pointer stroke-white/20 stroke-2 ${selectedMapRegion === 'nanded' ? 'fill-orange-500/25' : 'fill-white/5 hover:fill-white/10'}`}
                  d="M350 150 L450 120 L480 300 L380 350 L280 250 Z"
                  onClick={() => setSelectedMapRegion('nanded')}
                />
                <path 
                  className={`transition-colors cursor-pointer stroke-white/20 stroke-2 ${selectedMapRegion === 'latur' ? 'fill-orange-500/25' : 'fill-white/5 hover:fill-white/10'}`}
                  d="M280 250 L380 350 L320 450 L180 420 L200 320 Z"
                  onClick={() => setSelectedMapRegion('latur')}
                />
                <path 
                  className={`transition-colors cursor-pointer stroke-white/20 stroke-2 ${selectedMapRegion === 'beed' ? 'fill-orange-500/25' : 'fill-white/5 hover:fill-white/10'}`}
                  d="M120 220 L280 250 L200 320 L100 350 L60 280 Z"
                  onClick={() => setSelectedMapRegion('beed')}
                />

                {/* Pin points with pulsing effect */}
                <circle className={`cursor-pointer transition-all ${selectedMapRegion === 'sambhajinagar' ? 'fill-[#fc820c] r-12 filter drop-shadow-[0_0_10px_#fc820c]' : 'fill-white opacity-60'}`} cx="200" cy="140" r="10" onClick={() => setSelectedMapRegion('sambhajinagar')} />
                <circle className={`cursor-pointer transition-all ${selectedMapRegion === 'nanded' ? 'fill-[#fc820c] r-12 filter drop-shadow-[0_0_10px_#fc820c]' : 'fill-white opacity-60'}`} cx="370" cy="220" r="10" onClick={() => setSelectedMapRegion('nanded')} />
                <circle className={`cursor-pointer transition-all ${selectedMapRegion === 'latur' ? 'fill-[#fc820c] r-12 filter drop-shadow-[0_0_10px_#fc820c]' : 'fill-white opacity-60'}`} cx="290" cy="360" r="10" onClick={() => setSelectedMapRegion('latur')} />
                <circle className={`cursor-pointer transition-all ${selectedMapRegion === 'beed' ? 'fill-[#fc820c] r-12 filter drop-shadow-[0_0_10px_#fc820c]' : 'fill-white opacity-60'}`} cx="160" cy="270" r="10" onClick={() => setSelectedMapRegion('beed')} />
              </svg>

              <div className="absolute bottom-6 right-6 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                {activeLang === 'EN' ? 'Interactive Regional Map' : 'परस्पर नकाशा'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Leadership Journey Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'PERSONAL ROADMAP' : 'वैयक्तिक विकासाचा रोडमॅप'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Your Leadership Journey' : 'तुमचा नेतृत्व प्रवास'}
            </h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base font-light">
              {activeLang === 'EN'
                ? 'How you grow from a student volunteer to a regional decision maker.'
                : 'एक महाविद्यालयीन स्वयंसेवकापासून ते प्रादेशिक कार्यकारिणी पदाधिकाऱ्यापर्यंत होणारा तुमचा प्रवास.'}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-[80%] top-12 w-[2px] bg-slate-200 hidden md:block" />

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-5/12 text-center md:text-right mb-6 md:mb-0">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#001847] group-hover:text-[#fc820c] transition-colors">
                    {activeLang === 'EN' ? 'Phase 1: Membership' : 'टप्पा १: प्राथमिक सदस्यत्व'}
                  </h3>
                  <p className="text-slate-500 mt-2 text-xs sm:text-sm font-light leading-relaxed">
                    {activeLang === 'EN'
                      ? 'Join the campus unit, participate in study circles, and understand the core ideology.'
                      : 'कॅम्पस युनिटमध्ये सामील व्हा, साप्ताहिक अभ्यास मंडळांमध्ये भाग घ्या आणि मूळ विचारसरणी समजून घ्या.'}
                  </p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-[#001847] text-white rounded-full flex items-center justify-center ring-8 ring-slate-50 group-hover:scale-105 transition-transform">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="md:w-5/12 hidden md:block" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between group">
                <div className="md:w-5/12 text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#001847] group-hover:text-[#fc820c] transition-colors">
                    {activeLang === 'EN' ? 'Phase 2: College Secretary/President' : 'टप्पा २: महाविद्यालयीन अध्यक्ष / मंत्री'}
                  </h3>
                  <p className="text-slate-500 mt-2 text-xs sm:text-sm font-light leading-relaxed">
                    {activeLang === 'EN'
                      ? 'Lead campus-level agitations, organize events, and manage local member grievances.'
                      : 'महाविद्यालयीन पातळीवरील प्रश्न मांडणे, उपक्रम आयोजित करणे आणि स्थानिक विद्यार्थ्यांचे प्रतिनिधित्व करणे.'}
                  </p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-[#001847] text-white rounded-full flex items-center justify-center ring-8 ring-slate-50 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="md:w-5/12 hidden md:block" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-5/12 text-center md:text-right mb-6 md:mb-0">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#001847] group-hover:text-[#fc820c] transition-colors">
                    {activeLang === 'EN' ? 'Phase 3: City/District Core' : 'टप्पा ३: नगर / जिल्हा कोअर टीम'}
                  </h3>
                  <p className="text-slate-500 mt-2 text-xs sm:text-sm font-light leading-relaxed">
                    {activeLang === 'EN'
                      ? 'Coordinate between multiple college units, interface with city administration.'
                      : 'अनेक महाविद्यालयीन युनिट्समध्ये समन्वय साधणे आणि स्थानिक प्रशासनासोबत विद्यार्थी हिताचे काम करणे.'}
                  </p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-[#001847] text-white rounded-full flex items-center justify-center ring-8 ring-slate-50 group-hover:scale-105 transition-transform">
                  <Landmark className="h-5 w-5 text-white" />
                </div>
                <div className="md:w-5/12 hidden md:block" />
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between group">
                <div className="md:w-5/12 text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#001847] group-hover:text-[#fc820c] transition-colors">
                    {activeLang === 'EN' ? 'Phase 4: Regional Executive' : 'टप्पा ४: प्रांत कार्यकारिणी सदस्य'}
                  </h3>
                  <p className="text-slate-500 mt-2 text-xs sm:text-sm font-light leading-relaxed">
                    {activeLang === 'EN'
                      ? 'Design regional policies, represent Deogiri at National Conferences.'
                      : 'प्रादेशिक धोरणे आखणे आणि राष्ट्रीय संमेलनांमध्ये देवगिरी विभागाचे प्रतिनिधित्व करणे.'}
                  </p>
                </div>
                <div className="relative z-10 w-12 h-12 bg-[#fc820c] text-white rounded-full flex items-center justify-center ring-8 ring-slate-50 group-hover:scale-105 transition-transform">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div className="md:w-5/12 hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Call to Action */}
      <section className="py-24 bg-[#fc820c] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Users className="h-96 w-96 text-white stroke-[1]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 text-left">
          <div className="text-white text-center md:text-left">
            <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
              {activeLang === 'EN' ? 'Become a Future Student Leader' : 'उद्याचे विद्यार्थी नेते बना'}
            </h2>
            <p className="text-base sm:text-lg opacity-95 max-w-xl font-light">
              {activeLang === 'EN'
                ? 'Take the first step towards personal growth and nation building. Join the movement today.'
                : 'वैयक्तिक विकास आणि राष्ट्र उभारणीच्या दिशेने पहिले पाऊल टाका. आजच सहभागी व्हा.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-shrink-0">
            <button 
              onClick={onJoinClick}
              className="px-10 py-5 bg-[#001847] hover:bg-neutral-800 text-white font-extrabold rounded-xl shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {activeLang === 'EN' ? 'Join ABVP' : 'अभाविप मध्ये सहभागी व्हा'}
            </button>
            <a 
              href="mailto:deogiri@abvp.org"
              className="px-10 py-5 border-2 border-white text-white font-extrabold rounded-xl hover:bg-white hover:text-slate-900 transition-all text-center"
            >
              {activeLang === 'EN' ? 'Contact Local Unit' : 'स्थानिक युनिटशी संपर्क साधा'}
            </a>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-3xl mx-auto text-left">
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-bold text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'STRUCTURE QUESTIONS' : 'रचना प्रश्न आणि उत्तरे'}
            </span>
            <h2 className="font-sans font-black text-3xl text-[#001847]">
              {activeLang === 'EN' ? 'Organizational FAQs' : 'संरचनात्मक प्रश्नोत्तरे'}
            </h2>
            <p className="text-slate-500 mt-4 font-light text-sm sm:text-base">
              {activeLang === 'EN' ? 'Understanding the mechanics of our student body.' : 'आमच्या विद्यार्थी संघटनेची रचना समजून घ्या.'}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span className="font-sans font-extrabold text-base text-[#001847]">
                    {activeLang === 'EN' ? faq.q : faq.qMr}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-[#001847] transition-transform duration-200 ${faqOpen === idx ? 'rotate-180 text-[#fc820c]' : ''}`} />
                </button>
                
                {faqOpen === idx && (
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
