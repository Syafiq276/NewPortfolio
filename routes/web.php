<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\SkillController as AdminSkillController;
use App\Http\Controllers\Admin\ExperienceController as AdminExperienceController;
use App\Http\Controllers\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects');
Route::get('/skills', [PortfolioController::class, 'skills'])->name('skills');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::post('/contact', [PortfolioController::class, 'contactSubmit'])->name('contact.submit');

// Dashboard Redirect
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin Protected Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    Route::post('projects/sync', [AdminProjectController::class, 'sync'])->name('projects.sync');
    Route::resource('projects', AdminProjectController::class)->except(['show']);
    Route::resource('skills', AdminSkillController::class)->except(['show']);
    Route::resource('experiences', AdminExperienceController::class)->except(['show']);
    Route::resource('certificates', AdminCertificateController::class)->except(['show']);
    
    Route::get('/messages', [AdminContactMessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [AdminContactMessageController::class, 'show'])->name('messages.show');
    Route::delete('/messages/{message}', [AdminContactMessageController::class, 'destroy'])->name('messages.destroy');
    
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
});

// Profile Routes (default from Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
