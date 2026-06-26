import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, ArrowLeft, AlertCircle } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Create() {
    const { data, setData, processing, errors } = useForm({
        title: '',
        issuer: '',
        issue_date: '',
        credential_url: '',
        credential_id: '',
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.certificates.store'), {
            title: data.title,
            issuer: data.issuer,
            issue_date: data.issue_date,
            credential_url: data.credential_url,
            credential_id: data.credential_id,
            logo: data.logo
        });
    };

    return (
        <AdminLayout>
            <Head title="Add Certificate - Admin Dashboard" />

            <div className="max-w-xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.certificates.index')}
                        className="p-2 rounded-lg bg-lunar-light/30 border border-lunar-border/40 hover:border-gold-base text-pearl-muted hover:text-gold-base transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h3 className="text-xl font-bold text-pearl-light mb-1">Add Certificate</h3>
                        <p className="text-xs text-pearl-muted">Add a new qualification, certification, or training credential.</p>
                    </div>
                </div>

                {/* Form Panel */}
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass-panel border border-lunar-border/30 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Certificate Title</label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="e.g. React - The Complete Guide"
                            required
                        />
                        {errors.title && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.title}</p>}
                    </div>

                    {/* Issuer */}
                    <div className="space-y-2">
                        <label htmlFor="issuer" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Issuing Organization</label>
                        <input
                            type="text"
                            id="issuer"
                            value={data.issuer}
                            onChange={(e) => setData('issuer', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="e.g. Udemy, Coursera, Laracasts"
                            required
                        />
                        {errors.issuer && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.issuer}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Issue Date */}
                        <div className="space-y-2">
                            <label htmlFor="issue_date" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Issue Date (Optional)</label>
                            <input
                                type="date"
                                id="issue_date"
                                value={data.issue_date}
                                onChange={(e) => setData('issue_date', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light cursor-pointer"
                            />
                            {errors.issue_date && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.issue_date}</p>}
                        </div>

                        {/* Credential ID */}
                        <div className="space-y-2">
                            <label htmlFor="credential_id" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Credential ID (Optional)</label>
                            <input
                                type="text"
                                id="credential_id"
                                value={data.credential_id}
                                onChange={(e) => setData('credential_id', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                                placeholder="e.g. UC-123-ABC"
                            />
                            {errors.credential_id && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.credential_id}</p>}
                        </div>
                    </div>

                    {/* Credential URL */}
                    <div className="space-y-2">
                        <label htmlFor="credential_url" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Credential verification Link</label>
                        <input
                            type="url"
                            id="credential_url"
                            value={data.credential_url}
                            onChange={(e) => setData('credential_url', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base focus:ring-1 focus:ring-gold-base text-sm text-pearl-light placeholder-pearl-muted/40"
                            placeholder="https://..."
                        />
                        {errors.credential_url && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.credential_url}</p>}
                    </div>

                    {/* Logo file upload */}
                    <div className="space-y-2">
                        <label htmlFor="logo" className="text-xs font-semibold text-pearl-light uppercase tracking-wider">Logo Image (Optional)</label>
                        <input
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={(e) => setData('logo', e.target.files[0])}
                            className="w-full px-4 py-2 rounded-lg bg-lunar-dark/50 border border-lunar-border focus:border-gold-base text-xs text-pearl-muted file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-lunar-light/80 file:text-pearl-light hover:file:bg-gold-base hover:file:text-lunar-dark cursor-pointer"
                        />
                        {errors.logo && <p className="text-xs text-rose-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {errors.logo}</p>}
                    </div>

                    {/* Action button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all duration-300 shadow-md gold-glow"
                    >
                        <Save className="w-4 h-4" /> Save Certificate
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
