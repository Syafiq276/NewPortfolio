import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function Index({ skills = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            destroy(route('admin.skills.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Skills - Developer Portfolio" />

            <div className="space-y-6">
                {/* Header block */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-lunar-dark mb-1">Manage Skills</h3>
                        <p className="text-xs text-lunar-light/70">Add, modify, or delete tech stack skills shown on your portfolio website.</p>
                    </div>
                    <Link
                        href={route('admin.skills.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all shadow-md gold-glow"
                    >
                        <Plus className="w-4 h-4" /> Add Skill
                    </Link>
                </div>

                {/* Table Block */}
                <div className="rounded-xl glass-panel p-6 border border-lunar-light/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-lunar-light/15 text-xs font-semibold text-lunar-light/60 uppercase tracking-wider">
                                    <th className="py-3 px-4">Skill Name</th>
                                    <th className="py-3 px-4">Category</th>
                                    <th className="py-3 px-4 w-40">Proficiency Level</th>
                                    <th className="py-3 px-4 w-28">Featured</th>
                                    <th className="py-3 px-4 w-20">Order</th>
                                    <th className="py-3 px-4 text-right w-44">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10 text-xs">
                                {skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-lunar-light/5 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-lunar-dark">
                                            {skill.name}
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/70 font-medium">
                                            {skill.category}
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-gold-base">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-pearl-base/30 border border-lunar-light/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gold-base" style={{ width: `${skill.level}%` }} />
                                                </div>
                                                <span>{skill.level}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {skill.is_featured ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Core
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-lunar-light/60 bg-lunar-light/5 px-2 py-0.5 rounded-full border border-lunar-light/15">
                                                    <ShieldAlert className="w-3.5 h-3.5" /> Extra
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-lunar-dark">
                                            {skill.order}
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            <Link
                                                href={route('admin.skills.edit', skill.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/60 border border-lunar-light/10 hover:border-gold-base text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(skill.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 hover:border-rose-500 text-[10px] font-bold text-rose-400 hover:bg-rose-500 hover:text-lunar-dark transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {skills.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-lunar-light/60">
                                            No skills uploaded yet. Click "Add Skill" to get started!
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
