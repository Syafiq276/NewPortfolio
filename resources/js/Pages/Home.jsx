import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Award, Calendar, ShieldCheck } from 'lucide-react';
import { Github } from '@/Components/BrandIcons';
import * as LucideIcons from 'lucide-react';

const getIconComponent = (name) => {
    const map = {
        'React': 'Globe',
        'Js': 'FileCode',
        'JavaScript': 'FileCode',
        'Tailwind': 'Layers',
        'HTML5 / CSS3': 'Code',
        'Laravel': 'Terminal',
        'PHP': 'Code2',
        'Node.js': 'Cpu',
        'MySQL': 'Database',
        'PostgreSQL': 'Database',
        'Git / GitHub': 'GitBranch',
        'Docker': 'Box',
    };
    const mappedName = map[name] || name;
    return LucideIcons[mappedName] || LucideIcons.HelpCircle;
};

export default function Home({ projects = [], skills = [], certificates = [], settings = {} }) {
    const heroVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <PublicLayout settings={settings}>
            <Head title="Home - Developer Portfolio" />

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 border-b border-lunar-light/10">
                {/* Visual Radial Glows */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-gold-base/5 blur-[80px] sm:blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-pearl-base/35 blur-[80px] sm:blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={heroVariants}
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-gold-base bg-gold-base/10 border border-gold-base/20 mb-6 uppercase">
                            <ShieldCheck className="w-3.5 h-3.5" /> Open For Opportunities
                        </span>

                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-lunar-dark mb-6">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-base via-gold-light to-lunar-light gold-text-glow">Syafiq</span>
                        </h1>


                        <p className="max-w-2xl mx-auto text-base text-lunar-light/70 leading-relaxed mb-10">
                            {settings.about_summary || 'I specialize in crafting high-end single-page applications with clean design aesthetics, fluid micro-interactions, and secure backends.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={route('projects')}
                                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light border border-gold-base rounded-lg transition-all duration-300 shadow-lg gold-glow hover:translate-y-[-2px] flex items-center justify-center gap-2 group"
                            >
                                View Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href={route('about') + '#contact'}
                                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-lunar-dark hover:text-pearl-light bg-pearl-base/20 hover:bg-lunar-dark border border-lunar-light/20 hover:border-lunar-dark rounded-lg transition-all duration-300 hover:translate-y-[-2px] flex items-center justify-center"
                            >
                                Let's Connect
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">My Work</h2>
                        <h3 className="text-2xl sm:text-3xl font-bold text-lunar-dark">Featured Projects</h3>
                    </div>
                    <Link href={route('projects')} className="group text-sm font-semibold text-gold-base hover:text-gold-light flex items-center gap-1.5 mt-2 md:mt-0 transition-colors">
                        View all projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={containerVariants}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="flex flex-col rounded-xl overflow-hidden glass-card h-full"
                            variants={cardVariants}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-pearl-base/40 overflow-hidden group">
                                {project.thumbnail_path ? (
                                    <img
                                        src={project.thumbnail_path}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-lunar-light/75 bg-gradient-to-br from-pearl-base/15 to-pearl-light/35">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-lunar-dark mb-2">{project.title}</h4>
                                    <p className="text-sm text-lunar-light/75 line-clamp-3 mb-4 leading-relaxed">{project.description}</p>

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
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-lunar-light/70 hover:text-gold-base flex items-center gap-1 transition-colors">
                                            <Github className="w-4 h-4" /> Code
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-lunar-light/70 hover:text-gold-base flex items-center gap-1 transition-colors ml-auto">
                                            <ExternalLink className="w-4 h-4" /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Core Skills Section */}
            <section className="bg-pearl-base/10 border-y border-lunar-light/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">Core Competencies</h2>
                        <h3 className="text-2xl sm:text-3xl font-bold text-lunar-dark">Core Technologies</h3>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                    >
                        {skills.map((skill) => {
                            const IconComponent = getIconComponent(skill.name);
                            return (
                                <motion.div
                                    key={skill.id}
                                    className="p-6 rounded-xl glass-card flex items-center gap-4"
                                    variants={cardVariants}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-gold-base/10 border border-gold-base/20 flex items-center justify-center text-gold-base">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lunar-dark text-sm">{skill.name}</h4>
                                        <p className="text-xs text-lunar-light/70">{skill.category}</p>

                                        {/* Simple level bar */}
                                        <div className="w-32 h-1.5 bg-pearl-base/60 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-gold-base" style={{ width: `${skill.level}%` }} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Learning Credentials / Certifications */}
            <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">Verification</h2>
                    <h3 className="text-2xl sm:text-3xl font-bold text-lunar-dark">Recent Certificates</h3>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={containerVariants}
                >
                    {certificates.map((cert) => (
                        <motion.div
                            key={cert.id}
                            className="p-6 rounded-xl glass-card flex flex-col justify-between h-full"
                            variants={cardVariants}
                        >
                            <div>
                                <div className="w-10 h-10 rounded-full bg-gold-base/10 border border-gold-base/20 flex items-center justify-center text-gold-base mb-4">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-lunar-dark text-sm mb-1">{cert.title}</h4>
                                <p className="text-xs text-lunar-light/70 mb-4">{cert.issuer}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-lunar-light/10 text-[11px] text-lunar-light/70">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A'}
                                </span>
                                {cert.credential_url && (
                                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-gold-base hover:underline flex items-center gap-1 font-semibold">
                                        Verify <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </PublicLayout>
    );
}
