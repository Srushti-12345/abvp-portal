import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, Mail, Clock, Send, Compass, Map, 
  HelpCircle, ChevronDown, CheckCircle2, Facebook, 
  Instagram, Youtube, ArrowRight, User, Users, Globe, MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  activeLang: 'EN' | 'MR';
  onJoinClick?: () => void;
}

export default function ContactPage({ activeLang, onJoinClick }: ContactPageProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: 'Sambhajinagar',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [directionsRequested, setDirectionsRequested] = useState(false);

  // Live location states
  const officeLat = 19.8762;
  const officeLng = 75.3433;
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return parseFloat((R * c).toFixed(2));
  };

  const handleLocateUser = () => {
    setIsLocating(true);
    setGeoError(null);
    
    if (!navigator.geolocation) {
      setGeoError(activeLang === 'EN' ? 'Geolocation is not supported by your browser.' : 'आपल्या ब्राउझरद्वारे भौगोलिक स्थान समर्थन उपलब्ध नाही.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        const distance = calculateDistance(latitude, longitude, officeLat, officeLng);
        setCalculatedDistance(distance);
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location: ', error);
        let errorMsg = activeLang === 'EN' 
          ? 'Failed to retrieve your location. Please check browser permissions.' 
          : 'स्थान मिळवण्यात अडचण आली. कृपया आपल्या ब्राउझर परवानग्या तपासा.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = activeLang === 'EN'
            ? 'Location access denied. Please allow location access to see your live coordinates on the map.'
            : 'स्थान प्रवेश नाकारला गेला. नकाशावर आपले थेट स्थान पाहण्यासाठी कृपया प्रवेश अनुमती द्या.';
        }
        setGeoError(errorMsg);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Form submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          district: 'Sambhajinagar',
          subject: '',
          message: ''
        });
      }, 4000);
    }
  };

  const districts = [
    'Sambhajinagar', 'Jalna', 'Latur', 'Beed', 'Dharashiv', 'Nanded', 'Parbhani', 'Hingoli'
  ];

  const divisions = [
    {
      id: 'sambhajinagar',
      name: 'Sambhajinagar Division',
      nameMr: 'संभाजीनगर विभाग',
      coordinator: 'Shri. Aniket Deshpande',
      coordinatorMr: 'श्री. अनिकेत देशपांडे',
      location: 'Shivaji Nagar, Opp. Rama International',
      locationMr: 'शिवाजी नगर, रामा इंटरनॅशनल समोर',
      phone: '+91 98765 43210'
    },
    {
      id: 'jalna',
      name: 'Jalna Division',
      nameMr: 'जालना विभाग',
      coordinator: 'Shri. Milind Kulkarni',
      coordinatorMr: 'श्री. मिलिंद कुलकर्णी',
      location: 'Main Road, Near Town Hall, Jalna',
      locationMr: 'मुख्य रस्ता, टाऊन हॉल जवळ, जालना',
      phone: '+91 98765 43211'
    },
    {
      id: 'latur',
      name: 'Latur Division',
      nameMr: 'लातूर विभाग',
      coordinator: 'Shri. Vivek Joshi',
      coordinatorMr: 'श्री. विवेक जोशी',
      location: 'Basaveshwar Chowk, Latur - 413512',
      locationMr: 'बसवेश्वर चौक, लातूर - ४१३५१२',
      phone: '+91 98765 43212'
    }
  ];

  const faqs = [
    {
      q: 'How can I join ABVP as a student member?',
      qMr: 'मी अभाविपचा विद्यार्थी सदस्य म्हणून कसा सामील होऊ शकतो?',
      a: 'Students can join ABVP by visiting our official website\'s membership portal or by contacting the campus unit in their respective colleges. We also conduct annual membership drives at the beginning of each academic session.',
      aMr: 'विद्यार्थी आमच्या अधिकृत संकेतस्थळावरील नोंदणी पोर्टलला भेट देऊन किंवा त्यांच्या महाविद्यालयातील अभाविप शाखा प्रमुखांशी संपर्क साधून सामील होऊ शकतात. आम्ही प्रत्येक शैक्षणिक वर्षाच्या सुरुवातीला वार्षिक सदस्यत्व मोहीम देखील राबवतो.'
    },
    {
      q: 'Whom should I contact for grievance redressal?',
      qMr: 'तक्रार निवारणासाठी मी कोणाशी संपर्क साधू?',
      a: 'For any student-related issues or campus grievances, you can contact your local unit president or use the "Student Support" category in our contact form. Our regional coordinators will review your case immediately.',
      aMr: 'विद्यार्थ्यांशी संबंधित कोणत्याही समस्यांसाठी किंवा महाविद्यालयातील अडचणींसाठी, आपण आपल्या स्थानिक शाखा अध्यक्षांशी संपर्क साधू शकता किंवा आमच्या संपर्क फॉर्मचा वापर करू शकता. आमचे विभागीय समन्वयक आपल्या प्रकरणाचे त्वरित निवारण करतील.'
    },
    {
      q: 'Can I visit the regional headquarters?',
      qMr: 'मी विभागीय मुख्य कार्यालयाला भेट देऊ शकतो का?',
      a: 'Yes, our regional office in Sambhajinagar is open during office hours (10 AM to 6 PM) for meetings and inquiries. We recommend booking a prior appointment for specific organizational discussions.',
      aMr: 'होय, संभाजीनगर येथील आमचे प्रांतीय कार्यालय कार्यालयीन वेळेत (सकाळी १० ते संध्याकाळी ६) बैठकांसाठी आणि चौकशीसाठी खुले असते. विशिष्ट संघटनात्मक चर्चेसाठी आधी वेळ निश्चित करून येण्याची शिफारस केली जाते.'
    }
  ];

  return (
    <div className="flex-grow bg-[#F8F9FA] text-[#121c2a]">
      
      {/* 1. Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#001847] via-[#001847]/80 to-transparent z-10"></div>
          <img 
            alt="Student interaction" 
            className="w-full h-full object-cover scale-105" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLu4UXbIwTIJ2pd2-pgogwh3OUC_Yb2lV-njfiRABzH43RMNui7Zf6TV4i7-eIU2YYDVoysj1WtZuYoIjfO9IQ6ig1KE_vmVHqzj_NVNO2vYbKSxGoY7i9Dozk4hzrvaRzmEam9bmk80COedlwkCWEELvcD1q_7NS_3YGLMSrKjIPwkD5OVdoUIx1_bE-ulkAYcvVRMxoYEc5W_man_rk8bSL7-lNjpdiKh-wEiJYqFPBVVVL00pTKvCgYMN" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#fc820c]/20 border border-[#fc820c]/30 px-4 py-1.5 rounded-full text-orange-200 text-xs font-semibold uppercase tracking-wider">
              <Compass className="h-4 w-4 text-[#fc820c] animate-spin" style={{ animationDuration: '6s' }} />
              {activeLang === 'EN' ? 'Digital Sovereignty Initiative' : 'डिजिटल सार्वभौमत्व उपक्रम'}
            </div>
            <h1 className="font-sans font-black text-4xl sm:text-6xl text-white leading-tight">
              {activeLang === 'EN' ? (
                <>
                  Contact ABVP Deogiri<br/>
                  <span className="text-[#fc820c]">अभाविप देवगिरी संपर्क</span>
                </>
              ) : (
                <>
                  अभाविप देवगिरी संपर्क<br/>
                  <span className="text-[#fc820c]">Contact ABVP Deogiri</span>
                </>
              )}
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/90 max-w-xl leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'We are here to guide, support, and connect with students across the Deogiri Region. Reach out to our team for any academic, administrative, or student leadership assistance.'
                : 'आम्ही देवगिरी प्रांतातील विद्यार्थ्यांना मार्गदर्शन, पाठिंबा आणि त्यांच्याशी संवाद साधण्यासाठी सदैव तत्पर आहोत. कोणत्याही शैक्षणिक, प्रशासकीय किंवा विद्यार्थी नेतृत्वाच्या मदतीसाठी आमच्याशी संपर्क साधा.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('contact-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#fc820c] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>{activeLang === 'EN' ? 'Contact Us' : 'संपर्क साधा'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={onJoinClick}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-extrabold text-sm transition-all cursor-pointer"
              >
                {activeLang === 'EN' ? 'Join ABVP' : 'अभाविपमध्ये सामील व्हा'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact Information Hub - Overlap Cards */}
      <section className="relative -mt-20 z-30 max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white shadow-xl border-t-4 border-[#001847] p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-[#001847]/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-6 w-6 text-[#001847]" />
            </div>
            <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-2">
              {activeLang === 'EN' ? 'Regional HQ' : 'प्रांत कार्यालय'}
            </h3>
            <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'ABVP Office, Plot No. 42, Near University Gate, Sambhajinagar, Maharashtra - 431001'
                : 'अभाविप कार्यालय, प्लॉट नं. ४२, विद्यापीठ गेट जवळ, संभाजीनगर, महाराष्ट्र - ४३१००१'}
            </p>
          </div>

          <div className="bg-white shadow-xl border-t-4 border-[#fc820c] p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Phone className="h-6 w-6 text-[#fc820c]" />
            </div>
            <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-2">
              {activeLang === 'EN' ? 'Mobile Number' : 'मोबाईल नंबर'}
            </h3>
            <p className="text-slate-700 font-sans text-sm font-semibold mb-1">
              +91 1234 567 890
            </p>
            <p className="text-slate-400 font-sans text-xs">
              {activeLang === 'EN' ? 'Available Mon-Sat' : 'सोमवार ते शनिवार उपलब्ध'}
            </p>
          </div>

          <div className="bg-white shadow-xl border-t-4 border-blue-500 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-2">
              {activeLang === 'EN' ? 'Email Support' : 'ईमेल पत्ता'}
            </h3>
            <p className="text-slate-700 font-sans text-sm font-semibold mb-1">
              contact@abvpdeogiri.org
            </p>
            <p className="text-slate-400 font-sans text-xs">
              {activeLang === 'EN' ? '24-hour response time' : '२४ तासात प्रतिसाद'}
            </p>
          </div>

          <div className="bg-white shadow-xl border-t-4 border-emerald-500 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-2">
              {activeLang === 'EN' ? 'Office Hours' : 'कार्यालयीन वेळ'}
            </h3>
            <p className="text-slate-700 font-sans text-sm font-semibold mb-1">
              10:00 AM - 6:00 PM
            </p>
            <p className="text-slate-400 font-sans text-xs">
              {activeLang === 'EN' ? 'Closed on Public Holidays' : 'शासकीय सुट्ट्यांच्या दिवशी बंद'}
            </p>
          </div>

        </div>
      </section>

      {/* 3. Form & Map Section */}
      <section className="py-20 bg-slate-50" id="contact-form">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Form Column */}
            <div className="lg:w-7/12 text-left">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-md">
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#001847] mb-2">
                  {activeLang === 'EN' ? 'Send us a Message' : 'आम्हाला निरोप पाठवा'}
                </h2>
                <p className="text-slate-500 font-sans text-sm font-light mb-8">
                  {activeLang === 'EN' 
                    ? 'Fill out the form below and our regional coordinators will get back to you.'
                    : 'खालील फॉर्म भरा आणि आमचे विभागीय समन्वयक तुमच्याशी लवकरच संपर्क साधतील.'}
                </p>

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="contact-form-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">
                            {activeLang === 'EN' ? 'Full Name' : 'पूर्ण नाव'}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-3.5 text-slate-400">
                              <User className="h-4 w-4" />
                            </span>
                            <input 
                              type="text" 
                              required
                              placeholder={activeLang === 'EN' ? 'e.g. Rahul Sharma' : 'उदा. राहुल शर्मा'}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent focus:bg-white transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">
                            {activeLang === 'EN' ? 'Mobile Number' : 'मोबाईल नंबर'}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-3.5 text-slate-400">
                              <Phone className="h-4 w-4" />
                            </span>
                            <input 
                              type="tel" 
                              required
                              placeholder="+91 00000 00000"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent focus:bg-white transition-all outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">
                            {activeLang === 'EN' ? 'Email Address' : 'ईमेल पत्ता'}
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-3.5 text-slate-400">
                              <Mail className="h-4 w-4" />
                            </span>
                            <input 
                              type="email" 
                              required
                              placeholder="name@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent focus:bg-white transition-all outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block">
                            {activeLang === 'EN' ? 'District' : 'जिल्हा'}
                          </label>
                          <select 
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent focus:bg-white transition-all outline-none bg-white cursor-pointer"
                          >
                            {districts.map((dist) => (
                              <option key={dist} value={dist}>{dist}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 block">
                          {activeLang === 'EN' ? 'Subject' : 'विषय'}
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder={activeLang === 'EN' ? 'Brief reason for contact' : 'संपर्काचे थोडक्यात कारण'}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent focus:bg-white transition-all outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 block">
                          {activeLang === 'EN' ? 'Message' : 'संदेश'}
                        </label>
                        <textarea 
                          rows={4}
                          required
                          placeholder={activeLang === 'EN' ? 'Your detailed query...' : 'आपली सविस्तर चौकशी किंवा अडचण...'}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#fc820c] focus:border-transparent focus:bg-white transition-all outline-none resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full md:w-auto px-10 py-4 bg-[#001847] hover:bg-[#002266] text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                      >
                        <span>{activeLang === 'EN' ? 'Submit Message' : 'संदेश पाठवा'}</span>
                        <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="contact-success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="text-center py-16 px-6 border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-3xl"
                    >
                      <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                      <h3 className="font-sans font-black text-2xl text-[#001847] mb-2">
                        {activeLang === 'EN' ? 'Message Sent Successfully!' : 'संदेश यशस्वीरित्या पाठवला गेला!'}
                      </h3>
                      <p className="text-slate-600 font-sans text-sm max-w-md mx-auto font-light leading-relaxed">
                        {activeLang === 'EN' 
                          ? 'Thank you for reaching out to ABVP Deogiri. A regional coordinator has been notified and will respond to your registered email/phone shortly.'
                          : 'अभाविप देवगिरीशी संपर्क साधल्याबद्दल धन्यवाद. विभागीय समन्वयक आपल्याशी लवकरच ईमेल किंवा फोनद्वारे संपर्क साधतील.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Map Column */}
            <div className="lg:w-5/12 flex flex-col gap-6 text-left">
              
              {/* Interactive simulated Map */}
              <div className="relative h-[380px] bg-slate-200 rounded-3xl overflow-hidden shadow-md border border-slate-200">
                <iframe 
                  title="ABVP Sambhajinagar"
                  src={userCoords 
                    ? `https://maps.google.com/maps?saddr=${userCoords.lat},${userCoords.lng}&daddr=${officeLat},${officeLng}&z=12&output=embed`
                    : `https://maps.google.com/maps?q=${officeLat},${officeLng}&z=15&output=embed`
                  } 
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                />
                
                {/* Fallback Overlay */}
                <div className="absolute top-4 left-4 bg-[#001847] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-md z-10">
                  <Map className="h-3.5 w-3.5" />
                  <span>{userCoords ? (activeLang === 'EN' ? 'ROUTE ACTIVE' : 'मार्ग सक्रिय') : (activeLang === 'EN' ? 'HQ LOCATION' : 'मुख्य कार्यालय')}</span>
                </div>
              </div>

              {/* Dynamic Live Location Tracker Widget */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${userCoords ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-[#fc820c]'}`}>
                    <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: userCoords ? '3s' : '15s' }} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#001847]">
                      {activeLang === 'EN' ? 'Live Location & Route Tracker' : 'थेट स्थान आणि मार्ग ट्रॅकर'}
                    </h4>
                    <p className="text-slate-400 text-xs font-light">
                      {activeLang === 'EN' ? 'Calculate real-time route to Regional HQ' : 'प्रांत कार्यालयापासूनचे अंतर आणि मार्ग शोधा'}
                    </p>
                  </div>
                </div>

                {userCoords ? (
                  <div className="space-y-4">
                    <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>{activeLang === 'EN' ? 'Live GPS Location Shared' : 'थेट स्थान यशस्वीरित्या जोडले'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
                        <div>Lat: {userCoords.lat.toFixed(5)}°</div>
                        <div>Lng: {userCoords.lng.toFixed(5)}°</div>
                      </div>
                      {calculatedDistance !== null && (
                        <div className="text-xs text-slate-700 pt-1 font-sans border-t border-slate-200/50 mt-1">
                          {activeLang === 'EN' ? (
                            <span>You are approximately <strong className="font-bold text-[#fc820c]">{calculatedDistance} km</strong> away from Deogiri HQ.</span>
                          ) : (
                            <span>आपण देवगिरी प्रांत कार्यालयापासून अंदाजे <strong className="font-bold text-[#fc820c]">{calculatedDistance} किमी</strong> अंतरावर आहात.</span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setUserCoords(null);
                        setCalculatedDistance(null);
                      }}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all cursor-pointer text-center"
                    >
                      {activeLang === 'EN' ? 'Reset Live Location' : 'थेट स्थान रीसेट करा'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-500 text-xs font-light leading-relaxed">
                      {activeLang === 'EN' 
                        ? 'Share your current GPS location to automatically plot a real-time driving route from your location to our HQ, and measure the precise distance.'
                        : 'आपल्या सध्याच्या स्थानापासून संभाजीनगरमधील आमच्या कार्यालयापर्यंतचा थेट मार्ग आणि अचूक अंतर पाहण्यासाठी आपले स्थान सामायिक करा.'}
                    </p>

                    {geoError && (
                      <div className="bg-red-50 text-red-700 border border-red-100 p-3 rounded-xl text-xs font-light leading-relaxed">
                        {geoError}
                      </div>
                    )}

                    <button
                      onClick={handleLocateUser}
                      disabled={isLocating}
                      className="w-full py-3 bg-[#fc820c] hover:bg-orange-600 disabled:bg-orange-400 text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {isLocating ? (
                        <>
                          <Compass className="h-4 w-4 animate-spin" />
                          <span>{activeLang === 'EN' ? 'Retrieving Position...' : 'स्थान शोधत आहे...'}</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 text-white" />
                          <span>{activeLang === 'EN' ? 'Locate My Live Position' : 'माझे थेट स्थान मिळवा'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* HQ Details Card */}
              <div className="bg-[#001847] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fc820c]/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                
                <h3 className="font-sans font-black text-xl text-white mb-2">
                  {activeLang === 'EN' ? 'Regional HQ Details' : 'प्रांत कार्यालय तपशील'}
                </h3>
                <p className="text-white/70 font-sans text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {activeLang === 'EN' 
                    ? 'Deogiri Prant Karyalaya, Dr. Babasaheb Ambedkar Marathwada University Road, Sambhajinagar.'
                    : 'देवगिरी प्रांत कार्यालय, डॉ. बाबासाहेब आंबेडकर मराठवाडा विद्यापीठ रस्ता, संभाजीनगर.'}
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex gap-4">
                    <Compass className="h-5 w-5 text-[#fc820c] shrink-0" />
                    <div>
                      <p className="font-sans font-bold text-xs text-[#fc820c]">
                        {activeLang === 'EN' ? 'Coordinates' : 'अक्षांश आणि रेखांश'}
                      </p>
                      <p className="text-white/80 font-mono text-[10px] sm:text-xs">
                        Latitude: 19.8762° N | Longitude: 75.3433° E
                      </p>
                    </div>
                  </div>

                  <a 
                    href={userCoords 
                      ? `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${officeLat},${officeLng}`
                      : `https://www.google.com/maps/dir/?api=1&destination=${officeLat},${officeLng}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDirectionsRequested(true)}
                    className="w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>{activeLang === 'EN' ? 'Get External Live Directions' : 'थेट मार्ग मिळवा (Google Maps)'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Divisional Offices Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Our Regional Divisions' : 'आमचे विभागीय कार्यालय संपर्क'}
            </h2>
            <div className="w-16 h-1 bg-[#fc820c] mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
              {activeLang === 'EN'
                ? 'Directly reach out to respective district division offices and dynamic coordinators.'
                : 'आपल्या जिल्ह्यातील विभागीय कार्यालये आणि संबंधित समन्वयक यांच्याशी थेट संपर्क साधा.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {divisions.map((division) => (
              <div 
                key={division.id} 
                className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-[#fc820c]/40 transition-all duration-300 flex flex-col text-left group"
              >
                <div className="w-10 h-10 bg-[#001847]/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors duration-300">
                  <Globe className="h-5 w-5 text-[#001847] group-hover:text-[#fc820c]" />
                </div>
                
                <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-6">
                  {activeLang === 'EN' ? division.name : division.nameMr}
                </h4>

                <ul className="space-y-4 text-xs sm:text-sm font-light text-slate-600 flex-grow">
                  <li className="flex gap-3">
                    <User className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-bold text-slate-700">Coordinator: </strong>
                      {activeLang === 'EN' ? division.coordinator : division.coordinatorMr}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      {activeLang === 'EN' ? division.location : division.locationMr}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-mono text-slate-700 font-medium">
                      {division.phone}
                    </span>
                  </li>
                </ul>

                <button 
                  onClick={() => alert(`Connecting with ${activeLang === 'EN' ? division.coordinator : division.coordinatorMr}...`)}
                  className="mt-8 text-xs font-bold text-[#001847] hover:text-[#fc820c] transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
                >
                  <span>{activeLang === 'EN' ? 'View Details' : 'तपशील पहा'}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-left">
          
          <div className="text-center mb-16">
            <h2 className="font-sans font-black text-3xl text-[#001847]">
              {activeLang === 'EN' ? 'Frequently Asked Questions' : 'नेहमी विचारले जाणारे प्रश्न'}
            </h2>
            <p className="text-slate-500 font-sans text-sm mt-3 font-light">
              {activeLang === 'EN' ? 'Common queries from our student community.' : 'विद्यार्थी वर्गाकडून सामान्यतः विचारले जाणारे काही महत्त्वाचे प्रश्न.'}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 cursor-pointer hover:bg-slate-50/50 transition-colors text-left focus:outline-none"
                  >
                    <span className="font-sans font-extrabold text-[#001847] pr-4">
                      {activeLang === 'EN' ? faq.q : faq.qMr}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#fc820c]' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100"
                      >
                        <div className="p-6 text-[#121c2a]/80 font-sans text-xs sm:text-sm leading-relaxed font-light bg-slate-50/40">
                          {activeLang === 'EN' ? faq.a : faq.aMr}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Social Hub */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-400 mb-10">
            {activeLang === 'EN' ? 'CONNECT WITH US ON SOCIAL MEDIA' : 'सोशल मीडियावर आमच्याशी जोडले जा'}
          </h3>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Facebook className="h-6 w-6 fill-white" />
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">Facebook</span>
            </a>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Instagram className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-pink-600 transition-colors">Instagram</span>
            </a>

            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <span className="font-sans font-black text-lg text-white">X</span>
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-black transition-colors">X / Twitter</span>
            </a>

            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Youtube className="h-6 w-6 fill-white" />
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-red-600 transition-colors">YouTube</span>
            </a>

            <a 
              href="https://telegram.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Send className="h-5 w-5 text-white mr-0.5 mt-0.5" />
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-sky-600 transition-colors">Telegram</span>
            </a>
          </div>

        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-[#001847] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fc820c]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#001847]/40 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-white leading-tight">
                {activeLang === 'EN' 
                  ? "Let's Build a Better Student Community Together." 
                  : "चला एकत्र येऊन एक आदर्श विद्यार्थी समाज घडूया."}
              </h2>
              <p className="text-white/80 font-sans text-base max-w-xl mx-auto font-light leading-relaxed">
                {activeLang === 'EN' 
                  ? 'Be the change you want to see in your campus. Join the movement that empowers voices.'
                  : 'आपल्या महाविद्यालयीन परिसरात बदल घडवून आणण्यासाठी अभाविप देवगिरीच्या या महाचळवळीत सामील व्हा.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={onJoinClick}
                  className="bg-[#fc820c] hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Join ABVP' : 'सामील व्हा'}
                </button>
                <button 
                  onClick={() => alert(activeLang === 'EN' ? 'Redirecting to initiatives...' : 'उपक्रम आणि कार्यक्रम पानावर नेत आहे...')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-10 py-4 rounded-xl font-extrabold text-sm transition-all cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Explore Activities' : 'आमचे उपक्रम पहा'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
