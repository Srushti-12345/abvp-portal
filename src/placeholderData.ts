import { CarouselSlide, EventItem, StatItem, NewsItem, AnnouncementItem, CommitteeMember, InitiativeItem } from './types';

export const carouselSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwbT1TMQaiVTJVed2zz3xsV3SpxrXjXUXqe4-yC5U0tm5gHW-_gioKijGG-ZSQM4mx5qhr7XgNdBmfkZ6Sm4O2qcjQMtlna8n9nhCnW4AfXsZS64xp6GOG118UnC-uCYySvh8KfpbmSRyBMsOwu6DGp5TjJIjsraajbQ1ZCWt5q3dlLz1vlw3_fGOa2546Zl1Lroa7ikOn7dV7a-IgDSRpQT-mxJZLYcC8UpYjrpgkRCYTwqPNbIgU6xH7OicgThilk39etBQPSS53',
    title: 'ABVP DEOGIRI - Student Power – Nation Power',
    titleMr: 'अभाविप देवगिरी - छात्र शक्ती – राष्ट्र शक्ती',
    subtitle: "Representing the aspirations of millions, ABVP is the world's largest student organization dedicated to national reconstruction.",
    subtitleMr: 'कोट्यवधी विद्यार्थ्यांच्या आकांक्षांचे प्रतिनिधित्व करणारी, अभाविप ही राष्ट्रीय पुनर्निर्माणासाठी समर्पित जगातील सर्वात मोठी विद्यार्थी संघटना आहे.',
    tag: 'ESTABLISHED 1949',
    tagMr: 'स्थापना १९४९',
    primaryButtonText: 'Join Movement',
    primaryButtonTextMr: 'चळवळीत सामील व्हा',
    primaryButtonLink: '#join',
    secondaryButtonText: 'Explore Activities',
    secondaryButtonTextMr: 'विविध उपक्रम',
    secondaryButtonLink: '#activities',
  },
  {
    id: 'slide-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMP0g_hGdzn4LGjj74L6qFIYb9FgbAjId4asCj9u2OeRxzlYaqApTo8ZbQ7tCazMBGPyDchgL4w7c1tsjBmEotGp6f0O_ArB-HrkOAy9OhpJkwCopHABpwB6V-krfiuS0okWBkUKu0uFJ6YSdcJHFI0ikCZ2bocbwMp1X3-On_cxKKHKLzwx69sxt0ZQWNzLawdKXA6X7NjH8jRGb5LPGDF3Zn4Tzlol_YN2jhPjWEoj9NsIj5Ue762GHUgHixpvPDym135OPQUIOl',
    title: 'Empowering Future Leaders through National Pride',
    titleMr: 'राष्ट्रीय अस्मितेतून भावी नेत्यांचे सबलीकरण',
    subtitle: 'Connecting thousands of educational institutions to cultivate leadership, integrity, and self-reliance in our students.',
    subtitleMr: 'विद्यार्थ्यांमध्ये नेतृत्व, सचोटी आणि स्वावलंबन निर्माण करण्यासाठी हजारो शैक्षणिक संस्थांना जोडत आहोत.',
    tag: 'DIGITAL PORTAL',
    tagMr: 'डिजिटल पोर्टल',
    primaryButtonText: 'Read Vision',
    primaryButtonTextMr: 'ध्येय वाचा',
    primaryButtonLink: '#about',
    secondaryButtonText: 'Learn Initiatives',
    secondaryButtonTextMr: 'विविध मोहिमा',
    secondaryButtonLink: '#initiatives',
  },
  {
    id: 'slide-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIXYfWw3v8j7K7seRaX6n9JwobGacW1F17VGVlvS-jntYrJZxHZfEnCUGXVbuchxhlLooD2cACX-F0_TWDxIMgKFM28mKBaAsmzfdlQqB7aTRxPjRTRpuYPJwYb5L-b9i_7kCCODWeQZB5PM30aJIaZLINu3vrA1nNrgeIM8sAq_njwkkAVU27azGJAmVQ2v5RuEhjWVea4osmbWD62NC-WWO-p9N39WfhUSN6nyOPnPXDUwxQpsQK0PdYnrmKvD1nRLQmcNmsPlFf',
    title: 'Digital Sovereignty & Academic Excellence',
    titleMr: 'डिजिटल सार्वभौमत्व आणि शैक्षणिक उत्कृष्टता',
    subtitle: 'Bridging administration and student welfare through transparent digital resources, and accessible grievance redressal.',
    subtitleMr: 'पारदर्शक डिजिटल संसाधने आणि सुलभ तक्रार निवारणाद्वारे प्रशासन आणि विद्यार्थी कल्याण यांचा समन्वय साधणे.',
    tag: 'OUR LEGACY',
    tagMr: 'आपला वारसा',
    primaryButtonText: 'Access Resources',
    primaryButtonTextMr: 'संसाधने मिळवा',
    primaryButtonLink: '#portal',
    secondaryButtonText: 'Contact Representative',
    secondaryButtonTextMr: 'प्रतिनिधींशी संपर्क',
    secondaryButtonLink: '#contact',
  }
];

