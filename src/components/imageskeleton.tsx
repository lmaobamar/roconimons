import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageSkeletonProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

function ImageSkeleton({ src, alt, width, height, className }: ImageSkeletonProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative" style={{ width, height }}>
            {!isLoaded && (
            <Skeleton className="absolute inset-0 rounded-lg" />
            )}
            <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}

export default ImageSkeleton;