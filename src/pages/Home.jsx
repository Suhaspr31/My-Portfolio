import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useInView, useMotionValue, useSpring } from 'framer-motion';
import { InfiniteSliderHorizontal } from '@/components/ui/infinite-slider-horizontal';
import InteractiveSelector from '@/components/ui/interactive-selector';
import WhisperText from '@/components/ui/whisper-text';
import { SlidingNumber } from '@/components/ui/sliding-number';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { CardsParallax } from '@/components/ui/scroll-cards';
import StickyFooter from '@/components/ui/footer';
import { Macbook } from '@/components/ui/animated-3d-mac-book-air';
import { GraduationCap, School, BookOpen, Award, CheckCircle2, Briefcase } from 'lucide-react';
import ButtonWithIconDemo from '@/components/ui/button-witn-icon';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import Navbar from '@/components/ui/navbar';
import { Link } from 'react-router-dom';
import { ProjectModal } from '@/components/ui/project-modal';

const EASE = [0.16, 1, 0.3, 1]; // Master Framer GSAP-like curve
void motion;

// Featured Projects Data
const cardItems = [
  {
    title: "Smart Civic Issue Reporting System",
    description: "Java, Spring Boot, React.js, MySQL Jul’26",
    tag: "civic tech",
    src: "/img/Smart Civic.png",
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
    overview: "Smart Civic Issue Reporting System\n\nBuilt a civic issue reporting platform supporting image uploads, real-time tracking, role-based access, notifications, and SLA-based escalation.",
    details: "Designed RESTful APIs, Spring Security-based role authentication, feedback management, and SLA-based escalation for efficient issue resolution.",
    performance: "Real-time Tracking & Escalation",
    performanceDetail: "SLA-based automated issue escalation workflows.",
    responsive: "React.js Web Platform",
    responsiveDetail: "Role-based access for citizens and admin officers.",
    stack: [
      "Java", "Spring Boot", "React.js", "MySQL", "Spring Security", "REST APIs"
    ],
    githubUrl: "https://github.com/Suhaspr31/Civic-Issue-Management-System.git",
    liveUrl: "",
    color: "#0f172a",
    textColor: "white",
    link: "#",
  },
  {
    title: "E-Commerce Web Application",
    description: "Java, Spring Boot, Spring Security, Hibernate, MySQL Dec’24",
    tag: "e-commerce",
    src: "/img/Ecommerce.png",
    tags: ['Java', 'Spring Boot', 'Spring Security', 'MySQL'],
    overview: "E-Commerce Web Application\n\nDeveloped a secure full-stack E-Commerce application supporting Admin and Customer modules with 15+ REST APIs, Spring Security authentication, and CRUD operations.",
    details: "Implemented Spring Security, RESTful APIs, CRUD operations, shopping cart, checkout, and order management for Admin and Customer modules.",
    performance: "15+ RESTful APIs & Spring Security",
    performanceDetail: "Spring Security authentication with Hibernate ORM.",
    responsive: "Full-Stack Web App",
    responsiveDetail: "Admin & Customer operational modules.",
    stack: [
      "Java", "Spring Boot", "Spring Security", "Hibernate", "MySQL", "REST APIs"
    ],
    githubUrl: " https://github.com/Suhaspr31/E-commerce-Web-Application",
    liveUrl: "",
    color: "#1e1b4b",
    textColor: "white",
    link: "#",
  },
  {
    title: "AgroUnify",
    description: "Smart Farming and Agricultural Platform | Python, React, MongoDB Jan’25",
    tag: "agriculture",
    src: "/img/AgroUnify.png",
    tags: ['Frontend', 'Backend', 'UI/UX'],
    overview: "AgroUnify – AI-Powered Agricultural Platform\n\nThis project represents a comprehensive AI-powered agricultural platform designed to empower farmers through intelligent automation and data-driven insights. It integrates crop disease diagnosis, real-time monitoring, market intelligence, and a digital marketplace into a unified ecosystem.",
    details: "The platform leverages advanced AI models such as YOLOv8 and Google Gemini API to analyze crop images and detect 20+ diseases across multiple crops, providing instant diagnosis along with treatment recommendations and prevention strategies. It also supports offline analysis, ensuring usability in low-connectivity environments.\n\nBuilt with a scalable microservices architecture, AgroUnify combines a React-based Progressive Web App with a Node.js backend and a dedicated Python AI service. The system incorporates IoT-based environmental monitoring, predictive alerts, multilingual support, and real-time market analytics to enhance productivity and decision-making for farmers.",
    performance: "High-accuracy multi-disease detection",
    performanceDetail: "Using YOLOv8 and deep learning models with Redis caching.",
    responsive: "Progressive Web App (PWA)",
    responsiveDetail: "Offline support with service workers and push notifications.",
    stack: [
      "React (Vite)", "TypeScript / JavaScript", "Tailwind CSS",
      "Node.js / Express", "MongoDB", "Elasticsearch",
      "Python (Flask / FastAPI)", "YOLOv8 / EfficientNet", "Google Gemini API",
      "TensorFlow / PyTorch"
    ],
    githubUrl: "https://github.com/Suhaspr31/AgroUnify-Smart-Farming-and-Agricultural-Platform-.git",
    liveUrl: "",
    color: "green",
    textColor: "white",
    link: "#",
  },
  {
    title: "AI-Based Facial Recognition System",
    description: "Python, OpenCV, TensorFlow, Flask, SQLite Dec’24",
    tag: "AI",
    src: "/img/Facial Recognition.png",
    tags: ['AI', 'Backend', 'UI/UX'],
    overview: "AI-Based Face Recognition Attendance System\n\nThis project is a web-based face recognition attendance system that automates the process of marking attendance using real-time facial detection and recognition. It captures live video feed from a webcam, detects faces using a Haar Cascade classifier, and identifies individuals using a pre-trained KNN model.",
    details: "The system allows users to register new faces and stores attendance records in a structured SQL database. It ensures accurate, efficient, and contactless attendance tracking, reducing manual effort and minimizing errors.\n\nBuilt using Flask and OpenCV, the application provides a lightweight and user-friendly interface, making it suitable for educational institutions and small-scale organizations.",
    performance: "Real-time face detection",
    performanceDetail: "Optimized processing with minimal latency for attendance logging.",
    responsive: "Web-based Interaction",
    responsiveDetail: "Desktop-optimized usage with seamless webcam integration.",
    stack: [
      "Python", "Flask", "OpenCV", "scikit-learn (KNN)", "NumPy", "SQLite", "ReportLab"
    ],
    githubUrl: "https://github.com/Suhaspr31/Face-Recognition-Attendance-System.git",
    liveUrl: "http://localhost:5000/",
    color: "purple",
    textColor: "white",
    link: "#",
  },
];

