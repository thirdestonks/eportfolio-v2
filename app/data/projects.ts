import type { Project } from '~/types'

export const projects: Project[] = [
  {
    slug: 'memory-lane',
    index: '01',
    role: 'FULL-STACK ENGINEER',
    note: 'PERSONAL PROJECT',
    title: 'Memory Lane',
    description:
      'A web-based photobooth experience with customizable filters and unique frames.',
    image: '/images/memory-lane.png',
    alt: 'Memory Lane',
    dossier: {
      subtitle:
        'Media-sharing platform with S3 storage, role-based access, and dynamic customization.',
      status: 'IN DEVELOPMENT',
      stack: 'NESTJS + NUXT3',
      type: 'FULL STACK',
      extraMeta: { label: 'STORAGE', value: 'BACKBLAZE B2' },
      timeline: 'Dec 2024 - Current',
      disciplines: [
        'User Experience Design',
        'User Interface Design',
        'Full Stack Development',
      ],
      tools: ['Jira', 'BackBlaze B2'],
      techStack: ['Nuxt3', 'NestJS', 'Tailwind CSS', 'Vuetify', 'PostgreSQL', 'JWT'],
      background: [
        'Memory Lane started as a personal passion project — a simple platform where I could store and manage my own images and videos while practicing S3-compatible storage integration using Backblaze B2.',
        'What began as a backend-focused experiment evolved into a full-stack platform built with NestJS and Nuxt 3. The project became a practical way to deepen my knowledge of scalable architecture, file uploads, access control, and cloud storage systems.',
        'Initially intended for personal use, the platform later evolved toward multi-user support with dynamic configuration, role-based access, and a scalable structure designed for future expansion.',
      ],
      features: [
        {
          icon: 'fa-solid fa-cloud',
          title: 'S3 Compatible',
          description: 'Seamless integration with S3-compatible cloud storage systems.',
        },
        {
          icon: 'fa-solid fa-qrcode',
          title: 'QR Sharing',
          description: 'Generate QR-based media sharing functionality for simplified access.',
        },
        {
          icon: 'fa-solid fa-desktop',
          title: 'Responsive UI',
          description: 'Optimized experience across desktop, tablet, and mobile devices.',
        },
        {
          icon: 'fa-solid fa-cog',
          title: 'Dynamic Config',
          description: 'Configurable platform behavior with scalable system architecture.',
        },
      ],
    },
  },
  {
    slug: 'smart-campus',
    index: '02',
    role: 'FULL-STACK ENGINEER',
    note: 'SMART CAMPUS (COMPANY USE ONLY)',
    title: 'Smart Campus',
    description:
      'A large-scale campus management system with 20+ modules, built to modernize marine schools.',
    image: '/images/company-use.png',
    alt: 'Smart Campus',
    dossier: {
      subtitle:
        'Enterprise-scale academic management platform comprising 20+ interconnected modules for marine institutions and administrative operations.',
      status: 'PRODUCTION READY',
      stack: 'LARAVEL + NUXT3',
      type: 'ENTERPRISE SYSTEM',
      extraMeta: { label: 'MODULES', value: '20+' },
      timeline: 'Aug 2023 - April 2025',
      disciplines: [
        'User Experience Design',
        'User Interface Design',
        'Full Stack Development',
      ],
      tools: ['Figma', 'MinIO S3'],
      techStack: ['Nuxt3', 'Laravel', 'NestJS', 'PostgreSQL', 'RabbitMQ', 'JWT'],
      background: [
        'Smart Campus was developed as a large-scale enterprise solution for marine institutions, designed to replace fragmented manual processes with a centralized digital ecosystem.',
        'The platform consists of 20+ interconnected modules — including Admission, Registrar, Library, Cashier, Accounting, and academic management systems — all integrated into a unified infrastructure.',
        'Beyond digitalization, the system focused heavily on scalability, real-time communication, dynamic configuration, and operational efficiency for maritime education institutions.',
        'The result was a production-ready enterprise platform capable of supporting institutional growth while improving workflow visibility and reducing administrative overhead.',
      ],
      features: [
        {
          icon: 'fa-solid fa-layer-group',
          title: '20+ Modules',
          description:
            'Integrated academic and administrative systems operating under one platform architecture.',
        },
        {
          icon: 'fa-solid fa-clock',
          title: 'Realtime Systems',
          description:
            'Realtime notifications, email processing, and status synchronization across modules.',
        },
        {
          icon: 'fa-solid fa-cloud',
          title: 'S3 Integration',
          description:
            'Integrated MinIO S3-compatible storage for scalable media and document handling.',
        },
        {
          icon: 'fa-solid fa-gears',
          title: 'Dynamic Config',
          description:
            'Database-driven triggers and configurable enterprise workflows across the platform.',
        },
      ],
    },
  },
  {
    slug: 'dynamic-enrollment-system',
    index: '03',
    role: 'FULL-STACK ENGINEER',
    note: 'DYNAMIC ENROLLMENT SYSTEM (COMPANY USE ONLY)',
    title: 'Dynamic Enrollment System',
    description:
      'A highly configurable enrollment system designed for schools and academies. Features include a payment gateway integration, dynamic email notifications, and flexible workflows that adapt to various academic requirements.',
    image: '/images/company-useto.png',
    alt: 'Dynamic Enrollment System',
    dossier: {
      subtitle:
        'Configurable enrollment platform for schools and academies, with payment gateway integration and adaptive workflows.',
      status: 'PRODUCTION READY',
      stack: 'LARAVEL + VUE',
      type: 'ENTERPRISE SYSTEM',
      extraMeta: { label: 'ACCESS', value: 'COMPANY USE ONLY' },
      timeline: '2025 - Current',
      disciplines: ['User Interface Design', 'Full Stack Development'],
      tools: ['Jira'],
      techStack: ['Vue', 'Laravel', 'PostgreSQL', 'JWT'],
      background: [
        'Built for academies that needed enrollment workflows tailored to their own requirements instead of a one-size-fits-all form.',
        'Handles payment gateway integration and dynamic email notifications so enrollment status changes reach students and staff automatically.',
        'Configuration lives in the data, not the code — workflows adapt per institution without redeploying the system.',
      ],
      features: [
        {
          icon: 'fa-solid fa-credit-card',
          title: 'Payment Gateway',
          description: 'Integrated payment processing for enrollment and tuition fees.',
        },
        {
          icon: 'fa-solid fa-envelope-open-text',
          title: 'Dynamic Notifications',
          description: 'Automated, configurable email notifications through the enrollment flow.',
        },
        {
          icon: 'fa-solid fa-diagram-project',
          title: 'Flexible Workflows',
          description: 'Enrollment workflows that adapt to each academy’s own requirements.',
        },
      ],
    },
  },
  {
    slug: 'ortibites',
    index: '04',
    role: 'MOBILE ENGINEER',
    note: 'PERSONAL PROJECT',
    title: 'OrtiBites',
    description:
      'A retro-inspired food memory app for Ortigas workers to discover, rate, and revisit their favorite food spots.',
    image: '/images/ob-login.png',
    alt: 'OrtiBites',
    portrait: true,
    dossier: {
      subtitle:
        'A retro-inspired food memory app for Ortigas workers discovering, rating, and revisiting their favorite food spots.',
      status: 'IN DEVELOPMENT',
      stack: 'REACT NATIVE + EXPO',
      type: 'MOBILE APP',
      extraMeta: { label: 'BACKEND', value: 'SUPABASE' },
      timeline: '2026 - Current',
      disciplines: [
        'Mobile App Design',
        'User Interface Design',
        'Full Stack Mobile Development',
      ],
      tools: ['Expo', 'Supabase'],
      techStack: [
        'React Native',
        'Expo Router',
        'TypeScript',
        'NativeWind v4',
        'Supabase (Postgres + Auth + RLS)',
      ],
      background: [
        'OrtiBites is a cinematic food journaling app designed for Ortigas workers who are constantly exploring restaurants, hidden gems, comfort food spots, and memorable dining experiences around the city.',
        'Rather than functioning as another generic restaurant directory, the app focuses on preserving personal food memories — combining restaurant tracking, favorite dishes, dining pros and cons, and ratings into a cozy, visually expressive mobile experience.',
        'Built with a retro diner inspired aesthetic on React Native and Expo, with Supabase handling auth, storage, and row-level security on the backend, OrtiBites is designed to feel personal, nostalgic, and cinematic rather than corporate.',
      ],
      features: [
        {
          icon: 'fa-solid fa-utensils',
          title: 'Food Journal',
          description:
            'Create, edit, and delete restaurant entries to build a personal log of dining experiences instead of a generic directory.',
        },
        {
          icon: 'fa-solid fa-scale-balanced',
          title: 'Pros & Cons Log',
          description:
            'Store dining pros and cons for every spot so future-you remembers what worked and what didn’t.',
        },
        {
          icon: 'fa-solid fa-star',
          title: 'Favorite Dishes & Ratings',
          description:
            'Save standout dishes and rate every dining experience with a built-in restaurant ratings system.',
        },
        {
          icon: 'fa-solid fa-record-vinyl',
          title: 'Retro Diner UI',
          description:
            'Dark cinematic interface with an orange/amber accent system, smooth fade transitions, and a mobile-first responsive layout.',
        },
        {
          icon: 'fa-solid fa-dice',
          title: 'Food Roulette',
          description:
            'Can’t decide what to eat? Spin the roulette to randomly land on one of your saved spots and settle the debate.',
        },
        {
          icon: 'fa-solid fa-chart-pie',
          title: 'OrtiBites Wrapped',
          description: 'A Spotify Wrapped inspired yearly recap surfacing your most-visited spots.',
        },
      ],
      screens: [
        { image: '/images/ob-splash.png', alt: 'OrtiBites splash screen', caption: 'splash.tsx' },
        { image: '/images/ob-login.png', alt: 'OrtiBites login screen', caption: 'login.tsx' },
        { image: '/images/ob-dash.png', alt: 'OrtiBites diner memory feed', caption: 'memory-feed.tsx' },
      ],
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}
