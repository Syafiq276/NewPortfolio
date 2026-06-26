import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/Components/BrandIcons';

export default function PublicLayout({ children, settings = {} }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: route('home'), active: url === '/' },
        { label: 'Projects', href: route('projects'), active: url.startsWith('/projects') },
        { label: 'Skills', href: route('skills'), active: url.startsWith('/skills') },
        { label: 'About', href: route('about'), active: url.startsWith('/about') },
    ];

    const github = settings.github_url || 'https://github.com';
    const linkedin = settings.linkedin_url || 'https://linkedin.com';
    const twitter = settings.twitter_url || 'https://twitter.com';

    return (
        <div className="min-h-screen bg-pearl-light text-lunar-dark flex flex-col font-sans selection:bg-gold-base selection:text-lunar-dark">
            {/* Header / Navbar (Royal Navy Background) */}
            <header className="sticky top-0 z-50 bg-lunar-dark/95 backdrop-blur-md border-b border-lunar-light/15 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href={route('home')} className="text-xl font-bold tracking-wider text-pearl-light flex items-center gap-1 group">
                                <span className="text-gold-base group-hover:gold-text-glow transition-all duration-300">&lt;</span>
                                SyafiqPortfolio
                                <span className="text-gold-base group-hover:gold-text-glow transition-all duration-300">/&gt;</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-sm font-semibold tracking-wide transition-all duration-200 border-b-2 py-1 ${
                                        link.active
                                            ? 'text-gold-base border-gold-base gold-text-glow'
                                            : 'text-pearl-muted border-transparent hover:text-pearl-light hover:border-pearl-base/30'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Social/Contact Button */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href={github} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors duration-200">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors duration-200">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <Link
                                href={route('about') + '#contact'}
                                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light border border-gold-base rounded-md transition-all duration-300 gold-glow hover:shadow-lg"
                            >
                                Let's Talk
                            </Link>
                        </div>

                        {/* Mobile Menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-pearl-muted hover:text-pearl-light hover:bg-lunar-light/50 focus:outline-none transition-colors duration-200"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-lunar-dark/95 backdrop-blur-md border-t border-lunar-light/10 animate-in fade-in slide-in-from-top-5 duration-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        link.active
                                            ? 'text-gold-base bg-lunar-light/60'
                                            : 'text-pearl-muted hover:text-pearl-light hover:bg-lunar-light/20'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-lunar-light/10 px-5 flex items-center justify-between">
                            <div className="flex space-x-4">
                                <a href={github} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                            <Link
                                href={route('about') + '#contact'}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base rounded-md"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer (Royal Navy Background) */}
            <footer className="bg-lunar-dark border-t border-lunar-light/15 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-pearl-muted text-center md:text-left">
                        &copy; {new Date().getFullYear()} Syafiq Portfolio. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href={github} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors duration-200">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors duration-200">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-pearl-muted hover:text-gold-base transition-colors duration-200">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
