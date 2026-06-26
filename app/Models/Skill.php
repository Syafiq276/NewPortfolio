<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'level',
        'icon',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}
