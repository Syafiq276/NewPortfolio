<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::orderBy('order')->get()
        ]);
    }

    public function sync()
    {
        $usernameSetting = Setting::where('key', 'github_username')->first();
        $username = $usernameSetting ? trim($usernameSetting->value) : null;

        if (empty($username)) {
            // Fallback to parsing from github_url setting
            $githubUrlSetting = Setting::where('key', 'github_url')->first();
            if ($githubUrlSetting && $githubUrlSetting->value) {
                $path = parse_url($githubUrlSetting->value, PHP_URL_PATH);
                $username = trim($path, '/');
            }
        }

        if (empty($username)) {
            return redirect()->route('admin.projects.index')->with('error', 'GitHub Username is not set. Please configure it in Settings.');
        }

        $token = env('GITHUB_TOKEN');
        $url = "https://api.github.com/users/{$username}/repos?sort=updated&per_page=100";

        $headers = [
            'User-Agent' => 'Laravel-Portfolio-App',
            'Accept' => 'application/vnd.github.v3+json',
        ];

        if (!empty($token)) {
            $headers['Authorization'] = 'Bearer ' . $token;
        }

        $response = Http::withHeaders($headers)->get($url);

        if (!$response->successful()) {
            $errorMsg = $response->json()['message'] ?? 'Unknown error';
            return redirect()->route('admin.projects.index')->with('error', "Failed to fetch repositories from GitHub: {$errorMsg}");
        }

        $repos = $response->json();
        $newCount = 0;

        foreach ($repos as $repo) {
            // Check if project already exists by github_url
            $htmlUrl = rtrim($repo['html_url'], '/');
            $existing = Project::where('github_url', $htmlUrl)
                ->orWhere('github_url', $htmlUrl . '/')
                ->first();

            if (!$existing) {
                $title = $repo['name'];
                $title = str_replace(['-', '_'], ' ', $title);
                $title = ucwords($title);

                $techStack = [];
                if (!empty($repo['language'])) {
                    $techStack[] = $repo['language'];
                } else {
                    $techStack[] = 'JavaScript'; // fallback tech stack
                }

                Project::create([
                    'title' => $title,
                    'description' => $repo['description'] ?? 'No description provided.',
                    'slug' => Str::slug($title) . '-' . rand(1000, 9999),
                    'github_url' => $htmlUrl,
                    'demo_url' => $repo['homepage'] ?? null,
                    'tech_stack' => $techStack,
                    'is_featured' => false,
                    'order' => Project::max('order') + 1,
                ]);

                $newCount++;
            }
        }

        return redirect()->route('admin.projects.index')->with('success', "GitHub sync complete! Imported {$newCount} new project(s).");
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_url' => 'nullable|url|max:255',
            'demo_url' => 'nullable|url|max:255',
            'tech_stack' => 'required|array',
            'is_featured' => 'required|boolean',
            'order' => 'required|integer',
            'thumbnail' => 'nullable|image|max:2048',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(1000, 9999);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail_path'] = '/storage/' . $path;
        }

        $galleryPaths = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $galleryPaths[] = '/storage/' . $path;
            }
        }
        $validated['gallery_images'] = $galleryPaths;

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_url' => 'nullable|url|max:255',
            'demo_url' => 'nullable|url|max:255',
            'tech_stack' => 'required|array',
            'is_featured' => 'required|boolean',
            'order' => 'required|integer',
            'thumbnail' => 'nullable|image|max:2048',
            'gallery' => 'nullable|array',
            'gallery.*' => 'image|max:2048',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'string',
        ]);

        if ($project->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(1000, 9999);
        }

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail_path) {
                $oldPath = str_replace('/storage/', '', $project->thumbnail_path);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('thumbnail')->store('projects', 'public');
            $validated['thumbnail_path'] = '/storage/' . $path;
        }

        $gallery = $project->gallery_images ?? [];

        // Handle deletions of screenshots
        if ($request->has('deleted_images')) {
            $deletedImages = $request->input('deleted_images');
            foreach ($deletedImages as $img) {
                if (($key = array_search($img, $gallery)) !== false) {
                    unset($gallery[$key]);
                }
                $filePath = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($filePath);
            }
            $gallery = array_values($gallery);
        }

        // Handle new screenshots uploads
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $gallery[] = '/storage/' . $path;
            }
        }

        $validated['gallery_images'] = $gallery;

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->thumbnail_path) {
            $oldPath = str_replace('/storage/', '', $project->thumbnail_path);
            Storage::disk('public')->delete($oldPath);
        }
        
        if ($project->gallery_images) {
            foreach ($project->gallery_images as $img) {
                $filePath = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($filePath);
            }
        }
        
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
