import { useState, FormEvent } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Send, ArrowUp } from 'lucide-react';

interface FooterProps {
  activeLang: 'EN' | 'MR';
  setCurrentPage?: (page: 'home' | 'about' | 'organization' | 'activities' | 'directory' | 'media' | 'contact' | 'join' | 'admin') => void;
}

export default function Footer({ activeLang, setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: 'home' | 'about' | 'organization' | 'activities' | 'directory' | 'media' | 'contact' | 'join' | 'admin') => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    scrollToTop();
  };

  return (
    <footer className="bg-[#111827] text-[#D1D5DB] border-t border-white/5 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-6 flex flex-col items-start text-left">
          <div className="flex items-center gap-3">
            <img 
              alt="ABVP Logo" 
              className="h-11 w-11 object-contain bg-white rounded-full p-0.5 shadow relative z-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvF4dp_PhEl06dO4CR4-I6MPo9sUCOikUOF7EyGR1MCV_0Vi0e38VxY6YzVk8S2egjGluPMw0DbdAKrpe5VIkmNHi8X9Ch2QN4GOD52DU5FKA7ZpGRCiG887tGpe9E2jJSaMwALV84rwFpI6D-h92bsnU1yGTkeZoUxELVmFcdHBUy1aynLPG3cK1_lfXenBioC_GnmOgWcBOgjo7915yDV9p30jFNguNhh4ghre8M6UDNkie_ZfQzblZCNKX6PEdWeOErBkWp4ZVm"
            />
            <span className="font-sans font-extrabold text-xl text-white tracking-wider">
              ABVP <span className="text-orange-400">{activeLang === 'EN' ? 'Deogiri' : 'देवगिरी'}</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            {activeLang === 'EN' 
              ? 'Dedicated to national reconstruction through students. Empowering youth with Indian values and global competence since 1949.'
              : 'विद्यार्थ्यांच्या माध्यमातून राष्ट्र उभारणीसाठी समर्पित. १९४९ पासून भारतीय मूल्ये आणि जागतिक सक्षमतेने तरुणांचे सबलीकरण करत आहोत.'}
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/abvp.org/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center text-slate-400">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://x.com/ABVPVoice" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center text-slate-400">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/abvpvoice/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center text-slate-400">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.youtube.com/user/abvpvoice" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center text-slate-400">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="text-left">
          <h4 className="font-sans font-extrabold text-white text-base tracking-wider uppercase mb-6">
            {activeLang === 'EN' ? 'Quick Links' : 'महत्वाच्या लिंक्स'}
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <button 
                onClick={() => navigateTo('home')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'Home' : 'मुख्यपृष्ठ'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('about')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'About Us' : 'आमच्याबद्दल'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('organization')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'Organization' : 'संघटन'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('activities')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'Activities' : 'उपक्रम व मोहिमा'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('directory')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none font-semibold text-[#fc820c] hover:text-orange-400"
              >
                {activeLang === 'EN' ? 'Educational Directory' : 'शैक्षणिक निर्देशिका'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('media')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none font-semibold text-[#fc820c] hover:text-orange-400"
              >
                {activeLang === 'EN' ? 'Media Center' : 'माध्यम केंद्र'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('contact')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'Contact Us' : 'संपर्क साधा'}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('join')}
                className="text-orange-400 hover:text-[#fc820c] font-bold hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'Join ABVP' : 'अभाविपमध्ये सामील व्हा'}
              </button>
            </li>
          </ul>
        </div>

        {/* Digital Portal Column */}
        <div className="text-left">
          <h4 className="font-sans font-extrabold text-white text-base tracking-wider uppercase mb-6">
            {activeLang === 'EN' ? 'Digital Portal' : 'डिजिटल पोर्टल'}
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <button 
                onClick={() => navigateTo('admin')}
                className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {activeLang === 'EN' ? 'Admin Access Portal' : 'अ‍ॅडमिन लॉगिन कन्सोल'}
              </button>
            </li>
            <li>
              <a href="#privacy" className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors">
                {activeLang === 'EN' ? 'Privacy Policy' : 'गोपनीयता धोरण'}
              </a>
            </li>
            <li>
              <a href="#terms" className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors">
                {activeLang === 'EN' ? 'Terms of Service' : 'सेवा अटी'}
              </a>
            </li>
            <li>
              <a href="#media" className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors">
                {activeLang === 'EN' ? 'Gallery' : 'छायाचित्रे'}
              </a>
            </li>
            <li>
              <a href="#contact" className="text-slate-400 hover:text-white hover:underline hover:decoration-orange-500 transition-colors">
                {activeLang === 'EN' ? 'Contact Us' : 'संपर्क साधा'}
              </a>
            </li>
            <li>
              <a href="#newsletter" className="text-orange-400 font-bold hover:text-white transition-colors">
                {activeLang === 'EN' ? 'Newsletter Registration' : 'वृत्तपत्र नोंदणी'}
              </a>
            </li>
          </ul>
        </div>

        {/* Stay Updated Column */}
        <div className="text-left">
          <h4 className="font-sans font-extrabold text-white text-base tracking-wider uppercase mb-6">
            {activeLang === 'EN' ? 'Stay Updated' : 'माहिती मिळवत राहा'}
          </h4>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed font-light">
            {activeLang === 'EN' 
              ? 'Subscribe to get latest updates on events, policy resources, and youth activities.'
              : 'कार्यक्रम, धोरणात्मक संसाधने आणि युवा उपक्रमांवरील नवीनतम अपडेट्स मिळवण्यासाठी नोंदणी करा.'}
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
            <input 
              type="email" 
              placeholder={activeLang === 'EN' ? 'Email Address' : 'ईमेल पत्ता'} 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full"
            />
            <button 
              type="submit"
              className="bg-[#fc820c] hover:bg-orange-500 text-white p-3 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center cursor-pointer shrink-0"
              title="Subscribe"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-emerald-400 text-xs mt-2 font-medium">
              {activeLang === 'EN' ? 'Successfully subscribed to our newsletter!' : 'आमच्या वृत्तपत्राचे सदस्यत्व यशस्वीरित्या घेतले!'}
            </p>
          )}
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-white/5 py-8 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>
            {activeLang === 'EN' ? '© 2024 ABVP Deogiri. All Rights Reserved.' : '© २०२४ अभाविप देवगिरी. सर्व हक्क राखीव.'}
          </p>
          <div className="flex items-center gap-4">
            <p>
              {activeLang === 'EN' 
                ? 'Designed for Digital Sovereignty & Academic Excellence.' 
                : 'डिजिटल सार्वभौमत्व आणि शैक्षणिक उत्कृष्टतेसाठी डिझाइन केलेले.'}
            </p>
            <button 
              onClick={scrollToTop}
              className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-1.5 rounded-md transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
