import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border bg-background p-3 px-6 text-center font-semibold transition-all duration-300 group-hover:border-primary",
        className,
      )}
      {...props}
    >
      <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 translate-x-1">
        {text}
      </span>
      <div className="absolute inset-0 z-10 flex h-full w-full translate-x-0 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="font-bold">{text}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
      <div className="absolute left-[50%] top-[50%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-primary transition-all duration-500 group-hover:scale-[100] group-hover:opacity-100"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
