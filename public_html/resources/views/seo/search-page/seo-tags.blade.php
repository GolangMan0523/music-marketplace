<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="website" />
<title>Search results for {{$query}} - {{ settings('branding.site_name') }}</title>
<meta
    property="og:title"
    content="Search results for {{$query}} - {{ settings('branding.site_name') }}"
/>
<meta property="og:url" content="{{ urls()->search($query) }}" />
<link rel="canonical" href="{{ urls()->search($query) }}" />
