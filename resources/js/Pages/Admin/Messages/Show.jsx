import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Trash2, Calendar, Mail, User } from 'lucide-react';

export default function Show({ message = {} }) {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            destroy(route('admin.messages.destroy', message.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Read Message - Admin Dashboard`} />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.messages.index')}
                            className="p-2 rounded-lg bg-lunar-light/30 border border-lunar-border/40 hover:border-gold-base text-pearl-muted hover:text-gold-base transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h3 className="text-xl font-bold text-pearl-light mb-1">Read Message</h3>
                            <p className="text-xs text-pearl-muted">Message details from visitor communication channel.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:border-rose-500 hover:text-lunar-dark rounded-lg transition-all"
                    >
                        <Trash2 className="w-4.5 h-4.5" /> Delete Message
                    </button>
                </div>

                {/* Message detail Panel */}
                <div className="p-8 rounded-2xl glass-panel border border-lunar-border/30 space-y-6 text-sm">
                    {/* Header details block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-lunar-border/30">
                        <div className="space-y-2">
                            <span className="text-[10px] text-pearl-muted uppercase tracking-wider font-semibold block">From</span>
                            <div className="flex items-center gap-2 text-pearl-light font-bold text-base">
                                <User className="w-4 h-4 text-gold-base" />
                                {message.name}
                            </div>
                            <div className="flex items-center gap-2 text-pearl-muted text-xs">
                                <Mail className="w-3.5 h-3.5 text-gold-base/60" />
                                <a href={`mailto:${message.email}`} className="hover:text-gold-base hover:underline">{message.email}</a>
                            </div>
                        </div>

                        <div className="space-y-2 sm:text-right sm:items-end sm:flex sm:flex-col sm:justify-end">
                            <span className="text-[10px] text-pearl-muted uppercase tracking-wider font-semibold block">Received</span>
                            <div className="flex items-center gap-2 text-pearl-muted text-xs justify-end">
                                <Calendar className="w-4 h-4 text-gold-base" />
                                {new Date(message.created_at).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>

                    {/* Subject line */}
                    <div className="space-y-1">
                        <span className="text-[10px] text-pearl-muted uppercase tracking-wider font-semibold block">Subject</span>
                        <h4 className="text-base font-bold text-pearl-light">{message.subject || '(No Subject)'}</h4>
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1 border-t border-lunar-border/20 pt-6">
                        <span className="text-[10px] text-pearl-muted uppercase tracking-wider font-semibold block mb-2">Message Body</span>
                        <div className="p-6 rounded-xl bg-lunar-dark/45 border border-lunar-border/20 text-pearl-light leading-relaxed whitespace-pre-wrap">
                            {message.message}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
