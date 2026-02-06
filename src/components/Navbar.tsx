'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
    type: 'project' | 'article';
    title: string;
    description: string;
    url: string;
    category?: string;
}

/**
 * Enterprise Navigation Bar with Search
 */
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    // Navigation links
    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Power BI', href: '/powerbi' },
        { label: 'Tableau', href: '/tableau' },
        { label: 'Excel', href: '/excel' },
        { label: 'Articles', href: '/articles' },
        { label: 'Skills', href: '/skills' },
    ];

    // Load search index
    useEffect(() => {
        fetch('/api/search')
            .then(res => res.json())
            .then(data => setSearchIndex(data))
            .catch(() => setSearchIndex([]));
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
    }, []);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query)
        ).slice(0, 8);

        setSearchResults(results);
    }, [searchQuery, searchIndex]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
                    ? 'bg-white/95 dark:bg-surface-900/95 backdrop-blur-sm border-b border-surface-200 dark:border-surface-700'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo / Brand */}
                    <Link
                        href="/"
                        className="font-semibold text-lg text-surface-900 dark:text-surface-50 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    >
                        Analytics Platform
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-5 bg-surface-200 dark:bg-surface-700 mx-2" />

                        {/* Search Button */}
                        <div className="relative" ref={searchRef}>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors"
                                aria-label="Search"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {/* Search Dropdown */}
                            {isSearchOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-3 border-b border-surface-200 dark:border-surface-700">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-3 py-2 text-sm bg-surface-100 dark:bg-surface-700 border-0 rounded-md focus:ring-2 focus:ring-accent-500 text-surface-900 dark:text-surface-50 placeholder:text-surface-500"
                                            autoFocus
                                        />
                                    </div>
                                    {searchResults.length > 0 && (
                                        <div className="max-h-64 overflow-y-auto divide-y divide-surface-200 dark:divide-surface-700">
                                            {searchResults.map((result, index) => (
                                                <Link
                                                    key={index}
                                                    href={result.url}
                                                    onClick={() => {
                                                        setIsSearchOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="block p-3 hover:bg-surface-50 dark:hover:bg-surface-700"
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs uppercase text-surface-500 dark:text-surface-400">
                                                            {result.type}
                                                        </span>
                                                        {result.category && (
                                                            <span className="text-xs text-surface-400 dark:text-surface-500">
                                                                • {result.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm font-medium text-surface-900 dark:text-surface-50">
                                                        {result.title}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {searchQuery && searchResults.length === 0 && (
                                        <div className="p-4 text-sm text-surface-500 dark:text-surface-400 text-center">
                                            No results found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md transition-colors"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-3 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Dark Mode Toggle - Mobile */}
                            <button
                                onClick={toggleDarkMode}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-md"
                            >
                                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
