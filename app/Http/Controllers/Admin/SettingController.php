<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => Setting::pluck('value', 'key')->all(),
            'adminUser' => [
                'email' => auth()->user()->email
            ]
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'about_summary' => 'required|string',
            'about_detailed' => 'required|string',
            'github_username' => 'nullable|string|max:255',
            'github_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'resume' => 'nullable|file|mimes:pdf|max:5120',
            'profile_image' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:5120',
            'admin_email' => 'required|email|max:255',
            'admin_password' => 'nullable|string|min:8',
        ]);

        // 1. Update basic settings keys
        $settingsKeys = ['about_summary', 'about_detailed', 'github_username', 'github_url', 'linkedin_url', 'twitter_url', 'email', 'phone'];
        foreach ($settingsKeys as $key) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $request->input($key)]
            );
        }

        // 2. Handle Resume PDF file upload
        if ($request->hasFile('resume')) {
            $oldPathSetting = Setting::where('key', 'resume_path')->first();
            if ($oldPathSetting && $oldPathSetting->value) {
                $oldPath = str_replace('/storage/', '', $oldPathSetting->value);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('resume')->store('resumes', 'public');
            Setting::updateOrCreate(
                ['key' => 'resume_path'],
                ['value' => '/storage/' . $path]
            );
        }

        // 3. Handle Profile Photo upload
        if ($request->hasFile('profile_image')) {
            $oldImgSetting = Setting::where('key', 'profile_image_path')->first();
            if ($oldImgSetting && $oldImgSetting->value) {
                $oldImg = str_replace('/storage/', '', $oldImgSetting->value);
                Storage::disk('public')->delete($oldImg);
            }

            $path = $request->file('profile_image')->store('profile_photos', 'public');
            Setting::updateOrCreate(
                ['key' => 'profile_image_path'],
                ['value' => '/storage/' . $path]
            );
        }

        // 4. Update Admin User Email & Password
        $user = auth()->user();
        $user->email = $request->input('admin_email');
        if ($request->filled('admin_password')) {
            $user->password = bcrypt($request->input('admin_password'));
        }
        $user->save();

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
