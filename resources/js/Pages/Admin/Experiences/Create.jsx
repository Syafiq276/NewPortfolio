import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        company: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        location: '',
        type: 'Work',
        order: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.experiences.store'));
    };

    return (
        <AdminLayout>
            <Head title="Add Timeline Item - Admin Dashboard" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.experiences.index')}
                        className="p-2 rounded-lg bg-lunar-light/30 border border-lunar-border/40 hover:border-gold-base text-pearl-muted hover:text-gold-base transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h3 className="text-xl font-bold text-pearl-light mb-1">Add Timeline Item</h3>
                        <p className="text-xs text-pearl-muted">Add a new career or academic milestone to your portfolio timeline.</p>
                    </div>
                </div>

                {/* Form Panel */}
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-panel border border-lunar-border/30 space-y-6">
                    {/* Type Select */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-pearl-light uppercase tracking-wider block">Timeline Record Type</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setData('type', 'Work')}
                                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                                    data.type === 'Work'
                                        ? 'bg-gold-base border-gold-base text-lunar-dark font-black shadow-md'
                                        : 'bg-lunar-dark border-lunar-border/40 text-pearl-muted hover:text-pearl-light'
                                }`}
                            >
                                Work Experience
                            </button>
                            <button
                                type="button"
                                onClick={() => setData('type', 'Education')}
                                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                                    data.type === 'Education'
                                        ? 'bg-gold-base border-gold-base text-lunar-dark font-black shadow-md'
                                        : 'bg-lunar-dark border-lunar-border/40 text-pearl-muted hover:text-pearl-light'
                                }`}
                            >
                                Education / School
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">
                                {data.type === 'Work' ? 'Job Title / Role' : 'Degree / Program Title'}
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                                placeholder={data.type === 'Work' ? 'e.g. Senior Software Engineer' : 'e.g. Bachelor of Computer Science'}
                                required
                            />
                            {errors.title && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.title}</p>}
                        </div>

                        {/* Company / School */}
                        <div className="space-y-2">
                            <label htmlFor="company" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">
                                {data.type === 'Work' ? 'Company Name' : 'School / Institution'}
                            </label>
                            <input
                                type="text"
                                id="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                                placeholder={data.type === 'Work' ? 'e.g. Google' : 'e.g. Stanford University'}
                                required
                            />
                            {errors.company && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.company}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Location (Optional)</label>
                            <input
                                type="text"
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                                placeholder="e.g. San Francisco, CA (or Remote)"
                            />
                            {errors.location && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.location}</p>}
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

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="start_date" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Start Date</label>
                            <input
                                type="date"
                                id="start_date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light cursor-pointer"
                                required
                            />
                            {errors.start_date && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.start_date}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="end_date" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">End Date</label>
                            <input
                                type="date"
                                id="end_date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                disabled={data.is_current}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                required={!data.is_current}
                            />
                            {errors.end_date && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.end_date}</p>}
                        </div>
                    </div>

                    {/* Current Checkbox */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="is_current"
                            checked={data.is_current}
                            onChange={(e) => {
                                setData('is_current', e.target.checked);
                                if (e.target.checked) setData('end_date', '');
                            }}
                            className="rounded bg-lunar-dark/50 border-lunar-border text-gold-base focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="is_current" className="text-xs font-semibold text-pearl-light uppercase tracking-wider cursor-pointer">
                            {data.type === 'Work' ? "I am currently working in this role" : "I am currently studying here"}
                        </label>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Milestone Description (Optional)</label>
                        <textarea
                            id="description"
                            rows="4"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="Explain your key accomplishments, responsibilities, or subjects covered..."
                        ></textarea>
                        {errors.description && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.description}</p>}
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all duration-300 shadow-md gold-glow"
                    >
                        <Save className="w-4 h-4" /> Save Record
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
