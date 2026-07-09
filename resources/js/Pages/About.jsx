import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import {
    Briefcase,
    GraduationCap,
    Send,
    Mail,
    Phone,
    FileText,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/Components/BrandIcons';

export default function About({ experiences = [], certificates = [], settings = {} }) {
    const { url, props } = usePage();
    const { flash } = props;
    const appUrl = props.app_url || 'https://portfolio.syafiqdev.xyz';
    const canonicalUrl = `${appUrl}${url === '/' ? '' : url}`;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => reset()
        });
    };

    const sortedExperiences = [...experiences].sort((a, b) => b.order - a.order);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <PublicLayout settings={settings}>
            <Head title="About & Contact - Developer Portfolio">
                <meta name="description" content="Learn about my background, career history, professional milestones, certificates, and get in touch with me directly through the contact form." />
                <meta name="keywords" content="About Me, Professional Experience, Timeline, Contact, Software Engineer, Certificates" />
                <link rel="canonical" href={canonicalUrl} />

                {/* OpenGraph Tags */}
                <meta property="og:title" content="About & Contact - Developer Portfolio" />
                <meta property="og:description" content="Learn about my background, career history, professional milestones, certificates, and get in touch with me directly through the contact form." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={`${appUrl}/images/profile.png`} />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About & Contact - Developer Portfolio" />
                <meta name="twitter:description" content="Learn about my background, career history, professional milestones, certificates, and get in touch with me directly through the contact form." />
                <meta name="twitter:image" content={`${appUrl}/images/profile.png`} />
            </Head>

            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-24 relative">
                {/* Radial Glows */}
                <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-gold-base/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/3 right-10 w-[300px] h-[300px] rounded-full bg-pearl-base/30 blur-[100px] pointer-events-none" />

                {/* Biography Section */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Visual Card Side */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="w-full max-w-sm rounded-2xl glass-panel p-6 border-b-4 border-b-gold-base shadow-xl text-center relative overflow-hidden group">
                            {/* Glow behind logo */}
                            <div className="absolute -top-10 -left-10 w-24 h-24 bg-gold-base/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold-base mx-auto mb-6 shadow-md bg-pearl-base/10">
                                <img
                                    src={settings.profile_image_path || '/images/profile.png'}
                                    alt="Syafiq profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-lunar-dark mb-1">Syafiq</h3>
                            <p className="text-xs text-gold-base font-semibold uppercase tracking-wider mb-6">Fresh Graduate</p>

                            {/* Contact Details */}
                            <div className="space-y-3.5 text-left border-t border-lunar-light/10 pt-6 text-sm text-lunar-light/85 mb-6">
                                {settings.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gold-base flex-shrink-0" />
                                        <span className="truncate">{settings.email}</span>
                                    </div>
                                )}
                                {settings.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gold-base flex-shrink-0" />
                                        <span>{settings.phone}</span>
                                    </div>
                                )}
                            </div>

                            {/* Resume Download */}
                            {settings.resume_path && (
                                <a
                                    href={settings.resume_path}
                                    download
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-pearl-base/35 border border-lunar-light/10 text-xs font-semibold uppercase tracking-wider text-lunar-dark hover:text-pearl-light hover:bg-lunar-dark hover:border-lunar-dark transition-all duration-300"
                                >
                                    <FileText className="w-4 h-4" /> Download Resume
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Content Text Side */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">My Story</h2>
                            <h3 className="text-3xl font-extrabold text-lunar-dark">Biography</h3>
                        </div>
                        <p className="text-lunar-light/75 text-sm leading-relaxed whitespace-pre-line">
                            {settings.about_detailed || 'I am a developer who loves building applications. I work with Laravel and React to create responsive user journeys.'}
                        </p>
                    </div>
                </section>

                {/* Experience & Education Timeline */}
                <section className="space-y-12 max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">My Journey</h2>
                        <h3 className="text-2xl sm:text-3xl font-bold text-lunar-dark">Experience & Education</h3>
                    </div>

                    <div className="relative border-l border-lunar-light/20 ml-4 md:ml-6 space-y-12">
                        {sortedExperiences.map((exp, index) => {
                            const isWork = exp.type === 'Work';
                            return (
                                <motion.div
                                    key={exp.id}
                                    className="relative pl-8 md:pl-10 group"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Timeline Node Icon */}
                                    <span className="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-pearl-light border-2 border-gold-base text-gold-base flex items-center justify-center timeline-dot group-hover:bg-gold-base group-hover:text-lunar-dark transition-all duration-300">
                                        {isWork ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                                    </span>

                                    {/* Details */}
                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <h4 className="text-md font-bold text-lunar-dark group-hover:text-gold-base transition-colors duration-200">
                                                {exp.title}
                                            </h4>
                                            <span className="text-xs text-gold-base font-semibold bg-gold-base/5 border border-gold-base/15 px-2.5 py-0.5 rounded-full w-max">
                                                {new Date(exp.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''}
                                            </span>
                                        </div>
                                        <div className="text-xs text-lunar-light/75 font-semibold flex items-center gap-1.5">
                                            <span>{exp.company}</span>
                                            {exp.location && (
                                                <>
                                                    <span className="text-lunar-light/40">&bull;</span>
                                                    <span>{exp.location}</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-sm text-lunar-light/75 leading-relaxed whitespace-pre-line pt-2">{exp.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto border-t border-lunar-light/10 pt-20">
                    {/* Text block */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h2 className="text-xs font-semibold tracking-wider text-gold-base uppercase mb-2">Connect</h2>
                            <h3 className="text-3xl font-extrabold text-lunar-dark">Get In Touch</h3>
                        </div>
                        <p className="text-lunar-light/75 text-sm leading-relaxed">
                            Have an interesting project in mind or want to collaborate? Fill out the contact form, and I will get back to you as soon as possible.
                        </p>

                        {/* Direct contact channels */}
                        <div className="space-y-4 pt-6 text-sm text-lunar-light/80 font-semibold">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-pearl-base/30 border border-lunar-light/10 flex items-center justify-center text-gold-base">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>{settings.email || 'your.email@example.com'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-pearl-base/30 border border-lunar-light/10 flex items-center justify-center text-gold-base">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span>{settings.phone || '+1 (123) 456-7890'}</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-4 pt-4">
                            {settings.github_url && (
                                <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pearl-base/20 border border-lunar-light/20 hover:border-gold-base text-lunar-light/70 hover:text-gold-base flex items-center justify-center transition-all duration-300">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {settings.linkedin_url && (
                                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pearl-base/20 border border-lunar-light/20 hover:border-gold-base text-lunar-light/70 hover:text-gold-base flex items-center justify-center transition-all duration-300">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {settings.twitter_url && (
                                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pearl-base/20 border border-lunar-light/20 hover:border-gold-base text-lunar-light/70 hover:text-gold-base flex items-center justify-center transition-all duration-300">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Contact Form Block */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-panel border border-lunar-light/10 space-y-6">
                            {/* Flash Alert Box */}
                            {flash && flash.success && (
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-sm">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <span>{flash.success}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg bg-pearl-light border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark placeholder-lunar-light/50"
                                        placeholder="Your name"
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.name}</p>}
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg bg-pearl-light border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark placeholder-lunar-light/50"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.email}</p>}
                                </div>
                            </div>

                            {/* Subject Input */}
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Subject (Optional)</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-pearl-light border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark placeholder-lunar-light/50"
                                    placeholder="Discussion topic"
                                />
                                {errors.subject && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.subject}</p>}
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-pearl-light border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark placeholder-lunar-light/50"
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                                {errors.message && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light disabled:bg-gold-base/50 rounded-lg transition-all duration-300 shadow-md gold-glow"
                            >
                                {processing ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
