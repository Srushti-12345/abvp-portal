import { useState, useEffect } from 'react';
import { Search, Menu, X, Mail, Phone, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onJoinClick?: () => void;
  onAdminLoginClick?: () => void;
  activeLang: 'EN' | 'MR';
  setActiveLang: (lang: 'EN' | 'MR') => void;
  currentPage: 'home' | 'about' | 'organization' | 'activities' | 'directory' | 'media' | 'contact' | 'join' | 'admin';
  setCurrentPage: (page: 'home' | 'about' | 'organization' | 'activities' | 'directory' | 'media' | 'contact' | 'join' | 'admin') => void;
}

export default function Navbar({ 
  onJoinClick, 
  onAdminLoginClick, 
  activeLang, 
  setActiveLang,
  currentPage,
  setCurrentPage
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileExpanded(null);
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { 
      label: activeLang === 'EN' ? 'Home' : 'मुख्यपृष्ठ', 
      pageId: 'home' as const 
    },
    { 
      label: activeLang === 'EN' ? 'About Us' : 'अभाविप बद्दल', 
      pageId: 'about' as const,
      subLinks: activeLang === 'EN' ? [
        { label: 'Overview', scrollTarget: 'overview-section' },
        { label: 'Vision & Mission', scrollTarget: 'vision-mission-section' },
        { label: 'Core Values', scrollTarget: 'core-values-section' },
        { label: 'Historical Journey', scrollTarget: 'timeline-section' },
        { label: 'Key Objectives', scrollTarget: 'objectives-section' },
        { label: 'FAQs', scrollTarget: 'faq-section' }
      ] : [
        { label: 'आढावा', scrollTarget: 'overview-section' },
        { label: 'ध्येय आणि धोरण', scrollTarget: 'vision-mission-section' },
        { label: 'जीवनमूल्ये', scrollTarget: 'core-values-section' },
        { label: 'अभाविप प्रवास', scrollTarget: 'timeline-section' },
        { label: 'आमचे उद्देश', scrollTarget: 'objectives-section' },
        { label: 'वारंवार विचारले जाणारे प्रश्न', scrollTarget: 'faq-section' }
      ]
    },
    { 
      label: activeLang === 'EN' ? 'Organization' : 'संघटन', 
      pageId: 'organization' as const,
      subLinks: activeLang === 'EN' ? [
        { label: 'Regional Hierarchy', scrollTarget: 'hierarchy-section', tabTarget: 'regional' },
        { label: 'Division Structure', scrollTarget: 'hierarchy-section', tabTarget: 'division' },
        { label: 'District Committees', scrollTarget: 'hierarchy-section', tabTarget: 'district' },
        { label: 'Specialized Wings', scrollTarget: 'wings-section' },
        { label: 'Executive Leadership', scrollTarget: 'executive-section' }
      ] : [
        { label: 'प्रादेशिक रचना', scrollTarget: 'hierarchy-section', tabTarget: 'regional' },
        { label: 'विभाग रचना', scrollTarget: 'hierarchy-section', tabTarget: 'division' },
        { label: 'जिल्हा समित्या', scrollTarget: 'hierarchy-section', tabTarget: 'district' },
        { label: 'विशेष कार्य मंच', scrollTarget: 'wings-section' },
        { label: 'कार्यकारिणी नेतृत्व', scrollTarget: 'executive-section' }
      ]
    },
    { 
      label: activeLang === 'EN' ? 'Activities' : 'उपक्रम', 
      pageId: 'activities' as const,
      subLinks: activeLang === 'EN' ? [
        { label: 'Flagship Programs', scrollTarget: 'flagship-section' },
        { label: 'Think India Initiative', scrollTarget: 'flagship-section', tabTarget: 'think-india' },
        { label: 'Students For Development', scrollTarget: 'specialized-wings', tabTarget: 'sfd' },
        { label: 'Students For Seva', scrollTarget: 'specialized-wings', tabTarget: 'sfs' },
        { label: 'All Forums & Wings', scrollTarget: 'specialized-wings' }
      ] : [
        { label: 'मुख्य उपक्रम', scrollTarget: 'flagship-section' },
        { label: 'थिंक इंडिया मंच', scrollTarget: 'flagship-section', tabTarget: 'think-india' },
        { label: 'एस.एफ.डी. उपक्रम', scrollTarget: 'specialized-wings', tabTarget: 'sfd' },
        { label: 'एस.एफ.एस. उपक्रम', scrollTarget: 'specialized-wings', tabTarget: 'sfs' },
        { label: 'सर्व मंच आणि शाखा', scrollTarget: 'specialized-wings' }
      ]
    },
    { 
      label: activeLang === 'EN' ? 'Directory' : 'निर्देशिका', 
      pageId: 'directory' as const,
      subLinks: activeLang === 'EN' ? [
        { label: 'Universities', scrollTarget: 'search-filter-section', tabTarget: 'Universities' },
        { label: 'Colleges', scrollTarget: 'search-filter-section', tabTarget: 'Colleges' },
        { label: 'Student Hostels', scrollTarget: 'search-filter-section', tabTarget: 'Hostels' },
        { label: 'Educational Laws', scrollTarget: 'laws-section', tabTarget: 'Laws' }
      ] : [
        { label: 'विद्यार्थी विद्यापीठे', scrollTarget: 'search-filter-section', tabTarget: 'Universities' },
        { label: 'महाविद्यालये', scrollTarget: 'search-filter-section', tabTarget: 'Colleges' },
        { label: 'वसतिगृहे', scrollTarget: 'search-filter-section', tabTarget: 'Hostels' },
        { label: 'शैक्षणिक कायदे', scrollTarget: 'laws-section', tabTarget: 'Laws' }
      ]
    },
    { 
      label: activeLang === 'EN' ? 'Media' : 'माध्यम', 
      pageId: 'media' as const,
      subLinks: activeLang === 'EN' ? [
        { label: 'Featured Events', scrollTarget: 'media-explore', tabTarget: 'event' },
        { label: 'Press & News', scrollTarget: 'media-explore', tabTarget: 'news' },
        { label: 'Publications', scrollTarget: 'media-explore', tabTarget: 'document' },
        { label: 'Photo Gallery', scrollTarget: 'media-explore', tabTarget: 'gallery' }
      ] : [
        { label: 'मुख्य कार्यक्रम', scrollTarget: 'media-explore', tabTarget: 'event' },
        { label: 'बातम्या व प्रसिद्धी', scrollTarget: 'media-explore', tabTarget: 'news' },
        { label: 'प्रकाशने व मासिके', scrollTarget: 'media-explore', tabTarget: 'document' },
        { label: 'फोटो गॅलरी', scrollTarget: 'media-explore', tabTarget: 'gallery' }
      ]
    },
    { 
      label: activeLang === 'EN' ? 'Contact' : 'संपर्क', 
      pageId: 'contact' as const 
    }
  ];

  const handleSubLinkClick = (pageId: typeof currentPage, scrollTarget?: string, tabTarget?: string) => {
    if (scrollTarget) {
      localStorage.setItem('navScrollTarget', scrollTarget);
    } else {
      localStorage.removeItem('navScrollTarget');
    }
    
    if (tabTarget) {
      localStorage.setItem('navTabTarget', tabTarget);
    } else {
      localStorage.removeItem('navTabTarget');
    }

    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);

    window.dispatchEvent(new CustomEvent('navSectionChange', { 
      detail: { scrollTarget, tabTarget } 
    }));

    if (!scrollTarget) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setActiveDropdown(null);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="w-full bg-[#00133a] text-white py-2 px-6 border-b border-white/5 text-[11px] hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 text-white/80 hover:text-orange-400 transition-colors">
              <Mail className="h-3.5 w-3.5 text-orange-400" />
              <a href="mailto:info@abvpdeogiri.org">info@abvpdeogiri.org</a>
            </span>
            <span className="flex items-center gap-1.5 text-white/80 hover:text-orange-400 transition-colors">
              <Phone className="h-3.5 w-3.5 text-orange-400" />
              <a href="tel:+912402345678">+91 240 2345678</a>
            </span>
          </div>
          
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <Globe className="h-3.5 w-3.5 text-orange-400" />
              <button
                onClick={() => setActiveLang('EN')}
                className={`transition-colors font-bold cursor-pointer ${activeLang === 'EN' ? 'text-orange-400' : 'text-white/60 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setActiveLang('MR')}
                className={`transition-colors cursor-pointer ${activeLang === 'MR' ? 'text-orange-400 font-bold' : 'text-white/60 hover:text-white'}`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav id="navbar" className="w-full bg-[#001847] shadow-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex justify-between items-center transition-all duration-300">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveDropdown(null);
              }}
              className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full scale-105 group-hover:scale-110 transition-transform duration-300" />
                <img 
                  alt="ABVP Deogiri Logo" 
                  className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain bg-white rounded-full p-1 relative z-10 shadow transition-all duration-300" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvF4dp_PhEl06dO4CR4-I6MPo9sUCOikUOF7EyGR1MCV_0Vi0e38VxY6YzVk8S2egjGluPMw0DbdAKrpe5VIkmNHi8X9Ch2QN4GOD52DU5FKA7ZpGRCiG887tGpe9E2jJSaMwALV84rwFpI6D-h92bsnU1yGTkeZoUxELVmFcdHBUy1aynLPG3cK1_lfXenBioC_GnmOgWcBOgjo7915yDV9p30jFNguNhh4ghre8M6UDNkie_ZfQzblZCNKX6PEdWeOErBkWp4ZVm"
                />
              </div>
              <span className="font-sans font-black text-lg sm:text-xl lg:text-2xl text-white tracking-tight uppercase transition-all duration-300">
                ABVP <span className="text-[#fc820c]">Deogiri</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links with flyout menus */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-8 h-full transition-all duration-300">
            {navLinks.map((link, idx) => {
              const hasDropdown = !!link.subLinks;
              const isSelected = currentPage === link.pageId;

              return (
                <div 
                  key={idx} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.pageId)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <button 
                    onClick={() => {
                      if (!hasDropdown) {
                        setCurrentPage(link.pageId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`py-2 text-[13px] xl:text-sm font-extrabold transition-all duration-200 focus:outline-none cursor-pointer relative flex items-center gap-1 ${
                      isSelected ? 'text-orange-400' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activeDropdown === link.pageId ? 'rotate-180 text-orange-400' : 'text-white/40'}`} />
                    )}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Desktop Dropdown Flyout */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === link.pageId && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-16 lg:top-20 w-60 bg-[#00133a] border border-white/10 rounded-2xl shadow-2xl py-3 overflow-hidden z-50 text-left transition-all duration-300"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#fc820c]"></div>
                        {link.subLinks?.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSubLinkClick(link.pageId, sub.scrollTarget, (sub as any).tabTarget)}
                            className="w-full text-left px-5 py-2.5 text-xs font-bold text-white/80 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fc820c]/40 group-hover:bg-[#fc820c]"></span>
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 transition-all duration-300">
            {/* Search Input (Desktop) */}
            <div className="hidden xl:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-[#fc820c]/40 transition-all">
              <Search className="h-3.5 w-3.5 text-white/50" />
              <input 
                type="text" 
                placeholder={activeLang === 'EN' ? 'Search portal...' : 'शोधा...'} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-xs text-white placeholder-white/40 w-24 focus:w-36 transition-all focus:outline-none ml-2"
              />
            </div>

            {/* Buttons */}
            <button 
              id="join-abvp-btn"
              onClick={onJoinClick}
              className="bg-[#fc820c] hover:bg-[#d96a00] text-white text-xs xl:text-sm font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-md hover:shadow-orange-500/10 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              {activeLang === 'EN' ? 'Join ABVP' : 'सामील व्हा'}
            </button>
            
            <button 
              id="admin-login-btn"
              onClick={onAdminLoginClick}
              className="hidden md:block text-white/80 text-xs font-bold px-3 py-2 xl:px-4 hover:bg-white/5 rounded-xl transition-colors whitespace-nowrap"
            >
              {activeLang === 'EN' ? 'Admin Login' : 'अ‍ॅडमिन'}
            </button>

            {/* Hamburger menu for small screens */}
            <button 
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#001847] border-b border-white/10 text-white overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              
              {/* Mobile Search */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <Search className="h-4 w-4 text-white/50" />
                <input 
                  type="text" 
                  placeholder={activeLang === 'EN' ? 'Search Portal...' : 'पोर्टल शोधा...'} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/40 w-full focus:outline-none ml-2"
                />
              </div>

              {/* Navigation Links with mobile expandable submenus */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link, idx) => {
                  const hasDropdown = !!link.subLinks;
                  const isExpanded = mobileExpanded === link.pageId;
                  const isSelected = currentPage === link.pageId;

                  return (
                    <div key={idx} className="border-b border-white/5 last:border-0 py-1 flex flex-col">
                      <div className="flex justify-between items-center w-full">
                        <button 
                          onClick={() => {
                            if (!hasDropdown) {
                              setCurrentPage(link.pageId);
                              setIsMobileMenuOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                              setMobileExpanded(isExpanded ? null : link.pageId);
                            }
                          }}
                          className={`text-left py-2.5 text-sm font-extrabold flex-grow cursor-pointer ${
                            isSelected ? 'text-orange-400' : 'text-white/80'
                          }`}
                        >
                          {link.label}
                        </button>
                        {hasDropdown && (
                          <button 
                            onClick={() => setMobileExpanded(isExpanded ? null : link.pageId)}
                            className="p-2.5 text-white/40 hover:text-white"
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-orange-400' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Expandable sub-items on mobile */}
                      {hasDropdown && isExpanded && (
                        <div className="pl-4 pb-2.5 flex flex-col gap-2.5 bg-white/5 rounded-xl p-3 mt-1 border border-white/5 text-left">
                          {link.subLinks?.map((sub, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSubLinkClick(link.pageId, sub.scrollTarget, (sub as any).tabTarget)}
                              className="text-left py-1 text-xs font-bold text-white/70 hover:text-white flex items-center gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#fc820c]"></span>
                              <span>{sub.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Utilities */}
              <div className="flex justify-end items-center pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveLang('EN')}
                    className={`text-xs font-bold cursor-pointer ${activeLang === 'EN' ? 'text-orange-400' : 'text-white/60'}`}
                  >
                    EN
                  </button>
                  <span className="text-white/20 text-xs">|</span>
                  <button 
                    onClick={() => setActiveLang('MR')}
                    className={`text-xs font-bold cursor-pointer ${activeLang === 'MR' ? 'text-orange-400' : 'text-white/60'}`}
                  >
                    मराठी
                  </button>
                </div>
              </div>

              {/* Mobile Admin Login */}
              <button 
                onClick={() => {
                  onAdminLoginClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center text-xs py-3 hover:bg-white/5 rounded-xl transition-colors border border-white/10 font-extrabold cursor-pointer text-white/80 hover:text-white"
              >
                {activeLang === 'EN' ? 'Admin Login' : 'अ‍ॅडमिन लॉगिन'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
