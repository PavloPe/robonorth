// ============================================================================
// RoboNorth.ca — Extended Robot Data (FAQs, CAD pricing, shipping, videos)
// ============================================================================

/** CAD pricing with exchange rate note */
export interface CADPricing {
  cadEstimate: string;
  usdOriginal: string;
  exchangeNote: string;
}

/** Shipping & import info for Canadian buyers */
export interface ShippingInfo {
  origin: string;
  estimatedShipping: string;
  customsDuty: string;
  hsCode: string;
  importNotes: string;
}

/** FAQ entry */
export interface RobotFAQ {
  question: string;
  answer: string;
}

/** YouTube video ID */
export interface VideoInfo {
  youtubeId: string;
  title: string;
}

export interface RobotExtras {
  cadPricing?: CADPricing;
  shipping?: ShippingInfo;
  faqs: RobotFAQ[];
  videos: VideoInfo[];
}

const USD_TO_CAD = 1.38; // approximate as of mid-2026

export const robotExtras: Record<string, RobotExtras> = {
  'unitree-r1': {
    cadPricing: {
      cadEstimate: 'From ~$8,150 CAD',
      usdOriginal: '$5,900 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD. Actual rate varies.`,
    },
    shipping: {
      origin: 'Hangzhou, China',
      estimatedShipping: '2–4 weeks via air freight',
      customsDuty: '0–8% depending on HS classification',
      hsCode: '8479.50 (Industrial robots) or 9503.00 (if classified as educational)',
      importNotes: 'Ships via DHL/FedEx. Import broker recommended for first-time buyers. GST/HST applies on landed cost.',
    },
    faqs: [
      { question: 'Can the Unitree R1 be used outdoors?', answer: 'The R1 is rated for indoor use only (IP20). It can be used outdoors on dry, flat surfaces briefly, but is not weatherproof. Avoid rain, snow, and extreme temperatures.' },
      { question: 'What programming languages does the R1 support?', answer: 'The R1 supports Python and C++ via the Unitree SDK. It also supports ROS 2 for advanced robotics development. The onboard UnifoLM model can be queried via a REST API.' },
      { question: 'Is the R1 safe around children?', answer: 'The R1 weighs only 25 kg and has built-in collision detection. However, it is not certified as a consumer safety device. Adult supervision is recommended at all times.' },
      { question: 'How long does the battery last?', answer: 'Approximately 1 hour of mixed activity (walking, gesturing). Standby time is significantly longer. Batteries are hot-swappable, so you can extend operation with spare packs.' },
      { question: 'Does Unitree offer warranty in Canada?', answer: 'Unitree offers a 1-year limited warranty. Canadian buyers may need to ship units to China for hardware repairs. Extended warranty available through RoboNorth partner program.' },
    ],
    videos: [
      { youtubeId: 'T9MIuzDfmQQ', title: 'Unitree R1 — Official Demo' },
    ],
  },

  'unitree-g1': {
    cadPricing: {
      cadEstimate: '$22,100–$37,300 CAD',
      usdOriginal: '$16,000–$27,000 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD. Actual rate varies.`,
    },
    shipping: {
      origin: 'Hangzhou, China',
      estimatedShipping: '2–4 weeks via air freight',
      customsDuty: '0–8% depending on HS classification',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Ships worldwide via DHL/FedEx. Unitree has shipped 1,000+ units internationally. Import broker recommended. GST/HST on landed cost.',
    },
    faqs: [
      { question: 'What\'s the difference between G1 base and G1 EDU?', answer: 'The G1 EDU ($27K) adds an NVIDIA Jetson Orin (275 TOPS), 3D LiDAR, Dex3-1 hands (14 DOF), and full ROS 2 SDK. The base G1 ($16K) has simpler grippers and a less powerful compute module.' },
      { question: 'Can the G1 climb stairs?', answer: 'Yes. The G1 can climb standard residential stairs (up to 20 cm step height). It uses its IMU and depth cameras for stair detection and adaptive foot placement.' },
      { question: 'How much can the G1 carry?', answer: 'The G1 has a rated payload of 3 kg (arms extended). It can handle heavier loads closer to its body. Not suitable for heavy industrial lifting.' },
      { question: 'Is there a Canadian dealer?', answer: 'There is no official Canadian dealer yet. Orders are placed directly through Unitree\'s website. RoboNorth can assist with import logistics and connect you with customs brokers.' },
    ],
    videos: [
      { youtubeId: 'GzX1qOIO1bE', title: 'Unitree G1 — Full Capabilities Demo' },
      { youtubeId: 'sH5HN5NJEpE', title: 'Unitree G1 EDU — Development Features' },
    ],
  },

  'unitree-h1': {
    cadPricing: {
      cadEstimate: '$124,200–$207,000 CAD',
      usdOriginal: '$90,000–$150,000 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD. Actual rate varies.`,
    },
    shipping: {
      origin: 'Hangzhou, China',
      estimatedShipping: '3–5 weeks via sea/air freight',
      customsDuty: '0–6% (industrial robot classification)',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Requires freight forwarder for the H1 due to size/weight. Crated shipping. Customs broker essential. Allow 1–2 weeks for clearance.',
    },
    faqs: [
      { question: 'Is the H1 suitable for outdoor use?', answer: 'Limited outdoor use is possible on flat, dry surfaces. The H1 is not IP-rated for weather exposure. Unitree is developing cold-weather accessories for 2026.' },
      { question: 'What compute platform does the H1 use?', answer: 'The H1 ships with an NVIDIA Jetson Orin NX. Researchers can upgrade to the Orin AGX for heavier AI workloads. Full ROS 2 support included.' },
      { question: 'Can it run?', answer: 'Yes. The H1 holds the speed record for a full-size humanoid at 5.4 km/h sustained walking and has demonstrated running gaits in controlled environments.' },
    ],
    videos: [
      { youtubeId: 'gJmJaLCuWo0', title: 'Unitree H1 — Running & Agility Demo' },
    ],
  },

  '1x-neo': {
    cadPricing: {
      cadEstimate: '~$27,600 CAD or ~$690/mo lease',
      usdOriginal: '$20,000 USD or $499/mo',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD. Lease terms in CAD TBC.`,
    },
    shipping: {
      origin: 'Moss, Norway',
      estimatedShipping: '4–6 weeks from order confirmation',
      customsDuty: '0% (CETA — Canada-EU free trade agreement covers Norway via EFTA)',
      hsCode: '8479.50 (Industrial robots) — potential 0% under CETA',
      importNotes: 'Norway benefits from CETA-adjacent trade terms. Expect minimal duties. 1X is planning a North American distribution hub for 2026.',
    },
    faqs: [
      { question: 'Is the NEO safe to have at home?', answer: '1X designed NEO specifically for home safety. Its soft-body construction and lightweight 30 kg frame mean collisions are far less dangerous than with rigid metal robots. Force-limited actuators prevent harmful impacts.' },
      { question: 'Can NEO cook meals?', answer: 'NEO\'s hands have 22 DOF per hand, enabling complex manipulation. Cooking assistance is a target use case, starting with simple tasks (stirring, pouring, loading dishwasher) and expanding through software updates.' },
      { question: 'Does it work with smart home systems?', answer: 'Yes. NEO integrates with Matter/Thread smart home protocols, and 1X is developing integrations for Google Home, Apple HomeKit, and Amazon Alexa.' },
      { question: 'How does the lease option work?', answer: 'The $499/month lease includes the robot, maintenance, and software updates. Minimum 12-month commitment. At end of lease, buy out or return. Canadian lease pricing TBD.' },
    ],
    videos: [
      { youtubeId: 'bUrLuUaEiSA', title: '1X NEO — Home Robot Vision' },
    ],
  },

  'tesla-optimus-gen-3': {
    cadPricing: {
      cadEstimate: '$27,600–$41,400 CAD (target)',
      usdOriginal: '$20,000–$30,000 USD (target)',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD. Final pricing not yet confirmed.`,
    },
    shipping: {
      origin: 'Fremont, California, USA',
      estimatedShipping: 'TBD — expected via Tesla retail network',
      customsDuty: '0% under CUSMA (Canada-US-Mexico Agreement)',
      hsCode: '8479.50 (Industrial robots) — 0% duty under CUSMA',
      importNotes: 'Expected to be sold through Tesla\'s existing Canadian stores (Toronto, Vancouver, Calgary, Montreal). No separate import needed if purchased through Canadian retail.',
    },
    faqs: [
      { question: 'When can I buy an Optimus in Canada?', answer: 'Tesla has not confirmed a Canadian sales date. Internal factory deployments are underway. Consumer sales are expected 2026–2027. Sign up for RoboNorth alerts to be notified.' },
      { question: 'Will Optimus work with Tesla vehicles?', answer: 'Tesla has hinted at Optimus integration with the Tesla ecosystem (charging from Powerwall, communicating with Tesla vehicles). Specific integrations are not yet confirmed.' },
      { question: 'What AI does Optimus use?', answer: 'Optimus uses Tesla\'s Full Self-Driving neural networks adapted for humanoid perception. It runs on a custom Tesla chip (based on D1/Dojo architecture) for on-device inference.' },
      { question: 'Can Optimus be programmed by end users?', answer: 'Tesla has not announced an open SDK. Optimus is expected to learn tasks through demonstration and natural language instruction, similar to how Tesla FSD learns driving behaviors.' },
    ],
    videos: [
      { youtubeId: 'cpraXaw7dyc', title: 'Tesla Optimus Gen 3 — Factory Demo' },
    ],
  },

  'figure-02': {
    cadPricing: {
      cadEstimate: '$41,400–$207,000 CAD (est.)',
      usdOriginal: '$30,000–$150,000 USD (est.)',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD. Enterprise pricing varies.`,
    },
    shipping: {
      origin: 'Sunnyvale, California, USA',
      estimatedShipping: 'Enterprise deployment — custom timeline',
      customsDuty: '0% under CUSMA',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Figure AI handles logistics for pilot program participants. Enterprise sales include installation and commissioning. CUSMA ensures duty-free import from the US.',
    },
    faqs: [
      { question: 'Can my company apply for a Figure 02 pilot?', answer: 'Yes. Figure AI accepts pilot applications from manufacturing and logistics companies. Apply through their commercial team or contact RoboNorth for a warm introduction.' },
      { question: 'What tasks can Figure 02 perform?', answer: 'Figure 02 is deployed in BMW factories handling parts sorting, component assembly, and quality inspection. It can learn new tasks through verbal instruction thanks to its OpenAI integration.' },
      { question: 'How does the OpenAI integration work?', answer: 'Figure 02 uses a custom OpenAI vision-language model for natural language task instruction. You can tell it "put the blue parts in the bin" and it will visually identify and execute the task.' },
    ],
    videos: [
      { youtubeId: '0SRVJaOg9Co', title: 'Figure 02 — BMW Factory Deployment' },
    ],
  },

  'boston-dynamics-atlas': {
    cadPricing: {
      cadEstimate: '~$690,000 CAD (est.)',
      usdOriginal: '~$500,000 USD (est.)',
      exchangeNote: 'Atlas is not commercially sold. Cost estimate based on industry sources.',
    },
    shipping: {
      origin: 'Waltham, Massachusetts, USA',
      estimatedShipping: 'Not commercially available',
      customsDuty: '0% under CUSMA (if sold)',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Atlas is available only through Boston Dynamics\' commercial partnerships. Hyundai ownership may open Canadian industrial partnerships through Hyundai Motor Canada.',
    },
    faqs: [
      { question: 'Can I buy an Atlas?', answer: 'Atlas is not currently for sale. Boston Dynamics offers it through commercial partnerships and research agreements. Contact Boston Dynamics\' sales team for partnership inquiries.' },
      { question: 'How is the electric Atlas different from the hydraulic one?', answer: 'The all-electric Atlas (2024+) replaces hydraulic actuators with custom electric drives, is lighter, quieter, and maintenance-friendly. It retains the 360° joint rotation and dynamic capabilities of its predecessor.' },
      { question: 'What can Atlas do that other humanoids can\'t?', answer: 'Atlas leads in dynamic athleticism — backflips, parkour, heavy lifting (50 kg instant). Its 56 DOF and 360° joint rotation enable movements impossible for other humanoids. Fleet learning shares skills across all units.' },
    ],
    videos: [
      { youtubeId: '29ECwExc-HM', title: 'Boston Dynamics Atlas — Electric Generation' },
    ],
  },

  'sanctuary-ai-phoenix': {
    cadPricing: {
      cadEstimate: '$55,200–$82,800 CAD (est.)',
      usdOriginal: '$40,000–$60,000 USD (est.)',
      exchangeNote: 'Canadian company — CAD pricing expected at launch. Estimates based on USD range.',
    },
    shipping: {
      origin: 'Vancouver, BC, Canada',
      estimatedShipping: 'Domestic shipping — 1–2 weeks',
      customsDuty: 'N/A — Canadian-made',
      hsCode: 'N/A — domestic product',
      importNotes: 'No import duties or customs clearance needed. Ships from Vancouver. The only world-class humanoid manufactured in Canada. GST/HST applies.',
    },
    faqs: [
      { question: 'Is Sanctuary AI a Canadian company?', answer: 'Yes! Sanctuary AI is headquartered in Vancouver, BC. It\'s the leading Canadian humanoid robotics company and one of the few building both the AI (Carbon) and the hardware in Canada.' },
      { question: 'What is the Carbon AI system?', answer: 'Carbon is Sanctuary AI\'s proprietary cognitive architecture. It translates natural language and visual input into physical robot actions. Carbon can learn new tasks in under 24 hours through a combination of teleoperation and autonomous learning.' },
      { question: 'Does Phoenix work in both English and French?', answer: 'Carbon supports English natively. French language support is under development as part of Sanctuary AI\'s Canadian deployment strategy. Bilingual operation expected by late 2026.' },
      { question: 'Who are Sanctuary AI\'s partners?', answer: 'Sanctuary AI has partnered with Magna International (automotive), and is in discussions with several Canadian retailers and healthcare providers. They received significant funding from the Canadian government.' },
    ],
    videos: [
      { youtubeId: 'tfFByL7F-00', title: 'Sanctuary AI Phoenix — Carbon AI Demo' },
    ],
  },

  'apptronik-apollo': {
    cadPricing: {
      cadEstimate: '$69,000–$138,000 CAD (est.)',
      usdOriginal: '$50,000–$100,000 USD (est.)',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD.`,
    },
    shipping: {
      origin: 'Austin, Texas, USA',
      estimatedShipping: 'Enterprise deployment timeline',
      customsDuty: '0% under CUSMA',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'CUSMA ensures duty-free import. Apptronik handles logistics for pilot participants. Enterprise sales include installation support.',
    },
    faqs: [
      { question: 'What\'s Apollo\'s connection to NASA?', answer: 'Apptronik was founded by the team that built NASA\'s Valkyrie humanoid robot at the UT Austin Human Centered Robotics Lab. Apollo inherits Valkyrie\'s actuator technology and control architecture.' },
      { question: 'How does the battery swap work?', answer: 'Apollo uses a hot-swap battery system — you can replace depleted battery packs without powering down the robot. Each pack provides about 4 hours of operation. Swaps take under 60 seconds.' },
    ],
    videos: [
      { youtubeId: 'ePCtwMgSgSw', title: 'Apptronik Apollo — First Commercial Demo' },
    ],
  },

  'softbank-pepper': {
    cadPricing: {
      cadEstimate: '$27,600–$68,900 CAD',
      usdOriginal: '$20,000–$49,900 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD.`,
    },
    shipping: {
      origin: 'Tokyo, Japan (or Paris, France)',
      estimatedShipping: '4–6 weeks',
      customsDuty: '0% under CPTPP (Canada-Japan trade agreement)',
      hsCode: '8479.50 or 9503.00',
      importNotes: 'SoftBank Robotics has a North American presence. CPTPP eliminates duties on Japanese-origin robots. GST/HST applies.',
    },
    faqs: [
      { question: 'Is Pepper still being manufactured?', answer: 'SoftBank Robotics paused new Pepper production in 2021 but resumed limited production in 2023. Refurbished units and remaining inventory are available. Check with SoftBank for current availability.' },
      { question: 'Can Pepper understand English and French?', answer: 'Yes. Pepper supports multiple languages including English and French, making it suitable for bilingual Canadian deployments (retail, hospitality, government).' },
      { question: 'What apps are available for Pepper?', answer: 'Pepper has a robust app ecosystem with 600+ applications covering retail, hospitality, healthcare, and education. Custom apps can be built using the Choregraphe development environment.' },
    ],
    videos: [
      { youtubeId: 'oDeQCIkrLvc', title: 'SoftBank Pepper — Retail Interaction Demo' },
    ],
  },

  'agility-digit': {
    cadPricing: {
      cadEstimate: '~$345,000 CAD',
      usdOriginal: '~$250,000 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD.`,
    },
    shipping: {
      origin: 'Salem, Oregon, USA',
      estimatedShipping: 'Enterprise deployment — custom timeline',
      customsDuty: '0% under CUSMA',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Agility handles logistics for enterprise customers. CUSMA ensures duty-free. Fleet management via Arc cloud platform.',
    },
    faqs: [
      { question: 'Why does Digit walk differently than other humanoids?', answer: 'Digit uses a bird-inspired leg design (digitigrade) with knees that bend "backward." This gives it exceptional stability on uneven surfaces and the ability to navigate tight warehouse aisles that would challenge other humanoids.' },
      { question: 'What is RoboFab?', answer: 'RoboFab is Agility Robotics\' manufacturing facility in Salem, Oregon — the world\'s first factory dedicated to building humanoid robots. It has capacity to produce 10,000 Digit units per year.' },
    ],
    videos: [
      { youtubeId: 'D39VXfQDxDk', title: 'Agility Digit — Warehouse Operations' },
    ],
  },

  'fourier-gr-1': {
    cadPricing: {
      cadEstimate: '$207,000–$234,600 CAD',
      usdOriginal: '$150,000–$170,000 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD.`,
    },
    shipping: {
      origin: 'Shanghai, China',
      estimatedShipping: '3–5 weeks',
      customsDuty: '0–8%',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Fourier ships to research partners globally. Crated shipping via sea freight. Import broker recommended.',
    },
    faqs: [
      { question: 'Is the GR-1 suitable for medical research?', answer: 'Yes — Fourier Intelligence has over a decade of experience in medical rehabilitation robotics. The GR-1 is specifically designed for healthcare research applications including rehabilitation, patient interaction, and mobility assistance studies.' },
      { question: 'What actuators does the GR-1 use?', answer: 'The GR-1 uses Fourier\'s proprietary FSA (Force-Sensing Actuators) delivering up to 300 N·m torque. These are among the highest-performance actuators in any humanoid robot.' },
    ],
    videos: [
      { youtubeId: 'pOcXbDl7sOc', title: 'Fourier GR-1 — Research Platform Demo' },
    ],
  },

  'engineered-arts-ameca': {
    cadPricing: {
      cadEstimate: '~$345,000+ CAD',
      usdOriginal: '~$250,000+ USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD.`,
    },
    shipping: {
      origin: 'Penryn, Cornwall, UK',
      estimatedShipping: '4–8 weeks (custom build)',
      customsDuty: '0% under UK-Canada Trade Continuity Agreement',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Each Ameca is custom-built. Engineered Arts provides full international shipping and commissioning support. UK-Canada trade agreement ensures duty-free import.',
    },
    faqs: [
      { question: 'Why is Ameca so expensive?', answer: 'Each Ameca is custom-built with 50+ individually controllable facial actuators, premium materials, and extensive hand-tuning. It\'s designed for exhibitions, research, and entertainment where lifelike interaction is worth the premium.' },
      { question: 'Can Ameca walk?', answer: 'Current Ameca models are upper-body focused — they can gesture, express emotions, and interact but don\'t walk. Engineered Arts is developing full-body mobility for future versions.' },
    ],
    videos: [
      { youtubeId: 'IPukuYb9xWw', title: 'Engineered Arts Ameca — Facial Expression Demo' },
    ],
  },

  'kepler-forerunner': {
    cadPricing: {
      cadEstimate: '~$41,400 CAD',
      usdOriginal: '~$30,000 USD',
      exchangeNote: `Based on approximate exchange rate of 1 USD = ${USD_TO_CAD} CAD.`,
    },
    shipping: {
      origin: 'Shanghai, China',
      estimatedShipping: '3–5 weeks',
      customsDuty: '0–8%',
      hsCode: '8479.50 (Industrial robots)',
      importNotes: 'Kepler ships internationally. Import broker recommended for Canadian buyers.',
    },
    faqs: [
      { question: 'How does Kepler achieve such a low price?', answer: 'Kepler uses a modular design with standardized components, reducing manufacturing complexity. High-volume production targets and a focus on essential features over premium fit-and-finish keep costs down.' },
    ],
    videos: [],
  },
};

// Exchange rate constant (exported for use in components)
export const USD_CAD_RATE = USD_TO_CAD;
