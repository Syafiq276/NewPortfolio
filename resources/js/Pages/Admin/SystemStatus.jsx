import React from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Database,
    Cpu,
    Server,
    HardDrive,
    RefreshCw,
    Sliders,
    Info,
    Activity
} from 'lucide-react';

export default function SystemStatus({ system = {} }) {
    const handleClearCache = () => {
        if (confirm('Are you sure you want to clear all compiled view, configuration, and route caches?')) {
            router.post(route('admin.system.clearCache'));
        }
    };

    const handleRunMigrations = () => {
        if (confirm('Are you sure you want to force running outstanding database migrations?')) {
            router.post(route('admin.system.runMigrations'));
        }
    };

    return (
        <AdminLayout>
            <Head title="System Status & Health - Admin Dashboard" />

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Heading */}
                <div>
                    <h3 className="text-xl font-bold text-lunar-dark mb-1">System Health & Diagnostics</h3>
                    <p className="text-xs text-lunar-light/70">Monitor server resources, database storage, and run maintenance tasks directly from this workspace.</p>
                </div>

                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Disk Storage Card */}
                    <div className="p-6 rounded-2xl glass-panel border border-lunar-light/10 flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-lunar-light/60 uppercase tracking-wider flex items-center gap-1.5">
                                <HardDrive className="w-4 h-4 text-gold-base animate-pulse" /> Disk Storage
                            </span>
                            <span className="text-xs font-bold text-lunar-dark">{system.disk.percentage}% Used</span>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="w-full bg-lunar-dark/10 h-3 rounded-full overflow-hidden border border-lunar-border/10">
                                <div 
                                    className="bg-gold-base h-full rounded-full shadow-inner transition-all duration-500" 
                                    style={{ width: `${system.disk.percentage}%` }} 
                                />
                            </div>
                            <div className="flex justify-between text-[11px] text-lunar-light/65">
                                <span>Used: {system.disk.used}</span>
                                <span>Free: {system.disk.free}</span>
                            </div>
                        </div>

                        <div className="border-t border-lunar-light/10 pt-3 text-[10px] text-lunar-light/60 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-gold-base" /> Total Alloc: {system.disk.total}
                        </div>
                    </div>

                    {/* Database Storage Card */}
                    <div className="p-6 rounded-2xl glass-panel border border-lunar-light/10 flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-lunar-light/60 uppercase tracking-wider flex items-center gap-1.5">
                                <Database className="w-4 h-4 text-gold-base" /> Database
                            </span>
                            <span className="px-2 py-0.5 rounded bg-gold-base/10 border border-gold-base/20 text-[9px] font-bold uppercase text-gold-base tracking-widest">{system.database.connection}</span>
                        </div>

                        <div className="space-y-1">
                            <div className="text-2xl font-black text-lunar-dark">{system.database.size}</div>
                            <div className="text-[11px] text-lunar-light/75">Active size on disk space</div>
                        </div>

                        <div className="border-t border-lunar-light/10 pt-3 text-[10px] text-lunar-light/60 flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5 text-gold-base" /> {system.database.tables_count} tables mapped & populated
                        </div>
                    </div>

                    {/* Memory Footprint Card */}
                    <div className="p-6 rounded-2xl glass-panel border border-lunar-light/10 flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-lunar-light/60 uppercase tracking-wider flex items-center gap-1.5">
                                <Cpu className="w-4 h-4 text-gold-base" /> PHP Memory
                            </span>
                            <span className="text-xs font-bold text-lunar-dark">Limit: {system.php.settings.memory_limit}</span>
                        </div>

                        <div className="space-y-1">
                            <div className="text-2xl font-black text-lunar-dark">{system.php.memory_usage}</div>
                            <div className="text-[11px] text-lunar-light/75">Peak footprint: {system.php.memory_peak}</div>
                        </div>

                        <div className="border-t border-lunar-light/10 pt-3 text-[10px] text-lunar-light/60 flex items-center gap-1">
                            <Sliders className="w-3.5 h-3.5 text-gold-base" /> Engine: Laravel v{system.php.laravel}
                        </div>
                    </div>
                </div>

                {/* Server Specifications & Settings Table */}
                <div className="rounded-2xl glass-panel p-6 border border-lunar-light/10">
                    <div className="flex items-center gap-2 mb-6">
                        <Server className="w-5 h-5 text-gold-base" />
                        <h4 className="font-bold text-lunar-dark text-md">Server Specifications & Runtime Environment</h4>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-lunar-light/10 text-lunar-light/60 font-semibold uppercase tracking-wider">
                                    <th className="py-2.5 px-4">Parameter</th>
                                    <th className="py-2.5 px-4">Value</th>
                                    <th className="py-2.5 px-4">Diagnostic Context</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lunar-light/10">
                                <tr className="hover:bg-lunar-light/5 transition-colors">
                                    <td className="py-3 px-4 font-bold text-lunar-dark">Server Software</td>
                                    <td className="py-3 px-4 text-lunar-light/85">{system.php.server}</td>
                                    <td className="py-3 px-4 text-lunar-light/60">Web server runtime engine</td>
                                </tr>
                                <tr className="hover:bg-lunar-light/5 transition-colors">
                                    <td className="py-3 px-4 font-bold text-lunar-dark">PHP Version</td>
                                    <td className="py-3 px-4 text-lunar-light/85">{system.php.version}</td>
                                    <td className="py-3 px-4 text-lunar-light/60">Active compiler compiler version</td>
                                </tr>
                                <tr className="hover:bg-lunar-light/5 transition-colors">
                                    <td className="py-3 px-4 font-bold text-lunar-dark">Memory Allocation Limit</td>
                                    <td className="py-3 px-4 text-lunar-light/85">{system.php.settings.memory_limit}</td>
                                    <td className="py-3 px-4 text-lunar-light/60">Max memory a single PHP thread can allocate</td>
                                </tr>
                                <tr className="hover:bg-lunar-light/5 transition-colors">
                                    <td className="py-3 px-4 font-bold text-lunar-dark">Max File Upload Size</td>
                                    <td className="py-3 px-4 text-lunar-light/85">{system.php.settings.upload_max_filesize}</td>
                                    <td className="py-3 px-4 text-lunar-light/60">Max size of individual screenshots or files allowed</td>
                                </tr>
                                <tr className="hover:bg-lunar-light/5 transition-colors">
                                    <td className="py-3 px-4 font-bold text-lunar-dark">Max POST Size</td>
                                    <td className="py-3 px-4 text-lunar-light/85">{system.php.settings.post_max_size}</td>
                                    <td className="py-3 px-4 text-lunar-light/60">Max size of multi-part form requests (all screenshots combined)</td>
                                </tr>
                                <tr className="hover:bg-lunar-light/5 transition-colors">
                                    <td className="py-3 px-4 font-bold text-lunar-dark">Max Execution Time</td>
                                    <td className="py-3 px-4 text-lunar-light/85">{system.php.settings.max_execution_time}</td>
                                    <td className="py-3 px-4 text-lunar-light/60">Max runtime allowed for long commands</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Utility Actions */}
                <div className="rounded-2xl glass-panel p-6 border border-lunar-light/10 space-y-6">
                    <div className="flex items-center gap-2">
                        <Sliders className="w-5 h-5 text-gold-base" />
                        <h4 className="font-bold text-lunar-dark text-md">Maintenance Tools</h4>
                    </div>
                    <p className="text-xs text-lunar-light/70">
                        Force server cache clear commands or apply outstanding migrations when updates are pulled.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl bg-lunar-dark/5 border border-lunar-light/10 flex flex-col justify-between">
                            <div>
                                <h5 className="text-xs font-semibold text-lunar-dark mb-1">Clear Application Cache</h5>
                                <p className="text-[10px] text-lunar-light/60 mb-4">Clears compiled configs, views, routes, and performance optimization caches.</p>
                            </div>
                            <button
                                onClick={handleClearCache}
                                className="w-fit inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white hover:bg-lunar-light/5 border border-lunar-light/15 text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all cursor-pointer shadow-sm"
                            >
                                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Clear Cache
                            </button>
                        </div>
                        <div className="p-4 rounded-xl bg-lunar-dark/5 border border-lunar-light/10 flex flex-col justify-between">
                            <div>
                                <h5 className="text-xs font-semibold text-lunar-dark mb-1">Run Database Migrations</h5>
                                <p className="text-[10px] text-lunar-light/60 mb-4">Executes any pending SQL schemas to structure database modifications.</p>
                            </div>
                            <button
                                onClick={handleRunMigrations}
                                className="w-fit inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white hover:bg-lunar-light/5 border border-lunar-light/15 text-[10px] font-bold text-lunar-dark hover:text-gold-base transition-all cursor-pointer shadow-sm"
                            >
                                <Database className="w-3.5 h-3.5" /> Force Migration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
