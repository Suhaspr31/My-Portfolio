'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface LazyImageProps {
	alt: string;
	src: string;
	className?: string;
	AspectRatioClassName?: string;
	/** URL of the fallback image. default: undefined */
	fallback?: string;
	/** The ratio of the image. default: undefined (fill parent) */
	ratio?: number;
	/** Whether the image should only load when it is in view. default: false */
	inView?: boolean;
}

export function LazyImage({
	alt,
	src,
	ratio,
	fallback,
	inView = false,
	className,
	AspectRatioClassName,
}: LazyImageProps) {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const imgRef = React.useRef<HTMLImageElement | null>(null);
	const isInView = useInView(ref, { once: true });

	const [imgSrc, setImgSrc] = React.useState<string | undefined>(
		inView ? undefined : src,
	);
	const [isLoading, setIsLoading] = React.useState(true);

	const handleError = () => {
		if (fallback) {
			setImgSrc(fallback);
		}
		setIsLoading(false);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	// Load image only when inView
	React.useEffect(() => {
		if (inView && isInView && !imgSrc) {
			setImgSrc(src);
		}
	}, [inView, isInView, src, imgSrc]);

	// Handle cached images instantly
	React.useEffect(() => {
		if (imgRef.current && imgRef.current.complete) {
			handleLoad();
		}
	}, [imgSrc]);

	const content = (
		<>
			{/* Skeleton / fallback */}
			<div
				className={cn(
					'bg-accent/30 absolute inset-0 animate-pulse transition-opacity will-change-[opacity]',
					{ 'opacity-0': !isLoading },
				)}
			/>

			{imgSrc && (
				<img
					ref={imgRef}
					alt={alt}
					src={imgSrc}
					className={cn(
						'size-full object-cover opacity-0 transition-opacity duration-1000 will-change-[opacity]',
						{
							'opacity-100': !isLoading,
						},
						className,
					)}
					onLoad={handleLoad}
					onError={handleError}
					loading="lazy"
					decoding="async"
					fetchPriority={inView ? 'high' : 'low'}
				/>
			)}
		</>
	);

	if (ratio) {
		return (
			<AspectRatio
				ref={ref}
				ratio={ratio}
				className={cn(
					'relative size-full overflow-hidden border',
					AspectRatioClassName,
				)}
			>
				{content}
			</AspectRatio>
		);
	}

	return (
		<div
			ref={ref}
			className={cn(
				'relative size-full overflow-hidden',
				AspectRatioClassName,
			)}
		>
			{content}
		</div>
	);
}
