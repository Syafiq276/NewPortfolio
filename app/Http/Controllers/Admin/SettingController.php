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
            'settings' => Setting::pluck('value', 'key')->all()
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'about_summary' => 'required|string',
            'about_detailed' => 'required|string',
            'github_username' => 'nullable|string|max:255',
            'github_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'resume' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        foreach ($validated as $key => $value) {
            if ($key === 'resume') {
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
            } else {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
        }

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
