import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';

export default function Edit({ skill = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        name: skill.name || '',
        category: skill.category || 'Frontend',
        level: skill.level || 80,
        icon: skill.icon || '',
        is_featured: skill.is_featured === true || skill.is_featured === 1,
        order: skill.order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.skills.update', skill.id));
    };

    const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Soft Skills'];

    return (
        <AdminLayout>
            <Head title="Edit Skill - Admin Dashboard" />

            <div className="max-w-xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.skills.index')}
                        className="p-2 rounded-lg bg-lunar-light/30 border border-lunar-border/40 hover:border-gold-base text-pearl-muted hover:text-gold-base transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h3 className="text-xl font-bold text-pearl-light mb-1">Edit Skill</h3>
                        <p className="text-xs text-pearl-muted">Modify technical competency details or sorting options.</p>
                    </div>
                </div>

                {/* Form Panel */}
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-panel border border-lunar-border/30 space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Skill Name</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
                            required
                        />
                        {errors.name && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.name}</p>}
                    </div>

                    {/* Category Select / Custom */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Category</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {categories.map(cat => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => setData('category', cat)}
                                    className={`px-3 py-1 text-xs rounded border transition-all ${
                                        data.category === cat
                                            ? 'bg-gold-base border-gold-base text-lunar-dark font-semibold'
                                            : 'bg-lunar-dark border-lunar-border/40 text-pearl-muted hover:text-pearl-light'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <input
                            type="text"
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light"
                            required
                        />
                        {errors.category && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.category}</p>}
                    </div>

                    {/* Level Slider */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="level" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Proficiency Level</label>
                            <span className="text-sm font-bold text-gold-base">{data.level}%</span>
                        </div>
                        <input
                            type="range"
                            id="level"
                            min="0"
                            max="100"
                            value={data.level}
                            onChange={(e) => setData('level', parseInt(e.target.value))}
                            className="w-full accent-gold-base bg-lunar-dark cursor-pointer rounded-lg h-2 border border-lunar-border/20"
                            required
                        />
                        {errors.level && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.level}</p>}
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

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="is_featured"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                            className="rounded bg-lunar-dark/50 border-lunar-border text-gold-base focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="is_featured" className="text-xs font-semibold text-pearl-light uppercase tracking-wider cursor-pointer">Show on Home page (Core Skill)</label>
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all duration-300 shadow-md gold-glow"
                    >
                        <Save className="w-4 h-4" /> Update Skill
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
