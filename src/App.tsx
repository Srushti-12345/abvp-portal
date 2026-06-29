import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Lock, User, Sparkles, Building, 
  MapPin, Phone, Mail, Award, Calendar, ChevronRight 
} from 'lucide-react';

import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import HeroSection from './components/HeroSection';
import StatisticsSection from './components/StatisticsSection';
import AboutPreview from './components/AboutPreview';
import OrganizationalFabric from './components/OrganizationalFabric';
import ExecutiveCommittee from './components/ExecutiveCommittee';
import ActivitiesPreview from './components/ActivitiesPreview';
import UpcomingEvents from './components/UpcomingEvents';
import MediaPreview from './components/MediaPreview';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Dynamic multi-page subcomponents
import AboutPage from './components/AboutPage';
import OrganizationPage from './components/OrganizationPage';
import ActivitiesPage from './components/ActivitiesPage';
import DirectoryPage from './components/DirectoryPage';
import MediaPage from './components/MediaPage';
import ContactPage from './components/ContactPage';
import JoinPage from './components/JoinPage';
import AdminPage from './components/AdminPage';

import { 
  carouselSlides, 
  statItems, 
  committeeMembers, 
  initiativeItems, 
  eventItems, 
  newsItems, 
  announcementItems 
} from './placeholderData';
import { EventItem } from './types';

