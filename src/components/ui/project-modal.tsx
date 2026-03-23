'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Layout, Code2 } from 'lucide-react';
import { LazyImage } from './lazy-image';
import { Button } from './button';

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: {
		src: string;
		alt: string;
		title?: string;
		tags?: string[];
        overview?: string;
        details?: string;
        performance?: string;
        performanceDetail?: string;
        responsive?: string;
        responsiveDetail?: string;
        stack?: string[];
        githubUrl?: string;
        liveUrl?: string;
	} | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
	if (!project) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-background/80 backdrop-blur-xl"
					/>

					{/* Modal Content */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						data-lenis-prevent
						className="relative w-[95vw] max-w-[1300px] h-[85vh] md:h-[600px] overflow-y-auto bg-card border border-border shadow-2xl rounded-[32px] md:rounded-[50px] flex flex-col font-body hide-scrollbar"
					>
                        <style>{`
                            .hide-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                            .hide-scrollbar {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}</style>

						{/* Close Button */}
						<motion.button
							onClick={onClose}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
							className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-2 md:p-3 rounded-full bg-background/50 backdrop-blur-md border border-border/50 hover:bg-background transition-colors group shadow-lg"
						>
							<X className="w-5 h-5 md:w-6 md:h-6 group-hover:text-primary transition-colors" />
						</motion.button>

						<div className="flex flex-col">
							{/* Hero Image */}
							<div className="w-full">
                                <LazyImage 
                                    src={project.src} 
                                    alt={project.alt} 
                                    ratio={16/9} 
                                    className="border-none"
                                />
                            </div>

							{/* Project Info */}
							<div className="p-8 md:p-12 space-y-12">
								<div className="space-y-4">
									<div className="flex flex-wrap gap-2">
										{(project.tags || ['Frontend', 'Backend', 'UI/UX']).map((tag) => (
											<span key={tag} className="text-[12px] uppercase tracking-widest px-4 py-1.5 bg-muted rounded-none border border-border/50 font-body">
												{tag}
											</span>
										))}
									</div>
									<h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-none font-display">
										{project.title || project.alt}
									</h2>
								</div>

								<div className="grid md:grid-cols-3 gap-12">
									<div className="md:col-span-2 space-y-8">
										<div className="space-y-4 font-body">
											<h4 className="text-[14px] uppercase tracking-widest font-bold text-primary font-display">Overview</h4>
											<p className="text-[18px] text-text-muted leading-relaxed whitespace-pre-wrap">
												{project.overview || "This project represents a sophisticated intersection of design and technology, engineered to deliver high-performance results."}
											</p>
                                            {project.details && (
                                                <p className="text-[18px] text-text-muted leading-relaxed whitespace-pre-wrap">
                                                    {project.details}
                                                </p>
                                            )}
										</div>

										<div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
											<div className="space-y-2">
												<h5 className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider">
													<Cpu className="w-4 h-4" /> {project.performance || "Performance"}
												</h5>
												<p className="text-sm text-text-muted italic">{project.performanceDetail || "Optimized architecture."}</p>
											</div>
											<div className="space-y-2">
												<h5 className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider">
													<Layout className="w-4 h-4" /> {project.responsive || "Responsive"}
												</h5>
												<p className="text-sm text-text-muted italic">{project.responsiveDetail || "Fluid Design System."}</p>
											</div>
										</div>
									</div>

									<div className="space-y-10">
										<div className="space-y-4">
											<h4 className="text-[14px] uppercase tracking-widest font-bold text-primary flex items-center gap-2 font-display">
                                                <Code2 className="w-4 h-4" /> Stack
                                            </h4>
											<ul className="space-y-3 text-text-muted font-body">
												{(project.stack || ['React', 'TypeScript', 'Tailwind CSS']).map((item) => (
                                                    <li key={item} className="flex items-center gap-2 text-sm font-medium">{item}</li>
                                                ))}
											</ul>
										</div>

										<div className="flex flex-col gap-4">
											<a 
                                                href={project.liveUrl || "#"} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={!project.liveUrl ? "pointer-events-none opacity-50" : ""}
                                            >
                                                <Button className="w-full rounded-none h-14 font-bold uppercase tracking-widest flex gap-3 hover:translate-y-[-2px] transition-transform">
                                                    <ExternalLink className="w-5 h-5" /> Visit Website
                                                </Button>
                                            </a>
											<a 
                                                href={project.githubUrl || "#"} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={!project.githubUrl ? "pointer-events-none opacity-50" : ""}
                                            >
                                                <Button variant="outline" className="w-full rounded-none h-14 font-bold uppercase tracking-widest flex gap-3 hover:translate-y-[-2px] transition-transform">
                                                    <Github className="w-5 h-5" /> Source Code
                                                </Button>
                                            </a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
