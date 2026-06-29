import { useState, useMemo, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Calendar, Megaphone, FileText, Images, Play, 
  ArrowRight, Download, Eye, ExternalLink, Info, CheckCircle2, 
  X, Sparkles, Youtube, Newspaper, Bell, HelpCircle
} from 'lucide-react';

interface MediaPageProps {
  activeLang: 'EN' | 'MR';
  onJoinClick?: () => void;
}

interface MediaItem {
  id: string;
  type: 'event' | 'news' | 'document' | 'gallery';
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  tag: string;
  tagMr: string;
  date: string;
  dateMr: string;
  image: string;
  downloadUrl?: string;
  details?: string;
  detailsMr?: string;
}

export default function MediaPage({ activeLang, onJoinClick }: MediaPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'event' | 'news' | 'document' | 'gallery'>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string } | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    const handleNavigation = (scrollId?: string, tabId?: string) => {
      const sId = scrollId || localStorage.getItem('navScrollTarget');
      const tId = tabId || localStorage.getItem('navTabTarget');

      if (tId && ['all', 'event', 'news', 'document', 'gallery'].includes(tId)) {
        setSelectedCategory(tId as any);
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

  // Dynamic Media Database
  const mediaItems = useMemo<MediaItem[]>(() => [
    {
      id: 'evt-1',
      type: 'event',
      title: 'Deogiri Leadership Summit 2024',
      titleMr: 'देवगिरी नेतृत्व परिषद २०२४',
      description: 'A cinematic student leadership conference in Aurangabad empowering youth representation and policy advocacy.',
      descriptionMr: 'औरंगाबाद येथे विद्यार्थी नेतृत्वाला आणि धोरणात्मक प्रतिनिधित्वाला बळ देणारी ऐतिहासिक परिषद.',
      tag: 'FEATURED EVENT',
      tagMr: 'महत्त्वाचा उपक्रम',
      date: 'Oct 15, 2024',
      dateMr: '१५ ऑक्टोबर २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsuFCVinJzTEbCsYsAqr3Ker7gPyGY7BXQ0h0LnFu02Tq4tKLj1x7njMtQotwQdIchYbZWTt9S7u4drvEXm7qi2vJXJlm39vi6pI5l5EUPUWN3EN4oJpk7mXsT4yji8I05C1QMG6a0w2o0mfUm2jGMEcyF8khhd4N4AHHDq9ZcgwiLmyG1tXmX_6lOZvmiz2hxw24UlFzzC42wW4hxTElOE8saSLuHXWVgvtJpuUwMn-AMygw1BMGkNhKYwgIiNw_fzheZqd04f6kE',
      details: 'This summit brought together over 5,000 student delegates from all districts of the Deogiri Prant to discuss structural educational reforms, youth employment, and character building. Senior leadership highlighted the importance of active participation in social and developmental sectors.',
      detailsMr: 'या परिषदेत देवगिरी प्रांतातील सर्व जिल्ह्यांतून ५,००० हून अधिक विद्यार्थी प्रतिनिधींनी एकत्र येऊन शैक्षणिक सुधारणा, युवा रोजगार आणि चारित्र्य निर्मितीवर चर्चा केली. सामाजिक आणि विकासात्मक क्षेत्रातील सक्रिय सहभागाच्या महत्त्वावर वरिष्ठ नेतृत्वाने प्रकाश टाकला.'
    },
    {
      id: 'news-1',
      type: 'news',
      title: 'Education Policy Advocacy Report Launched',
      titleMr: 'शैक्षणिक धोरण समर्थन अहवाल प्रसिद्ध',
      description: 'ABVP Deogiri released a comprehensive ground audit report regarding state colleges infrastructure guidelines.',
      descriptionMr: 'अभाविप देवगिरीने महाविद्यालयांमधील पायाभूत सुविधांच्या सद्यस्थितीचा सविस्तर ऑडिट अहवाल प्रसिद्ध केला.',
      tag: 'LATEST PRESS',
      tagMr: 'प्रेस नोट',
      date: 'Oct 12, 2024',
      dateMr: '१२ ऑक्टोबर २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbDep217xHGAMK6oI1ze80s3xcc-YblXU8i3by5iRX8MiUK_XuCeoCaood-CZecEDt-xXvLS-eAYqq_zvf5JhX6jbQ8jiDIebUXHZlEabblKG5XLsxA8NpKhJV80b2P8nKZ3Q-B-TnPQIYaj7KsKWZkLmYaD98AILl6wOYiOr3uNI3KGsGKg_ub9FQgQ8bYbPNW0ZzDd28kV1f6QyfMVq5psJfoij1ZJkOPcMweiDVllaIoLGndC2Y_S1EG9EtKL7-cNDAp9qVLhnj',
      details: 'Our delegation presented the findings of the 120-college audit to state authorities. The report covers classroom safety parameters, hygiene systems, clean drinking water accessibility, and fee regulatory compliance.',
      detailsMr: 'आमच्या शिष्टमंडळाने १२० महाविद्यालयांच्या ऑडिटचे निष्कर्ष राज्य अधिकाऱ्यांसमोर सादर केले. अहवालात वर्गखोल्यांची सुरक्षा, स्वच्छता यंत्रणा, पिण्याच्या शुद्ध पाण्याची सोय आणि शुल्क नियामक नियमांचे पालन या बाबींचा समावेश आहे.'
    },
    {
      id: 'doc-1',
      type: 'document',
      title: 'Youth Voice Monthly Edition (PDF)',
      titleMr: 'युवा आवाज मासिक आवृत्ती (PDF)',
      description: 'The standard monthly handbook covering student achievements, opinions, and campus activity logs.',
      descriptionMr: 'विद्यार्थ्यांचे यश, मते आणि कॅम्पस गतिविधींची माहिती देणारे अधिकृत मासिक प्रकाशन.',
      tag: 'PUBLICATION',
      tagMr: 'प्रकाशन',
      date: 'Sep 2024',
      dateMr: 'सप्टेंबर २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYk2NQahgOnEE3bNtyr3xDNOb8EK6_Sc8gYH3ZGAV-CejFgXmRuDmp4qLVqlgbYrfXgJmeTZUy8IuW4bZsVTAr5XTfPMyLYNBDbLuHyzAEQvxSNSQZdb9AgBboheAO9WXatEceCgZbyjKshJxYdqRC6tvP7K0hIcUUom7KV8ptm4gjIc2Vbo1WDs_qgnUNpR80opBqsEcDrcG-g-lBSWq4rmBCJUia4U2c_cwIY8_ly9n4nzxUwqYFZBfZAqazmFkwmG7msPLXhUKB',
      downloadUrl: '#download-youth-voice',
      details: 'This high-quality magazine contains inspirational columns on leadership, state-level scholarship guide pathways, and creative writings contributed by regional scholars across Marathwada.',
      detailsMr: 'या दर्जेदार मासिकात नेतृत्वाबद्दलचे प्रेरणादायी लेख, राज्यस्तरीय शिष्यवृत्तीचे सुलभ मार्गदर्शक आणि मराठवाड्यातील गुणवंत विद्यार्थ्यांनी लिहिलेले वैचारिक व सृजनशील साहित्य समाविष्ट आहे.'
    },
    {
      id: 'gal-1',
      type: 'gallery',
      title: 'Campus Tree Plantation Drive',
      titleMr: 'कॅम्पस वृक्षारोपण मोहीम',
      description: 'Stunning moments captured during environmental campaigns in multiple regional colleges.',
      descriptionMr: 'विविध महाविद्यालयांमध्ये राबवण्यात आलेल्या पर्यावरणस्नेही मोहिमेतील सुंदर क्षणचित्रे.',
      tag: 'GALLERY ALBUM',
      tagMr: 'फोटो दालन',
      date: 'Aug 2024',
      dateMr: 'ऑगस्ट २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoN3_yntRfqVeNiqxdBq4tyervkdNjtRJCYlynUXOwzm7wXRj6Xv81w9EcHH4zSYObbf71ygWhhbxa-583B7qeSr4ly_ExoLVJSYbs41TknFyhuQpHOlNnAKsiCYXetW-ruo5rulSnunUpG1wcXIe2sPa583SV8F4-X4ZwQ-fH3bqGF-a6N_x8yjswH5XmUa0szAmiZlgSaU6F1fgaZ3M4KhPt5u1_DfSFWM0Lgv7yuyJmrDSRvFo6dpWy7kjIGjBmLcOvsdUn4EDZ',
      details: 'Under our Green Campus initiative, student volunteers planted over 2,500 indigenous saplings across 15 high-enrollment colleges in Nanded, Latur, and Jalna districts, securing micro-irrigation setups.',
      detailsMr: 'आमच्या हरित कॅम्पस उपक्रमांतर्गत, नांदेड, लातूर आणि जालना जिल्ह्यातील १५ नामांकित महाविद्यालयांमध्ये विद्यार्थी स्वयंसेवकांनी २,५०० हून अधिक देशी रोपे लावली आणि सूक्ष्म-सिंचनाची व्यवस्था केली.'
    },
    {
      id: 'evt-2',
      type: 'event',
      title: 'State-level Workshop on Digital Sovereignty',
      titleMr: 'डिजिटल सार्वभौमत्व राष्ट्रीय कार्यशाळा',
      description: 'Educational technology workshop organized for students to adapt with emerging industrial standards.',
      descriptionMr: 'विद्यार्थ्यांना उदयोन्मुख औद्योगिक मानकांशी जुळवून घेण्यासाठी आयोजित तंत्रज्ञान कार्यशाळा.',
      tag: 'WORKSHOP',
      tagMr: 'कार्यशाळा',
      date: 'Nov 02, 2024',
      dateMr: '०२ नोव्हेंबर २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2pDUMTcFni7Ej1f5XEMZbtWc6WYBmx8Jyz6DEUNVm3y6HD8B_6dH8PDJgV1A1BAc_vEyEs-kRZQaZaDMSoupuzQApooalcrVuW5mxImIsPkR-VI3QKA5NWGagiRNlCkyWgaOOQvpxR3Na35osJoV1Z82H2mSzc8dRUCiMNdoomaJpHDwrLcBYUna4LrDQJv_PSU_uR4HS-tXD43riXuLsrSFcmjpi9f1q5fjhbWVArqWy5EJzFIyrA-hEN0yjmByCMFexxTUZTQG8',
      details: 'Focused on equipping regional scholars with critical digital literacies, standard programming concepts, and safe security practices to promote indigenous innovation.',
      detailsMr: 'स्थानिक विद्यार्थ्यांना महत्त्वपूर्ण डिजिटल साक्षरता, प्रोग्रामिंग संकल्पना आणि सुरक्षित सायबर सुरक्षा नियमांचे प्रशिक्षण देऊन स्वदेशी नवकल्पनांना प्रोत्साहन दिले.'
    },
    {
      id: 'news-2',
      type: 'news',
      title: 'Scholarship Portal System Reform Demands',
      titleMr: 'शिष्यवृत्ती पोर्टल दुरुस्तीसाठी निदर्शने',
      description: 'ABVP submit memorandum to university registrar demanding immediate server updates.',
      descriptionMr: 'सर्व्हरच्या संथ गतीमुळे निर्माण झालेल्या समस्यांवर त्वरित तोडगा काढण्यासाठी विद्यापीठाला निवेदन सादर.',
      tag: 'MEMORANDUM',
      tagMr: 'निवेदन',
      date: 'Oct 09, 2024',
      dateMr: '०९ ऑक्टोबर २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL79IlAWm3sFcSzIkQnBJb0qB5p6GUrsS8jgelFzamka3H8aiprJdNkHL3fqbl6oHbOmKey-THja8Rd3wxkxQKkpFDPfyLPSqs4KX_dtsLQLC8lf89fzGr4AH7CLMmtku5exFC6RpFNeXI7zBS5g6VYXVnIbttq9CFWs--r4eygva5_nZdXuUSDMsk8HqBvPBk65WMuGGlSX3Db5nh13KChWMQQrrRi6X6syO_IOMw6qfQlkQdT5MkwDFOc5iz46ULxbHLzD94oefK',
      details: 'A official delegation met with administrative authorities and secured a written commitment to scale backend processing databases during prime admission cycles.',
      detailsMr: 'शिष्टमंडळाने प्रशासकीय अधिकाऱ्यांची भेट घेऊन प्रवेश प्रक्रियेच्या काळात सर्व्हर डेटाबेस अधिक गतीने चालवण्याचे लेखी आश्वासन मिळवले.'
    },
    {
      id: 'doc-2',
      type: 'document',
      title: 'ABVP Student Rights & Handbook (PDF)',
      titleMr: 'अभाविप विद्यार्थी हक्क व मार्गदर्शिका (PDF)',
      description: 'Comprehensive manual detailing laws, anti-ragging support, and grievance cells.',
      descriptionMr: 'नियम, रॅगिंग प्रतिबंधक कायदे आणि तक्रार निवारण कक्षांची माहिती देणारी नियमावली.',
      tag: 'HANDBOOK',
      tagMr: 'मार्गदर्शिका',
      date: 'Jun 2024',
      dateMr: 'जून २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuqcXFX8wrQ_ez0Lh8Umv_faQT81cieR0BjyxQ66bgQTxCyHzGSADP3mPzyax_vRn-CHlLAiu6aCnHsqpKJoSrSwtJ6VnwqnL2hceBbqtYIyvlwBzK2NNpvaQOnzfczIGyo-RWJcJHS5FZw7oIr6XIQQ68F5Z0k9eCy8rJNJ9gE2uHnjuzHsTQdNHwZaU3z4NR3zMQoPWf3WhWOicl6FtPXCnLmdk7nvFXFDH0ySvM_y5QuXNBNd2YrN-RbwL1G0AoIKQtzO7uCss3',
      downloadUrl: '#download-handbook',
      details: 'An essential legal and structural guide for every scholar across universities to protect individual campus freedom and democratic representation.',
      detailsMr: 'वैयक्तिक स्वातंत्र्य आणि लोकशाही प्रतिनिधित्वाचे रक्षण करण्यासाठी विद्यापीठातील प्रत्येक विद्यार्थ्यासाठी अत्यंत उपयुक्त पुस्तिका.'
    },
    {
      id: 'gal-2',
      type: 'gallery',
      title: 'Social Service Youth Camp',
      titleMr: 'सामाजिक सेवा युवा शिबीर',
      description: 'Photos from rural development projects, blood donation camps, and cleanliness drives.',
      descriptionMr: 'ग्रामीण विकास प्रकल्प, रक्तदान शिबीर आणि स्वच्छता मोहिमेतील काही क्षणचित्रे.',
      tag: 'GALLERY ALBUM',
      tagMr: 'फोटो दालन',
      date: 'Jul 2024',
      dateMr: 'जुलै २०२४',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArluABTulEZIyx5o2kJMbJD2hc2_etgvwMP0jRujwkZ0KmD-VaXIGj6OVGWAuhubWmLYb9h8X1ueawXhwBN1vza1eAjTljtLcA3yH70I5cpgoZV2LuXK6SKCG749Aw8n4idcqfCn3VgOW4-En52X3yg8UR6vPC_U8wJdWaArClJczC_O8J5hEG3eD4ZUDS3LBnJmC2Ug22F3stsGCYa2kjjWKSr3vgbstC71qgzEl-_7TsycTLN6IiNaugtHxl7fdmv5cvMLi_MDX9',
      details: 'Highlighting seven days of dedicated student voluntary efforts in primary health audits, public wall paintings, and literacy camps across remote villages.',
      detailsMr: 'दुर्गम गावांमध्ये प्राथमिक आरोग्य तपासणी, भिंतींवरील प्रबोधनात्मक चित्रे आणि साक्षरता शिबिरांमध्ये विद्यार्थ्यांच्या ७ दिवसांच्या योगदानाचे दर्शन.'
    }
  ], []);

  // Filter & Search Logic
  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleMr.includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descriptionMr.includes(searchQuery);

      const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [mediaItems, searchQuery, selectedCategory]);

  const latestUpdates = [
    {
      type: 'NEWS',
      typeMr: 'बातम्या',
      date: 'Oct 18, 2024',
      dateMr: '१८ ऑक्टोबर २०२४',
      title: 'New Digital Library Portal launched for all students.',
      titleMr: 'सर्व विद्यार्थ्यांसाठी नवीन डिजिटल वाचनालय पोर्टल सुरू.',
      desc: 'Access over 5,000 journals and e-books through our newly inaugurated portal designed for digital sovereignty.',
      descMr: 'डिजिटल तंत्रज्ञानाच्या युगात मोफत शैक्षणिक साहित्य आणि ५,००० हून अधिक ई-पुस्तके उपलब्ध.'
    },
    {
      type: 'CIRCULAR',
      typeMr: 'परिपत्रक',
      date: 'Oct 16, 2024',
      dateMr: '१६ ऑक्टोबर २०२४',
      title: 'Notice regarding upcoming State-level Workshop.',
      titleMr: 'आगामी राज्यस्तरीय कार्यशाळेबाबत महत्त्वपूर्ण सूचना.',
      desc: 'Registration open for the Leadership training workshop happening in Jalna next month.',
      descMr: 'पुढील महिन्यात जालन्यात होणाऱ्या भव्य नेतृत्व प्रशिक्षण कार्यशाळेसाठी नाव नोंदणी सुरू.'
    },
    {
      type: 'PRESS',
      typeMr: 'प्रसिद्धीपत्रक',
      date: 'Oct 14, 2024',
      dateMr: '१४ ऑक्टोबर २०२४',
      title: 'ABVP demands immediate fix for scholarship portal lag.',
      titleMr: 'शिष्यवृत्ती पोर्टलच्या संथ गतीवर तात्काळ उपाय योजण्याची अभाविपची मागणी.',
      desc: 'A formal memorandum submitted to the University administration regarding technical delays.',
      descMr: 'तात्काळ सर्व्हर वाढवून लाखो विद्यार्थ्यांना दिलासा देण्याकरिता कुलगुरूंना निवेदन सादर.'
    }
  ];

  const videosList = [
    {
      id: 'vid-1',
      type: 'DOCUMENTARY',
      typeMr: 'माहितीपट',
      title: 'The Spirit of ABVP Deogiri',
      titleMr: 'अभाविप देवगिरीचा प्रेरणादायी प्रवास',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9RBthzVINjm4e0KCsXwnA81NEsr9wadasobz7KxvMo1yP7tAkB4TJYvg2UfYVwmSBzlLInn1zkDjuV87DV2kyYpwhoeSfD-3cXQ9soF4GeCkAbxwUYFnqKTHHsyRGrN9Zi76cCJkEWqnQVTvDJIC4d6bEUdwmjgCbiWJxkheJw8pTj4wdDLjB3RlFuH2SoUswTw88hdmaAlqBpeLHCbNi7_jM53eENf0Ko4RFfjb-TImIjJ0Ogib4Cn_OojCkAGRr8UDkTBUNXeaM',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // placeholder or real link
    },
    {
      id: 'vid-2',
      type: 'INTERVIEW',
      typeMr: 'मुलाखत',
      title: 'Education Reforms: A Youth Perspective',
      titleMr: 'शैक्षणिक सुधारणा आणि युवकांचे विचार',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfs5w7_pOIxJ2fZUJ9J12KjBV-hC0y8x34BL_C8Xf-ZSWoNX6lQgVD7R08cTq5-ikwDs39N1GF_20UZkh1Nes1HBt7TpM0_xop4bOLpEuO57RArJaUw7ytoiWZ4k38JawZijMez0iWpcSrJa412qJbZ8nIqCFezJPqMP0mnFno6GY03PS9Pm0pjgTOX07qf6gJi_1Zr0X9f7ZoL94ZxmHutElczA8VDcc0nq1e9GIJiZR6pQOSpv-ncDxJ3Z9Dr0f9Lsev58xeoWU3',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'vid-3',
      type: 'CAMPUS LIFE',
      typeMr: 'कॅम्पस संस्कृती',
      title: 'Cultural Harmony Fest 2023 Highlights',
      titleMr: 'सांस्कृतिक एकता महोत्सव २०२३ ठळक घडामोडी',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwemGsiDqMYloDChb6MeyOVYRXAB8tCPrGA3wG-VSI33tP_XnVBbaoSIHQHkuDm5j3JHxq_ARYSJcezcjQsUzt5oftOOAWNkBSsB4RndGgscBo0XjqpDqZM8eHnUrOCsa7jlFapJ5BsfV8FxGWSkKA2MKpce2fNR6zQh1grO9ueEXH4f3-3ssSska1UTf973dsPCPvv8s6Qn1aMW6nMkTlTCAL55h6LR78_1ZklHUs_uYMsXOoXYiAvTItkMlvDaldFInCCFHArTPK',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  return (
    <div className="flex-grow bg-[#F8F9FA] text-[#121c2a]">
      
      {/* 1. Hero Banner */}
      <section className="relative w-full h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="ABVP Student Leadership Summit" 
            className="w-full h-full object-cover scale-105 transition-all duration-[10000ms]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvKEO4G7MFH3Y3MgcumPpJgYh-9hdiZE1d7u82zZl4-7vgYI6Nhk7HUL1RUeGgRjG9y3ZdmlENIxUtWjLzsWdUT7e8iwcGG4ztMbqmBibCAysz7_ZUFFKGW1pGlG1HNgc2HhjHASFItI7RHRN-hnlgkzzu07eNVhMislMpkmlebWSqQyHXMfat0JPpg9Re1f0QrpM1vYVqt9yY55sOlKflRlIaisPgvgBqbMnXp5PWv4gVYrXYgqAN6qKFj7f5guD5pYVcpzujd3vm" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001847]/95 via-[#001847]/75 to-[#001847]/45"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-white text-left">
          <span className="inline-block px-4 py-1.5 bg-[#fc820c] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider mb-6">
            {activeLang === 'EN' ? 'Media Center / माध्यम केंद्र' : 'माध्यम केंद्र'}
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-6xl text-white mb-6 leading-tight max-w-3xl">
            {activeLang === 'EN' ? 'Empowering Voices, Documenting Progress.' : 'आवाजांचे सबलीकरण, प्रगतीचे दस्तऐवजीकरण.'}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light">
            {activeLang === 'EN' 
              ? 'Stay updated with the latest events, news, publications, documents, and memories from the heart of ABVP Deogiri’s student movement.'
              : 'अभाविप देवगिरीच्या विद्यार्थी चळवळीतील ताज्या घडामोडी, बातम्या, मासिके, महत्त्वाचे परिपत्रक आणि आठवणींनी समृद्ध रहा.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => {
                const element = document.getElementById('media-explore');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold rounded-xl hover:scale-103 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{activeLang === 'EN' ? 'Explore Media' : 'माध्यम दालन पहा'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('visual-narrative');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/30 text-white font-extrabold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
            >
              <span>{activeLang === 'EN' ? 'Watch Videos' : 'व्हिडिओ पहा'}</span>
              <Play className="h-4 w-4 text-[#fc820c] fill-[#fc820c]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics */}
      <section className="relative -mt-16 z-30 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100">
          <div className="text-center p-4">
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-[#001847] mb-2">500+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              {activeLang === 'EN' ? 'Events Conducted' : 'आयोजित कार्यक्रम'}
            </p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-[#fc820c] mb-2">1.2k</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              {activeLang === 'EN' ? 'News Reports' : 'बातम्या आणि अहवाल'}
            </p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-[#001847] mb-2">250+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              {activeLang === 'EN' ? 'Documents' : 'महत्त्वाचे दस्तऐवज'}
            </p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-4xl sm:text-5xl font-sans font-black text-[#fc820c] mb-2">10k+</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              {activeLang === 'EN' ? 'Media Assets' : 'डिजिटल चित्रे'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Transparency & Information Integrity Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          
          <div className="space-y-6">
            <span className="text-[#fc820c] font-bold tracking-widest uppercase text-xs block">
              {activeLang === 'EN' ? 'INFORMATION INTEGRITY' : 'माहिती व सत्यता'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] leading-tight">
              {activeLang === 'EN' ? 'Transparency & Information Integrity' : 'पारदर्शकता आणि विश्वासार्हता'}
            </h2>
            <div className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p>
                {activeLang === 'EN' 
                  ? 'The ABVP Deogiri Media Center serves as a digital lighthouse for our organization, ensuring that every initiative, memorandum, and milestone is documented and accessible to the student community.'
                  : 'अभाविप देवगिरी माध्यम केंद्र हे आमच्या संघटनेसाठी डिजिटल दीपगृह म्हणून काम करते, ज्यामुळे विद्यार्थ्यांच्या हक्कांसाठीचे प्रत्येक आंदोलन, निवेदन आणि महत्त्वाची यशोगाथा विद्यार्थ्यांपर्यंत अचूक पोहोचते.'}
              </p>
              <p>
                {activeLang === 'EN' 
                  ? 'Our mission is to foster transparency through real-time updates and authoritative documents, bridging the gap between student leadership and the ground reality of campus life across the Deogiri region.'
                  : 'आमचे ध्येय देवगिरी प्रांतातील महाविद्यालयीन परिसर आणि विद्यार्थी नेतृत्व यांच्यातील विश्वास अधिक दृढ करणे आहे.'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2.5 text-slate-700 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>{activeLang === 'EN' ? 'Verified Press Releases' : 'सत्यापित प्रसिद्धीपत्रके'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>{activeLang === 'EN' ? 'Official Directives' : 'अधिकृत परिपत्रके व नमुना'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXu-eGTfZAYsh97zeMfoXZrJXp-mZVmLEECxEuSz6BCRpuPColezbMCY7JP188uchRV_kxvRAOPw1h2_VHFOmkF3dQvMZT6g5PB0dNckNEVylyOGuHf9CmL8YXSV2Dsnx3TEwhouVyG7buyurFujo22WODFOwz9bPGmJ9V3JJeH4YwaJc4lGk5EXIe3HEyemZGq1FdTEq0tGxBSjYtfn5ZanM2R7hzC_00GpnqS9EsXlz926WZ3gx3GyLLQn9F0k6_1AQd_lQrTyIMxx" 
                alt="Policy Report" 
                className="w-full h-full object-cover aspect-square hover:scale-103 transition-transform"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md mt-8">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCsnPTZcsZiFicbR5xJ4BhLz7FiotemjeXOBUj76jEoUtCKxVCYNyIyiCy32UohEfIWHcd-dgtRJWrytF-IHMFKNY-E0zD_FwMjCR0mbDswNP2LAbquFDZdXiYSe7_0IUjziEBFdqgOd6waBAS_0MFBenE83fze6wVWWAuq7hzAnDUAkkqZnYCPe4CKq9ndKkAsuF7wSG8hDpaxEX1P9jfGLAxdBUJzo_6IjZw0JxKPEpQiMG1wNLvjE9964YPYt2O_cldsPLODcu9" 
                alt="Student Activists Discussion" 
                className="w-full h-full object-cover aspect-square hover:scale-103 transition-transform"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Filter Categories & Dynamic Archives */}
      <section id="media-explore" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
              {activeLang === 'EN' ? 'MEDIA CATEGORIES' : 'माध्यम विभाग'}
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847]">
              {activeLang === 'EN' ? 'Explore Specific Media Archives' : 'विविध संग्रह एक्सप्लोर करा'}
            </h2>
            <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              {activeLang === 'EN' 
                ? 'Quickly filter between summits, press releases, newsletters, or photographic records.'
                : 'कार्यक्रम, प्रसिद्धीपत्रके, मासिके आणि छायाचित्रांचे सविस्तर संग्रह फिल्टर करा.'}
            </p>
          </div>

          {/* Interactive Filtering Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${selectedCategory === 'all' ? 'bg-[#001847] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              {activeLang === 'EN' ? 'All Media' : 'सर्व संग्रह'}
            </button>
            <button 
              onClick={() => setSelectedCategory('event')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-2 ${selectedCategory === 'event' ? 'bg-[#001847] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              <Calendar className="h-4 w-4" />
              <span>{activeLang === 'EN' ? 'Events' : 'कार्यक्रम'}</span>
            </button>
            <button 
              onClick={() => setSelectedCategory('news')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-2 ${selectedCategory === 'news' ? 'bg-[#001847] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              <Newspaper className="h-4 w-4" />
              <span>{activeLang === 'EN' ? 'News' : 'बातम्या'}</span>
            </button>
            <button 
              onClick={() => setSelectedCategory('document')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-2 ${selectedCategory === 'document' ? 'bg-[#001847] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              <FileText className="h-4 w-4" />
              <span>{activeLang === 'EN' ? 'Documents' : 'दस्तऐवज'}</span>
            </button>
            <button 
              onClick={() => setSelectedCategory('gallery')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-2 ${selectedCategory === 'gallery' ? 'bg-[#001847] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              <Images className="h-4 w-4" />
              <span>{activeLang === 'EN' ? 'Gallery' : 'फोटो दालन'}</span>
            </button>
          </div>

          {/* Search bar specifically for media items */}
          <div className="max-w-md mx-auto mb-16 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder={activeLang === 'EN' ? 'Search archive titles, tags, descriptions...' : 'संग्रह, शीर्षके, टॅग किंवा वर्णन शोधा...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#001847] focus:outline-none focus:ring-2 focus:ring-[#fc820c] focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-bold">
                Clear
              </button>
            )}
          </div>

          {/* Grid Layout of Media Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMedia.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col text-left"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    alt={activeLang === 'EN' ? item.title : item.titleMr} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={item.image}
                  />
                  <div className="absolute top-4 left-4 bg-[#001847] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {activeLang === 'EN' ? item.tag : item.tagMr}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    {activeLang === 'EN' ? item.date : item.dateMr}
                  </span>
                  <h3 className="font-sans font-extrabold text-lg text-[#001847] mb-2 leading-snug group-hover:text-[#fc820c] transition-colors line-clamp-2">
                    {activeLang === 'EN' ? item.title : item.titleMr}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 font-light line-clamp-3">
                    {activeLang === 'EN' ? item.description : item.descriptionMr}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-bold text-[#fc820c] hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{activeLang === 'EN' ? 'View Details' : 'तपशील पहा'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    {item.type === 'document' && (
                      <a 
                        href="#download"
                        onClick={(e) => { e.preventDefault(); alert(activeLang === 'EN' ? 'Downloading document...' : 'दस्तऐवज डाउनलोड होत आहे...'); }}
                        className="p-2 bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-[#fc820c] rounded-lg transition-colors cursor-pointer"
                        title="Download Document"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-xl mx-auto">
              <Info className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h4 className="font-sans font-extrabold text-lg text-[#001847] mb-1">
                {activeLang === 'EN' ? 'No Media Found' : 'कोणतीही माहिती सापडली नाही'}
              </h4>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                {activeLang === 'EN' 
                  ? 'We could not find any media archive matching your search. Try typing other keywords.' 
                  : 'तुमच्या शोधाशी जुळणारा कोणताही संग्रह आढळला नाही. कृपया इतर शब्द निवडा.'}
              </p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-6 px-6 py-2.5 bg-[#fc820c] text-white font-extrabold text-xs rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
              >
                {activeLang === 'EN' ? 'Reset Filters' : 'फिल्टर रिसेट करा'}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. Featured Highlights & Latest Updates Sidebar Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Bento Highlights */}
          <div className="lg:col-span-8 text-left">
            <h2 className="font-sans font-black text-3xl text-[#001847] mb-8 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#fc820c]" />
              {activeLang === 'EN' ? 'Featured Highlights' : 'महत्त्वाच्या घडामोडी'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mediaItems.slice(0, 4).map((item) => (
                <div 
                  key={`featured-${item.id}`}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={activeLang === 'EN' ? item.title : item.titleMr} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white text-left w-full">
                    <span className="bg-[#fc820c] text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded uppercase mb-3 inline-block">
                      {activeLang === 'EN' ? item.tag : item.tagMr}
                    </span>
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                      {activeLang === 'EN' ? item.title : item.titleMr}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/70 mb-4 font-light">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-[#fc820c]" />
                        {activeLang === 'EN' ? item.date : item.dateMr}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>{activeLang === 'EN' ? 'Read Document' : 'सविस्तर पहा'}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#fc820c]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Updates Sidebar */}
          <div className="lg:col-span-4 text-left">
            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 sticky top-28">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60">
                <h3 className="font-sans font-extrabold text-xl text-[#001847]">
                  {activeLang === 'EN' ? 'Latest Updates' : 'ताज्या घडामोडी'}
                </h3>
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </div>

              <div className="space-y-6">
                {latestUpdates.map((update, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-[#fc820c] tracking-widest uppercase">
                        {activeLang === 'EN' ? update.type : update.typeMr}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {activeLang === 'EN' ? update.date : update.dateMr}
                      </span>
                    </div>
                    <h4 className="font-sans font-extrabold text-sm text-[#001847] group-hover:text-[#fc820c] transition-colors leading-snug mb-1">
                      {activeLang === 'EN' ? update.title : update.titleMr}
                    </h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
                      {activeLang === 'EN' ? update.desc : update.descMr}
                    </p>
                    {idx < latestUpdates.length - 1 && <hr className="mt-5 border-slate-200/60" />}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  setSelectedCategory('news');
                  const element = document.getElementById('media-explore');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full mt-8 bg-white hover:bg-slate-100 border border-slate-200 text-[#001847] py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                {activeLang === 'EN' ? 'View All Updates' : 'सर्व घडामोडी पहा'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Visual Narrative (Video Previews) */}
      <section id="visual-narrative" className="py-24 bg-[#001847] text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 text-left">
            <div>
              <span className="text-[#fc820c] font-black text-xs uppercase tracking-widest mb-3 block">
                {activeLang === 'EN' ? 'VIDEO ARCHIVES' : 'व्हिडिओ दालन'}
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-white">
                {activeLang === 'EN' ? 'Visual Narrative' : 'चित्रमय प्रवास आणि माहितीपट'}
              </h2>
              <p className="text-white/70 font-sans text-sm sm:text-base mt-2 font-light">
                {activeLang === 'EN' 
                  ? 'Experience the energy of our movement through high-definition video coverage.'
                  : 'विद्यार्थी चळवळीचा जोश, शिबिरे आणि आंदोलन प्रक्रियेची दृश्ये अनुभवा.'}
              </p>
            </div>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <Youtube className="h-5 w-5 fill-white" />
              <span>{activeLang === 'EN' ? 'Our YouTube Channel' : 'युट्यूब चॅनेलला भेट द्या'}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videosList.map((video) => (
              <div 
                key={video.id}
                onClick={() => setSelectedVideo({ title: activeLang === 'EN' ? video.title : video.titleMr, url: video.url })}
                className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer border border-white/10 bg-slate-900 shadow-xl"
              >
                <img 
                  src={video.thumbnail} 
                  alt={activeLang === 'EN' ? video.title : video.titleMr} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-7 w-7 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#fc820c] mb-1 block">
                    {activeLang === 'EN' ? video.type : video.typeMr}
                  </span>
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-white truncate">
                    {activeLang === 'EN' ? video.title : video.titleMr}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Newsletter CTA Section */}
      <section className="py-24 px-margin-desktop">
        <div className="max-w-7xl mx-auto bg-slate-100 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-slate-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32" />
          
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#001847] mb-6 relative z-10 max-w-3xl mx-auto">
            {activeLang === 'EN' 
              ? 'Stay Connected With Every Initiative of ABVP Deogiri.' 
              : 'अभाविप देवगिरीच्या प्रत्येक उपक्रमाशी निरंतर जोडलेले रहा.'}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-500 mb-10 max-w-2xl mx-auto relative z-10 font-light">
            {activeLang === 'EN' 
              ? 'Subscribe to our newsletter for instant alerts on news, events, and document releases directly to your inbox.'
              : 'बातम्या, कार्यक्रम आणि नवीन परिपत्रकांचे जलद अपडेट्स थेट तुमच्या ईमेल वर मिळवण्यासाठी आमच्या वृत्तपत्राचे सदस्य व्हा.'}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input 
              type="email" 
              required
              placeholder={activeLang === 'EN' ? 'Enter your email address' : 'तुमचा ईमेल पत्ता प्रविष्ट करा'}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm text-[#001847] focus:outline-none focus:ring-2 focus:ring-[#fc820c] focus:border-transparent"
            />
            <button 
              type="submit"
              className="px-6 py-4 bg-[#001847] hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
            >
              {activeLang === 'EN' ? 'Subscribe' : 'सदस्य व्हा'}
            </button>
          </form>

          <AnimatePresence>
            {newsletterSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 text-emerald-600 text-sm font-bold flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{activeLang === 'EN' ? 'Subscribed successfully!' : 'यशस्वीरित्या नोंदणी झाली!'}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-4 mt-12 relative z-10">
            <button 
              onClick={onJoinClick}
              className="px-8 py-3.5 bg-[#fc820c] hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              {activeLang === 'EN' ? 'Join ABVP Deogiri' : 'अभाविप देवगिरीत सामील व्हा'}
            </button>
            <button 
              onClick={onJoinClick}
              className="px-8 py-3.5 bg-white border border-slate-200 text-[#001847] hover:bg-slate-50 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {activeLang === 'EN' ? 'Contact Us' : 'संपर्क करा'}
            </button>
          </div>
        </div>
      </section>

      {/* 8. Item Details Modal overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm text-left"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative border border-slate-100 flex flex-col max-h-[90vh]"
            >
              {/* Image banner */}
              <div className="relative h-64 sm:h-80 w-full shrink-0">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-[#fc820c] text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded uppercase mb-2 inline-block">
                    {activeLang === 'EN' ? selectedItem.tag : selectedItem.tagMr}
                  </span>
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-white">
                    {activeLang === 'EN' ? selectedItem.title : selectedItem.titleMr}
                  </h3>
                </div>
              </div>

              {/* Text content */}
              <div className="p-8 overflow-y-auto space-y-4">
                <span className="text-xs text-slate-400 font-extrabold uppercase">
                  {activeLang === 'EN' ? 'PUBLISHED ON: ' : 'प्रकाशन दिनांक: '}
                  {activeLang === 'EN' ? selectedItem.date : selectedItem.dateMr}
                </span>
                
                <p className="text-[#001847] font-semibold text-sm sm:text-base leading-relaxed">
                  {activeLang === 'EN' ? selectedItem.description : selectedItem.descriptionMr}
                </p>

                <p className="text-slate-500 font-light text-sm leading-relaxed whitespace-pre-line">
                  {activeLang === 'EN' 
                    ? (selectedItem.details || 'No detailed records available for this item currently. Please get in touch with our media representative for further guidance.')
                    : (selectedItem.detailsMr || 'याबाबत अधिक माहिती उपलब्ध नाही. अधिक माहितीसाठी कृपया आमच्या संपर्क प्रतिनिधींशी संवाद साधा.')}
                </p>
                
                {selectedItem.type === 'document' && (
                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={() => alert(activeLang === 'EN' ? 'Starting download...' : 'डाउनलोड सुरू होत आहे...')}
                      className="px-6 py-3 bg-[#001847] hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>{activeLang === 'EN' ? 'Download PDF' : 'पीडीएफ डाउनलोड करा'}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. Video Player Modal overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors z-20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <iframe 
                src={selectedVideo.url} 
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
