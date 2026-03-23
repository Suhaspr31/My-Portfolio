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

      {/* Options Container */}
      <div className="flex flex-col md:flex-row w-full max-w-[1100px] h-[600px] md:h-[500px] gap-3 md:gap-2 items-stretch overflow-hidden relative px-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? {
              opacity: 1,
              x: 0,
              flex: activeIndex === index ? 10 : 1
            } : {}}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: index * 0.1,
              flex: { duration: 0.6, ease: EASE }
            }}
            className={`
              relative flex flex-col justify-end overflow-hidden cursor-pointer rounded-[24px] group border border-white/5 min-h-[60px] md:min-h-0
            `}
            onClick={() => setActiveIndex(index)}
          >
            {/* Background Container */}
            <motion.div
              layout
              className="absolute inset-0 transition-all duration-700 ease-in-out"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: activeIndex === index ? 'brightness(0.7) contrast(1.5)' : 'brightness(0.5) grayscale(0.2) contrast(1)',
              }}
            />

            {/* Content Overlay - Optimized Mobile Positioning */}
            <div className={`relative z-20 w-full h-full flex flex-col ${activeIndex === index ? 'justify-end p-6 md:p-10' : 'justify-start md:justify-center p-3 md:p-6'} transition-all duration-500`}>
              <div className={`flex items-center ${activeIndex === index ? 'gap-4' : 'justify-start md:items-center md:gap-4'} w-full`}>
                <motion.div
                  layout
                  className={`flex items-center justify-center shrink-0 shadow-lg group-hover:bg-white/25 transition-colors ${
                    activeIndex === index 
                      ? 'w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20' 
                      : 'w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white/20 md:bg-white/15 backdrop-blur-lg border border-white/10'
                  }`}
                >
                  {option.icon}
                </motion.div>

                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="ml-4 overflow-hidden"
                    >
                      <h3 className="font-bold text-lg md:text-2xl leading-tight whitespace-nowrap">
                        {option.title}
                      </h3>
                      <p className="text-white/70 text-xs md:text-base line-clamp-1">
                        {option.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Active Highlight */}
            {activeIndex === index && (
              <motion.div
                layoutId="active-glow"
                className="absolute inset-x-0 bottom-0 h-1 bg-accent z-30"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
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