// ----------------------------------------------------
// Core Components
// ----------------------------------------------------

const AnimatedStat = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -100px 0px" });

  return (
    <div ref={ref} className="font-display text-5xl lg:text-[80px] font-bold tracking-tighter text-accent leading-normal flex items-center justify-center">
      <SlidingNumber value={isInView ? target : 0} />
      {suffix && <span className="ml-[2px]">{suffix}</span>}
    </div>
  );
};

const RevealText = ({ text, delay = 0, className = "" }) => (
  <span className="overflow-hidden inline-block align-bottom">
    <motion.span
      initial={{ y: "115%", rotate: 2 }}
      whileInView={{ y: "0%", rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: EASE, delay }}
      className={`inline-block origin-top-left ${className}`}
    >
      {text}
    </motion.span>
  </span>
);

const SpringReveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ y: 50, scale: 0.9, opacity: 0 }}
    whileInView={{ y: 0, scale: 1, opacity: 1 }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{ duration: 1.2, ease: [0.175, 0.885, 0.32, 1.275], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const MagneticButton = ({ children, href }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };
  const handlePointerLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="w-[100px] h-[100px] rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors duration-300 pointer-events-auto"
    >
      <motion.div style={{ x: xSpring, y: ySpring }} className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-text-main font-semibold">
        {children}
      </motion.div>
    </motion.a>
  );
};

