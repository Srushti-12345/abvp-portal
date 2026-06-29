import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Award, Users, HeartHandshake, CheckCircle2, 
  ArrowRight, Search, FileText, Calendar, BookOpen, Clock, 
  MapPin, Phone, Mail, ChevronRight, Quote, ShieldAlert, Sparkles,
  User, Check, AlertCircle, Info, Send
} from 'lucide-react';

interface JoinPageProps {
  activeLang: 'EN' | 'MR';
  onBackToHome?: () => void;
}

export default function JoinPage({ activeLang, onBackToHome }: JoinPageProps) {
  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    university: 'Dr. Babasaheb Ambedkar Marathwada University',
    collegeName: '',
    course: '',
    year: '1st Year',
    division: 'Aurangabad (Deogiri)',
    district: '',
    address: '',
    bloodGroup: 'O+',
    interests: [] as string[]
  });

  // Track ID to query
  const [searchTrackId, setSearchTrackId] = useState('');
  const [trackedApplication, setTrackedApplication] = useState<{
    id: string;
    status: 'pending' | 'verified' | 'inducted' | 'not_found';
    name: string;
    date: string;
  } | null>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [activeStep, setActiveStep] = useState(1);

  // Auto slider testimonial
  const testimonials = [
    {
      text: activeLang === 'EN' 
        ? '"Joining ABVP was a turning point. I started as a college member and today I\'m leading the district unit. The organization truly believes in empowering students."'
        : '"अभाविपमध्ये सामील होणे हा माझ्या आयुष्यातील महत्त्वाचा टप्पा होता. मी कॉलेज स्तरावर काम सुरू केले आणि आज जिल्हा युनिटचे नेतृत्व करत आहे. संघटना विद्यार्थ्यांच्या सक्षमीकरणावर विश्वास ठेवते."',
      author: 'Rahul Deshmukh',
      role: activeLang === 'EN' ? 'District Convenor, Deogiri Prant' : 'जिल्हा संयोजक, देवगिरी प्रांत',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7ORsT2TTQIYFMhty-Uzn3fD79AUwvuGYZFegqVscsIoe0OjC4JCYwlGVEPxY_V9fRzPJjzu9_QGmKKSKWWZF0qMuIve1pld0kGijUSpAKBKNZXFaA-ZnfdhZWNXhG-Dj0BqBhfr-WjKwYoe1UeNe9FOtwPqsDp106d8hYLzkaZfa-EMyvn3KcGdry46k-raZUx_iAzI8v1-IGoTBg-I5paJfynhTLlopG1MRD-3vxBSEacaunx1f-WU3vKVlKuQw18tmav4J_h1T'
    },
    {
      text: activeLang === 'EN'
        ? '"The workshops on personality development, structural management, and public speaking gave me the confidence I never had. It\'s more than a student union; it\'s a family."'
        : '"व्यक्तिमत्त्व विकास, संस्थात्मक व्यवस्थापन आणि वक्तृत्व यावरील कार्यशाळांनी मला कमालीचा आत्मविश्वास दिला. ही केवळ एक विद्यार्थी संघटना नसून एक कुटुंब आहे."',
      author: 'Sneha Patil',
      role: activeLang === 'EN' ? 'State Executive Member, Nanded' : 'राज्य कार्यकारिणी सदस्य, नांदेड',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCsnPTZcsZiFicbR5xJ4BhLz7FiotemjeXOBUj76jEoUtCKxVCYNyIyiCy32UohEfIWHcd-dgtRJWrytF-IHMFKNY-E0zD_FwMjCR0mbDswNP2LAbquFDZdXiYSe7_0IUjziEBFdqgOd6waBAS_0MFBenE83fze6wVWWAuq7hzAnDUAkkqZnYCPe4CKq9ndKkAsuF7wSG8hDpaxEX1P9jfGLAxdBUJzo_6IjZw0JxKPEpQiMG1wNLvjE9964YPYt2O_cldsPLODcu9'
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Interests check
  const availableInterests = [
    { id: 'leadership', label: 'Leadership / नेतृत्व', labelMr: 'नेतृत्व विकास' },
    { id: 'social', label: 'Social Service / सेवा', labelMr: 'सामाजिक सेवा' },
    { id: 'sports', label: 'Sports & Culture / क्रीडा व कला', labelMr: 'क्रीडा आणि सांस्कृतिक' },
    { id: 'writing', label: 'Writing & Media / लेखन व प्रसिद्धी', labelMr: 'लेखन आणि प्रसारमाध्यम' },
    { id: 'academic', label: 'Academic Forums / अभ्यास मंडळ', labelMr: 'शैक्षणिक कट्टा' },
    { id: 'digital', label: 'Digital Sovereignty / डिजिटल तंत्रज्ञान', labelMr: 'डिजिटल उपक्रम' }
  ];

  const toggleInterest = (interestId: string) => {
    if (formData.interests.includes(interestId)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(id => id !== interestId)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interestId]
      });
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone && formData.email && formData.collegeName) {
      const generatedNum = `ABVP-DEO-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedId(generatedNum);
      setFormSubmitted(true);
      window.scrollTo({ top: document.getElementById('application-form')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTrackId.trim()) return;
    
    // Simple simulated tracking
    if (searchTrackId.toUpperCase().includes('APP-2024') || searchTrackId.toUpperCase().includes('ABVP-DEO')) {
      setTrackedApplication({
        id: searchTrackId.toUpperCase(),
        status: 'verified',
        name: activeLang === 'EN' ? 'Aniket Deshmukh' : 'अनिकेत देशमुख',
        date: '24 Jun 2026'
      });
    } else if (searchTrackId.trim() === '123456') {
      setTrackedApplication({
        id: 'ABVP-DEO-123456',
        status: 'inducted',
        name: activeLang === 'EN' ? 'Snehal Kulkarni' : 'स्नेहल कुलकर्णी',
        date: '18 Jun 2026'
      });
    } else {
      setTrackedApplication({
        id: searchTrackId,
        status: 'not_found',
        name: '',
        date: ''
      });
    }
  };

  return (
    <div className="flex-grow bg-[#F8F9FA] text-[#121c2a]">
      
      {/* 1. Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#001847] via-[#001847]/85 to-transparent z-10"></div>
          <img 
            alt="ABVP Leadership Student Summit" 
            className="w-full h-full object-cover scale-102" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeAOWIN_P59mC6_DPRXYbhPpM5R1Vrf8YzoHwMhPphoYfOtBsWJUa4J0HF-uID_6t-UcQPHTjDg70tBLSD3OAPk1DhhZ_xiL7F27ao5zaP6vHY47POOCH5eIwN3s_76LeIVn0RzW4IhIGHKNB0VaDv9EK08t7PxOIP9-xtCPfjzZK4IQUSkydaOsIc4Ty4F31hWbHMQv7wrZNQec7tnDVmh7mqsP0yWsb_yvhoU9MCbs1K8iIQTSbgLykJgmmKXnTacV-e5kqy-RsV" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left">
          <div className="max-w-2xl text-white space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#fc820c]/20 border border-[#fc820c]/30 px-4 py-1.5 rounded-full text-orange-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-[#fc820c] animate-pulse" />
              {activeLang === 'EN' ? "Join the Movement" : "महाचळवळीत सहभागी व्हा"}
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-6xl text-white leading-tight">
              {activeLang === 'EN' ? (
                <>
                  Join ABVP<br/>
                  <span className="text-[#fc820c]">अभाविप मध्ये सहभागी व्हा</span>
                </>
              ) : (
                <>
                  अभाविप मध्ये सहभागी व्हा<br/>
                  <span className="text-[#fc820c]">Join ABVP</span>
                </>
              )}
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {activeLang === 'EN' 
                ? "Become a part of India's largest student organization and contribute towards student leadership, educational development, and nation building."
                : "भारतातील सर्वात मोठ्या विद्यार्थी संघटनेचा भाग व्हा आणि विद्यार्थी नेतृत्व, शैक्षणिक विकास आणि राष्ट्र उभारणीत आपले योगदान द्या."}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('application-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#fc820c] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>{activeLang === 'EN' ? 'Apply for Membership' : 'सदस्यत्वासाठी अर्ज करा'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('why-join');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-extrabold text-sm transition-all cursor-pointer"
              >
                {activeLang === 'EN' ? 'Learn More' : 'अधिक जाणून घ्या'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Join Section */}
      <section id="why-join" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest block">
                {activeLang === 'EN' ? 'WHY JOIN ABVP?' : 'अभाविपमध्ये का सामील व्हावे?'}
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
                {activeLang === 'EN' ? 'Shape Your Destiny, Serve the Nation' : 'आपल्या भविष्याला आकार द्या, देशाची सेवा करा'}
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-7 w-7 text-[#001847]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                      {activeLang === 'EN' ? 'Student Leadership' : 'विद्यार्थी नेतृत्व'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                      {activeLang === 'EN'
                        ? 'Discover your leadership potential through our vast network of campus units. We empower students to voice their concerns and drive systemic change.'
                        : 'आमच्या कॅम्पस शाखांच्या विस्तीर्ण जाळ्याद्वारे तुमच्यातील नेतृत्वगुणांचा शोध घ्या. आम्ही विद्यार्थ्यांना त्यांच्या समस्या मांडण्यास आणि बदल घडवून आणण्यास सक्षम करतो.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Award className="h-7 w-7 text-[#fc820c]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                      {activeLang === 'EN' ? 'Personality Development' : 'व्यक्तिमत्त्व विकास'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                      {activeLang === 'EN'
                        ? 'Engage in workshops, public speaking forums, and organizational management tasks that shape your character for professional and personal excellence.'
                        : 'कार्यशाळा, वक्तृत्व मंच आणि संघटनात्मक व्यवस्थापन कार्यात सहभागी व्हा जे तुमच्या व्यक्तिमत्त्वाला व्यावसायिक आणि वैयक्तिक उत्कृष्टतेसाठी आकार देतात.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <HeartHandshake className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                      {activeLang === 'EN' ? 'Social Service' : 'सामाजिक बांधिलकी'}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                      {activeLang === 'EN'
                        ? "Be part of impactful initiatives like Seva Sangam and environmental drives. Contribute your skills to uplift society and serve the nation."
                        : "सेवा संगम आणि पर्यावरण संवर्धन मोहिमांसारख्या प्रभावी उपक्रमांचा भाग व्हा. समाजाच्या उन्नतीसाठी आणि देशसेवेसाठी आपल्या कौशल्यांचे योगदान द्या."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOQ27Q63MS_icMJraVO1IOvUcsWhtYZZ0SeNi_0-_vJ6qa5saVoggseenOcoyXXn2FXkR-AuHux2meh4SmPsh2Kb5_dMRqqcleP1_OF7fepjk_PqiqjkOVNoNveeREzK_wD4Nce9H0FTQKdAzUw-PyEP2251f1k-TphZzCUWEo_LnaG4YgE5yESiklnl9uLS0dBZNLOlYosxeEdSOk3Zxas2bUlAk4EXPhA3TWlyk04XGbzTj9SaR8X3meLKPPah-0PNV2UFjHIoQ8" 
                  alt="Future Skills Workshop" 
                  className="w-full h-full object-cover aspect-square hover:scale-102 transition-all duration-300"
                />
              </div>
              <div className="space-y-4 flex flex-col justify-between">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex-grow">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2AjAsZjQ2ZniL6gurA92KOVMoz_JM8qBNsiCkwIUnpgEcYaLpRdu_8fCWKIMDDEYW2dEz4hKU6sZcFZhoznip2M0t4KASiqT8EmaPf8dMU-5WUy44xCHJCEEAFmPUNQiWzhNvhOSPlERcdqmMRiQgqLS65bYf0KmZlZt8NGR3c8GLr31NH_xDEjQ1JB83R2gC8sijzGAa0_QXy7TsvByNkXbnILGb63B87FFDcWMaPi-TyEJA8CXLKfv1dGii_p5huSFjrCpy1itZ" 
                    alt="Campus plantation drive" 
                    className="w-full h-full object-cover hover:scale-102 transition-all duration-300"
                  />
                </div>
                <div className="rounded-2xl bg-[#001847] p-8 text-white text-center shadow-lg shrink-0">
                  <h3 className="text-4xl font-black text-[#fc820c] mb-1">75+</h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-300">
                    {activeLang === 'EN' ? 'Years of Legacy' : 'वर्षांचा गौरवशाली इतिहास'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Membership Benefits Grid */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'MEMBERSHIP BENEFITS' : 'सदस्यत्वाचे फायदे'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Exclusive Opportunities' : 'विशिष्ट संधी आणि फायदे'}
            </h2>
            <p className="text-slate-500 font-sans text-sm max-w-xl mx-auto mt-4 font-light">
              {activeLang === 'EN' 
                ? 'Exclusive opportunities designed to foster your growth as a student and future citizen of India.'
                : 'विद्यार्थी आणि भारताचे जबाबदार नागरिक म्हणून तुमची प्रगती घडवून आणण्यासाठीच्या खास संधी.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
              <GraduationCap className="h-9 w-9 text-[#fc820c] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-2">Leadership Role</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">Access to real-world leadership roles in campus committee forums.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
              <Award className="h-9 w-9 text-[#fc820c] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-2">Training Camps</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">National workshops, debate cells, and policy audit programs.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
              <Users className="h-9 w-9 text-[#fc820c] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-2">Conferences</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">Direct entries into state conventions, youth parliaments, and panels.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 text-left group">
              <HeartHandshake className="h-9 w-9 text-[#fc820c] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-2">Social Outreach</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">Active participation in environmental sapling and rescue teams.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Membership Journey Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-left">
          
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'THE PIPELINE JOURNEY' : 'सदस्यत्वाचा प्रवास'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'The Path to Leadership' : 'नेतृत्वाकडे नेणारा मार्ग'}
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-6 gap-8 text-center">
            
            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#001847] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">1</div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847]">{activeLang === 'EN' ? 'Apply' : 'अर्ज'}</h4>
              <p className="text-slate-400 text-xs font-light">{activeLang === 'EN' ? 'Fill online form' : 'ऑनलाईन फॉर्म भरा'}</p>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#001847] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">2</div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847]">{activeLang === 'EN' ? 'Verify' : 'पडताळणी'}</h4>
              <p className="text-slate-400 text-xs font-light">{activeLang === 'EN' ? 'Local unit check' : 'शाखेद्वारे पडताळणी'}</p>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#001847] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">3</div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847]">{activeLang === 'EN' ? 'Induct' : 'प्रवेश'}</h4>
              <p className="text-slate-400 text-xs font-light">{activeLang === 'EN' ? 'Welcome meet' : 'स्वागत बैठक'}</p>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#001847] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">4</div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847]">{activeLang === 'EN' ? 'Engage' : 'सहभाग'}</h4>
              <p className="text-slate-400 text-xs font-light">{activeLang === 'EN' ? 'Campus activities' : 'कॅम्पस उपक्रम'}</p>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#001847] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">5</div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847]">{activeLang === 'EN' ? 'Skill Dev' : 'कौशल्य विकास'}</h4>
              <p className="text-slate-400 text-xs font-light">{activeLang === 'EN' ? 'Training programs' : 'प्रशिक्षण वर्ग'}</p>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-full bg-[#fc820c] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-md">6</div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847]">{activeLang === 'EN' ? 'Lead' : 'नेतृत्व'}</h4>
              <p className="text-slate-400 text-xs font-light">{activeLang === 'EN' ? 'Responsible roles' : 'महत्त्वाची पदे'}</p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Application Form & Status Tracking Section */}
      <section className="py-24 bg-slate-100" id="application-form">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Form container */}
          <div className="lg:col-span-2 text-left">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
              <div className="bg-[#001847] p-8 text-white text-left">
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-white">
                  {activeLang === 'EN' ? 'Membership Application' : 'नवीन सदस्यत्व अर्ज'}
                </h2>
                <p className="text-white/80 font-sans text-sm font-light mt-1">
                  {activeLang === 'EN' ? 'Please fill in your details accurately to initiate your journey.' : 'आपली सदस्यत्व नोंदणी प्रक्रिया सुरू करण्यासाठी कृपया खालील माहिती अचूक भरा.'}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="join-application-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit} 
                    className="p-8 space-y-8"
                  >
                    
                    {/* Step Tabs indicator */}
                    <div className="flex border-b border-slate-100 pb-4 justify-start gap-4 text-xs font-bold uppercase tracking-wider mb-6">
                      <button 
                        type="button" 
                        onClick={() => setActiveStep(1)} 
                        className={`pb-2 border-b-2 transition-all ${activeStep === 1 ? 'border-[#fc820c] text-[#fc820c]' : 'border-transparent text-slate-400'}`}
                      >
                        1. {activeLang === 'EN' ? 'Personal' : 'वैयक्तिक'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setActiveStep(2)} 
                        className={`pb-2 border-b-2 transition-all ${activeStep === 2 ? 'border-[#fc820c] text-[#fc820c]' : 'border-transparent text-slate-400'}`}
                      >
                        2. {activeLang === 'EN' ? 'Educational' : 'शैक्षणिक'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setActiveStep(3)} 
                        className={`pb-2 border-b-2 transition-all ${activeStep === 3 ? 'border-[#fc820c] text-[#fc820c]' : 'border-transparent text-slate-400'}`}
                      >
                        3. {activeLang === 'EN' ? 'Location & Interests' : 'स्थान आणि आवड'}
                      </button>
                    </div>

                    {/* STEP 1: Personal Info */}
                    {activeStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="font-sans font-extrabold text-base text-[#001847] flex items-center gap-2 pb-2 border-b border-slate-100">
                          <User className="h-4.5 w-4.5 text-[#fc820c]" />
                          <span>{activeLang === 'EN' ? 'Personal Information' : 'वैयक्तिक माहिती'}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Full Name' : 'पूर्ण नाव'}</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Anand Deshpande"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Email Address' : 'ईमेल पत्ता'}</label>
                            <input 
                              type="email" 
                              required
                              placeholder="name@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Phone Number' : 'मोबाईल नंबर'}</label>
                            <input 
                              type="tel" 
                              required
                              placeholder="+91 00000 00000"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Date of Birth' : 'जन्म तारीख'}</label>
                            <input 
                              type="date" 
                              required
                              value={formData.dob}
                              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Gender' : 'लिंग'}</label>
                            <select 
                              value={formData.gender}
                              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                            >
                              <option value="Male">{activeLang === 'EN' ? 'Male' : 'पुरुष'}</option>
                              <option value="Female">{activeLang === 'EN' ? 'Female' : 'महिला'}</option>
                              <option value="Other">{activeLang === 'EN' ? 'Other' : 'इतर'}</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Blood Group' : 'रक्तगट'}</label>
                            <select 
                              value={formData.bloodGroup}
                              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                            >
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button 
                            type="button" 
                            onClick={() => setActiveStep(2)}
                            className="px-6 py-3 bg-[#001847] hover:bg-[#002266] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-1"
                          >
                            <span>{activeLang === 'EN' ? 'Next: Education' : 'पुढे जा: शैक्षणिक'}</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Educational Info */}
                    {activeStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="font-sans font-extrabold text-base text-[#001847] flex items-center gap-2 pb-2 border-b border-slate-100">
                          <BookOpen className="h-4.5 w-4.5 text-[#fc820c]" />
                          <span>{activeLang === 'EN' ? 'Educational Information' : 'शैक्षणिक माहिती'}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'University / Board' : 'विद्यापीठ / बोर्ड'}</label>
                            <select 
                              value={formData.university}
                              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                            >
                              <option value="Dr. Babasaheb Ambedkar Marathwada University">Dr. Babasaheb Ambedkar Marathwada University (BAMU)</option>
                              <option value="Swami Ramanand Teerth Marathwada University">Swami Ramanand Teerth Marathwada University (SRTMUN)</option>
                              <option value="Dr. Babasaheb Ambedkar Technological University">Dr. Babasaheb Ambedkar Technological University (DBATU)</option>
                              <option value="CBSE / State Board">CBSE / HSC State Board</option>
                              <option value="Other">{activeLang === 'EN' ? 'Other' : 'इतर'}</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'College Name / School' : 'महाविद्यालय / शाळा'}</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Deogiri College, Aurangabad"
                              value={formData.collegeName}
                              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Course / Specialization' : 'अभ्यासक्रम / शाखा'}</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. B.Sc Computer Science"
                              value={formData.course}
                              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Current Year' : 'सध्याचे वर्ष'}</label>
                            <select 
                              value={formData.year}
                              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                            >
                              <option value="1st Year">1st Year / प्रथम वर्ष</option>
                              <option value="2nd Year">2nd Year / द्वितीय वर्ष</option>
                              <option value="3rd Year">3rd Year / तृतीय वर्ष</option>
                              <option value="Final Year">Final Year / अंतिम वर्ष</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <button 
                            type="button" 
                            onClick={() => setActiveStep(1)}
                            className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                          >
                            {activeLang === 'EN' ? 'Back' : 'मागे'}
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setActiveStep(3)}
                            className="px-6 py-3 bg-[#001847] hover:bg-[#002266] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-1"
                          >
                            <span>{activeLang === 'EN' ? 'Next: Location' : 'पुढे जा: स्थान'}</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Location & Interests Info */}
                    {activeStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="font-sans font-extrabold text-base text-[#001847] flex items-center gap-2 pb-2 border-b border-slate-100">
                          <MapPin className="h-4.5 w-4.5 text-[#fc820c]" />
                          <span>{activeLang === 'EN' ? 'Location & Area of Interest' : 'स्थान आणि आवड असलेले क्षेत्र'}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Division' : 'विभाग'}</label>
                            <select 
                              value={formData.division}
                              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                            >
                              <option value="Aurangabad (Deogiri)">Aurangabad (Deogiri) / संभाजीनगर</option>
                              <option value="Jalna">Jalna / जालना</option>
                              <option value="Latur">Latur / लातूर</option>
                              <option value="Beed">Beed / बीड</option>
                              <option value="Nanded">Nanded / नांदेड</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'District / Taluka' : 'जिल्हा / तालुका'}</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Sambhajinagar Taluka"
                              value={formData.district}
                              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">{activeLang === 'EN' ? 'Residential Address' : 'निवासाचा पत्ता'}</label>
                          <textarea 
                            rows={2}
                            placeholder={activeLang === 'EN' ? 'Your home address' : 'तुमचा सध्याचा पत्ता'}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-3 pt-2">
                          <label className="text-xs font-bold text-slate-700 block">
                            {activeLang === 'EN' ? 'Fields of Interest in ABVP' : 'अभाविपमधील आवडीची क्षेत्रे'}
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {availableInterests.map((interest) => {
                              const isChecked = formData.interests.includes(interest.id);
                              return (
                                <button
                                  type="button"
                                  key={interest.id}
                                  onClick={() => toggleInterest(interest.id)}
                                  className={`p-3 border rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${isChecked ? 'bg-orange-50 border-[#fc820c] text-[#fc820c]' : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                  <span>{activeLang === 'EN' ? interest.label : interest.labelMr}</span>
                                  {isChecked && <Check className="h-4 w-4 text-[#fc820c]" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex justify-between pt-6 border-t border-slate-100">
                          <button 
                            type="button" 
                            onClick={() => setActiveStep(2)}
                            className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                          >
                            {activeLang === 'EN' ? 'Back' : 'मागे'}
                          </button>
                          
                          <button 
                            type="submit"
                            className="px-8 py-3.5 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-md"
                          >
                            {activeLang === 'EN' ? 'Submit Application' : 'अर्ज सबमिट करा'}
                          </button>
                        </div>
                      </div>
                    )}

                  </motion.form>
                ) : (
                  <motion.div 
                    key="join-success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-10 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-black text-2xl text-[#001847]">
                        {activeLang === 'EN' ? 'Registration Completed!' : 'नोंदणी यशस्वीरित्या पूर्ण!'}
                      </h3>
                      <p className="text-slate-500 font-sans text-sm font-light max-w-md mx-auto leading-relaxed">
                        {activeLang === 'EN' 
                          ? "Congratulations, your student registration has been logged securely in our Deogiri Prant roster."
                          : "अभिनंदन, तुमचा विद्यार्थी अर्ज आमच्या देवगिरी प्रांत नोंदवहीत यशस्वीरित्या नोंदवला गेला आहे."}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-sm mx-auto space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        {activeLang === 'EN' ? 'YOUR MEMBERSHIP APPLICATION ID' : 'तुमचा अर्ज आयडी'}
                      </span>
                      <strong className="font-mono text-xl text-[#001847] tracking-widest block font-extrabold">
                        {generatedId}
                      </strong>
                      <p className="text-[10px] text-slate-400 leading-normal font-light pt-2 border-t border-slate-200">
                        {activeLang === 'EN' 
                          ? 'Please save this ID to query your live membership card status in the status tracker.'
                          : 'कृपया भविष्यातील पडताळणी किंवा डिजिटल ओळखपत्रासाठी हा आयडी नोंदवून ठेवा.'}
                      </p>
                    </div>

                    <div className="pt-4 flex justify-center gap-4">
                      <button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setActiveStep(1);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            dob: '',
                            gender: 'Male',
                            university: 'Dr. Babasaheb Ambedkar Marathwada University',
                            collegeName: '',
                            course: '',
                            year: '1st Year',
                            division: 'Aurangabad (Deogiri)',
                            district: '',
                            address: '',
                            bloodGroup: 'O+',
                            interests: []
                          });
                        }}
                        className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                      >
                        {activeLang === 'EN' ? 'Register Another' : 'नवीन नोंदणी करा'}
                      </button>
                      <button 
                        onClick={onBackToHome}
                        className="px-6 py-3 bg-[#001847] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                      >
                        {activeLang === 'EN' ? 'Back to Home' : 'मुख्यपृष्ठ'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Tracking and widgets */}
          <div className="space-y-8 text-left">
            
            {/* Status Tracking Form Card */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 text-left">
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
                <h3 className="font-sans font-extrabold text-[#001847] text-base">
                  {activeLang === 'EN' ? 'Track Status' : 'अर्जाची स्थिती पहा'}
                </h3>
                <span className="bg-yellow-50 text-amber-600 text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase">
                  {activeLang === 'EN' ? 'Verification Live' : 'पडताळणी सक्रिय'}
                </span>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <p className="text-slate-500 text-xs font-light leading-relaxed">
                  {activeLang === 'EN' 
                    ? 'Enter your membership Application ID to track the real-time screening phase.'
                    : 'तुमची अर्जाची स्थिती जाणून घेण्यासाठी येथे आपला अर्ज नोंदणी आयडी प्रविष्ट करा.'}
                </p>

                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. ABVP-DEO-123456"
                    value={searchTrackId}
                    onChange={(e) => setSearchTrackId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-2 focus:ring-[#fc820c] outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-[#001847] hover:bg-[#002266] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  {activeLang === 'EN' ? 'Track Application' : 'स्थिती शोधा'}
                </button>
              </form>

              {/* Simulated Tracking Result */}
              <AnimatePresence>
                {trackedApplication && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-4 border-t border-slate-100 space-y-4 text-xs font-sans"
                  >
                    {trackedApplication.status === 'not_found' ? (
                      <div className="bg-red-50 text-red-700 border border-red-100 p-3 rounded-xl flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">ID Not Found</strong>
                          <p className="text-[10px] text-red-600/90 font-light mt-0.5">Please check spelling or enter a simulated ID like "ABVP-DEO-123456" to see an active timeline.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center border border-slate-100">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-bold block">Applicant</span>
                            <strong className="text-slate-700 font-extrabold">{trackedApplication.name}</strong>
                          </div>
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                            {trackedApplication.status === 'inducted' ? 'Active Member' : 'Under Review'}
                          </span>
                        </div>

                        {/* Interactive Timeline steps */}
                        <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-1 before:bottom-1 before:w-0.5 before:bg-slate-200">
                          
                          {/* Phase 1 */}
                          <div className="relative">
                            <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                            <strong className="text-slate-700 font-bold block">Application Submitted</strong>
                            <p className="text-[10px] text-slate-400 font-light">Form details verified securely</p>
                          </div>

                          {/* Phase 2 */}
                          <div className="relative">
                            <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${trackedApplication.status === 'inducted' || trackedApplication.status === 'verified' ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-500'}`}>
                              {trackedApplication.status === 'inducted' || trackedApplication.status === 'verified' ? '✓' : '2'}
                            </span>
                            <strong className="text-slate-700 font-bold block">Document Roster Review</strong>
                            <p className="text-[10px] text-slate-400 font-light">Status: {trackedApplication.status === 'inducted' || trackedApplication.status === 'verified' ? 'Passed and Cleared' : 'In Progress'}</p>
                          </div>

                          {/* Phase 3 */}
                          <div className="relative">
                            <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${trackedApplication.status === 'inducted' ? 'bg-[#fc820c] text-white animate-pulse' : 'bg-slate-300 text-slate-500'}`}>
                              3
                            </span>
                            <strong className="text-slate-700 font-bold block">Induction and Roster Card</strong>
                            <p className="text-[10px] text-slate-400 font-light">Status: {trackedApplication.status === 'inducted' ? 'Inducted successfully!' : 'Awaiting confirmation'}</p>
                          </div>

                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Quote testimonial rotating card */}
            <div className="bg-[#001847] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fc820c]/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
              <Quote className="h-10 w-10 text-[#fc820c]/30 mb-4" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <p className="text-white/90 font-sans italic text-xs leading-relaxed font-light">
                    {testimonials[currentTestimonial].text}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].author} 
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <strong className="block text-xs font-bold text-white">{testimonials[currentTestimonial].author}</strong>
                      <span className="block text-[9px] text-white/60">{testimonials[currentTestimonial].role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Contact Help Desk widget */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left">
              <h4 className="font-sans font-bold text-sm text-[#001847] mb-4">{activeLang === 'EN' ? 'Need Help?' : 'मदत हवी आहे?'}</h4>
              <div className="space-y-3 text-xs text-slate-600 font-light">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#fc820c]" />
                  <span>+91 240 234XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#fc820c]" />
                  <span>support@abvpdeogiri.org</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
