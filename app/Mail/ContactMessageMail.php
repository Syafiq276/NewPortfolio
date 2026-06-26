<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public ContactMessage $contactMessage;

    /**
     * Create a new message instance.
     */
    public function __construct(ContactMessage $contactMessage)
    {
        $this->contactMessage = $contactMessage;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.from.address', 'noreply@portfolio.com'), $this->contactMessage->name),
            replyTo: [
                new Address($this->contactMessage->email, $this->contactMessage->name)
            ],
            subject: 'New Portfolio Message: ' . ($this->contactMessage->subject ?? 'No Subject'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact-message',
            with: [
                'name' => $this->contactMessage->name,
                'email' => $this->contactMessage->email,
                'subjectLine' => $this->contactMessage->subject ?? '(No Subject)',
                'bodyText' => $this->contactMessage->message,
                'url' => route('admin.messages.show', $this->contactMessage->id),
            ]
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
