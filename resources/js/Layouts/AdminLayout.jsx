import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    FolderKanban,
    Award,
    GraduationCap,
    Mail,
    Settings,
    LogOut,
    ExternalLink,
    Menu,
    X,
    CheckCircle,
    AlertCircle,
    Server
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const { auth, flash } = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ type: '', text: '' });

    const { post } = useForm();

    useEffect(() => {
        if (flash && (flash.success || flash.error)) {
            setToastMessage({
                type: flash.success ? 'success' : 'error',
                text: flash.success || flash.error
            });
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const navItems = [
        { label: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, active: url === '/admin' },
        { label: 'Projects', href: route('admin.projects.index'), icon: FolderKanban, active: url.startsWith('/admin/projects') },
        { label: 'Skills', href: route('admin.skills.index'), icon: Award, active: url.startsWith('/admin/skills') },
        { label: 'Timeline / Exp', href: route('admin.experiences.index'), icon: GraduationCap, active: url.startsWith('/admin/experiences') },
        { label: 'Certificates', href: route('admin.certificates.index'), icon: Award, active: url.startsWith('/admin/certificates') },
        { label: 'Inbox', href: route('admin.messages.index'), icon: Mail, active: url.startsWith('/admin/messages') },
        { label: 'System Status', href: route('admin.system.status'), icon: Server, active: url.startsWith('/admin/system/status') },
        { label: 'Settings', href: route('admin.settings.index'), icon: Settings, active: url.startsWith('/admin/settings') },
    ];

    return (
        <div className="min-h-screen bg-pearl-light text-lunar-dark flex font-sans selection:bg-gold-base selection:text-lunar-dark">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-lunar-dark border-r border-lunar-light/10 fixed top-0 bottom-0 left-0 z-20">
                <div className="h-16 flex items-center px-6 border-b border-lunar-light/10 justify-between">
                    <span className="font-bold text-pearl-light text-md uppercase tracking-wider flex items-center gap-1">
                        <span className="text-gold-base font-black">&bull;</span> Admin Core
                    </span>
                    <Link href={route('home')} target="_blank" className="text-pearl-muted hover:text-gold-base transition-colors" title="View Site">
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                item.active
                                    ? 'bg-gold-base text-lunar-dark font-semibold shadow-md'
                                    : 'text-pearl-muted hover:bg-lunar-light/45 hover:text-pearl-light'
                            }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-lunar-light/10 bg-lunar-dark/40">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-gold-base/20 border border-gold-base/40 flex items-center justify-center font-bold text-gold-base text-sm">
                            {auth?.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="text-xs font-semibold text-pearl-light truncate">{auth?.user?.name}</h4>
                            <p className="text-[10px] text-pearl-muted truncate">{auth?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Backing */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-lunar-dark border-r border-lunar-light/10 flex flex-col transition-transform duration-300 transform lg:hidden ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-16 flex items-center px-6 border-b border-lunar-light/10 justify-between bg-lunar-dark">
                    <span className="font-bold text-pearl-light text-md uppercase tracking-wider">
                        Admin Portal
                    </span>
                    <button onClick={() => setSidebarOpen(false)} className="text-pearl-muted hover:text-pearl-light">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto bg-lunar-dark">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                item.active
                                    ? 'bg-gold-base text-lunar-dark font-semibold'
                                    : 'text-pearl-muted hover:bg-lunar-light/30 hover:text-pearl-light'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-lunar-light/10 bg-lunar-dark/90">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
                {/* Desktop Topbar / Mobile Navbar */}
                <header className="h-16 border-b border-lunar-light/10 flex items-center justify-between px-6 bg-lunar-dark sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-pearl-muted hover:text-pearl-light p-1 rounded-md"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-lg font-semibold text-pearl-light tracking-wide">
                            Dashboard Workspace
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('home')}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-lunar-light/20 hover:border-gold-base text-xs font-medium text-pearl-muted hover:text-gold-base transition-all duration-200"
                        >
                            Live Site
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </header>

                {/* Dashboard Inner Content */}
                <main className="flex-1 p-6 md:p-8 bg-pearl-light overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Float Toast Notifications */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
                    <div
                        className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl border backdrop-blur-md ${
                            toastMessage.type === 'success'
                                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                                : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                        }`}
                    >
                        {toastMessage.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium">{toastMessage.text}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
