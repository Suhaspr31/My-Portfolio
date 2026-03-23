'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis'
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import Navbar from "@/components/ui/navbar";
import { motion, AnimatePresence } from 'framer-motion';
import { LazyImage } from "@/components/ui/lazy-image";
import { ProjectModal } from "@/components/ui/project-modal";
import StickyFooter from "@/components/ui/footer";

export default function Projects() {
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const lenisRef = React.useRef(null);

    React.useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;

        document.documentElement.classList.add('lenis');

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis');
        }
    }, [])

    React.useEffect(() => {
        if (isModalOpen) {
            lenisRef.current?.stop();
        } else {
            lenisRef.current?.start();
        }
    }, [isModalOpen]);

    const images = [
        {
            src: '/img/AgroUnify.png',
            alt: 'AgroUnify',
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
            liveUrl: "" // Add deployed link if available
        },
        {
            src: '/img/Facial Recognition.png',
            alt: 'Face Recognition Attendance System',
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
            liveUrl: "http://localhost:5000/"
        },
        {
            src: '/img/Sentiment Analysis.png',
            alt: 'Sentiment Watchdog',
            tags: ['AI', 'Dashboard', 'NLP'],
            overview: "AI-Powered Sentiment Monitoring Dashboard\n\nThis project is an AI-powered sentiment analysis dashboard designed to monitor and visualize real-time customer emotions from textual data. It enables support teams to input customer messages and instantly receive emotion predictions such as joy, anger, sadness, and more.",
            details: "The system integrates a FastAPI backend with a Streamlit-based frontend to deliver a seamless analytics experience. It processes incoming data using a pre-trained NLP model and stores results in a structured database for further insights.\n\nThe dashboard provides rich visualizations including emotion distribution charts, word clouds, and time-based heatmaps, allowing users to analyze sentiment trends and patterns effectively.",
            performance: "Real-time NLP Classification",
            performanceDetail: "Low-latency API responses for large message streams.",
            responsive: "Interactive Dashboard",
            responsiveDetail: "Built with Streamlit for quick and intuitive desktop analytics.",
            stack: [
                "Python", "Streamlit", "FastAPI", "SQLite (SQLAlchemy)",
                "HuggingFace Transformers", "Plotly", "Matplotlib", "Seaborn", "WordCloud"
            ],
            githubUrl: "https://github.com/Suhaspr31/Sentiment-Watchdog-Project.git",
            liveUrl: "" // Runs locally via Streamlit
        },
        {
            src: '/img/Movie Recommendation.png',
            alt: 'Movie Recommendation System',
            tags: ['Full Stack', 'AI', 'ML Engine'],
            overview: "AI-Powered Personalized Movie Recommendation Platform\n\nThis project is a full-stack movie recommendation system designed to deliver highly personalized suggestions using collaborative filtering techniques. It leverages ALS (Alternating Least Squares) factorization to analyze user preferences and generate accurate recommendations based on rating history.",
            details: "The system dynamically builds a virtual user profile by analyzing movies rated highly by the user (≥ 3.5 stars) and computing a feature vector in latent factor space. This enables real-time personalization, where recommendations continuously evolve as users interact with the platform.\n\nBuilt with a scalable microservices architecture, the platform integrates a React-based frontend, a Node.js backend API, and a Python-based ML engine. It ensures efficient data processing, secure authentication, and seamless movie discovery.",
            performance: "High-performance ALS model",
            performanceDetail: "Real-time personalization with dynamic user vector computation.",
            responsive: "Modern Search UI",
            responsiveDetail: "Interactive dashboards and responsive movie discovery grid.",
            stack: [
                "React", "React Router", "Node.js / Express", "MongoDB Atlas",
                "Mongoose", "JWT", "Python (Flask)", "Pandas", "NumPy",
                "Scikit-learn", "Apache Spark (ALS)"
            ],
            githubUrl: "https://github.com/Suhaspr31/Movie-Recommendation-System.git",
            liveUrl: "" // Add deployed link if available
        },
        {
            src: '/img/Virtual Lab.png',
            alt: 'Virtual Lab – Transformer Simulation',
            tags: ['Simulation', 'Education', 'JS'],
            overview: "Interactive Single-Phase Transformer Testing Simulator\n\nThis project is a comprehensive virtual laboratory simulation designed to replicate real-world transformer testing experiments in a fully interactive digital environment. It enables users to perform Open Circuit, Short Circuit, and Sumpner’s tests without the need for physical infrastructure.",
            details: "The system allows users to build circuits by connecting components, validate configurations, and observe real-time instrument readings. It also performs automatic calculations of transformer parameters such as core loss resistance and efficiency.\n\nBuilt using pure web technologies, the application emphasizes educational clarity and real-time feedback, making it ideal for engineering students to understand complex electrical concepts through simulation.",
            performance: "Real-time updates",
            performanceDetail: "Instant meter updates and calculations with SVG-based rendering.",
            responsive: "Desktop Optimized",
            responsiveDetail: "Tailored for lab-style interaction and circuit visualization.",
            stack: [
                "HTML5", "CSS3", "JavaScript (ES6+)", "SVG (Circuit Rendering)", "Vanilla JS"
            ],
            githubUrl: "https://github.com/Suhaspr31/Virtual-Lab-EEE.git",
            liveUrl: "" // Static hosting
        },
        {
            src: '/img/AlgoVision.png',
            alt: 'AlgoVision',
            tags: ['Algorithm', 'React', 'Visualizer'],
            overview: "Interactive Algorithm Visualizer for Engineering Students\n\nThis project is an interactive algorithm visualization platform designed to help engineering students understand complex algorithms through step-by-step animated execution. It supports a wide range of sorting, searching, and graph algorithms.",
            details: "The system is built using a unique Trace/Snapshot architecture, where algorithms generate a complete sequence of execution states upfront. These states are then played back like a video, enabling precise control over playback, including pause, rewind, and speed adjustment.\n\nDesigned with a modern UI and smooth animations, AlgoVision enhances learning by combining pseudocode highlighting and real-time explanations.",
            performance: "Trace-based execution",
            performanceDetail: "Precomputed states for smooth and lag-free animations.",
            responsive: "Dark/Light Support",
            responsiveDetail: "Modern responsive UI with interactive controls for real-time exploration.",
            stack: [
                "React (Vite)", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "Lucide React"
            ],
            githubUrl: "https://github.com/Suhaspr31/AlgoVision.git",
            liveUrl: "http://localhost:5173"
        },
        {
            src: '/img/AI Virtual Mouse.png',
            alt: 'AI Virtual Mouse',
            tags: ['Python', 'Computer Vision', 'AI'],
            overview: "Gesture-Controlled Virtual Mouse using Computer Vision\n\nThis project is an AI-powered virtual mouse system that enables users to control their computer cursor using hand gestures captured through a webcam. It leverages real-time computer vision and hand tracking.",
            details: "The system uses MediaPipe’s hand landmark detection to track finger positions and interpret gestures such as cursor movement, clicking, and scrolling. By mapping hand coordinates to screen space, it provides a smooth and intuitive alternative to traditional input devices.\n\nDesigned for real-time interaction, the application ensures responsive control with minimal latency across Windows, Linux, and macOS.",
            performance: "Low-latency tracking",
            performanceDetail: "Real-time hand tracking with optimized coordinate mapping.",
            responsive: "Lightweight Script",
            responsiveDetail: "Optimized for real-time webcam interaction on any OS.",
            stack: [
                "Python", "OpenCV", "MediaPipe", "NumPy", "PyAutoGUI"
            ],
            githubUrl: "https://github.com/Suhaspr31/AiVirtualMouse.git",
            liveUrl: "" // Runs locally
        },
    ];

    return (
        <div className="bg-background text-text-main">
            <Navbar />

            <motion.main 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-screen w-full relative"
            >
                {/* Hero Header */}
                <div className="relative flex h-[60vh] flex-col items-center justify-center p-6 text-center">
                    {/* Radial spotlight effect */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className={cn(
                            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                            'bg-[radial-gradient(ellipse_at_center,var(--foreground,rgba(0,0,0,0.1)),transparent_60%)]',
                            'blur-[40px]',
                        )}
                    />

                    <div className="overflow-hidden">
                        <motion.h1 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter mb-4"
                        >
                            All <span className="text-[#5b68df]">Projects</span>
                        </motion.h1>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-body text-[18px] md:text-[24px] text-text-muted max-w-[800px] mx-auto mt-6"
                    >
                        Explore my complete portfolio of work, from intelligent backend systems to cinematic frontend experiences.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="font-body text-[14px] uppercase tracking-widest text-[#5b68df] mt-12 animate-pulse"
                    >
                        Scroll to Explore
                    </motion.div>
                </div>

                <ZoomParallax images={images} />

                {/* Detailed Projects List Content */}
                <section className="relative z-10 w-full bg-background">
                    <div className="max-w-[1250px] mx-auto px-6 py-32">
                        <div className="mb-20">
                            <h2 className="text-[10vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter mb-8">
                                Detailed <span className="text-[#5b68df]">Index</span>
                            </h2>
                            <div className="h-[1px] w-full bg-border" />
                        </div>

                        <div className="flex flex-col gap-16">
                            {images.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{
                                        type: "spring",
                                        damping: 25,
                                        stiffness: 100,
                                        delay: idx * 0.05 // Subtle stagger for groups
                                    }}
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setIsModalOpen(true);
                                    }}
                                    className="group flex flex-col md:flex-row gap-8 items-start md:items-center py-8 border-b border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                                >
                                    <div className="font-display text-[40px] md:text-[60px] font-bold text-muted-foreground/20 group-hover:text-primary/10 transition-colors tabular-nums">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </div>

                                    <div className="relative w-full md:w-[350px] overflow-hidden rounded-lg shadow-sm border border-border/10">
                                        <LazyImage
                                            src={project.src}
                                            alt={project.alt}
                                            ratio={16 / 9}
                                            className="group-hover:scale-105 transition-transform duration-700"
                                            inView={true}
                                        />
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-[12px] uppercase tracking-widest px-3 py-1 bg-muted rounded-full">Web App</span>
                                            <span className="text-[12px] uppercase tracking-widest px-3 py-1 bg-muted rounded-full">React</span>
                                        </div>
                                        <h3 className="text-[32px] md:text-[48px] font-bold uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform">
                                            {project.alt?.split(' ').slice(0, 2).join(' ') || "Featured Project"}
                                        </h3>
                                        <p className="text-text-muted text-[16px] md:text-[18px] max-w-[500px]">
                                            A sophisticated digital solution focused on user experience and technical excellence.
                                        </p>
                                    </div>

                                    <div className="hidden lg:flex w-24 h-24 rounded-full border border-border items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:rotate-[45deg] transition-all duration-500">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:text-white transition-colors">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="h-[20vh]" />

                {/* Footer Revealing Effect */}
                <StickyFooter />
            </motion.main>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
            />
        </div>
    );
}
