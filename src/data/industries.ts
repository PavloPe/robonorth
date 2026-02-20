// ============================================================================
// RoboNorth.ca — Industry Landing Page Data
// ============================================================================

export interface IndustryData {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  heroDescription: string;
  icon: string;
  stats: { label: string; value: string }[];
  robotIds: string[];
  useCases: { title: string; description: string }[];
  roiExample: { scenario: string; before: string; after: string; savings: string };
  caseExample: { company: string; description: string; result: string };
  faqs: { q: string; a: string }[];
}

export const industries: IndustryData[] = [
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    title: 'Humanoid Robots for Manufacturing in Canada',
    metaDescription: 'Discover the best humanoid robots for manufacturing. From assembly lines to quality inspection — see ROI data, recommended robots, and Canadian case examples.',
    heroDescription: 'Humanoid robots are transforming Canadian manufacturing — from automotive assembly in Ontario to aerospace production in Quebec. Unlike traditional industrial robots, humanoids fit into existing human-designed workspaces without costly facility redesigns.',
    icon: '🏭',
    stats: [
      { label: 'Canadian manufacturing labour gap', value: '80,000+ unfilled positions' },
      { label: 'Average ROI period', value: '14–24 months' },
      { label: 'Productivity increase', value: '30–60%' },
      { label: 'Workplace injury reduction', value: 'Up to 70%' },
    ],
    robotIds: ['figure-02', 'tesla-optimus-gen-3', 'sanctuary-ai-phoenix', 'apptronik-apollo', 'kepler-forerunner', 'ubtech-walker-s2', 'apptronik-apollo-2', 'sanctuary-ai-phoenix-gen2'],
    useCases: [
      { title: 'Assembly Line Assistance', description: 'Hold parts, operate tools, and perform repetitive assembly tasks alongside human workers. Handles tasks that cause ergonomic injuries.' },
      { title: 'Quality Inspection', description: 'Consistent, tireless visual and sensor-based quality checks. Can inspect 100% of products vs. statistical sampling.' },
      { title: 'Material Handling', description: 'Move components between stations, load/unload machines, and transport work-in-progress across the facility.' },
      { title: 'Hazardous Environment Work', description: 'Operate in high-temperature, chemical exposure, or confined-space environments unsafe for human workers.' },
    ],
    roiExample: { scenario: 'Mid-size auto parts manufacturer (200 employees)', before: '$4.2M annual labour cost for repetitive assembly', after: '6 humanoid robots at $50K each = $300K + $75K/yr maintenance', savings: '$1.8M saved annually after Year 2 (55% labour cost reduction on targeted tasks)' },
    caseExample: { company: 'Magna International / Sanctuary AI', description: 'Sanctuary AI\'s Phoenix is being deployed in Magna International\'s automotive manufacturing facilities in Ontario, performing general-purpose assembly and material handling tasks.', result: 'Carbon AI learns new factory tasks in under 24 hours — dramatically reducing retraining costs.' },
    faqs: [
      { q: 'How do humanoid robots integrate with existing manufacturing lines?', a: 'Humanoids are designed to work in spaces built for humans. No conveyor modifications or cell redesign needed. They use the same tools, walk through the same aisles, and can start with a single station.' },
      { q: 'What safety certifications do manufacturing humanoids need?', a: 'ISO 13482 (personal care robots) and ISO 10218 (industrial robots) apply. Most enterprise humanoids are being certified under one or both. Check manufacturer specifications for Canadian compliance.' },
    ],
  },
  {
    slug: 'warehouse-logistics',
    name: 'Warehouse & Logistics',
    title: 'Humanoid Robots for Warehouse & Logistics in Canada',
    metaDescription: 'Top humanoid robots for warehouse automation and logistics in Canada. Tote handling, order fulfilment, trailer unloading — with ROI data and Canadian deployment info.',
    heroDescription: 'Canada\'s e-commerce boom has created massive demand for warehouse labour, particularly in the GTA and Metro Vancouver. Humanoid robots navigate warehouse aisles, handle totes, and unload trailers — tasks that are hard to automate with traditional systems.',
    icon: '📦',
    stats: [
      { label: 'Canadian e-commerce growth', value: '+18% YoY' },
      { label: 'Warehouse vacancy rate (GTA)', value: '< 1%' },
      { label: 'Labour turnover in logistics', value: '50–100%/year' },
      { label: 'Order accuracy with robots', value: '99.8%+' },
    ],
    robotIds: ['agility-digit', 'agility-digit-v2', 'figure-02', 'apptronik-apollo', 'kepler-forerunner', 'apptronik-apollo-2', 'kepler-forerunner-k2'],
    useCases: [
      { title: 'Tote Handling & Sorting', description: 'Pick, carry, and sort totes across warehouse zones. Agility Digit was purpose-built for this exact workflow.' },
      { title: 'Trailer Unloading', description: 'Unload trailers — one of the most physically demanding and high-turnover warehouse tasks. Humanoids handle irregular loads.' },
      { title: 'Order Fulfilment', description: 'Navigate aisles, pick items from shelves, and prepare orders. Works in environments too complex for traditional AGVs.' },
      { title: 'Inventory Management', description: 'Count inventory, verify placements, and flag discrepancies during off-hours. 24/7 accuracy without overtime costs.' },
    ],
    roiExample: { scenario: 'Large distribution centre (500,000 sq ft, GTA)', before: '$8M annual labour cost, 80% turnover rate, constant recruiting', after: '20 Digit V2 robots + 5 human supervisors = $4M initial + $500K/yr', savings: '$3.5M saved annually from Year 3. Zero turnover on robot "workforce."' },
    caseExample: { company: 'Amazon / Agility Robotics', description: 'Amazon has deployed Agility Digit robots in US fulfilment centres for tote recycling and handling. The same model is expected to expand to Canadian Amazon facilities.', result: 'Fleet management via Arc cloud platform enables multi-robot coordination across warehouse zones.' },
    faqs: [
      { q: 'Can humanoid robots work in cold storage warehouses?', a: 'Most current humanoids are rated 0–40°C. For cold storage (-20°C+), the Unitree H1-2 is the only humanoid rated for sub-zero operation. Others require heated warehouse environments.' },
      { q: 'How do humanoid robots compare to AMRs and AGVs?', a: 'AMRs/AGVs excel at fixed-path material transport. Humanoids handle irregular tasks that require hands — picking, placing, opening, operating. Best results come from deploying both.' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    title: 'Humanoid Robots for Healthcare in Canada',
    metaDescription: 'Humanoid robots for Canadian healthcare — rehabilitation, patient assistance, supply transport. See recommended robots, safety considerations, and government incentives.',
    heroDescription: 'Canada\'s healthcare system faces a severe staffing crisis, particularly in long-term care. Humanoid robots handle the physical labour that burns caregivers out — lifting patients, transporting supplies, and sanitizing environments — freeing human staff for patient-centred care.',
    icon: '🏥',
    stats: [
      { label: 'Canadian nursing shortage', value: '60,000+ by 2027' },
      { label: 'Long-term care vacancies', value: '25,000+' },
      { label: 'Healthcare worker burnout rate', value: '60%+' },
      { label: 'Patient lift injuries (annual)', value: '8,000+ in Canada' },
    ],
    robotIds: ['fourier-gr-1', 'fourier-gr-2', 'sanctuary-ai-phoenix', 'softbank-pepper', 'sanctuary-ai-phoenix-gen2', '1x-neo'],
    useCases: [
      { title: 'Patient Mobility Assistance', description: 'Help patients stand, walk, and transfer between bed and wheelchair. Reduces caregiver back injuries dramatically.' },
      { title: 'Supply Transport', description: 'Deliver medications, linens, meals, and lab samples between departments. Runs 24/7 without shift changes.' },
      { title: 'Rehabilitation Therapy', description: 'Guide patients through physical therapy exercises with consistent form and tracking. Fourier GR-1 was built for this.' },
      { title: 'Reception & Wayfinding', description: 'Greet patients, answer common questions, and guide visitors through hospital corridors. Pepper excels here.' },
    ],
    roiExample: { scenario: 'Long-term care facility (200 beds, Ontario)', before: '$6M annual staffing cost, 35% vacancy rate, frequent injury claims', after: '4 humanoid robots for material handling + 2 for rehabilitation = $400K', savings: 'Reduce overtime 40%, workers\' comp claims 60%. Net savings $1.2M/year from Year 2.' },
    caseExample: { company: 'Fourier Intelligence / Rehabilitation', description: 'Fourier\'s GR-1 is deployed in rehabilitation centres across Asia, guiding patients through physiotherapy exercises with precise, repeatable movements.', result: 'Patient engagement increased 45% compared to solo exercise programmes. Therapy consistency improved across all sessions.' },
    faqs: [
      { q: 'Are humanoid robots safe for patient interaction?', a: 'Healthcare humanoids feature force-limited actuators, soft contact surfaces, and emergency stop capabilities. Fourier\'s GR-1 inherits medical device safety from Fourier\'s rehabilitation robotics heritage. However, direct patient-contact robots require Health Canada certification.' },
      { q: 'What Health Canada approvals are needed?', a: 'Medical device classification depends on use. Supply transport may not require certification. Patient-contact rehabilitation robots fall under Class II–III medical devices. Manufacturers are working with Health Canada on approval pathways.' },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    title: 'Humanoid Robots for Education & Research in Canada',
    metaDescription: 'Best humanoid robots for universities, colleges, and STEM education in Canada. Affordable platforms from $5,900 with ROS 2 support, curriculum integration, and government funding.',
    heroDescription: 'Canada\'s universities and colleges are at the forefront of robotics education. Affordable humanoid platforms give students hands-on experience with AI, locomotion, manipulation, and ROS 2 — skills in massive demand across industry.',
    icon: '🎓',
    stats: [
      { label: 'Canadian robotics programmes', value: '50+ universities/colleges' },
      { label: 'AI/robotics job growth (Canada)', value: '+28% YoY' },
      { label: 'Average starting salary (robotics eng.)', value: '$85,000 CAD' },
      { label: 'Government R&D funding available', value: '$500M+ annually' },
    ],
    robotIds: ['unitree-r1', 'unitree-g1', 'galbot-g1', 'softbank-pepper', 'unitree-h1', 'unitree-h1-2'],
    useCases: [
      { title: 'STEM Curriculum', description: 'Teach robotics, AI, and computer science with real humanoid hardware. Students programme locomotion, perception, and manipulation.' },
      { title: 'Research Platform', description: 'Graduate research in bipedal locomotion, reinforcement learning, computer vision, and human-robot interaction.' },
      { title: 'Competition Robotics', description: 'Compete in RoboCup, DARPA challenges, and university robotics competitions with capable humanoid platforms.' },
      { title: 'Public Engagement', description: 'Science centres, open houses, and STEM outreach events. Pepper excels at engaging the public with interactive demonstrations.' },
    ],
    roiExample: { scenario: 'University robotics lab (8 grad students)', before: 'Custom-built robots: $50K+ each, 6 months build time, maintenance nightmare', after: '4 Unitree G1 EDUs at $27K each = $108K, ready in 2 weeks', savings: '75% cost reduction, 90% faster time-to-research. Students focus on AI, not hardware.' },
    caseExample: { company: 'University of Toronto / Robotics Institute', description: 'Canadian universities including UofT, UBC, and UWaterloo are incorporating affordable humanoid platforms into their robotics curricula, giving undergraduate students hands-on experience previously reserved for PhD candidates.', result: 'Student enrollment in robotics courses increased 40% when hands-on humanoid labs were introduced.' },
    faqs: [
      { q: 'Which robot is best for a university robotics lab?', a: 'The Unitree G1 EDU ($27K USD) is our top recommendation — NVIDIA Jetson Orin, ROS 2, 43 DOF, and a growing research community. For tighter budgets, the Unitree R1 ($5,900) offers remarkable capability.' },
      { q: 'Can we use SR&ED tax credits for educational robotics research?', a: 'Yes. If your university robotics research involves experimental development or applied science, it may qualify for SR&ED. Many universities have dedicated SR&ED coordinators. See our grants page for details.' },
    ],
  },
  {
    slug: 'agriculture',
    name: 'Agriculture',
    title: 'Humanoid Robots for Agriculture in Canada',
    metaDescription: 'Exploring humanoid robots for Canadian agriculture — crop monitoring, harvesting assistance, livestock management. Early-stage but promising applications with ROI potential.',
    heroDescription: 'Canadian agriculture faces a 60,000+ seasonal labour shortage. While purpose-built agricultural drones and harvesters handle some tasks, humanoid robots offer unique versatility — navigating greenhouses, handling delicate produce, and performing varied tasks that resist single-purpose automation.',
    icon: '🌾',
    stats: [
      { label: 'Canadian agricultural labour shortage', value: '60,000+ seasonal workers' },
      { label: 'Farm wage growth', value: '+12% since 2022' },
      { label: 'Greenhouse area (Canada)', value: '2,300+ hectares' },
      { label: 'AgTech investment (Canada)', value: '$500M+ in 2025' },
    ],
    robotIds: ['unitree-g1', 'unitree-h1-2', 'kepler-forerunner', 'kepler-forerunner-k2'],
    useCases: [
      { title: 'Greenhouse Operations', description: 'Navigate greenhouse rows, inspect plants, harvest produce, and perform pruning. Controlled environments are ideal for current humanoid capabilities.' },
      { title: 'Crop Monitoring', description: 'Walk through fields to capture close-up imagery, soil samples, and environmental data that drones miss at altitude.' },
      { title: 'Livestock Assistance', description: 'Feed distribution, pen maintenance, and health monitoring in livestock facilities. Early-stage but promising.' },
      { title: 'Farm Maintenance', description: 'General-purpose tasks: opening valves, operating equipment, moving supplies. Humanoids handle varied tasks without dedicated automation.' },
    ],
    roiExample: { scenario: 'Large greenhouse operation (Ontario, 5 hectares)', before: '$1.2M annual seasonal labour cost, 40% unfilled positions', after: '3 humanoid robots at $30K each = $90K + seasonal human team', savings: 'Fill labour gap without Temporary Foreign Worker programme dependency. Net savings $200K+/year from Year 2.' },
    caseExample: { company: 'Emerging Applications', description: 'While dedicated agricultural humanoid deployments are early-stage, several Canadian AgTech startups are experimenting with Unitree G1 platforms in controlled greenhouse environments in BC and Ontario.', result: 'Initial trials show promise for delicate harvesting tasks (strawberries, tomatoes) where current robotic arms struggle with variability.' },
    faqs: [
      { q: 'Can humanoid robots work outdoors in Canadian weather?', a: 'Most current humanoids are limited to 0–40°C. The Unitree H1-2 is rated to -20°C. For now, greenhouse and indoor agricultural applications are more practical. Outdoor-rated humanoids are expected by 2027–2028.' },
      { q: 'What about dust, water, and mud?', a: 'Current humanoid IP ratings are typically IP20–IP54. Greenhouse environments are manageable. Open-field agriculture requires ruggedized variants not yet widely available.' },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    title: 'Humanoid Robots for Hospitality in Canada',
    metaDescription: 'Humanoid robots for Canadian hotels, restaurants, and tourism. Reception, concierge, room service delivery, and customer engagement — with pricing and deployment info.',
    heroDescription: 'Canada\'s hospitality industry faces chronic staffing shortages — 100,000+ unfilled positions across hotels, restaurants, and tourism. Humanoid robots handle reception, concierge, delivery, and entertainment tasks, enhancing guest experience while reducing labour pressure.',
    icon: '🏨',
    stats: [
      { label: 'Hospitality labour shortage (Canada)', value: '100,000+ positions' },
      { label: 'Hotels already using robots', value: '500+ globally' },
      { label: 'Guest satisfaction with robot concierge', value: '85%+' },
      { label: 'Cost per interaction vs. human staff', value: '60–80% lower' },
    ],
    robotIds: ['softbank-pepper', 'engineered-arts-ameca', '1x-neo', 'unitree-r1', 'sanctuary-ai-phoenix-gen2'],
    useCases: [
      { title: 'Reception & Concierge', description: 'Greet guests, answer questions, provide directions, and handle check-in. Pepper has 15,000+ units deployed globally in this role.' },
      { title: 'Room Service Delivery', description: 'Deliver amenities, food, and supplies to guest rooms. Navigates hallways and elevators autonomously.' },
      { title: 'Entertainment & Engagement', description: 'Interactive entertainment for guests — photo opportunities, demonstrations, and guided tours. Great for family-oriented properties.' },
      { title: 'Event Support', description: 'Welcome attendees, provide event information, and guide visitors at conferences and conventions. Bilingual (EN/FR) operation available.' },
    ],
    roiExample: { scenario: 'Large hotel (300 rooms, downtown Toronto)', before: 'Front desk: 3 shifts × 2 staff = 6 FTEs at $50K/yr = $300K + benefits', after: '2 Pepper units ($25K each) + reduced staffing = $80K initial + 2 FTEs', savings: 'Save $150K/year on front-desk labour while improving 24/7 availability. Pepper handles 60% of routine guest inquiries.' },
    caseExample: { company: 'Global Hotel Chains', description: 'Hilton, Marriott, and Henn-na Hotels in Japan have deployed SoftBank Pepper and other robots for reception, concierge, and entertainment. Canadian adoption is beginning at boutique and tech-forward properties.', result: 'Guest satisfaction scores increased 12% in hotels with robot concierge. Social media mentions spiked 300% (earned marketing value).' },
    faqs: [
      { q: 'Can Pepper understand both English and French?', a: 'Yes. SoftBank Pepper supports multiple languages including English and French, making it ideal for Canadian hospitality deployment, especially in Quebec and federally regulated properties that require bilingual service.' },
      { q: 'Will robots replace hospitality workers?', a: 'No — robots handle repetitive, routine tasks. Human staff shift to higher-value guest interactions: problem-solving, personalised service, and relationship building. Most deployments augment rather than replace.' },
    ],
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find(i => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map(i => i.slug);
}
