// ============================================================================
// RoboNorth.ca — Manufacturer Directory
// ============================================================================

import type { Manufacturer } from '../types';

export type { Manufacturer };

export const manufacturers: Manufacturer[] = [
  {
    id: 'unitree-robotics',
    name: 'Unitree Robotics',
    country: 'China',
    founded: '2016',
    description:
      'Founded by Wang Xingxing in Hangzhou, Unitree is the world\'s leading affordable robotics company. Originally known for quadruped robots (Go1, Go2, B2), Unitree now offers the broadest humanoid lineup spanning from the $5,900 R1 to the $150K H1, shipping to over 30 countries.',
    website: 'https://www.unitree.com',
    robotIds: ['unitree-r1', 'unitree-g1', 'unitree-h1'],
    imageUrl: '/images/manufacturers/unitree-robotics.jpg',
    featured: true,
  },
  {
    id: '1x-technologies',
    name: '1X Technologies',
    country: 'Norway',
    founded: '2014',
    description:
      'Norwegian robotics company (formerly Halodi Robotics) backed by OpenAI and Tiger Global. 1X is building NEO, the world\'s first consumer humanoid robot designed for home use, with a revolutionary soft-body design for safe human cohabitation.',
    website: 'https://www.1x.tech',
    robotIds: ['1x-neo'],
    imageUrl: '/images/manufacturers/1x-technologies.jpg',
    featured: true,
  },
  {
    id: 'tesla',
    name: 'Tesla',
    country: 'USA',
    founded: '2003',
    description:
      'The EV giant is applying its massive AI and manufacturing expertise to humanoid robotics. Tesla\'s Optimus program leverages Full Self-Driving neural networks for robot perception, with over 1,000 units deployed internally. Elon Musk has called Optimus Tesla\'s most valuable long-term product.',
    website: 'https://www.tesla.com',
    robotIds: ['tesla-optimus-gen-3'],
    imageUrl: '/images/manufacturers/tesla.jpg',
    featured: true,
  },
  {
    id: 'figure-ai',
    name: 'Figure AI',
    country: 'USA',
    founded: '2022',
    description:
      'One of the most well-funded robotics startups in history ($2.6B+ raised), Figure AI is deploying humanoid robots in BMW manufacturing facilities. Their Helix autonomy framework enables whole-body neural control, and a partnership with OpenAI powers natural-language task instruction.',
    website: 'https://www.figure.ai',
    robotIds: ['figure-02', 'figure-03'],
    imageUrl: '/images/manufacturers/figure-ai.jpg',
    featured: true,
  },
  {
    id: 'agility-robotics',
    name: 'Agility Robotics',
    country: 'USA',
    founded: '2015',
    description:
      'Builder of Digit, the first humanoid robot in commercial warehouse deployment. Agility operates RoboFab, the world\'s first humanoid robot factory in Salem, Oregon. Backed by Amazon, with pilot deployments at major logistics providers including GXO.',
    website: 'https://www.agilityrobotics.com',
    robotIds: ['agility-digit'],
    imageUrl: '/images/manufacturers/agility-robotics.jpg',
    featured: false,
  },
  {
    id: 'boston-dynamics',
    name: 'Boston Dynamics',
    country: 'USA',
    founded: '1992',
    description:
      'The iconic robotics company founded at MIT, now owned by Hyundai Motor Group. Boston Dynamics pioneered dynamic legged locomotion and continues to set the benchmark with the all-electric Atlas. Their Spot and Stretch robots are commercially deployed worldwide.',
    website: 'https://www.bostondynamics.com',
    robotIds: ['boston-dynamics-atlas'],
    imageUrl: '/images/manufacturers/boston-dynamics.jpg',
    featured: true,
  },
  {
    id: 'apptronik',
    name: 'Apptronik',
    country: 'USA',
    founded: '2016',
    description:
      'Austin-based robotics company spun out of the Human Centered Robotics Lab at UT Austin. The team that built NASA\'s Valkyrie robot now builds Apollo, targeting a $50K price point at scale. Partnered with Mercedes-Benz and GXO for industrial deployment.',
    website: 'https://www.apptronik.com',
    robotIds: ['apptronik-apollo'],
    imageUrl: '/images/manufacturers/apptronik.jpg',
    featured: false,
  },
  {
    id: 'sanctuary-ai',
    name: 'Sanctuary AI',
    country: 'Canada',
    founded: '2018',
    description:
      'Vancouver-based AI and robotics company building the world\'s first human-like intelligence in general-purpose robots. Their proprietary Carbon AI system is a cognitive architecture that translates human intent into robotic action. Partnered with Magna International for automotive manufacturing.',
    website: 'https://www.sanctuary.ai',
    robotIds: ['sanctuary-ai-phoenix'],
    imageUrl: '/images/manufacturers/sanctuary-ai.jpg',
    featured: true,
  },
  {
    id: 'fourier-intelligence',
    name: 'Fourier Intelligence',
    country: 'China',
    founded: '2015',
    description:
      'Shanghai-based robotics company with deep expertise in rehabilitation and medical robotics. Fourier is leveraging a decade of healthcare robotics experience to build general-purpose humanoids, with the GR series bridging the gap between medical devices and autonomous robots.',
    website: 'https://www.fftai.com',
    robotIds: ['fourier-gr-1', 'fourier-gr-2'],
    imageUrl: '/images/manufacturers/fourier-intelligence.jpg',
    featured: false,
  },
  {
    id: 'ubtech',
    name: 'UBTECH',
    country: 'China',
    founded: '2012',
    description:
      'Shenzhen-based robotics company and one of the first publicly traded humanoid robot makers (HKEX: 9880). UBTECH has deployed Walker S2 robots in NIO and Dongfeng automotive factories, with an autonomous battery-swap system enabling 24/7 continuous operation.',
    website: 'https://www.ubtrobot.com',
    robotIds: ['ubtech-walker-s2'],
    imageUrl: '/images/manufacturers/ubtech.jpg',
    featured: false,
  },
  {
    id: 'kepler-robotics',
    name: 'Kepler Robotics',
    country: 'China',
    founded: '2023',
    description:
      'Shanghai-based humanoid robotics startup founded with the mission to make humanoid robots affordable for mass deployment. The Forerunner series targets the $30K price point, aiming to be one of the first enterprise humanoids accessible to small and mid-size businesses.',
    website: 'https://www.kepler-robotics.com',
    robotIds: ['kepler-forerunner'],
    imageUrl: '/images/manufacturers/kepler-robotics.jpg',
    featured: false,
  },
  {
    id: 'softbank-robotics',
    name: 'SoftBank Robotics',
    country: 'Japan',
    founded: '2014',
    description:
      'A subsidiary of SoftBank Group, SoftBank Robotics is the creator of Pepper — the world\'s first social humanoid robot for consumer use. Over 15,000 Pepper units have been deployed worldwide in retail, hospitality, healthcare, and education settings.',
    website: 'https://www.softbankrobotics.com',
    robotIds: ['softbank-pepper'],
    imageUrl: '/images/manufacturers/softbank-robotics.jpg',
    featured: false,
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    country: 'China',
    founded: '2010',
    description:
      'Global technology giant known for smartphones and smart home devices. Xiaomi unveiled CyberOne as a technology demonstrator showcasing the company\'s AI capabilities, including emotion recognition and 3D spatial perception. Robotics remains a research initiative within the broader Xiaomi ecosystem.',
    website: 'https://www.mi.com',
    robotIds: ['xiaomi-cyberone'],
    imageUrl: '/images/manufacturers/xiaomi.jpg',
    featured: false,
  },
  {
    id: 'engineered-arts',
    name: 'Engineered Arts',
    country: 'UK',
    founded: '2004',
    description:
      'Cornwall-based company and the world leader in entertainment and exhibition humanoid robots. Engineered Arts has over 20 years of experience building lifelike humanoids, with Ameca becoming a viral sensation for its uncannily realistic facial expressions. Used by research institutions, museums, and Fortune 500 companies worldwide.',
    website: 'https://www.engineeredarts.co.uk',
    robotIds: ['engineered-arts-ameca'],
    imageUrl: '/images/manufacturers/engineered-arts.jpg',
    featured: false,
  },
  {
    id: 'agibot',
    name: 'Agibot',
    country: 'China',
    founded: '2023',
    description:
      'Shanghai-based humanoid robotics startup backed by CATL (the world\'s largest battery maker) and other major investors. Agibot focuses on industrial humanoids for automotive and electronics manufacturing, combining whole-body control with dexterous manipulation for complex assembly tasks.',
    website: 'https://www.agibot.com',
    robotIds: ['agibot-a2'],
    imageUrl: '/images/manufacturers/agibot.jpg',
    featured: false,
  },
  {
    id: 'xpeng',
    name: 'XPENG',
    country: 'China',
    founded: '2014',
    description:
      'Major Chinese EV manufacturer expanding into humanoid robotics, leveraging its AI and autonomous driving technology stack. XPENG\'s Iron robot represents the company\'s vision for general-purpose robots that can operate in both industrial and domestic environments.',
    website: 'https://www.xpeng.com',
    robotIds: ['xpeng-iron'],
    imageUrl: '/images/manufacturers/xpeng.jpg',
    featured: false,
  },
  {
    id: 'neura-robotics',
    name: 'Neura Robotics',
    country: 'Germany',
    founded: '2019',
    description:
      'Europe\'s leading humanoid robotics startup, headquartered in Metzingen, Germany. Neura combines cognitive AI with advanced robotics hardware, positioning the 4NE-1 as "the world\'s first cognitive robot." The company has raised over €100M and operates one of Europe\'s largest humanoid development programs.',
    website: 'https://www.neura-robotics.com',
    robotIds: ['neura-robotics-4ne-1'],
    imageUrl: '/images/manufacturers/neura-robotics.jpg',
    featured: false,
  },
  {
    id: 'clone-robotics',
    name: 'Clone Robotics',
    country: 'Poland',
    founded: '2021',
    description:
      'Polish startup pioneering musculoskeletal humanoid robots that use artificial muscles and tendons instead of traditional electric motors. Clone\'s bio-inspired approach mimics the human body\'s architecture, producing remarkably lifelike movement patterns that could redefine the field of soft robotics.',
    website: 'https://www.clonerobotics.com',
    robotIds: ['clone-alpha'],
    imageUrl: '/images/manufacturers/clone-robotics.jpg',
    featured: false,
  },
];