export default function App() {
  // Navigation & Page routing state
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'organization' | 'activities' | 'directory' | 'media' | 'contact' | 'join' | 'admin'>('home');

  // Language state
  const [activeLang, setActiveLang] = useState<'EN' | 'MR'>('EN');

  // Modal states
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Form states
  const [joinForm, setJoinForm] = useState({
    name: '', email: '', phone: '', college: '', district: 'Aurangabad', stream: 'Engineering'
  });
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const [eventForm, setEventForm] = useState({ name: '', email: '', college: '' });
  const [eventSubmitted, setEventSubmitted] = useState(false);

  const handleJoinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (joinForm.name && joinForm.email && joinForm.phone) {
      setJoinSubmitted(true);
      setTimeout(() => {
        setIsJoinModalOpen(false);
        setJoinSubmitted(false);
        setJoinForm({ name: '', email: '', phone: '', college: '', district: 'Aurangabad', stream: 'Engineering' });
      }, 3000);
    }
  };

  const handleAdminSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (adminForm.username && adminForm.password) {
      setAdminLoggedIn(true);
      setTimeout(() => {
        setIsAdminModalOpen(false);
        setAdminLoggedIn(false);
        setAdminForm({ username: '', password: '' });
      }, 2500);
    }
  };

  const handleEventSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (eventForm.name && eventForm.email) {
      setEventSubmitted(true);
      setTimeout(() => {
        setSelectedEvent(null);
        setEventSubmitted(false);
        setEventForm({ name: '', email: '', college: '' });
      }, 3000);
    }
  };

  const handleHeroNavigation = (link: string) => {
    if (link === '#join') {
      setCurrentPage('join');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === '#activities' || link === '#initiatives') {
      setCurrentPage('activities');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (link === '#initiatives') {
        setTimeout(() => {
          const element = document.getElementById('flagship-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } else if (link === '#about') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === '#portal') {
      setCurrentPage('directory');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === '#contact') {
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* 1. Official Announcements Marquee Ticker */}
      <AnnouncementBar announcements={announcementItems} activeLang={activeLang} />

      {/* 2. Primary Navigation Bar */}
      <Navbar 
        onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onAdminLoginClick={() => { setCurrentPage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex-grow flex flex-col"
        >
          {currentPage === 'home' && (
            <>
              {/* 3. Hero Carousel (Prepared for dynamic dashboard input) */}
              <HeroSection slides={carouselSlides} activeLang={activeLang} onNavigate={handleHeroNavigation} />

              {/* 4. Statistics Ribbon (Floating overlap) */}
              <StatisticsSection stats={statItems} activeLang={activeLang} />

              {/* 5. Core About Preview */}
              <AboutPreview activeLang={activeLang} />

              {/* 6. Dynamic Hierarchy Fabric */}
              <OrganizationalFabric activeLang={activeLang} />

              {/* 7. Executive Council */}
              <ExecutiveCommittee 
                members={committeeMembers} 
                onViewAllClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                activeLang={activeLang}
              />

              {/* 8. Key Initiatives & Activities + Educational Excellence Portal (Bento Grid) */}
              <ActivitiesPreview 
                initiatives={initiativeItems}
                onAccessPortalClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onDownloadResourcesClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                activeLang={activeLang}
              />

              {/* 9. Major Upcoming Events */}
              <UpcomingEvents 
                events={eventItems}
                onRegisterClick={(evt) => setSelectedEvent(evt)}
                activeLang={activeLang}
              />

              {/* 10. News & Gallery Media Block */}
              <MediaPreview 
                news={newsItems}
                onViewAllClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                activeLang={activeLang}
              />

              {/* 11. Testimonials Quotes */}
              <Testimonials activeLang={activeLang} />

              {/* 12. Persistent Call to Action Banner */}
              <CallToAction 
                onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onSupportClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                activeLang={activeLang}
              />
            </>
          )}

          {currentPage === 'about' && (
            <AboutPage 
              activeLang={activeLang} 
              onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              onExploreOrgClick={() => { setCurrentPage('organization'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          )}

          {currentPage === 'organization' && (
            <OrganizationPage 
              activeLang={activeLang} 
              onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}

          {currentPage === 'activities' && (
            <ActivitiesPage 
              activeLang={activeLang} 
              onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}

          {currentPage === 'directory' && (
            <DirectoryPage 
              activeLang={activeLang} 
              onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}

          {currentPage === 'media' && (
            <MediaPage 
              activeLang={activeLang} 
              onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage 
              activeLang={activeLang} 
              onJoinClick={() => { setCurrentPage('join'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}

          {currentPage === 'join' && (
            <JoinPage 
              activeLang={activeLang} 
              onBackToHome={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}

          {currentPage === 'admin' && (
            <AdminPage 
              activeLang={activeLang} 
              onBackToHome={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* 13. High-integrity Footer */}
      <Footer activeLang={activeLang} setCurrentPage={setCurrentPage} />


      {/* --- REUSABLE INTERACTIVE MODALS --- */}

      {/* MODAL 1: Join ABVP Membership Form */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute inset-0 bg-[#001847]/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative z-10 border border-slate-100"
            >
              {/* Top color strap */}
              <div className="h-2 bg-gradient-to-r from-[#fc820c] to-[#001847]" />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-sans font-extrabold text-2xl text-[#001847] flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-[#fc820c]" /> {activeLang === 'EN' ? 'Join ABVP Deogiri' : 'अभाविप देवगिरी मध्ये सामील व्हा'}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      {activeLang === 'EN' ? 'Submit membership form to become a student leader.' : 'विद्यार्थी नेता बनण्यासाठी सदस्यत्व अर्ज सादर करा.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsJoinModalOpen(false)}
                    className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {joinSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                      <Check className="h-8 w-8 stroke-[3px]" />
                    </div>
                    <h4 className="font-sans font-extrabold text-xl text-[#001847] mb-2">
                      {activeLang === 'EN' ? 'Application Received!' : 'अर्ज यशस्वीरित्या प्राप्त!'}
                    </h4>
                    <p className="text-slate-500 text-sm max-w-xs">
                      {activeLang === 'EN' 
                        ? 'Thank you for taking initiative. A local council representative from your college/district will contact you shortly.' 
                        : 'पुढाकार घेतल्याबद्दल धन्यवाद. तुमच्या महाविद्यालय/जिल्ह्यातील स्थानिक परिषद प्रतिनिधी लवकरच संपर्क साधतील.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'Full Name' : 'पूर्ण नाव'}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={activeLang === 'EN' ? 'e.g. Rahul Sharma' : 'उदा. राहुल शर्मा'}
                        value={joinForm.name}
                        onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                          {activeLang === 'EN' ? 'Email Address' : 'ईमेल पत्ता'}
                        </label>
                        <input 
                          type="email" 
                          required
                          placeholder="rahul@example.com"
                          value={joinForm.email}
                          onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                          {activeLang === 'EN' ? 'Phone Number' : 'फोन नंबर'}
                        </label>
                        <input 
                          type="tel" 
                          required
                          placeholder="10-digit mobile"
                          value={joinForm.phone}
                          onChange={(e) => setJoinForm({...joinForm, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'College Name' : 'महाविद्यालयाचे नाव'}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={activeLang === 'EN' ? 'e.g. Government College of Engineering' : 'उदा. शासकीय अभियांत्रिकी महाविद्यालय'}
                        value={joinForm.college}
                        onChange={(e) => setJoinForm({...joinForm, college: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                          {activeLang === 'EN' ? 'District / Nagar' : 'जिल्हा / नगर'}
                        </label>
                        <select 
                          value={joinForm.district}
                          onChange={(e) => setJoinForm({...joinForm, district: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] transition-all"
                        >
                          <option value="Aurangabad">
                            {activeLang === 'EN' ? 'Aurangabad (Chhatrapati Sambhajinagar)' : 'औरंगाबाद (छत्रपती संभाजीनगर)'}
                          </option>
                          <option value="Jalna">{activeLang === 'EN' ? 'Jalna' : 'जालना'}</option>
                          <option value="Beed">{activeLang === 'EN' ? 'Beed' : 'बीड'}</option>
                          <option value="Nanded">{activeLang === 'EN' ? 'Nanded' : 'नांदेड'}</option>
                          <option value="Latur">{activeLang === 'EN' ? 'Latur' : 'लातूर'}</option>
                          <option value="Osmanabad">
                            {activeLang === 'EN' ? 'Osmanabad (Dharashiv)' : 'उस्मानाबाद (धाराशिव)'}
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                          {activeLang === 'EN' ? 'Academic Stream' : 'शैक्षणिक शाखा'}
                        </label>
                        <select 
                          value={joinForm.stream}
                          onChange={(e) => setJoinForm({...joinForm, stream: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] transition-all"
                        >
                          <option value="Engineering">
                            {activeLang === 'EN' ? 'Engineering & IT' : 'अभियांत्रिकी आणि तंत्रज्ञान'}
                          </option>
                          <option value="Arts">
                            {activeLang === 'EN' ? 'Humanities & Arts' : 'मानव्यशास्त्र आणि कला'}
                          </option>
                          <option value="Science">
                            {activeLang === 'EN' ? 'Pure Sciences & Agri' : 'शुद्ध विज्ञान आणि कृषी'}
                          </option>
                          <option value="Commerce">
                            {activeLang === 'EN' ? 'Commerce & Management' : 'वाणिज्य आणि व्यवस्थापन'}
                          </option>
                          <option value="Medical">
                            {activeLang === 'EN' ? 'Medical & AYUSH' : 'वैद्यकीय आणि आयुष'}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-[#fc820c] hover:bg-[#d96a00] text-white font-extrabold text-base py-3.5 rounded-xl shadow-lg shadow-orange-500/10 active:scale-98 transition-all cursor-pointer"
                      >
                        {activeLang === 'EN' ? 'Submit Membership Application' : 'सदस्यत्व अर्ज सादर करा'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Admin Login Panel Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminModalOpen(false)}
              className="absolute inset-0 bg-[#001847]/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative z-10 border border-slate-100"
            >
              <div className="h-2 bg-[#001847]" />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-sans font-extrabold text-2xl text-[#001847] flex items-center gap-2">
                      <Lock className="h-5 w-5 text-[#fc820c]" /> {activeLang === 'EN' ? 'Admin Portal' : 'प्रशासकीय पोर्टल'}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      {activeLang === 'EN' ? 'Restricted area. Authorized personnel only.' : 'प्रतिबंधित क्षेत्र. केवळ अधिकृत व्यक्तींसाठी.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsAdminModalOpen(false)}
                    className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {adminLoggedIn ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 stroke-[3px]" />
                    </div>
                    <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                      {activeLang === 'EN' ? 'Authenticated!' : 'प्रमाणित!'}
                    </h4>
                    <p className="text-slate-500 text-xs max-w-xs">
                      {activeLang === 'EN' 
                        ? 'Session token provisioned. Accessing administration dashboard...' 
                        : 'सत्र टोकन मंजूर केले. प्रशासकीय डॅशबोर्ड उघडत आहे...'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleAdminSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'User Identity / Email' : 'वापरकर्ता आयडी / ईमेल'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          placeholder="admin.deogiri"
                          value={adminForm.username}
                          onChange={(e) => setAdminForm({...adminForm, username: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#001847] rounded-xl pl-10 pr-4 py-3 text-sm text-[#001847] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'Secured Password' : 'पासवर्ड'}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={adminForm.password}
                          onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#001847] rounded-xl pl-10 pr-4 py-3 text-sm text-[#001847] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-[#001847] hover:bg-[#0b2c6b] text-white font-extrabold text-base py-3.5 rounded-xl shadow-lg active:scale-98 transition-all cursor-pointer"
                      >
                        {activeLang === 'EN' ? 'Log In securely' : 'सुरक्षितपणे लॉग इन करा'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Event Registration Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-[#001847]/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative z-10 border border-slate-100"
            >
              <div className="h-2 bg-[#fc820c]" />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[#fc820c] text-[10px] font-black uppercase tracking-widest block mb-1">
                      {activeLang === 'EN' ? 'Event Registration' : 'कार्यक्रम नोंदणी'}
                    </span>
                    <h3 className="font-sans font-extrabold text-xl text-[#001847] line-clamp-2">
                      {activeLang === 'EN' ? selectedEvent.title : (selectedEvent.titleMr || selectedEvent.title)}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Event mini metadata box */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-xs text-slate-500 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#fc820c]" />
                    <span className="font-bold text-[#001847]">
                      {activeLang === 'EN' ? 'Date:' : 'दिनांक:'}
                    </span> {selectedEvent.date} {activeLang === 'EN' ? selectedEvent.month : (selectedEvent.monthMr || selectedEvent.month)} {selectedEvent.year}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#fc820c]" />
                    <span className="font-bold text-[#001847]">
                      {activeLang === 'EN' ? 'Location:' : 'ठिकाण:'}
                    </span> {activeLang === 'EN' ? selectedEvent.location : (selectedEvent.locationMr || selectedEvent.location)}
                  </div>
                </div>

                {eventSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-10 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 stroke-[3px]" />
                    </div>
                    <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                      {activeLang === 'EN' ? 'Successfully Registered!' : 'नोंदणी यशस्वी!'}
                    </h4>
                    <p className="text-slate-500 text-xs max-w-xs">
                      {activeLang === 'EN' 
                        ? 'We have sent your confirmation pass and details to your email address.' 
                        : 'आम्ही प्रवेश पास आणि तपशील तुमच्या ईमेल पत्त्यावर पाठवले आहेत.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEventSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'Your Name' : 'तुमचे नाव'}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={activeLang === 'EN' ? 'e.g. Priyanjali Gore' : 'उदा. प्रियांजली गोरे'}
                        value={eventForm.name}
                        onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'Email Address' : 'ईमेल पत्ता'}
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="priya@student.in"
                        value={eventForm.email}
                        onChange={(e) => setEventForm({...eventForm, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#001847] uppercase tracking-wider mb-1.5">
                        {activeLang === 'EN' ? 'College / Institution' : 'महाविद्यालय / संस्था'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={activeLang === 'EN' ? 'e.g. Deogiri College' : 'उदा. देवगिरी महाविद्यालय'}
                        value={eventForm.college}
                        onChange={(e) => setEventForm({...eventForm, college: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#fc820c] focus:ring-1 focus:ring-[#fc820c] rounded-xl px-4 py-3 text-sm text-[#001847] focus:outline-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-[#001847] hover:bg-[#0b2c6b] text-white font-extrabold text-base py-3.5 rounded-xl shadow-lg active:scale-98 transition-all cursor-pointer"
                      >
                        {activeLang === 'EN' ? 'Confirm Event Seat' : 'जागा निश्चित करा'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
