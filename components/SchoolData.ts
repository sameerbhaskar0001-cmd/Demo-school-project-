import type {StaticImageData} from 'next/image';
import sunriseCampusImg from '@/src/assets/images/sunrise_campus_1794643389042.jpg';
import scienceLabImg from '@/src/assets/images/gallery_science_lab_1794643367590.jpg';
import libraryImg from '@/src/assets/images/gallery_library_1794643369053.jpg';
import sportsFieldImg from '@/src/assets/images/gallery_sports_field_1794643369018.jpg';
import artsStudioImg from '@/src/assets/images/gallery_arts_studio_1794643369538.jpg';
import auditoriumImg from '@/src/assets/images/gallery_auditorium_1794643369601.jpg';
import roboticsStemImg from '@/src/assets/images/gallery_robotics_stem_1794643370661.jpg';
import principalPortraitImg from '@/src/assets/images/principal_portrait_1794649985911.jpg';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface StatCounterItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  context: string;
}

export interface ProgramItem {
  id: string;
  index: string;
  title: string;
  grades: string;
  ages: string;
  summary: string;
  highlights: string[];
  schedule: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: StaticImageData;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
  outcome: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  {label: 'About', href: '#about'},
  {label: 'Programs', href: '#programs'},
  {label: 'Gallery', href: '#gallery'},
  {label: 'Admissions', href: '#admissions'},
  {label: 'Contact', href: '#contact'},
];

export const STAT_COUNTERS: StatCounterItem[] = [
  {
    id: 'students',
    target: 500,
    suffix: '+',
    label: 'Students',
    context: 'Nursery to Class 12',
  },
  {
    id: 'teachers',
    target: 40,
    suffix: '+',
    label: 'Expert Teachers',
    context: '12:1 student-faculty ratio',
  },
  {
    id: 'years',
    target: 25,
    suffix: '',
    label: 'Years of Excellence',
    context: 'Established in 2001',
  },
  {
    id: 'results',
    target: 98,
    suffix: '%',
    label: 'Results',
    context: 'Board & university placement',
  },
];

export const CAMPUS_IMAGE = {
  src: sunriseCampusImg,
  alt: 'Sunrise Public School brick and glass main academic building surrounded by sunlit lawns and walking paths',
};

export const PRINCIPAL_INFO = {
  name: 'Dr. Kavita Rao',
  credentials: 'M.Ed., Ph.D. · Principal since 2016',
  message:
    'True education balances rigorous curiosity with quiet kindness. At Sunrise, our classrooms, laboratories, and playing fields are designed so every student discovers both intellectual confidence and civic responsibility.',
  image: principalPortraitImg,
  alt: 'Dr. Kavita Rao, Principal of Sunrise Public School, smiling in the sunlit oak school library',
};

export const VISIT_SLOTS = [
  'Tue · 10:00 AM',
  'Thu · 11:30 AM',
  'Sat · 10:00 AM',
  'Flexible / Call Me',
];

