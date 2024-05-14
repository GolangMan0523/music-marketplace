<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="profile" />
<title>{{ $user->display_name }} - {{ settings('branding.site_name') }}</title>
<meta
    property="og:title"
    content="{{ $user->display_name }} - {{ settings('branding.site_name') }}"
/>
<meta property="og:url" content="{{ urls()->user($user) }}" />
<link rel="canonical" href="{{ urls()->user($user) }}" />

@if ($user->avatar)
    <meta property="og:image" content="{{ urls()->image($user->avatar) }}" />
    <meta property="og:width" content="200" />
    <meta property="og:height" content="200" />
@endif

<meta property="og:description" content="{{ $user->profile->description }} - {{ settings('branding.site_name') }}" />
<meta name="description" content="{{ $user->profile->description }} - {{ settings('branding.site_name') }}" />
