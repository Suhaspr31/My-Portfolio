'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: React.ReactNode;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const touchStartYRef = useRef<number>(0);
  const mediaFullyExpandedRef = useRef<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mediaFullyExpandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      const isExpanded = mediaFullyExpandedRef.current;
      const scrollY = window.scrollY;
      
      if (isExpanded && e.deltaY < 0 && scrollY <= 5) {
        e.preventDefault();
        setMediaFullyExpanded(false);
        setScrollProgress(0.99);
        setShowContent(false);
      } else if (!isExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.0009;
        setScrollProgress((prev) => {
          const next = Math.min(Math.max(prev + delta, 0), 1);
          if (next >= 1) {
            setMediaFullyExpanded(true);
            setShowContent(true);
          } else if (next < 0.75) {
            setShowContent(false);
          }
          return next;
        });
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      const isExpanded = mediaFullyExpandedRef.current;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      const scrollY = window.scrollY;

      if (isExpanded && deltaY < -20 && scrollY <= 5) {
        e.preventDefault();
        setMediaFullyExpanded(false);
        setScrollProgress(0.99);
        setShowContent(false);
      } else if (!isExpanded) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const delta = deltaY * factor;
        setScrollProgress((prev) => {
          const next = Math.min(Math.max(prev + delta, 0), 1);
          if (next >= 1) {
            setMediaFullyExpanded(true);
            setShowContent(true);
          } else if (next < 0.75) {
            setShowContent(false);
          }
          return next;
        });
        touchStartYRef.current = touchY;
      }
    };

    const handleScroll = () => {
      if (!mediaFullyExpandedRef.current && window.scrollY > 50) {
        window.scrollTo(0, 0);
      }
    };

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#home') {
        mediaFullyExpandedRef.current = false;
        setMediaFullyExpanded(false);
        setScrollProgress(0);
        setShowContent(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash && hash !== '#home' && hash !== '') {
        // Immediately unlock scrolling for hash links
        mediaFullyExpandedRef.current = true;
        setMediaFullyExpanded(true);
        setScrollProgress(1);
        setShowContent(true);
      }
    };

    if (window.location.hash) handleHashNavigation();

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashNavigation);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 350 + scrollProgress * (isMobileState ? 250 : 450);
  const textTranslateX = scrollProgress * (isMobileState ? 120 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out'
      id="home"
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
           <motion.div
             className='absolute inset-0 z-0 h-full'
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 - scrollProgress }}
             transition={{ duration: 0.1 }}
           >
             <div
               className='absolute inset-0'
               style={{
                 backgroundImage: `url(${bgImageSrc})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}
             />
             <div className='absolute inset-0 bg-black/60 z-10' />
           </motion.div>

          <div className='flex flex-col items-center justify-start relative z-10 w-full'>
            {/* The expanding video container */}
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-[32px] overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '90vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.4)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none bg-[#111]'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl object-cover'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }}></div>
                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none bg-[#111]'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }}></div>
                      <motion.div
                        className='absolute inset-0 bg-black/30'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center absolute top-10 w-full z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='text-lg md:text-2xl text-blue-200/80 font-display uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                </div>
                
                <div className='flex flex-col items-center text-center absolute bottom-10 w-full z-10 mb-4 transition-none'>
                  {scrollToExpand && (
                    <p
                      className='text-white/60 font-body tracking-[0.3em] text-sm uppercase font-bold text-center'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* The Text titles pulling apart */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col pointer-events-none ${
                  textBlend ? 'mix-blend-overlay' : 'mix-blend-normal'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                  <motion.h2
                    className='text-[50px] sm:text-[70px] md:text-[100px] lg:text-[140px] tracking-tighter uppercase font-black font-display leading-[0.8] text-white transition-none'
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {firstWord}
                  </motion.h2>
                  <motion.h2
                    className='text-[50px] sm:text-[70px] md:text-[100px] lg:text-[140px] tracking-tighter uppercase font-black font-display leading-[0.8] text-white transition-none'
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {restOfTitle}
                  </motion.h2>
                </div>
              </div>
            </div>

            {/* Content Revealed when completely expanded */}
            <motion.section
              className='flex flex-col w-full bg-background'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
