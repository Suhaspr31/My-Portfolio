import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WhisperTextProps {
  text: string;
  className?: string;
  delay?: number; 
  duration?: number; 
  x?: number;   
  y?: number;  
  triggerStart?: string;
}

interface WordToken {
  word: string;
  isBold: boolean;
  isNewline: boolean;
}

const parseTextToTokens = (rawText: string): WordToken[] => {
  const tokens: WordToken[] = [];
  const parts = rawText.split(/(\*\*[^*]+\*\*)/g);

  parts.forEach((part) => {
    if (!part) return;
    const isBold = part.startsWith("**") && part.endsWith("**");
    const content = isBold ? part.slice(2, -2) : part;

    const lines = content.split("\n");
    lines.forEach((line, lineIdx) => {
      if (lineIdx > 0) {
        tokens.push({ word: "", isBold: false, isNewline: true });
      }

      const words = line.split(/\s+/).filter(Boolean);
      words.forEach((w) => {
        tokens.push({ word: w, isBold, isNewline: false });
      });
    });
  });

  return tokens;
};

const WhisperText: React.FC<WhisperTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 0.6,
  x = 0,
  y = 15,
  triggerStart = "top 95%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-word]");

      gsap.set(targets, { opacity: 0, x, y });

      gsap.to(targets, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        ease: "power2.out",
        stagger: delay / 1000,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, duration, x, y, triggerStart]);

  const tokens = parseTextToTokens(text);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 ${className}`}
      style={{ overflow: "visible" }}
    >
      {tokens.map((token, i) => {
        if (token.isNewline) {
          return <span key={i} className="w-full h-3 block basis-full" />;
        }
        return (
          <span
            key={i}
            data-word
            className={`inline-block whitespace-nowrap ${
              token.isBold ? "font-bold text-[#5b68df]" : ""
            }`}
            style={{ position: "relative" }}
          >
            {token.word}
          </span>
        );
      })}
    </div>
  );
};

export default WhisperText;