const HiBubble = () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShowText(prev => !prev), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ y: [-10, 10] }} transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="w-24 h-24 lg:w-[110px] lg:h-[110px] bg-[#5e67e6] rounded-full text-white font-display text-[32px] lg:text-[40px] font-semibold cursor-pointer shadow-[0_15px_35px_rgba(94,103,230,0.4)] hover:scale-110 hover:-rotate-[12deg] transition-transform duration-300 relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {showText ? (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-0 flex items-center justify-center"
          >
            Hi
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Custom SVG mapping matching Portavia hand icon */}
            <svg width="42" height="42" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.5 10.5V15c0 4.5-3.5 8-8 8s-8-3.5-8-8v-3.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v2.5c0 .6.4 1 1 1s1-.4 1-1V4.5C8.5 3.7 9.2 3 10 3s1.5.7 1.5 1.5v6c0 .6.4 1 1 1s1-.4 1-1V5.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v7c0 .6.4 1 1 1s1-.4 1-1V7.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v3c0 .6.4 1 1 1s1-.4 1-1Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TypewriterEffect = ({ words, typingSpeed = 150, erasingSpeed = 100, pauseDuration = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length - 1));
      }, erasingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    // Handle switching
    if (!isDeleting && currentText === currentFullWord) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, words, currentWordIndex, typingSpeed, erasingSpeed, pauseDuration]);

  return <span className="inline-block min-w-[200px]">{currentText}<span className="animate-pulse">|</span></span>;
};

