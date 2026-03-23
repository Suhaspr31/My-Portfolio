"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Plus, LucideIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SocialIcon {
  Icon: React.ComponentType<any>
  label: string
  href?: string
  className?: string
}

interface AnimatedSocialIconsProps {
  icons: SocialIcon[]
  className?: string
  iconSize?: number
}

export function AnimatedSocialIcons({ 
  icons, 
  className,
  iconSize = 20
}: AnimatedSocialIconsProps) {
  const [active, setActive] = useState(false)

  const buttonSize = "size-10 sm:size-16" 

  return (
    <div className={cn("w-full relative flex items-start justify-start sm:justify-center", className)}>
      <div className="flex items-center justify-center relative gap-4">
        <motion.div
          className="absolute left-0 w-full z-10 pointer-events-none"
          animate={{
            x: active ? "calc(100% + 16px)" : 0,
          }}
          transition={{ ease: "easeIn", duration: 0.5 }}
        >
          <motion.button
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-foreground hover:bg-foreground/90 transition-colors pointer-events-auto"
            )}
            onClick={() => setActive(!active)}
            animate={{ rotate: active ? 45 : 0 }}
            transition={{
              ease: "easeIn",
              duration: 0.5,
            }}
          >
            <Plus 
              size={iconSize} 
              strokeWidth={3} 
              className="text-primary-foreground" 
            />
          </motion.button>
        </motion.div>
        
        {icons.map(({ Icon, label, href, className }, index) => (
          <motion.div
            key={index}
            className="relative group"
          >
            {/* Tooltip */}
            {active && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none z-50">
                <div className="bg-foreground text-background text-[10px] font-bold py-1.5 px-3 rounded-md whitespace-nowrap relative shadow-xl">
                  {label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-sm border-x-transparent border-b-transparent border-t-foreground border-[4px]" />
                </div>
              </div>
            )}

            <motion.div
              className={cn(
                buttonSize,
                "rounded-full flex items-center justify-center",
                "bg-background shadow-lg hover:shadow-xl",
                "border border-border",
                !active && "pointer-events-none invisible",
                className
              )}
            animate={{
              filter: active ? "blur(0px)" : "blur(2px)",
              scale: active ? 1 : 0.9,
              rotate: active ? 0 : 45,
              opacity: active ? 1 : 0,
            }}
            transition={{
              ease: "easeIn",
              duration: 0.4,
            }}
          >
            {href ? (
              <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Icon 
                  size={iconSize}
                  className="text-muted-foreground transition-all hover:text-foreground hover:scale-110" 
                />
              </a>
            ) : (
              <Icon 
                size={iconSize}
                className="text-muted-foreground transition-all hover:text-foreground hover:scale-110" 
              />
            )}
          </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
