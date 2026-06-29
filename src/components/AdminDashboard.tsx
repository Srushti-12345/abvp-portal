import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Users, Calendar, Award, BookOpen, FileText, Image, Megaphone, 
  DollarSign, BarChart3, Settings, LogOut, ChevronRight, ChevronDown, 
  MapPin, Bell, Globe, Search, Plus, Filter, ArrowUpRight, ArrowDownRight, 
  Check, X, Eye, FileUp, Folder, TrendingUp, Building, Hotel, AlertCircle,
  TrendingDown, CheckCircle2, ChevronLeft, Download, Info, UploadCloud
} from 'lucide-react';

// --- TS INTERFACES ---
export interface DistrictData {
  id: string;
  nameEN: string;
  nameMR: string;
  totalMembers: number;
  activeMembers: number;
  pendingMembers: number;
  totalEvents: number;
  universities: number;
  colleges: number;
  hostels: number;
  documents: number;
  galleryImages: number;
  newsPublished: number;
  activities: number;
  income: number;
  expenses: number;
}

export interface Member {
  id: string;
  name: string;
  district: string;
  college: string;
  role: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  dateJoined: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  district: string;
  date: string;
  category: string;
  status: 'Upcoming' | 'Completed' | 'Pending Approval';
}

export interface DocumentItem {
  id: string;
  title: string;
  district: string;
  category: string;
  uploadedBy: string;
  date: string;
  status: 'Approved' | 'Pending';
}

export interface FinanceTransaction {
  id: string;
  type: 'Income' | 'Expense';
  amount: number;
  district: string;
  category: string;
  date: string;
  description: string;
}

interface AdminDashboardProps {
  activeLang: 'EN' | 'MR';
  onLogout: () => void;
}

// --- MOCK DATABASE ---
const INITIAL_DISTRICTS: DistrictData[] = [
  {
    id: 'sambhajinagar',
    nameEN: 'Chhatrapati Sambhajinagar',
    nameMR: 'छत्रपती संभाजीनगर',
    totalMembers: 4820,
    activeMembers: 4100,
    pendingMembers: 420,
    totalEvents: 145,
    universities: 3,
    colleges: 84,
    hostels: 12,
    documents: 240,
    galleryImages: 850,
    newsPublished: 65,
    activities: 98,
    income: 450000,
    expenses: 310000,
  },
  {
    id: 'beed',
    nameEN: 'Beed',
    nameMR: 'बीड',
    totalMembers: 2150,
    activeMembers: 1850,
    pendingMembers: 180,
    totalEvents: 72,
    universities: 1,
    colleges: 45,
    hostels: 4,
    documents: 110,
    galleryImages: 320,
    newsPublished: 28,
    activities: 46,
    income: 180000,
    expenses: 125000,
  },
  {
    id: 'nanded',
    nameEN: 'Nanded',
    nameMR: 'नांदेड',
    totalMembers: 3410,
    activeMembers: 2950,
    pendingMembers: 310,
    totalEvents: 118,
    universities: 2,
    colleges: 62,
    hostels: 8,
    documents: 180,
    galleryImages: 540,
    newsPublished: 42,
    activities: 78,
    income: 320000,
    expenses: 240000,
  },
  {
    id: 'latur',
    nameEN: 'Latur',
    nameMR: 'लातूर',
    totalMembers: 2980,
    activeMembers: 2600,
    pendingMembers: 250,
    totalEvents: 94,
    universities: 1,
    colleges: 58,
    hostels: 6,
    documents: 140,
    galleryImages: 410,
    newsPublished: 35,
    activities: 62,
    income: 260000,
    expenses: 190000,
  },
  {
    id: 'dharashiv',
    nameEN: 'Dharashiv',
    nameMR: 'धाराशिव',
    totalMembers: 1720,
    activeMembers: 1480,
    pendingMembers: 160,
    totalEvents: 48,
    universities: 0,
    colleges: 32,
    hostels: 3,
    documents: 75,
    galleryImages: 210,
    newsPublished: 19,
    activities: 34,
    income: 120000,
    expenses: 85000,
  },
  {
    id: 'jalna',
    nameEN: 'Jalna',
    nameMR: 'जालना',
    totalMembers: 1950,
    activeMembers: 1700,
    pendingMembers: 150,
    totalEvents: 61,
    universities: 0,
    colleges: 38,
    hostels: 4,
    documents: 90,
    galleryImages: 280,
    newsPublished: 22,
    activities: 41,
    income: 145000,
    expenses: 98000,
  },
  {
    id: 'parbhani',
    nameEN: 'Parbhani',
    nameMR: 'परभणी',
    totalMembers: 2240,
    activeMembers: 1900,
    pendingMembers: 210,
    totalEvents: 68,
    universities: 1,
    colleges: 41,
    hostels: 5,
    documents: 98,
    galleryImages: 340,
    newsPublished: 26,
    activities: 50,
    income: 195000,
    expenses: 140000,
  },
  {
    id: 'hingoli',
    nameEN: 'Hingoli',
    nameMR: 'हिंगोली',
    totalMembers: 1350,
    activeMembers: 1150,
    pendingMembers: 110,
    totalEvents: 34,
    universities: 0,
    colleges: 24,
    hostels: 2,
    documents: 55,
    galleryImages: 170,
    newsPublished: 14,
    activities: 25,
    income: 90000,
    expenses: 62000,
  }
];

const INITIAL_MEMBERS: Member[] = [
  { id: 'M-101', name: 'Abhishek Kulkarni', district: 'sambhajinagar', college: 'Deogiri College, Sambhajinagar', role: 'District Convenor', status: 'Approved', dateJoined: '2026-02-15', email: 'abhishek@abvpdeogiri.org' },
  { id: 'M-102', name: 'Shreya Deshmukh', district: 'beed', college: 'Miliya Arts & Sci College, Beed', role: 'Active Volunteer', status: 'Pending', dateJoined: '2026-06-25', email: 'shreya.d@gmail.com' },
  { id: 'M-103', name: 'Prasad Muley', district: 'nanded', college: 'SGGS Engineering College, Nanded', role: 'Joint Secretary', status: 'Approved', dateJoined: '2025-09-10', email: 'prasad.nanded@abvpdeogiri.org' },
  { id: 'M-104', name: 'Snehal Patil', district: 'latur', college: 'Rajarshi Shahu College, Latur', role: 'District Co-Convenor', status: 'Pending', dateJoined: '2026-06-26', email: 'snehal.patil@gmail.com' },
  { id: 'M-105', name: 'Omkar Joshi', district: 'dharashiv', college: 'Ramkrishna Paramhansa College', role: 'Active Volunteer', status: 'Approved', dateJoined: '2026-03-01', email: 'omkar.osmanabad@gmail.com' },
  { id: 'M-106', name: 'Vaishnavi Kadam', district: 'jalna', college: 'MSS College, Jalna', role: 'MJC President', status: 'Pending', dateJoined: '2026-06-28', email: 'kadam.v@gmail.com' },
  { id: 'M-107', name: 'Ganesh Shinde', district: 'parbhani', college: 'DSM College, Parbhani', role: 'Executive Member', status: 'Approved', dateJoined: '2026-01-20', email: 'ganesh.shinde@abvpdeogiri.org' },
  { id: 'M-108', name: 'Prerna Joshi', district: 'hingoli', college: 'Adarsha College, Hingoli', role: 'Active Volunteer', status: 'Rejected', dateJoined: '2026-05-12', email: 'prerna.j@gmail.com' }
];

const INITIAL_EVENTS: Event[] = [
  { id: 'E-201', title: 'Prant Abhyas Varg 2026', district: 'sambhajinagar', date: '2026-07-15', category: 'Training', status: 'Upcoming' },
  { id: 'E-202', title: 'Chhatrapati Shivaji Maharaj Coronation Ceremony Rally', district: 'beed', date: '2026-06-06', category: 'Cultural', status: 'Completed' },
  { id: 'E-203', title: 'Save Water Campaign & Student March', district: 'nanded', date: '2026-06-18', category: 'Social Activity', status: 'Completed' },
  { id: 'E-204', title: 'District Career Counselling Expo', district: 'latur', date: '2026-07-20', category: 'Educational', status: 'Upcoming' },
  { id: 'E-205', title: 'Anti-Drug Awareness Street Play', district: 'dharashiv', date: '2026-07-02', category: 'Social Awareness', status: 'Upcoming' },
  { id: 'E-206', title: 'Youth Leadership & Nation Building Seminar', district: 'jalna', date: '2026-06-24', category: 'Seminar', status: 'Completed' },
  { id: 'E-207', title: 'Campus Sports Festival', district: 'parbhani', date: '2026-07-28', category: 'Sports', status: 'Pending Approval' }
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: 'D-301', title: 'State IT Infrastructure Audit Report', district: 'sambhajinagar', category: 'Audit Report', uploadedBy: 'Srikant Patil', date: '2026-06-15', status: 'Approved' },
  { id: 'D-302', title: 'District Committee Appointment Matrix 2026', district: 'beed', category: 'Organizational Chart', uploadedBy: 'Ram Deshpande', date: '2026-05-20', status: 'Approved' },
  { id: 'D-303', title: 'Nanded Prant Expense Resolution ledger', district: 'nanded', category: 'Financial', uploadedBy: 'Shital K', date: '2026-06-26', status: 'Pending' },
  { id: 'D-304', title: 'National Education Policy Student Feedback Summary', district: 'latur', category: 'Research Paper', uploadedBy: 'Dr. Vivek S.', date: '2026-04-10', status: 'Approved' }
];

const INITIAL_FINANCE: FinanceTransaction[] = [
  { id: 'F-401', type: 'Income', amount: 45000, district: 'sambhajinagar', category: 'Donation', date: '2026-06-24', description: 'Public contribution for Study Room setup' },
  { id: 'F-402', type: 'Expense', amount: 15000, district: 'beed', category: 'Event Hall Booking', date: '2026-06-05', description: 'Shivaji Maharaj Coronation Celebration venue' },
  { id: 'F-403', type: 'Income', amount: 35000, district: 'nanded', category: 'Sponsorship', date: '2026-06-17', description: 'Career Guidance sponsor' },
  { id: 'F-404', type: 'Expense', amount: 8000, district: 'latur', category: 'Printing', date: '2026-06-22', description: 'NEP handouts and posters printing' },
  { id: 'F-405', type: 'Income', amount: 12000, district: 'jalna', category: 'Membership Fee', date: '2026-06-28', description: 'Batch 2026 local membership logs' }
];

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  district: string;
  date: string;
  volunteersCount: number;
  audienceReached: number;
  status: 'Planned' | 'Active' | 'Completed';
  outcome: string;
}

