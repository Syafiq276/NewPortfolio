<x-mail::message>
# New Message from Portfolio Contact Form

You have received a new message from **{{ $name }}** ({{ $email }}).

**Subject:** {{ $subjectLine }}

**Message Details:**
<x-mail::panel>
{{ $bodyText }}
</x-mail::panel>

<x-mail::button :url="$url">
View Message in Admin Panel
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
