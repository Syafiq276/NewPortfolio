import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    FolderKanban,
    Award,
    GraduationCap,
    Mail,
    ChevronRight,
    MessageSquare,
    Eye
} from 'lucide-react';

export default function Dashboard({ stats = {}, recent_messages = [] }) {
    const cardData = [
        {
            title: 'Projects',
            count: stats.projects_count,
            desc: 'Portfolio projects',
            icon: FolderKanban,
            color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            link: route('admin.projects.index'),
        },
        {
            title: 'Skills',
            count: stats.skills_count,
            desc: 'Technologies mapped',
            icon: Award,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            link: route('admin.skills.index'),
        },
        {
            title: 'Timeline Events',
            count: stats.experiences_count,
            desc: 'Timeline items',
            icon: GraduationCap,
            color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
            link: route('admin.experiences.index'),
        },
        {
            title: 'Inbox Messages',
            count: stats.messages_total,
            desc: `${stats.messages_unread} unread messages`,
            icon: Mail,
            color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
            link: route('admin.messages.index'),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard - Developer Portfolio" />

            <div className="space-y-8">
                {/* Heading */}
                <div>
                    <h3 className="text-xl font-bold text-lunar-dark mb-1">Welcome back, Administrator</h3>
                    <p className="text-xs text-lunar-light/70">Here is a quick overview of your portfolio metrics and visitor communications.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardData.map((card) => (
                        <div key={card.title} className="p-6 rounded-xl glass-card flex flex-col justify-between h-full border border-lunar-light/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${card.color}`}>
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <span className="text-2xl font-bold text-lunar-dark">{card.count}</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-lunar-dark mb-1">{card.title}</h4>
                                <p className="text-xs text-lunar-light/70 mb-4">{card.desc}</p>
                                <Link
                                    href={card.link}
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-base hover:text-gold-light hover:underline transition-colors"
                                >
                                    Manage Records <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Messages Table */}
                <div className="rounded-xl glass-panel p-6 border border-lunar-light/10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-gold-base" />
                            <h4 className="font-bold text-lunar-dark text-md">Recent Messages</h4>
                        </div>
                        <Link
                            href={route('admin.messages.index')}
                            className="text-xs font-semibold text-gold-base hover:text-gold-light flex items-center gap-1 transition-colors"
                        >
                            View Inbox <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-lunar-light/10 text-xs font-semibold text-lunar-light/60 uppercase tracking-wider">
                                    <th className="py-3 px-4">Sender</th>
                                    <th className="py-3 px-4">Subject</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10 text-xs">
                                {recent_messages.map((msg) => (
                                    <tr key={msg.id} className="hover:bg-lunar-light/5 transition-colors">
                                        <td className="py-3.5 px-4 font-medium text-lunar-dark">
                                            <div>{msg.name}</div>
                                            <div className="text-[10px] text-lunar-light/60 font-normal mt-0.5">{msg.email}</div>
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/70 max-w-xs truncate">{msg.subject || '(No Subject)'}</td>
                                        <td className="py-3.5 px-4">
                                            {msg.is_read ? (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Read</span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-rose-500/10 text-rose-600 border border-rose-500/20">New</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-lunar-light/60">
                                            {new Date(msg.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                href={route('admin.messages.show', msg.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white/60 border border-lunar-light/10 hover:border-gold-base text-[10px] font-semibold text-lunar-dark hover:text-gold-base transition-all"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Read
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {recent_messages.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-lunar-light/60">
                                            No messages received yet.
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
