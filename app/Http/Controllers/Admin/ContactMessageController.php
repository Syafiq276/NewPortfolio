<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => ContactMessage::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function show(ContactMessage $message)
    {
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message
        ]);
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}