export const statItems: StatItem[] = [
  {
    id: 'stat-1',
    icon: 'GraduationCap',
    value: '05+',
    label: 'Universities',
    labelMr: 'विद्यापीठे'
  },
  {
    id: 'stat-2',
    icon: 'Building2',
    value: '450+',
    label: 'Colleges',
    labelMr: 'महाविद्यालये'
  },
  {
    id: 'stat-3',
    icon: 'Home',
    value: '85+',
    label: 'Hostels',
    labelMr: 'वसतिगृहे'
  },
  {
    id: 'stat-4',
    icon: 'Users',
    value: '1.2M+',
    label: 'Members',
    labelMr: 'एकूण सदस्य'
  },
  {
    id: 'stat-5',
    icon: 'CalendarCheck',
    value: '2.5K+',
    label: 'Events/Year',
    labelMr: 'वार्षिक कार्यक्रम'
  },
  {
    id: 'stat-6',
    icon: 'Target',
    value: '5M+',
    label: 'Reached',
    labelMr: 'एकूण संपर्क'
  }
];

export const committeeMembers: CommitteeMember[] = [
  {
    id: 'member-1',
    name: 'Dr. Rajesh Deshmukh',
    nameMr: 'डॉ. राजेश देशमुख',
    role: 'Prant President',
    roleMr: 'प्रांत अध्यक्ष',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuh2Y9wDufMWl_l_C3hwG0unO_fz1gTIMmPT8vahwoDR1hkfwOYzcgKrSY_o-phL87dgYWlZJlItOhz5vyshKXTfqBj407ROewIdBPTpfx5CHJavGOdcUWD0A_1NLLnolsr3N70grLOSLBS9WyKlPsUwZodR-uWpZIUqi7RMAxXKAL60R36EnqEc95I_tuksXSG4NJPmXd19_aGuh5DRgem4596wBVbCOBvOl4uBL61yiy0vLVbKOay0jHV8wQdhmNLQyy3VIsoS7',
    email: 'rajesh.deshmukh@abvpdeogiri.org',
    twitterUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'member-2',
    name: 'Smt. Anjali Kulkarni',
    nameMr: 'श्रीमती अंजली कुलकर्णी',
    role: 'Prant Secretary',
    roleMr: 'प्रांत मंत्री',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXufq4ej_tduBQ0v1SaHnZoAwEd38t30wiJzKMVqD54IGBmnm8UsLs8to2mf7C8kKoFSYS3uOKjwVDfN8fJbOY4vNOF2JQna21IQNA1TIML5izAric3lrD1pt36HwTj6h9pbwwxQIoY7B91sYnuUYQfaqHaa7QGxMPt4VxVzzHEX8bjWblV_dzKCQVv2c5X-4NNTOVIlECoXSK4_m3zKtY6JdZXBs5cy64DGOrZUSSaKk865G3oSLW7Wtz1IZvHPFHz8wu7oivIA-Z',
    email: 'anjali.kulkarni@abvpdeogiri.org',
    twitterUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'member-3',
    name: 'Shri. Vinod Patil',
    nameMr: 'श्री. विनोद पाटील',
    role: 'Joint Secretary',
    roleMr: 'सहमंत्री',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXr-smwTlJTnEy_fL2CsjFGjMi20wLP755FOhw8Psq4xCTiDCZBxNyQvuMiQT3AZJA-fN6xCG8HZmkRvmQglMKqILEtYUchw9EH6wHaGSy6_Doxj5P-e79IBZcL8jOHI7wYZPbIKcUN-p_mhMluoigWZJim-m4pY7XJz3PBdzGAvYiE74BSNQ5YeLhd_xyjlNrmjLQXcbfX85PmdvL2EUl2H9FHTPRJeqojMGRiYRNsh4c3RKjzjeKSPlQCPGH2D6gMK7nvpZoGnMG',
    email: 'vinod.patil@abvpdeogiri.org',
    twitterUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com'
  },
  {
    id: 'member-4',
    name: 'Dr. S. R. Joshi',
    nameMr: 'डॉ. एस. आर. जोशी',
    role: 'Treasurer',
    roleMr: 'कोषाध्यक्ष',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk_TUGWcVmj8fLKDJikwV2GKXQ0-2tVMSunm8CD_kD7f0t2DvJeRH7Jm_NWrAV5smtlyKfSCu1oScD4gRRWt0OZNSio1x-iSc4COYWy1HJoZMG1PUL1c_f_Nsw7iDXSXAo_03Dlo7_3Htqyu11HNZY5xzEN7gPLErapP0VT4-IGnqV6wwpSUnH4r9FHebEtuuN3rbNGdrNLFhW5cftLkdwrM21-eGOtEV9biimiotQ5g6DD51g7T9vCsV_4TYJY14jMDLDYnVGzQK3',
    email: 'sr.joshi@abvpdeogiri.org',
    twitterUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com'
  }
];

