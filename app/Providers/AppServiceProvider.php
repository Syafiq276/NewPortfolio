<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Run migrations automatically in the background if accessing any Admin route
        if (request()->is('admin') || request()->is('admin/*')) {
            try {
                $migrator = app('migrator');
                if ($migrator->repositoryExists()) {
                    $files = $migrator->getMigrationFiles($migrator->paths());
                    $ran = $migrator->getRepository()->getRan();
                    $pending = array_diff(array_keys($files), $ran);

                    if (!empty($pending)) {
                        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
                        \Illuminate\Support\Facades\Artisan::call('optimize:clear');
                    }
                }
            } catch (\Exception $e) {
                logger()->error('Auto-migration failed in AppServiceProvider: ' . $e->getMessage());
            }
        }
    }
}