export interface GalleryImageItem {
  id: string;
  caption: string;
  district: string;
  date: string;
  imageUrl: string;
  category: string;
  status: 'Approved' | 'Pending';
}

export interface NewsArticleItem {
  id: string;
  title: string;
  category: 'Press Release' | 'Announcement' | 'Media Circular' | 'Editorial';
  district: string;
  date: string;
  author: string;
  body: string;
  status: 'Draft' | 'Published';
  views: number;
}

const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: 'ACT-01', title: 'Save Water Campaign & Student March', category: 'Social Activity', district: 'sambhajinagar', date: '2026-06-18', volunteersCount: 150, audienceReached: 1200, status: 'Completed', outcome: 'Over 1200 citizens reached and signed pledge cards for rain harvesting.' },
  { id: 'ACT-02', title: 'National Education Policy Student Feedback Seminar', category: 'Educational', district: 'latur', date: '2026-06-22', volunteersCount: 85, audienceReached: 450, status: 'Completed', outcome: 'Gathered feedback forms from 450+ students on the new curriculum.' },
  { id: 'ACT-03', title: 'Blood Donation Camp & Medical Helplines', category: 'Health & Service', district: 'nanded', date: '2026-07-05', volunteersCount: 45, audienceReached: 200, status: 'Planned', outcome: 'Targeting 200 units of blood collection for civil hospital.' },
  { id: 'ACT-04', title: 'Anti-Drug Street Play Awareness', category: 'Social Awareness', district: 'dharashiv', date: '2026-06-29', volunteersCount: 30, audienceReached: 800, status: 'Active', outcome: 'Ongoing street play in central marketplace and college complexes.' },
  { id: 'ACT-05', title: 'Self Defense Training for Girls (Mission Sahasi)', category: 'Women Empowerment', district: 'beed', date: '2026-06-10', volunteersCount: 120, audienceReached: 1500, status: 'Completed', outcome: 'Completed 10-day basic self defense workshop for 1500 collegiate girls.' },
];

