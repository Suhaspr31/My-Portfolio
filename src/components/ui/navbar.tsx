'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, User, Zap, Briefcase, Mail } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from './dock';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [navVisible, setNavVisible] = useState(true);
  const { scrollY: currentScrollY } = useScroll();
  
  const [logoCharIndex, setLogoCharIndex] = useState(0);
  const logoChars = ['S', 'P', 'R'];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoCharIndex((prev) => (prev + 1) % logoChars.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useScroll().scrollY.on("change", (current) => {
    const prev = currentScrollY.getPrevious();
    if (current > (prev ?? 0) && current > 150) setNavVisible(false);
    else setNavVisible(true);
  });

  const navItems = [
    { title: 'Home', icon: <Home className='w-full h-full' />, href: '/#home' },
    { title: 'About', icon: <User className='w-full h-full' />, href: '/#about' },
    { title: 'Skills', icon: <Zap className='w-full h-full' />, href: '/#skills' },
    { title: 'Projects', icon: <Briefcase className='w-full h-full' />, href: '/#featured-projects' },
    { title: 'Contact', icon: <Mail className='w-full h-full' />, href: '/#contact' },
  ];

  return (
    <motion.nav
      animate={{ y: navVisible ? 0 : "-150%", opacity: navVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed top-4 md:top-8 w-full flex justify-center z-50 px-4 pointer-events-none"
    >
      <div className="bg-white/85 backdrop-blur-xl p-2 px-4 rounded-[99px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5 flex items-center gap-4 pointer-events-auto hover:bg-white/95 transition-all duration-500">
        <Link to="/" className="w-10 h-10 bg-[#2a2a2a] rounded-full flex items-center justify-center shrink-0 border border-black/5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span 
              key={logoChars[logoCharIndex]}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-white font-display text-lg font-bold"
            >
              {logoChars[logoCharIndex]}
            </motion.span>
          </AnimatePresence>
        </Link>

        <div className="flex items-center">
            <Dock className="p-0 border-none bg-transparent gap-6 md:gap-4" panelHeight={44} magnification={54} distance={120}>
                {navItems.map((item, idx) => (
                    <a key={idx} href={item.href} className="group flex items-center justify-center">
                        <DockItem className="aspect-square rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                            <DockLabel className="bg-[#2a2a2a] text-white py-1 px-3 border-none shadow-xl">{item.title}</DockLabel>
                            <DockIcon className="p-2 text-black/80">
                                {item.icon}
                            </DockIcon>
                        </DockItem>
                    </a>
                ))}
            </Dock>
        </div>
      </div>
    </motion.nav>
  );
}
