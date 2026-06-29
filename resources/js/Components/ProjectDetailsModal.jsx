import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code, Calendar, Layout } from 'lucide-react';
import { Github } from '@/Components/BrandIcons';

/**
 * Safe, lightweight regex parser to render basic Markdown features
 * Supports: Headers (###), Bold (**text**), Bullet lists (- item), and Newlines.
 */
function renderContent(text) {
    if (!text) return null;

    const lines = text.split('\n');
    let inList = false;
    const elements = [];
    let listItems = [];

    lines.forEach((line, idx) => {
        const trimmed = line.trim();

        // 1. Headers (###)
        if (trimmed.startsWith('###')) {
            if (inList) {
                elements.push(<ul key={`list-${idx}`} className="list-disc pl-5 space-y-1 my-3 text-lunar-light/80 text-sm">{listItems}</ul>);
                inList = false;
                listItems = [];
            }
            const headerText = trimmed.replace(/^###\s*/, '');
            elements.push(
                <h4 key={idx} className="text-sm font-bold uppercase text-gold-base tracking-wider mt-5 mb-2">
                    {parseInlineStyles(headerText)}
                </h4>
            );
            return;
        }

        // 2. Bullet list items (- or *)
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            inList = true;
            const itemText = trimmed.replace(/^[-*]\s*/, '');
            listItems.push(<li key={`li-${idx}`}>{parseInlineStyles(itemText)}</li>);
            return;
        }

        // 3. Normal paragraph or line break
        if (trimmed === '') {
            if (inList) {
                elements.push(<ul key={`list-${idx}`} className="list-disc pl-5 space-y-1 my-3 text-lunar-light/80 text-sm">{listItems}</ul>);
                inList = false;
                listItems = [];
            }
            return;
        }

        // Default: Normal line text
        if (inList) {
            // If we are in list but line doesn't start with hyphen, close list
            elements.push(<ul key={`list-${idx}`} className="list-disc pl-5 space-y-1 my-3 text-lunar-light/80 text-sm">{listItems}</ul>);
            inList = false;
            listItems = [];
        }

        elements.push(
            <p key={idx} className="text-lunar-light/85 text-sm leading-relaxed mb-3">
                {parseInlineStyles(trimmed)}
            </p>
        );
    });

    // Close any trailing lists
    if (inList) {
        elements.push(<ul key="list-end" className="list-disc pl-5 space-y-1 my-3 text-lunar-light/80 text-sm">{listItems}</ul>);
    }

    return elements;
}

// Helper to parse inline styles like bold (**text**)
function parseInlineStyles(text) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-lunar-dark">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

export default function ProjectDetailsModal({ project, isOpen, onClose }) {
    if (!project) return null;

    // Combine thumbnail and gallery images into a single images array
    const images = [
        project.thumbnail_path,
        ...(project.gallery_images || [])
    ].filter(Boolean);

    const [activeImg, setActiveImg] = useState(images[0] || null);

    // Reset active image when project changes
    useEffect(() => {
        if (images.length > 0) {
            setActiveImg(images[0]);
        } else {
            setActiveImg(null);
        }
    }, [project]);

    // Close modal on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Lock background scroll
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-lunar-dark/60 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Content container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative w-full max-w-4xl rounded-2xl glass-panel shadow-2xl overflow-hidden border border-lunar-border/30 bg-pearl-light flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] z-10"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-lunar-dark/5 hover:bg-lunar-dark/10 text-lunar-light/70 hover:text-lunar-dark transition-all cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Section: Gallery & Description (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
                            {/* Title (Mobile view header) */}
                            <div className="block md:hidden pr-10 mb-4">
                                <h3 className="text-xl font-bold text-lunar-dark">{project.title}</h3>
                                <p className="text-xs text-gold-base uppercase tracking-widest font-semibold mt-1">Project Showcase</p>
                            </div>

                            {/* Carousel / Image Viewer */}
                            {images.length > 0 && (
                                <div className="space-y-3">
                                    {/* Main active image */}
                                    <div className="w-full aspect-video rounded-xl bg-lunar-dark/10 border border-lunar-border/20 overflow-hidden relative shadow-inner">
                                        <img
                                            src={activeImg}
                                            alt={project.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    
                                    {/* Thumbnail strip */}
                                    {images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-lunar-border/30">
                                            {images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveImg(img)}
                                                    className={`w-20 aspect-video rounded-md overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${activeImg === img ? 'border-gold-base scale-95 shadow-sm' : 'border-lunar-border/30 hover:border-lunar-light/50'}`}
                                                >
                                                    <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Description block */}
                            <div className="border-t border-lunar-light/10 pt-6">
                                <h4 className="text-xs font-bold uppercase text-lunar-light/60 tracking-wider mb-3">Project Overview</h4>
                                <div className="text-lunar-light/95">
                                    {renderContent(project.description)}
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Tech Stack & Actions Sidebar */}
                        <div className="w-full md:w-80 bg-lunar-dark/5 md:border-l border-t md:border-t-0 border-lunar-light/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-full">
                            <div className="space-y-6">
                                {/* Desktop Title header */}
                                <div className="hidden md:block">
                                    <h3 className="text-2xl font-black text-lunar-dark leading-tight">{project.title}</h3>
                                    <p className="text-xs text-gold-base uppercase tracking-widest font-semibold mt-1">Project Showcase</p>
                                </div>

                                {/* Tech Stack section */}
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-bold uppercase text-lunar-light/60 tracking-wider flex items-center gap-1.5">
                                        <Code className="w-3.5 h-3.5" /> Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech_stack && project.tech_stack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 rounded bg-lunar-dark/5 border border-lunar-border/20 text-xs font-semibold text-lunar-light/90 shadow-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Meta details like date or type if available */}
                                <div className="border-t border-lunar-light/10 pt-4 space-y-2 text-xs text-lunar-light/75">
                                    <div className="flex items-center gap-2">
                                        <Layout className="w-3.5 h-3.5 text-gold-base" />
                                        <span>Type: Web Application</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-gold-base" />
                                        <span>Updated: {new Date(project.updated_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 space-y-2.5">
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all shadow-md gold-glow cursor-pointer"
                                    >
                                        <ExternalLink className="w-4 h-4" /> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-lunar-light hover:text-gold-base bg-lunar-dark/5 hover:bg-lunar-dark/10 border border-lunar-border/40 hover:border-gold-base rounded-lg transition-all cursor-pointer"
                                    >
                                        <Github className="w-4 h-4" /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
