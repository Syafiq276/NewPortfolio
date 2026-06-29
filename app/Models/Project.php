<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'slug',
        'thumbnail_path',
        'github_url',
        'demo_url',
        'tech_stack',
        'is_featured',
        'order',
        'gallery_images',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_featured' => 'boolean',
        'gallery_images' => 'array',
    ];
}
