import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, ShieldCheck, ShieldAlert, RefreshCw, ExternalLink, Eye, EyeOff } from 'lucide-react';

export default function Index({ projects = [] }) {
    const { delete: destroy } = useForm();
    const { post: syncPost, processing: syncProcessing } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('admin.projects.destroy', id));
        }
    };

    const handleSync = (e) => {
        e.preventDefault();
        if (confirm('Sync repositories from GitHub? This will import new repositories as projects while preserving existing project details.')) {
            syncPost(route('admin.projects.sync'));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Projects - Developer Portfolio" />

            <div className="space-y-6">
                {/* Header block */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-lunar-dark mb-1">Manage Projects</h3>
                        <p className="text-xs text-lunar-light/70">Add, modify, or delete showcase projects displayed on your portfolio website.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSync}
                            disabled={syncProcessing}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-white border border-lunar-light/25 hover:border-gold-base hover:text-gold-base rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${syncProcessing ? 'animate-spin' : ''}`} />
                            {syncProcessing ? 'Syncing...' : 'Sync GitHub'}
                        </button>
                        <Link
                            href={route('admin.projects.create')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all shadow-md gold-glow"
                        >
                            <Plus className="w-4 h-4" /> Add Project
                        </Link>
                    </div>
                </div>

                {/* Table Block */}
                <div className="rounded-xl glass-panel p-6 border border-lunar-light/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-lunar-light/15 text-xs font-semibold text-lunar-light/60 uppercase tracking-wider">
                                    <th className="py-3 px-4 w-24">Image</th>
                                    <th className="py-3 px-4">Project Title</th>
                                    <th className="py-3 px-4">Technologies</th>
                                    <th className="py-3 px-4 w-28">Visibility</th>
                                    <th className="py-3 px-4 w-28">Featured</th>
                                    <th className="py-3 px-4 w-20">Order</th>
                                    <th className="py-3 px-4 text-right w-44">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10 text-xs">
                                {projects.map((proj) => (
                                    <tr key={proj.id} className="hover:bg-lunar-light/5 transition-colors">
                                        <td className="py-3.5 px-4">
                                            {proj.thumbnail_path ? (
                                                <img
                                                    src={proj.thumbnail_path}
                                                    alt={proj.title}
                                                    className="w-16 h-10 object-cover rounded border border-lunar-light/20"
                                                />
                                            ) : (
                                                <div className="w-16 h-10 rounded bg-pearl-base/30 border border-lunar-light/10 flex items-center justify-center text-[9px] text-lunar-light/60 font-bold">No Image</div>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-lunar-dark">
                                            {proj.title}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {proj.tech_stack && proj.tech_stack.map((tech) => (
                                                    <span key={tech} className="px-1.5 py-0.5 text-[9px] bg-pearl-base/35 text-lunar-dark rounded border border-lunar-light/10">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {proj.is_visible ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                                                    <Eye className="w-3.5 h-3.5" /> Visible
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                                                    <EyeOff className="w-3.5 h-3.5" /> Hidden
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {proj.is_featured ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Featured
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-lunar-light/60 bg-lunar-light/5 px-2 py-0.5 rounded-full border border-lunar-light/15">
                                                    <ShieldAlert className="w-3.5 h-3.5" /> Standard
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-lunar-dark">
                                            {proj.order}
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            {proj.demo_url && (
                                                <a
                                                    href={proj.demo_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-gold-base/10 border border-gold-base/20 hover:border-gold-base text-[10px] font-bold text-gold-base hover:bg-gold-base hover:text-lunar-dark transition-all"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" /> Live Site
                                                </a>
                                            )}
                                            <Link
                                                href={route('admin.projects.edit', proj.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/60 border border-lunar-light/10 hover:border-gold-base text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(proj.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 hover:border-rose-500 text-[10px] font-bold text-rose-400 hover:bg-rose-500 hover:text-lunar-dark transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-8 text-lunar-light/60">
                                            No projects uploaded yet. Click "Add Project" to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
