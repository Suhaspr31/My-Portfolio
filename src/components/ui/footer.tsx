import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Mail, MapPin, ArrowUp, Github, Linkedin, Code2 } from "lucide-react"
import { AnimatedSocialIcons } from "@/components/ui/floating-action-button"
import DownloadButton from "@/components/ui/button-download"

// Animation variants for reusability
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
}

const backgroundVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  },
}


// Footer data for better maintainability
const footerData = {
  branding: {
    name: "Suhas P R",
    role: "Full Stack Developer | AI Enthusiast",
    desc: "Building scalable web apps & intelligent systems.",
  },
  navigation: ["Home", "About", "Skills", "Projects", "Contact"],
  contact: {
    email: "suhasprs331@gmail.com ",
    location: "Karnataka, India",
  },
  tech: "Built with React, TypeScript, Tailwind CSS, Framer Motion",
  social: [
    { href: "https://github.com/Suhaspr31", Icon: Github, label: "GitHub", className: "hover:bg-foreground/10" },
    { href: "https://www.linkedin.com/in/suhas-p-r-6906b0310/", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://leetcode.com/u/suhaspr/", Icon: Code2, label: "LeetCode" }
  ],
  copyright: `© ${new Date().getFullYear()} Suhas P R. All rights reserved.`,
}

// Reusable components
const NavSection = ({ title, links, index }: { title: string; links: string[]; index: number }) => (
  <motion.div variants={itemVariants} custom={index} className="flex flex-col gap-2">
    <h3 className="text-xs uppercase text-muted-foreground mb-3 border-b border-border pb-1">
      {title}
    </h3>
    <div className="flex flex-col gap-2">
      {links.map((link, i) => (
        <motion.a
          key={i}
          variants={linkVariants}
          href={`#${link.toLowerCase()}`}
          className="text-xs hover:text-foreground transition-colors duration-300"
        >
          {link}
        </motion.a>
      ))}
    </div>
  </motion.div>
)

const SocialLink = ({ href, label, icon: Icon, index }: { href: string; label: string; icon: any; index: number }) => (
  <motion.a
    variants={socialVariants}
    custom={index}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    }}
    whileTap={{ scale: 0.95 }}
    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
    aria-label={label}
  >
    <Icon className="w-4 h-4" />
  </motion.a>
)

export default function StickyFooter() {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded" | "complete">("idle")
  const [progress, setProgress] = useState(0)

  const simulateDownload = () => {
    setDownloadStatus("downloading")
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setDownloadStatus("downloaded")
          
          // Automatic download trigger at 100%
          const link = document.body.appendChild(document.createElement('a'))
          link.href = '/Resume/Resume.pdf'
          link.download = 'Suhas_PR_Resume.pdf'
          link.click()
          link.remove()

          return 100
        }
        return prevProgress + 5
      })
    }, 200)

    setTimeout(() => {
      setDownloadStatus("complete")
    }, 5500)

    setTimeout(() => {
      setDownloadStatus("idle")
      setProgress(0)
    }, 5600)
  }

  const handleDownloadClick = () => {
    if (downloadStatus === "idle") {
      simulateDownload()
    }
  }

  return (
    <div className="relative h-[130vh] md:h-[100vh] bg-[#f3f3f3]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative h-[calc(130vh+130vh)] md:h-[calc(100vh+100vh)] -top-[130vh] md:-top-[100vh]">
        <div className="h-[130vh] md:h-[100vh] sticky top-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
            className="bg-transparent pt-12 md:pt-16 pb-12 md:pb-0 px-4 md:px-12 min-h-full w-full flex flex-col justify-start md:justify-end gap-y-8 md:gap-y-60 lg:gap-y-70 relative overflow-visible md:overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />

            <motion.div
              variants={backgroundVariants}
              className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-foreground/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              variants={backgroundVariants}
              className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-muted/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Navigation Section */}
            <motion.div variants={containerVariants} className="relative z-10 w-full mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                {/* 1. Branding */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <div>
                    <h2 className="text-foreground text-xl font-bold tracking-tight">
                      {footerData.branding.name}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium mt-1">
                      {footerData.branding.role}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed max-w-[240px]">
                    {footerData.branding.desc}
                  </p>
                </motion.div>

                {/* 2. Navigation */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xs uppercase text-muted-foreground mb-4 border-b border-border pb-1 font-bold">
                    Quick Navigation
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {footerData.navigation.map((item, i) => (
                      <motion.a
                        key={i}
                        variants={linkVariants}
                        href={item === "Projects" ? "/#featured-projects" : `/#${item.toLowerCase()}`}
                        className="text-xs hover:text-foreground transition-colors flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-[1px] bg-foreground mr-0 group-hover:mr-2 transition-all duration-300" />
                        {item}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* 3. Contact Info */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xs uppercase text-muted-foreground mb-4 border-b border-border pb-1 font-bold">
                    Contact Info
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-xs">
                      <Mail size={14} className="text-muted-foreground" />
                      <a href={`mailto:${footerData.contact.email}`} className="hover:text-foreground transition-colors">
                        {footerData.contact.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{footerData.contact.location}</span>
                    </li>
                    <li className="pt-4">
                      <DownloadButton
                        downloadStatus={downloadStatus}
                        progress={progress}
                        onClick={handleDownloadClick}
                        className="w-full sm:w-40 bg-muted hover:bg-foreground hover:text-background border border-border"
                      />
                    </li>
                  </ul>
                </motion.div>

                {/* 4. Tech Stack & CTA */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xs uppercase text-muted-foreground mb-4 border-b border-border pb-1 font-bold">
                    Tech Stack
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground italic mb-4">
                    {footerData.tech}
                  </p>
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs mt-6 flex items-center gap-3 font-bold hover:text-foreground transition-all group"
                  >
                    <motion.div 
                      whileHover={{ y: -5, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-10 h-10 rounded-full border border-border group-hover:border-foreground flex items-center justify-center transition-colors bg-white/5 backdrop-blur-sm"
                    >
                      <ArrowUp size={16} className="group-hover:text-foreground transition-colors" />
                    </motion.div>
                    <span className="tracking-widest uppercase">Back to Top</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-8 md:gap-6 pb-0 md:pb-0">
              <div className="flex-1 w-full overflow-hidden">
                <motion.h1
                  className="text-[8.5vw] md:text-[8vw] leading-[0.8] font-black uppercase tracking-tighter bg-gradient-to-r from-foreground via-muted-foreground to-foreground/40 bg-clip-text text-transparent cursor-default flex flex-nowrap overflow-visible whitespace-nowrap"
                >
                  {footerData.branding.name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "100%", opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ 
                        delay: 0.05 * i, 
                        duration: 1.2, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4"
                >
                  <motion.div
                    className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-foreground via-muted-foreground to-foreground/40"
                    animate={{
                      scaleX: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-muted-foreground text-xs md:text-sm font-medium tracking-tight hover:text-foreground transition-colors duration-300"
                  >
                    {footerData.branding.role}
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-left md:text-right"
              >
                <div className="mb-6 flex justify-start md:justify-end pr-4 md:pr-16">
                  <AnimatedSocialIcons
                    icons={footerData.social as any}
                    iconSize={18}
                    className="w-full sm:w-auto"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 hover:text-foreground transition-colors duration-300"
                >
                  {footerData.copyright}
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 2, staggerChildren: 0.1 }}
                  className="flex gap-2 md:gap-3"
                >
                  {/* Bottom static social icons removed to consolidate into Floating Action Button above */}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}