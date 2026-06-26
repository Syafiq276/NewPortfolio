<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Certificate;
use App\Models\Project;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Settings
        $settings = [
            'about_summary' => 'I am a passionate Full-Stack Developer specializing in building modern web applications with Laravel and React. I enjoy crafting clean, maintainable code and visually stunning interfaces with micro-animations and smooth user experiences.',
            'about_detailed' => 'My journey in software development began in university, and since then I have fallen in love with full-stack engineering. I thrive in the space where Laravel backend reliability meets React frontend dynamism. I focus on writing clean, scalable PHP APIs, architecting relational databases, and designing intuitive, responsive frontend client states.',
            'github_username' => 'Syafiq276',
            'github_url' => 'https://github.com/Syafiq276',
            'linkedin_url' => 'https://linkedin.com',
            'twitter_url' => 'https://twitter.com',
            'email' => 'admin@portfolio.com',
            'phone' => '+1 (123) 456-7890',
            'resume_path' => null,
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // 3. Skills
        $skills = [
            // Frontend
            ['name' => 'React', 'category' => 'Frontend', 'level' => 90, 'icon' => 'React', 'is_featured' => true, 'order' => 1],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'level' => 90, 'icon' => 'Js', 'is_featured' => true, 'order' => 2],
            ['name' => 'TailwindCSS', 'category' => 'Frontend', 'level' => 85, 'icon' => 'Tailwind', 'is_featured' => true, 'order' => 3],
            ['name' => 'HTML5 / CSS3', 'category' => 'Frontend', 'level' => 95, 'icon' => 'Html', 'is_featured' => false, 'order' => 4],
            
            // Backend
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 85, 'icon' => 'Laravel', 'is_featured' => true, 'order' => 5],
            ['name' => 'PHP', 'category' => 'Backend', 'level' => 80, 'icon' => 'Php', 'is_featured' => false, 'order' => 6],
            ['name' => 'Node.js', 'category' => 'Backend', 'level' => 70, 'icon' => 'Node', 'is_featured' => false, 'order' => 7],
            
            // Databases
            ['name' => 'MySQL', 'category' => 'Database', 'level' => 80, 'icon' => 'Mysql', 'is_featured' => false, 'order' => 8],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'level' => 75, 'icon' => 'Postgres', 'is_featured' => false, 'order' => 9],
            
            // Tools
            ['name' => 'Git / GitHub', 'category' => 'Tools', 'level' => 85, 'icon' => 'Git', 'is_featured' => false, 'order' => 10],
            ['name' => 'Docker', 'category' => 'Tools', 'level' => 65, 'icon' => 'Docker', 'is_featured' => false, 'order' => 11],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(['name' => $skill['name']], $skill);
        }

        // 4. Experiences
        $experiences = [
            [
                'title' => 'Full-Stack Web Developer',
                'company' => 'Creative Tech Solutions',
                'description' => 'Designed and developed custom web applications using Laravel, React, and MySQL. Optimized application load times by 40% and built reusable React components with clean design patterns.',
                'start_date' => '2024-03-01',
                'end_date' => null,
                'is_current' => true,
                'location' => 'Remote',
                'type' => 'Work',
                'order' => 1
            ],
            [
                'title' => 'Frontend Developer Intern',
                'company' => 'WebCraft Studio',
                'description' => 'Assisted in building responsive landing pages using React and Tailwind CSS. Collaborated with UI/UX designers to translate Figma mockups into interactive web systems.',
                'start_date' => '2023-09-01',
                'end_date' => '2024-02-28',
                'is_current' => false,
                'location' => 'Jakarta, Indonesia',
                'type' => 'Work',
                'order' => 2
            ],
            [
                'title' => 'Bachelor of Science in Computer Science',
                'company' => 'State University',
                'description' => 'Specialized in Software Engineering and Database Systems. Completed major projects in web frameworks and data warehousing.',
                'start_date' => '2020-09-01',
                'end_date' => '2024-06-30',
                'is_current' => false,
                'location' => 'City, Country',
                'type' => 'Education',
                'order' => 3
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::updateOrCreate(
                ['title' => $exp['title'], 'company' => $exp['company']],
                $exp
            );
        }

        // 5. Certificates
        $certificates = [
            [
                'title' => 'Laravel Advanced Development',
                'issuer' => 'Laracasts',
                'issue_date' => '2025-01-15',
                'credential_url' => 'https://laracasts.com',
                'credential_id' => 'LC-12345',
                'logo_path' => null,
            ],
            [
                'title' => 'React - The Complete Guide',
                'issuer' => 'Udemy',
                'issue_date' => '2023-11-20',
                'credential_url' => 'https://udemy.com',
                'credential_id' => 'UD-React-987',
                'logo_path' => null,
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::updateOrCreate(['title' => $cert['title']], $cert);
        }

        // 6. Projects
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A premium e-commerce platform built with Laravel API and React frontend, featuring secure stripe integration, customer dashboard, and an administration panel.',
                'slug' => 'e-commerce-platform',
                'github_url' => 'https://github.com',
                'demo_url' => 'https://demo.ecommerce.com',
                'tech_stack' => ['React', 'Laravel', 'TailwindCSS', 'MySQL', 'Stripe'],
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Task Management SaaS',
                'description' => 'A collaborative project management tool that allows teams to manage tasks on an interactive kanban board. Built with React drag-and-drop and Laravel WebSockets.',
                'slug' => 'task-management-saas',
                'github_url' => 'https://github.com',
                'demo_url' => 'https://taskboard.com',
                'tech_stack' => ['React', 'Laravel', 'TailwindCSS', 'MySQL', 'Pusher'],
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'Developer Portfolio Website',
                'description' => 'This portfolio website built with Laravel, Inertia.js, and React. It features a complete custom administration panel, responsive glassmorphism theme, and contact form inbox.',
                'slug' => 'developer-portfolio',
                'github_url' => 'https://github.com',
                'demo_url' => 'https://portfolio.com',
                'tech_stack' => ['React', 'Laravel', 'Inertia.js', 'TailwindCSS', 'MySQL'],
                'is_featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(['slug' => $proj['slug']], $proj);
        }
    }
}
