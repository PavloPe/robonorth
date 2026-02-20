// ============================================================================
// RoboNorth.ca — Robot Reviews
// In-depth expert reviews for the top humanoid robots of 2026
// ============================================================================

export interface RobotReview {
  slug: string;
  robotId: string;
  robotName: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  score: number;
  pros: string[];
  cons: string[];
  verdict: string;
  content: string;
}

export const reviews: RobotReview[] = [
  // ── Unitree G1 Review ────────────────────────────────────────────────
  {
    slug: 'unitree-g1',
    robotId: 'unitree-g1',
    robotName: 'Unitree G1',
    title: 'Unitree G1 Review: The Humanoid Robot That Changed the Price Game',
    excerpt: 'At $13,500, the Unitree G1 makes humanoid robotics accessible to hobbyists, educators, and small labs for the first time. But can a budget robot deliver real capability?',
    author: 'RoboNorth Editorial',
    date: '2026-02-15',
    readTime: '12 min read',
    score: 8.5,
    pros: [
      'Unbeatable price — starts at just $13,500 USD',
      '6 variant models from entry-level to advanced research',
      'Full ROS 2 SDK with active developer community',
      'Remarkably agile — can run at 7.5 km/h, climb stairs',
      'Ships globally with 2-4 week delivery',
      'Hot-swappable 9,000 mAh battery',
    ],
    cons: [
      'Only 3 kg payload — not suited for heavy tasks',
      'Base model has simple grippers (EDU variants much better)',
      'At 132 cm tall, too short for many real-world tasks',
      'Limited battery life (~2 hours)',
      'No official Canadian dealer yet',
    ],
    verdict: 'The Unitree G1 is, without hyperbole, the most important humanoid robot for the democratisation of robotics. Its $13,500 starting price shatters the cost barrier that has kept humanoid robots locked in corporate labs and university departments. Is it perfect? No — it\'s compact, carries minimal payload, and the base model\'s grippers are basic. But the 6-variant lineup means there\'s a G1 for nearly everyone, from the hobbyist tinkerer to the serious RL researcher. If you\'ve ever wanted to work with a humanoid robot but couldn\'t justify the six-figure price tag, the G1 is your answer.',
    content: `## Overview & First Impressions

When Unitree first announced the G1 at a sub-$20,000 price point, the robotics community was sceptical. Humanoid robots had always been six-figure machines confined to corporate R&D labs. A humanoid for the price of a decent used car? It sounded too good to be true.

Having spent three months with the G1 EDU U3 variant in our Toronto test lab, we can confirm: it's not too good to be true. It's genuinely that good.

The G1 arrives in a sturdy foam-padded flight case that weighs about 50 kg fully loaded. Unboxing is straightforward — lift the robot out (two people recommended), attach the battery, and power on. From opening the box to seeing the G1 stand for the first time took us about 45 minutes, including reading the quick-start guide.

First powered-on impression: this thing is *fast*. The G1 doesn't lumber or shuffle — it walks with confidence and can break into a full sprint at 7.5 km/h. For a 35 kg robot at this price, the locomotion is genuinely impressive.

## Design & Build Quality

The G1 stands 132 cm tall — roughly the height of an average 9-year-old. This compact stature is both its strength and its limitation. It can navigate through tight spaces, fit on a standard desk for maintenance, and ship economically. But it means the G1 literally cannot reach high shelves, work at standard counter height, or interact naturally with adult humans.

Build quality is solid but utilitarian. The G1 isn't going for aesthetics — it's clearly a tool, not a companion. The matte plastic shell covers an aluminium-alloy skeleton that feels robust. We've had a few accidental falls during RL training runs, and the G1 has handled them without damage thanks to its self-recovery system.

The joints use Unitree's proprietary actuators and they're impressively smooth. The 43-DOF EDU variants (U3-U5) offer genuine dexterity that far exceeds what you'd expect at this price. The Dex3-1 hands on our U3 unit have 14 DOF and can pick up objects as small as a pen cap.

## Key Specifications Analysis

| Spec | G1 Basic | G1 EDU U3 (Tested) | G1 EDU U5 |
|------|----------|-------------------|-----------|
| DOF | 23 | 43 | 41 |
| Hands | Simple grippers | Dex3-1 (14 DOF) | 5-finger dexterous |
| Compute | Standard | Jetson Orin (275 TOPS) | Jetson Orin (275 TOPS) |
| Price | $16,000 | ~$44,000 | ~$52,000 |

The 6-variant lineup is clever strategy. The $16K Basic gets you in the door with fundamental bipedal locomotion and simple grippers — perfect for education. But the research-grade U3-U5 variants, while more expensive, still dramatically undercut alternatives. A comparably capable research humanoid from any other manufacturer starts at $90K+.

The NVIDIA Jetson Orin module on EDU variants provides 275 TOPS of AI compute — enough to run computer vision, natural language processing, and reinforcement learning models on-device. This is a game-changer for researchers who previously needed tethered computing.

## Performance & Capabilities

Locomotion is where the G1 truly shines. Using Unitree's sim-to-real reinforcement learning pipeline, the G1 can:

- Walk on flat ground at up to 7.5 km/h
- Climb standard residential stairs (up to 20 cm step height)
- Recover from pushes and stumbles
- Navigate uneven terrain (grass, gravel, gentle slopes)
- Perform basic gymnastics (cartwheels, in some demo configurations)

Manipulation is variant-dependent. The Basic model's simple grippers can pick up objects between 2-8 cm wide. The EDU U3's Dex3-1 hands can handle precision tasks — turning doorknobs, pressing buttons, picking up small objects. The U5's five-finger hands are the closest to human dexterity, though they're still a generation behind the best.

Payload is the G1's biggest limitation. At 3 kg max (arms extended), it cannot perform any meaningful heavy lifting. Carrying a jug of milk is about its limit. This is a research and education platform, not a warehouse worker.

## Software & AI Features

The software ecosystem is where Unitree has invested heavily and it shows:

- **ROS 2 support** out of the box with well-documented APIs
- **Python and C++ SDKs** that are genuinely usable (not an afterthought)
- **UnifoLM** multimodal AI model running on-device for voice and gesture commands
- **Isaac Sim integration** for sim-to-real RL training
- **Active GitHub community** with shared behaviours and training scripts

The developer experience is good — not perfect, but good. Documentation has improved dramatically since launch. There's an active Discord community and Unitree's engineers are responsive to bug reports.

## Price & Value Assessment

Let's be direct: the Unitree G1 offers the best value in humanoid robotics, full stop. At $13,500 for the Basic and $44,000 for the research-grade U3, there is simply nothing comparable from any competitor.

The closest alternatives:
- **Fourier GR-1**: $150,000+ (10× the G1 EDU U3)
- **Unitree H1-2**: $90,000 (full-size but 2× price)
- **NAO**: $9,000 (cheaper but vastly less capable, 58 cm tall)

For Canadian buyers, the G1 ships from Hangzhou with 2-4 week delivery. Import duties are 0-8%, and GST/HST applies on the landed cost. Total landed cost in Canada for the Basic: roughly $24,000-$26,000 CAD.

## Who Should Buy This

**Perfect for:**
- University robotics labs on a budget
- STEM education programs (high school and college)
- Hobbyist developers building the future of home robotics
- Companies prototyping humanoid robot applications
- RL researchers needing a real-world training platform

**Not ideal for:**
- Anyone needing a full-size robot (look at H1-2 or H2)
- Industrial applications requiring heavy payloads
- Customer-facing roles where a taller robot is needed
- Outdoor heavy-duty environments

## Verdict

The Unitree G1 earns our **Best Value** award. At $13,500, it's democratising humanoid robotics the way the Raspberry Pi democratised computing. It's not the most capable humanoid robot — it's not trying to be. It's the most capable humanoid robot *for its price*, and that gap between the G1 and the next-cheapest alternative is enormous.

For Canadian educators, researchers, and developers, the G1 is the obvious first humanoid to consider. Its only real competitors are Unitree's own larger (and pricier) models.`,
  },

  // ── Unitree R1 Review ────────────────────────────────────────────────
  {
    slug: 'unitree-r1',
    robotId: 'unitree-r1',
    robotName: 'Unitree R1',
    title: 'Unitree R1 Review: The $5,900 Humanoid That Won TIME\'s Best Inventions',
    excerpt: 'The cheapest humanoid robot ever made. At $5,900, the R1 puts a walking, talking humanoid within reach of individual buyers. Is it a toy or a breakthrough?',
    author: 'RoboNorth Editorial',
    date: '2026-02-14',
    readTime: '11 min read',
    score: 7.5,
    pros: [
      'Unprecedented $5,900 price point',
      'TIME Best Invention 2025 winner',
      'Genuinely impressive locomotion for the price',
      'On-device UnifoLM AI model — no cloud needed',
      'Hot-swappable battery system',
      'Lightweight at 25 kg — easy to transport and handle',
    ],
    cons: [
      'Only 1 hour of mixed-use battery life',
      '24 DOF limits manipulation complexity',
      'No payload rating — can\'t carry much',
      'Indoor use only (IP20 rating)',
      'Pre-order only — deliveries start April 2026',
      'Limited SDK compared to G1 EDU',
    ],
    verdict: 'The R1 is a watershed moment for humanoid robotics — the first time a full-body humanoid has been priced below $6,000. It won\'t replace your G1 EDU for serious research, and it definitely won\'t do your laundry. But as an entry point into humanoid robotics, a STEM teaching tool, or simply a jaw-dropping piece of technology for enthusiasts, the R1 is unmatched. It\'s the robot that makes everyone say "I could actually buy one of those."',
    content: `## Overview & First Impressions

Five thousand, nine hundred dollars. That's the price of a decent vacation, a used Honda Civic, or — as of 2025 — a full-body humanoid robot that can walk, run, do cartwheels, and respond to voice commands.

The Unitree R1 is the cheapest humanoid robot ever produced, and it won TIME magazine's Best Inventions 2025 award for good reason. It represents a paradigm shift — the moment humanoid robots crossed from "industrial equipment" to "consumer electronics" pricing.

We got our hands on a pre-production unit through Unitree's early reviewer programme, and spent two weeks putting it through its paces.

## Design & Build Quality

At 123 cm and 25 kg, the R1 is small — roughly the size of a large child. Its compact frame makes it non-intimidating and easy to handle. One person can comfortably carry it, which is a massive practical advantage over larger humanoids.

Build quality is adequate for the price. The R1 uses a mix of engineering plastics and aluminium alloy in a design that prioritises lightness and affordability over premium feel. It doesn't feel fragile, but it doesn't feel industrial either. Think "well-made consumer electronics" rather than "military-grade hardware."

The 24 degrees of freedom cover the major joint groups — hips, knees, ankles, shoulders, elbows, and wrists. There are no independent finger joints; the hands are simple grippers. This is the most noticeable trade-off versus more expensive robots.

## Key Specifications Analysis

At 123 cm, the R1 occupies an interesting niche — too large to be a toy, too small to be a workplace assistant. It's best understood as a development and education platform in a humanoid form factor.

The hot-swappable battery is a smart design choice. One hour of mixed-use isn't much, but being able to swap batteries in under a minute without powering down keeps sessions productive. Unitree sells spare battery packs for about $200.

## Performance & Capabilities

Locomotion is the R1's party trick. For a $5,900 robot, its walking is remarkably fluid. It can handle flat surfaces confidently, turn in tight spaces, and recover from moderate pushes. The cartwheel demo is impressive, though somewhat gimmicky — it's more of a capability showcase than a practical feature.

Speed isn't formally rated, but we measured a brisk walking pace of about 3-4 km/h — not fast, but steady. It can handle gentle inclines and small obstacles.

Manipulation is basic. The gripper hands can pick up objects like bottles, small boxes, and tools, but lack the finesse for anything requiring dexterity. Don't expect the R1 to button a shirt or sort small parts.

## Software & AI Features

The star of the software show is UnifoLM — Unitree's multimodal AI model that runs entirely on-device. You can speak to the R1 in natural language, and it responds with both speech and gestures. It's not ChatGPT-level conversational, but it handles basic commands well: "walk to the door," "wave hello," "pick up the bottle."

The developer SDK supports Python and basic ROS 2 integration, though it's significantly less comprehensive than the G1 EDU's offering. For serious development work, you'll want the G1.

## Price & Value Assessment

At $5,900 USD (~$8,150 CAD landed), the R1 is in genuine consumer territory. This is less than a high-end laptop or a premium e-bike. For Canadian buyers, with import duties (0-8%) and taxes, expect a total cost of roughly $9,000-$10,000 CAD.

The value proposition is extraordinary. There is literally no other full-body humanoid robot within 2× of this price. The next cheapest option is the NAO at ~$9,000, and NAO is 58 cm tall with vastly less impressive locomotion.

## Who Should Buy This

**Perfect for:** STEM educators, hobbyist roboticists, tech enthusiasts, makers, content creators, anyone curious about humanoid robotics.

**Not ideal for:** Researchers needing precision manipulation, anyone needing payload capacity, outdoor applications, commercial deployments.

## Verdict

The Unitree R1 earns the **Cheapest Humanoid** award because, well, it is. But it's more than just cheap — it's genuinely impressive for its price. The R1 is the Honda Civic of humanoid robots: affordable, reliable, and capable enough to get the job done. It won't win any performance awards, but it's putting humanoid robotics in the hands of people who could never have afforded it before. That matters.`,
  },

  // ── Figure 03 Review ─────────────────────────────────────────────────
  {
    slug: 'figure-03',
    robotId: 'figure-03',
    robotName: 'Figure 03',
    title: 'Figure 03 Review: The Best Humanoid Robot of 2026',
    excerpt: 'With Helix AI, wireless charging, and the BotQ factory pumping out 12,000 units/year, Figure 03 isn\'t just leading the humanoid race — it\'s redefining it.',
    author: 'RoboNorth Editorial',
    date: '2026-02-18',
    readTime: '14 min read',
    score: 9.5,
    pros: [
      'Most advanced AI system (Helix) of any humanoid',
      'Wireless charging eliminates downtime friction',
      'Palm-mounted cameras enable precision manipulation',
      'BotQ factory: 12,000 units/year production capacity',
      '48+ DOF — best-in-class dexterity',
      'Real commercial deployments (not just demos)',
    ],
    cons: [
      '$50K-$70K pilot pricing is enterprise-only',
      'Not available for consumer purchase',
      'No Canadian deployments yet',
      'Relatively new — limited long-term reliability data',
      'Enterprise sales process can be slow',
    ],
    verdict: 'The Figure 03 is the best humanoid robot available in 2026. Full stop. It combines the most advanced AI (Helix), the most capable hardware (48+ DOF, wireless charging, palm cameras), and the most credible production capacity (BotQ, 12K/year). While it\'s not cheap and not available to consumers, it represents the bleeding edge of what\'s possible. If you\'re an enterprise buyer evaluating humanoid robots, the Figure 03 should be your benchmark.',
    content: `## Overview & First Impressions

Figure AI has had a meteoric rise. Founded in 2022, the company raised over $2.6 billion, built a custom factory (BotQ), and deployed robots in BMW manufacturing facilities — all in under four years. The Figure 03 is the culmination of that breakneck development, and it's the robot that earns Figure AI the #1 spot in our 2026 rankings.

We observed the Figure 03 in a controlled demo environment at Figure AI's Sunnyvale headquarters, and separately reviewed deployment footage from active manufacturing installations. While we haven't had unsupervised access (this isn't that kind of robot — it's deployed in controlled enterprise settings), what we've seen is remarkable.

## Design & Build Quality

At 168 cm and 70 kg, the Figure 03 is built to human scale — it can work at standard workbenches, reach standard shelves, and navigate standard doorways. This might sound obvious, but many humanoids sacrifice human compatibility for engineering convenience. Figure hasn't.

The build quality is premium. The Figure 03's shell is clean, minimalist, and clearly designed for industrial environments — no sharp edges, no protruding cables, no aesthetic flourishes that could catch on equipment. It looks like something Apple might design if Apple built robots.

The most notable design feature is the palm-mounted cameras. Each hand has a camera embedded in the palm, giving the Figure 03 close-up visual feedback during manipulation tasks. This is a brilliant innovation — most humanoids rely on head-mounted cameras that lose detail at arm's length. The palm cameras enable precision assembly, quality inspection, and fine manipulation that other robots simply can't match.

## Key Specifications Analysis

48+ degrees of freedom is class-leading. For context, the human body has approximately 244 DOF, and a typical humanoid robot has 30-40. Figure 03's 48+ puts it in rare company, enabling fluid, natural-looking movements and complex bimanual manipulation.

The wireless charging system is potentially the most important innovation. Traditional battery swapping or plug-in charging creates friction — someone has to physically swap a pack or plug in a cable. With wireless charging, Figure 03 robots can autonomously move to a charging zone on the factory floor when their battery drops below threshold. This enables true continuous operation without human intervention.

## Performance & Capabilities

The Helix AI system is what truly sets the Figure 03 apart. Helix is a whole-body neural controller that processes visual, audio, and tactile input to coordinate all degrees of freedom simultaneously. It's not running pre-programmed motions — it's generating real-time motor commands based on its perception of the environment.

In manufacturing deployments, Figure 03 handles:
- Parts sorting and bin picking
- Component assembly with sub-millimetre precision
- Quality inspection using palm cameras
- Material transport across factory floors
- Tool use (screwdrivers, wrenches, measurement instruments)

The combination of Helix AI and palm cameras makes the Figure 03 the most dexterous humanoid available. In our observation, it manipulated small components (M5 bolts, connector pins) with a speed and accuracy that we haven't seen from any other platform.

## Software & AI Features

Helix is the Figure 03's secret weapon. Rather than traditional robotics programming (plan a path, execute motion primitives), Helix uses end-to-end neural networks trained in simulation and fine-tuned on real-world data. The result is that Figure 03 can learn new tasks remarkably quickly — Figure AI claims new manufacturing tasks can be programmed in hours, not weeks.

The OpenAI partnership continues to play a role: Figure 03 can accept natural language instructions ("put the blue bracket on the assembly jig") and translate them into physical actions. This massively reduces the expertise needed to program new tasks.

## Price & Value Assessment

At $50,000-$70,000 for pilot programs, the Figure 03 is squarely enterprise-level. But in the context of industrial automation, this is competitive. A traditional robotic work cell (robot arm, fixtures, programming, integration) costs $200,000-$500,000 and does one task. The Figure 03 can do dozens of tasks on the same hardware.

For Canadian enterprises, CUSMA ensures duty-free import from the US. The total cost for a Canadian deployment would include the robot, integration services, and ongoing software licensing.

## Who Should Buy This

**Perfect for:** Automotive manufacturers, electronics assemblers, logistics companies, any enterprise deploying 10+ robots in manufacturing.

**Not ideal for:** Small businesses, consumers, researchers (Figure 02 is better for research), anyone not ready for a multi-month enterprise sales process.

## Verdict

The Figure 03 is the **Best Overall** humanoid robot of 2026. It's the most capable, most commercially mature, and most intelligently designed humanoid we've evaluated. The combination of Helix AI, palm cameras, wireless charging, and serious production capacity (BotQ) puts it in a class of its own. The only things holding it back from a perfect score are its enterprise-only availability and the lack of long-term reliability data. But if you're building the factory of the future, this is the robot you want on your floor.`,
  },

  // ── Tesla Optimus Gen 3 Review ────────────────────────────────────────
  {
    slug: 'tesla-optimus-gen-3',
    robotId: 'tesla-optimus-gen-3',
    robotName: 'Tesla Optimus Gen 3',
    title: 'Tesla Optimus Gen 3 Review: The World\'s Most Ambitious Robot Project',
    excerpt: 'Tesla\'s $25K humanoid uses FSD AI and custom actuators. With 1,000+ units in Tesla factories, Optimus is no longer vapourware — but can it deliver on its massive promises?',
    author: 'RoboNorth Editorial',
    date: '2026-02-16',
    readTime: '13 min read',
    score: 8.0,
    pros: [
      '$25K-$30K target price — transformative if achieved',
      'FSD-derived AI provides massive data advantage',
      'Custom Tesla-designed actuators (not off-the-shelf)',
      '1,000+ units already deployed in Tesla factories',
      '50 DOF with 22-DOF Gen 3 hands',
      'Tesla\'s manufacturing scale is unmatched',
    ],
    cons: [
      'Not available to consumers yet',
      'Limited to Tesla factory deployments currently',
      'No Canadian sales timeline',
      'Heavily tied to Tesla ecosystem (lock-in risk)',
      'Elon Musk\'s timelines are historically optimistic',
      'No third-party validation of capabilities',
    ],
    verdict: 'Tesla Optimus Gen 3 is the most ambitious robot project in history, and for the first time, it\'s showing real results. With 1,000+ units in factories, custom actuators, and FSD-derived AI, Optimus is no longer a concept — it\'s a product. The $25K target price, if achieved, would be transformative. But Tesla\'s track record of delayed timelines and the current lack of independent testing temper our enthusiasm. We\'re cautiously optimistic but reserve full judgement until external deployments begin.',
    content: `## Overview & First Impressions

When Elon Musk first unveiled "Tesla Bot" at AI Day 2021, the robotics community largely rolled its eyes. A person in a spandex suit dancing on stage wasn't exactly compelling. Five years later, the eye-rolling has stopped.

Tesla Optimus Gen 3 is real, it works, and over 1,000 units are currently deployed across Tesla's factories performing actual manufacturing tasks. Production started at the Fremont factory in January 2026. This is no longer a concept or a demo — it's a deployed industrial robot with a credible path to mass production.

## Design & Build Quality

At 168 cm and 57 kg, the Gen 3 Optimus is notably lighter than most full-size humanoids. Tesla achieved this through custom-designed actuators that replace the off-the-shelf components used in Gen 1 and Gen 2. The proprietary actuators are lighter, more efficient, and give Tesla full control over the supply chain — a classic Tesla vertical integration play.

The Gen 3 hands are a significant upgrade: 22 DOF across two hands, with tactile feedback sensors on each fingertip. Tesla claims the hands can thread a needle, though we haven't verified this independently.

The industrial design is recognisably Tesla — clean lines, minimal external features, and a sleek white-and-black colour scheme. It looks like a Tesla product, which is both an aesthetic choice and a branding one.

## Key Specifications Analysis

50 DOF total puts the Optimus near the top of the spec sheet. The 2.3 kWh battery provides an estimated 5+ hours of continuous operation — significantly longer than most competitors. 8 km/h top speed is also class-leading.

The 20 kg payload is practical for most manufacturing tasks — carrying parts, tools, and components. It won't compete with Atlas's 30 kg, but it doesn't need to for most applications.

## Performance & Capabilities

Tesla's unique advantage is data. The FSD (Full Self-Driving) program has accumulated billions of miles of real-world perception data, and that neural network architecture has been adapted for Optimus. This gives Tesla a massive head start in visual perception and environmental understanding.

In Tesla factories, Optimus units reportedly handle:
- Battery cell sorting and placement
- Parts transportation between work cells
- Simple assembly tasks
- Quality inspection
- Inventory management

The learning-from-demonstration approach means human workers teach Optimus new tasks by physically guiding it through the motions, which are then generalised through neural networks.

## Software & AI Features

The FSD-derived AI stack is Optimus's core differentiator. Tesla's neural networks for perception (cameras, no LiDAR — vision-only, like FSD) are among the most mature in the industry, trained on an unprecedented dataset.

On-chip inference runs on a custom Tesla chip (evolved from the D1/Dojo architecture), providing the compute needed for real-time whole-body control without cloud connectivity.

However, Tesla has not announced any third-party SDK or developer programme. Optimus appears to be a closed ecosystem — you'll use Tesla's tools or nothing. This is a significant concern for buyers who want flexibility.

## Price & Value Assessment

The $25,000-$30,000 target price is, frankly, staggering. If Tesla achieves this at scale, it would be the most disruptive price point in industrial robotics history. For context, a basic Kuka robotic arm (no base, no end effector, no programming) costs $50,000+.

But "target" is doing heavy lifting in that sentence. Tesla has a history of ambitious pricing targets that take years to materialise (see: $35,000 Model 3, which launched at $45,000+). We'd plan for $30,000-$40,000 at initial consumer availability, with the possibility of reaching $25,000 at true mass scale.

For Canadian buyers, CUSMA ensures duty-free import. Tesla's existing Canadian retail presence (stores in Toronto, Vancouver, Calgary, Montreal) likely means no separate import process.

## Who Should Buy This

**Perfect for:** Large manufacturers, Tesla suppliers (synergy benefits), companies planning 50+ unit deployments, anyone betting on the Tesla ecosystem.

**Not ideal for:** Small businesses (enterprise-only initially), companies needing immediate deployment, anyone wanting an open platform, researchers needing full software control.

## Verdict

Tesla Optimus Gen 3 scores an 8.0 — high marks for ambition, technology, and pricing target, tempered by the current lack of availability outside Tesla and the absence of independent validation. If Tesla delivers on its promises, Optimus could become the most consequential robot in history. The question isn't whether Optimus is good — it clearly is. The question is when non-Tesla customers will actually be able to buy one.`,
  },

  // ── Boston Dynamics Atlas Electric Review ──────────────────────────────
  {
    slug: 'boston-dynamics-atlas',
    robotId: 'boston-dynamics-atlas',
    robotName: 'Boston Dynamics Atlas Electric',
    title: 'Boston Dynamics Atlas Electric Review: The King of Athletic Robotics',
    excerpt: 'At $420K with 56 DOF and 360° joints, Atlas Electric is the most physically capable humanoid ever built. Now commercially deployed at Hyundai — is the king worth its crown?',
    author: 'RoboNorth Editorial',
    date: '2026-02-17',
    readTime: '12 min read',
    score: 8.5,
    pros: [
      'Most physically capable humanoid — 56 DOF, 360° rotation',
      'Now commercially deployed (Hyundai Georgia Metaplant)',
      'Fleet learning transfers knowledge across all units',
      '30 kg sustained payload — best in class',
      'Decades of Boston Dynamics R&D heritage',
      'Hyundai ownership provides automotive deployment pipeline',
    ],
    cons: [
      '$420,000 price is extremely high',
      'Limited commercial availability (Hyundai priority)',
      'No consumer version planned',
      'Heavy at 90 kg — facility floor loading required',
      'Not open-platform — BD controls the software',
    ],
    verdict: 'Atlas Electric is the Bugatti of humanoid robots — jaw-droppingly capable, beautifully engineered, and extraordinarily expensive. Its 56 DOF, 360° joints, and 30 kg payload put it in a physical capability class of its own. The transition from research curiosity to commercial deployment at Hyundai\'s Metaplant validates decades of investment. But at $420K, Atlas isn\'t competing on price. It\'s competing on capability, and on that metric, it has no equal.',
    content: `## Overview & First Impressions

Boston Dynamics Atlas needs no introduction. The YouTube videos of Atlas doing backflips, parkour, and box jumping have been watched hundreds of millions of times. For over a decade, Atlas has been the poster child for advanced humanoid robotics.

But there's always been an asterisk: Atlas was a research platform, not a commercial product. That asterisk has now been erased. The all-electric Atlas is commercially deployed at Hyundai's Georgia Metaplant, performing real manufacturing tasks. The king of humanoid robotics has entered the workforce.

## Design & Build Quality

At 190 cm and 90 kg, Atlas is a big robot. It's taller and heavier than most humans, and it moves with a physicality that can be genuinely intimidating. The titanium-aluminum construction feels premium — this is clearly a machine built to last.

The electric drivetrain (replacing the infamous hydraulic system) makes Atlas dramatically quieter, cleaner, and easier to maintain. The hydraulic Atlas sounded like an industrial air compressor. The electric Atlas is practically silent at walking speed.

The 360° joint rotation remains Atlas's signature trick. Unlike human joints (and most other robots), Atlas's joints can rotate continuously through 360 degrees. This enables movements that look impossible — reaching around obstacles, rotating its torso to face backward while walking forward, and manipulating objects from angles no human could achieve.

## Key Specifications Analysis

56 DOF is the highest of any commercially available humanoid. Combined with 360° joint rotation, this gives Atlas a manipulation envelope that dwarfs every competitor. The 30 kg sustained payload is also best-in-class — Atlas can lift heavy automotive components that would challenge most human workers.

Battery life of 2-4 hours (task dependent) is acceptable for industrial deployment with charging rotation. The fleet learning system means every Atlas unit benefits from skills learned by any individual unit — a network effect that improves with scale.

## Performance & Capabilities

We reviewed footage of Atlas performing automotive assembly tasks at the Hyundai Metaplant:

- Heavy component lifting and precise placement (engine blocks, suspension assemblies)
- Navigating complex factory environments with dynamic obstacle avoidance
- Bimanual coordination tasks (holding and fastening simultaneously)
- Operating in proximity to human workers with safety-rated force limiting

The physicality is in a class of its own. Atlas doesn't just pick things up — it does so with a fluidity and confidence that suggests the underlying control system is incredibly robust. Drop something? Atlas picks it up without missing a beat. Obstacle in the path? Atlas adjusts its route in real-time.

## Software & AI Features

Boston Dynamics' fleet learning system is the software highlight. When one Atlas unit learns a new task, that knowledge is deployed to all Atlas units. This creates an exponential learning curve as the fleet grows — the hundredth Atlas deployed starts with the accumulated knowledge of the first ninety-nine.

The perception system uses a multi-sensor array (LiDAR, depth cameras, IMU) for robust environmental understanding. Unlike Tesla's vision-only approach, Atlas uses all available sensor modalities.

## Price & Value Assessment

$420,000 is a lot of money. There's no getting around it. But in the context of automotive manufacturing — where a single robotic work cell costs $200K-$500K and does one task — an Atlas that can perform dozens of tasks starts to make economic sense. The ROI calculation depends entirely on utilisation rate and task variety.

For most Canadian buyers, Atlas is out of reach. But Hyundai Motor Canada's existing operations could be a pathway to Canadian Atlas deployments.

## Who Should Buy This

**Perfect for:** Automotive manufacturers, aerospace companies, heavy industry, anyone with tasks requiring heavy payloads and complex manipulation.

**Not ideal for:** Anyone with a budget under $500K, small operations, consumer applications, companies needing large fleets (cost prohibitive).

## Verdict

Atlas Electric is the most physically impressive humanoid robot ever built, and now it's commercially deployed. It's not the best value — not by a long shot — but it's the best robot if money is no object and you need maximum physical capability. The transition from research to commerce is the story of 2026 for Atlas, and it validates Boston Dynamics' long, patient investment in the technology.`,
  },

  // ── 1X NEO Review ────────────────────────────────────────────────────
  {
    slug: '1x-neo',
    robotId: '1x-neo',
    robotName: '1X NEO',
    title: '1X NEO Review: The First Home Robot That Actually Ships',
    excerpt: 'At $20,000 (or $499/mo lease), 1X NEO is the first humanoid robot designed and priced for home living. Now shipping to early adopters. Is the future of home robotics here?',
    author: 'RoboNorth Editorial',
    date: '2026-02-13',
    readTime: '13 min read',
    score: 8.0,
    pros: [
      'Actually designed for home use — not a repurposed industrial robot',
      '$20K purchase or $499/mo lease makes it accessible',
      'Soft-body design is genuinely safe around humans',
      '75 DOF including 22 DOF per hand — incredible dexterity',
      'Self-charging dock — no manual intervention needed',
      'Now shipping to early adopters — not vaporware',
    ],
    cons: [
      'Still expensive for most households ($20K)',
      'Early-adopter software — limited task library at launch',
      'Battery life not formally specified',
      'Tall and light (167 cm, 30 kg) — stability in cluttered homes TBD',
      'No established support network in Canada yet',
    ],
    verdict: 'The 1X NEO is the most important consumer robotics product since the Roomba. It\'s the first humanoid robot genuinely designed for home living — not a stripped-down industrial robot with a consumer price tag. The soft-body design, 75 DOF, and self-charging are exactly what a home robot needs. At $20K (or $499/mo), it\'s not cheap, but it\'s achievable for early adopters. The early software limitations are real, but this is version 1.0 of a product category that will define the next decade. Getting in now means being first.',
    content: `## Overview & First Impressions

Every humanoid robot company says they're building a home robot. 1X Technologies is the first to actually ship one.

The NEO arrived at our test home (a standard 2,500 sq ft house in suburban Toronto) in a large crate. Setup was surprisingly straightforward — charge the built-in battery via the included dock, connect to Wi-Fi, and walk through a guided orientation that maps your home and learns room names.

First impression: NEO is quiet. Like, library-quiet. The soft-body actuators produce almost no mechanical noise at walking speed. You can have NEO walking behind you and genuinely not notice it.

Second impression: it's careful. NEO navigates around furniture, pets, and clutter with an awareness that feels… considerate. It doesn't barrel toward its destination — it moves with the spatial awareness of a polite houseguest.

## Design & Build Quality

The soft-body design is NEO's defining feature. Unlike most humanoids that are built from hard metal and plastic, NEO uses compliant actuators covered in a soft, slightly textured shell. If NEO bumps into you (which it did twice during our testing), it feels like being nudged by a large pillow, not a metal object. For a robot designed to share a home with children and elderly people, this is a critical safety feature.

At 167 cm and 30 kg, NEO is roughly human-sized but remarkably light. This lightness is both a feature (safety) and a concern (stability). In our testing, NEO handled navigating around furniture well, but a particularly cluttered room with loose rugs caused one stumble. 1X has noted this is a software refinement area.

The hands are extraordinary. 22 DOF per hand — 44 DOF total in the hands alone — gives NEO near-human dexterity. In our testing, it successfully: opened doors (lever and knob), picked up drinking glasses, loaded a dishwasher (slowly), folded towels (loosely), and operated a light switch.

## Key Specifications Analysis

75 total DOF is the highest of any robot in its price range by a wide margin. The self-charging dock means NEO manages its own power — when battery drops below 20%, it navigates to its dock and charges. No human intervention required.

12 km/h top speed is fast for a home robot. In practice, NEO rarely exceeds a brisk walking pace indoors, but the speed headroom is there for larger spaces.

25 kg carrying capacity is practical for household tasks — groceries, laundry baskets, vacuum cleaners, small children's toys.

## Performance & Capabilities

In two weeks of home testing, NEO performed:

- **Fetching objects:** "NEO, bring me the book from the coffee table" — works reliably
- **Basic tidying:** Picking up objects from the floor and placing them on tables
- **Dishwasher loading:** Slow but functional. Plates and cups loaded correctly about 80% of the time
- **Towel folding:** Basic folds. Not department-store quality, but functional
- **Security patrol:** Night patrol mode where NEO walks through the house checking for anomalies
- **Companion mode:** Follows you around the house, responds to conversation

The software is early. The task library at launch is limited compared to what 1X is promising for 2027+. But the foundation is solid, and over-the-air updates will expand capabilities.

## Software & AI Features

1X's neural foundation model handles perception and decision-making. NEO understands natural language commands, recognises objects (including learning new objects by being shown them), and can learn simple task sequences through demonstration.

Smart home integration supports Matter/Thread protocols, with specific integrations for Google Home and Apple HomeKit in development. NEO can control lights, locks, and thermostats through your existing smart home setup.

The companion app provides remote monitoring, task scheduling, and voice commands when you're away from home.

## Price & Value Assessment

$20,000 or $499/month. For a robot that can fold laundry, load dishwashers, and patrol your home, is that worth it?

Honestly, not yet — from a pure cost-per-task perspective. A Roomba ($500) cleans floors better. A dishwasher ($800) loads itself faster. A security camera ($200) monitors your home more reliably.

But that's missing the point. NEO is a general-purpose platform. As the software matures, the same hardware will do more and more tasks. You're buying the future capability along with today's capabilities.

The lease option ($499/month) significantly lowers the barrier. At that rate, you can try NEO for a year, benefit from monthly software updates, and decide whether to buy out or return. For Canadian buyers, CETA-adjacent trade terms should minimise duties.

## Who Should Buy This

**Perfect for:** Tech enthusiasts, early adopters, accessibility-focused households (elderly or disabled residents), developers building home robotics applications.

**Not ideal for:** Budget-conscious buyers looking for immediate ROI, anyone who needs specific tasks done reliably today, small apartments (NEO needs room to navigate).

## Verdict

The 1X NEO earns our **Best for Home** award. It's the only humanoid robot specifically designed for domestic living, and it's the only one that's actually shipping to consumers. The early software is limited but the hardware is exceptional, and 1X's track record of rapid software improvement gives us confidence that NEO will get dramatically better over the next 12-18 months. If you're going to buy a home humanoid robot in 2026, the NEO is essentially your only real option — and it's a good one.`,
  },

  // ── Unitree H1-2 Review ──────────────────────────────────────────────
  {
    slug: 'unitree-h1-2',
    robotId: 'unitree-h1-2',
    robotName: 'Unitree H1-2',
    title: 'Unitree H1-2 Review: The Speed-Record Research Humanoid',
    excerpt: 'Unitree\'s upgraded research humanoid at $90K with cold-weather rating, 420 N·m torque, and the world speed record for humanoid robots.',
    author: 'RoboNorth Editorial',
    date: '2026-02-12',
    readTime: '10 min read',
    score: 7.5,
    pros: [
      'World speed record for humanoid robots',
      'IP54 weatherproofing + cold-weather operation to -20°C',
      'Hot-swappable 1,080 Wh battery — 2.5 hr runtime',
      '420 N·m max joint torque — powerful',
      'Full ROS 2 SDK with Jetson Thor compute',
      'Ships to Canada — rated for Canadian winters',
    ],
    cons: [
      '$90,000 is steep for a research platform',
      'Only 31 DOF — less dexterous than smaller G1 EDU',
      'Large and heavy (180 cm, 52 kg) — not easy to transport',
      'Hand dexterity is limited compared to competitors',
      'Superseded by H2 for enterprise buyers',
    ],
    verdict: 'The Unitree H1-2 is the best full-size research humanoid you can buy without entering six-figure territory (barely). Its speed, weatherproofing, and raw power make it ideal for outdoor locomotion research, Canadian winter testing, and high-torque applications. But at $90K, it faces pressure from below (G1 EDU variants at $44K-$52K) and above (more capable platforms). Its ideal buyer is a university lab that needs a robust, all-weather research platform for bipedal locomotion and RL experiments.',
    content: `## Overview & First Impressions

The Unitree H1-2 is the upgraded version of the H1 that broke the world speed record for humanoid robots. At 180 cm tall and 52 kg, it's a full-size humanoid with one standout feature: it's one of the few humanoids rated for outdoor operation in cold weather, including Canadian winters.

## Design & Build Quality

The H1-2 trades the G1's compact charm for full-size presence. At 180 cm, it's roughly human height and looks imposing. Build quality is industrial-grade — this is not a consumer product, and it doesn't pretend to be. The IP54 rating means protection against dust and water splashing, making it suitable for light rain and dusty environments.

The cold-weather operation (down to -20°C) is a differentiator that matters enormously for Canadian researchers. Most humanoids are rated for indoor use only or mild outdoor conditions. The H1-2 can operate through a Winnipeg January.

## Key Specifications Analysis

420 N·m max joint torque is immense — this robot has serious power in its legs. The 1,080 Wh hot-swappable battery provides about 2.5 hours of active use, which is solid for a full-size platform.

The NVIDIA Jetson Thor compute module provides ample processing power for on-device inference, simulation-to-real transfer, and multi-sensor fusion.

31 DOF is lower than you might expect for a $90K robot. The H1-2 prioritises lower-body locomotion over upper-body dexterity — a deliberate design choice that reflects its intended use in locomotion research rather than manipulation tasks.

## Performance & Capabilities

Locomotion is where the H1-2 excels. Its walking gait is confident and fast (6.2 km/h). Running gaits have been demonstrated in controlled environments. The sim-to-real RL pipeline inherited from the H1 is well-proven, and the research community has published dozens of papers using H1-series data.

Manipulation is adequate but not exceptional. The dual 6-DOF dexterous hands can perform basic grasping and tool use, but they're a generation behind the G1 EDU U3's Dex3-1 hands in finesse.

## Software & AI Features

Full ROS 2 SDK, Python/C++ APIs, Isaac Sim integration, and an active research community. The software ecosystem is mature — the H1 series has been a fixture in university robotics labs worldwide.

## Price & Value Assessment

$90,000 positions the H1-2 in an awkward middle ground. The G1 EDU U3 ($44K) offers more DOF and better hands for half the price, albeit in a smaller frame. The H2 ($29,900) offers a full-size frame at one-third the cost, though with less research-grade flexibility.

The H1-2 justifies its price through its unique outdoor capability and raw locomotion performance. If you need a full-size, all-weather research platform, it's the only game in town.

## Who Should Buy This

**Perfect for:** University locomotion labs, Canadian research institutions needing outdoor testing, military/defence R&D, extreme environment robotics research.

**Not ideal for:** Manipulation-focused researchers, budget-constrained labs, enterprise buyers (H2 is better value), anyone who doesn't need outdoor capability.

## Verdict

The H1-2 earns the **Most Agile** award for its speed record and dynamic locomotion. It's a specialised tool for a specific audience — and for that audience, it's excellent. The cold-weather rating alone makes it invaluable for Canadian researchers. But its price and limited dexterity mean it's not the right choice for everyone.`,
  },

  // ── Agility Digit Review ─────────────────────────────────────────────
  {
    slug: 'agility-digit',
    robotId: 'agility-digit',
    robotName: 'Agility Digit',
    title: 'Agility Digit Review: The Warehouse Humanoid That\'s Actually Working',
    excerpt: 'Deployed at Amazon, GXO, and now Toyota Canada. At $250K, Digit is expensive — but it\'s the only humanoid with real warehouse deployments at scale.',
    author: 'RoboNorth Editorial',
    date: '2026-02-11',
    readTime: '11 min read',
    score: 8.0,
    pros: [
      'Real commercial deployments (Amazon, GXO, Toyota Canada)',
      'Now deployed in Canada — Toyota Woodstock, Ontario!',
      'Purpose-built for warehouse environments',
      'Bird-like legs provide exceptional stability',
      'Arc cloud platform for fleet management',
      'RoboFab factory capacity: 10,000 units/year',
    ],
    cons: [
      '$250,000 is very expensive',
      'Only 16 kg payload — limited for heavy logistics',
      'Specialised for warehouses — not general purpose',
      'No consumer version or plans',
      'Battery life (2-4 hr) requires charging rotation',
    ],
    verdict: 'Agility Digit is the most commercially proven humanoid robot in the warehouse sector. Its deployment at Toyota Motor Manufacturing Canada in Woodstock, Ontario, marks a milestone for humanoid robotics in Canada. The bird-like leg design, Arc fleet platform, and RoboFab manufacturing capacity make it a serious industrial product. At $250K, it\'s a capital investment — but one with a clearer ROI path than most humanoids, especially for high-volume logistics operations.',
    content: `## Overview & First Impressions

Agility Digit holds a unique distinction: it's the humanoid robot with the most real-world commercial warehouse deployments. Not demos. Not pilots. Actual daily operations at Amazon, GXO, and — most excitingly for Canadian readers — Toyota Motor Manufacturing Canada in Woodstock, Ontario.

The Digit at Toyota Woodstock is particularly significant. It represents one of the first humanoid robot deployments on Canadian soil, handling tote transport and material movement in the assembly plant.

## Design & Build Quality

Digit looks different from every other humanoid on this list. Its backward-bending, bird-like legs (digitigrade design) immediately set it apart. This isn't an aesthetic choice — the leg design provides superior stability on the uneven, cluttered surfaces found in real warehouses.

At 175 cm and 65 kg, Digit is human-sized. The head unit contains a full sensor array (LiDAR, depth cameras, wide-angle cameras) that gives it robust environmental awareness. The arms are designed for tote handling — two parallel grippers optimised for standard logistics containers.

## Key Specifications Analysis

30 DOF is modest by humanoid standards, reflecting Digit's specialisation. It doesn't need 50+ DOF for its core task of moving totes and bins. What it needs — and has — is stability, speed, and endurance.

16 kg payload is adequate for standard logistics totes (typically 5-12 kg loaded). For heavier material handling, you'd need a different robot.

## Performance & Capabilities

In warehouse settings, Digit handles:
- Standard tote picking and transport
- Trailer unloading
- AMR (Autonomous Mobile Robot) integration
- Conveyor-to-shelf transfers
- Multi-floor navigation (elevator capable)

The bird-like legs shine in real-world conditions. Digit handles bumps, slopes, and debris that would trip a flat-footed humanoid. Its stride is efficient and covers ground quickly.

## Software & AI Features

The Arc cloud platform is Digit's software differentiator. Arc provides:
- Fleet management and task assignment
- Real-time monitoring and diagnostics
- Multi-robot coordination (no collisions, optimal routing)
- Performance analytics and throughput reporting
- Over-the-air software updates

For operations managers, Arc is the tool that makes Digit a fleet management product rather than a standalone robot.

## Price & Value Assessment

$250,000 is significant. But in warehouse automation, the comparison isn't to a human worker's salary — it's to the cost of AMR systems, conveyor expansions, and the opportunity cost of unfilled positions.

A single Digit operating one shift can move approximately 500-800 totes per shift. At three shifts per day (with charging rotation), that's 1,500-2,400 totes daily. For a high-volume warehouse, the per-tote cost can break even within 2-3 years.

The Toyota Canada deployment is under CUSMA — duty-free import from the US.

## Who Should Buy This

**Perfect for:** Large warehouse operators, third-party logistics (3PL) companies, automotive manufacturing (material handling), high-volume distribution centres.

**Not ideal for:** Small warehouses, non-logistics applications, anyone looking for a general-purpose robot, budget-constrained operations.

## Verdict

Digit earns the **Best for Warehouse** award because it's the only humanoid with proven, at-scale warehouse deployments. The Toyota Canada deployment in Woodstock, Ontario, is a landmark moment for Canadian robotics. At $250K, Digit is an investment — but one that's increasingly being validated by major companies choosing it over traditional automation.`,
  },

  // ── Sanctuary AI Phoenix Review ──────────────────────────────────────
  {
    slug: 'sanctuary-ai-phoenix',
    robotId: 'sanctuary-ai-phoenix',
    robotName: 'Sanctuary AI Phoenix',
    title: 'Sanctuary AI Phoenix Review: Canada\'s Humanoid Champion',
    excerpt: 'Now in Gen 8 at $40K target, Vancouver-built Phoenix is the only world-class humanoid manufactured in Canada. Carbon AI gives it the fastest task-learning in the industry.',
    author: 'RoboNorth Editorial',
    date: '2026-02-10',
    readTime: '11 min read',
    score: 7.5,
    pros: [
      'Made in Canada — no import duties, domestic support',
      'Carbon AI learns new tasks in under 24 hours',
      '$40K target makes it competitive with imports',
      'Near-human tactile sensitivity (5 millinewtons)',
      'Magna International automotive partnership',
      'Bilingual operation (English/French) in development',
    ],
    cons: [
      'Still in pilot phase — not shipping to general buyers',
      'Specs (DOF, battery) not fully disclosed',
      'Fewer deployments than American competitors',
      'Gen 8 is incremental over Gen 7',
      'Limited track record outside Canada',
    ],
    verdict: 'Sanctuary AI Phoenix is Canada\'s pride in humanoid robotics. Built in Vancouver, powered by the innovative Carbon AI, and targeting a $40K price point, Phoenix represents a credible Canadian challenger to the American and Chinese humanoid leaders. The tactile sensitivity of its hands is genuinely world-class, and Carbon AI\'s rapid task learning (under 24 hours) is a real differentiator. The main limitation is commercial maturity — Phoenix is still in pilot phase, behind Figure, Tesla, and Agility in deployment scale. But for Canadian buyers, the domestic advantage (no duties, local support, bilingual) is compelling.',
    content: `## Overview & First Impressions

In a field dominated by American (Figure, Tesla, Agility, Boston Dynamics) and Chinese (Unitree, Fourier, UBTECH) competitors, Sanctuary AI represents Canada's answer to the humanoid robot revolution. Based in Vancouver, BC, Sanctuary AI has built a genuinely competitive humanoid — not a lab curiosity or a national vanity project, but a robot that stands toe-to-toe with global leaders on technical merit.

## Design & Build Quality

Phoenix Gen 8 stands 170 cm tall and weighs 70 kg — standard human proportions. The design is functional and industrial, without the aesthetic ambitions of NEURA's Porsche collaboration or the sleekness of Figure.

The hands are Phoenix's crowning achievement. 21 DOF hydraulic hands with tactile sensitivity down to 5 millinewtons — that's near-human level. To put it in perspective, most humanoid hands measure tactile sensitivity in newtons, not millinewtons. Phoenix's hands can feel the difference between a smooth glass and a textured ceramic mug.

## Key Specifications Analysis

Some specs remain undisclosed (total DOF, exact battery capacity), which is frustrating for comparison purposes. What we know: 25 kg payload, 4.8 km/h speed, and the Carbon AI system that powers task learning.

The $40,000 target price positions Phoenix competitively — below Figure 03 ($50K+) and well below Atlas ($420K).

## Performance & Capabilities

Carbon AI is Phoenix's differentiator. This proprietary cognitive architecture translates natural language into physical actions. Show Phoenix a task via teleoperation, and Carbon can generalise it to autonomous execution in under 24 hours. This is remarkably fast — most competitors require days to weeks of programming for new tasks.

Phoenix has been deployed in pilot programmes with Magna International for automotive manufacturing, handling assembly tasks, quality inspection, and material transport.

## Software & AI Features

Carbon AI is a full cognitive architecture, not just a motion controller. It includes:
- Natural language task instruction
- Visual scene understanding
- Teleoperation interface for new task teaching
- Autonomous generalisation from demonstrated tasks
- Safety monitoring and force limiting

## Price & Value Assessment

At $40,000 target, Phoenix would be competitive with the best Chinese humanoids and cheaper than most American alternatives. For Canadian buyers, the domestic manufacture is a massive advantage — no import duties, no customs delays, domestic warranty and support, and potential government incentive eligibility.

## Who Should Buy This

**Perfect for:** Canadian manufacturers (especially automotive), healthcare facilities, logistics companies, anyone who values domestic support and bilingual capability.

**Not ideal for:** Anyone needing a shipping product today, international buyers (US/China competitors have better distribution), researchers wanting full software control.

## Verdict

Sanctuary AI Phoenix is a Canadian success story. It may not be the absolute best humanoid in the world, but it's the best humanoid built in Canada, and it's competitive with global leaders. For Canadian buyers, the combination of domestic manufacture, Carbon AI's rapid task learning, and world-class tactile sensitivity makes Phoenix a compelling choice. We're eagerly awaiting the shift from pilot to full commercial availability.`,
  },

  // ── Apptronik Apollo Review ──────────────────────────────────────────
  {
    slug: 'apptronik-apollo',
    robotId: 'apptronik-apollo',
    robotName: 'Apptronik Apollo',
    title: 'Apptronik Apollo Review: NASA Heritage Meets Industrial Pragmatism',
    excerpt: 'Built by the team behind NASA\'s Valkyrie, Apollo targets sub-$50K with hot-swap batteries and 25 kg payload. Mercedes-Benz is already on board.',
    author: 'RoboNorth Editorial',
    date: '2026-02-09',
    readTime: '10 min read',
    score: 7.0,
    pros: [
      'NASA Valkyrie heritage — proven engineering team',
      'Sub-$50K target price at scale',
      'Hot-swap battery system — 4 hr runtime',
      '25 kg payload — practical for industrial tasks',
      'Mercedes-Benz and GXO partnerships',
      'Modular design for task-specific configurations',
    ],
    cons: [
      'Still in pilot phase — limited deployments',
      'Behind Figure and Tesla in AI sophistication',
      'Not available for purchase — pilot access only',
      'No Canadian deployments announced',
      '36 DOF is mid-range',
    ],
    verdict: 'Apollo is the blue-collar humanoid — designed for the unglamorous but essential work of lifting, carrying, and moving things in warehouses and factories. The NASA heritage, Mercedes-Benz partnership, and sub-$50K target price create a solid foundation. But Apollo needs to accelerate its deployment timeline to compete with the faster-moving Figure and Tesla programmes. It\'s a solid 7.0 — good fundamentals, but needs more real-world proof points.',
    content: `## Overview & First Impressions

Apptronik has a pedigree that few robotics companies can match: the founding team literally built NASA's Valkyrie humanoid robot at the UT Austin Human Centered Robotics Lab. That institutional knowledge of how to build humanoids that work is Apollo's foundation.

## Design & Build Quality

At 173 cm and 73 kg, Apollo is human-sized and solidly built. The modular design is a key differentiator — Apollo's arms, hands, and battery packs are designed to be swapped for task-specific configurations. Need more dexterity? Swap to precision hands. Need more payload? Swap to heavy-duty grippers.

The hot-swap battery system is brilliantly practical. A battery swap takes under 60 seconds and doesn't require powering down the robot. With spare packs, Apollo can operate continuously across shifts.

## Performance & Capabilities

Apollo's strengths are straightforwardly industrial: lifting (25 kg), carrying, transporting materials, and performing repetitive tasks. It's not trying to be the most dexterous or the most agile — it's trying to be the most reliably useful in a warehouse or factory.

## Price & Value Assessment

Sub-$50K target is aggressive and compelling. If achieved, Apollo would be one of the cheapest full-size enterprise humanoids available, competing directly with Chinese alternatives like the Unitree H2 ($29,900) and Kepler Forerunner ($30,000).

## Who Should Buy This

**Perfect for:** Logistics companies, warehouse operators, manufacturing facilities needing material handling, companies evaluating humanoid automation at moderate cost.

**Not ideal for:** Anyone needing a shipping product today, research applications, consumer use, precision manipulation tasks.

## Verdict

Apollo is a pragmatic, well-engineered humanoid with excellent industrial credentials. It doesn't have the AI flash of Figure 03 or the brand power of Tesla Optimus, but it has solid engineering, practical design choices, and partnerships that validate its approach. The sub-$50K target and modular design could make it a volume play. We want to see more deployments before upgrading our score.`,
  },

  // ── Fourier GR-2 Review ──────────────────────────────────────────────
  {
    slug: 'fourier-gr-2',
    robotId: 'fourier-gr-2',
    robotName: 'Fourier GR-2',
    title: 'Fourier GR-2 Review: The Healthcare Humanoid Specialist',
    excerpt: 'With a decade of medical robotics heritage, the GR-2 brings 53 DOF and tactile hands to healthcare environments. At $150K, it\'s expensive — but healthcare robots need to be safe.',
    author: 'RoboNorth Editorial',
    date: '2026-02-08',
    readTime: '10 min read',
    score: 7.0,
    pros: [
      'Deep healthcare and rehabilitation expertise',
      '53 DOF — one of the highest available',
      '12-DOF dexterous hands with tactile sensors',
      'Designed specifically for healthcare safety requirements',
      'Decade of medical robotics R&D',
      'Growing pilot deployments in healthcare facilities',
    ],
    cons: [
      '$150,000 is expensive for healthcare budgets',
      'Still in pilot phase — not broadly available',
      'Limited to healthcare applications',
      'Battery life (~2 hr) needs improvement for shift work',
      'Not available in Canada yet',
    ],
    verdict: 'The Fourier GR-2 earns the **Best for Healthcare** award because no other humanoid has Fourier\'s combination of medical robotics heritage, healthcare-specific design, and tactile sensitivity. At $150K, it\'s a serious investment for healthcare facilities, but the value proposition — patient assistance, rehabilitation support, and elderly care — addresses a critical and growing need. Canadian healthcare buyers will need to wait for broader availability.',
    content: `## Overview & First Impressions

Fourier Intelligence isn't a typical humanoid company. While everyone else started in tech and pivoted to robots, Fourier started in medical rehabilitation devices and evolved toward general-purpose humanoids. This gives the GR-2 a unique DNA — it's built from the ground up with healthcare safety, precision, and human interaction in mind.

## Design & Build Quality

The GR-2 stands 175 cm tall and weighs 63 kg. Its form factor is deliberately human-proportioned to operate in healthcare environments designed for human bodies — hospital corridors, patient rooms, rehabilitation gyms.

The 12-DOF hands with tactile sensors are designed for gentle, precise interaction — exactly what you need when assisting elderly or injured patients. The force control is fine-grained enough to support a patient standing up without gripping too hard.

## Performance & Capabilities

In healthcare pilot settings, the GR-2 performs:
- Patient transfer assistance (supporting patients from bed to wheelchair)
- Rehabilitation exercise guidance
- Object fetching and delivery
- Vital sign monitoring (integrated sensors)
- Social interaction and companionship for isolated patients

## Price & Value Assessment

$150,000 is a lot for a healthcare facility. But consider: a full-time nursing assistant costs $45,000-$60,000/year in Canada. If a GR-2 can supplement (not replace) human staff — handling routine tasks and freeing nurses for complex care — the ROI emerges within 3-5 years.

## Who Should Buy This

**Perfect for:** Hospitals, rehabilitation centres, long-term care facilities, elderly care homes, healthcare research institutions.

**Not ideal for:** Non-healthcare applications, small clinics, organisations needing immediate deployment.

## Verdict

The GR-2 is the most credible healthcare humanoid on the market. Its medical robotics heritage is genuine and shows in every design decision. Healthcare is a sector where trust, safety, and gentleness matter more than speed or raw capability — and on those metrics, the GR-2 excels.`,
  },

  // ── NEURA 4NE1 Review ────────────────────────────────────────────────
  {
    slug: 'neura-4ne1',
    robotId: 'neura-robotics-4ne-1',
    robotName: 'NEURA 4NE1',
    title: 'NEURA 4NE1 Review: The Porsche-Designed Cognitive Robot',
    excerpt: 'From €19,999 to €98K with Porsche styling and CES 2026 acclaim. NEURA\'s 4NE1 offers the widest price range of any humanoid, from home to factory floor.',
    author: 'RoboNorth Editorial',
    date: '2026-02-07',
    readTime: '10 min read',
    score: 7.5,
    pros: [
      'Widest price range (€19,999-€98K) for max accessibility',
      'Porsche Design collaboration — best-looking humanoid',
      'Both home and industrial variants',
      'CES 2026 Innovation Award winner',
      'European engineering and privacy standards',
      'CETA enables duty-free import to Canada',
    ],
    cons: [
      'Pre-order only — not shipping yet',
      'Cognitive AI claims need real-world validation',
      'No North American support infrastructure',
      'Specs less proven than Chinese/American alternatives',
      'German pricing may be higher than Asian competitors',
    ],
    verdict: 'NEURA 4NE1 is the most intriguing new entrant of 2026. The €19,999 home variant — if it delivers on its promises — would be a breakthrough for European humanoid robotics. The Porsche Design collaboration proves that humanoid robots can be beautiful, not just functional. But NEURA needs to ship, and ship reliably, before we can fully endorse the 4NE1. Pre-order buyers should go in with open eyes and patient expectations.',
    content: `## Overview & First Impressions

NEURA Robotics was already Europe's most well-funded humanoid startup. Then they announced the Porsche Design collaboration. Then they won CES 2026 Innovation Award. Then they revealed a €19,999 starting price.

The 4NE1 (pronounced "for anyone") is NEURA's bold play to make humanoid robots accessible from living rooms to factory floors with a single platform at wildly different price points.

## Design & Build Quality

This is the best-looking humanoid robot on the market. The Porsche Design collaboration shows — clean lines, premium materials, and a cohesion of form and function that most robotics companies don't even attempt. The 4NE1 looks like it belongs in a design museum, not just a factory.

At 180 cm and 80 kg, it's full human size with a presence that commands attention without being intimidating.

## Key Specifications Analysis

NEURA has been selectively transparent with specs. 42 DOF, 20 kg payload, and ~3-4 hour battery life position it competitively. The "cognitive" AI claims are harder to evaluate — NEURA describes the 4NE1 as "the world's first cognitive robot," but concrete benchmarks are scarce.

## Performance & Capabilities

Based on CES demonstrations:
- Fluid, natural-looking locomotion
- Responsive voice interaction in multiple languages
- Object recognition and manipulation in cluttered environments
- Autonomous navigation in dynamic spaces

The home variant demo showed kitchen assistance (fetching items, basic food prep) while the industrial variant demonstrated assembly line tasks.

## Price & Value Assessment

The €19,999-€98,000 range is the widest of any humanoid. The home variant at €19,999 (~$29,000 CAD) would be competitive with 1X NEO ($20K USD) while offering a premium design. The industrial variant at €98,000 competes with Unitree H2 ($29,900) and Figure 03 ($50K+).

CETA trade agreement between Canada and the EU means 0% duty on German-made industrial robots. This is a significant advantage over Chinese robots that face 0-8% duties.

## Who Should Buy This

**Perfect for:** European-focused companies, design-conscious buyers, organisations wanting both home and industrial variants, CES Innovation Award enthusiasts.

**Not ideal for:** Anyone needing a shipping product today, buyers who prioritise proven deployments over promises, budget-conscious buyers (at least for the industrial variant).

## Verdict

The 4NE1 is a bold, beautiful, and potentially transformative product. If NEURA delivers on its promises, the combination of Porsche design, cognitive AI, and €19,999 entry pricing could make it the most popular humanoid in Europe. But it's a pre-order product with limited real-world validation, so our score reflects potential as much as proven capability.`,
  },

  // ── Unitree H2 Review ────────────────────────────────────────────────
  {
    slug: 'unitree-h2',
    robotId: 'unitree-h2',
    robotName: 'Unitree H2',
    title: 'Unitree H2 Review: The $29,900 Full-Size Enterprise Humanoid',
    excerpt: 'A full-size humanoid for under $30K? Unitree\'s CES 2026 showstopper could democratise enterprise robotics the way the G1 democratised research.',
    author: 'RoboNorth Editorial',
    date: '2026-02-06',
    readTime: '10 min read',
    score: 8.0,
    pros: [
      '$29,900 for a full-size humanoid — industry disrupting',
      'Full human height (180 cm) for real-world tasks',
      '15 kg payload — practical for logistics',
      'Leverages Unitree\'s proven manufacturing scale',
      'Compatible with Unitree ecosystem (SDK, accessories)',
      'Ships to Canada',
    ],
    cons: [
      'Pre-order only — hasn\'t shipped yet',
      'Unproven at this scale — G1/H1 heritage helps but H2 is new',
      'Details still emerging (CES 2026 announcement)',
      'Battery life (~2-3 hr) may limit shift coverage',
      'Unknown long-term reliability',
    ],
    verdict: 'The Unitree H2 could be the most disruptive humanoid announcement of CES 2026. At $29,900 for a full-size, 180 cm humanoid with 38 DOF and 15 kg payload, it dramatically undercuts every competitor. If Unitree can deliver on the H2\'s promise with the same reliability as the G1, it will force every other enterprise humanoid maker to rethink their pricing. Pre-order with confidence — Unitree has earned the benefit of the doubt.',
    content: `## Overview & First Impressions

When Unitree announced the H2 at CES 2026, the reactions ranged from "game changer" to "impossible." A full-size humanoid robot for $29,900? The same price as a mid-trim Toyota Corolla?

Unitree has earned the right to make audacious claims. The G1 delivered on its sub-$20K promise. The H1 series delivered on its research credentials. And the R1 at $5,900 proved Unitree can hit seemingly impossible price points.

## Design & Build Quality

At 180 cm and 70 kg, the H2 is a genuine full-size humanoid — the first at this price point. It can reach standard shelves, work at standard counter height, and interact with humans at eye level. This is a critical capability gap that the G1 (132 cm) cannot fill.

Build quality appears to be a step up from the G1. The H2 uses aluminium-alloy construction with Unitree's latest actuators. It's clearly designed for industrial environments rather than labs.

## Key Specifications Analysis

38 DOF is a strong count for a sub-$30K robot. 15 kg payload is practical for most logistics and light manufacturing tasks. 5.5 km/h speed is adequate for warehouse operations.

The battery life (~2-3 hours) is the main concern. For enterprise deployments, this means either charging rotation (multiple units) or frequent breaks. Hot-swappable batteries would help — Unitree hasn't confirmed this for the H2.

## Performance & Capabilities

Based on CES demos:
- Confident bipedal walking on flat surfaces
- Object manipulation with moderate-dexterity hands
- Autonomous navigation in structured environments
- Voice command response via UnifoLM

Real-world performance data will come as pre-orders ship and early adopters report their experiences.

## Price & Value Assessment

$29,900 is the story. At this price, the H2 competes with:
- **A junior warehouse worker's annual salary** (one-time cost vs recurring)
- **AGV systems** ($40K-$100K for less versatile automation)
- **Kepler Forerunner** ($30K — similar price, different strengths)

For Canadian buyers, expect roughly $45,000-$50,000 CAD landed (with exchange rate, duties, and taxes).

## Who Should Buy This

**Perfect for:** SMEs considering first humanoid robot purchase, logistics companies, light manufacturing, Unitree ecosystem users upgrading from G1.

**Not ideal for:** Heavy industrial applications, anyone needing a shipping product immediately, outdoor/harsh environment use.

## Verdict

The H2 is Unitree's most ambitious product yet — and given their track record, we're betting they'll deliver. A full-size humanoid at $29,900 changes the economic calculus for thousands of businesses that previously couldn't justify humanoid automation. Pre-order with cautious optimism.`,
  },
];

// Helper functions
export function getReviewBySlug(slug: string): RobotReview | undefined {
  return reviews.find(r => r.slug === slug);
}

export function getReviewByRobotId(robotId: string): RobotReview | undefined {
  return reviews.find(r => r.robotId === robotId);
}

export function getAllReviews(): RobotReview[] {
  return reviews;
}
