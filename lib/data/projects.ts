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
  size: 'small' | 'medium' | 'large' | 'wide';
}

export const projects: Project[] = [
  {
    id: 'desert-projects',
    title: 'The Desert Projects',
    client: 'Muscat MEP Engineering',
    description: 'A premium WordPress theme development for a leading MEP Engineering firm in Muscat, featuring dynamic galleries and multi-language support.',
    tech: ['WordPress', 'PHP', 'Swiper.js'],
    url: 'https://desertgp.com',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200'], // Thematic high-res engineering
    features: ['Custom WP Theme', 'Language Switcher', 'Project Gallery', 'MEP Service Modules'],
    category: 'wordpress',
    size: 'large'
  },
  {
    id: 'ayisha-muneer',
    title: 'Ayisha Muneer Portfolio',
    client: 'Ayisha Muneer',
    description: 'Personal portfolio for a design professional, focusing on minimalism and high-end typography.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    url: 'https://ayishamuneer.com',
    images: ['https://www.ayishamuneer.com/assets/pic1.webp'],
    features: ['Minimalist Design', 'Smooth Transitions', 'Project Case Studies'],
    category: 'landing',
    size: 'small'
  },
  {
    id: 'stepvision',
    title: 'Stepvision Hotels',
    client: 'Stepvision Hotel Supplies',
    description: 'B2B supply platform for hospitality industry with advanced product filtering.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://stepvisionhotelsupplies.com',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200'], // Thematic Hotel
    features: ['Product Catalog', 'B2B Pricing', 'Order Management'],
    category: 'saas',
    size: 'medium'
  },
  {
    id: 'nuniversal-yoga',
    title: 'NUniversal Yoga',
    client: 'NUniversal Yoga',
    description: 'Holistic yoga and wellness platform featuring custom booking systems and session galleries.',
    tech: ['WordPress', 'Custom Themes', 'Booking API'],
    url: 'https://nuniversalyoga.ae',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200'], // Thematic Yoga
    features: ['Session Booking', 'Trainer Profiles', 'Wellness Blog'],
    category: 'wordpress',
    size: 'wide'
  },
  {
    id: 'payyoli-mixture',
    title: 'Payyoli Mixture',
    client: 'Payyoli Foods',
    description: 'E-commerce platform for authentic traditional snacks with high-performance cart functionality.',
    tech: ['Next.js', 'Shopify Headless', 'Tailwind CSS'],
    url: 'https://www.payyolimixture.co.in/',
    images: ['https://www.payyolimixture.co.in/wp-content/uploads/2025/01/mixture.webp'],
    features: ['E-commerce', 'Payment Gateway', 'Order Tracking'],
    category: 'saas',
    size: 'small'
  },
  {
    id: 'aurora-souq',
    title: 'Aurora Souq',
    client: 'Aurora Trading',
    description: 'Modern marketplace for lifestyle and decor products with a sleek, minimalist UI.',
    tech: ['WordPress', 'WooCommerce', 'Elementor Custom'],
    url: 'https://www.aurorasouq.com/',
    images: ['https://aurorasouq.com/wp-content/uploads/2023/06/1.webp'],
    features: ['WooCommerce', 'Product Search', 'Flash Sales'],
    category: 'wordpress',
    size: 'medium'
  },
  {
    id: 'alrizq',
    title: 'Al Rizq Trading',
    client: 'Al Rizq',
    description: 'Corporate portal for trade management and company services across the GCC.',
    tech: ['WordPress', 'Divi Custom', 'PHP'],
    url: 'https://www.alrizq.sa/',
    images: ['https://www.alrizq.sa/wp-content/uploads/2025/12/frozen-Salment-filled-Norway.jpg'],
    features: ['Corporate Portfolio', 'GCC Regions', 'Service Modules'],
    category: 'wordpress',
    size: 'small'
  },
  {
    id: 'pixel-pepper',
    title: 'Pixel & Pepper',
    client: 'Agency Brand',
    description: 'Creative agency portfolio showcasing design and digital marketing Excellence.',
    tech: ['Next.js', 'GSAP', 'Framer Motion'],
    url: 'https://pixelandpepper.com/',
    images: ['https://pixelandpepper.com/wp-content/uploads/2025/05/portfolio.png'],
    features: ['Creative UI', 'Lottie Animations', 'Contact Flow'],
    category: 'react',
    size: 'large'
  },
  {
    id: 'learnix',
    title: 'Learnix Education',
    client: 'Learnix Group',
    description: 'Educational platform for tutoring and online courses with interactive student modules.',
    tech: ['React', 'Firebase', 'Tailwind'],
    url: 'https://learnixonline.com/',
    images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200'], // Thematic Education
    features: ['Course Explorer', 'Student Portal', 'Live Classes'],
    category: 'saas',
    size: 'small'
  },
  {
    id: 'jaypee-dent',
    title: 'Jaypee Dent',
    client: 'Jaypee Dental Clinic',
    description: 'Healthcare portal for dental services with appointment booking and patient resources.',
    tech: ['WordPress', 'Medical SEO', 'Forms'],
    url: 'https://jaypeedent.com/',
    images: ['https://jaypeedent.com/wp-content/uploads/2022/01/Rainbow-Latest-Elastics-Bubblegum-Flavour-Pink-Color-7.webp'],
    features: ['Appointment Form', 'Service Grid', 'Patient Reviews'],
    category: 'landing',
    size: 'wide'
  }
];

