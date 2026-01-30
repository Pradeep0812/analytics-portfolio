'use client';

import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
    src: string;
    title: string;
    poster?: string;
}

/**
 * Custom video player with play button overlay
 * Features: lazy loading, custom controls, error handling
 */
export default function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    if (hasError) {
        return (
            <div className="card aspect-video flex flex-col items-center justify-center bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400">
                <svg className="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Unable to load video</p>
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                    Open video in new tab →
                </a>
            </div>
        );
    }

    return (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-900 shadow-xl group">
            {/* Loading skeleton */}
            {isLoading && (
                <div className="absolute inset-0 skeleton z-10" />
            )}

            {/* Video element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                controls={isPlaying}
                preload="metadata"
                onPause={handlePause}
                onError={handleError}
                onLoadedData={handleLoadedData}
                aria-label={title}
            />

            {/* Play button overlay */}
            {!isPlaying && !isLoading && (
                <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group/btn"
                    aria-label={`Play ${title}`}
                >
                    {/* Poster background */}
                    {poster && (
                        <div
                            className="absolute inset-0 bg-cover bg-center -z-10"
                            style={{ backgroundImage: `url(${poster})` }}
                        />
                    )}

                    {/* Play button */}
                    <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform duration-300">
                        <svg
                            className="w-8 h-8 text-primary-600 dark:text-primary-400 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-medium">{title}</p>
                    </div>
                </button>
            )}
        </div>
    );
}
