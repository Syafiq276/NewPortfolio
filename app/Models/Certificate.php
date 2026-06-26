<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'title',
        'issuer',
        'issue_date',
        'credential_url',
        'credential_id',
        'logo_path',
    ];

    protected $casts = [
        'issue_date' => 'date',
    ];
}
