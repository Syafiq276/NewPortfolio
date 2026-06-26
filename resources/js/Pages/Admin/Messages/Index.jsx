import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Mail, MailOpen, Trash2, Eye } from 'lucide-react';

export default function Index({ messages = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            destroy(route('admin.messages.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Inbox Messages - Admin Dashboard" />

            <div className="space-y-6">
                {/* Header block */}
                <div>
                    <h3 className="text-xl font-bold text-lunar-dark mb-1">Contact Inbox</h3>
                    <p className="text-xs text-lunar-light/70">View and manage messages sent by visitors through the contact form.</p>
                </div>

                {/* Table Block */}
                <div className="rounded-xl glass-panel p-6 border border-lunar-light/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-lunar-light/15 text-xs font-semibold text-lunar-light/60 uppercase tracking-wider">
                                    <th className="py-3 px-4 w-12 text-center">Status</th>
                                    <th className="py-3 px-4 w-52">Sender Details</th>
                                    <th className="py-3 px-4">Subject</th>
                                    <th className="py-3 px-4 w-40">Date Received</th>
                                    <th className="py-3 px-4 text-right w-44">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10 text-xs">
                                {messages.map((msg) => (
                                    <tr key={msg.id} className={`hover:bg-lunar-light/5 transition-colors ${!msg.is_read ? 'font-semibold text-lunar-dark' : 'text-lunar-light/60'}`}>
                                        <td className="py-3.5 px-4 text-center">
                                            {!msg.is_read ? (
                                                <Mail className="w-4 h-4 text-gold-base mx-auto" title="Unread" />
                                            ) : (
                                                <MailOpen className="w-4 h-4 text-lunar-light/40 mx-auto" title="Read" />
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-lunar-dark">{msg.name}</div>
                                            <div className="text-[10px] text-lunar-light/50 font-normal mt-0.5">{msg.email}</div>
                                        </td>
                                        <td className="py-3.5 px-4 max-w-sm truncate">
                                            {msg.subject || '(No Subject)'}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {new Date(msg.created_at).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            <Link
                                                href={route('admin.messages.show', msg.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/60 border border-lunar-light/10 hover:border-gold-base text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Read
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-rose-500/10 border border-rose-500/20 hover:border-rose-500 text-[10px] font-bold text-rose-400 hover:bg-rose-500 hover:text-lunar-dark transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {messages.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-lunar-light/60">
                                            Your inbox is empty. No messages received yet.
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
