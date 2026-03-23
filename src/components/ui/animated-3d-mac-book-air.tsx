import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, animate, AnimationPlaybackControls } from 'framer-motion';

const Macbook: React.FC = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Core rotation values
  const rotateX = useMotionValue(-20);
  const rotateY = useMotionValue(0);
  
  // Springs for smooth interaction
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const controlsRef = useRef<{ x?: AnimationPlaybackControls; y?: AnimationPlaybackControls }>({});

  // Define keys for the "normal mechanism" (from CSS)
  const keyframesX = [-20, -20, 30, -60, -20, -20, -20, -20, -20, -20];
  const keyframesY = [0, -20, 200, 150, 130, 120, 375, 357, 360, 360];
  const times = [0, 0.05, 0.2, 0.25, 0.6, 0.65, 0.8, 0.85, 0.87, 1];

  const startAutoAnimation = () => {
    // We animate from current value back through the loop
    // To keep it simple and seamless, we just trigger the full loop repeatedly
    controlsRef.current.x = animate(rotateX, keyframesX, {
      duration: 10,
      times,
      repeat: Infinity,
      ease: "easeInOut"
    });
    controlsRef.current.y = animate(rotateY, keyframesY, {
      duration: 10,
      times,
      repeat: Infinity,
      ease: "easeInOut"
    });
  };

  useEffect(() => {
    if (!isInteracting) {
      startAutoAnimation();
    }
    return () => {
      controlsRef.current.x?.stop();
      controlsRef.current.y?.stop();
    };
  }, [isInteracting]);

  // Track drag start state
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsInteracting(true);
    controlsRef.current.x?.stop();
    controlsRef.current.y?.stop();
    
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotateX.get(),
      rotY: rotateY.get(),
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteracting) return;
    
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    // Sensitivity factor
    const factor = 0.6;
    
    // Smoothly update the underlying motion values
    rotateX.set(dragStart.current.rotX - deltaY * factor);
    rotateY.set(dragStart.current.rotY + deltaX * factor);
  };

  const handlePointerUp = () => {
    setIsInteracting(false);
  };

  useEffect(() => {
    const handleGlobalPointerUp = () => setIsInteracting(false);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => window.removeEventListener('pointerup', handleGlobalPointerUp);
  }, []);

  const keyBaseClasses = "w-[6px] h-[6px] bg-[#444] float-left m-[1px] rounded-[2px] shadow-[0_-2px_0_#222] macbook-key custom-animate-keys";

  return (
    <div 
      ref={containerRef}
      className="macbook-container w-[150px] h-[96px] absolute left-1/2 top-1/2 mt-[-85px] ml-[-78px] cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <motion.div 
        className="macbook-inner z-20 absolute w-[150px] h-[96px] left-0 top-0"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Screen */}
        <div className={`macbook-screen custom-animate-lid-screen w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#ddd] 
                        bg-[linear-gradient(45deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0)_100%)] bg-left-bottom bg-[length:300px_300px] 
                        shadow-[inset_0_3px_7px_rgba(255,255,255,0.5)]`}>
          <div className={`macbook-screen-face-one w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#d3d3d3]
                          bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}>
            <div className="w-[3px] h-[3px] rounded-full bg-black absolute left-1/2 top-[4px] ml-[-1.5px]"></div>
            <div className="w-[130px] h-[74px] m-[10px] bg-black bg-[length:100%_100%] rounded-[1px] relative shadow-[inset_0_0_2px_rgba(0,0,0,1)] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531" 
                alt="Screen Content" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className={`custom-animate-screen-shade absolute left-0 top-0 w-[130px] h-[74px] 
                              bg-[linear-gradient(-135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_47%,rgba(255,255,255,0)_48%)] 
                              bg-[length:300px_200px] bg-[position:0px_0px]`}></div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={`macbook-body custom-animate-lid-macbody w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#cbcbcb]
                        bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}>
          <div className={`macbook-body-face-one custom-animate-lid-keyboard-area w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#dfdfdf] 
                          bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}>
            <div className="w-[40px] h-[31px] absolute left-1/2 top-1/2 rounded-[4px] mt-[-44px] ml-[-18px] bg-[#cdcdcd] 
                            bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)] 
                            shadow-[inset_0_0_3px_#888]">
            </div>
            <div className={`macbook-keyboard w-[130px] h-[45px] absolute left-[7px] top-[41px] rounded-[4px] bg-[#cdcdcd] 
                            bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)] 
                            shadow-[inset_0_0_3px_#777] pl-[2px] overflow-hidden`}>
              {Array.from({ length: 58 }).map((_, i) => (
                <div key={`key-norm-${i}`} className={keyBaseClasses}></div>
              ))}
              <div key="key-space" className={`${keyBaseClasses} w-[45px]`}></div>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`key-f-${i}`} className={`${keyBaseClasses} h-[3px]`}></div>
              ))}
            </div>
          </div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute left-[20px] top-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute right-[20px] top-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute right-[20px] bottom-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-[#333] rounded-full absolute left-[20px] bottom-[20px]"></div>
        </div>
      </motion.div>
      <div className={`macbook-shadow custom-animate-macbook-shadow absolute w-[60px] h-[0px] left-[40px] top-[160px] 
                      shadow-[0_0_60px_40px_rgba(0,0,0,0.3)]`}>
      </div>
    </div>
  );
};

export {Macbook}


