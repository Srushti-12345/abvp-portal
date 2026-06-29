import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, School, Building, Home, Gavel, Award, 
  BookOpen, HeartHandshake, ArrowRight, ExternalLink, Calendar, 
  Bell, Sparkles, Map, GraduationCap, Info, ShieldCheck, 
  HelpCircle, ChevronRight, X, Phone, Mail, FileText
} from 'lucide-react';

interface DirectoryPageProps {
  activeLang: 'EN' | 'MR';
  onJoinClick?: () => void;
}

interface Institution {
  id: string;
  name: string;
  nameMr: string;
  category: 'Universities' | 'Colleges' | 'Hostels' | 'Laws';
  categoryMr: string;
  division: 'Sambhajinagar' | 'Latur' | 'Nanded';
  divisionMr: string;
  district: 'Aurangabad' | 'Jalna' | 'Beed' | 'Nanded' | 'Latur' | 'Osmanabad';
  districtMr: string;
  description: string;
  descriptionMr: string;
  address: string;
  addressMr: string;
  image: string;
  website: string;
  phone: string;
  email: string;
  established: string;
  featured: boolean;
}

export default function DirectoryPage({ activeLang, onJoinClick }: DirectoryPageProps) {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Selected Institution for Modal Detail
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  useEffect(() => {
    const handleNavigation = (scrollId?: string, tabId?: string) => {
      const sId = scrollId || localStorage.getItem('navScrollTarget');
      const tId = tabId || localStorage.getItem('navTabTarget');

      if (tId) {
        setSelectedCategory(tId);
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

  // Active Law Accordion state
  const [activeLawIndex, setActiveLawIndex] = useState<number | null>(null);

  // Institution List Data
  const institutions = useMemo<Institution[]>(() => [
    {
      id: 'bamu',
      name: 'Dr. Babasaheb Ambedkar Marathwada University (BAMU)',
      nameMr: 'डॉ. बाबासाहेब आंबेडकर मराठवाडा विद्यापीठ (BAMU)',
      category: 'Universities',
      categoryMr: 'विद्यापीठ',
      division: 'Sambhajinagar',
      divisionMr: 'संभाजीनगर',
      district: 'Aurangabad',
      districtMr: 'छत्रपती संभाजीनगर',
      description: 'One of the oldest and most prestigious state universities in Maharashtra, catering to the educational needs of the Marathwada region.',
      descriptionMr: 'मराठवाडा विभागातील शैक्षणिक गरजा पूर्ण करणारे महाराष्ट्रातील सर्वात जुन्या आणि नामांकित राज्य विद्यापीठांपैकी एक.',
      address: 'University Campus, Near Soneri Mahal, Chhatrapati Sambhajinagar - 431004',
      addressMr: 'विद्यापीठ परिसर, सोनेरी महाल जवळ, छत्रपती संभाजीनगर - ४३१००४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVHbSiNqcjuSi7lamYB78QNE3H8H6wi8Wa671PAgqBMBQtqIsxg8Kei9wCnCggq32kcat9FA51WF8oi9ymT_sV3mEG1GXuRXCxyU9DKb9meATYxgiMevBah0d_lB3DwqivIeVrrzL5dsCaoX4yYr4BQldhsU19ldlCIOmliuGkyxMyp-AHaeav234CApxDufYehu9OIr0mX00fWuNhpb9wdBjWu9kZ4sTRCm81BlduDcFvGWPPaCz52NUSJc6lxZyCUWDLkpa_PClp',
      website: 'https://www.bamu.ac.in',
      phone: '+91 240 2403399',
      email: 'registrar@bamu.ac.in',
      established: '1958',
      featured: true
    },
    {
      id: 'srtmu',
      name: 'Swami Ramanand Teerth Marathwada University (SRTMU)',
      nameMr: 'स्वामी रामानंद तीर्थ मराठवाडा विद्यापीठ (SRTMU)',
      category: 'Universities',
      categoryMr: 'विद्यापीठ',
      division: 'Nanded',
      divisionMr: 'नांदेड',
      district: 'Nanded',
      districtMr: 'नांदेड',
      description: 'Serving the southern districts of Deogiri region, offering cutting-edge research, postgraduate courses, and vocational programs.',
      descriptionMr: 'देवगिरी प्रदेशातील दक्षिण जिल्ह्यांना सेवा देणारे, अत्याधुनिक संशोधन, पदव्युत्तर अभ्यासक्रम आणि व्यावसायिक कार्यक्रम देणारे विद्यापीठ.',
      address: 'Vishnupuri, Nanded - 431606',
      addressMr: 'विष्णूपुरी, नांदेड - ४३१६०६',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNwaWTR24xuB3ug0jyrI9k-pu1t3-WjYzWWA0aeoI7tVPDU72fErmTBECFQLEwhuxf1W3BtWryTH2KCavs_8f7j1Zg00AJtxOozMy5_9G7mwLKSdr2YSChCYSnC44CZqET4Q8_TRx5H_TckGr44dYEPPLP9DU3YnsBfI5gb32vZdgOIkgHucmy5THSvTl1IClNKfEuvhlU2MnOLecamtpmmHS6ZfFrIT3J-1HtXVT6ts8iPSu_uRPirW5-q0HGy5snNvQBqjt66out',
      website: 'https://www.srtmun.ac.in',
      phone: '+91 2462 229242',
      email: 'info@srtmun.ac.in',
      established: '1994',
      featured: true
    },
    {
      id: 'gmc-latur',
      name: 'Government Medical College (GMC)',
      nameMr: 'शासकीय वैद्यकीय महाविद्यालय (GMC)',
      category: 'Colleges',
      categoryMr: 'महाविद्यालय',
      division: 'Latur',
      divisionMr: 'लातूर',
      district: 'Latur',
      districtMr: 'लातूर',
      description: 'Latur\'s premier government-run medical education center equipped with state-of-the-art laboratory and multi-speciality hospital units.',
      descriptionMr: 'लातूरचे अग्रगण्य शासकीय वैद्यकीय शिक्षण केंद्र जे अत्याधुनिक प्रयोगशाळा आणि बहु-विशेषोपचार रुग्णालय युनिट्सने सुसज्ज आहे.',
      address: 'Near Gandhi Chowk, Latur - 413512',
      addressMr: 'गांधी चौक जवळ, लातूर - ४१३५१२',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUIGpSDB1KZDkNgj2QDXN53U8Sbf2gk576Gllq3BUX-OrcpnG4MQp66g7DHVhHMtlQDrinu_DlgH2_oF0d1V90yRR5x2u5mLAaC2Y75qEbaL6v8UPVcb9yz9gxgRkNlwaD7rpVzb49gWvQjhM2V6U8MN42nlMYRDbRru1Bt3mm5SrbLfCaz9XzDaCGsEjDO7m94g6H9eybdO7XHGKXHxov8coYSYI-NnLTLBQjbg5dla8kN9xcUY7GX0Y-tFxcyfVN1Fb3d9WWTpzV',
      website: 'https://www.gmclatur.org',
      phone: '+91 2382 253032',
      email: 'gmc_latur@rediffmail.com',
      established: '2002',
      featured: true
    },
    {
      id: 'jec-jalna',
      name: 'Jalna Engineering College (JEC)',
      nameMr: 'जालना अभियांत्रिकी महाविद्यालय (JEC)',
      category: 'Colleges',
      categoryMr: 'महाविद्यालय',
      division: 'Sambhajinagar',
      divisionMr: 'संभाजीनगर',
      district: 'Jalna',
      districtMr: 'जालना',
      description: 'Leading technical education provider focusing on industrial excellence, skill-based engineering courses, and placements.',
      descriptionMr: 'औद्योगिक उत्कृष्टता, कौशल्य-आधारित अभियांत्रिकी अभ्यासक्रम आणि प्लेसमेंटवर लक्ष केंद्रित करणारी आघाडीची तांत्रिक शिक्षण संस्था.',
      address: 'Industrial Area Phase 3, Jalna - 431203',
      addressMr: 'औद्योगिक क्षेत्र फेज ३, जालना - ४३१२०३',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc-IKjziuKSmN9LQlKW3VoGiDQSdrhwmzP0H-U5tUdciFYOfzaOzZbkLv0o2ex3dwVbF8xlPtjW2oJfFIVnNiOHECOPJwnJ1Kcm_mdwTPpAJY89rrXdQNgGtbDaqBlKtEDZ9GNW8GsxoT67lpSqIHxtrCwJSfLqV6lZgLw73oM01yH2moUvfyGi-PWMgcXrPj-f8iEsFEMJqIVShycOGmIdHJTtv8KsX2BWlm5OE5CI3mK_83J05JvkmN1nnukVz1uB9vWt8UBJyYK',
      website: 'https://www.jecjalna.edu.in',
      phone: '+91 2482 225341',
      email: 'contact@jecjalna.edu.in',
      established: '1998',
      featured: true
    },
    {
      id: 'deogiri-college',
      name: 'Deogiri College of Science & Arts',
      nameMr: 'देवगिरी विज्ञान व कला महाविद्यालय',
      category: 'Colleges',
      categoryMr: 'महाविद्यालय',
      division: 'Sambhajinagar',
      divisionMr: 'संभाजीनगर',
      district: 'Aurangabad',
      districtMr: 'छत्रपती संभाजीनगर',
      description: 'Prominent educational landmark of Chhatrapati Sambhajinagar, known for legacy in academic, sports and cultural arenas.',
      descriptionMr: 'शैक्षणिक, क्रीडा आणि सांस्कृतिक क्षेत्रातील वारशासाठी ओळखले जाणारे छत्रपती संभाजीनगरमधील प्रमुख शैक्षणिक केंद्र.',
      address: 'Railway Station Road, Chhatrapati Sambhajinagar - 431005',
      addressMr: 'रेल्वे स्टेशन रोड, छत्रपती संभाजीनगर - ४३१००५',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
      website: 'https://www.deogiricollege.org',
      phone: '+91 240 2367333',
      email: 'deogiricollege@yahoo.co.in',
      established: '1960',
      featured: false
    },
    {
      id: 'drb-hostel',
      name: 'Dr. Babasaheb Ambedkar Boys Govt Hostel',
      nameMr: 'डॉ. बाबासाहेब आंबेडकर शासकीय मुलांचे वसतिगृह',
      category: 'Hostels',
      categoryMr: 'वसतिगृह',
      division: 'Sambhajinagar',
      divisionMr: 'संभाजीनगर',
      district: 'Aurangabad',
      districtMr: 'छत्रपती संभाजीनगर',
      description: 'Fully subsidized government hostel offering residential, mess and library amenities for social welfare students.',
      descriptionMr: 'समाजकल्याण विभागातील विद्यार्थ्यांसाठी निवासी, भोजन आणि वाचनालय सुविधा देणारे पूर्णतः अनुदानित शासकीय वसतिगृह.',
      address: 'Subhedar Kabar Area, Cantonment, Chhatrapati Sambhajinagar',
      addressMr: 'सुभेदार कबर परिसर, कॅन्टोन्मेंट, छत्रपती संभाजीनगर',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=80',
      website: '#',
      phone: '+91 240 2300451',
      email: 'swd.aurangabad@maharashtra.gov.in',
      established: '1982',
      featured: false
    },
    {
      id: 'savitribai-hostel',
      name: 'Savitribai Phule Govt Girls Hostel',
      nameMr: 'क्रांतीज्योती सावित्रीबाई फुले शासकीय मुलींचे वसतिगृह',
      category: 'Hostels',
      categoryMr: 'वसतिगृह',
      division: 'Latur',
      divisionMr: 'लातूर',
      district: 'Latur',
      districtMr: 'लातूर',
      description: 'Dedicated safe housing and high-quality nourishment resources for girls seeking higher education in Latur district.',
      descriptionMr: 'लातूर जिल्ह्यात उच्च शिक्षण घेऊ इच्छिणाऱ्या विद्यार्थिनींसाठी समर्पित सुरक्षित निवास आणि उच्च दर्जाचे भोजन सुविधा.',
      address: 'Ausa Road, Near Rajiv Gandhi Park, Latur',
      addressMr: 'औसा रोड, राजीव गांधी पार्क जवळ, लातूर',
      image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop&q=80',
      website: '#',
      phone: '+91 2382 245991',
      email: 'swd.latur@maharashtra.gov.in',
      established: '1995',
      featured: false
    },
    {
      id: 'poly-beed',
      name: 'Government Polytechnic College',
      nameMr: 'शासकीय तंत्रनिकेतन महाविद्यालय, बीड',
      category: 'Colleges',
      categoryMr: 'महाविद्यालय',
      division: 'Latur',
      divisionMr: 'लातूर',
      district: 'Beed',
      districtMr: 'बीड',
      description: 'State-owned engineering diploma institute providing high-quality technical pedagogy and mechanical laboratory systems.',
      descriptionMr: 'उच्च दर्जाचे तांत्रिक शिक्षण आणि मेकॅनिकल प्रयोगशाळा प्रणाली प्रदान करणारी राज्य मालकीची अभियांत्रिकी पदविका संस्था.',
      address: 'Nagar Road, Beed - 431122',
      addressMr: 'नगर रोड, बीड - ४३११२२',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80',
      website: 'https://www.gpbeed.ac.in',
      phone: '+91 2442 222609',
      email: 'office.gpbeed@dtemaharashtra.gov.in',
      established: '1984',
      featured: false
    },
    {
      id: 'shahu-hostel',
      name: 'Chhatrapati Shahu Maharaj Welfare Hostel',
      nameMr: 'छत्रपती राजर्षी शाहू महाराज समाजकल्याण वसतिगृह',
      category: 'Hostels',
      categoryMr: 'वसतिगृह',
      division: 'Sambhajinagar',
      divisionMr: 'संभाजीनगर',
      district: 'Osmanabad',
      districtMr: 'उस्मानाबाद (धाराशिव)',
      description: 'Affordable residential and mental development library facilities for rural migrant scholars.',
      descriptionMr: 'ग्रामीण भागातून येणाऱ्या स्थलांतरित विद्यार्थ्यांसाठी परवडणारे निवासी आणि वाचनालय सुविधा.',
      address: 'Solapur Road, Dharashiv - 413501',
      addressMr: 'सोलापूर रोड, धाराशिव - ४१३५०१',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
      website: '#',
      phone: '+91 2472 222452',
      email: 'swd.osmanabad@maharashtra.gov.in',
      established: '1991',
      featured: false
    }
  ], []);

  // Filter logic
  const filteredInstitutions = useMemo(() => {
    return institutions.filter(inst => {
      // 1. Search Query
      const matchesSearch = searchQuery.trim() === '' || 
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.nameMr.includes(searchQuery) ||
        inst.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.category.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Division filter
      const matchesDivision = selectedDivision === 'All' || inst.division === selectedDivision;

      // 3. District filter
      const matchesDistrict = selectedDistrict === 'All' || inst.district === selectedDistrict;

      // 4. Category filter
      const matchesCategory = selectedCategory === 'All' || inst.category === selectedCategory;

      return matchesSearch && matchesDivision && matchesDistrict && matchesCategory;
    });
  }, [institutions, searchQuery, selectedDivision, selectedDistrict, selectedCategory]);

  // District options based on Division
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'All') {
      return ['Aurangabad', 'Jalna', 'Beed', 'Nanded', 'Latur', 'Osmanabad'];
    }
    if (selectedDivision === 'Sambhajinagar') {
      return ['Aurangabad', 'Jalna', 'Beed'];
    }
    if (selectedDivision === 'Latur') {
      return ['Latur', 'Osmanabad', 'Beed'];
    }
    if (selectedDivision === 'Nanded') {
      return ['Nanded'];
    }
    return [];
  }, [selectedDivision]);

  // Handle Map District Click
  const handleMapDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    const inst = institutions.find(i => i.district === district);
    if (inst) {
      if (inst.division === 'Sambhajinagar') setSelectedDivision('Sambhajinagar');
      else if (inst.division === 'Latur') setSelectedDivision('Latur');
      else if (inst.division === 'Nanded') setSelectedDivision('Nanded');
    }
    // Scroll to results
    const element = document.getElementById('directory-results');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const educationalLaws = [
    {
      title: 'Maharashtra Public Universities Act, 2016',
      titleMr: 'महाराष्ट्र सार्वजनिक विद्यापीठ कायदा, २०१६',
      bullets: [
        'Mandates democratic student councils representing each department and affiliated college.',
        'Regulates equal academic representation and safety rules for female students.',
        'Guarantees transparent examination, revaluation process within stipulated timeframes.'
      ],
      bulletsMr: [
        'प्रत्येक विभाग आणि संलग्न महाविद्यालयाचे प्रतिनिधित्व करणाऱ्या लोकशाही विद्यार्थी परिषदेची निर्मिती अनिवार्य करते.',
        'विद्यार्थिनींच्या सुरक्षेचे नियम आणि समान शैक्षणिक प्रतिनिधित्वाचे नियमन करते.',
        'ठराविक मुदतीत परीक्षा आणि पुनर्मूल्यांकन प्रक्रियेच्या पारदर्शकतेची हमी देते.'
      ]
    },
    {
      title: 'Right to Education (RTE) Admission Audit',
      titleMr: 'शिक्षण हक्क कायदा (RTE) प्रवेश ऑडिट',
      bullets: [
        'Provides 25% reservation in entry-level classes in private unaided schools for weaker sections.',
        'Strictly prohibits capitation fees and screening procedures during admission stages.',
        'Maintains state monitoring dashboards which are periodically audited by youth forums.'
      ],
      bulletsMr: [
        'दुर्बल घटकांसाठी खाजगी विनाअनुदानित शाळांमधील प्रवेश पातळीवरील वर्गांमध्ये २५% आरक्षण प्रदान करते.',
        'प्रवेशाच्या वेळी कॅपिटेशन फी (देणगी) घेण्यास आणि स्क्रीनिंग प्रक्रियेस सक्त मनाई करते.',
        'युवा मंचाद्वारे नियमितपणे ऑडिट केल्या जाणाऱ्या राज्य देखरेख डॅशबोर्डचे संचलन करते.'
      ]
    },
    {
      title: 'Anti-Ragging Regulatory Act & Guidelines',
      titleMr: 'रॅगिंग विरोधी नियामक कायदा आणि मार्गदर्शक तत्त्वे',
      bullets: [
        'Constitutes active student-led committees to monitor classrooms, hostels and cafeterias.',
        'Demands immediate severe suspensions and legal registration for verified perpetrators.',
        'Requires 24/7 dedicated helpline numbers displayed prominently across campuses.'
      ],
      bulletsMr: [
        'वर्ग, वसतिगृहे आणि कॅफेटेरियावर लक्ष ठेवण्यासाठी सक्रिय विद्यार्थी-प्रणित समित्यांची स्थापना करते.',
        'दोषी सिद्ध झालेल्यांवर तात्काळ निलंबन आणि फौजदारी गुन्हा दाखल करण्याची मागणी करते.',
        'परिसरात ठळकपणे २४/७ हेल्पलाईन क्रमांक प्रदर्शित करणे अनिवार्य करते.'
      ]
    }
  ];

  const representatives = [
    { name: 'Kunal Deshmukh', nameMr: 'कुणाल देशमुख', district: 'Aurangabad', districtMr: 'छत्रपती संभाजीनगर', phone: '+91 98345 61284', role: 'Prant Convener' },
    { name: 'Shruti Kulkarni', nameMr: 'श्रुती कुलकर्णी', district: 'Latur', districtMr: 'लातूर', phone: '+91 94213 45876', role: 'District Coordinator' },
    { name: 'Aditya Joshi', nameMr: 'आदित्य जोशी', district: 'Nanded', districtMr: 'नांदेड', phone: '+91 88884 12596', role: 'University Representative' },
    { name: 'Prathamesh Patil', nameMr: 'प्रथमेश पाटील', district: 'Jalna', districtMr: 'जालना', phone: '+91 75071 89324', role: 'Town Lead' }
  ];

  const latestUpdates = [
    {
      type: 'Govt Circular',
      typeMr: 'शासकीय परिपत्रक',
      title: 'New Private College Fee Regulation Policy',
      titleMr: 'खाजगी महाविद्यालय शुल्क नियमन धोरण जाहीर',
      date: '24 Oct 2023',
      color: 'border-rose-500 text-rose-500 bg-rose-50'
    },
    {
      type: 'University Notice',
      typeMr: 'विद्यापीठ सूचना',
      title: 'BAMU Winter Examination Schedule Released',
      titleMr: 'BAMU हिवाळी परीक्षा वेळापत्रक प्रसिद्ध',
      date: '22 Oct 2023',
      color: 'border-blue-500 text-blue-500 bg-blue-50'
    },
    {
      type: 'Admission Update',
      typeMr: 'प्रवेश अपडेट',
      title: 'Social Welfare Hostels Open Registration Stage 2',
      titleMr: 'समाजकल्याण वसतिगृह नोंदणी टप्पा २ सुरू',
      date: '20 Oct 2023',
      color: 'border-emerald-500 text-emerald-500 bg-emerald-50'
    }
  ];

  return (
    <div className="flex-grow bg-[#F8F9FA] text-[#121c2a]">
      
      {/* 1. Page Title Hero */}
      <section className="relative w-full h-[65vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="ABVP Youth Rally Activities" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5V9HpJttzJgfJJQStpIrOSIkKSxSBeEQfvVvxBbqzalw9MYKeWecVoAwMbHmlrWiszx71uS2q42k8QgFeWOKWqpr9kA8tRvvunLdCQq0pyEfqpnaVYqs6bKF9_KR52BTyaOmB54twDuhkigOUkDiCPN4-IPdPgKcKIkf5AL9rfWETkIjfvy3PhM2_tXJTYCaMs6I_0OmnPtlzkYTheOcx7oUwreDnkc5i7ND-Z-3aIISp3IaP2yqnAlkxHY9p_pkLzq-azhgTFb-e" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001847]/95 to-[#001847]/45"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-white text-left">
          <span className="inline-block px-4 py-1 bg-[#fc820c] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider mb-6">
            {activeLang === 'EN' ? 'Digital Resources' : 'डिजिटल संसाधने'}
          </span>
          <h1 className="font-sans font-black text-5xl sm:text-6xl text-white mb-6 leading-tight">
            {activeLang === 'EN' ? 'Educational Directory' : 'शैक्षणिक निर्देशिका'}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-white/95 mb-10 max-w-2xl leading-relaxed font-light">
            {activeLang === 'EN' 
              ? 'Helping Students Discover Educational Institutions, Resources, and Opportunities Across Deogiri Prant.'
              : 'देवगिरी प्रांतातील शैक्षणिक संस्था, संसाधने आणि संधी शोधण्यात विद्यार्थ्यांना मदत करणे.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => {
                const element = document.getElementById('search-filter-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold rounded-lg hover:scale-103 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{activeLang === 'EN' ? 'Explore Directory' : 'निर्देशिका शोधा'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={onJoinClick}
              className="px-8 py-4 border-2 border-white/30 text-white font-extrabold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
            >
              {activeLang === 'EN' ? 'Contact Representative' : 'अभाविप प्रतिनिधी संपर्क'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Filter Section */}
      <section id="search-filter-section" className="relative -mt-16 z-30 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder={activeLang === 'EN' ? 'Search Universities, Colleges, Hostels...' : 'विद्यापीठे, महाविद्यालये, वसतिगृहे शोधा...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-[#001847] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fc820c] focus:border-transparent transition-all"
              />
            </div>

            {/* Division Selector */}
            <div className="relative">
              <select 
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('All'); // reset district on division shift
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#fc820c] cursor-pointer appearance-none"
              >
                <option value="All">{activeLang === 'EN' ? 'All Divisions' : 'सर्व विभाग'}</option>
                <option value="Sambhajinagar">{activeLang === 'EN' ? 'Sambhajinagar' : 'संभाजीनगर'}</option>
                <option value="Latur">{activeLang === 'EN' ? 'Latur' : 'लातूर'}</option>
                <option value="Nanded">{activeLang === 'EN' ? 'Nanded' : 'नांदेड'}</option>
              </select>
            </div>

            {/* District Selector */}
            <div className="relative">
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#fc820c] cursor-pointer"
              >
                <option value="All">{activeLang === 'EN' ? 'All Districts' : 'सर्व जिल्हे'}</option>
                {availableDistricts.map(dist => (
                  <option key={dist} value={dist}>
                    {activeLang === 'EN' ? dist : (dist === 'Aurangabad' ? 'छत्रपती संभाजीनगर' : dist === 'Osmanabad' ? 'धाराशिव' : dist)}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Popular Keywords */}
          <div className="flex flex-wrap gap-2.5 mt-6 items-center text-left">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">
              {activeLang === 'EN' ? 'Popular Queries:' : 'लोकप्रिय शोध:'}
            </span>
            <button 
              onClick={() => { setSearchQuery('BAMU'); setSelectedCategory('Universities'); }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-[#001847] hover:text-white rounded-full text-xs text-[#001847] font-semibold transition-all cursor-pointer"
            >
              BAMU University
            </button>
            <button 
              onClick={() => { setSelectedCategory('Colleges'); setSearchQuery('Medical'); }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-[#001847] hover:text-white rounded-full text-xs text-[#001847] font-semibold transition-all cursor-pointer"
            >
              Medical Colleges
            </button>
            <button 
              onClick={() => { setSelectedCategory('Hostels'); setSearchQuery(''); }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-[#001847] hover:text-white rounded-full text-xs text-[#001847] font-semibold transition-all cursor-pointer"
            >
              Student Hostels
            </button>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedDivision('All'); setSelectedDistrict('All'); setSelectedCategory('All'); }}
              className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-xs font-bold transition-all ml-auto flex items-center gap-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* 3. Educational Support Guidance Banner */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          <div className="space-y-6">
            <span className="text-[#fc820c] font-bold tracking-widest uppercase text-xs sm:text-sm block">
              {activeLang === 'EN' ? 'STUDENT ASSISTANCE' : 'विद्यार्थी मार्गदर्शन'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] leading-tight">
              {activeLang === 'EN' ? 'Empowering Students through Knowledge' : 'माहिती व ज्ञानाद्वारे विद्यार्थ्यांचे सबलीकरण'}
            </h2>
            <div className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p>
                {activeLang === 'EN' 
                  ? 'The ABVP Deogiri Educational Directory is a comprehensive digital portal designed to bridge the gap between students and educational resources. Our mission is to ensure every student in the Deogiri region has transparent access to institutional data, accommodation support, and scholarship pathways.'
                  : 'अभाविप देवगिरी शैक्षणिक निर्देशिका हे विद्यार्थ्यांमधील आणि शैक्षणिक संसाधनांमधील दरी मिटवण्यासाठी तयार केलेले एक सर्वसमावेशक डिजिटल दालन आहे. देवगिरी विभागातील प्रत्येक विद्यार्थ्याला शैक्षणिक संस्था, निवासाची सोय आणि शिष्यवृत्तीचा थेट लाभ मिळावा यासाठी आम्ही कटिबद्ध आहोत.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[#fc820c] bg-orange-50 p-2.5 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Verified Resources' : 'सत्यापित संसाधने'}
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    {activeLang === 'EN' ? 'All institutional datasets are regularly verified on-ground by dedicated ABVP volunteers.' : 'सर्व संस्थांचे डेटासेट नियमितपणे अभाविपच्या कार्यकर्त्यांद्वारे थेट जाऊन पडताळले जातात.'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[#fc820c] bg-orange-50 p-2.5 rounded-lg flex items-center justify-center">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-[#001847] text-sm">
                    {activeLang === 'EN' ? 'Constant Helpdesk Support' : 'सतत हेल्पडेस्क सहाय्यता'}
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    {activeLang === 'EN' ? 'Get direct mentorship and advocacy help regarding admission discrepancies and rights.' : 'प्रवेशातील अडचणी आणि हक्कांच्या रक्षणासाठी अभाविप हेल्पडेस्ककडून थेट मार्गदर्शन मिळवा.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVlkzIwprUGJv839rMa-zOy7N2RcRc9CtufcfdofT0RW87ruB-2oX9ZMHz2AFAj8R1ntv4Xd0Ubdhcb3tvDfuT083EZuj-MPvU_CJKNHc2WucUgHXaomZz76Ap_09NpeziTEUtSoPcNK2IINucgVakBnXnxF1bcb9t6N6qZhrKmYbMi46tnWRIj9EolORX7dEfltZIFOJ_cVWpoG3YctX9qo02iEP2OuiYjKs6y0KhQB5spfa1wBWZjRnEa7qQ4aQLgVeVf8DwoaVC"
              alt="Students Educational Planning"
              className="rounded-2xl shadow-2xl relative z-10 w-full h-[450px] object-cover border-4 border-white"
            />
            <div className="absolute -bottom-6 -right-6 p-6 bg-[#001847] text-white rounded-xl shadow-xl z-20 hidden lg:block">
              <p className="text-2xl font-bold">25+ Years</p>
              <p className="text-xs opacity-80">{activeLang === 'EN' ? 'of Student Advocacy' : 'विद्यार्थी संघर्ष व सेवा वारसा'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Statistics Ribbon */}
      <section className="bg-[#001847] py-16 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center relative z-10">
          <div>
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-orange-400 mb-2">12+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              {activeLang === 'EN' ? 'Universities' : 'विद्यापीठे'}
            </p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-orange-400 mb-2">450+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              {activeLang === 'EN' ? 'Colleges' : 'महाविद्यालये'}
            </p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-orange-400 mb-2">85+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              {activeLang === 'EN' ? 'Hostels' : 'वसतिगृहे'}
            </p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-orange-400 mb-2">1,200+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              {activeLang === 'EN' ? 'Total Institutions' : 'एकूण शैक्षणिक संस्था'}
            </p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-orange-400 mb-2">50k+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-300 font-bold">
              {activeLang === 'EN' ? 'Students Benefited' : 'लाभार्थी विद्यार्थी'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Browse Categories Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-center text-left mb-16">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'CATEGORIES' : 'विभागवार वर्गीकरण'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Browse Directory Categories' : 'निर्देशिका वर्ग एक्सप्लोर करा'}
            </h2>
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'Quickly jump to specialized fields of study, housing lists, and educational rights guidelines.'
                : 'अभ्यासक्रम, निवास यादी आणि शैक्षणिक हक्कांच्या थेट दालनात त्वरित प्रवेश मिळवा.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Category: Universities */}
            <div 
              onClick={() => { setSelectedCategory('Universities'); }}
              className={`p-8 bg-white border rounded-3xl text-left cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-500/30 group ${selectedCategory === 'Universities' ? 'border-[#fc820c] ring-2 ring-[#fc820c]/10' : 'border-slate-200/60'}`}
            >
              <div className="p-4 bg-orange-50 rounded-2xl w-max text-[#fc820c] mb-6 group-hover:scale-110 transition-transform">
                <School className="h-7 w-7" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-[#001847] mb-2">
                {activeLang === 'EN' ? 'Universities' : 'विद्यापीठे'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {activeLang === 'EN' 
                  ? 'Affiliated state, private, and deemed universities within the Deogiri Prant.'
                  : 'देवगिरी प्रांतातील संलग्न शासकीय, खाजगी आणि अभिमत विद्यापीठे.'}
              </p>
              <span className="text-xs font-black text-[#fc820c] tracking-wider uppercase flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
                <span>{activeLang === 'EN' ? 'Explore Universities' : 'विद्यापीठ सूची पहा'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Category: Colleges */}
            <div 
              onClick={() => { setSelectedCategory('Colleges'); }}
              className={`p-8 bg-white border rounded-3xl text-left cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-500/30 group ${selectedCategory === 'Colleges' ? 'border-[#fc820c] ring-2 ring-[#fc820c]/10' : 'border-slate-200/60'}`}
            >
              <div className="p-4 bg-orange-50 rounded-2xl w-max text-[#fc820c] mb-6 group-hover:scale-110 transition-transform">
                <Building className="h-7 w-7" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-[#001847] mb-2">
                {activeLang === 'EN' ? 'Colleges' : 'महाविद्यालये'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {activeLang === 'EN' 
                  ? 'Detailed directory of Science, Arts, Commerce, and Professional Degree Colleges.'
                  : 'विज्ञान, कला, वाणिज्य आणि व्यावसायिक पदवी महाविद्यालयांची सविस्तर माहिती.'}
              </p>
              <span className="text-xs font-black text-[#fc820c] tracking-wider uppercase flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
                <span>{activeLang === 'EN' ? 'Explore Colleges' : 'महाविद्यालये सूची पहा'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Category: Hostels */}
            <div 
              onClick={() => { setSelectedCategory('Hostels'); }}
              className={`p-8 bg-white border rounded-3xl text-left cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-500/30 group ${selectedCategory === 'Hostels' ? 'border-[#fc820c] ring-2 ring-[#fc820c]/10' : 'border-slate-200/60'}`}
            >
              <div className="p-4 bg-orange-50 rounded-2xl w-max text-[#fc820c] mb-6 group-hover:scale-110 transition-transform">
                <Home className="h-7 w-7" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-[#001847] mb-2">
                {activeLang === 'EN' ? 'Student Hostels' : 'मुला-मुलींची वसतिगृहे'}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {activeLang === 'EN' 
                  ? 'Government-run, social welfare, and private boarding facilities for migrant students.'
                  : 'स्थलांतरित विद्यार्थ्यांसाठी शासकीय, समाजकल्याण आणि खाजगी वसतिगृहे आणि खोल्यांची माहिती.'}
              </p>
              <span className="text-xs font-black text-[#fc820c] tracking-wider uppercase flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
                <span>{activeLang === 'EN' ? 'Explore Accommodations' : 'वसतिगृहे सूची पहा'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Dynamic Result Set Display */}
      <section id="directory-results" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-8 mb-12">
            <div className="text-left">
              <h3 className="font-sans font-extrabold text-2xl text-[#001847] flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-[#fc820c]" />
                {activeLang === 'EN' ? 'Institutional Records' : 'शैक्षणिक संस्था शोध परिणाम'}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {activeLang === 'EN' 
                  ? `Showing ${filteredInstitutions.length} institutions matching selected filters`
                  : `निवडलेल्या फिल्टरनुसार एकूण ${filteredInstitutions.length} संस्था उपलब्ध आहेत`}
              </p>
            </div>
            
            {/* Filters summary badges */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {selectedDivision !== 'All' && (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>{activeLang === 'EN' ? `Div: ${selectedDivision}` : `विभाग: ${selectedDivision}`}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDivision('All')} />
                </span>
              )}
              {selectedDistrict !== 'All' && (
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>{activeLang === 'EN' ? `Dist: ${selectedDistrict}` : `जिल्हा: ${selectedDistrict}`}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDistrict('All')} />
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>{activeLang === 'EN' ? `Cat: ${selectedCategory}` : `श्रेणी: ${selectedCategory}`}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                </span>
              )}
            </div>
          </div>

          {filteredInstitutions.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Info className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                {activeLang === 'EN' ? 'No Records Found' : 'कोणताही रेकॉर्ड सापडला नाही'}
              </h4>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                {activeLang === 'EN' 
                  ? 'We could not find any institutions matching your exact search. Try resetting filters or choosing different districts.' 
                  : 'तुमच्या शोध निकषांशी जुळणारे रेकॉर्ड आढळले नाही. कृपया शोध शब्द बदला किंवा फिल्टर रिसेट करा.'}
              </p>
              <button 
                onClick={() => { setSelectedDivision('All'); setSelectedDistrict('All'); setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-6 px-6 py-2.5 bg-[#fc820c] text-white font-extrabold text-xs rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
              >
                {activeLang === 'EN' ? 'Clear All Filters' : 'सर्व फिल्टर काढा'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredInstitutions.map((inst) => (
                  <motion.div 
                    key={inst.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group"
                  >
                    <div>
                      <div className="h-52 bg-slate-100 overflow-hidden relative">
                        <img 
                          src={inst.image} 
                          alt={inst.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 right-4 bg-[#001847]/90 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-sm">
                          {activeLang === 'EN' ? inst.category : inst.categoryMr}
                        </span>
                        {inst.featured && (
                          <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {activeLang === 'EN' ? 'FEATURED' : 'वैशिष्ट्यपूर्ण'}
                          </span>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex gap-2 items-center text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                          <MapPin className="h-3.5 w-3.5 text-[#fc820c]" />
                          <span>{activeLang === 'EN' ? inst.district : inst.districtMr}</span>
                        </div>
                        <h4 className="font-sans font-extrabold text-[#001847] text-lg mb-3 line-clamp-2">
                          {activeLang === 'EN' ? inst.name : inst.nameMr}
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                          {activeLang === 'EN' ? inst.description : inst.descriptionMr}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button 
                        onClick={() => setSelectedInstitution(inst)}
                        className="w-full py-3 bg-slate-50 border border-slate-200 text-xs font-black tracking-wider text-[#001847] hover:bg-[#fc820c] hover:text-white hover:border-transparent rounded-xl transition-all cursor-pointer text-center uppercase"
                      >
                        {activeLang === 'EN' ? 'View Details' : 'तपशील पहा'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 7. Interactive Map & Latest Announcements Block */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Interactive District Map Panel */}
            <div className="lg:col-span-2 text-left space-y-6">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#001847] flex items-center gap-3">
                <Map className="h-7 w-7 text-[#fc820c]" />
                {activeLang === 'EN' ? 'Regional Map Access' : 'प्रादेशिक जिल्हावार नकाशा'}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                {activeLang === 'EN' 
                  ? 'Click on any district within Deogiri Prant on the map to automatically filter universities and student hostels in that region.'
                  : 'नकाशातील कोणत्याही जिल्ह्यावर क्लिक करून त्या भागातील उपलब्ध विद्यापीठे व शासकीय वसतिगृहे त्वरित शोधा.'}
              </p>

              <div className="bg-slate-200 border border-slate-300 rounded-3xl h-[480px] relative overflow-hidden group shadow-inner">
                <img 
                  alt="Deogiri Regional Map" 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-102 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgjCXbMDnvU2wZrSjzo3rjBZXhpJ8FrvXybFCaKwtXDkIvNw03xZD8Xdt6BlZK3lBeLjKYKLwaCJPw2N08ZzPi7d2hMLNVfBHzJD0VjtdWMhKEGOb26ndXBA0WYnTcaR5xibVGe4chSpwsyprNncwIKavKPkSm1c-srMhy84Y0_RnH-xCXaD9oOdfeIB1Vr3lvWT6qdhkxlz53JeaCBTFNHAsKsr9gYGvYBCOseDBQDE5TxW7M1va9KY5QF9_nmG9Jjz9KQAUpIUCC"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated Map Pins */}
                {/* Aurangabad Pin */}
                <button 
                  onClick={() => handleMapDistrictClick('Aurangabad')}
                  className="absolute top-[25%] left-[30%] bg-[#001847] hover:bg-[#fc820c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 group/pin"
                >
                  <MapPin className="h-3 w-3 text-orange-400 group-hover/pin:text-white" />
                  <span>{activeLang === 'EN' ? 'Sambhajinagar' : 'संभाजीनगर'}</span>
                </button>

                {/* Jalna Pin */}
                <button 
                  onClick={() => handleMapDistrictClick('Jalna')}
                  className="absolute top-[32%] left-[55%] bg-[#001847] hover:bg-[#fc820c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 group/pin"
                >
                  <MapPin className="h-3 w-3 text-orange-400 group-hover/pin:text-white" />
                  <span>{activeLang === 'EN' ? 'Jalna' : 'जालना'}</span>
                </button>

                {/* Beed Pin */}
                <button 
                  onClick={() => handleMapDistrictClick('Beed')}
                  className="absolute top-[55%] left-[40%] bg-[#001847] hover:bg-[#fc820c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 group/pin"
                >
                  <MapPin className="h-3 w-3 text-orange-400 group-hover/pin:text-white" />
                  <span>{activeLang === 'EN' ? 'Beed' : 'बीड'}</span>
                </button>

                {/* Nanded Pin */}
                <button 
                  onClick={() => handleMapDistrictClick('Nanded')}
                  className="absolute top-[48%] right-[10%] bg-[#001847] hover:bg-[#fc820c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 group/pin"
                >
                  <MapPin className="h-3 w-3 text-orange-400 group-hover/pin:text-white" />
                  <span>{activeLang === 'EN' ? 'Nanded' : 'नांडेड'}</span>
                </button>

                {/* Latur Pin */}
                <button 
                  onClick={() => handleMapDistrictClick('Latur')}
                  className="absolute bottom-[20%] right-[25%] bg-[#001847] hover:bg-[#fc820c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 group/pin"
                >
                  <MapPin className="h-3 w-3 text-orange-400 group-hover/pin:text-white" />
                  <span>{activeLang === 'EN' ? 'Latur' : 'लातूर'}</span>
                </button>

                {/* Osmanabad Pin */}
                <button 
                  onClick={() => handleMapDistrictClick('Osmanabad')}
                  className="absolute bottom-[15%] left-[32%] bg-[#001847] hover:bg-[#fc820c] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 group/pin"
                >
                  <MapPin className="h-3 w-3 text-orange-400 group-hover/pin:text-white" />
                  <span>{activeLang === 'EN' ? 'Dharashiv' : 'धाराशिव'}</span>
                </button>

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 text-[11px] font-bold text-[#001847]">
                  💡 {activeLang === 'EN' ? 'Click on a district to filter the directory instantly' : 'नकाशातील जिल्ह्यावर क्लिक करून फिल्टर करा'}
                </div>
              </div>
            </div>

            {/* Latest Announcements Alerts column */}
            <div className="text-left space-y-6">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#001847] flex items-center gap-3">
                <Bell className="h-7 w-7 text-[#fc820c]" />
                {activeLang === 'EN' ? 'Latest Circulars' : 'महत्वाच्या घोषणा'}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                {activeLang === 'EN' 
                  ? 'Stay informed about government educational regulations, university directives, and scholarship programs.'
                  : 'शैक्षणिक क्षेत्रातील शासन निर्णय, फी कपात, शासकीय आदेश आणि इतर आवश्यक सूचना येथे पहा.'}
              </p>

              <div className="space-y-4">
                {latestUpdates.map((update, idx) => (
                  <div 
                    key={idx}
                    className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border-l-4"
                    style={{ borderLeftColor: update.color.includes('rose') ? '#ef4444' : update.color.includes('emerald') ? '#10b981' : '#3b82f6' }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#fc820c]">
                        {activeLang === 'EN' ? update.type : update.typeMr}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{update.date}</span>
                    </div>
                    <h4 className="font-sans font-extrabold text-[#001847] text-sm group-hover:text-[#fc820c] transition-colors line-clamp-2">
                      {activeLang === 'EN' ? update.title : update.titleMr}
                    </h4>
                  </div>
                ))}

                <button 
                  onClick={onJoinClick}
                  className="w-full py-4 bg-slate-100 hover:bg-[#001847] hover:text-white text-slate-600 font-bold text-xs rounded-xl transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {activeLang === 'EN' ? 'Subscribe to notifications' : 'नवीनतम सूचनांसाठी नोंदणी करा'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Educational Laws Section */}
      <section id="laws-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="text-center mb-16">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'KNOW YOUR RIGHTS' : 'तुमचे हक्क जाणून घ्या'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Educational Laws & Right-to-Study' : 'शैक्षणिक कायदे आणि विद्यार्थी हक्क अधिकार'}
            </h2>
            <p className="text-slate-500 font-sans text-sm mt-3 leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'We empower students to raise voices against arbitrary fees, mental harassment, and undemocratic campus policies.'
                : 'महाविद्यालयांची मनमानी फी वाढ, मानसिक छळ आणि बेकायदेशीर धोरणांविरुद्ध आवाज उठवण्यासाठी कायदेशीर मार्गदर्शन.'}
            </p>
          </div>

          <div className="space-y-4">
            {educationalLaws.map((law, idx) => (
              <div 
                key={idx}
                className="border border-slate-200/60 rounded-2xl overflow-hidden bg-slate-50"
              >
                <button 
                  onClick={() => setActiveLawIndex(activeLawIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left font-sans font-extrabold text-base text-[#001847] hover:bg-slate-100 transition-colors focus:outline-none"
                >
                  <span>{activeLang === 'EN' ? law.title : law.titleMr}</span>
                  <ChevronRight 
                    className={`h-5 w-5 text-[#fc820c] transition-transform duration-300 ${activeLawIndex === idx ? 'rotate-90' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeLawIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-white border-t border-slate-100 text-sm text-slate-600 leading-relaxed space-y-3 font-light">
                        {(activeLang === 'EN' ? law.bullets : law.bulletsMr).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-3 items-start">
                            <span className="p-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] mt-0.5">
                              <ShieldCheck className="h-3.5 w-3.5" />
                            </span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. District Representatives Contacts */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-center text-left mb-16">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'DISTRICT CONTACTS' : 'जिल्हा संपर्क संपर्कप्रमुख'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Get Help From Student representatives' : 'अभाविप विद्यार्थी हेल्पडेस्क संपर्क प्रमुख'}
            </h2>
            <p className="text-slate-500 font-sans text-sm mt-3 leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'Facing issues with your college admission, hostel allotment, or examinations? Reach out directly.'
                : 'महाविद्यालयीन प्रवेश, वसतिगृह वाटप किंवा परीक्षा हॉल तिकिटात समस्या आहे का? त्वरित संपर्क करा.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {representatives.map((rep, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <span className="bg-[#fc820c]/10 text-[#fc820c] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md inline-block mb-4">
                    {activeLang === 'EN' ? rep.district : rep.districtMr}
                  </span>
                  <h4 className="font-sans font-extrabold text-[#001847] text-base mb-1">{activeLang === 'EN' ? rep.name : rep.nameMr}</h4>
                  <p className="text-slate-400 text-xs font-semibold mb-6">{rep.role}</p>
                </div>
                <a 
                  href={`tel:${rep.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-xs font-black text-[#001847] hover:text-[#fc820c] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#fc820c]" />
                  <span>{rep.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Call to Action */}
      <section className="py-24 bg-[#001847] text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#fc820c]/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white mb-6">
            {activeLang === 'EN' 
              ? 'Empowering Students Through Accessible Educational Information' 
              : 'पारदर्शक माहितीद्वारे विद्यार्थ्यांच्या प्रगतीला नवा मार्ग देणार'}
          </h2>
          <p className="text-slate-200 font-sans text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {activeLang === 'EN'
              ? 'Be part of the movement. Join ABVP Deogiri to contribute to the student welfare ecosystem or contact us for personalized support.'
              : 'विद्यार्थी हिताच्या या चळवळीत सहभागी व्हा. अभाविप देवगिरी सोबत जोडले जाण्यासाठी आजच अर्ज करा किंवा मार्गदर्शन मिळवा.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={onJoinClick}
              className="px-8 py-4 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold rounded-lg hover:scale-103 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{activeLang === 'EN' ? 'Join ABVP' : 'अभाविप मध्ये सहभागी व्हा'}</span>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('search-filter-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/30 text-white font-extrabold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
            >
              {activeLang === 'EN' ? 'Explore Institutions' : 'शैक्षणिक संस्था शोधा'}
            </button>
          </div>
        </div>
      </section>

      {/* --- DETAIL MODEL FOR AN INSTITUTION --- */}
      <AnimatePresence>
        {selectedInstitution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInstitution(null)}
              className="absolute inset-0 bg-[#001847]/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative z-10 border border-slate-100 flex flex-col max-h-[90vh]"
            >
              <div className="h-2 bg-[#fc820c]" />
              
              <div className="overflow-y-auto">
                {/* Hero block */}
                <div className="h-64 relative bg-slate-100">
                  <img 
                    src={selectedInstitution.image} 
                    alt={selectedInstitution.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <button 
                    onClick={() => setSelectedInstitution(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  
                  <div className="absolute bottom-6 left-6 text-left text-white pr-6">
                    <span className="px-2.5 py-0.5 bg-[#fc820c] text-white rounded text-[10px] font-black uppercase tracking-widest inline-block mb-2">
                      {activeLang === 'EN' ? selectedInstitution.category : selectedInstitution.categoryMr}
                    </span>
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white">
                      {activeLang === 'EN' ? selectedInstitution.name : selectedInstitution.nameMr}
                    </h3>
                  </div>
                </div>

                {/* Information blocks */}
                <div className="p-8 space-y-6 text-left">
                  
                  {/* Descriptions */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      {activeLang === 'EN' ? 'Overview' : 'थोडक्यात माहिती'}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      {activeLang === 'EN' ? selectedInstitution.description : selectedInstitution.descriptionMr}
                    </p>
                  </div>

                  {/* Metadata fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="space-y-3 text-xs">
                      <div className="flex gap-2 items-center text-slate-500">
                        <MapPin className="h-4 w-4 text-[#fc820c] shrink-0" />
                        <div>
                          <p className="font-bold text-[#001847]">{activeLang === 'EN' ? 'Address:' : 'पत्ता:'}</p>
                          <p className="mt-0.5 font-light">{activeLang === 'EN' ? selectedInstitution.address : selectedInstitution.addressMr}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center text-slate-500">
                        <Calendar className="h-4 w-4 text-[#fc820c] shrink-0" />
                        <div>
                          <p className="font-bold text-[#001847]">{activeLang === 'EN' ? 'Established Year:' : 'स्थापना वर्ष:'}</p>
                          <p className="mt-0.5 font-light">{selectedInstitution.established}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex gap-2 items-center text-slate-500">
                        <Phone className="h-4 w-4 text-[#fc820c] shrink-0" />
                        <div>
                          <p className="font-bold text-[#001847]">{activeLang === 'EN' ? 'Office Contact:' : 'कार्यालय संपर्क:'}</p>
                          <p className="mt-0.5 font-light">{selectedInstitution.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center text-slate-500">
                        <Mail className="h-4 w-4 text-[#fc820c] shrink-0" />
                        <div>
                          <p className="font-bold text-[#001847]">{activeLang === 'EN' ? 'Official Email Address:' : 'अधिकृत ईमेल पत्ता:'}</p>
                          <p className="mt-0.5 font-light break-all">{selectedInstitution.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resource Actions */}
                  <div className="pt-4 flex flex-wrap gap-4">
                    {selectedInstitution.website && selectedInstitution.website !== '#' && (
                      <a 
                        href={selectedInstitution.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-[#001847] text-white text-xs font-black tracking-wider uppercase rounded-xl hover:bg-[#0b2c6b] transition-colors flex items-center gap-2"
                      >
                        <span>{activeLang === 'EN' ? 'Visit Official Portal' : 'अधिकृत संकेतस्थळाला भेट द्या'}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <button 
                      onClick={() => {
                        setSelectedInstitution(null);
                        onJoinClick?.();
                      }}
                      className="px-6 py-3.5 border border-slate-200 text-[#001847] text-xs font-black tracking-wider uppercase rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>{activeLang === 'EN' ? 'Report Information Issue' : 'त्रुटी आढळल्यास कळवा'}</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
