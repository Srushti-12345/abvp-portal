import React, { useState, FormEvent, useRef, KeyboardEvent, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Key, Smartphone, Award, LayoutDashboard, Star, AtSign, Eye, EyeOff,
  Network, MapPin, PieChart, Users, Wallet, Megaphone, UploadCloud, Info, CheckCircle2,
  X, Lock, ArrowRight, AlertCircle, RefreshCw
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';

interface AdminPageProps {
  activeLang: 'EN' | 'MR';
  onBackToHome?: () => void;
}

// Super Admin Login configuration
// Toggle SHOW_DEMO_BYPASS to false when deploying the system to actual users to hide the instant bypass button.
const SHOW_DEMO_BYPASS = true;

export default function AdminPage({ activeLang, onBackToHome }: AdminPageProps) {
  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Request credentials form states
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqDivision, setReqDivision] = useState('Sambhajinagar');
  const [reqDistrict, setReqDistrict] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Notification states
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  // Triggering alerts helper
  const triggerNotification = (type: 'success' | 'error', title: string, message: string) => {
    setNotification({ type, title, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // OTP changes
  const handleOtpChange = (value: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.substring(0, 1);
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Submit main login
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerNotification(
        'error',
        activeLang === 'EN' ? 'Fields Required' : 'माहिती आवश्यक',
        activeLang === 'EN' ? 'Please enter both email and password.' : 'कृपया ईमेल आणि पासवर्ड दोन्ही टाका.'
      );
      return;
    }
    
    // Simulate opening OTP modal
    setShowOtpModal(true);
    setOtpValues(['', '', '', '', '', '']);
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  // Confirm OTP
  const handleVerifyOtp = () => {
    const code = otpValues.join('');
    if (code.length < 6) {
      triggerNotification(
        'error',
        activeLang === 'EN' ? 'Invalid Code' : 'चुकीचा कोड',
        activeLang === 'EN' ? 'Please enter all 6 digits of the OTP code.' : 'कृपया ६ अंकी ओटीपी कोड पूर्ण टाका.'
      );
      return;
    }

    // Success simulation
    triggerNotification(
      'success',
      activeLang === 'EN' ? 'Authentication Successful' : 'प्रमाणिकरण यशस्वी',
      activeLang === 'EN' ? 'Welcome to ABVP Deogiri Digital Command Console!' : 'अभाविप देवगिरी डिजिटल कमांड कन्सोलमध्ये आपले स्वागत आहे!'
    );
    setShowOtpModal(false);
    setEmail('');
    setPassword('');
    setIsLoggedIn(true);
  };

  // Submit credentials request
  const handleRequestSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reqName || !reqEmail || !reqDistrict) {
      triggerNotification(
        'error',
        activeLang === 'EN' ? 'Incomplete Request' : 'अपूर्ण विनंती',
        activeLang === 'EN' ? 'Please fill in all the required request fields.' : 'कृपया सर्व आवश्यक रकाने भरा.'
      );
      return;
    }

    triggerNotification(
      'success',
      activeLang === 'EN' ? 'Request Submitted' : 'विनंती सबमिट केली',
      activeLang === 'EN' 
        ? 'Your administration access query is under verification by the State IT Cell.' 
        : 'आपल्या प्रशासक प्रवेशाची चौकशी राज्य आयटी सेलद्वारे पडताळणीत आहे.'
    );

    // Reset request form
    setReqName('');
    setReqEmail('');
    setReqDistrict('');
    setUploadedFile(null);
  };

  // File drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  if (isLoggedIn) {
    return <AdminDashboard activeLang={activeLang} onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="flex-grow bg-[#F8F9FA] text-[#121c2a] pt-20">
      
      {/* Notifications container */}
      <div className="fixed top-24 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-4 rounded-2xl border shadow-xl max-w-sm flex items-start gap-3 backdrop-blur-md pointer-events-auto ${
                notification.type === 'success' 
                  ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800' 
                  : 'bg-red-50/95 border-red-200 text-red-800'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-sans font-extrabold text-sm leading-tight">{notification.title}</p>
                <p className="font-sans text-xs opacity-90 mt-1 leading-relaxed">{notification.message}</p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="ml-auto text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Split-Screen Section */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row relative">
        
        {/* Left Panel: Branding & Illustration */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-16 lg:py-24 bg-gradient-to-br from-[#001847]/10 via-[#001847]/5 to-transparent border-r border-slate-100">
          <div className="max-w-xl mx-auto lg:mx-0 text-left space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#001847]/10 text-[#001847] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Shield className="h-3.5 w-3.5 text-[#fc820c]" />
              {activeLang === 'EN' ? 'Enterprise Command Center' : 'एंटरप्राइझ कमांड सेंटर'}
            </span>
            
            <div className="space-y-2">
              <h1 className="font-sans font-black text-3xl sm:text-5xl text-[#001847] tracking-tight leading-tight">
                {activeLang === 'EN' ? 'Digital Administration Portal' : 'डिजिटल प्रशासन पोर्टल'}
              </h1>
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#fc820c]">
                {activeLang === 'EN' ? 'Centralized Governance Control' : 'केंद्रीकृत शासन नियंत्रण'}
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-slate-500 leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'Empowering student leadership through centralized digital sovereignty. Securely manage organizational flows, memberships, and analytics.'
                : 'केंद्रीकृत डिजिटल सार्वभौमत्वाद्वारे विद्यार्थी नेतृत्वाला सक्षम करणे. संघटनात्मक प्रवाह, सदस्यत्वे आणि विश्लेषणाचे सुरक्षितपणे व्यवस्थापन करा.'}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-[#001847] p-3 rounded-xl text-white shrink-0">
                  <Shield className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-[#001847]">
                    {activeLang === 'EN' ? 'High Security' : 'उच्च सुरक्षा'}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">AES-256 Encryption</p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="bg-[#fc820c] p-3 rounded-xl text-white shrink-0">
                  <PieChart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-[#001847]">
                    {activeLang === 'EN' ? 'Real-time Data' : 'थेट डेटा प्रणाली'}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">Live Analytics Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Login Card Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50/50">
          <div className="bg-white w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 relative overflow-hidden text-left">
            
            {/* Soft decorative background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#001847]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-8">
              <h3 className="font-sans font-black text-2xl text-[#001847]">
                {activeLang === 'EN' ? 'Login to Console' : 'कन्सोलमध्ये लॉगिन करा'}
              </h3>
              <p className="text-slate-400 text-xs font-light mt-1.5">
                {activeLang === 'EN' 
                  ? 'Access the secure administrative console of Deogiri Prant' 
                  : 'देवगिरी प्रांत सुरक्षित कन्सोलमध्ये प्रवेश करा'}
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-0.5">
                  {activeLang === 'EN' ? 'Official Email / Username' : 'अधिकृत ईमेल / युझरनेम'}
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input 
                    type="email"
                    required
                    placeholder="admin@abvpdeogiri.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#001847] focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-0.5">
                  {activeLang === 'EN' ? 'Password / Security Pin' : 'पासवर्ड / सिक्युरिटी पिन'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-[#001847] focus:border-transparent transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-500 font-medium">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-200 text-[#001847] focus:ring-[#001847] h-4 w-4"
                  />
                  <span>{activeLang === 'EN' ? 'Remember Me' : 'मला लक्षात ठेवा'}</span>
                </label>
                <button 
                  type="button"
                  onClick={() => triggerNotification(
                    'success', 
                    activeLang === 'EN' ? 'Reset Link Sent' : 'रिसेट लिंक पाठवली', 
                    activeLang === 'EN' ? 'Password recovery instructions sent to your registered email.' : 'पासवर्ड रिकव्हरी माहिती आपल्या ईमेलवर पाठवली आहे.'
                  )}
                  className="font-bold text-[#fc820c] hover:underline"
                >
                  {activeLang === 'EN' ? 'Forgot Password?' : 'पासवर्ड विसरलात?'}
                </button>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>{activeLang === 'EN' ? 'Proceed Securely' : 'सुरक्षितपणे पुढे जा'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {SHOW_DEMO_BYPASS && (
                <button 
                  type="button"
                  onClick={() => {
                    triggerNotification(
                      'success',
                      activeLang === 'EN' ? 'Bypass Verification Successful' : 'सुलभ प्रवेश यशस्वी',
                      activeLang === 'EN' ? 'Entering Super Admin Console...' : 'मुख्य प्रशासकीय डॅशबोर्डमध्ये प्रवेश करत आहे...'
                    );
                    setTimeout(() => {
                      setIsLoggedIn(true);
                    }, 500);
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer animate-pulse"
                >
                  <span>{activeLang === 'EN' ? 'Direct Demo Login (Super Admin)' : 'थेट डेमो लॉगिन (मुख्य डॅशबोर्ड)'}</span>
                  <Shield className="h-4 w-4" />
                </button>
              )}

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {activeLang === 'EN' ? 'New Administrator?' : 'नवीन प्रशासक?'}
                </span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <button 
                type="button"
                onClick={() => {
                  const el = document.getElementById('request-access-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all cursor-pointer text-center"
              >
                {activeLang === 'EN' ? 'Request Admin Access' : 'प्रशासक प्रवेशासाठी विनंती'}
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Secure Access Protocol visual 4-step workflow */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest block">
              {activeLang === 'EN' ? 'SECURITY STANDARD' : 'सुरक्षा मानक'}
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#001847]">
              {activeLang === 'EN' ? 'Secure Access Protocol' : 'सुरक्षित प्रवेश प्रोटोकॉल'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              {activeLang === 'EN'
                ? 'A rigorous multi-layered authentication process ensures zero-compromise access control for our student database security.'
                : 'बहुस्तरीय प्रमाणीकरण प्रक्रिया आमच्या विद्यार्थी डेटाबेसच्या संरक्षणासाठी तडजोड नसलेली सुरक्षा खात्री देते.'}
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 bg-slate-50 border border-slate-200/40 rounded-2xl flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-[#001847] text-orange-400 flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Key className="h-6 w-6" />
              </div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847] mb-1">
                {activeLang === 'EN' ? '1. Credentials' : '१. लॉगिन माहिती'}
              </h4>
              <p className="text-slate-400 text-[11px] font-light">
                {activeLang === 'EN' ? 'Official encrypted Email ID' : 'अधिकृत एनक्रिप्टेड ईमेल आयडी'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-50 border border-slate-200/40 rounded-2xl flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#001847] group-hover:text-orange-400 flex items-center justify-center mb-4 transition-all shadow-sm">
                <Smartphone className="h-6 w-6" />
              </div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847] mb-1">
                {activeLang === 'EN' ? '2. MFA Auth' : '२. दुहेरी पडताळणी'}
              </h4>
              <p className="text-slate-400 text-[11px] font-light">
                {activeLang === 'EN' ? '6-Digit secure code' : '६-अंकी सुरक्षित पासवर्ड'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-50 border border-slate-200/40 rounded-2xl flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#001847] group-hover:text-orange-400 flex items-center justify-center mb-4 transition-all shadow-sm">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847] mb-1">
                {activeLang === 'EN' ? '3. Role Verification' : '३. पद पडताळणी'}
              </h4>
              <p className="text-slate-400 text-[11px] font-light">
                {activeLang === 'EN' ? 'Hierarchical permission checks' : 'संघटनात्मक अधिकार पडताळणी'}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-slate-50 border border-slate-200/40 rounded-2xl flex flex-col items-center text-center relative group">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#fc820c] group-hover:text-white flex items-center justify-center mb-4 transition-all shadow-sm">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h4 className="font-sans font-extrabold text-sm text-[#001847] mb-1">
                {activeLang === 'EN' ? '4. Admin Console' : '४. डॅशबोर्ड'}
              </h4>
              <p className="text-slate-400 text-[11px] font-light">
                {activeLang === 'EN' ? 'Personalized workstation workspace' : 'आपल्या पदाचा डॅशबोर्ड कार्यरत'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Hierarchical Roles & System Highlights Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Hierarchical Roles */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest block">
                  {activeLang === 'EN' ? 'HIERARCHICAL STRUCTURE' : 'संघटन पदे'}
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#001847]">
                  {activeLang === 'EN' ? 'Administrative Role Profiles' : 'प्रशासकीय पद प्रोफाइल'}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light">
                  {activeLang === 'EN'
                    ? 'Access levels and permissions are custom-mapped based on organizational leadership layers.'
                    : 'संघटनात्मक स्तरानुसार विविध प्रशासक पदे आणि कामांचे अधिकार वर्गीकृत आहेत.'}
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Role 1 */}
                <div className="bg-white p-5 rounded-2xl border-l-4 border-[#001847] border border-slate-200/60 shadow-sm flex gap-4">
                  <div className="bg-[#001847]/10 p-2.5 rounded-xl text-[#001847] shrink-0 h-fit">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-sm text-[#001847]">
                      {activeLang === 'EN' ? 'Super Administrator' : 'मुख्य राज्य प्रशासक'}
                    </h4>
                    <p className="text-slate-500 text-xs font-light mt-1 leading-relaxed">
                      {activeLang === 'EN' 
                        ? 'Full system control, platform configuration, IT audits, and cross-division governance permissions.'
                        : 'पूर्ण संघटन अधिकार, व्यासपीठ संरचना, आयटी ऑडिट आणि सर्व विभागांचे नियंत्रण अधिकार.'}
                    </p>
                  </div>
                </div>

                {/* Role 2 */}
                <div className="bg-white p-5 rounded-2xl border-l-4 border-[#fc820c] border border-slate-200/60 shadow-sm flex gap-4">
                  <div className="bg-orange-50 p-2.5 rounded-xl text-[#fc820c] shrink-0 h-fit">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-sm text-[#001847]">
                      {activeLang === 'EN' ? 'Division Administrator' : 'विभाग प्रशासक (Deogiri / Sambhajinagar)'}
                    </h4>
                    <p className="text-slate-500 text-xs font-light mt-1 leading-relaxed">
                      {activeLang === 'EN' 
                        ? 'Manage regional operations, college units, directories, and membership records of assigned division.'
                        : 'विभागीय उपक्रम, महाविद्यालयीन शाखा आणि आपल्या विभागातील विद्यार्थ्यांच्या नोंदणीचे व्यवस्थापन.'}
                    </p>
                  </div>
                </div>

                {/* Role 3 */}
                <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-500 border border-slate-200/60 shadow-sm flex gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500 shrink-0 h-fit">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-sm text-[#001847]">
                      {activeLang === 'EN' ? 'District Administrator' : 'जिल्हा प्रशासक (District IT Convenor)'}
                    </h4>
                    <p className="text-slate-500 text-xs font-light mt-1 leading-relaxed">
                      {activeLang === 'EN' 
                        ? 'Local coordination of unit data, press releases, digital records, and active member directory update.'
                        : 'स्थानिक शाखा व्यवस्थापन, प्रसिद्धी पत्रके आणि जिल्हा सदस्य मार्गदर्शिकेचे अद्ययावतीकरण.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#001847] text-white p-6 rounded-3xl aspect-square flex flex-col justify-between relative overflow-hidden group shadow-md">
                <PieChart className="h-8 w-8 text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-sans font-extrabold text-sm sm:text-base">
                    {activeLang === 'EN' ? 'Advanced Analytics' : 'प्रगत विश्लेषण'}
                  </h4>
                  <p className="text-white/70 text-[10px] sm:text-xs font-light mt-1">Real-time stats tracking</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
              </div>

              <div className="bg-[#fc820c] text-white p-6 rounded-3xl aspect-square flex flex-col justify-between relative overflow-hidden group shadow-md">
                <Users className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-sans font-extrabold text-sm sm:text-base">
                    {activeLang === 'EN' ? 'Member CRM' : 'विद्यार्थी संचयन'}
                  </h4>
                  <p className="text-white/80 text-[10px] sm:text-xs font-light mt-1">Central student database</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
              </div>

              <div className="bg-slate-200/60 border border-slate-300 p-6 rounded-3xl aspect-square flex flex-col justify-between relative overflow-hidden group">
                <Wallet className="h-8 w-8 text-[#001847] group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-[#001847]">
                    {activeLang === 'EN' ? 'Finance Hub' : 'निधी केंद्र'}
                  </h4>
                  <p className="text-slate-500 text-[10px] sm:text-xs font-light mt-1">Audit transparency logs</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-300/30 rounded-full pointer-events-none"></div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-3xl aspect-square flex flex-col justify-between relative overflow-hidden group shadow-sm">
                <Megaphone className="h-8 w-8 text-[#fc820c] group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-[#001847]">
                    {activeLang === 'EN' ? 'Media Control' : 'प्रसार माध्यम केंद्र'}
                  </h4>
                  <p className="text-slate-400 text-[10px] sm:text-xs font-light mt-1">Press PR distribution</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Request Admin Credentials Form */}
      <section className="py-24 bg-white" id="request-access-section">
        <div className="max-w-4xl mx-auto px-6 text-left">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-[#001847] font-black text-xs uppercase tracking-widest">
              {activeLang === 'EN' ? 'REGISTRATION REQUEST' : 'प्रशासक नोंदणी'}
            </span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#001847]">
              {activeLang === 'EN' ? 'Request Admin Credentials' : 'प्रशासक क्रेडेंशियल्ससाठी विनंती करा'}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              {activeLang === 'EN' 
                ? 'Only appointed team convenors can request console access.' 
                : 'केवळ नियुक्त राज्य/जिल्हा पदाधिकारीच कन्सोल प्रवेशासाठी अर्ज करू शकतात.'}
            </p>
          </div>

          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    {activeLang === 'EN' ? 'Full Name / Designation' : 'पूर्ण नाव / संघटनेतील पद'}
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Rahul Deshmukh"
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    {activeLang === 'EN' ? 'Official Email ID' : 'ईमेल आयडी'}
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="official@email.com"
                    value={reqEmail}
                    onChange={(e) => setReqEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    {activeLang === 'EN' ? 'Division' : 'विभाग'}
                  </label>
                  <select 
                    value={reqDivision}
                    onChange={(e) => setReqDivision(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none bg-white cursor-pointer"
                  >
                    <option value="Sambhajinagar">Sambhajinagar (Aurangabad)</option>
                    <option value="Nanded">Nanded</option>
                    <option value="Latur">Latur</option>
                    <option value="Beed">Beed</option>
                    <option value="Jalna">Jalna</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    {activeLang === 'EN' ? 'District / Taluka' : 'जिल्हा / तालुका'}
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Jalna Prant"
                    value={reqDistrict}
                    onChange={(e) => setReqDistrict(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* ID upload drop-zone design */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {activeLang === 'EN' ? 'Identity Proof (ABVP ID card or appointment letter)' : 'ओळखपत्र पुरावा (अभाविप आयडी कार्ड किंवा नियुक्ती पत्र)'}
                </label>
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors relative ${
                    isDragging ? 'border-[#fc820c] bg-orange-50/20' : 'border-slate-300 hover:border-[#001847] bg-white'
                  }`}
                >
                  <input 
                    type="file"
                    id="id-upload-file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <UploadCloud className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-600">
                      {uploadedFile ? uploadedFile.name : (activeLang === 'EN' ? 'Upload a file or drag and drop' : 'फाईल निवडा किंवा ड्रॅग करा')}
                    </p>
                    <p className="text-[10px] text-slate-400 font-light">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Security info note */}
              <div className="bg-blue-50/50 p-4 border border-blue-100 rounded-xl flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  {activeLang === 'EN'
                    ? 'All admin access credentials query are manually checked by the Deogiri State IT Cell. You will receive credential approval link within 24-48 working hours.'
                    : 'सर्व प्रशासक प्रवेश विनंत्या देवगिरी प्रांत आयटी सेलद्वारे पडताळल्या जातात. आपल्याला २४-४८ तासात ईमेलद्वारे संपर्क साधण्यात येईल.'}
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#001847] hover:bg-[#002266] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-99 cursor-pointer"
              >
                {activeLang === 'EN' ? 'Submit Access Request' : 'अर्ज दाखल करा'}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* OTP Multi-Factor Verification Modal Overlay */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200/80 relative text-center space-y-6"
            >
              <button 
                onClick={() => setShowOtpModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-2">
                <div className="w-14 h-14 bg-[#001847]/10 text-[#001847] rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Shield className="h-7 w-7 text-orange-400" />
                </div>
                <h3 className="font-sans font-black text-xl text-[#001847] pt-2">
                  {activeLang === 'EN' ? '2-Step MFA Code' : 'दुहेरी पडताळणी कोड'}
                </h3>
                <p className="text-slate-400 text-xs font-light">
                  {activeLang === 'EN' 
                    ? 'Enter the 6-digit secure code sent to your registered official email ID.'
                    : 'आपल्या अधिकृत ईमेल आयडीवर पाठवलेला ६ अंकी सुरक्षा पासवर्ड टाका.'}
                </p>
              </div>

              {/* 6 Digit Inputs */}
              <div className="flex justify-center gap-2 py-2">
                {otpValues.map((value, idx) => (
                  <input 
                    key={idx}
                    ref={(el) => { otpRefs.current[idx] = el; }}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-11 sm:w-12 h-14 text-center text-xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#001847] focus:ring-0 outline-none transition-colors"
                  />
                ))}
              </div>

              <button 
                onClick={handleVerifyOtp}
                className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                {activeLang === 'EN' ? 'Verify & Access Console' : 'पडताळणी करून प्रवेश करा'}
              </button>

              <div className="pt-2 text-xs">
                <p className="text-slate-400 font-light">
                  {activeLang === 'EN' ? "Didn't receive verification code?" : 'कोड मिळाला नाही?'}
                  {' '}
                  <button 
                    onClick={() => triggerNotification(
                      'success', 
                      activeLang === 'EN' ? 'MFA Resent' : 'एमएफए पुन्हा पाठवला', 
                      activeLang === 'EN' ? 'A new verification security code has been transmitted.' : 'नवीन सुरक्षा पडताळणी कोड आपल्या अधिकृत ईमेलवर पाठवला आहे.'
                    )}
                    className="font-bold text-[#fc820c] hover:underline"
                  >
                    {activeLang === 'EN' ? 'Resend code' : 'पुन्हा कोड पाठवा'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
