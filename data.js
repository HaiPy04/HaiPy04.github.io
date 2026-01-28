// data.js
const projects = [
    {
        id: 1,
        title: "RMP flow Control for path following applications",
        category: "Robotics",
        summary: "Full URDF modeling and ROS2 integration for a robotic arm.",
        description: "Modeled a 3-degree-of-freedom manipulator in Gazebo. Implemented ros2_control hardware interfaces to manage joint states and trajectory planning.",
        stack: ["Gazebo", "URDF", "ROS2 Control", "MoveIt"],
        github: "https://github.com/yourusername/manipulator",
        image: "./images/rmp_manip.png",
        videoPreview: "videos/rmpflow.webm"
    },
    {
        id: 2,
        title: "Drone Safe Approach & Landing",
        category: "Simulation",
        summary: "Sim-to-Real autonomous landing pipeline using Isaac Sim.",
        description: "Built a target detection pipeline using YOLOv8 and PnP pose estimation. Integrated ROS2 control for precise approach and safe landing. Validated using synthetic data generation in Isaac Sim (Replicator).",
        stack: ["ROS2", "Isaac Sim", "YOLOv8", "Python", "Computer Vision"],
        github: "https://github.com/yourusername/drone-landing",
        image: "images/world.png",
        videoPreview: "videos/drone_approach"
    },
    {
        id: 3,
        title: "3DOF Manipulator Control",
        category: "Robotics",
        summary: "Full URDF modeling and ROS2 integration for a robotic arm.",
        description: "Modeled a 3-degree-of-freedom manipulator in Gazebo. Implemented ros2_control hardware interfaces to manage joint states and trajectory planning.",
        stack: ["Gazebo", "URDF", "ROS2 Control", "MoveIt"],
        github: "https://github.com/yourusername/manipulator",
        image: "./images/manipulator.png",
        videoPreview: "videos/DOF_3_manip.webm"
    },
    {
        id: 4,
        title: "STM32 Bare Metal Snake",
        category: "Embedded Systems",
        summary: "Full game engine written in C/Assembly on custom hardware.",
        description: "Developed a complete Snake game on an STM32 microcontroller without an OS (Bare Metal). Wrote custom HAL drivers for direct register access, managed IMU inputs for control, and generated audio signals via DAC. Optimized memory usage for restricted embedded environment.",
        stack: ["C", "Assembly", "STM32", "HAL", "Altium"],
        github: "https://github.com/yourusername/stm32-snake", // Placeholder
        image: "images/world.png",
        videoPreview: "videos/snake.mp4"
    },
    {
        id: 5,
        title: "Polymaze Robot (2nd Place)",
        category: "Robotics",
        summary: "High-speed line follower with custom PCB and PID control.",
        description: "Designed a custom PCB for an Arduino Mini-based robot. Implemented a tuned PID control loop for high-speed line following and maze solving algorithms. Secured 2nd place at the National Polymaze Competition.",
        stack: ["C++", "Arduino", "PCB Design", "PID Control"],
        github: "https://github.com/yourusername/polymaze",
        image: "images/polymaze.png",
        videoPreview: "videos/amazeo.mkv"
    },
    {
        id: 6,
        title: "Road Anomaly Detection",
        category: "Computer Vision",
        summary: "Edge AI deployment for Quebec Ministry of Transport.",
        description: "Internship project detecting guardrail damage using YOLO-seg and ORB on Jetson Xavier NX. Used polynomial interpolation to estimate curvature and severity of damage.",
        stack: ["Jetson Xavier", "YOLO-seg", "OpenCV", "Edge AI"],
        github: "#", // Private repo
        image: "./images/road_anomaly.png",
        videoPreview: "videos/manip.mkv"
    }
];

// data.js
const education_experience = [
    // THE HOMOGENEOUS SOLUTION (The Standard Path)
    {
        type: "homogeneous",
        title: "Electrical Engineering B.Eng",
        institution: "Polytechnique Montréal",
        period: "2023 - Present",
        desc: "3rd Year. Focus on Embedded Systems & Control Theory. GPA: 3.x/4.0",
        color: "standard" // Clean, academic look
    },
    {
        type: "homogeneous",
        title: "Preparatory Classes",
        institution: "Ecole Nationale Polytechnique d'Alger",
        period: "2021 - 2023",
        desc: "Intensive training in Mathematics and Physics.",
        color: "standard"
    },

    // THE PARTICULAR SOLUTION (The Unique "Forcing Functions")
    {
        type: "particular",
        role: "Control Team Lead",
        company: "Zenith Polymtl",
        period: "Dec 2024 - Present",
        desc: "Leading architecture for aerial robotics. The 'forcing function' of my career.",
        color: "accent",
        slideshowImages: [
            "images/world.png",
            "images/world.png",
            "images/world.png",
        ],
        fullDescription: `
            <p>Lead a team of 5 engineers to design the control architecture...</p>
            <ul>
                <li>Developed cascade PID controller...</li>
                <li>Managed integration of ROS2 Humble...</li>
            </ul>
            <p><b>Result:</b> Achieved stable flight in 20mph crosswinds.</p>
            `,// Your Cyberpunk/Industrial look

    },
    {
        type: "particular",
        role: "Embedded CV Intern",
        company: "MTMD (Ministry of Transport)",
        period: "May 2025 - Aug 2025",
        desc: "Applied edge computing in the real world.",
        color: "accent",
        slideshowImages: [
            "images/world.png",
            "images/world.png",
            "images/world.png",
        ],
        fullDescription: `
            <p>Lead a team of 5 engineers to design the control architecture...</p>
            <ul>
                <li>Developed cascade PID controller...</li>
                <li>Managed integration of ROS2 Humble...</li>
            </ul>
            <p><b>Result:</b> Achieved stable flight in 20mph crosswinds.</p>
            `,// Your Cyberpunk/Industrial look

    }
];
