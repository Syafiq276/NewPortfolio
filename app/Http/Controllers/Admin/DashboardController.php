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
}
