// ============================================================================
// RoboNorth.ca — Robot Parts & Components Catalog
// ============================================================================

import type { PartCategory } from '../types';

export type { PartCategory };

export const partCategories: PartCategory[] = [
  {
    id: 'actuators-motors',
    name: 'Actuators & Motors',
    description:
      'High-performance servo motors, brushless DC motors, and linear actuators for humanoid robot joints and limbs. From micro servos for hand dexterity to high-torque actuators for hip and knee joints.',
    itemCount: 284,
    imageUrl: '/images/parts/actuators-motors.jpg',
    popularItems: [
      {
        name: 'Dynamixel XM540-W270-R Smart Servo',
        priceRange: '$340–$390 CAD',
        description:
          'High-torque smart actuator with integrated controller, ideal for robotic arms and bipedal joints. 10.6 N·m stall torque with metal gears.',
      },
      {
        name: 'T-Motor U8 II KV85 BLDC Motor',
        priceRange: '$220–$280 CAD',
        description:
          'Ultra-efficient frameless BLDC outrunner designed for robotic joints. Popular in quasi-direct-drive actuator designs for humanoid legs.',
      },
      {
        name: 'Actuonix L16-100-63-6-R Linear Actuator',
        priceRange: '$95–$130 CAD',
        description:
          'Compact linear actuator with 100mm stroke and built-in position feedback. Perfect for grippers, mechanisms, and small humanoid projects.',
      },
      {
        name: 'MyActuator RMD-X8 Pro Brushless Servo',
        priceRange: '$450–$580 CAD',
        description:
          'Integrated cycloidal-drive actuator with CAN bus control. 9 N·m continuous torque in a compact form factor for humanoid joint modules.',
      },
    ],
  },
  {
    id: 'sensors',
    name: 'Sensors',
    description:
      'Perception and feedback sensors including LiDAR, depth cameras, IMUs, force/torque sensors, and proximity detectors. Essential for navigation, manipulation, and environmental awareness.',
    itemCount: 412,
    imageUrl: '/images/parts/sensors.jpg',
    popularItems: [
      {
        name: 'Intel RealSense D435i Depth Camera',
        priceRange: '$350–$420 CAD',
        description:
          'Stereo depth camera with integrated IMU providing 1280×720 depth at 90 fps. Industry standard for robotic perception and SLAM.',
      },
      {
        name: 'Livox Mid-360 3D LiDAR',
        priceRange: '$1,300–$1,600 CAD',
        description:
          'Compact 360° 3D LiDAR with 40m range and non-repetitive scanning pattern. Used in Unitree robots for navigation and obstacle avoidance.',
      },
      {
        name: 'ATI Mini45 6-Axis Force/Torque Sensor',
        priceRange: '$5,500–$7,200 CAD',
        description:
          'Research-grade 6-axis force/torque sensor for wrist-mounted manipulation feedback. Sub-newton resolution for delicate grasping control.',
      },
      {
        name: 'Bosch BNO085 9-DOF IMU Module',
        priceRange: '$25–$45 CAD',
        description:
          'High-accuracy 9-axis IMU with sensor fusion, providing absolute orientation. Ideal for balance and posture estimation in humanoid robots.',
      },
    ],
  },
  {
    id: 'controllers-compute',
    name: 'Controllers & Compute',
    description:
      'Single-board computers, microcontrollers, and GPU compute modules for robot control, AI inference, and sensor processing. From real-time motor controllers to powerful edge AI platforms.',
    itemCount: 156,
    imageUrl: '/images/parts/controllers-compute.jpg',
    popularItems: [
      {
        name: 'NVIDIA Jetson Orin Nano 8GB',
        priceRange: '$350–$450 CAD',
        description:
          'Compact AI compute module delivering 40 TOPS for edge inference. Powers vision, NLP, and planning on humanoid robots at low power.',
      },
      {
        name: 'NVIDIA Jetson AGX Orin 64GB',
        priceRange: '$2,800–$3,200 CAD',
        description:
          'The most powerful edge AI platform at 275 TOPS. Runs full transformer models, LiDAR processing, and multi-camera perception simultaneously.',
      },
      {
        name: 'STM32H7 Motor Controller Board',
        priceRange: '$65–$95 CAD',
        description:
          'High-performance ARM Cortex-M7 based motor controller for real-time joint control. Supports FOC, CAN-FD, and EtherCAT communication.',
      },
      {
        name: 'Raspberry Pi 5 (8GB)',
        priceRange: '$110–$140 CAD',
        description:
          'Versatile SBC for high-level robot control, ROS 2 nodes, and sensor integration. Great for prototyping and education-focused humanoid projects.',
      },
    ],
  },
  {
    id: 'power-systems',
    name: 'Power Systems',
    description:
      'Batteries, battery management systems, chargers, and power distribution boards for humanoid robot operation. High energy-density solutions for extended runtime and safe operation.',
    itemCount: 98,
    imageUrl: '/images/parts/power-systems.jpg',
    popularItems: [
      {
        name: 'Tattu 22.2V 22000mAh 25C 6S LiPo',
        priceRange: '$450–$550 CAD',
        description:
          'High-capacity 6S LiPo battery pack for humanoid robot power. 488 Wh capacity with 25C continuous discharge for demanding actuator loads.',
      },
      {
        name: 'Daly 24S 100A Smart BMS',
        priceRange: '$180–$250 CAD',
        description:
          'Intelligent battery management system with Bluetooth monitoring, cell balancing, and over-current protection. Essential for safe high-voltage robot batteries.',
      },
      {
        name: 'EPC 48V 20A DC-DC Converter',
        priceRange: '$120–$180 CAD',
        description:
          'High-efficiency buck converter for stepping down battery voltage to actuator and logic power rails. 96% efficiency with thermal protection.',
      },
      {
        name: 'MegaCell 51.2V 30Ah LiFePO4 Module',
        priceRange: '$680–$850 CAD',
        description:
          'Rugged lithium iron phosphate battery module with integrated BMS. 1,536 Wh capacity, 3000+ cycle life, and hot-swap connector for field replacement.',
      },
    ],
  },
  {
    id: 'structural-components',
    name: 'Structural Components',
    description:
      'Frames, joints, bearings, and structural hardware for building humanoid robot bodies. Includes carbon fiber tubes, machined aluminum brackets, harmonic drives, and precision bearings.',
    itemCount: 523,
    imageUrl: '/images/parts/structural-components.jpg',
    popularItems: [
      {
        name: 'Harmonic Drive CSF-20-50 Gear Set',
        priceRange: '$850–$1,200 CAD',
        description:
          'Precision harmonic gear reducer with 50:1 ratio and zero backlash. The gold standard for compact, high-precision humanoid robot joints.',
      },
      {
        name: 'Misumi Precision Cross Roller Bearing',
        priceRange: '$120–$280 CAD',
        description:
          'High-rigidity crossed roller bearing for robotic joint applications. Compact design supports combined axial, radial, and moment loads.',
      },
      {
        name: 'DragonPlate Carbon Fiber Tube Kit',
        priceRange: '$85–$220 CAD',
        description:
          'Lightweight, high-strength carbon fiber tubes and connectors for humanoid limb construction. 70% lighter than aluminum at comparable stiffness.',
      },
      {
        name: '6061-T6 Aluminum Bracket Kit (Humanoid Joint)',
        priceRange: '$45–$95 CAD',
        description:
          'CNC-machined aluminum brackets designed for standard Dynamixel and MyActuator servo mounts. Available in hip, knee, and ankle configurations.',
      },
    ],
  },
  {
    id: 'grippers-end-effectors',
    name: 'Grippers & End Effectors',
    description:
      'Robot hands, parallel grippers, soft grippers, and tool changers for humanoid manipulation. From research-grade dexterous hands to industrial pick-and-place end effectors.',
    itemCount: 147,
    imageUrl: '/images/parts/grippers-end-effectors.jpg',
    popularItems: [
      {
        name: 'Robotiq 2F-140 Adaptive Gripper',
        priceRange: '$6,500–$8,200 CAD',
        description:
          'Industrial 2-finger adaptive gripper with 140mm stroke and built-in force control. Self-adapts to object shape without programming.',
      },
      {
        name: 'LEAP Hand v2 (Open-Source Dexterous Hand)',
        priceRange: '$2,800–$3,500 CAD (kit)',
        description:
          'Open-source 16-DOF anthropomorphic robot hand using off-the-shelf Dynamixel servos. Designed for research in dexterous manipulation and sim-to-real transfer.',
      },
      {
        name: 'OnRobot Soft Gripper SG',
        priceRange: '$4,800–$5,600 CAD',
        description:
          'Food-safe silicone soft gripper for delicate object handling. Three flexible fingers conform to irregular shapes without crushing.',
      },
      {
        name: 'ATI QC-11 Robotic Tool Changer',
        priceRange: '$2,200–$3,000 CAD',
        description:
          'Automatic tool changer for swapping end effectors on humanoid arms. Supports pneumatic, electrical, and signal pass-through connections.',
      },
    ],
  },
  {
    id: 'software-dev-kits',
    name: 'Software & Dev Kits',
    description:
      'Development platforms, simulation environments, and SDKs for humanoid robot programming. Includes ROS 2 packages, reinforcement learning frameworks, digital twins, and manufacturer dev kits.',
    itemCount: 89,
    imageUrl: '/images/parts/software-dev-kits.jpg',
    popularItems: [
      {
        name: 'NVIDIA Isaac Sim + Isaac Lab License',
        priceRange: 'Free–$12,000 CAD/yr',
        description:
          'Physics-accurate robot simulation with RTX rendering, domain randomization, and sim-to-real transfer. The industry standard for training humanoid locomotion and manipulation policies.',
      },
      {
        name: 'MuJoCo Pro (DeepMind)',
        priceRange: 'Free (open-source)',
        description:
          'High-fidelity physics simulator optimized for contact-rich robotics tasks. Used by virtually every humanoid robotics lab for reinforcement learning research.',
      },
      {
        name: 'Unitree SDK + ROS 2 Dev Kit',
        priceRange: '$500–$2,000 CAD',
        description:
          'Official development kit for Unitree G1/H1/R1 robots. Includes Python & C++ APIs, ROS 2 packages, example controllers, and sim environments.',
      },
      {
        name: 'LeRobot Framework (Hugging Face)',
        priceRange: 'Free (open-source)',
        description:
          'Open-source library for robot learning, imitation learning, and sim-to-real. Provides pre-trained models and datasets for humanoid locomotion and manipulation.',
      },
    ],
  },
];
