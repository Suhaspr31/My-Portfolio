import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ")

interface TextStaggerHoverProps {
  text: string
  index: number
}
interface HoverSliderImageProps {
  index: number
  imageUrl: string
}
interface HoverSliderProps {}
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}
function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)
function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & HoverSliderProps
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className} ref={ref as any} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

const WordStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span
      className={cn("relative inline-block origin-bottom overflow-hidden", className)}
      {...props}
      ref={ref}
    >
      {children}
    </span>
  )
})
WordStaggerHover.displayName = "WordStaggerHover"

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, children, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)
  return (
    <span
      className={cn(
        "relative inline-block origin-bottom overflow-hidden",
        className
      )}
      {...(props as any)}
      ref={ref as any}
      onMouseEnter={handleMouse}
    >
      {characters.map((char, charIndex) => (
        <span
          key={`${char}-${charIndex}`}
          className="relative inline-block overflow-hidden"
        >
          <MotionConfig
            transition={{
              delay: charIndex * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="inline-block opacity-20"
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && charIndex < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block opacity-100 text-[#5b68df]"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}
export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      ref={ref as any}
      {...(props as any)}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"

const SLIDES = [
  {
    id: "cert-1",
    title: "Python for Data Science – IBM",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2486&auto=format&fit=crop",
  },
  {
    id: "cert-2",
    title: "GenAI Powered Data Analytics Job Simulation – Tata",
    imageUrl: "https://images.unsplash.com/photo-1541888086225-ee531ddf9104?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "cert-3",
    title: "Artificial Intelligence Foundation Certification – Infosys",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "cert-4",
    title: "Python Development Internship – OCTANET SERVICES PVT LTD.",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-dfa12c416183?q=80&w=2487&auto=format&fit=crop",
  },
]

export function CertificationsSlider() {
  return (
    <HoverSlider className="py-32 place-content-center px-6 md:px-12 bg-background text-text-main w-full">
      <div className="max-w-[1400px] mx-auto w-full">
        <h2 className="mb-16 font-display text-[60px] md:text-[80px] font-black uppercase leading-[0.9] tracking-tighter text-text-main">
          Professional <br className="hidden md:block" /> <span className="text-[#5b68df]">Certifications</span>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full relative">
          <div className="flex flex-col space-y-4 md:space-y-6 flex-1 w-full lg:max-w-[60%] z-10">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                className="cursor-pointer font-display text-[24px] md:text-[36px] lg:text-[42px] font-black uppercase tracking-tighter w-full leading-[1.1] mb-2"
                text={slide.title}
              />
            ))}
          </div>
          
          <HoverSliderImageWrap className="w-full lg:w-[45%] aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#111]">
            {SLIDES.map((slide, index) => (
              <div key={slide.id} className="w-full h-full">
                <HoverSliderImage
                  index={index}
                  imageUrl={slide.imageUrl}
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="size-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </HoverSliderImageWrap>
        </div>
      </div>
    </HoverSlider>
  )
}
