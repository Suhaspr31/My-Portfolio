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
  { category: "Languages", name: "Java", icon: "https://skillicons.dev/icons?i=java" },
  { category: "Languages", name: "SQL", icon: "https://skillicons.dev/icons?i=mysql" },
  { category: "Languages", name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
  { category: "Languages", name: "Python", icon: "https://skillicons.dev/icons?i=python" },
  { category: "Languages", name: "C", icon: "https://skillicons.dev/icons?i=c" },
  { category: "Languages", name: "Kotlin", icon: "https://skillicons.dev/icons?i=kotlin" }
];

const row2 = [
  { category: "Frontend & Backend", name: "React.js", icon: "https://skillicons.dev/icons?i=react" },
  { category: "Frontend & Backend", name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
  { category: "Frontend & Backend", name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
  { category: "Frontend & Backend", name: "Bootstrap", icon: "https://skillicons.dev/icons?i=bootstrap" },
  { category: "Frontend & Backend", name: "Spring Boot", icon: "https://skillicons.dev/icons?i=spring" },
  { category: "Frontend & Backend", name: "Spring MVC", icon: "https://skillicons.dev/icons?i=spring" },
  { category: "Frontend & Backend", name: "Spring Security", icon: "https://skillicons.dev/icons?i=spring" },
  { category: "Frontend & Backend", name: "Hibernate", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%23292524"/><path d="M40 32 L40 96 M88 32 L88 96 M40 64 L88 64" stroke="url(%23hibGrad)" stroke-width="12" stroke-linecap="round"/><circle cx="64" cy="64" r="10" fill="%23b91c1c"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="%23f97316" text-anchor="middle">HIBERNATE</text><defs><linearGradient id="hibGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23b91c1c"/></linearGradient></defs></svg>` },
  { category: "Frontend & Backend", name: "REST APIs", icon: "https://skillicons.dev/icons?i=postman" },
  { category: "Frontend & Backend", name: "JWT", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%23000000"/><path d="M64 20 L100 36 L100 68 C100 90 64 108 64 108 C64 108 28 90 28 68 L28 36 Z" fill="url(%23jwtGrad)" stroke="%23fb015b" stroke-width="3"/><text x="64" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="%23ffffff" text-anchor="middle">JWT</text><defs><linearGradient id="jwtGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23d63384"/><stop offset="50%" stop-color="%23fb015b"/><stop offset="100%" stop-color="%2300b4d8"/></linearGradient></defs></svg>` }
];

const row3 = [
  { category: "Database & Tools", name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
  { category: "Database & Tools", name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
  { category: "Database & Tools", name: "Git", icon: "https://skillicons.dev/icons?i=git" },
  { category: "Database & Tools", name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
  { category: "Database & Tools", name: "Maven", icon: "https://skillicons.dev/icons?i=maven" },
  { category: "Database & Tools", name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
  { category: "Database & Tools", name: "VS Code", icon: "https://skillicons.dev/icons?i=vscode" },
  { category: "Database & Tools", name: "IntelliJ IDEA", icon: "https://skillicons.dev/icons?i=idea" },
  { category: "Database & Tools", name: "Android Studio", icon: "https://skillicons.dev/icons?i=androidstudio" }
];

const row4 = [
  { category: "Concepts & AI", name: "OOP", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%231e1e2e"/><rect x="28" y="28" width="34" height="34" rx="8" fill="url(%23oop1)" stroke="%2389b4fa" stroke-width="2"/><rect x="66" y="66" width="34" height="34" rx="8" fill="url(%23oop2)" stroke="%23cba6f7" stroke-width="2"/><path d="M45 62 L45 83 L66 83" fill="none" stroke="%2389b4fa" stroke-width="3" stroke-dasharray="4,4"/><circle cx="45" cy="45" r="6" fill="%23ffffff"/><circle cx="83" cy="83" r="6" fill="%23ffffff"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="%23cba6f7" text-anchor="middle">OOP</text><defs><linearGradient id="oop1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23313244"/><stop offset="100%" stop-color="%2345475a"/></linearGradient><linearGradient id="oop2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23b4befe"/><stop offset="100%" stop-color="%2389b4fa"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "Collections", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%230f172a"/><rect x="26" y="30" width="76" height="20" rx="6" fill="url(%23col1)" stroke="%2338bdf8" stroke-width="2"/><rect x="26" y="54" width="76" height="20" rx="6" fill="url(%23col2)" stroke="%23818cf8" stroke-width="2"/><rect x="26" y="78" width="76" height="20" rx="6" fill="url(%23col3)" stroke="%23c084fc" stroke-width="2"/><circle cx="38" cy="40" r="4" fill="%23ffffff"/><circle cx="38" cy="64" r="4" fill="%23ffffff"/><circle cx="38" cy="88" r="4" fill="%23ffffff"/><line x1="50" y1="40" x2="90" y2="40" stroke="%23ffffff" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="64" x2="85" y2="64" stroke="%23ffffff" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="88" x2="92" y2="88" stroke="%23ffffff" stroke-width="3" stroke-linecap="round"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="%2338bdf8" text-anchor="middle">COLLECTIONS</text><defs><linearGradient id="col1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%2338bdf8"/></linearGradient><linearGradient id="col2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%234f46e5"/><stop offset="100%" stop-color="%23818cf8"/></linearGradient><linearGradient id="col3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%239333ea"/><stop offset="100%" stop-color="%23c084fc"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "Exception Handling", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%231c1917"/><path d="M64 22 L96 38 L96 68 C96 90 64 104 64 104 C64 104 32 90 32 68 L32 38 Z" fill="url(%23excGrad)" stroke="%23f97316" stroke-width="3"/><path d="M64 42 L64 68 M64 78 L64 82" stroke="%23ffffff" stroke-width="5" stroke-linecap="round"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="%23fb923c" text-anchor="middle">TRY / CATCH</text><defs><linearGradient id="excGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23f97316"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "Multithreading", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%2309090b"/><path d="M30 35 C50 35, 50 65, 70 65 C90 65, 90 95, 105 95" fill="none" stroke="%2306b6d4" stroke-width="5" stroke-linecap="round"/><path d="M30 65 C50 65, 50 35, 70 35 C90 35, 90 65, 105 65" fill="none" stroke="%233b82f6" stroke-width="5" stroke-linecap="round"/><path d="M30 95 C50 95, 50 95, 70 95 C90 95, 90 35, 105 35" fill="none" stroke="%238b5cf6" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="35" r="6" fill="%2306b6d4"/><circle cx="30" cy="65" r="6" fill="%233b82f6"/><circle cx="30" cy="95" r="6" fill="%238b5cf6"/><circle cx="105" cy="95" r="6" fill="%2306b6d4"/><circle cx="105" cy="65" r="6" fill="%233b82f6"/><circle cx="105" cy="35" r="6" fill="%238b5cf6"/><text x="64" y="118" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="%2338bdf8" text-anchor="middle">THREADS</text></svg>` },
  { category: "Concepts & AI", name: "DSA", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%23111827"/><line x1="64" y1="28" x2="38" y2="58" stroke="%236366f1" stroke-width="3"/><line x1="64" y1="28" x2="90" y2="58" stroke="%236366f1" stroke-width="3"/><line x1="38" y1="58" x2="24" y2="88" stroke="%236366f1" stroke-width="3"/><line x1="38" y1="58" x2="52" y2="88" stroke="%236366f1" stroke-width="3"/><line x1="90" y1="58" x2="76" y2="88" stroke="%236366f1" stroke-width="3"/><line x1="90" y1="58" x2="104" y2="88" stroke="%236366f1" stroke-width="3"/><circle cx="64" cy="28" r="10" fill="url(%23dsaRoot)" stroke="%23818cf8" stroke-width="2"/><circle cx="38" cy="58" r="9" fill="url(%23dsaNode)" stroke="%23a5b4fc" stroke-width="2"/><circle cx="90" cy="58" r="9" fill="url(%23dsaNode)" stroke="%23a5b4fc" stroke-width="2"/><circle cx="24" cy="88" r="7" fill="%234f46e5"/><circle cx="52" cy="88" r="7" fill="%234f46e5"/><circle cx="76" cy="88" r="7" fill="%234f46e5"/><circle cx="104" cy="88" r="7" fill="%234f46e5"/><text x="64" y="118" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="%23818cf8" text-anchor="middle">DSA</text><defs><linearGradient id="dsaRoot" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%234f46e5"/><stop offset="100%" stop-color="%23818cf8"/></linearGradient><linearGradient id="dsaNode" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23312e81"/><stop offset="100%" stop-color="%234338ca"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "DBMS", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%23022c22"/><g fill="url(%23dbGrad)" stroke="%2334d399" stroke-width="2.5"><path d="M30 30 C30 22, 98 22, 98 30 L98 48 C98 56, 30 56, 30 48 Z"/><path d="M30 52 C30 44, 98 44, 98 52 L98 70 C98 78, 30 78, 30 70 Z"/><path d="M30 74 C30 66, 98 66, 98 74 L98 92 C98 100, 30 100, 30 92 Z"/></g><ellipse cx="64" cy="30" rx="34" ry="8" fill="%236ee7b7"/><text x="64" y="118" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="%2334d399" text-anchor="middle">DBMS</text><defs><linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23047857"/><stop offset="100%" stop-color="%23059669"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "MVC", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%2318181b"/><polygon points="64,25 25,85 103,85" fill="none" stroke="%23f43f5e" stroke-width="3" stroke-dasharray="5,5"/><circle cx="64" cy="25" r="16" fill="%23f43f5e"/><circle cx="25" cy="85" r="16" fill="%2306b6d4"/><circle cx="103" cy="85" r="16" fill="%2310b981"/><text x="64" y="29" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="%23ffffff" text-anchor="middle">C</text><text x="25" y="89" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="%23ffffff" text-anchor="middle">M</text><text x="103" y="89" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="%23ffffff" text-anchor="middle">V</text><text x="64" y="118" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="%23f43f5e" text-anchor="middle">MVC</text></svg>` },
  { category: "Concepts & AI", name: "REST Architecture", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%230f172a"/><path d="M38 52 A18 18 0 0 1 70 42 A22 22 0 0 1 96 64 A16 16 0 0 1 90 92 L38 92 A16 16 0 0 1 38 52 Z" fill="url(%23restGrad)" stroke="%2338bdf8" stroke-width="2"/><text x="64" y="73" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="%23ffffff" text-anchor="middle">REST</text><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="%2338bdf8" text-anchor="middle">ARCHITECTURE</text><defs><linearGradient id="restGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%230369a1"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "SOLID Principles", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%231a0c2e"/><g fill="url(%23solidGrad)" stroke="%23e879f9" stroke-width="1.5"><rect x="22" y="32" width="12" height="54" rx="3"/><rect x="40" y="32" width="12" height="54" rx="3"/><rect x="58" y="32" width="12" height="54" rx="3"/><rect x="76" y="32" width="12" height="54" rx="3"/><rect x="94" y="32" width="12" height="54" rx="3"/></g><rect x="18" y="24" width="92" height="8" rx="2" fill="%23f472b6"/><rect x="18" y="86" width="92" height="8" rx="2" fill="%23f472b6"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="13" fill="%23f472b6" text-anchor="middle">S.O.L.I.D</text><defs><linearGradient id="solidGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23c084fc"/><stop offset="100%" stop-color="%23a855f7"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "Generative AI", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%23030712"/><path d="M64 24 L72 48 L96 56 L72 64 L64 88 L56 64 L32 56 L56 48 Z" fill="url(%23genAiGrad)" stroke="%23a855f7" stroke-width="2"/><path d="M92 24 L96 36 L108 40 L96 44 L92 56 L88 44 L76 40 L88 36 Z" fill="%2338bdf8"/><path d="M36 72 L39 81 L48 84 L39 87 L36 96 L33 87 L24 84 L33 81 Z" fill="%23f472b6"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="%23c084fc" text-anchor="middle">GEN AI</text><defs><linearGradient id="genAiGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23c084fc"/><stop offset="50%" stop-color="%23818cf8"/><stop offset="100%" stop-color="%2338bdf8"/></linearGradient></defs></svg>` },
  { category: "Concepts & AI", name: "Prompt Engineering", icon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="%231e1b4b"/><rect x="22" y="26" width="84" height="64" rx="8" fill="%230f172a" stroke="%236366f1" stroke-width="2"/><text x="32" y="52" font-family="Courier, monospace" font-weight="bold" font-size="20" fill="%2322c55e">&gt;_</text><text x="56" y="52" font-family="Courier, monospace" font-weight="bold" font-size="14" fill="%23818cf8">PROMPT|</text><path d="M84 56 L88 68 L100 72 L88 76 L84 88 L80 76 L68 72 L80 68 Z" fill="%23facc15"/><text x="64" y="116" font-family="Arial, sans-serif" font-weight="bold" font-size="11" fill="%23818cf8" text-anchor="middle">PROMPT ENG.</text></svg>` }
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