export default function PortaviaReplica() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all details.");
      return;
    }

    setIsSending(true);

    try {
      // Use Formspree for direct email sending
      // You can get your own ID at formspree.io
      const response = await fetch("https://formspree.io/f/xwvrdwbo", { // Placeholder ID - replace with real one later
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      // Fallback to mailto if service fails
      const mailtoUrl = `mailto:suhasprs331@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSending(false);
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main ">
      <Navbar />

      {/* Navbar is now handled by the shared component */}
      {/* 2. Scroll Expansion Hero Module */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
        posterSrc="/img/water_falls.jpg"
        bgImageSrc="/img/water_falls.jpg"
        title="SUHAS P R"
        date={
          <TypewriterEffect
            words={["Full Stack Developer", "AI/ML Engineer", "Software Engineer"]}
          />
        }
        scrollToExpand="SCROLL DOWN TO EXPLORE"
        textBlend={false}
      >
        {/* 2.5 My Story (About) Section where portrait lands */}
        <section className="min-h-screen w-full relative pt-40 pb-20 z-20" id="about">
          <div className="max-w-[1400px] w-full mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-24 lg:gap-24">

            {/* Left Section: 3D Macbook */}
            <div className="flex-1 relative h-[300px] md:h-[400px] w-full flex items-center justify-center lg:justify-start order-2 lg:order-1 mt-20 lg:mt-0">
              <SpringReveal className="w-full h-full">
                <div className="relative w-full h-full scale-[1.2] md:scale-[1.5] lg:scale-[2.2] transform translate-y-0 md:translate-y-10 lg:translate-y-20">
                  <Macbook />
                </div>
              </SpringReveal>
            </div>

            {/* Right Section: My Story Content */}
            <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start z-10 order-1 lg:order-2">
              <SpringReveal>
                <div className="font-display text-[32px] lg:text-[40px] text-text-muted mb-6 tracking-tight">MY STORY —</div>
                <WhisperText
                  text="I’m a **Java Full-Stack Developer** who enjoys turning real-world problems into scalable web applications. I specialize in **Java, Spring Boot, React, MySQL, and REST APIs**, while exploring **AI and Generative AI** to build smarter, next-generation applications."
                  className="font-body text-[22px] lg:text-[32px] font-normal leading-[1.4] text-text-main w-full justify-center lg:justify-start max-w-[800px] mx-auto lg:mx-0"
                  delay={40}
                  y={20}
                  duration={0.8}
                  triggerStart="top 85%"
                />
                <div className="mt-12 pointer-events-auto">
                  <a href="#contact">
                    <ButtonWithIconDemo />
                  </a>
                </div>
              </SpringReveal>
            </div>

          </div>
        </section>

        {/* 2.5.5 Education Section */}
        <section className="w-full relative py-20 bg-background" id="education">
          <div className="max-w-[1250px] mx-auto px-6">
            <SpringReveal>
              <div className="flex flex-col items-center lg:items-start mb-16 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[13px] font-medium text-text-muted">Academic Foundation</span>
                </div>
                <h2 className="font-display text-[60px] md:text-[85px] font-black uppercase leading-[0.9] tracking-tighter text-text-main mb-16">
                  Educational <br className="hidden md:block" /> <span className="text-accent">Journey</span>
                </h2>
                <p className="font-body text-[18px] md:text-[20px] text-text-muted max-w-[700px]">
                  My academic background has provided a solid foundation in engineering principles,
                  problem-solving, and the technical expertise required to build complex software systems.
                </p>
              </div>
            </SpringReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Card 1: B.E */}
              <SpringReveal delay={0.1}>
                <div className="bg-[#f8f9fb] rounded-[32px] p-8 h-full flex flex-col border border-black/[0.03] hover:shadow-xl transition-all duration-500 group">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <GraduationCap className="text-accent w-6 h-6" />
                  </div>
                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">BE</div>
                    <div>
                      <h4 className="font-display font-bold text-[18px]">Bachelor of Engineering (B.E.)</h4>
                      <p className="text-[14px] text-text-muted uppercase tracking-tight font-medium">Sri Venkateshwara College of Engineering, VTU</p>
                      <p className="text-[13px] text-text-muted mt-1">Computer Science • 2022-2026</p>
                    </div>
                  </div>
                </div>
              </SpringReveal>

              {/* Card 2: PU Education */}
              <SpringReveal delay={0.2}>
                <div className="bg-[#f8f9fb] rounded-[32px] p-8 h-full flex flex-col border border-black/[0.03] hover:shadow-xl transition-all duration-500 group">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <School className="text-accent w-6 h-6" />
                  </div>
                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">PUC</div>
                    <div>
                      <h4 className="font-display font-bold text-[18px]">Pre-University Course (PUC)</h4>
                      <p className="text-[14px] text-text-muted uppercase tracking-tight font-medium flex items-center gap-2">Shree Vani PU College, DPUE <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold">94%</span></p>
                      <p className="text-[13px] text-text-muted mt-1">Science (PCMC) • 2020-2022</p>
                    </div>
                  </div>
                </div>
              </SpringReveal>

              {/* Card 3: SSLC */}
              <SpringReveal delay={0.3}>
                <div className="bg-[#f8f9fb] rounded-[32px] p-8 h-full flex flex-col border border-black/[0.03] hover:shadow-xl transition-all duration-500 group">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="text-accent w-6 h-6" />
                  </div>
                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">SSLC</div>
                    <div>
                      <h4 className="font-display font-bold text-[18px]">Secondary Education (SSLC)</h4>
                      <p className="text-[14px] text-text-muted uppercase tracking-tight font-medium flex items-center gap-2">Nalanda High School, KSEEB <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-bold">91%</span></p>
                      <p className="text-[13px] text-text-muted mt-1">Secondary Education • 2020</p>
                    </div>
                  </div>
                </div>
              </SpringReveal>

              {/* Card 4: CGPA (Dark Theme like in image) */}
              <SpringReveal delay={0.4}>
                <div className="bg-[#1a1a1a] rounded-[32px] p-8 h-full flex flex-col text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <p className="font-body text-[15px] opacity-70 mb-10">University Academic Standing</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-display text-[80px] font-black leading-none group-hover:scale-105 transition-transform duration-500 inline-block">8.12</span>
                      <span className="font-display text-[40px] font-bold opacity-50">/10</span>
                    </div>
                    <p className="font-display text-[22px] font-bold uppercase tracking-tight">Current CGPA</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10 scale-150 rotate-12">
                    <Award size={160} />
                  </div>
                </div>
              </SpringReveal>

              {/* Card 5: Core Subjects & Specialization */}
              <SpringReveal delay={0.5}>
                <div className="bg-[#f8f9fb] rounded-[32px] p-8 h-full flex flex-col border border-black/[0.03] hover:shadow-xl transition-all duration-500 group lg:col-span-2">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <BookOpen className="text-accent w-6 h-6" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-display font-bold text-[20px] mb-2 uppercase tracking-tight">Key Coursework</h4>
                      <ul className="space-y-2 text-text-muted font-body text-[15px]">
                        <li>• Data Structures & Algorithms</li>
                        <li>• Database Management Systems</li>
                        <li>• Operating Systems & Networking</li>
                        <li>• Software Engineering Principles</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[20px] mb-2 uppercase tracking-tight">Technical Specialization</h4>
                      <ul className="space-y-2 text-text-muted font-body text-[15px]">
                        <li>• Full Stack Development</li>
                        <li>• Cloud Native Architecture</li>
                        <li>• Artificial Intelligence Applications</li>
                        <li>• System Design & Scalability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SpringReveal>

            </div>
          </div>
        </section>

        {/* 2.5.6 Experience & Training Section */}
        <section className="w-full relative py-20 bg-background" id="experience">
          <div className="max-w-[1250px] mx-auto px-6">
            <SpringReveal>
              <div className="flex flex-col items-center lg:items-start mb-16 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#5b68df] animate-pulse"></div>
                  <span className="text-[13px] font-medium text-text-muted">Professional Track</span>
                </div>
                <h2 className="font-display text-[60px] md:text-[85px] font-black uppercase leading-[0.9] tracking-tighter text-text-main mb-6">
                  Experience & <span className="text-accent">Training</span>
                </h2>
                <p className="font-body text-[18px] md:text-[20px] text-text-muted max-w-[700px]">
                  Hands-on industry experience and comprehensive Java Full Stack training.
                </p>
              </div>
            </SpringReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Experience Card */}
              <SpringReveal delay={0.1}>
                <div className="bg-[#f8f9fb] rounded-[32px] p-8 h-full flex flex-col border border-black/[0.03] hover:shadow-xl transition-all duration-500 group">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Briefcase className="text-accent w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[12px] uppercase tracking-widest px-3 py-1 bg-accent/10 text-accent font-semibold rounded-full">Internship Experience</span>
                    <h3 className="font-display font-bold text-[24px] mt-4 mb-1">MindMatrix</h3>
                    <p className="text-[16px] font-semibold text-text-main">Android App Development Intern (Generative AI)</p>
                    <p className="text-[13px] text-text-muted mt-1 mb-4">Feb 2026 – May 2026 • Remote</p>
                    <p className="text-[15px] text-text-muted leading-relaxed font-body">
                      Built and enhanced Android application modules using Kotlin, Android Studio, and Generative AI, integrating AI-powered features through prompt engineering to improve application functionality and user experience.
                    </p>
                  </div>
                </div>
              </SpringReveal>

              {/* Training Card */}
              <SpringReveal delay={0.2}>
                <div className="bg-[#f8f9fb] rounded-[32px] p-8 h-full flex flex-col border border-black/[0.03] hover:shadow-xl transition-all duration-500 group">
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <BookOpen className="text-accent w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[12px] uppercase tracking-widest px-3 py-1 bg-accent/10 text-accent font-semibold rounded-full">Training</span>
                    <h3 className="font-display font-bold text-[24px] mt-4 mb-1">Java Full Stack Development Training</h3>
                    <p className="text-[16px] font-semibold text-text-main">Tata STRIVE</p>
                    <p className="text-[13px] text-text-muted mt-1 mb-4">Apr 2026 – Aug 2026 • Centre – Nagavara, Bengaluru</p>
                    <p className="text-[15px] text-text-muted leading-relaxed font-body">
                      Completed industry-oriented Java Full Stack Development training by building web applications using Java, Spring Boot, React.js, HTML, CSS, Bootstrap, JavaScript, MySQL, and implementing RESTful APIs, CRUD operations, Git, and SDLC best practices through hands-on projects.
                    </p>
                  </div>
                </div>
              </SpringReveal>

            </div>
          </div>
        </section>

        {/* 2.6 Stats Section */}
        <section className="max-w-[1250px] mx-auto px-6 py-20 z-10 relative">
          <SpringReveal>
            <div className="bg-white rounded-[28px] p-10 lg:p-20 shadow-sm border border-black/5 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center relative overflow-hidden">
              <div>
                <AnimatedStat target={5} suffix="+" />
                <div className="font-body text-[15px] font-medium uppercase tracking-wide">AI Projects</div>
              </div>
              <div>
                <AnimatedStat target={100} suffix="+" />
                <div className="font-body text-[15px] font-medium uppercase tracking-wide">DSA Solved</div>
              </div>
              <div>
                <AnimatedStat target={20} suffix="+" />
                <div className="font-body text-[15px] font-medium uppercase tracking-wide">Certs</div>
              </div>
              <div>
                <AnimatedStat target={8.12} />
                <div className="font-body text-[15px] font-medium uppercase tracking-wide">CGPA</div>
              </div>
            </div>
          </SpringReveal>
        </section>

        {/* 2.7 Infinite Carousel Showcase */}
        <section className="w-full relative pb-20 pt-10 z-20 overflow-hidden bg-background" id="skills">
          <SpringReveal>
            <InfiniteSliderHorizontal />
          </SpringReveal>
        </section>

        {/* 2.8 Featured Projects Section */}
        <section className="w-full relative z-20 bg-background" id="featured-projects">
          <div className="max-w-[1250px] mx-auto px-6 py-20">
            <SpringReveal>
              <div className="mb-16">
                <p className="font-body text-[14px] md:text-[16px] uppercase tracking-widest text-text-muted mb-4">
                  Selected Work
                </p>
                <h2 className="mb-16 font-display text-[60px] md:text-[80px] font-black uppercase leading-[0.9] tracking-tighter text-text-main">
                  Featured <span className="text-[#5b68df]">Projects</span>
                </h2>
                <p className="font-body text-[18px] md:text-[20px] text-text-muted max-w-[760px]">
                  A curated showcase of AI-driven, full-stack systems built with a focus on scalability, real-time intelligence, and impactful problem-solving.
                </p>
              </div>
            </SpringReveal>
            <CardsParallax items={cardItems} onView={openModal} />

            {/* Project Details Modal */}
            <ProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              project={selectedProject}
            />

            <div className="flex justify-center mt-16">
              <Link to="/projects">
                <InteractiveHoverButton text="View All Projects" className="w-56" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4.5 Certifications Section */}
        <section className="relative z-10 w-full bg-background" id="certifications">
          <SpringReveal>
            <div className="max-w-[1250px] mx-auto px-6 py-20 z-10 relative">
              <h2 className="mb-12 font-display text-[60px] md:text-[80px] font-black uppercase leading-[0.9] tracking-tighter text-text-main">
                Professional <br className="hidden md:block" /> <span className="text-[#5b68df]">Certifications</span>
              </h2>
              <div className="bg-[#05070e] rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.28)] border border-white/10 overflow-hidden">
                <InteractiveSelector />
              </div>
            </div>
          </SpringReveal>
        </section>

        {/* 5. Contact Section */}
        <section className="relative z-10 w-full bg-background" id="contact">
          <SpringReveal>
            <div className="max-w-[1250px] mx-auto px-6 py-20">
              <div className="mb-16">
                <p className="font-body text-[14px] md:text-[16px] uppercase tracking-widest text-text-muted mb-4">
                  Get In Touch
                </p>
                <h2 className="mb-16 font-display text-[60px] md:text-[80px] font-black uppercase leading-[0.9] tracking-tighter text-text-main">
                  Contact <span className="text-[#5b68df]">Me</span>
                </h2>
                <p className="font-body text-[18px] md:text-[20px] text-text-muted max-w-[760px]">
                  Have a project in mind? Feel free to reach out!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[14px] font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 rounded-[12px] border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 rounded-[12px] border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject"
                      required
                      className="w-full px-4 py-3 rounded-[12px] border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 rounded-[12px] border border-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-primary text-white font-medium px-6 py-3 rounded-[12px] hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSending ? "Processing..." : isSent ? "Sended!" : "Send Message"}
                  </button>
                </form>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-[40px] w-[40px] bg-primary/10 rounded-[12px] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] font-bold mb-2">Email</h3>
                      <p className="text-muted">suhasprs331@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-[40px] w-[40px] bg-primary/10 rounded-[12px] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] font-bold mb-2">Phone</h3>
                      <p className="text-muted">+91 7022949724</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-[40px] w-[40px] bg-primary/10 rounded-[12px] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 119 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-[20px] font-bold mb-2">Location</h3>
                      <p className="text-muted">Bengaluru, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpringReveal>
        </section>

        {/* 6. Contact Footer - Replaced with Sticky Footer */}
        <StickyFooter />

      </ScrollExpandMedia>

    </div>
  );
}