export const initiativeItems: InitiativeItem[] = [
  {
    id: 'init-1',
    title: 'Think India',
    titleMr: 'थिंक इंडिया',
    description: 'Fostering a sense of national pride and intellectual discourse among the premier institutes of Bharat.',
    descriptionMr: 'भारतातील नामांकित संस्थांमधील विद्यार्थ्यांमध्ये राष्ट्रीय अभिमान आणि बौद्धिक विचार रुजविणे.',
    icon: 'BrainCircuit',
    link: '#think-india',
    actionText: 'Learn More',
    actionTextMr: 'अधिक माहिती',
    isCustomColor: false
  },
  {
    id: 'init-2',
    title: 'SFD',
    titleMr: 'एस.एफ.डी.',
    description: 'Students for Development: Creating sustainable models for grassroots impact.',
    descriptionMr: 'डेव्हलपमेंटसाठी विद्यार्थी: पर्यावरण रक्षणासाठी आणि शाश्वत विकासासाठी कार्य.',
    icon: 'Leaf',
    link: '#sfd',
    actionText: 'Join Drive',
    actionTextMr: 'मोहिमेत सामील व्हा',
    isCustomColor: true,
    bgColor: 'bg-[#964900]',
    textColor: 'text-white',
    accentColor: 'bg-white/20'
  },
  {
    id: 'init-3',
    title: 'SFS',
    titleMr: 'एस.एफ.एस.',
    description: 'Students for Sewa: Dedicated student volunteer force for crisis response.',
    descriptionMr: 'सेवेसाठी विद्यार्थी: आपत्ती निवारण आणि समाजसेवेसाठी सदैव तत्पर स्वयंसेवक दल.',
    icon: 'ShieldAlert',
    link: '#sfs',
    actionText: 'Volunteer',
    actionTextMr: 'स्वयंसेवक बना',
    isCustomColor: true,
    bgColor: 'bg-[#001847]',
    textColor: 'text-white',
    accentColor: 'bg-white/20'
  },
  {
    id: 'init-4',
    title: 'Jignasa',
    titleMr: 'जिज्ञासा',
    description: 'Encouraging innovation and scientific temper among AYUSH students.',
    descriptionMr: 'आयुष (AYUSH) च्या विद्यार्थ्यांमध्ये संशोधन आणि वैज्ञानिक दृष्टिकोन वाढवणे.',
    icon: 'FlaskConical',
    link: '#jignasa',
    actionText: 'Project Details',
    actionTextMr: 'प्रकल्पाची माहिती',
    isCustomColor: false
  }
];

