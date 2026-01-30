'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Responsive navigation bar with dark mode toggle
 * Features: glass effect, smooth transitions, keyboard navigation
 */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Navigation links
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/powerbi', label: 'Power BI' },
        { href: '/tableau', label: 'Tableau' },
        { href: '/excel', label: 'Excel' },
    ];

    // Initialize dark mode from localStorage
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true' ||
            (!localStorage.getItem('darkMode') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);

        setIsDark(darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        localStorage.setItem('darkMode', String(newDarkMode));
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'glass shadow-lg'
                        : 'bg-white/0 dark:bg-surface-950/0'
                    }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1 -m-1"
                            aria-label="Analytics Portfolio - Home"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                                A
                            </div>
                            <span className="font-bold text-lg text-surface-900 dark:text-white hidden sm:block">
                                Analytics<span className="text-primary-500">Portfolio</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 ${isActive(link.href)
                                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                            : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
                                        }`}
                                    aria-current={isActive(link.href) ? 'page' : undefined}
                                >
                                    {link.label}
                                    {isActive(link.href) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Dark mode toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
                                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDark ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            {/* Mobile menu toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isOpen}
                                aria-controls="mobile-menu"
                            >
                                {isOpen ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-surface-900 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                aria-hidden={!isOpen}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Close button */}
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile nav links */}
                    <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                    } ${isActive(link.href)
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                        : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
                                    }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                onClick={() => setIsOpen(false)}
                                aria-current={isActive(link.href) ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Footer */}
                    <div className="pt-6 border-t border-surface-200 dark:border-surface-700">
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                            © {new Date().getFullYear()} Analytics Portfolio
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
