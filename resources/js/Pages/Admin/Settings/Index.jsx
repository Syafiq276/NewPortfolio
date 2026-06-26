import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, AlertCircle, FileText, Download } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Index({ settings = {} }) {
    const { data, setData, processing, errors } = useForm({
        about_summary: settings.about_summary || '',
        about_detailed: settings.about_detailed || '',
        github_username: settings.github_username || '',
        github_url: settings.github_url || '',
        linkedin_url: settings.linkedin_url || '',
        twitter_url: settings.twitter_url || '',
        email: settings.email || '',
        phone: settings.phone || '',
        resume: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post(route('admin.settings.update'), {
            about_summary: data.about_summary,
            about_detailed: data.about_detailed,
            github_username: data.github_username,
            github_url: data.github_url,
            linkedin_url: data.linkedin_url,
            twitter_url: data.twitter_url,
            email: data.email,
            phone: data.phone,
            resume: data.resume
        });
    };

    return (
        <AdminLayout>
            <Head title="System Settings - Admin Dashboard" />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h3 className="text-xl font-bold text-lunar-dark mb-1">Portfolio Settings</h3>
                    <p className="text-xs text-lunar-light/70">Configure your personal details, biography texts, social profiles, and resume documents.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-panel border border-lunar-light/10 space-y-6">
                    {/* Contact Details */}
                    <div className="border-b border-lunar-light/10 pb-6">
                        <h4 className="text-sm font-bold text-lunar-dark mb-4 tracking-wide uppercase text-gold-base">1. Contact & Social Channels</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Public Contact Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                    required
                                />
                                {errors.email && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Public Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                />
                                {errors.phone && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.phone}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                                <label htmlFor="github_username" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">GitHub Username (for API Syncing)</label>
                                <input
                                    type="text"
                                    id="github_username"
                                    value={data.github_username}
                                    onChange={(e) => setData('github_username', e.target.value)}
                                    placeholder="e.g. Syafiq276"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                />
                                {errors.github_username && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.github_username}</p>}
                                <p className="text-[10px] text-lunar-light/60 mt-0.5">Required to sync repositories. Add a GITHUB_TOKEN to your .env to lift API rate limits.</p>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="github_url" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">GitHub Profile URL</label>
                                <input
                                    type="url"
                                    id="github_url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                />
                                {errors.github_url && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.github_url}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                                <label htmlFor="linkedin_url" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">LinkedIn Link</label>
                                <input
                                    type="url"
                                    id="linkedin_url"
                                    value={data.linkedin_url}
                                    onChange={(e) => setData('linkedin_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                />
                                {errors.linkedin_url && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.linkedin_url}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="twitter_url" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Twitter / X Link</label>
                                <input
                                    type="url"
                                    id="twitter_url"
                                    value={data.twitter_url}
                                    onChange={(e) => setData('twitter_url', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                />
                                {errors.twitter_url && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.twitter_url}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Biography Settings */}
                    <div className="border-b border-lunar-light/10 pb-6">
                        <h4 className="text-sm font-bold text-lunar-dark mb-4 tracking-wide uppercase text-gold-base">2. Biography Details</h4>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="about_summary" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Hero Pitch Summary</label>
                                <textarea
                                    id="about_summary"
                                    rows="3"
                                    value={data.about_summary}
                                    onChange={(e) => setData('about_summary', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                    placeholder="Brief introduction displayed in the Hero banner of the Home page..."
                                    required
                                ></textarea>
                                {errors.about_summary && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.about_summary}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="about_detailed" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Detailed Biography</label>
                                <textarea
                                    id="about_detailed"
                                    rows="6"
                                    value={data.about_detailed}
                                    onChange={(e) => setData('about_detailed', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-lunar-dark"
                                    placeholder="Full details about yourself displayed on the About page..."
                                    required
                                ></textarea>
                                {errors.about_detailed && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.about_detailed}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <h4 className="text-sm font-bold text-lunar-dark mb-4 tracking-wide uppercase text-gold-base">3. Resume Document</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                            <div className="space-y-2">
                                <label htmlFor="resume" className="text-xs font-semibold text-lunar-dark uppercase tracking-wider">Upload Resume (PDF format)</label>
                                <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf"
                                    onChange={(e) => setData('resume', e.target.files[0])}
                                    className="w-full px-4 py-2 rounded-lg bg-white/80 border border-lunar-light/20 focus:border-gold-base text-xs text-lunar-light/70 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-lunar-light/10 file:text-lunar-dark hover:file:bg-gold-base hover:file:text-lunar-dark cursor-pointer"
                                />
                                {errors.resume && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.resume}</p>}
                            </div>

                            {/* Current PDF indicator */}
                            {settings.resume_path ? (
                                <div className="p-4 rounded-lg bg-lunar-light/5 border border-lunar-light/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-lunar-dark">
                                        <FileText className="w-5 h-5 text-gold-base" />
                                        <span>Resume Document PDF</span>
                                    </div>
                                    <a
                                        href={settings.resume_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-base hover:text-gold-light hover:underline"
                                    >
                                        <Download className="w-3.5 h-3.5" /> View PDF
                                    </a>
                                </div>
                            ) : (
                                <div className="text-xs text-lunar-light/60 italic py-4">No resume document uploaded yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all duration-300 shadow-md gold-glow"
                    >
                        <Save className="w-4 h-4" /> Save All Settings
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
