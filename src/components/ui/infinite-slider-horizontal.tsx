import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={`overflow-hidden w-full ${className || ''}`}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

const row1 = [
  { category: "Languages", name: "C", icon: "https://skillicons.dev/icons?i=c" },
  { category: "Languages", name: "C++", icon: "https://skillicons.dev/icons?i=cpp" },
  { category: "Languages", name: "Java", icon: "https://skillicons.dev/icons?i=java" },
  { category: "Languages", name: "Python", icon: "https://skillicons.dev/icons?i=python" },
  { category: "Languages", name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
  { category: "Languages", name: "SQL", icon: "https://skillicons.dev/icons?i=postgres" }
];

const row2 = [
  { category: "Technologies", name: "Git", icon: "https://skillicons.dev/icons?i=git" },
  { category: "Technologies", name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
  { category: "Technologies", name: "ReactJS", icon: "https://skillicons.dev/icons?i=react" },
  { category: "Technologies", name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
  { category: "Technologies", name: "Express.js", icon: "https://skillicons.dev/icons?i=express" },
  { category: "Technologies", name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
  { category: "Technologies", name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" }
];

// Systems & Concepts represented by immersive 3D technology & architectural renders
const row3 = [
  { category: "Systems", name: "Distributed Systems", icon: "https://skillicons.dev/icons?i=kubernetes" },
  { category: "Systems", name: "Operating Systems", icon: "https://skillicons.dev/icons?i=linux" },
  { category: "Systems", name: "Computer Networks", icon: "https://skillicons.dev/icons?i=nginx" },
  { category: "Systems", name: "Object-Oriented", icon: "https://skillicons.dev/icons?i=cs" },
  { category: "Systems", name: "Version Control", icon: "https://skillicons.dev/icons?i=gitlab" }
];

const row4 = [
  { category: "Coursework", name: "Data Structures", icon: "https://skillicons.dev/icons?i=graphql" },
  { category: "Coursework", name: "Database Management", icon: "https://skillicons.dev/icons?i=sqlite" },
  { category: "Coursework", name: "Cloud Computing", icon: "https://skillicons.dev/icons?i=aws" },
  { category: "Coursework", name: "Machine Learning", icon: "https://skillicons.dev/icons?i=tensorflow" },
  { category: "Coursework", name: "NLP", icon: "https://skillicons.dev/icons?i=pytorch" },
  { category: "Coursework", name: "Big Data Analytics", icon: "https://skillicons.dev/icons?i=grafana" }
];

// Helper to render the 3D Icon based cards
const renderCard = (item: {category: string, name: string, icon: string}, index: number, idRaw: string) => (
  <div key={`${idRaw}-${index}`} className="w-[140px] md:w-[180px] flex flex-col justify-center items-center text-center cursor-pointer group">
    {/* Animated Icon Wrapper */}
    <div className="relative transform transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110">
      
      {/* Cinematic Blur Glow on hover */}
      <div className="absolute inset-0 bg-[#5b68df]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* 3D Image */}
      <img 
        src={item.icon} 
        alt={item.name} 
        title={item.name} 
        className="relative z-10 w-16 h-16 md:w-24 md:h-24 object-cover drop-shadow-[0_15px_15px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_25px_30px_rgba(91,104,223,0.4)] transition-all duration-500 mb-5" 
      />
    </div>
    
    {/* Title Animation */}
    <span className="font-body font-bold text-text-main text-[14px] md:text-[17px] leading-snug tracking-normal transition-all duration-300 group-hover:text-[#5b68df] group-hover:tracking-wide">
      {item.name}
    </span>
  </div>
);

export function InfiniteSliderHorizontal() {
  return (
    <div className="py-20 flex flex-col justify-center gap-12 md:gap-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-6 mb-8">
        <h2 className="font-display text-[50px] md:text-[80px] font-black uppercase leading-[1.1] md:leading-[0.9] tracking-tighter text-text-main text-center">
            Technical Skills <br className="hidden md:block" /> <span className="text-[#5b68df]">& Coursework</span>
        </h2>
      </div>

      {/* Row 1: Languages */}
      <div className="flex items-center mx-auto w-full max-w-[2500px]">
        <InfiniteSlider direction="horizontal" gap={20} duration={35} className="py-8">
          {row1.map((item, i) => renderCard(item, i, "row1"))}
        </InfiniteSlider>
      </div>

      {/* Row 2: Technologies */}
      <div className="flex items-center mx-auto w-full max-w-[2500px]">
        <InfiniteSlider direction="horizontal" reverse gap={20} duration={40} className="py-8">
          {row2.map((item, i) => renderCard(item, i, "row2"))}
        </InfiniteSlider>
      </div>

      {/* Row 3: Systems */}
      <div className="flex items-center mx-auto w-full max-w-[2500px]">
        <InfiniteSlider direction="horizontal" gap={20} duration={45} className="py-8">
          {row3.map((item, i) => renderCard(item, i, "row3"))}
        </InfiniteSlider>
      </div>

      {/* Row 4: Coursework */}
      <div className="flex items-center mx-auto w-full max-w-[2500px]">
        <InfiniteSlider direction="horizontal" reverse gap={20} duration={50} className="py-8">
          {row4.map((item, i) => renderCard(item, i, "row4"))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
