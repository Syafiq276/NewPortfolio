import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Edit({ project = {} }) {
    const { data, setData, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        tech_stack_input: project.tech_stack ? project.tech_stack.join(', ') : '',
        is_featured: project.is_featured === true || project.is_featured === 1,
        is_visible: project.is_visible === true || project.is_visible === 1 || project.is_visible === undefined,
        order: project.order || 0,
        thumbnail: null,
        gallery: [],
        deleted_images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const techStackArray = data.tech_stack_input
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);

        // Standard Laravel Inertia update with file requires POST request and _method: 'PUT'
        router.post(route('admin.projects.update', project.id), {
            _method: 'PUT',
            title: data.title,
            description: data.description,
            github_url: data.github_url,
            demo_url: data.demo_url,
            tech_stack: techStackArray,
            is_featured: data.is_featured ? 1 : 0,
            is_visible: data.is_visible ? 1 : 0,
            order: data.order,
            thumbnail: data.thumbnail,
            gallery: data.gallery,
            deleted_images: data.deleted_images,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Project - Admin Dashboard" />

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
                        <h3 className="text-xl font-bold text-pearl-light mb-1">Edit Project</h3>
                        <p className="text-xs text-pearl-muted">Modify the details or thumbnail of the selected showcase project.</p>
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
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
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
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
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
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
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
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
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
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
                            required
                        />
                        {errors.tech_stack && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.tech_stack}</p>}
                    </div>

                    {/* Image and Order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Thumbnail Upload & Preview */}
                        <div className="space-y-2">
                            <label htmlFor="thumbnail" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Thumbnail Image</label>
                            {project.thumbnail_path && (
                                <div className="mb-2">
                                    <span className="text-[10px] text-pearl-muted block mb-1">Current Preview:</span>
                                    <img
                                        src={project.thumbnail_path}
                                        alt="Current Thumbnail"
                                        className="w-32 h-20 object-cover rounded border border-lunar-border/40"
                                    />
                                </div>
                            )}
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

                    {/* Gallery Screenshots Management */}
                    <div className="space-y-4">
                        <label className="text-xs font-semibold text-pearl-light uppercase tracking-wider block">Gallery Screenshots</label>
                        
                        {/* Display existing screenshots */}
                        {project.gallery_images && project.gallery_images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {project.gallery_images.map((img, idx) => {
                                    const isDeleted = data.deleted_images.includes(img);
                                    return (
                                        <div key={idx} className={`relative rounded-lg border border-lunar-border/40 overflow-hidden group aspect-video bg-lunar-dark ${isDeleted ? 'opacity-30 border-rose-500' : ''}`}>
                                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                            {!isDeleted ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setData('deleted_images', [...data.deleted_images, img])}
                                                    className="absolute inset-0 bg-rose-950/80 flex items-center justify-center text-xs font-bold text-rose-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setData('deleted_images', data.deleted_images.filter(x => x !== img))}
                                                    className="absolute inset-0 bg-lunar-dark/90 flex items-center justify-center text-[10px] font-bold text-gold-base cursor-pointer"
                                                >
                                                    Undo Delete
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* File input for new screenshots */}
                        <div className="space-y-2">
                            <span className="text-[11px] text-pearl-muted block">Upload Additional Screenshots:</span>
                            <input
                                type="file"
                                id="gallery"
                                accept="image/*"
                                multiple
                                onChange={(e) => setData('gallery', Array.from(e.target.files))}
                                className="w-full px-4 py-2 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base text-xs text-pearl-muted file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-lunar-light/80 file:text-pearl-light hover:file:bg-gold-base hover:file:text-lunar-dark cursor-pointer"
                            />
                            {errors.gallery && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.gallery}</p>}
                        </div>
                    </div>

                    {/* Status Checkboxes */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
                        {/* Visible Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_visible"
                                checked={data.is_visible}
                                onChange={(e) => setData('is_visible', e.target.checked)}
                                className="rounded bg-lunar-dark/50 border-lunar-border text-gold-base focus:ring-0 cursor-pointer"
                            />
                            <label htmlFor="is_visible" className="text-xs font-semibold text-pearl-light uppercase tracking-wider cursor-pointer">Visible to Public</label>
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="rounded bg-lunar-dark/50 border-lunar-border text-gold-base focus:ring-0 cursor-pointer"
                            />
                            <label htmlFor="is_featured" className="text-xs font-semibold text-pearl-light uppercase tracking-wider cursor-pointer">Show on Home page (Featured)</label>
                        </div>
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all duration-300 shadow-md gold-glow"
                    >
                        <Save className="w-4 h-4" /> Update Project
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
