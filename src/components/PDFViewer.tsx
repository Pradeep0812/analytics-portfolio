'use client';

import React, { useState } from 'react';

interface PDFViewerProps {
    src: string;
    title: string;
}

/**
 * Responsive PDF viewer with download option
 * Features: responsive iframe, download button, error handling
 */
export default function PDFViewer({ src, title }: PDFViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    return (
        <div className="card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-medium text-surface-900 dark:text-white text-sm">
                            {title}
                        </h3>
                        <p className="text-xs text-surface-500 dark:text-surface-400">
                            PDF Document
                        </p>
                    </div>
                </div>

                {/* Download button */}
                <a
                    href={src}
                    download
                    className="btn btn-secondary px-4 py-2 text-sm gap-2"
                    aria-label={`Download ${title}`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                </a>
            </div>

            {/* PDF Viewer */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/10] bg-surface-100 dark:bg-surface-800">
                {/* Loading state */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-2 border-surface-300 dark:border-surface-600 border-t-primary-500 rounded-full animate-spin mb-3" />
                        <p className="text-sm text-surface-500 dark:text-surface-400">Loading PDF...</p>
                    </div>
                )}

                {/* Error state */}
                {hasError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <svg className="w-12 h-12 text-surface-300 dark:text-surface-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-surface-600 dark:text-surface-400 mb-4">
                            Unable to display PDF inline
                        </p>
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary px-4 py-2 text-sm"
                        >
                            Open PDF in new tab
                        </a>
                    </div>
                )}

                {/* PDF iframe */}
                {!hasError && (
                    <iframe
                        src={`${src}#toolbar=0&navpanes=0`}
                        className={`w-full h-full border-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        title={title}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Footer hint */}
            <div className="p-3 bg-surface-50 dark:bg-surface-800/50 border-t border-surface-200 dark:border-surface-700">
                <p className="text-xs text-surface-500 dark:text-surface-400 text-center">
                    Scroll to navigate • Download for full view
                </p>
            </div>
        </div>
    );
}
