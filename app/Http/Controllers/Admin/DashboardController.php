<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\ContactMessage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Auto-run migrations in the background if any are pending
        try {
            $migrator = app('migrator');
            $files = $migrator->getMigrationFiles($migrator->paths());
            $ran = $migrator->getRepository()->getRan();
            $pending = array_diff(array_keys($files), $ran);

            if (!empty($pending)) {
                \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
                \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            }
        } catch (\Exception $e) {
            logger()->error('Auto-migration failed in dashboard: ' . $e->getMessage());
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects_count' => Project::count(),
                'skills_count' => Skill::count(),
                'certificates_count' => Certificate::count(),
                'experiences_count' => Experience::count(),
                'messages_total' => ContactMessage::count(),
                'messages_unread' => ContactMessage::where('is_read', false)->count(),
            ],
            'recent_messages' => ContactMessage::orderBy('created_at', 'desc')->take(5)->get(),
        ]);
    }

    public function clearCache()
    {
        try {
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            return redirect()->back()->with('success', 'Application cache cleared successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to clear cache: ' . $e->getMessage());
        }
    }

    public function runMigrations()
    {
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            return redirect()->back()->with('success', 'Database migrated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to run migrations: ' . $e->getMessage());
        }
    }

    public function systemStatus()
    {
        // 1. Disk Space
        $diskTotal = @disk_total_space(base_path()) ?: 0;
        $diskFree = @disk_free_space(base_path()) ?: 0;
        $diskUsed = $diskTotal - $diskFree;
        $diskPercentage = $diskTotal > 0 ? round(($diskUsed / $diskTotal) * 100, 2) : 0;

        // 2. Database Stats
        $dbConnection = config('database.default');
        $dbSize = 0;
        $dbTablesCount = 0;

        try {
            if ($dbConnection === 'sqlite') {
                $dbFile = config('database.connections.sqlite.database');
                if (file_exists($dbFile)) {
                    $dbSize = filesize($dbFile);
                }
                $dbTablesCount = count(\Illuminate\Support\Facades\DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"));
            } elseif ($dbConnection === 'mysql') {
                $dbName = config('database.connections.mysql.database');
                $sizeResult = \Illuminate\Support\Facades\DB::select("SELECT SUM(data_length + index_length) AS size FROM information_schema.TABLES WHERE table_schema = ?", [$dbName]);
                $dbSize = $sizeResult[0]->size ?? 0;

                $tablesResult = \Illuminate\Support\Facades\DB::select("SELECT COUNT(*) AS count FROM information_schema.TABLES WHERE table_schema = ?", [$dbName]);
                $dbTablesCount = $tablesResult[0]->count ?? 0;
            }
        } catch (\Exception $e) {
            logger()->error('System Status Database stats failed: ' . $e->getMessage());
        }

        // 3. PHP Environment
        $phpVersion = phpversion();
        $laravelVersion = app()->version();
        $serverSoftware = $_SERVER['SERVER_SOFTWARE'] ?? PHP_OS;

        // Memory usage
        $memoryUsage = memory_get_usage(true);
        $memoryPeakUsage = memory_get_peak_usage(true);
        $memoryLimit = ini_get('memory_limit');

        $phpSettings = [
            'memory_limit' => $memoryLimit,
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'max_execution_time' => ini_get('max_execution_time') . 's',
        ];

        return Inertia::render('Admin/SystemStatus', [
            'system' => [
                'disk' => [
                    'total' => $this->formatBytes($diskTotal),
                    'free' => $this->formatBytes($diskFree),
                    'used' => $this->formatBytes($diskUsed),
                    'percentage' => $diskPercentage,
                ],
                'database' => [
                    'connection' => $dbConnection,
                    'size' => $this->formatBytes($dbSize),
                    'tables_count' => $dbTablesCount,
                ],
                'php' => [
                    'version' => $phpVersion,
                    'laravel' => $laravelVersion,
                    'server' => $serverSoftware,
                    'memory_usage' => $this->formatBytes($memoryUsage),
                    'memory_peak' => $this->formatBytes($memoryPeakUsage),
                    'settings' => $phpSettings,
                ],
            ]
        ]);
    }

    private function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