const INITIAL_GALLERY_IMAGES: GalleryImageItem[] = [
  { id: 'GAL-01', caption: 'State Youth Assembly Leadership Convention', district: 'sambhajinagar', date: '2026-05-14', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60', category: 'Convention', status: 'Approved' },
  { id: 'GAL-02', caption: 'Save Water awareness rally through central squares', district: 'nanded', date: '2026-06-18', imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=60', category: 'Social March', status: 'Approved' },
  { id: 'GAL-03', caption: 'NEP Interactive Forum with BAMU Vice Chancellor', district: 'sambhajinagar', date: '2026-06-03', imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=60', category: 'Seminar', status: 'Approved' },
  { id: 'GAL-04', caption: 'Draft committee review of Beed student representation structure', district: 'beed', date: '2026-06-27', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60', category: 'Organizational Meeting', status: 'Pending' },
];

const INITIAL_NEWS: NewsArticleItem[] = [
  { id: 'NEWS-01', title: 'ABVP Deogiri announces executive district leaders list for session 2026-27', category: 'Announcement', district: 'sambhajinagar', date: '2026-06-25', author: 'Srikant Patil (State Convener)', body: 'The central working committee of ABVP Deogiri has officially announced the list of district conveners and co-conveners for the next academic calendar. Abhishek Kulkarni will continue as District Convenor for Chhatrapati Sambhajinagar while special responsibilities have been assigned for tribal student outreach.', status: 'Published', views: 2450 },
  { id: 'NEWS-02', title: 'Over 1500 girls trained in 10-day self-defense program in Beed district', category: 'Press Release', district: 'beed', date: '2026-06-12', author: 'Shreya Deshmukh', body: 'The 10-day specialized physical self defense program under "Mission Sahasi" successfully concluded at Beed. Trainers from state martial arts academies guided students on emergency drills, situational alertness, and physical tactics. Social workers appreciated the high volunteer spirit.', status: 'Published', views: 1890 },
  { id: 'NEWS-03', title: 'Student representatives petition BAMU Vice Chancellor on hostel fee anomalies', category: 'Media Circular', district: 'sambhajinagar', date: '2026-06-28', author: 'Amol Deshmukh', body: 'A delegation of ABVP Deogiri representatives met the vice chancellor of BAMU to submit an urgent memorandum addressing anomalies in university hostel fees. The delegation demanded an audit of infrastructure repair funds and immediate relief for economically backward rural students.', status: 'Published', views: 820 },
];

export default function AdminDashboard({ activeLang, onLogout }: AdminDashboardProps) {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('all'); // 'all' for complete Deogiri
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals for Actions
  const [quickActionModal, setQuickActionModal] = useState<string | null>(null); // 'member' | 'event' | 'document' | 'finance' etc
  
  // Real Local DB States (Mutable for current session)
  const [districts, setDistricts] = useState<DistrictData[]>(INITIAL_DISTRICTS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [finance, setFinance] = useState<FinanceTransaction[]>(INITIAL_FINANCE);

  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>(INITIAL_GALLERY_IMAGES);
  const [news, setNews] = useState<NewsArticleItem[]>(INITIAL_NEWS);

  // Forms states
  const [newMember, setNewMember] = useState({ name: '', email: '', college: '', role: '', district: 'sambhajinagar' });
  const [newEvent, setNewEvent] = useState({ title: '', category: '', date: '', district: 'sambhajinagar' });
  const [newDoc, setNewDoc] = useState({ title: '', category: '', district: 'sambhajinagar', author: '' });
  const [newFin, setNewFin] = useState({ type: 'Income' as 'Income' | 'Expense', amount: '', category: '', district: 'sambhajinagar', desc: '' });

  // Additional Forms states
  const [newActivity, setNewActivity] = useState({ title: '', category: 'Social Activity', district: 'sambhajinagar', volunteersCount: '', audienceReached: '', outcome: '' });
  const [newNews, setNewNews] = useState({ title: '', category: 'Press Release' as any, district: 'sambhajinagar', author: '', body: '' });
  const [newGalleryImage, setNewGalleryImage] = useState({ caption: '', district: 'sambhajinagar', imageUrl: '', category: 'Social March' });

  // Document Upload File Simulator State
  const [docFileState, setDocFileState] = useState<{ name: string; size: string; progress: number; isUploading: boolean } | null>(null);
  const [financeReceiptState, setFinanceReceiptState] = useState<{ name: string; size: string; progress: number; isUploading: boolean } | null>(null);
  const [galleryUploadState, setGalleryUploadState] = useState<{ name: string; size: string; progress: number; isUploading: boolean } | null>(null);

  // Notifications Log
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New Member Registered', desc: 'Snehal Patil submitted draft Latur volunteer form.', time: '5 mins ago', read: false },
    { id: '2', title: 'Upcoming Event Alert', desc: 'Prant Abhyas Varg starts soon in Sambhajinagar.', time: '2 hours ago', read: false },
    { id: '3', title: 'Finance Pending Approval', desc: 'Nanded ledger voucher requires audit verification.', time: '1 day ago', read: true }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Language mapping
  const t = useMemo(() => {
    return {
      dashboard: activeLang === 'EN' ? 'Dashboard' : 'मुख्य डॅशबोर्ड',
      members: activeLang === 'EN' ? 'Members' : 'सदस्य सूची',
      events: activeLang === 'EN' ? 'Events' : 'कार्यक्रम व्यवस्थापन',
      activities: activeLang === 'EN' ? 'Activities' : 'संघटनात्मक उपक्रम',
      eduDir: activeLang === 'EN' ? 'Educational Directory' : 'शैक्षणिक निर्देशिका',
      documents: activeLang === 'EN' ? 'Documents' : 'कागदपत्रे व अहवाल',
      gallery: activeLang === 'EN' ? 'Gallery' : 'छायाचित्र दालन',
      news: activeLang === 'EN' ? 'News & Announcements' : 'बातम्या व घोषणा',
      finance: activeLang === 'EN' ? 'Finance Hub' : 'वित्तीय लेखाजोखा',
      reports: activeLang === 'EN' ? 'Reports & Analytics' : 'अहवाल आणि विश्लेषण',
      settings: activeLang === 'EN' ? 'System Settings' : 'प्रणाली सेटिंग्ज',
      logout: activeLang === 'EN' ? 'Logout' : 'बाहेर पडा',
      explorer: activeLang === 'EN' ? 'Administrative Region Explorer' : 'प्रशासकीय विभाग एक्सप्लोरर',
      allPrant: activeLang === 'EN' ? 'ABVP Deogiri (All Districts)' : 'अभाविप देवगिरी (पूर्ण प्रांत)',
      quickStats: activeLang === 'EN' ? 'Performance KPI Metrics' : 'कामगिरी दर्शक निर्देशक',
      pendingApprovals: activeLang === 'EN' ? 'Critical Pending Approvals' : 'प्रलंबित मंजुरी प्रक्रीया',
      recentTimeline: activeLang === 'EN' ? 'Real-time Operations Log' : 'थेट संघटनात्मक घटनाक्रम',
      quickActions: activeLang === 'EN' ? 'Enterprise Quick Actions' : 'जलद नियंत्रण कृती',
      interactiveMap: activeLang === 'EN' ? 'Interactive Regional Map' : 'परस्परसंवादी विभागीय नकाशा',
      searchPlaceholder: activeLang === 'EN' ? 'Search members, events, or transaction logs...' : 'सदस्य, उपक्रम किंवा आर्थिक नोंदी शोधा...',
      totalMembers: activeLang === 'EN' ? 'Total Members' : 'एकूण नोंदणीकृत सदस्य',
      activeMembers: activeLang === 'EN' ? 'Active Members' : 'सक्रिय कार्यकर्ते',
      totalEvents: activeLang === 'EN' ? 'Total Events' : 'एकूण कार्यक्रम',
      financeSummary: activeLang === 'EN' ? 'Finance Summary' : 'एकूण वित्तीय आढावा',
      income: activeLang === 'EN' ? 'Income' : 'एकूण आवक',
      expense: activeLang === 'EN' ? 'Expense' : 'एकूण खर्च',
      districtCompare: activeLang === 'EN' ? 'District Performance Metric' : 'जिल्हानुसार प्रगती तुलना',
    };
  }, [activeLang]);

  // Current District Profile calculations
  const activeDistrict = useMemo(() => {
    if (selectedDistrictId === 'all') {
      return {
        id: 'all',
        nameEN: 'ABVP Deogiri',
        nameMR: 'अभाविप देवगिरी प्रांत',
        totalMembers: districts.reduce((acc, d) => acc + d.totalMembers, 0),
        activeMembers: districts.reduce((acc, d) => acc + d.activeMembers, 0),
        pendingMembers: districts.reduce((acc, d) => acc + d.pendingMembers, 0),
        totalEvents: districts.reduce((acc, d) => acc + d.totalEvents, 0),
        universities: districts.reduce((acc, d) => acc + d.universities, 0),
        colleges: districts.reduce((acc, d) => acc + d.colleges, 0),
        hostels: districts.reduce((acc, d) => acc + d.hostels, 0),
        documents: districts.reduce((acc, d) => acc + d.documents, 0),
        galleryImages: districts.reduce((acc, d) => acc + d.galleryImages, 0),
        newsPublished: districts.reduce((acc, d) => acc + d.newsPublished, 0),
        activities: districts.reduce((acc, d) => acc + d.activities, 0),
        income: districts.reduce((acc, d) => acc + d.income, 0) + finance.filter(f => f.type === 'Income').reduce((a,c) => a+c.amount,0),
        expenses: districts.reduce((acc, d) => acc + d.expenses, 0) + finance.filter(f => f.type === 'Expense').reduce((a,c) => a+c.amount,0)
      };
    }
    const found = districts.find(d => d.id === selectedDistrictId);
    if (!found) return districts[0];
    
    // Add dynamically submitted form metrics to calculations
    const localIncome = finance.filter(f => f.district === selectedDistrictId && f.type === 'Income').reduce((a, c) => a + c.amount, 0);
    const localExpense = finance.filter(f => f.district === selectedDistrictId && f.type === 'Expense').reduce((a, c) => a + c.amount, 0);
    const localMembers = members.filter(m => m.district === selectedDistrictId);
    const localEventsCount = events.filter(e => e.district === selectedDistrictId).length;
    const localDocsCount = documents.filter(d => d.district === selectedDistrictId).length;

    return {
      ...found,
      totalMembers: found.totalMembers + localMembers.filter(m => m.status === 'Approved').length,
      pendingMembers: found.pendingMembers + localMembers.filter(m => m.status === 'Pending').length,
      totalEvents: found.totalEvents + localEventsCount,
      documents: found.documents + localDocsCount,
      income: found.income + localIncome,
      expenses: found.expenses + localExpense
    };
  }, [selectedDistrictId, districts, members, events, documents, finance]);

  // Handle Approvals
  const approveMember = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'Approved' } : m));
    // Trigger success audio or feedback logic could go here
  };

  const rejectMember = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'Rejected' } : m));
  };

  const approveDoc = (id: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
  };

  // Add Action Handlers
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `M-${Date.now().toString().slice(-3)}`;
    const freshMember: Member = {
      id: newId,
      name: newMember.name,
      district: newMember.district,
      college: newMember.college || 'Government College of Technology',
      role: newMember.role || 'Volunteer',
      status: 'Approved',
      dateJoined: new Date().toISOString().split('T')[0],
      email: newMember.email
    };
    setMembers(prev => [freshMember, ...prev]);
    setQuickActionModal(null);
    setNewMember({ name: '', email: '', college: '', role: '', district: 'sambhajinagar' });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `E-${Date.now().toString().slice(-3)}`;
    const freshEvent: Event = {
      id: newId,
      title: newEvent.title,
      district: newEvent.district,
      date: newEvent.date || new Date().toISOString().split('T')[0],
      category: newEvent.category || 'General Meet',
      status: 'Upcoming'
    };
    setEvents(prev => [freshEvent, ...prev]);
    setQuickActionModal(null);
    setNewEvent({ title: '', category: '', date: '', district: 'sambhajinagar' });
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `D-${Date.now().toString().slice(-3)}`;
    const freshDoc: DocumentItem = {
      id: newId,
      title: newDoc.title,
      district: newDoc.district,
      category: newDoc.category || 'Circular',
      uploadedBy: newDoc.author || 'Super Admin',
      date: new Date().toISOString().split('T')[0],
      status: 'Approved'
    };
    setDocuments(prev => [freshDoc, ...prev]);
    setQuickActionModal(null);
    setNewDoc({ title: '', category: '', district: 'sambhajinagar', author: '' });
  };

  const handleAddFinance = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `F-${Date.now().toString().slice(-3)}`;
    const freshFin: FinanceTransaction = {
      id: newId,
      type: newFin.type,
      amount: parseFloat(newFin.amount) || 0,
      district: newFin.district,
      category: newFin.category || 'Operational Support',
      date: new Date().toISOString().split('T')[0],
      description: newFin.desc || 'General transaction'
    };
    setFinance(prev => [freshFin, ...prev]);
    setQuickActionModal(null);
    setNewFin({ type: 'Income', amount: '', category: '', district: 'sambhajinagar', desc: '' });
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ACT-${Date.now().toString().slice(-3)}`;
    const freshActivity: ActivityItem = {
      id: newId,
      title: newActivity.title,
      category: newActivity.category || 'Social Activity',
      district: newActivity.district,
      date: new Date().toISOString().split('T')[0],
      volunteersCount: parseInt(newActivity.volunteersCount) || 20,
      audienceReached: parseInt(newActivity.audienceReached) || 100,
      status: 'Planned',
      outcome: newActivity.outcome || 'Planned outreach campaign across local target institutions.'
    };
    setActivities(prev => [freshActivity, ...prev]);
    setQuickActionModal(null);
    setNewActivity({ title: '', category: 'Social Activity', district: 'sambhajinagar', volunteersCount: '', audienceReached: '', outcome: '' });
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `NEWS-${Date.now().toString().slice(-3)}`;
    const freshNews: NewsArticleItem = {
      id: newId,
      title: newNews.title,
      category: newNews.category || 'Press Release',
      district: newNews.district,
      date: new Date().toISOString().split('T')[0],
      author: newNews.author || 'State Office Bearer',
      body: newNews.body || 'Official announcement content.',
      status: 'Published',
      views: 0
    };
    setNews(prev => [freshNews, ...prev]);
    setQuickActionModal(null);
    setNewNews({ title: '', category: 'Press Release', district: 'sambhajinagar', author: '', body: '' });
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `GAL-${Date.now().toString().slice(-3)}`;
    const freshGallery: GalleryImageItem = {
      id: newId,
      caption: newGalleryImage.caption,
      district: newGalleryImage.district,
      date: new Date().toISOString().split('T')[0],
      imageUrl: newGalleryImage.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60',
      category: newGalleryImage.category || 'Event',
      status: 'Approved'
    };
    setGalleryImages(prev => [freshGallery, ...prev]);
    setQuickActionModal(null);
    setNewGalleryImage({ caption: '', district: 'sambhajinagar', imageUrl: '', category: 'Social March' });
  };

  // Filter lists based on selected district and search query
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchesDistrict = selectedDistrictId === 'all' || m.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.college.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [members, selectedDistrictId, searchQuery]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesDistrict = selectedDistrictId === 'all' || e.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || e.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [events, selectedDistrictId, searchQuery]);

  const filteredDocs = useMemo(() => {
    return documents.filter(d => {
      const matchesDistrict = selectedDistrictId === 'all' || d.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || d.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [documents, selectedDistrictId, searchQuery]);

  const filteredTransactions = useMemo(() => {
    return finance.filter(f => {
      const matchesDistrict = selectedDistrictId === 'all' || f.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || f.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [finance, selectedDistrictId, searchQuery]);

  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      const matchesDistrict = selectedDistrictId === 'all' || act.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || act.title.toLowerCase().includes(searchQuery.toLowerCase()) || act.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [activities, selectedDistrictId, searchQuery]);

  const filteredGalleryImages = useMemo(() => {
    return galleryImages.filter(g => {
      const matchesDistrict = selectedDistrictId === 'all' || g.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || g.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [galleryImages, selectedDistrictId, searchQuery]);

  const filteredNews = useMemo(() => {
    return news.filter(n => {
      const matchesDistrict = selectedDistrictId === 'all' || n.district === selectedDistrictId;
      const matchesSearch = searchQuery === '' || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.body.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [news, selectedDistrictId, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#121c2a] flex flex-col font-sans selection:bg-[#001847] selection:text-white">
      
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-[#001847] hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </button>
          
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold tracking-wider uppercase">
              <span>{t.dashboard}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-[#fc820c] font-black">
                {activeLang === 'EN' ? activeDistrict.nameEN : activeDistrict.nameMR}
              </span>
            </div>
            <h1 className="font-sans font-black text-lg text-[#001847] mt-0.5">
              {activeLang === 'EN' ? 'Super Admin Workspace' : 'मुख्य प्रशासकीय मंच'}
            </h1>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-grow max-w-md mx-6 relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
          <input 
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Header Right Utilities */}
        <div className="flex items-center gap-3">
          
          {/* Notification Indicator */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2.5 text-slate-500 hover:text-[#001847] hover:bg-slate-50 rounded-xl transition-all cursor-pointer relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#fc820c] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notification Dropdown Pane */}
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <h4 className="font-bold text-xs text-[#001847] uppercase tracking-wider">System Alerts</h4>
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                      className="text-[10px] text-[#fc820c] font-bold hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl text-xs transition-colors ${n.read ? 'bg-white' : 'bg-orange-50/30'}`}>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-700">{n.title}</p>
                          <span className="text-[9px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Connected User Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#001847] text-orange-400 font-extrabold text-xs flex items-center justify-center shadow-inner uppercase">
              SA
            </div>
            <div className="hidden xl:block text-left">
              <p className="font-bold text-xs text-[#001847] leading-none">Super Administrator</p>
              <p className="text-[10px] text-slate-400 mt-1">State IT Command Cell</p>
            </div>
          </div>

        </div>
      </header>

      {/* 2. BODY LAYOUT (SIDEBAR + MAIN CONTENT AREA) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* COLLAPSIBLE SIDEBAR */}
        <aside className={`bg-white border-r border-slate-200/80 flex flex-col shrink-0 transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? 'w-72' : 'w-0 lg:w-20'
        }`}>
          
          {/* ADMINISTRATIVE REGION EXPLORER (VS CODE TREE STYLE) */}
          {isSidebarOpen && (
            <div className="p-4 border-b border-slate-100 bg-[#F8F9FA]/60 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
                {t.explorer}
              </span>
              
              <div className="space-y-1.5 font-sans">
                {/* All Prant Node */}
                <button 
                  onClick={() => setSelectedDistrictId('all')}
                  className={`w-full text-left flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all ${
                    selectedDistrictId === 'all' 
                      ? 'bg-[#001847] text-white shadow-md' 
                      : 'text-[#001847] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${selectedDistrictId === 'all' ? 'text-orange-400' : 'text-[#fc820c]'}`} />
                    <span>{activeLang === 'EN' ? 'ABVP Deogiri Prant' : 'अभाविप देवगिरी प्रांत'}</span>
                  </div>
                  {selectedDistrictId === 'all' && <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>}
                </button>

                {/* Sub Tree of Districts */}
                <div className="pl-2 border-l-2 border-slate-100/80 space-y-1 pt-1">
                  {districts.map(d => {
                    const isSelected = selectedDistrictId === d.id;
                    return (
                      <button 
                        key={d.id}
                        onClick={() => setSelectedDistrictId(d.id)}
                        className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          isSelected 
                            ? 'bg-[#fc820c] text-white font-bold shadow-sm' 
                            : 'text-slate-500 hover:text-[#001847] hover:bg-slate-100/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <MapPin className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate">{activeLang === 'EN' ? d.nameEN : d.nameMR}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {d.totalMembers}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MAIN MENU TABS */}
          <nav className="p-4 space-y-1 flex-1 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-2 mb-2">
              {isSidebarOpen ? 'Governance Modules' : 'Menu'}
            </span>
            
            {[
              { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
              { id: 'members', label: t.members, icon: Users },
              { id: 'events', label: t.events, icon: Calendar },
              { id: 'activities', label: t.activities, icon: Award },
              { id: 'eduDir', label: t.eduDir, icon: BookOpen },
              { id: 'documents', label: t.documents, icon: FileText },
              { id: 'gallery', label: t.gallery, icon: Image },
              { id: 'news', label: t.news, icon: Megaphone },
              { id: 'finance', label: t.finance, icon: DollarSign },
              { id: 'reports', label: t.reports, icon: BarChart3 },
              { id: 'settings', label: t.settings, icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#001847]/10 text-[#001847] border-l-4 border-[#fc820c]' 
                      : 'text-slate-500 hover:text-[#001847] hover:bg-slate-50'
                  }`}
                  title={tab.label}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-[#fc820c]' : 'text-slate-400'}`} />
                  {isSidebarOpen && <span>{tab.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Footer of Sidebar */}
          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
            >
              <LogOut className="h-4.5 w-4.5" />
              {isSidebarOpen && <span>{t.logout}</span>}
            </button>
          </div>

        </aside>

        {/* 3. CENTER DYNAMIC DASHBOARD CONTAINER */}
        <main className="flex-grow overflow-y-auto p-6 bg-[#F8F9FA]">
          
          <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER METADATA BANNER */}
            <div className="bg-gradient-to-r from-[#001847] to-[#002b7a] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-1 text-left">
                <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                  {selectedDistrictId === 'all' ? 'SUPER CONTROL ACTIVE' : 'DISTRICT VIEW ACTIVE'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight pt-1">
                  {activeLang === 'EN' ? activeDistrict.nameEN : activeDistrict.nameMR}
                </h2>
                <p className="text-white/70 text-xs font-light">
                  {activeLang === 'EN' 
                    ? `Consolidated administrative console metrics updated on June 29, 2026` 
                    : `२९ जून २०२६ चे अद्ययावत संघटनात्मक आकडे आणि प्रगती अहवाल`}
                </p>
              </div>

              {/* Dynamic Context Button to Reset to complete Prant */}
              {selectedDistrictId !== 'all' && (
                <button 
                  onClick={() => setSelectedDistrictId('all')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="h-4 w-4 text-orange-400" />
                  <span>{activeLang === 'EN' ? 'Reset to Complete Deogiri' : 'संपूर्ण प्रांत निवडा'}</span>
                </button>
              )}
            </div>

            {/* DYNAMIC TAB SWITCH RENDER */}
            <AnimatePresence mode="wait">
              
              {/* === TAB 1: DASHBOARD MAIN === */}
              {activeTab === 'dashboard' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="space-y-6"
                >
                  
                  {/* KPI STATISTICS CARDS GRID */}
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest text-left mb-3.5">
                      {t.quickStats}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Total Members */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.totalMembers}</span>
                          <div className="bg-[#001847]/10 p-2.5 rounded-xl text-[#001847]">
                            <Users className="h-5 w-5 text-[#fc820c]" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-2xl font-black text-[#001847]">{activeDistrict.totalMembers}</h4>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 mt-1">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            <span>+12.4% {activeLang === 'EN' ? 'this month' : 'या महिन्यात'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Active Volunteers */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.activeMembers}</span>
                          <div className="bg-orange-50 p-2.5 rounded-xl text-[#fc820c]">
                            <Shield className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-2xl font-black text-[#001847]">{activeDistrict.activeMembers}</h4>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1">
                            <Info className="h-3.5 w-3.5" />
                            <span>{((activeDistrict.activeMembers/activeDistrict.totalMembers)*100).toFixed(0)}% {activeLang === 'EN' ? 'engagement rate' : 'कार्यरत दर'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Events Logged */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.totalEvents}</span>
                          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500">
                            <Calendar className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-2xl font-black text-[#001847]">{activeDistrict.totalEvents}</h4>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 mt-1">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            <span>+8.2% {activeLang === 'EN' ? 'growth' : 'वाढ'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Finance Ledger Balance */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.financeSummary}</span>
                          <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                            <DollarSign className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-2xl font-black text-[#001847]">₹{(activeDistrict.income - activeDistrict.expenses).toLocaleString('en-IN')}</h4>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 mt-1">
                            <span>₹{activeDistrict.income.toLocaleString('en-IN')} {activeLang === 'EN' ? 'collected' : 'जमा'}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* INTERACTIVE MARATHWADA REGION MAP & QUICK ACTIONS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Live SVG interactive Map (Left 7 Columns) */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm lg:col-span-7 flex flex-col text-left">
                      <div className="mb-4">
                        <span className="text-[#fc820c] font-black text-[10px] uppercase tracking-wider block">
                          {activeLang === 'EN' ? 'GEOGRAPHIC CONTROL' : 'भौगोलिक नियंत्रण'}
                        </span>
                        <h4 className="font-sans font-black text-base text-[#001847]">
                          {t.interactiveMap}
                        </h4>
                        <p className="text-slate-400 text-xs font-light mt-0.5">
                          {activeLang === 'EN' 
                            ? 'Click on any district to instantly view concentrated local statistics & database metrics.'
                            : 'विशिष्ट स्थानिक आकडेवारी पाहण्यासाठी कोणत्याही जिल्ह्यावर क्लिक करा.'}
                        </p>
                      </div>

                      {/* Render Interactive Map Grid representing Marathwada Map */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden">
                        
                        {/* Legend */}
                        <div className="absolute top-4 left-4 bg-white/95 border border-slate-200 p-2.5 rounded-xl text-[10px] shadow-sm z-10 space-y-1">
                          <p className="font-bold text-[#001847]">Map Indicators</p>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-[#001847] rounded"></span>
                            <span>Selected Scope</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-[#fc820c] rounded"></span>
                            <span>Active Hub</span>
                          </div>
                        </div>

                        {/* Geographic representation layout */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-md relative">
                          
                          {/* Row 1 */}
                          <button 
                            onClick={() => setSelectedDistrictId('sambhajinagar')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'sambhajinagar'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Sambhajinagar</span>
                            <span className="text-[9px] opacity-70">4,820 Actives</span>
                          </button>

                          <button 
                            onClick={() => setSelectedDistrictId('jalna')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'jalna'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Jalna</span>
                            <span className="text-[9px] opacity-70">1,950 Actives</span>
                          </button>

                          <button 
                            onClick={() => setSelectedDistrictId('hingoli')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'hingoli'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Hingoli</span>
                            <span className="text-[9px] opacity-70">1,350 Actives</span>
                          </button>

                          {/* Row 2 */}
                          <button 
                            onClick={() => setSelectedDistrictId('beed')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'beed'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Beed</span>
                            <span className="text-[9px] opacity-70">2,150 Actives</span>
                          </button>

                          <button 
                            onClick={() => setSelectedDistrictId('parbhani')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'parbhani'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Parbhani</span>
                            <span className="text-[9px] opacity-70">2,240 Actives</span>
                          </button>

                          <button 
                            onClick={() => setSelectedDistrictId('nanded')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'nanded'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Nanded</span>
                            <span className="text-[9px] opacity-70">3,410 Actives</span>
                          </button>

                          {/* Row 3 */}
                          <div className="invisible"></div>

                          <button 
                            onClick={() => setSelectedDistrictId('dharashiv')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'dharashiv'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Dharashiv</span>
                            <span className="text-[9px] opacity-70">1,720 Actives</span>
                          </button>

                          <button 
                            onClick={() => setSelectedDistrictId('latur')}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                              selectedDistrictId === 'latur'
                                ? 'bg-[#001847] text-white border-orange-500 shadow-lg scale-102'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-[#fc820c]'
                            }`}
                          >
                            <span className="font-bold text-xs sm:text-sm">Latur</span>
                            <span className="text-[9px] opacity-70">2,980 Actives</span>
                          </button>

                        </div>

                        {/* Reset Map triggers */}
                        <div className="mt-4">
                          <button 
                            onClick={() => setSelectedDistrictId('all')}
                            className="text-xs font-bold text-[#001847] hover:text-[#fc820c] underline"
                          >
                            {activeLang === 'EN' ? 'View Entire Deogiri Prant' : 'संपूर्ण देवगिरी प्रांत आकडे पहा'}
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* Enterprise Quick Actions (Right 5 Columns) */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm lg:col-span-5 flex flex-col text-left justify-between">
                      <div>
                        <span className="text-[#fc820c] font-black text-[10px] uppercase tracking-wider block">
                          {activeLang === 'EN' ? 'SYSTEM CONTROLS' : 'प्रणाली नियंत्रण'}
                        </span>
                        <h4 className="font-sans font-black text-base text-[#001847]">
                          {t.quickActions}
                        </h4>
                        <p className="text-slate-400 text-xs font-light mt-0.5 mb-6">
                          {activeLang === 'EN' 
                            ? 'Deploy quick resources, upload media and approve memberships instantly.'
                            : 'संघटनात्मक कार्य जलदगतीने करण्यासाठी खालील पर्यायांवर क्लिक करा.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <button 
                          onClick={() => setQuickActionModal('event')}
                          className="p-4 bg-[#001847]/5 hover:bg-[#001847]/10 text-[#001847] rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group border border-slate-100"
                        >
                          <Calendar className="h-6 w-6 text-[#fc820c]" />
                          <span className="text-xs font-bold">Create Event</span>
                        </button>

                        <button 
                          onClick={() => setQuickActionModal('member')}
                          className="p-4 bg-[#001847]/5 hover:bg-[#001847]/10 text-[#001847] rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group border border-slate-100"
                        >
                          <Users className="h-6 w-6 text-[#fc820c]" />
                          <span className="text-xs font-bold">Add Member</span>
                        </button>

                        <button 
                          onClick={() => setQuickActionModal('document')}
                          className="p-4 bg-[#001847]/5 hover:bg-[#001847]/10 text-[#001847] rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group border border-slate-100"
                        >
                          <FileUp className="h-6 w-6 text-[#fc820c]" />
                          <span className="text-xs font-bold">Upload Doc</span>
                        </button>

                        <button 
                          onClick={() => setQuickActionModal('finance')}
                          className="p-4 bg-[#001847]/5 hover:bg-[#001847]/10 text-[#001847] rounded-2xl transition-all flex flex-col items-center justify-center text-center gap-2 group border border-slate-100"
                        >
                          <DollarSign className="h-6 w-6 text-emerald-600" />
                          <span className="text-xs font-bold">Finance Entry</span>
                        </button>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                        <Info className="h-5 w-5 text-[#fc820c] shrink-0" />
                        <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                          Any action taken here is instantly propagated to the corresponding division database model.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* CRITICAL PENDING APPROVALS LIST */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-[#fc820c] font-black text-[10px] uppercase tracking-wider block">
                          {activeLang === 'EN' ? 'IMMEDIATE WORKLIST' : 'तातडीचे निर्णय'}
                        </span>
                        <h4 className="font-sans font-black text-base text-[#001847]">
                          {t.pendingApprovals}
                        </h4>
                      </div>
                      <span className="text-xs bg-orange-50 text-[#fc820c] px-3 py-1 rounded-full font-bold">
                        {members.filter(m => m.status === 'Pending').length + documents.filter(d => d.status === 'Pending').length} Pending Tasks
                      </span>
                    </div>

                    <div className="space-y-4">
                      {members.filter(m => m.status === 'Pending').map(m => (
                        <div key={m.id} className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-[#001847]/10 p-3 rounded-xl text-[#001847] shrink-0">
                              <Users className="h-5 w-5 text-[#fc820c]" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#001847]">{m.name}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{m.college} • District: <span className="font-bold uppercase text-[10px]">{m.district}</span></p>
                              <span className="inline-block bg-[#001847] text-orange-400 text-[10px] px-2 py-0.5 rounded-md mt-1 font-bold">{m.role}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => approveMember(m.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Approve</span>
                            </button>
                            <button 
                              onClick={() => rejectMember(m.id)}
                              className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <X className="h-3.5 w-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Pending Documents */}
                      {documents.filter(d => d.status === 'Pending').map(d => (
                        <div key={d.id} className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-3 rounded-xl text-blue-500 shrink-0">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#001847]">{d.title}</p>
                              <p className="text-xs text-slate-400 mt-0.5">Uploaded by {d.uploadedBy} • District: <span className="font-bold uppercase text-[10px]">{d.district}</span></p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => approveDoc(d.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Approve</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {members.filter(m => m.status === 'Pending').length === 0 && documents.filter(d => d.status === 'Pending').length === 0 && (
                        <div className="py-12 text-center text-slate-400 space-y-2">
                          <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                          <p className="text-xs font-bold">Excellent! All pending operational requests have been verified.</p>
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* === TAB 2: MEMBERS LIST === */}
              {activeTab === 'members' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Student Enrollment & Cadre Directory' : 'कार्यकर्ते आणि विद्यार्थी नोंदणी डेटाबेस'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Manage verified and draft memberships.' : 'प्रांतातील सर्व नोंदणीकृत विद्यार्थी आणि कार्यकर्त्यांची यादी.'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setQuickActionModal('member')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Volunteer</span>
                    </button>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                          <th className="p-4">Reg ID</th>
                          <th className="p-4">Full Name</th>
                          <th className="p-4">District</th>
                          <th className="p-4">College Entity</th>
                          <th className="p-4">Designated Role</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                        {filteredMembers.map(m => (
                          <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono font-bold text-slate-400">{m.id}</td>
                            <td className="p-4">
                              <div>
                                <p className="font-bold text-[#001847]">{m.name}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{m.email}</p>
                              </div>
                            </td>
                            <td className="p-4 font-bold uppercase text-[10px] text-[#fc820c]">{m.district}</td>
                            <td className="p-4 text-slate-500 font-light">{m.college}</td>
                            <td className="p-4">
                              <span className="bg-[#001847]/10 text-[#001847] px-2 py-1 rounded-md text-[10px] font-bold">
                                {m.role}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                m.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                                m.status === 'Pending' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'
                              }`}>
                                {m.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex gap-2 justify-end">
                                {m.status === 'Pending' && (
                                  <button 
                                    onClick={() => approveMember(m.id)}
                                    className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all cursor-pointer"
                                    title="Approve"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                )}
                                <button 
                                  onClick={() => {
                                    setMembers(prev => prev.filter(x => x.id !== m.id));
                                  }}
                                  className="p-1 hover:bg-red-50 text-red-500 rounded-lg transition-all cursor-pointer"
                                  title="Remove Log"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </motion.div>
              )}

              {/* === TAB 3: EVENTS === */}
              {activeTab === 'events' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Event & Conference Calendar' : 'आयोजित कार्यक्रम आणि सभा सूची'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Monitor division-level public initiatives.' : 'विविध जिल्ह्यांमध्ये अभाविपतर्फे आयोजित परिषदा आणि आंदोलने.'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setQuickActionModal('event')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Host Event</span>
                    </button>
                  </div>

                  {/* List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredEvents.map(e => (
                      <div key={e.id} className="p-5 bg-slate-50/60 border border-slate-200/40 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#fc820c] uppercase tracking-wider">{e.category}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              e.status === 'Upcoming' ? 'bg-blue-50 text-blue-700' :
                              e.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                            }`}>
                              {e.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-[#001847] line-clamp-1">{e.title}</h4>
                          <p className="text-xs text-slate-400">Date: {e.date} • Prant district: <span className="font-bold uppercase">{e.district}</span></p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2">
                          <button 
                            onClick={() => {
                              setEvents(prev => prev.map(x => x.id === e.id ? { ...x, status: 'Completed' } : x));
                            }}
                            className="text-[11px] font-bold text-emerald-600 hover:underline"
                          >
                            Mark Completed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}

              {/* === TAB 4: EDUCATIONAL DIRECTORY === */}
              {activeTab === 'eduDir' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div>
                    <h3 className="font-sans font-black text-lg text-[#001847]">
                      {activeLang === 'EN' ? 'Educational Institutions Matrix' : 'शैक्षणिक संस्था आणि प्रभाग वर्ग'}
                    </h3>
                    <p className="text-slate-400 text-xs font-light">
                      {activeLang === 'EN' ? 'Structure and monitor local Universities, Colleges, and hostels.' : 'प्रांतातील विद्यापीठे, महाविद्यालये आणि वसतिगृहांची भौगोलिक विभागणी.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-5 rounded-2xl text-center space-y-1.5 border border-slate-100">
                      <Building className="h-8 w-8 text-[#fc820c] mx-auto" />
                      <h4 className="font-black text-lg text-[#001847]">{activeDistrict.universities}</h4>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Universities</p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl text-center space-y-1.5 border border-slate-100">
                      <Building className="h-8 w-8 text-blue-500 mx-auto" />
                      <h4 className="font-black text-lg text-[#001847]">{activeDistrict.colleges}</h4>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Colleges Served</p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl text-center space-y-1.5 border border-slate-100">
                      <Hotel className="h-8 w-8 text-emerald-600 mx-auto" />
                      <h4 className="font-black text-lg text-[#001847]">{activeDistrict.hostels}</h4>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">Active Hostels</p>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex items-start gap-4">
                    <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs text-blue-800 leading-relaxed">
                      <p className="font-bold">Institutional Coverage Update</p>
                      <p>
                        Our local student database encompasses Dr. Babasaheb Ambedkar Marathwada University (BAMU), Swami Ramanand Teerth Marathwada University (SRTMUN), and various affiliated degree and polytechnic colleges.
                      </p>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* === TAB 5: DOCUMENTS === */}
              {activeTab === 'documents' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Administrative Document Repository' : 'संघटनात्मक परिपत्रके व कागदपत्रे'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Securely access resolutions, circulars and audits.' : 'अधिकृत ठराव, नियोजन पत्रके आणि नियोजित प्रकल्पांचे अहवाल.'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setQuickActionModal('document')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload Document</span>
                    </button>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-3">
                    {filteredDocs.map(d => (
                      <div key={d.id} className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-slate-400 shrink-0" />
                          <div>
                            <p className="font-bold text-sm text-[#001847]">{d.title}</p>
                            <p className="text-xs text-slate-400">Category: {d.category} • Uploaded by {d.uploadedBy} • {d.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            d.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                          }`}>
                            {d.status}
                          </span>
                          <button className="text-xs font-bold text-[#fc820c] hover:underline flex items-center gap-1 cursor-pointer">
                            <Download className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}

              {/* === TAB 6: FINANCE === */}
              {activeTab === 'finance' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Transparency & Finance Hub' : 'पारदर्शक वित्तीय लेखापरीक्षण आणि नोंदी'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Manage income collections, audits and public donation accounts.' : 'अभाविप देवगिरी प्रांतातील संकलन, निधी विनियोग आणि हिशोब.'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setQuickActionModal('finance')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Ledger Entry</span>
                    </button>
                  </div>

                  {/* Summary Balance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Consolidated Income</p>
                        <h4 className="text-2xl font-black text-emerald-800 mt-1">₹{activeDistrict.income.toLocaleString('en-IN')}</h4>
                      </div>
                      <ArrowUpRight className="h-8 w-8 text-emerald-600" />
                    </div>

                    <div className="p-5 bg-red-50/50 border border-red-100 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Consolidated Expense</p>
                        <h4 className="text-2xl font-black text-red-800 mt-1">₹{activeDistrict.expenses.toLocaleString('en-IN')}</h4>
                      </div>
                      <ArrowDownRight className="h-8 w-8 text-red-600" />
                    </div>
                  </div>

                  {/* Transaction ledger list */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#001847] uppercase tracking-wider">Ledger Journal Log</h4>
                    
                    <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                            <th className="p-4">Transaction ID</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">District</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
                          {filteredTransactions.map(t => (
                            <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 font-mono font-bold text-slate-400">{t.id}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  t.type === 'Income' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                }`}>
                                  {t.category}
                                </span>
                              </td>
                              <td className="p-4 font-bold uppercase text-[10px] text-[#fc820c]">{t.district}</td>
                              <td className="p-4 text-slate-500 font-light">{t.description}</td>
                              <td className="p-4 text-slate-400">{t.date}</td>
                              <td className={`p-4 text-right font-bold ${
                                t.type === 'Income' ? 'text-emerald-600' : 'text-red-500'
                              }`}>
                                {t.type === 'Income' ? '+' : '-'} ₹{t.amount.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* === TAB 7: ACTIVITIES & CAMPAIGNS === */}
              {activeTab === 'activities' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Organizational Campaigns & Activities' : 'संघटनात्मक उपक्रम आणि आंदोलने'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Track social work, student campaigns, and developmental drives.' : 'देवगिरी प्रांतातील विविध समाजोपयोगी उपक्रम व आंदोलनांची माहिती.'}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setQuickActionModal('activity')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Log Activity</span>
                    </button>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-center gap-3">
                      <Award className="h-8 w-8 text-[#fc820c]" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total logged</p>
                        <h4 className="text-lg font-black text-[#001847]">{activities.length} Campaigns</h4>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Volunteers Mobilized</p>
                        <h4 className="text-lg font-black text-[#001847]">
                          {activities.reduce((acc, a) => acc + a.volunteersCount, 0).toLocaleString()} Active
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-emerald-600" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Outreach</p>
                        <h4 className="text-lg font-black text-[#001847]">
                          {activities.reduce((acc, a) => acc + a.audienceReached, 0).toLocaleString()}+ Citizens
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Activities Grid */}
                  <div className="space-y-4">
                    {filteredActivities.map(act => (
                      <div key={act.id} className="p-5 border border-slate-100 rounded-2xl hover:border-[#fc820c]/30 transition-all space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-extrabold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                                {act.category}
                              </span>
                              <span className="text-xs font-bold uppercase text-[#fc820c]">
                                {act.district}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-[#001847]">{act.title}</h4>
                          </div>

                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold w-fit ${
                            act.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                            act.status === 'Active' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {act.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed font-light">{act.outcome}</p>

                        <div className="pt-3 border-t border-slate-50 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-4">
                          <div>
                            Volunteers: <span className="font-bold text-slate-700">{act.volunteersCount}</span> • 
                            Impact Reach: <span className="font-bold text-slate-700">~{act.audienceReached} people</span>
                          </div>
                          <div className="flex gap-2">
                            {act.status !== 'Completed' && (
                              <button 
                                onClick={() => {
                                  setActivities(prev => prev.map(a => a.id === act.id ? { ...a, status: 'Completed' } : a));
                                }}
                                className="text-emerald-600 hover:underline font-bold"
                              >
                                Mark Completed
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setActivities(prev => prev.filter(a => a.id !== act.id));
                              }}
                              className="text-red-500 hover:underline font-bold"
                            >
                              Delete Log
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* === TAB 8: GALLERY MANAGER === */}
              {activeTab === 'gallery' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Media & Photo Gallery Manager' : 'छायाचित्र दालन व्यवस्थापन'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Moderate public gallery items, upload community action photos.' : 'सार्वजनिक छायाचित्र दालनात थेट फोटो अपलोड करा आणि मंजुरी द्या.'}
                      </p>
                    </div>

                    <button 
                      onClick={() => setQuickActionModal('gallery')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredGalleryImages.map(img => (
                      <div key={img.id} className="group border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                          <img 
                            src={img.imageUrl} 
                            alt={img.caption}
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 bg-[#001847]/80 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded backdrop-blur-sm">
                            {img.category}
                          </span>
                        </div>

                        <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-[#fc820c] uppercase">{img.district}</p>
                            <h5 className="font-bold text-xs text-[#001847] line-clamp-2 leading-relaxed font-sans">{img.caption}</h5>
                          </div>

                          <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                            <span>{img.date}</span>
                            <span className={`px-2 py-0.5 rounded font-extrabold ${
                              img.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {img.status}
                            </span>
                          </div>
                        </div>

                        <div className="px-4 pb-4 flex gap-2">
                          {img.status === 'Pending' && (
                            <button 
                              onClick={() => {
                                setGalleryImages(prev => prev.map(g => g.id === img.id ? { ...g, status: 'Approved' } : g));
                              }}
                              className="w-1/2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-all text-center cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              setGalleryImages(prev => prev.filter(g => g.id !== img.id));
                            }}
                            className={`py-1.5 hover:bg-red-50 text-red-500 text-[10px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                              img.status === 'Pending' ? 'w-1/2 border border-red-100' : 'w-full border border-slate-100'
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* === TAB 9: NEWS & PRESS RELEASES === */}
              {activeTab === 'news' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Press Releases & Editorial Board' : 'प्रेस प्रसिद्धीपत्रके व संपादकीय नियंत्रण'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Manage public articles, media bulletins and state declarations.' : 'सार्वजनिक वृत्त प्रसिद्धीपत्रके, निवेदने आणि घोषणापत्रे प्रसिद्ध करा.'}
                      </p>
                    </div>

                    <button 
                      onClick={() => setQuickActionModal('news')}
                      className="bg-[#001847] hover:bg-[#002266] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Write Release</span>
                    </button>
                  </div>

                  {/* News Catalog list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNews.map(item => (
                      <div key={item.id} className="p-6 border border-slate-100 rounded-3xl hover:border-slate-200 hover:shadow-sm transition-all flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[#fc820c] bg-orange-50 px-2.5 py-1 rounded">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                              <Eye className="h-3.5 w-3.5" />
                              <span>{item.views.toLocaleString()}</span>
                            </div>
                          </div>

                          <h4 className="font-sans font-extrabold text-sm text-[#001847] leading-snug line-clamp-2">
                            {item.title}
                          </h4>

                          <p className="text-xs text-slate-500 font-light line-clamp-3 leading-relaxed">
                            {item.body}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                          <div>
                            By <span className="font-bold text-[#001847]">{item.author}</span> • <span className="uppercase font-bold">{item.district}</span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setNews(prev => prev.filter(n => n.id !== item.id));
                              }}
                              className="text-red-500 hover:underline font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* === TAB 10: REPORTS & ANALYTICS === */}
              {activeTab === 'reports' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-sans font-black text-lg text-[#001847]">
                        {activeLang === 'EN' ? 'Prant performance Reports & Analytics' : 'प्रांत प्रगती अहवाल आणि विश्लेषण'}
                      </h3>
                      <p className="text-slate-400 text-xs font-light">
                        {activeLang === 'EN' ? 'Visualize membership growth, financial flows and regional performance.' : 'नोंदणीकृत सदस्य, आर्थिक प्रवाह आणि विभागीय कामगिरीची आकडेवारी.'}
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        const tempNotify = {
                          id: Date.now().toString(),
                          title: 'CSV Report Downloaded',
                          desc: 'ABVP Deogiri Consolidated Audit Report 2026-27 downloaded successfully.',
                          time: 'Just now',
                          read: false
                        };
                        setNotifications(prev => [tempNotify, ...prev]);
                        alert(activeLang === 'EN' ? 'Consolidated CSV Report Downloaded Successfully!' : 'सर्वसमावेशक अहवाल यशस्वीरित्या डाउनलोड झाला!');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export Audit Report (CSV)</span>
                    </button>
                  </div>

                  {/* SVG Bar Chart for memberships */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
                      <div>
                        <h4 className="font-sans font-extrabold text-sm text-[#001847]">District Membership Distribution</h4>
                        <p className="text-[11px] text-slate-400 font-light">Graphical analysis of active cadres across all Deogiri units.</p>
                      </div>

                      <div className="w-full flex items-end justify-between h-48 pt-4 px-2 border-b border-slate-100">
                        {districts.map(d => {
                          const maxMembers = Math.max(...districts.map(x => x.totalMembers));
                          const barHeightPercent = (d.totalMembers / maxMembers) * 100;
                          return (
                            <div key={d.id} className="flex flex-col items-center group w-full">
                              {/* Tooltip */}
                              <div className="absolute mb-24 hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg z-10">
                                {d.totalMembers.toLocaleString()}
                              </div>
                              <div 
                                style={{ height: `${barHeightPercent}%` }} 
                                className="w-6 sm:w-8 bg-[#001847] hover:bg-[#fc820c] transition-all rounded-t-md cursor-pointer"
                              />
                              <p className="text-[9px] font-mono font-black uppercase text-slate-400 tracking-wider mt-2 rotate-45 sm:rotate-0 origin-center truncate max-w-[40px] text-center">
                                {d.id.slice(0, 4)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Finance SVG Chart / Stats overview */}
                    <div className="p-6 border border-slate-100 rounded-3xl space-y-6">
                      <div>
                        <h4 className="font-sans font-extrabold text-sm text-[#001847]">Financial Balance Comparison</h4>
                        <p className="text-[11px] text-slate-400 font-light">Total income vs operational expense per district.</p>
                      </div>

                      <div className="space-y-3">
                        {districts.slice(0, 5).map(d => {
                          const maxIncome = Math.max(...districts.map(x => x.income));
                          const incomeWidth = (d.income / maxIncome) * 100;
                          const expenseWidth = (d.expenses / maxIncome) * 100;
                          return (
                            <div key={d.id} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-[#001847] uppercase">{d.id}</span>
                                <span className="text-slate-500 text-[10px]">
                                  Balance: <span className="font-bold text-emerald-600">₹{(d.income - d.expenses).toLocaleString('en-IN')}</span>
                                </span>
                              </div>
                              <div className="space-y-1">
                                {/* Income bar */}
                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                  <div style={{ width: `${incomeWidth}%` }} className="h-full bg-emerald-500" />
                                </div>
                                {/* Expense bar */}
                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                  <div style={{ width: `${expenseWidth}%` }} className="h-full bg-red-500" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Comparative Ledger Table */}
                  <div className="space-y-3">
                    <h4 className="font-sans font-extrabold text-xs text-slate-500 uppercase tracking-widest">Region Efficiency Audit Matrix</h4>
                    
                    <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-100">
                            <th className="p-4">District Region</th>
                            <th className="p-4">Cadre Strength</th>
                            <th className="p-4">Campaign Efficiency</th>
                            <th className="p-4">Events Hosted</th>
                            <th className="p-4 text-right">Income</th>
                            <th className="p-4 text-right">Expenses</th>
                            <th className="p-4 text-right">Net Reserves</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-slate-700 font-light">
                          {districts.map(d => (
                            <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 font-bold uppercase text-[#001847]">{d.nameEN}</td>
                              <td className="p-4 font-bold">{d.totalMembers.toLocaleString()}</td>
                              <td className="p-4">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                                  {Math.round((d.activeMembers / d.totalMembers) * 100)}% Active
                                </span>
                              </td>
                              <td className="p-4 font-mono">{d.totalEvents}</td>
                              <td className="p-4 text-right text-emerald-600 font-bold">₹{d.income.toLocaleString('en-IN')}</td>
                              <td className="p-4 text-right text-red-500">₹{d.expenses.toLocaleString('en-IN')}</td>
                              <td className="p-4 text-right font-black text-[#001847]">₹{(d.income - d.expenses).toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* === TAB 11: SYSTEM SETTINGS === */}
              {activeTab === 'settings' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-8"
                >
                  <div>
                    <h3 className="font-sans font-black text-lg text-[#001847]">
                      {activeLang === 'EN' ? 'Administrative System Configuration' : 'प्रणाली आणि तांत्रिक सेटिंग्ज'}
                    </h3>
                    <p className="text-slate-400 text-xs font-light">
                      {activeLang === 'EN' ? 'Configure registration triggers, SMS relays, and security options.' : 'विद्यार्थी नोंदणी, एसएमएस गेटवे, आणि सुरक्षा पर्याय नियंत्रित करा.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* General Switches */}
                    <div className="space-y-6">
                      <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Feature Gateway Status</h4>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="text-xs font-bold text-[#001847]">Online Student Enrollment Portal</p>
                            <p className="text-[10px] text-slate-400">Allow new students to submit membership requests online</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#001847] cursor-pointer" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="text-xs font-bold text-[#001847]">Automated SMS Notification Gateway</p>
                            <p className="text-[10px] text-slate-400">Trigger immediate SMS to local committees on new events</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#001847] cursor-pointer" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="text-xs font-bold text-[#001847]">Marathi Machine Transliterator</p>
                            <p className="text-[10px] text-slate-400">Automatically map news articles to Marathi using AI</p>
                          </div>
                          <input type="checkbox" className="h-4 w-4 accent-[#001847] cursor-pointer" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="text-xs font-bold text-[#001847]">Public Financial Ledger Access</p>
                            <p className="text-[10px] text-slate-400">Provide transparent access of receipts to public auditors</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#001847] cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    {/* Operational Parameter Fields */}
                    <div className="space-y-6">
                      <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Regional Constants</h4>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">State Head Office Address</label>
                          <input 
                            type="text" 
                            defaultValue="Deogiri Prant Karyalaya, Shivaji Nagar, Sambhajinagar"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Audit Verification Email Contact</label>
                          <input 
                            type="email" 
                            defaultValue="audit@abvpdeogiri.org"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Database Cloud Backup Periodicity</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none">
                            <option>Every 12 hours (High-security)</option>
                            <option>Daily at 00:00 UTC</option>
                            <option>Weekly (Default)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => {
                            alert(activeLang === 'EN' ? 'Cloud SQL relational backup archived to Deogiri storage pool.' : 'प्रणाली बॅकअप सुरक्षित संग्रहित केला आहे!');
                          }}
                          className="py-2.5 px-4 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 justify-center"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Trigger System SQL Backup</span>
                        </button>

                        <button 
                          onClick={() => {
                            alert(activeLang === 'EN' ? 'Temporary cache and logs successfully flushed.' : 'तात्पुरत्या नोंदी यशस्वीरित्या हटवल्या आहेत!');
                          }}
                          className="py-2.5 px-4 border border-red-100 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 justify-center"
                        >
                          <span>Flush System Cache</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* === FALLBACK / EMBED OTHER TABS AS SIMPLE PLACEHOLDERS === */}
              {!['dashboard', 'members', 'events', 'eduDir', 'documents', 'finance', 'activities', 'gallery', 'news', 'reports', 'settings'].includes(activeTab) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-12 rounded-3xl border border-slate-200/60 shadow-sm text-center space-y-4"
                >
                  <Folder className="h-12 w-12 text-[#fc820c] mx-auto" />
                  <div className="space-y-1.5">
                    <h3 className="font-sans font-black text-lg text-[#001847]">
                      {activeLang === 'EN' ? `${activeTab.toUpperCase()} Module Configured` : `${activeTab.toUpperCase()} विभाग संरचित`}
                    </h3>
                    <p className="text-slate-400 text-xs max-w-md mx-auto">
                      Enterprise server-side route is fully integrated. In development mode, placeholder data is rendered automatically.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-5 py-2 bg-[#001847] text-white text-xs font-bold rounded-xl hover:bg-[#002266] transition-all cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </main>
      </div>

      {/* 4. MODAL POPUPS FOR QUICK ACTIONS */}
      <AnimatePresence>
        {quickActionModal && (
          <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border border-slate-200/80 relative text-left space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => {
                  setQuickActionModal(null);
                  setDocFileState(null);
                  setFinanceReceiptState(null);
                  setGalleryUploadState(null);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-sans font-black text-lg text-[#001847] capitalize flex items-center gap-2">
                  <Plus className="h-5 w-5 text-[#fc820c]" />
                  <span>Deploy {quickActionModal} Log</span>
                </h3>
                <p className="text-xs text-slate-400">Fill high-fidelity parameters to audit Deogiri registry.</p>
              </div>

              {/* Form Render based on QuickAction selected */}
              
              {/* Member Form */}
              {quickActionModal === 'member' && (
                <form onSubmit={handleAddMember} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Volunteer Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Deshmukh"
                      value={newMember.name}
                      onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Official Email ID</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="rahul@abvpdeogiri.org"
                      value={newMember.email}
                      onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Region/District</label>
                      <select 
                        value={newMember.district}
                        onChange={(e) => setNewMember(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.nameEN}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Role Profile</label>
                      <input 
                        type="text" 
                        placeholder="District Co-Convenor"
                        value={newMember.role}
                        onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer">
                    Commit Volunteer Log
                  </button>
                </form>
              )}

              {/* Event Form */}
              {quickActionModal === 'event' && (
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Event Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. National Youth Day Rally"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                      <input 
                        type="text" 
                        placeholder="Cultural"
                        value={newEvent.category}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Date</label>
                      <input 
                        type="date" 
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#001847] outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Target District Location</label>
                    <select 
                      value={newEvent.district}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.nameEN}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer">
                    Commit Event Log
                  </button>
                </form>
              )}

              {/* Document Form with Simulated Upload */}
              {quickActionModal === 'document' && (
                <form onSubmit={handleAddDoc} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Document Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. NEP feedback handbook"
                      value={newDoc.title}
                      onChange={(e) => setNewDoc(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Drag and Drop Box Simulation */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Attached PDF Payload</label>
                    {!docFileState ? (
                      <div 
                        onClick={() => {
                          setDocFileState({ name: 'NEP_Action_Draft_v2.pdf', size: '2.4 MB', progress: 10, isUploading: true });
                          let prog = 10;
                          const interval = setInterval(() => {
                            prog += 30;
                            if (prog >= 100) {
                              prog = 100;
                              clearInterval(interval);
                              setDocFileState({ name: 'NEP_Action_Draft_v2.pdf', size: '2.4 MB', progress: 100, isUploading: false });
                            } else {
                              setDocFileState({ name: 'NEP_Action_Draft_v2.pdf', size: '2.4 MB', progress: prog, isUploading: true });
                            }
                          }, 120);
                        }}
                        className="border-2 border-dashed border-slate-200 hover:border-[#fc820c] p-6 rounded-2xl text-center cursor-pointer space-y-2 hover:bg-slate-50/50 transition-all"
                      >
                        <UploadCloud className="h-8 w-8 text-[#fc820c] mx-auto animate-bounce" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-[#001847]">Upload Official PDF Document</p>
                          <p className="text-[10px] text-slate-400">Click to select file or drag & drop here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                        <FileText className="h-8 w-8 text-[#001847]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#001847] truncate">{docFileState.name}</p>
                          <p className="text-[10px] text-slate-400">{docFileState.size} • {docFileState.isUploading ? `Uploading ${docFileState.progress}%` : 'Uploaded successfully'}</p>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mt-1.5">
                            <div style={{ width: `${docFileState.progress}%` }} className="h-full bg-emerald-500 transition-all duration-150" />
                          </div>
                        </div>
                        {!docFileState.isUploading && (
                          <button 
                            type="button"
                            onClick={() => setDocFileState(null)}
                            className="text-slate-400 hover:text-red-500 text-xs font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                      <input 
                        type="text" 
                        placeholder="Circular"
                        value={newDoc.category}
                        onChange={(e) => setNewDoc(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Uploader/Author</label>
                      <input 
                        type="text" 
                        placeholder="State Convener"
                        value={newDoc.author}
                        onChange={(e) => setNewDoc(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Target District Location</label>
                    <select 
                      value={newDoc.district}
                      onChange={(e) => setNewDoc(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.nameEN}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={docFileState?.isUploading}
                    className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {docFileState?.isUploading ? 'Uploading Payload...' : 'Commit Document Metadata'}
                  </button>
                </form>
              )}

              {/* Finance Form with Receipt Simulation */}
              {quickActionModal === 'finance' && (
                <form onSubmit={handleAddFinance} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Transaction Type</label>
                      <select 
                        value={newFin.type}
                        onChange={(e) => setNewFin(prev => ({ ...prev, type: e.target.value as 'Income' | 'Expense' }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        <option value="Income">Income (+)</option>
                        <option value="Expense">Expense (-)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Amount (₹)</label>
                      <input 
                        type="number" 
                        required 
                        placeholder="5000"
                        value={newFin.amount}
                        onChange={(e) => setNewFin(prev => ({ ...prev, amount: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Receipt Uploader */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Audit Voucher Receipt</label>
                    {!financeReceiptState ? (
                      <div 
                        onClick={() => {
                          setFinanceReceiptState({ name: 'Ledger_Voucher_8891.png', size: '1.2 MB', progress: 10, isUploading: true });
                          let prog = 10;
                          const interval = setInterval(() => {
                            prog += 30;
                            if (prog >= 100) {
                              prog = 100;
                              clearInterval(interval);
                              setFinanceReceiptState({ name: 'Ledger_Voucher_8891.png', size: '1.2 MB', progress: 100, isUploading: false });
                            } else {
                              setFinanceReceiptState({ name: 'Ledger_Voucher_8891.png', size: '1.2 MB', progress: prog, isUploading: true });
                            }
                          }, 120);
                        }}
                        className="border border-dashed border-slate-200 hover:border-[#fc820c] p-4 rounded-xl text-center cursor-pointer space-y-1 hover:bg-slate-50/50 transition-all"
                      >
                        <UploadCloud className="h-6 w-6 text-[#fc820c] mx-auto" />
                        <p className="text-[11px] font-bold text-[#001847]">Upload Ledger Receipt Scan</p>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                        <FileText className="h-6 w-6 text-[#001847]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-[#001847] truncate">{financeReceiptState.name}</p>
                          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden mt-1">
                            <div style={{ width: `${financeReceiptState.progress}%` }} className="h-full bg-emerald-500 transition-all duration-150" />
                          </div>
                        </div>
                        {!financeReceiptState.isUploading && (
                          <button 
                            type="button"
                            onClick={() => setFinanceReceiptState(null)}
                            className="text-slate-400 hover:text-red-500 text-[11px] font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Category Tag</label>
                      <input 
                        type="text" 
                        placeholder="Sponsorship"
                        value={newFin.category}
                        onChange={(e) => setNewFin(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Scope Location</label>
                      <select 
                        value={newFin.district}
                        onChange={(e) => setNewFin(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.nameEN}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Description / Memo</label>
                    <textarea 
                      placeholder="Enter specific audit remarks..."
                      value={newFin.desc}
                      onChange={(e) => setNewFin(prev => ({ ...prev, desc: e.target.value }))}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={financeReceiptState?.isUploading}
                    className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {financeReceiptState?.isUploading ? 'Uploading Receipt...' : 'Commit Ledger Entry'}
                  </button>
                </form>
              )}

              {/* Activity Log Form */}
              {quickActionModal === 'activity' && (
                <form onSubmit={handleAddActivity} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Campaign Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Tree Plantation Drive"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Campaign Category</label>
                      <select 
                        value={newActivity.category}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        <option>Social Activity</option>
                        <option>Educational Drive</option>
                        <option>Social Awareness</option>
                        <option>Women Empowerment</option>
                        <option>Sports Tournament</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">District Scope</label>
                      <select 
                        value={newActivity.district}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.nameEN}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Mobilized Volunteers</label>
                      <input 
                        type="number" 
                        required 
                        placeholder="50"
                        value={newActivity.volunteersCount}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, volunteersCount: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Outreach Count</label>
                      <input 
                        type="number" 
                        required 
                        placeholder="250"
                        value={newActivity.audienceReached}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, audienceReached: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Campaign Outcome / Description</label>
                    <textarea 
                      required
                      placeholder="Briefly state the societal impact, student response..."
                      value={newActivity.outcome}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, outcome: e.target.value }))}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer">
                    Commit Activity Log
                  </button>
                </form>
              )}

              {/* Gallery Image Upload with Preview */}
              {quickActionModal === 'gallery' && (
                <form onSubmit={handleAddGalleryImage} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Photo Caption</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Chhatrapati Shivaji Maharaj Rally"
                      value={newGalleryImage.caption}
                      onChange={(e) => setNewGalleryImage(prev => ({ ...prev, caption: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Image Selector Box */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Attached Photo Asset</label>
                    {!galleryUploadState ? (
                      <div 
                        onClick={() => {
                          setGalleryUploadState({ name: 'Rally_Snapshot.jpg', size: '1.8 MB', progress: 10, isUploading: true });
                          let prog = 10;
                          const interval = setInterval(() => {
                            prog += 30;
                            if (prog >= 100) {
                              prog = 100;
                              clearInterval(interval);
                              setGalleryUploadState({ name: 'Rally_Snapshot.jpg', size: '1.8 MB', progress: 100, isUploading: false });
                              // Select a random premium unsplash to render beautifully in list
                              const randomImgs = [
                                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60',
                                'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=60',
                                'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&auto=format&fit=crop&q=60'
                              ];
                              setNewGalleryImage(prev => ({ ...prev, imageUrl: randomImgs[Math.floor(Math.random() * randomImgs.length)] }));
                            } else {
                              setGalleryUploadState({ name: 'Rally_Snapshot.jpg', size: '1.8 MB', progress: prog, isUploading: true });
                            }
                          }, 120);
                        }}
                        className="border border-dashed border-slate-200 hover:border-[#fc820c] p-6 rounded-xl text-center cursor-pointer space-y-2 hover:bg-slate-50/50 transition-all"
                      >
                        <UploadCloud className="h-6 w-6 text-[#fc820c] mx-auto animate-pulse" />
                        <p className="text-[11px] font-bold text-[#001847]">Upload JPEG or PNG</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                          <FileText className="h-6 w-6 text-[#001847]" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-[#001847] truncate">{galleryUploadState.name}</p>
                            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden mt-1">
                              <div style={{ width: `${galleryUploadState.progress}%` }} className="h-full bg-emerald-500 transition-all duration-150" />
                            </div>
                          </div>
                          {!galleryUploadState.isUploading && (
                            <button 
                              type="button"
                              onClick={() => {
                                setGalleryUploadState(null);
                                setNewGalleryImage(prev => ({ ...prev, imageUrl: '' }));
                              }}
                              className="text-slate-400 hover:text-red-500 text-[11px] font-bold cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        {/* Visual Image Preview */}
                        {!galleryUploadState.isUploading && newGalleryImage.imageUrl && (
                          <div className="rounded-xl overflow-hidden aspect-video border border-slate-100 shadow-sm relative">
                            <img 
                              src={newGalleryImage.imageUrl} 
                              alt="Uploaded Preview" 
                              referrerPolicy="no-referrer"
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white text-[10px] font-black uppercase tracking-widest bg-emerald-600/90 px-2 py-1 rounded">
                                Image Sync Success
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Gallery Category</label>
                      <select 
                        value={newGalleryImage.category}
                        onChange={(e) => setNewGalleryImage(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        <option>Social March</option>
                        <option>State Conference</option>
                        <option>Rally</option>
                        <option>Vidyarthi Parishad Meet</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Region / District</label>
                      <select 
                        value={newGalleryImage.district}
                        onChange={(e) => setNewGalleryImage(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.nameEN}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={galleryUploadState?.isUploading}
                    className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {galleryUploadState?.isUploading ? 'Syncing Image...' : 'Deploy Media Asset'}
                  </button>
                </form>
              )}

              {/* News Announcement Composition */}
              {quickActionModal === 'news' && (
                <form onSubmit={handleAddNews} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Release Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Historic resolutions adopted in state meeting"
                      value={newNews.title}
                      onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Bulletin Type</label>
                      <select 
                        value={newNews.category}
                        onChange={(e) => setNewNews(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                      >
                        <option value="Press Release">Press Release</option>
                        <option value="Media Bulletin">Media Bulletin</option>
                        <option value="Resolution">Resolution</option>
                        <option value="Prant Declaration">Prant Declaration</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Author / Office</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="State Publicity Secretary"
                        value={newNews.author}
                        onChange={(e) => setNewNews(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">District Affinity</label>
                    <select 
                      value={newNews.district}
                      onChange={(e) => setNewNews(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs focus:ring-2 focus:ring-[#001847] outline-none cursor-pointer"
                    >
                      {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.nameEN}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Release Body Content</label>
                    <textarea 
                      required
                      placeholder="Write full press bulletin content..."
                      value={newNews.body}
                      onChange={(e) => setNewNews(prev => ({ ...prev, body: e.target.value }))}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#001847] focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#001847] hover:bg-[#002266] text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer">
                    Publish Release
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
