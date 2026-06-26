import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Create() {
    const { data, setData, processing, errors } = useForm({
        title: '',
        description: '',
        github_url: '',
        demo_url: '',
        tech_stack_input: '',
        is_featured: false,
        order: 0,
        thumbnail: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Parse comma-separated tech stack input
        const techStackArray = data.tech_stack_input
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);

        router.post(route('admin.projects.store'), {
            title: data.title,
            description: data.description,
            github_url: data.github_url,
            demo_url: data.demo_url,
            tech_stack: techStackArray,
            is_featured: data.is_featured ? 1 : 0,
            order: data.order,
            thumbnail: data.thumbnail
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Project - Admin Dashboard" />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.projects.index')}
                        className="p-2 rounded-lg bg-lunar-light/30 border border-lunar-border/40 hover:border-gold-base text-pearl-muted hover:text-gold-base transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h3 className="text-xl font-bold text-pearl-light mb-1">Create Project</h3>
                        <p className="text-xs text-pearl-muted">Add a new work item or application to display on the portfolio.</p>
                    </div>
                </div>

                {/* Form Panel */}
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-panel border border-lunar-border/30 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Project Title</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="e.g. E-Commerce Platform"
                            required
                        />
                        {errors.title && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Description</label>
                        <textarea
                            id="description"
                            rows="5"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="Detailed overview of the project, including features and key solutions implemented..."
                            required
                        ></textarea>
                        {errors.description && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.description}</p>}
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="github_url" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">GitHub Link</label>
                            <input
                                type="url"
                                id="github_url"
                                value={data.github_url}
                                onChange={(e) => setData('github_url', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                                placeholder="https://github.com/..."
                            />
                            {errors.github_url && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.github_url}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="demo_url" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Live Demo Link</label>
                            <input
                                type="url"
                                id="demo_url"
                                value={data.demo_url}
                                onChange={(e) => setData('demo_url', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                                placeholder="https://..."
                            />
                            {errors.demo_url && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.demo_url}</p>}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                        <label htmlFor="tech_stack_input" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Tech Stack (comma-separated)</label>
                        <input
                            type="text"
                            id="tech_stack_input"
                            value={data.tech_stack_input}
                            onChange={(e) => setData('tech_stack_input', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="e.g. React, TailwindCSS, Laravel, MySQL"
                            required
                        />
                        <p className="text-[10px] text-pearl-muted mt-1">Separate each technology with a comma. E.g. "React, Node.js, SQLite".</p>
                        {errors.tech_stack && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.tech_stack}</p>}
                    </div>

                    {/* Image and Order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Thumbnail Upload */}
                        <div className="space-y-2">
                            <label htmlFor="thumbnail" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Thumbnail Image</label>
                            <input
                                type="file"
                                id="thumbnail"
                                accept="image/*"
                                onChange={(e) => setData('thumbnail', e.target.files[0])}
                                className="w-full px-4 py-2 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base text-xs text-pearl-muted file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-lunar-light/80 file:text-pearl-light hover:file:bg-gold-base hover:file:text-lunar-dark cursor-pointer"
                            />
                            {errors.thumbnail && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.thumbnail}</p>}
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <label htmlFor="order" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Sorting Order</label>
                            <input
                                type="number"
                                id="order"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
                                required
                            />
                            {errors.order && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.order}</p>}
                        </div>
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="is_featured"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                            className="rounded bg-lunar-dark/50 border-lunar-border text-gold-base focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="is_featured" className="text-xs font-semibold text-pearl-light uppercase tracking-wider cursor-pointer">Show on Home page (Featured)</label>
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all duration-300 shadow-md gold-glow"
                    >
                        <Save className="w-4 h-4" /> Save Project
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
