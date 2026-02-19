import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Robotics Glossary — Terms & Definitions',
  description: 'Complete glossary of robotics terms: DOF, actuator, LiDAR, SLAM, ROS, end effector, and 50+ more. Essential knowledge for humanoid robot buyers.',
  alternates: { canonical: 'https://robonorth.ca/glossary' },
};

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const terms: GlossaryTerm[] = [
  // Mechanics
  { term: 'Actuator', definition: 'A motor or mechanism that causes movement in a robot. Humanoid robots use electric actuators (servo motors) at each joint. Common types include brushless DC motors, harmonic drives, and linear actuators.', category: 'Mechanics' },
  { term: 'DOF (Degrees of Freedom)', definition: 'The number of independent movements a robot can make. Each joint axis counts as one DOF. A human arm has 7 DOF. The Unitree G1 has 43 DOF total, giving it highly articulated movement.', category: 'Mechanics' },
  { term: 'End Effector', definition: 'The device at the end of a robotic arm — typically a gripper, hand, or tool. Humanoid robots use dexterous hands with multiple fingers as end effectors.', category: 'Mechanics' },
  { term: 'Harmonic Drive', definition: 'A type of gear mechanism offering very high reduction ratios in a compact size. Used extensively in humanoid robot joints for precise, high-torque movement.', category: 'Mechanics' },
  { term: 'Payload', definition: 'The maximum weight a robot can carry or lift. The Unitree G1 has a 3 kg payload; Tesla Optimus targets 10 kg. Critical for determining what tasks a robot can perform.', category: 'Mechanics' },
  { term: 'Servo Motor', definition: 'A motor with built-in position feedback, allowing precise control of angular position. Most humanoid robot joints use high-torque servo motors with encoders.', category: 'Mechanics' },
  { term: 'Torque', definition: 'Rotational force produced by a motor. Higher torque means the robot can exert more force — important for lifting, pushing, and resisting external forces.', category: 'Mechanics' },
  { term: 'Backlash', definition: 'The play or gap between meshing gears. Lower backlash means more precise movement. Harmonic drives are popular in robots because they have near-zero backlash.', category: 'Mechanics' },
  // Sensors
  { term: 'LiDAR', definition: 'Light Detection and Ranging. Uses laser pulses to create 3D maps of the environment. Essential for robot navigation and obstacle avoidance. Common in both autonomous vehicles and humanoid robots.', category: 'Sensors' },
  { term: 'IMU (Inertial Measurement Unit)', definition: 'Sensor combining accelerometer, gyroscope, and sometimes magnetometer. Tells the robot its orientation, acceleration, and angular velocity — critical for balance.', category: 'Sensors' },
  { term: 'Force/Torque Sensor', definition: 'Measures forces and torques at a specific point, typically in robot hands or feet. Enables the robot to feel how hard it\'s gripping or how much force its foot exerts on the ground.', category: 'Sensors' },
  { term: 'Depth Camera', definition: 'Camera that captures distance information along with visual data. Intel RealSense and Microsoft Azure Kinect are popular choices. Used for 3D perception and object recognition.', category: 'Sensors' },
  { term: 'Encoder', definition: 'Sensor that measures rotation of a motor shaft. Provides position feedback for precise joint control. Can be absolute (knows position at startup) or incremental (counts changes).', category: 'Sensors' },
  { term: 'Proximity Sensor', definition: 'Detects nearby objects without contact. Types include ultrasonic, infrared, and capacitive. Used for collision avoidance and safe human-robot interaction.', category: 'Sensors' },
  // AI & Software
  { term: 'ROS (Robot Operating System)', definition: 'An open-source framework for robot software development. Provides tools, libraries, and conventions for building robot applications. ROS 2 is the current version, used by most modern humanoid robots.', category: 'AI & Software' },
  { term: 'SLAM (Simultaneous Localization and Mapping)', definition: 'Algorithm that allows a robot to build a map of its environment while simultaneously tracking its position within that map. Essential for autonomous navigation.', category: 'AI & Software' },
  { term: 'Computer Vision', definition: 'AI that enables robots to interpret visual information from cameras. Includes object detection, face recognition, scene understanding, and visual navigation.', category: 'AI & Software' },
  { term: 'Reinforcement Learning', definition: 'AI training method where a robot learns by trial and error, receiving rewards for successful actions. Used to teach robots locomotion, manipulation, and decision-making. Canada is a global leader (Amii, U of Alberta).', category: 'AI & Software' },
  { term: 'Inverse Kinematics', definition: 'Mathematical process of calculating joint angles needed to place the robot\'s hand (or foot) at a specific position. Essential for reaching, grasping, and walking.', category: 'AI & Software' },
  { term: 'Motion Planning', definition: 'Algorithms that compute a collision-free path from the robot\'s current position to a goal position. Must account for joint limits, obstacles, and dynamic environments.', category: 'AI & Software' },
  { term: 'Teleoperation', definition: 'Remote control of a robot by a human operator. Many humanoid robots learn tasks through teleoperation first, then gradually become autonomous. Sanctuary AI uses this approach extensively.', category: 'AI & Software' },
  { term: 'Digital Twin', definition: 'A virtual replica of a physical robot used for simulation, testing, and training. Allows developers to test code and behaviors before deploying on the real robot.', category: 'AI & Software' },
  { term: 'Foundation Model', definition: 'Large AI model trained on diverse data that can be adapted for specific tasks. OpenAI and Google models are being applied to robotics, enabling robots to understand natural language and visual scenes.', category: 'AI & Software' },
  // Power
  { term: 'Battery Life', definition: 'How long a robot can operate on a single charge. Ranges from 2 hours (Unitree G1) to 5+ hours (Tesla Optimus). Affected by activity level, payload, and temperature.', category: 'Power' },
  { term: 'Regenerative Braking', definition: 'System that recovers energy during deceleration and converts it back to electrical energy. Some humanoid robots use this to extend battery life during walking.', category: 'Power' },
  { term: 'BMS (Battery Management System)', definition: 'Electronics that monitor and manage rechargeable battery packs. Controls charging, prevents overcharging, monitors cell health, and manages thermal conditions.', category: 'Power' },
  // Industry
  { term: 'Cobot (Collaborative Robot)', definition: 'A robot designed to work alongside humans without safety barriers. Humanoid robots are inherently cobots — they must interact safely with people. Subject to ISO/TS 15066 force limits.', category: 'Industry' },
  { term: 'RaaS (Robot-as-a-Service)', definition: 'Business model where you rent or lease a robot on a monthly basis instead of purchasing. Includes maintenance, updates, and support. Typical range: $5,000-15,000 CAD/month.', category: 'Industry' },
  { term: 'TCO (Total Cost of Ownership)', definition: 'The complete cost of owning a robot over its lifetime — purchase price, import duties, maintenance, insurance, integration, and operating costs. Typically 40-60% above sticker price in Year 1.', category: 'Industry' },
  { term: 'OEE (Overall Equipment Effectiveness)', definition: 'Manufacturing metric measuring how effectively equipment is used. Calculated as Availability × Performance × Quality. Used to evaluate robot ROI in production environments.', category: 'Industry' },
  { term: 'Pilot Program', definition: 'A limited trial deployment of robots (typically 1-3 units for 3-6 months) to evaluate performance before full-scale commitment. Most enterprise robot manufacturers offer pilot programs.', category: 'Industry' },
  { term: 'HS Code', definition: 'Harmonized System code used by customs authorities to classify imported goods and determine duty rates. Correct HS classification is critical for importing robots to Canada — it can mean the difference between 0% and 8% duty.', category: 'Industry' },
];

const categories = [...new Set(terms.map(t => t.category))];

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 font-medium">Glossary</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Reference</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Robotics Glossary</h1>
        <p className="text-gray-500 max-w-2xl">
          Essential robotics terms explained in plain language. Bookmark this page — you&apos;ll use it often.
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <a
            key={cat}
            href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-600 text-sm font-medium rounded-lg transition-colors"
          >
            {cat}
          </a>
        ))}
      </div>

      {categories.map(category => (
        <section key={category} id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            {category}
          </h2>
          <dl className="space-y-4">
            {terms.filter(t => t.category === category).map(t => (
              <div key={t.term} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
                <dt className="text-base font-bold text-gray-900 mb-1.5">{t.term}</dt>
                <dd className="text-sm text-gray-600 leading-relaxed">{t.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <p className="text-sm text-gray-400 mt-8 text-center">
        Missing a term? <Link href="/inquiry" className="text-blue-600 hover:text-blue-700 font-medium">Let us know</Link> and we&apos;ll add it.
      </p>
    </div>
  );
}
