import React from 'react';
import { Macbook } from "@/components/ui/animated-3d-mac-book-air";

const MacbookDemo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background">
      {/* The component is absolutely positioned, so this centering div is for context */}
      <div className="relative w-full h-full flex items-center justify-center scale-[3]">
        <Macbook />
      </div>
    </div>
  );
};

export default MacbookDemo;
