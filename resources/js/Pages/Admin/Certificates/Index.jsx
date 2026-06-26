import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';

export default function Index({ certificates = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this certificate?')) {
            destroy(route('admin.certificates.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Certificates - Developer Portfolio" />

            <div className="space-y-6">
                {/* Header block */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-lunar-dark mb-1">Manage Certificates</h3>
                        <p className="text-xs text-lunar-light/70">Add, modify, or delete learning credentials shown on your portfolio website.</p>
                    </div>
                    <Link
                        href={route('admin.certificates.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-lunar-dark bg-gold-base hover:bg-gold-light rounded-lg transition-all shadow-md gold-glow"
                    >
                        <Plus className="w-4 h-4" /> Add Certificate
                    </Link>
                </div>

                {/* Table Block */}
                <div className="rounded-xl glass-panel p-6 border border-lunar-light/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-lunar-light/15 text-xs font-semibold text-lunar-light/60 uppercase tracking-wider">
                                    <th className="py-3 px-4">Certificate Title</th>
                                    <th className="py-3 px-4">Issuing Organization</th>
                                    <th className="py-3 px-4">Issue Date</th>
                                    <th className="py-3 px-4">Credential ID</th>
                                    <th className="py-3 px-4 text-right w-44">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10 text-xs">
                                {certificates.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-lunar-light/5 transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-lunar-dark">
                                            {cert.title}
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/70 font-medium">
                                            {cert.issuer}
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/60">
                                            {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A'}
                                        </td>
                                        <td className="py-3.5 px-4 font-semibold text-lunar-dark">
                                            <div className="flex items-center gap-2">
                                                <span>{cert.credential_id || '(No ID)'}</span>
                                                {cert.credential_url && (
                                                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-gold-base hover:text-gold-light" title="Verify Link">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            <Link
                                                href={route('admin.certificates.edit', cert.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/60 border border-lunar-light/10 hover:border-gold-base text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(cert.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 hover:border-rose-500 text-[10px] font-bold text-rose-400 hover:bg-rose-500 hover:text-lunar-dark transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {certificates.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-lunar-light/60">
                                            No certificates uploaded yet. Click "Add Certificate" to start!
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
