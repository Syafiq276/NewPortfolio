import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, Briefcase, GraduationCap } from 'lucide-react';

export default function Index({ experiences = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this experience record?')) {
            destroy(route('admin.experiences.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Timeline Records - Admin Dashboard" />

            <div className="space-y-6">
                {/* Header block */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-lunar-dark mb-1">Manage Work & Education Timeline</h3>
                        <p className="text-xs text-lunar-light/70">Add, modify, or delete history milestones shown on your portfolio timeline.</p>
                    </div>
                    <Link
                        href={route('admin.experiences.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all shadow-md gold-glow"
                    >
                        <Plus className="w-4 h-4" /> Add Timeline Item
                    </Link>
                </div>

                {/* Table Block */}
                <div className="rounded-xl glass-panel p-6 border border-lunar-light/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-lunar-light/15 text-xs font-semibold text-lunar-light/60 uppercase tracking-wider">
                                    <th className="py-3 px-4 w-28">Type</th>
                                    <th className="py-3 px-4">Title / Role</th>
                                    <th className="py-3 px-4">Company / School</th>
                                    <th className="py-3 px-4">Duration</th>
                                    <th className="py-3 px-4 w-20">Order</th>
                                    <th className="py-3 px-4 text-right w-44">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10 text-xs">
                                {experiences.map((exp) => (
                                    <tr key={exp.id} className="hover:bg-lunar-light/5 transition-colors">
                                        <td className="py-3.5 px-4">
                                            {exp.type === 'Work' ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                                                    <Briefcase className="w-3.5 h-3.5" /> Professional
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                                                    <GraduationCap className="w-3.5 h-3.5" /> Academic
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-bold text-lunar-dark">
                                            {exp.title}
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/70 font-medium">
                                            {exp.company}
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/60">
                                            {new Date(exp.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''}
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-lunar-dark">
                                            {exp.order}
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            <Link
                                                href={route('admin.experiences.edit', exp.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/60 border border-lunar-light/10 hover:border-gold-base text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 hover:border-rose-500 text-[10px] font-bold text-rose-400 hover:bg-rose-500 hover:text-lunar-dark transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {experiences.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-lunar-light/60">
                                            No timeline milestones uploaded yet. Click "Add Timeline Item" to start!
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
