import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const getIconComponent = (name) => {
    const map = {
        'React': 'Globe',
        'Js': 'FileCode',
        'JavaScript': 'FileCode',
        'TailwindCSS': 'Layers',
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

export default function Skills({ skills = [], settings = {} }) {
    const { url, props } = usePage();
    const appUrl = props.app_url || 'https://portfolio.syafiqdev.xyz';
    const canonicalUrl = `${appUrl}${url === '/' ? '' : url}`;
    // Categorize skills dynamically
    const categories = [...new Set(skills.map(skill => skill.category))];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <PublicLayout settings={settings}>
            <Head title="Skills - Developer Portfolio">
                <meta name="description" content="Browse my developer skills profile, technologies matrix, and software engineering capabilities including React, Laravel, databases, and DevOps." />
                <meta name="keywords" content="Skills, Web Development, Programming Languages, React, PHP, Laravel, SQL, DevOps" />
                <link rel="canonical" href={canonicalUrl} />

                {/* OpenGraph Tags */}
                <meta property="og:title" content="Skills - Developer Portfolio" />
                <meta property="og:description" content="Browse my developer skills profile, technologies matrix, and software engineering capabilities including React, Laravel, databases, and DevOps." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={`${appUrl}/images/profile.png`} />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Skills - Developer Portfolio" />
                <meta name="twitter:description" content="Browse my developer skills profile, technologies matrix, and software engineering capabilities including React, Laravel, databases, and DevOps." />
                <meta name="twitter:image" content={`${appUrl}/images/profile.png`} />
            </Head>

            <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[75vh] relative">
                <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-gold-base/5 blur-[100px] pointer-events-none" />

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">My Stack</h2>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-lunar-dark mb-4">Technologies & Expertise</h3>
                    <p className="max-w-xl mx-auto text-lunar-light/75 text-sm leading-relaxed">
                        A breakdown of my professional technical skills, frameworks, databases, and development tooling.
                    </p>
                </div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category}
                            className="p-8 rounded-2xl glass-panel flex flex-col h-full"
                            variants={sectionVariants}
                        >
                            <h4 className="text-lg font-bold text-lunar-dark border-b border-lunar-light/10 pb-3 mb-6 tracking-wide flex items-center justify-between">
                                {category}
                                <span className="text-xs font-semibold text-gold-base bg-gold-base/10 px-2.5 py-0.5 rounded-full border border-gold-base/20">
                                    {skills.filter(s => s.category === category).length} Skills
                                </span>
                            </h4>

                            <div className="space-y-6 flex-grow">
                                {skills
                                    .filter(s => s.category === category)
                                    .map((skill) => {
                                        const IconComponent = getIconComponent(skill.name);
                                        return (
                                            <div key={skill.id} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2.5 text-lunar-dark font-semibold">
                                                        <IconComponent className="w-4 h-4 text-gold-base" />
                                                        {skill.name}
                                                    </div>
                                                    <span className="text-xs font-bold text-gold-base">{skill.level}%</span>
                                                </div>
                                                
                                                {/* Level Bar */}
                                                <div className="h-2 bg-pearl-base/60 border border-lunar-light/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-gold-base to-gold-light"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.level}%` }}
                                                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </PublicLayout>
    );
}
