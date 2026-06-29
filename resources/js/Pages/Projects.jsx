import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Filter } from 'lucide-react';
import { Github } from '@/Components/BrandIcons';
import ProjectDetailsModal from '@/Components/ProjectDetailsModal';
import KineticTextLoader from '@/Components/KineticTextLoader';

export default function Projects({ projects = [], settings = {} }) {
    const [search, setSearch] = useState('');
    const [selectedTech, setSelectedTech] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Extract unique technologies dynamically
    const allTechs = ['All', ...new Set(projects.flatMap(p => p.tech_stack || []))];

    // Filter projects based on search text and selected technology
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase()) ||
            (project.tech_stack && project.tech_stack.some(t => t.toLowerCase().includes(search.toLowerCase())));
            
        const matchesTech = selectedTech === 'All' || 
            (project.tech_stack && project.tech_stack.includes(selectedTech));
            
        return matchesSearch && matchesTech;
    });

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <PublicLayout settings={settings}>
            <Head title="Projects - Developer Portfolio" />

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="fixed inset-0 z-50 bg-lunar-dark flex flex-col items-center justify-center"
                    >
                        <KineticTextLoader text="Loading" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gold-base/55 mt-4 animate-pulse">
                            Portfolio Projects
                        </span>
                    </motion.div>
                ) : (
                    <motion.section
                        key="content"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh]"
                    >
                <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full bg-pearl-base/20 blur-[120px] pointer-events-none" />

                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">My Work</h2>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-lunar-dark mb-4">Complete Projects</h3>
                    <p className="max-w-2xl text-lunar-light/75 text-sm leading-relaxed">
                        A curated gallery of web application projects, custom systems, and tools I have worked on or am currently developing.
                    </p>
                </div>

                {/* Search and Filters Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-lunar-light/10">
                    {/* Search Input */}
                    <div className="relative flex-grow max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-lunar-light/50 pointer-events-none">
                            <Search className="w-4 h-4" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search projects by title, details or tech..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-pearl-base/30 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark placeholder-lunar-light/50 transition-all"
                        />
                    </div>

                    {/* Filter Dropdown/Selector */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        <Filter className="w-4 h-4 text-gold-base flex-shrink-0" />
                        <span className="text-xs text-lunar-light/70 font-semibold mr-2 hidden sm:inline">Filter:</span>
                        <div className="flex gap-1.5">
                            {allTechs.map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => setSelectedTech(tech)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all whitespace-nowrap ${
                                        selectedTech === tech
                                            ? 'bg-gold-base border-gold-base text-lunar-dark'
                                            : 'bg-pearl-base/20 border-lunar-light/10 text-lunar-light/70 hover:text-lunar-dark hover:border-lunar-light/30'
                                    }`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                className="flex flex-col h-full cursor-pointer group glow-card"
                                onClick={() => setSelectedProject(project)}
                                variants={cardVariants}
                                exit="exit"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-pearl-base/40 overflow-hidden">
                                    {project.thumbnail_path ? (
                                        <img
                                            src={project.thumbnail_path}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-lunar-light/70 bg-gradient-to-br from-pearl-base/15 to-pearl-light/35">
                                            No Thumbnail Image
                                        </div>
                                    )}
                                </div>
                                
                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-lunar-dark mb-2 group-hover:text-gold-base transition-colors">{project.title}</h4>
                                        <p className="text-sm text-lunar-light/75 mb-4 leading-relaxed line-clamp-4">{project.description}</p>
                                        
                                        {/* Tech badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.tech_stack && project.tech_stack.map((tech) => (
                                                <span key={tech} className="px-2 py-0.5 text-[10px] font-semibold text-lunar-dark bg-pearl-base/35 border border-lunar-light/10 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Links */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-lunar-light/10">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs font-medium text-lunar-light/70 hover:text-gold-base flex items-center gap-1 transition-colors"
                                            >
                                                <Github className="w-4 h-4" /> Code
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-xs font-medium text-lunar-light/70 hover:text-gold-base flex items-center gap-1 transition-colors ml-auto"
                                            >
                                                <ExternalLink className="w-4 h-4" /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-lunar-light/70 text-sm">No projects found matching your criteria. Try another filter or search term!</p>
                    </motion.div>
                )}
            </motion.section>
        )}
    </AnimatePresence>

            <ProjectDetailsModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </PublicLayout>
    );
}
