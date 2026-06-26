<?php

/**
 * Portfolio cPanel Helper Script
 * This script helps perform common Laravel tasks if you lack SSH/Terminal access.
 * 
 * SECURITY WARNING: DELETE THIS FILE IMMEDIATELY AFTER USE.
 */

// Simple password protection or token (Optional)
// if ($_GET['token'] !== 'portfolio-secret') die('Unauthorized');

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

// Manually bootstrap the application
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

echo "<h2>Portfolio cPanel Helper & Setup</h2>";

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    
    try {
        switch ($action) {
            case 'migrate':
                echo "<pre>Running migrations...</pre>";
                Artisan::call('migrate', ['--force' => true]);
                echo "<pre>" . Artisan::output() . "</pre>";
                break;
                
            case 'seed':
                echo "<pre>Running seeders...</pre>";
                Artisan::call('db:seed', ['--force' => true]);
                echo "<pre>" . Artisan::output() . "</pre>";
                break;

            case 'storage-link':
                echo "<pre>Linking storage...</pre>";
                // In some cPanel settings, default Artisan storage:link fails if symlink exists
                Artisan::call('storage:link');
                echo "<pre>" . Artisan::output() . "</pre>";
                break;
                
            case 'optimize':
                echo "<pre>Clearing caches...</pre>";
                Artisan::call('optimize:clear');
                echo "<pre>" . Artisan::output() . "</pre>";
                break;

            case 'db-test':
                echo "<pre>Testing Database Connection...</pre>";
                DB::connection()->getPdo();
                echo "<pre>Database connection is working successfully! Database name: " . DB::connection()->getDatabaseName() . "</pre>";
                break;
                
            default:
                echo "<p style='color:red;'>Action not recognized.</p>";
        }
    } catch (\Exception $e) {
        echo "<p style='color:red;'>Error: " . $e->getMessage() . "</p>";
    }
}

echo "<h3>Available Actions:</h3>";
echo "<ul>
    <li><a href='?action=db-test'>Test Database Connection</a></li>
    <li><a href='?action=migrate'>Run Migrations (Database Setup)</a></li>
    <li><a href='?action=seed'>Seed Database (Default Content)</a></li>
    <li><a href='?action=storage-link'>Create Storage Link (Image Support)</a></li>
    <li><a href='?action=optimize'>Clear and Reset Cache</a></li>
</ul>";

echo "<p style='color:red; font-weight:bold;'>REMINDER: Delete this file from public folder after your site is working!</p>";
