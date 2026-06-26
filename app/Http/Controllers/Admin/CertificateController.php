<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => Certificate::orderBy('issue_date', 'desc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Certificates/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_url' => 'nullable|url|max:255',
            'credential_id' => 'nullable|string|max:255',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('certificates', 'public');
            $validated['logo_path'] = '/storage/' . $path;
        }

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully.');
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('Admin/Certificates/Edit', [
            'certificate' => $certificate
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'nullable|date',
            'credential_url' => 'nullable|url|max:255',
            'credential_id' => 'nullable|string|max:255',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($certificate->logo_path) {
                $oldPath = str_replace('/storage/', '', $certificate->logo_path);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('certificates', 'public');
            $validated['logo_path'] = '/storage/' . $path;
        }

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate)
    {
        if ($certificate->logo_path) {
            $oldPath = str_replace('/storage/', '', $certificate->logo_path);
            Storage::disk('public')->delete($oldPath);
        }
        
        $certificate->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully.');
    }
}
