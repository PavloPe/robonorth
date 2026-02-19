// ============================================================================
// RoboNorth.ca — Robot Parts & Components Catalog
// Real products with verified prices from manufacturer websites (Feb 2025)
// Prices converted to CAD at ~1.38 USD/CAD rate
// ============================================================================

import type { PartCategory } from '../types';

export type { PartCategory };

export const partCategories: PartCategory[] = [
  {
    id: 'actuators-motors',
    name: 'Actuators & Motors',
    description:
      'High-performance servo motors, brushless DC motors, and linear actuators for humanoid robot joints and limbs. From micro servos for hand dexterity to high-torque actuators for hip and knee joints.',
    itemCount: 347,
    imageUrl: '/images/parts/actuators-motors.jpg',
    popularItems: [
      {
        name: 'Dynamixel XM540-W270-R Smart Servo',
        priceRange: '$680–$695 CAD',
        description:
          'High-torque smart actuator with integrated controller and metal gears. 10.6 N·m stall torque, RS-485/TTL interface with daisy-chaining. Industry workhorse for robotic arms and bipedal joints. ($494.39 USD MSRP from ROBOTIS)',
      },
      {
        name: 'Dynamixel XH540-W270-T Smart Servo',
        priceRange: '$855–$875 CAD',
        description:
          'Premium high-torque smart actuator with coreless motor and metal gears. 11.2 N·m stall torque at 12V, TTL interface. Full PID control, current/velocity/position modes. ($620.89 USD from ROBOTIS)',
      },
      {
        name: 'Dynamixel YM080-230-A099-RH (Y-Series)',
        priceRange: '$4,550–$4,600 CAD',
        description:
          'Next-gen smart actuator for Physical AI and humanoid robotics. Cycloidal reducer with electronic brake, absolute encoder with backup battery. Designed for reinforcement learning deployment. ($3,300.39 USD from ROBOTIS)',
      },
      {
        name: 'Dynamixel XL430-W250-T Smart Servo',
        priceRange: '$60–$65 CAD',
        description:
          'Budget-friendly smart servo ideal for education and prototyping. 1.0 N·m stall torque, TTL interface, full DYNAMIXEL protocol 2.0 support. Same pinout as AX-12A. ($44.90 USD from ROBOTIS)',
      },
      {
        name: 'MyActuator RMD-X8 S2 Brushless Servo',
        priceRange: '$695–$960 CAD',
        description:
          'Integrated planetary-drive actuator with 36:1 reducer and CAN bus control. 25 N·m peak torque in a compact form factor. Dual encoder, FOC driver. Popular for humanoid joint modules. ($695+ USD from AIFITLAB)',
      },
      {
        name: 'MyActuator RMD-X6 H Brushless Servo',
        priceRange: '$350–$490 CAD',
        description:
          'Mid-range helical gear brushless servo with 6:1 reducer. CAN bus interface with FOC control. Compact and lightweight for robot arms and smaller joint applications. ($255+ USD from AIFITLAB)',
      },
      {
        name: 'Unitree GO-M8010-6 Joint Motor',
        priceRange: '$510–$520 CAD',
        description:
          'Bionic robot joint motor — permanent magnet synchronous motor designed for quadrupeds and humanoids. 23.7 N·m peak torque, precision bearing, integrated temperature sensor. ($369 USD from Unitree)',
      },
      {
        name: 'Unitree B1 Industrial Motor',
        priceRange: '$11,450–$11,500 CAD',
        description:
          'High-performance industrial-grade brushless motor for Unitree B1/B2 quadrupeds. Extreme torque density for heavy-payload robotic platforms. ($8,300 USD from Unitree)',
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
          'Compact linear actuator with 100mm stroke, 63:1 gear ratio, and built-in position feedback. Max force 67N. Perfect for grippers, mechanisms, and small humanoid projects. (Canadian company — Actuonix, Victoria BC)',
      },
      {
        name: 'Actuonix PQ12-P Micro Linear Actuator',
        priceRange: '$80–$95 CAD',
        description:
          'The world\'s smallest linear actuator with position feedback. Only 15g, 20mm stroke, up to 45N force. Ideal for robotic fingers and micro mechanisms. Under $70 USD. (Actuonix, Victoria BC — Canadian!)',
      },
      {
        name: 'Actuonix L12-P Linear Actuator',
        priceRange: '$70–$90 CAD',
        description:
          'Micro linear actuator with potentiometer feedback. 10-50mm stroke options, up to 42N force. Ultra-compact for space-constrained robotic applications. (Actuonix, Victoria BC)',
      },
    ],
  },
  {
    id: 'sensors',
    name: 'Sensors',
    description:
      'Perception and feedback sensors including LiDAR, depth cameras, IMUs, force/torque sensors, and proximity detectors. Essential for navigation, manipulation, and environmental awareness.',
    itemCount: 483,
    imageUrl: '/images/parts/sensors.jpg',
    popularItems: [
      {
        name: 'Intel RealSense D435i Depth Camera',
        priceRange: '$380–$420 CAD',
        description:
          'Stereo depth camera with integrated IMU providing 1280×720 depth at 90 fps. Global shutter, 87°×58° FOV, ideal range 0.3–3m. Industry standard for SLAM and robotic perception. (~$300 USD)',
      },
      {
        name: 'Intel RealSense D455 Depth Camera',
        priceRange: '$480–$550 CAD',
        description:
          'Extended-range stereo depth camera with improved accuracy. 1280×800 depth at 90 fps, 87°×58° FOV, ideal range 0.6–6m. 2× the range and accuracy of D435 series. (~$370 USD)',
      },
      {
        name: 'Livox Mid-360 3D LiDAR',
        priceRange: '$1,035–$1,100 CAD',
        description:
          'Compact 360° 3D LiDAR with 40m range and non-repetitive scanning pattern. Ultra-wide 360°×59° FOV. Used in Unitree robots for navigation and obstacle avoidance. ($749 USD from DJI Store)',
      },
      {
        name: 'Livox Avia 3D LiDAR',
        priceRange: '$2,200–$2,250 CAD',
        description:
          'High-performance LiDAR with 450m detection range, 70.4°×77.2° FOV. Triple-return and dual-scanning modes for mapping and autonomous driving. Only 498g. ($1,599 USD from DJI Store)',
      },
      {
        name: 'Livox HAP Automotive-Grade LiDAR',
        priceRange: '$2,200–$2,250 CAD',
        description:
          'First automotive-grade hybrid solid-state LiDAR from Livox. Designed for intelligent driving assistance with high reliability and commercial mass production. ($1,599 USD)',
      },
      {
        name: 'Robotiq FT 300-S Force/Torque Sensor',
        priceRange: '$4,800–$5,500 CAD',
        description:
          'Multi-axis force and torque sensor for collaborative robots. IP65 rated, enables force-sensitive tasks like polishing, assembly, and insertion. Simple plug-and-play with UR cobots.',
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
    itemCount: 198,
    imageUrl: '/images/parts/controllers-compute.jpg',
    popularItems: [
      {
        name: 'NVIDIA Jetson Orin Nano Super Developer Kit',
        priceRange: '$340–$350 CAD',
        description:
          'Compact AI compute module delivering 67 TOPS (Super edition). 8GB LPDDR5, Ampere GPU with 1024 CUDA cores, 2× M.2, pre-installed WiFi. The most affordable NVIDIA AI platform. ($249 USD — official NVIDIA price)',
      },
      {
        name: 'NVIDIA Jetson Orin NX 16GB Module',
        priceRange: '$690–$830 CAD',
        description:
          'Mid-range AI edge module with 100 TOPS of AI performance. 16GB LPDDR5 memory, Ampere GPU. Ideal for multi-camera perception and real-time planning on humanoid robots. (~$599 USD)',
      },
      {
        name: 'NVIDIA Jetson AGX Orin 64GB Developer Kit',
        priceRange: '$2,760–$2,800 CAD',
        description:
          'The most powerful edge AI platform at 275 TOPS. 64GB LPDDR5, 2048 CUDA cores. Runs full transformer models, LiDAR processing, and multi-camera perception simultaneously. ($1,999 USD)',
      },
      {
        name: 'ROBOTIS OpenCR 1.0 Controller',
        priceRange: '$290–$310 CAD',
        description:
          'Open-source embedded controller for ROS-based robots. ARM Cortex-M7 (STM32F7), 3-axis gyro/accelerometer, supports DYNAMIXEL protocol. The brain behind TurtleBot3.',
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
    itemCount: 124,
    imageUrl: '/images/parts/power-systems.jpg',
    popularItems: [
      {
        name: 'Unitree Go2 Battery Pack',
        priceRange: '$690–$700 CAD',
        description:
          'Official replacement battery for Unitree Go2 quadruped robot. High energy density lithium-ion pack with integrated protection circuitry. Drop-in replacement. ($500 USD from Unitree)',
      },
      {
        name: 'Unitree Go2 Quick Charger',
        priceRange: '$138–$210 CAD',
        description:
          'Official fast charger for Unitree Go2 battery. High-security protection with stable power delivery. Compact and portable. Standard ($100 USD) and Quick Charger versions available from Unitree.',
      },
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
    itemCount: 586,
    imageUrl: '/images/parts/structural-components.jpg',
    popularItems: [
      {
        name: 'Harmonic Drive CSF-20-50 Gear Set',
        priceRange: '$850–$1,200 CAD',
        description:
          'Precision harmonic gear reducer with 50:1 ratio and zero backlash. The gold standard for compact, high-precision humanoid robot joints.',
      },
      {
        name: 'ROBOTIS Dynamixel-X Frame Set (XM/XH Series)',
        priceRange: '$25–$85 CAD',
        description:
          'Official CNC-machined frames and brackets for DYNAMIXEL X-series servos. Multiple configurations for building robot arms, legs, and torsos. Direct bolt-on compatibility.',
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
    itemCount: 178,
    imageUrl: '/images/parts/grippers-end-effectors.jpg',
    popularItems: [
      {
        name: 'Robotiq 2F-85 Adaptive Gripper',
        priceRange: '$8,040–$8,100 CAD',
        description:
          '2-finger adaptive gripper with 85mm stroke and built-in force control. Self-adapts to object shape, internal/external parallel + encompassing grip modes. IP67. ($5,825 USD)',
      },
      {
        name: 'Robotiq 2F-140 Adaptive Gripper',
        priceRange: '$8,270–$8,300 CAD',
        description:
          'Wide-stroke 2-finger adaptive gripper with 140mm stroke. Same adaptive grip modes as 2F-85 with wider opening for larger objects. ($5,995 USD)',
      },
      {
        name: 'Robotiq Hand-E Parallel Gripper',
        priceRange: '$11,600–$11,700 CAD',
        description:
          'Precision parallel gripper for harsh environments. 50mm stroke with position/speed/force control. Sealed design for demanding industrial and research applications. ($8,416 USD)',
      },
      {
        name: 'Robotiq 3-Finger Adaptive Gripper',
        priceRange: '$31,600–$31,700 CAD',
        description:
          'Advanced 3-finger gripper with 4 grasping modes (pinch, wide, scissor, encompassing). 10 independent joints adapt to virtually any object shape. ($22,900 USD)',
      },
      {
        name: 'ROBOTIS Hand RH-P12-RN',
        priceRange: '$5,050–$5,100 CAD',
        description:
          'DYNAMIXEL-based 1-DOF adaptive robot hand with passive joints and detachable fingertips. 109mm stroke, supports DYNAMIXEL Protocol 2.0 via daisy-chain. ($3,663.90 USD from ROBOTIS)',
      },
      {
        name: 'OnRobot RG2 Flexible Gripper',
        priceRange: '$7,780–$7,800 CAD',
        description:
          'Collaborative 2-finger gripper with 110mm stroke and built-in Quick Changer. 2kg payload, adjustable grip force, TÜV certified. Simple programming. ($5,637 USD)',
      },
      {
        name: 'LEAP Hand v2 (Open-Source Dexterous Hand)',
        priceRange: '$2,800–$3,500 CAD (kit)',
        description:
          'Open-source 16-DOF anthropomorphic robot hand using off-the-shelf Dynamixel servos. Designed for research in dexterous manipulation and sim-to-real transfer.',
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
    id: 'communication-networking',
    name: 'Communication & Networking',
    description:
      'CAN bus adapters, EtherCAT modules, serial communication interfaces, and wireless modules for robot inter-component communication. Essential for connecting actuators, sensors, and controllers.',
    itemCount: 93,
    imageUrl: '/images/parts/communication-networking.jpg',
    popularItems: [
      {
        name: 'ROBOTIS U2D2 Communication Converter',
        priceRange: '$50–$60 CAD',
        description:
          'USB-to-DYNAMIXEL communication adapter supporting RS-485, TTL, and RS-232. Essential for programming and debugging DYNAMIXEL servos from a PC. Compact USB dongle form factor.',
      },
      {
        name: 'ROBOTIS U2D2 Power Hub Board',
        priceRange: '$30–$40 CAD',
        description:
          'Power distribution and communication hub for DYNAMIXEL servos. Provides easy power + data connectivity when used with U2D2 converter.',
      },
      {
        name: 'CANable 2.0 USB-to-CAN Adapter',
        priceRange: '$55–$85 CAD',
        description:
          'Open-source USB-to-CAN bus adapter supporting CAN 2.0 and CAN-FD. Essential for communicating with MyActuator, ODrive, and other CAN-based actuators from a PC or SBC.',
      },
      {
        name: 'Beckhoff EK1100 EtherCAT Coupler',
        priceRange: '$280–$350 CAD',
        description:
          'Industrial EtherCAT bus coupler for connecting I/O modules to an EtherCAT master. Enables deterministic real-time communication for high-performance robot control loops.',
      },
      {
        name: 'Intel Wi-Fi 6E AX210 Module',
        priceRange: '$25–$40 CAD',
        description:
          'M.2 WiFi 6E + Bluetooth 5.3 module for Jetson and SBC platforms. Tri-band (2.4/5/6GHz), low latency for robot teleoperation and cloud AI offload.',
      },
    ],
  },
  {
    id: 'development-kits',
    name: 'Development Kits & Platforms',
    description:
      'Complete robot development platforms, manipulator kits, and mobile bases for research, education, and prototyping. Includes ROS 2-ready systems from leading manufacturers.',
    itemCount: 67,
    imageUrl: '/images/parts/development-kits.jpg',
    popularItems: [
      {
        name: 'ROBOTIS OpenManipulator-X (RM-X52-TNM)',
        priceRange: '$2,250–$2,300 CAD',
        description:
          '5-DOF robotic arm kit (4-DOF + gripper) using DYNAMIXEL XM430 servos. 380mm reach, 500g payload. Full ROS/ROS 2 support with MoveIt integration. ($1,629.09 USD from ROBOTIS)',
      },
      {
        name: 'Clearpath TurtleBot 4 Standard',
        priceRange: '$2,550–$2,600 CAD',
        description:
          'ROS 2-native mobile robot platform built on iRobot Create 3. Oak-D-Pro stereo camera, OLED display, accessible power/USB ports. The world\'s most popular ROS learning platform. (Canadian — Clearpath Robotics, Kitchener ON) ($1,850 USD)',
      },
      {
        name: 'Clearpath TurtleBot 4 Lite',
        priceRange: '$1,650–$1,700 CAD',
        description:
          'Budget-friendly ROS 2 mobile robot with Oak-D-Lite camera. Same Create 3 base as Standard, ideal for ROS 2 education and research. (Canadian — Clearpath Robotics) ($1,195 USD)',
      },
      {
        name: 'Clearpath Husky A300 UGV',
        priceRange: '$28,000–$35,000 CAD',
        description:
          'Rugged all-terrain unmanned ground vehicle with 100kg payload. 2 m/s max speed, 4-12h runtime, ROS 2 Jazzy native. Modular payload interface for LiDAR, cameras, and manipulators. (Canadian — Clearpath, Kitchener ON)',
      },
      {
        name: 'Unitree Go2 Controller',
        priceRange: '$415–$420 CAD',
        description:
          'Official wireless controller for Unitree Go2 quadruped robot. Ergonomic design with dedicated robot control buttons and dual joysticks. ($300 USD from Unitree)',
      },
      {
        name: 'ROBOTIS TurtleBot3 Waffle Pi',
        priceRange: '$1,650–$1,850 CAD',
        description:
          'Compact ROS 2 research platform with Raspberry Pi 4, 360° LiDAR, and Intel RealSense camera option. Powered by DYNAMIXEL servos. Ideal for SLAM and navigation research.',
      },
    ],
  },
  {
    id: 'software-dev-kits',
    name: 'Software & Simulation',
    description:
      'Development platforms, simulation environments, and open-source frameworks for humanoid robot programming. Includes physics simulators, reinforcement learning tools, and manufacturer SDKs.',
    itemCount: 112,
    imageUrl: '/images/parts/software-dev-kits.jpg',
    popularItems: [
      {
        name: 'NVIDIA Isaac Sim + Isaac Lab',
        priceRange: 'Free–$12,000 CAD/yr',
        description:
          'Physics-accurate robot simulation with RTX rendering, domain randomization, and sim-to-real transfer. The industry standard for training humanoid locomotion and manipulation policies.',
      },
      {
        name: 'MuJoCo (DeepMind)',
        priceRange: 'Free (open-source)',
        description:
          'High-fidelity physics simulator optimized for contact-rich robotics tasks. Used by virtually every humanoid robotics lab for reinforcement learning research. Apache 2.0 license.',
      },
      {
        name: 'Unitree SDK + ROS 2 Dev Kit',
        priceRange: '$500–$2,000 CAD',
        description:
          'Official development kit for Unitree G1/H1 robots. Includes Python & C++ APIs, ROS 2 packages, example controllers, and sim environments.',
      },
      {
        name: 'LeRobot Framework (Hugging Face)',
        priceRange: 'Free (open-source)',
        description:
          'Open-source library for robot learning from Hugging Face. Provides pre-trained models, datasets, and pipelines for imitation learning and sim-to-real transfer on humanoid and manipulation tasks.',
      },
      {
        name: 'ROS 2 Jazzy Jalisco (Full Desktop)',
        priceRange: 'Free (open-source)',
        description:
          'Latest long-term-support release of the Robot Operating System. Includes MoveIt 2 for manipulation, Nav2 for navigation, and ros2_control for hardware abstraction. Ubuntu 24.04 native.',
      },
      {
        name: 'DYNAMIXEL Wizard 2.0',
        priceRange: 'Free',
        description:
          'Official ROBOTIS configuration and diagnostic tool for all DYNAMIXEL servos. Firmware update, PID tuning, protocol packet analysis, and real-time graph monitoring.',
      },
      {
        name: 'Gazebo Harmonic Simulator',
        priceRange: 'Free (open-source)',
        description:
          'Next-generation open-source robotics simulator with advanced physics (DART/Bullet), sensor simulation, and tight ROS 2 integration. Successor to Gazebo Classic.',
      },
    ],
  },
];