export const GALLERY_CATEGORIES = [
  'All',
  'Academics',
  'Arts & Culture',
  'Athletics & STEM',
] as const;

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'primary',
    index: '01.',
    title: 'Primary',
    grades: 'Class 1–5',
    ages: 'Ages 6–11',
    summary:
      'Foundational literacy, numeracy, and curiosity-driven inquiry built in small homerooms where every learner builds confidence.',
    highlights: [
      'Phonics, bilingual reading workshops, and structured writing studios',
      'Hands-on NCERT-aligned mathematics and weekly nature science labs',
      'Daily visual arts, choir, and foundational movement education',
    ],
    schedule: '8:15 AM – 2:30 PM · 18 students max per section',
  },
  {
    id: 'middle',
    index: '02.',
    title: 'Middle',
    grades: 'Class 6–8',
    ages: 'Ages 11–14',
    summary:
      'Interdisciplinary laboratories, structured debate, and coding studios designed to guide early adolescents toward independent scholarship.',
    highlights: [
      'Integrated physical and life sciences with weekly lab practicums',
      'Algebraic reasoning, Python programming, and robotics prototyping',
      'Model UN, civic debate seminars, and mentored research projects',
    ],
    schedule: '8:00 AM – 3:15 PM · Advisory mentorship twice weekly',
  },
  {
    id: 'senior-secondary',
    index: '03.',
    title: 'Senior Secondary',
    grades: 'Class 9–12',
    ages: 'Ages 14–18',
    summary:
      'Rigorous CBSE board-preparatory streams across Science (PCM / PCB), Commerce, and Humanities paired with dedicated career counseling.',
    highlights: [
      'CBSE Streams: Science (PCM / PCB), Commerce, and Humanities with Computer Science',
      'Individualized competitive exam, portfolio, and scholarship advising from Class 10',
      'Capstone research projects defended before faculty and visiting academic fellows',
    ],
    schedule: '8:00 AM – 3:45 PM · Open seminar & lab hours until 5:00 PM',
  },
  {
    id: 'sports-arts',
    index: '04.',
    title: 'Sports & Arts',
    grades: 'All Classes',
    ages: 'Co-Curricular',
    summary:
      'Varsity athletics, performing arts, and fine studio electives woven directly into campus life to nurture discipline and creativity.',
    highlights: [
      '400m synthetic track, turf soccer pitch, basketball courts, and aquatics',
      'Ceramics, oil painting, chamber orchestra, and theatrical stagecraft',
      'Inter-school tournaments, annual fine arts exhibition, and winter recital',
    ],
    schedule: 'Daily 3:30 PM – 5:30 PM · Specialist coaching & studio access',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'science-lab',
    title: 'Analytical Chemistry Lab',
    category: 'Academics',
    caption: 'Students conducting quantitative titration experiments in the North Wing lab.',
    image: scienceLabImg,
    alt: 'Students wearing safety goggles conducting chemistry experiments with glassware in a bright school laboratory',
  },
  {
    id: 'oak-library',
    title: 'Central Oak Library',
    category: 'Academics',
    caption: 'Over 24,000 print volumes, quiet reading tables, and sunlit study alcoves.',
    image: libraryImg,
    alt: 'Students studying in a sunlit school library lined with tall oak bookshelves and arched windows',
  },
  {
    id: 'sports-field',
    title: 'Varsity Track & Turf Pitch',
    category: 'Athletics & STEM',
    caption: 'Regulation soccer pitch and 400-meter track hosting regional meets.',
    image: sportsFieldImg,
    alt: 'Student athletes practicing soccer and track running on a sunlit green field and red running track',
  },
  {
    id: 'arts-studio',
    title: 'Skylit Fine Arts Studio',
    category: 'Arts & Culture',
    caption: 'Natural north-light studio equipped for painting, sculpture, and ceramics.',
    image: artsStudioImg,
    alt: 'Students painting at wooden easels and throwing pottery under bright skylights in a school arts studio',
  },
  {
    id: 'auditorium',
    title: 'Performing Arts & Debate Hall',
    category: 'Arts & Culture',
    caption: '420-seat acoustic auditorium for assemblies, theatre, and debate finals.',
    image: auditoriumImg,
    alt: 'Student speaking at a wooden podium on a warm lit auditorium stage during a school debate assembly',
  },
  {
    id: 'robotics-stem',
    title: 'Robotics & STEM Makerspace',
    category: 'Athletics & STEM',
    caption: '3D printers, electronics benches, and competition robotics engineering.',
    image: roboticsStemImg,
    alt: 'High school students collaborating on a metal robotics chassis and laptop code in a STEM makerspace',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Before joining Sunrise in Class 6, my daughter hesitated to speak in class. Through weekly debate seminars and patient mentorship from her English advisor, she led our regional Model UN delegation this spring.',
    author: 'Meera Deshmukh',
    role: 'Parent of Ananya Deshmukh (Class 10)',
    context: 'Enrolled 4 years',
    outcome: 'Regional Debate Captain',
  },
  {
    id: 't2',
    quote:
      'The robotics makerspace and senior physics labs gave me the space to build real prototypes rather than just memorize equations. That hands-on research portfolio helped me earn an early engineering scholarship.',
    author: 'Rohan Kulkarni',
    role: 'Alumnus, Batch of 2024',
    context: 'Senior Secondary Science (PCM)',
    outcome: 'B.Tech Mechanical Engineering Scholar',
  },
  {
    id: 't3',
    quote:
      'Moving cities mid-year felt daunting, yet Sunrise’s primary homeroom teachers had both of our boys settled within two weeks. Daily reading check-ins and afternoon athletics transformed their confidence.',
    author: 'Amit & Sunita Verma',
    role: 'Parents of Aarav (Class 4) & Vivaan (Class 7)',
    context: 'Transfer Family',
    outcome: '98% Literacy & Math Benchmark',
  },
  {
    id: 't4',
    quote:
      'What sets Sunrise Public School apart is balance—our son trains four afternoons a week with the varsity track coach without ever falling behind in senior secondary sciences thanks to structured faculty office hours.',
    author: 'Priya Nair',
    role: 'Parent of Arjun Nair (Class 11)',
    context: 'Varsity Track & CBSE Science',
    outcome: 'State 800m Finalist · 96.4% in CBSE Class 12',
  },
];
