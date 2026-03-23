"use client";
import {FC, useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";

// Types
interface iCardItem {
	title: string;
	description: string;
	tag: string;
	src: string;
	link: string;
	color: string;
	textColor: string;
	// New fields for Modal
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
}

interface iCardProps extends iCardItem {
	i: number;
	total: number;
	onView?: (item: iCardItem) => void;
}

// Components
const Card: FC<iCardProps> = (props) => {
	const {
		title,
		description,
		color,
		textColor,
		i,
		total,
		src,
		tag,
		link,
		onView
	} = props;
	const cardRef = useRef<HTMLDivElement>(null);
	
	// Create scroll-based animations for each card
	const {scrollYProgress} = useScroll({
		target: cardRef,
		offset: ["start end", "end start"]
	});
	
	// Scale: card starts full size, then scales down as it scrolls away
	const scale = useTransform(
		scrollYProgress,
		[0, 0.3, 0.5, 0.7, 1],
		[1, 1, 0.9, 0.85, 0.8]
	);
	
	// Fade in and out
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.2, 0.5, 0.8, 1],
		[0, 1, 1, 1, 0]
	);
	
	// Slight vertical movement for depth
	const y = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		[100, 0, 0, -50]
	);
	
	// Blur effect for cards that are further away
	const blur = useTransform(
		scrollYProgress,
		[0, 0.3, 0.5, 0.7, 1],
		[8, 0, 0, 2, 6]
	);

	return (
		<div ref={cardRef} className="min-h-screen flex items-center justify-center sticky top-0 px-4">
			<motion.div
				style={{
					scale,
					opacity,
					y,
					filter: useTransform(blur, (v) => `blur(${v}px)`),
					backgroundColor: color
				}}
				className="relative flex flex-col h-[500px] md:h-[600px] w-[95vw] max-w-[1300px] py-12 px-8 md:py-16 md:px-14 rounded-[32px] md:rounded-[50px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.22)] hover:scale-[1.08] hover:shadow-[0_60px_140px_rgba(0,0,0,0.5)] hover:-rotate-[3deg] transition-all duration-800"
			>
				<div className="absolute inset-0 z-0">
					<img
						className="w-full h-full object-cover"
						src={src}
						alt="Background"
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-black/35" />
				</div>

				    <div className="relative z-20 flex flex-col h-full justify-between">
					<div className="flex items-center justify-between">
						<span className="text-[12px] md:text-[14px] uppercase tracking-widest rounded-full bg-white/20 text-white px-3 py-1">
							{tag}
						</span>
						<button 
							onClick={() => onView && onView(props)}
							className="text-[13px] md:text-[15px] rounded-full border border-white/60 text-white px-4 py-2 hover:bg-white/25 transition-colors duration-300"
						>
							View ↗
						</button>
					</div>

					<div className="text-center md:text-left mt-auto mb-4">
						<h3 className="font-display font-black text-4xl md:text-6xl leading-tight" style={{color: textColor}}>{title}</h3>
						<p className="font-body text-base md:text-2xl font-medium mt-3" style={{color: textColor}}>{description}</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
	items: iCardItem[];
	onView?: (item: iCardItem) => void;
}

const CardsParallax: FC<iCardSlideProps> = ({items, onView}) => {
	return (
		<div className="min-h-screen">
			{items.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} total={items.length} onView={onView} />;
			})}
		</div>
	);
};

export {CardsParallax, type iCardItem};