export const eventItems: EventItem[] = [
  {
    id: 'event-1',
    title: 'Azadi ka Amrit Mahotsav - Student Rally',
    titleMr: 'स्वातंत्र्याचा अमृत महोत्सव - भव्य विद्यार्थी रॅली',
    category: 'NATIONAL CELEBRATION',
    categoryMr: 'राष्ट्रीय उत्सव',
    date: '15',
    month: 'AUG',
    monthMr: 'ऑगस्ट',
    year: '2024',
    location: 'Aurangabad City Center',
    locationMr: 'औरंगाबाद शहर केंद्र',
    time: '08:00 AM onwards',
    timeMr: 'सकाळी ०८:०० वाजल्यापासून',
    type: 'celebration',
    link: '#register'
  },
  {
    id: 'event-2',
    title: 'NEP 2020 Implementation Strategies',
    titleMr: 'राष्ट्रीय शैक्षणिक धोरण (NEP 2020) अंमलबजावणी परिषद',
    category: 'ACADEMIC SEMINAR',
    categoryMr: 'शैक्षणिक परिसंवाद',
    date: '22',
    month: 'AUG',
    monthMr: 'ऑगस्ट',
    year: '2024',
    location: 'BAMU University Hall',
    locationMr: 'बामु (BAMU) विद्यापीठ सभागृह',
    time: '10:00 AM - 04:00 PM',
    timeMr: 'सकाळी १०:०० ते दुपारी ०४:००',
    type: 'seminar',
    link: '#agenda'
  }
];

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Successful Green Campus Drive 2024 at Deogiri College',
    titleMr: 'देवगिरी महाविद्यालयात हरित परिसर मोहीम २०२४ यशस्वी',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCkUqDTY_YW24Eb4Y1f_RtJAmArZX6eB7zAfnOQNBDr9dCvekfEMOxOCJbcWssWusUlpCIIQkKlU5TMOIJIlUhO3X8OWpw5S4bxSZx1hvBPlE5Og4HsuxdZSPsRbqU_as81ikaJJ52Js410ZUbQan-cweFpqFYxj2mNOMrXyMwCfKLa5F6Vmu2PKwn1GMbxVxE_WSg8ObZHqUmU8n0Fn2XwNHW7BxwH9rDw_m0xRW7E9HBqCPCTcezadF24vSM2SscmUmC9ZrOONg2',
    tag: 'LATEST',
    tagMr: 'ताज्या घडामोडी',
    date: '25 Jul 2024',
    dateMr: '२५ जुलै २०२४',
    isLatest: true
  },
  {
    id: 'news-2',
    title: 'Student Empowerment and Leadership Seminar',
    titleMr: 'विद्यार्थी सक्षमीकरण आणि नेतृत्व कौशल्य कार्यशाळा',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhWx0RagalabyxGZaBI09oAUtQI9xEW9ZMYyEBZJCJfJ_GA1ogri3ELHA0rNrXVPqsRE8vqk6AmeHdKTkuhZ3AovMs1pOot044o9w25CDjDI8cnBFfjVla2VCh_ESDj6BYKq4S_JbOVmUch9V-OMOjpoqZO8tF86_qOPDWWAhH_IbxyW67hBy7rC18Xa3ef4F4sQ-qQOXKBycuMEkBUYUNCgxpnkoevnguO_GQZQxVsAxGou81FaAVs7XmRPGRBGNqVWl3t2vweEKi',
    tag: 'ACTIVITIES',
    tagMr: 'अभाविप उपक्रम',
    date: '18 Aug 2024',
    dateMr: '१८ ऑगस्ट २०२४'
  },
  {
    id: 'news-3',
    title: 'Digital Sovereignty Portal Launch Ceremony',
    titleMr: 'डिजिटल सार्वभौमत्व पोर्टलचा दिमाखदार अनावरण सोहळा',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp6TtRtuBmpGDLXNzGMNMuH3u-W4bNyE5n7gxi7lffJhVKXF3oAl231Ih5RSGwXcFCXxEsAaskMb5wiZBcHnxqrNFhN3B7DcKePQVrvapAOP9Av-f0Tj_sEdzW5CUJKwaq5t_Ur_ec8LJMkIfkVCUFY7SsaQfc6Cq7VZ_t-vlac1RibEU3KBSoRwp7-Gclogj3GYr4Bsj5dCZ8SVsxcw0I7JSVYo6GTqXWtDBudtBeiHVAIUKxEEY7ocvYTR09yzjLC-JMIPpJ3dFh',
    tag: 'NEWS',
    tagMr: 'बातम्या',
    date: '10 Aug 2024',
    dateMr: '१० ऑगस्ट २०२४'
  },
  {
    id: 'news-4',
    title: 'Academic Excellence Awards presentation',
    titleMr: 'शैक्षणिक उत्कृष्टता पुरस्कार वितरण सोहळा',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr9FFUNH0wIn0-ZpUs3eaaBqb3QHb-0NsQnYDKyBld3u8ptV1oKQ8-iQlin_mSMjk1On36uHRWM_ZDTEOB1R871cCer3Hjo7C-L80iK-PNG5xlSJsKhyF0d3TKX7AF78OrRbAkOZjpUU6V-OFOKHxXGrqP4Wfz8PFmsHJVWZzfgXMPAIE8F2LQRBURf0iOyCiDKi2msRhJvnUvukslffiOH2vd7TY9B6d4ByLLnH3x4GSFReCJ5-nUHNazxGGU851Jw56W7Lqp43-I',
    tag: 'GALLERY',
    tagMr: 'छायाचित्रे',
    date: '05 Aug 2024',
    dateMr: '०५ ऑगस्ट २०२४'
  }
];

export const announcementItems: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Admissions Open for ABVP Deogiri Student Hostels for Academic Year 2024-25.',
    titleMr: 'शैक्षणिक वर्ष २०२४-२५ साठी अभाविप देवगिरी वसतिगृहामध्ये प्रवेश सुरू.',
    date: '12 Jul 2024',
    dateMr: '१२ जुलै २०२४',
    priority: 'high',
    link: '#hostels'
  },
  {
    id: 'ann-2',
    title: 'Nomination forms out for the Executive Committee Representative elections.',
    titleMr: 'कार्यकारिणी समिती निवडणुकीसाठी उमेदवारी अर्ज उपलब्ध.',
    date: '18 Jul 2024',
    dateMr: '१८ जुलै २०२४',
    priority: 'normal',
    link: '#elections'
  },
  {
    id: 'ann-3',
    title: 'Apply for the SFD Grassroots Environment fellowship. Last date is 10th Aug.',
    titleMr: 'एस.एफ.डी. पर्यावरण फेलोशिपसाठी अर्ज आमंत्रित. अंतिम तारीख १० ऑगस्ट.',
    date: '20 Jul 2024',
    dateMr: '२० जुलै २०२४',
    priority: 'normal',
    link: '#fellowship'
  }
];
