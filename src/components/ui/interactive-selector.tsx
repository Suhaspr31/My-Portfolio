import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaPython, FaRobot, FaBrain, FaCode, FaNetworkWired } from 'react-icons/fa';

const EASE = [0.16, 1, 0.3, 1] as const;

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const options = [
    {
      title: "IBM - Python for Data Science",
      description: "Master Python for data science and analytics",
      image: "/img/IBM PY0101EN Certificate _ Cognitive Class.jpg",
      icon: <FaPython size={24} className="text-white" />
    },
    {
      title: "Tata - GenAI Powered Data Analytics Job Simulation",
      description: "Learn GenAI techniques for data analytics",
      image: "/img/Genai powered data analytics.jpg",
      icon: <FaBrain size={24} className="text-white" />
    },
    {
      title: "Infosys - Artificial Intelligence Foundation Certification",
      description: "Foundation in AI concepts and applications",
      image: "/img/AI Foundation.jpg",
      icon: <FaRobot size={24} className="text-white" />
    },
    {
      title: "OCTANET SERVICES PVT LTD - Python Development Internship",
      description: "Develop Python skills for real-world applications",
      image: "/img/Octanet internship.jpg",
      icon: <FaCode size={24} className="text-white" />
    },
    {
      title: "System Tron - Machine Learning Internship",
      description: "Gain expertise in machine learning algorithms",
      image: "/img/System Tron.png",
      icon: <FaNetworkWired size={24} className="text-white" />
    }
  ];

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center py-10 bg-transparent font-display text-white overflow-hidden"> 
      
      {/* Options Container - Responsive Accordion */}
      <div className="flex flex-col md:flex-row w-full max-w-[1150px] min-h-[500px] md:h-[550px] gap-3 items-stretch relative px-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { 
                opacity: 1, 
                x: 0,
                flex: activeIndex === index ? 8 : 1,
                minWidth: '70px',
                minHeight: activeIndex === index ? '350px' : '70px'
            } : {}}
            transition={{ 
                duration: 0.8, 
                ease: EASE,
                delay: index * 0.08,
                flex: { duration: 0.7, ease: EASE }
            }}
            className={`
              relative flex flex-col justify-end overflow-hidden cursor-pointer rounded-[32px] group border border-white/10 shadow-2xl transition-all duration-500
            `}
            onClick={() => setActiveIndex(index)}
          >
            {/* Background Image Layer */}
            <motion.div
              layout
              className="absolute inset-0 z-0 transition-all duration-700 ease-in-out"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: activeIndex === index ? 'brightness(0.7) contrast(1.4)' : 'brightness(0.4) grayscale(0.5)',
              }}
            />

            {/* Selection Indicator */}
            {activeIndex === index && (
                <motion.div 
                    layoutId="active-indicator"
                    className="absolute inset-x-0 bottom-0 h-1.5 bg-accent z-40"
                    transition={{ duration: 0.7, ease: EASE }}
                />
            )}

            {/* Content Container - Stable Vertical Alignment */}
            <div className={`relative z-20 w-full h-full flex flex-col transition-all duration-500 ease-in-out pointer-events-none pb-8 
                ${activeIndex === index ? 'justify-end items-start px-6 md:px-10' : 'justify-center items-center px-0'}`}>
                
                <div className="flex items-center gap-6">
                    {/* The Icon stays centered in the narrow card, and left-aligned in the wide card */}
                    <motion.div 
                        layout
                        className="w-12 h-12 md:w-14 md:h-14 rounded-[20px] bg-black/60 backdrop-blur-2xl border border-white/20 flex items-center justify-center shrink-0 shadow-2xl group-hover:bg-black/80 transition-colors"
                    >
                        {option.icon}
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                        {activeIndex === index && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="overflow-hidden"
                            >
                                <h3 className="font-bold text-2xl md:text-4xl leading-tight whitespace-nowrap tracking-tight">
                                    {option.title}
                                </h3>
                                <p className="text-white/80 text-base md:text-xl font-medium line-clamp-1 mt-1">
                                    {option.description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
