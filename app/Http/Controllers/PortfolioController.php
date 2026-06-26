<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Setting;
use App\Models\ContactMessage;
use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    private function getSettings()
    {
        return Setting::pluck('value', 'key')->all();
    }

    public function home()
    {
        $featuredProjects = Project::where('is_featured', true)->orderBy('order')->get();
        $featuredSkills = Skill::where('is_featured', true)->orderBy('order')->get();
        $recentCertificates = Certificate::orderBy('issue_date', 'desc')->take(3)->get();
        
        return Inertia::render('Home', [
            'projects' => $featuredProjects,
            'skills' => $featuredSkills,
            'certificates' => $recentCertificates,
            'settings' => $this->getSettings(),
        ]);
    }

    public function projects()
    {
        $projects = Project::orderBy('order')->get();
        
        return Inertia::render('Projects', [
            'projects' => $projects,
            'settings' => $this->getSettings(),
        ]);
    }

    public function skills()
    {
        $skills = Skill::orderBy('order')->get();
        
        return Inertia::render('Skills', [
            'skills' => $skills,
            'settings' => $this->getSettings(),
        ]);
    }

    public function about()
    {
        $experiences = Experience::orderBy('order')->orderBy('start_date', 'desc')->get();
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        
        return Inertia::render('About', [
            'experiences' => $experiences,
            'certificates' => $certificates,
            'settings' => $this->getSettings(),
        ]);
    }

    public function contactSubmit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $contactMessage = ContactMessage::create($validated);

        // Fetch target email from Settings
        $adminEmail = Setting::where('key', 'email')->value('value') ?? 'admin@portfolio.com';

        try {
            Mail::to($adminEmail)->send(new ContactMessageMail($contactMessage));
        } catch (\Exception $e) {
            // Log warning/error but proceed so the UI user gets successful DB record message saved
            logger()->error("Failed to send contact message email notification: " . $e->getMessage());
        }

        return back()->with('success', 'Your message has been sent successfully! I will get back to you soon.');
    }
}
