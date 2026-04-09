export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  tech: string[];
  url?: string;
  images: string[];
  features: string[];
  challenge?: string;
  solution?: string;
  category: 'wordpress' | 'react' | 'saas' | 'landing';
}

export const projects: Project[] = [
  {
    id: 'desert-projects',
    title: 'The Desert Projects',
    client: 'Muscat MEP Engineering',
    description: 'A premium WordPress theme development for a leading MEP Engineering firm in Muscat, featuring dynamic galleries and multi-language support.',
    tech: ['WordPress', 'PHP', 'Swiper.js', 'Tailwind CSS'],
    url: 'https://desertgp.com',
    images: ['/projects/desert-1.jpg'],
    features: ['Custom WP Theme', 'Language Switcher', 'Project Gallery', 'MEP Service Modules'],
    category: 'wordpress',
    challenge: 'Need for a robust, multi-lingual platform to showcase complex engineering projects to international clients.',
    solution: 'Developed a high-performance custom WordPress theme with optimized image delivery and intuitive navigation.'
  },
  {
    id: 'ayisha-muneer',
    title: 'Ayisha Muneer Portfolio',
    client: 'Ayisha Muneer',
    description: 'Personal portfolio for a design professional, focusing on minimalism and high-end typography.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    url: 'https://ayishamuneer.com',
    images: ['/projects/ayisha-1.jpg'],
    features: ['Minimalist Design', 'Smooth Transitions', 'Project Case Studies'],
    category: 'landing'
  },
  {
    id: 'stepvision',
    title: 'Stepvision Hotels',
    client: 'Stepvision Hotel Supplies',
    description: 'B2B supply platform for hospitality industry with advanced product filtering.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://stepvisionhotelsupplies.com',
    images: ['/projects/stepvision-1.jpg'],
    features: ['Product Catalog', 'B2B Pricing', 'Order Management'],
    category: 'saas'
  },
  {
    id: 'nuniversal-yoga',
    title: 'NUniversal Yoga',
    client: 'NUniversal Yoga',
    description: 'Holistic yoga and wellness platform featuring custom booking systems and session galleries.',
    tech: ['WordPress', 'Custom Themes', 'Booking API'],
    url: 'https://nuniversalyoga.ae',
    images: ['/projects/yoga-1.jpg'],
    features: ['Session Booking', 'Trainer Profiles', 'Wellness Blog'],
    category: 'wordpress'
  },
  {
    id: 'payyoli-mixture',
    title: 'Payyoli Mixture',
    client: 'Payyoli Foods',
    description: 'E-commerce platform for authentic traditional snacks with high-performance cart functionality.',
    tech: ['Next.js', 'Shopify Headerless', 'Tailwind CSS'],
    url: 'https://www.payyolimixture.co.in/',
    images: ['/projects/payyoli-1.jpg'],
    features: ['E-commerce', 'Payment Gateway', 'Order Tracking'],
    category: 'saas'
  },
  {
    id: 'aurora-souq',
    title: 'Aurora Souq',
    client: 'Aurora Trading',
    description: 'Modern marketplace for lifestyle and decor products with a sleek, minimalist UI.',
    tech: ['WordPress', 'WooCommerce', 'Elementor Custom'],
    url: 'https://www.aurorasouq.com/',
    images: ['/projects/aurora-1.jpg'],
    features: ['WooCommerce', 'Product Search', 'Flash Sales'],
    category: 'wordpress'
  },
  {
    id: 'alrizq',
    title: 'Al Rizq Trading',
    client: 'Al Rizq',
    description: 'Corporate portal for trade management and company services across the GCC.',
    tech: ['WordPress', 'Divi Custom', 'PHP'],
    url: 'https://www.alrizq.sa/',
    images: ['/projects/alrizq-1.jpg'],
    features: ['Corporate Portfolio', 'GCC Regions', 'Service Modules'],
    category: 'wordpress'
  },
  {
    id: 'jaypee-dent',
    title: 'Jaypee Dent',
    client: 'Jaypee Dental Clinic',
    description: 'Healthcare portal for dental services with appointment booking and patient resources.',
    tech: ['WordPress', 'Medical SEO', 'Forms'],
    url: 'https://jaypeedent.com/',
    images: ['/projects/jaypee-1.jpg'],
    features: ['Appointment Form', 'Service Grid', 'Patient Reviews'],
    category: 'landing'
  },
  {
    id: 'pixel-pepper',
    title: 'Pixel & Pepper',
    client: 'Agency Brand',
    description: 'Creative agency portfolio showcasing design and digital marketing Excellence.',
    tech: ['Next.js', 'GSAP', 'Framer Motion'],
    url: 'https://pixelandpepper.com/',
    images: ['/projects/pixel-1.jpg'],
    features: ['Creative UI', 'Lottie Animations', 'Contact Flow'],
    category: 'react'
  },
  {
    id: 'learnix',
    title: 'Learnix Education',
    client: 'Learnix Group',
    description: 'Educational platform for tutoring and online courses with interactive student modules.',
    tech: ['React', 'Firebase', 'Tailwind'],
    url: 'https://learnixeducation.com/',
    images: ['/projects/learnix-1.jpg'],
    features: ['Course Explorer', 'Student Portal', 'Live Classes'],
    category: 'saas'
  },
  {
    id: 'sahara-tutors',
    title: 'Sahara Tutors',
    client: 'Sahara EdTech',
    description: 'Premium tutoring service landing page optimized for conversion and local search.',
    tech: ['WordPress', 'SEO Optimization', 'Speed Kit'],
    url: 'https://saharatutors.com/',
    images: ['/projects/sahara-1.jpg'],
    features: ['Lead Generation', 'Tutor Search', 'Review System'],
    category: 'landing'
  },
  {
    id: 'suntools',
    title: 'Sun Tools Engineering',
    client: 'Sun Tools',
    description: 'Industrial tools catalog and corporate web presence for engineering supplies.',
    tech: ['WordPress', 'Industrial Theme', 'Catalog'],
    url: 'https://suntoolsengineering.com/',
    images: ['/projects/suntools-1.jpg'],
    features: ['B2B Catalog', 'Quote Request', 'Supplier Info'],
    category: 'wordpress'
  },
  {
    id: 'ahalia-group',
    title: 'Ahalia Group',
    client: 'Ahalia Medical',
    description: 'Large-scale healthcare group portal managing multiple clinical locations and services.',
    tech: ['WordPress', 'Multisite', 'Custom DB'],
    url: 'https://ahaliagroup.com/',
    images: ['/projects/ahalia-1.jpg'],
    features: ['Location Finder', 'Doctor Directory', 'Health Blog'],
    category: 'wordpress'
  },
  {
    id: 'bhnoe-hyundai',
    title: 'BHNOE Hyundai',
    client: 'Hyundai Dealer',
    description: 'Automotive dealership platform with car explorer and service booking.',
    tech: ['WordPress', 'Automotive Schema', 'API Integration'],
    url: 'https://bhnoe-hyundai.com/',
    images: ['/projects/hyundai-1.jpg'],
    features: ['Car Showroom', 'Finance Calculator', 'Test Drive Booking'],
    category: 'wordpress'
  },
  {
    id: 'dua-college',
    title: 'Dua College',
    client: 'Dua Educational Inst',
    description: 'Higher education website for college admissions and academic information.',
    tech: ['WordPress', 'Education LMS', 'Tailwind'],
    url: 'https://duacollege.in/',
    images: ['/projects/dua-1.jpg'],
    features: ['Online Admissions', 'Course Catalog', 'Campus News'],
    category: 'wordpress'
  }
];
