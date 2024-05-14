<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="music.album" />
<meta property="music.release_date" content="{{$album->release_date}}" />
<title>{{ $album->name }} - {{$album->artists->first()?->name}} - {{ settings('branding.site_name') }}</title>
<meta
    property="og:title"
    content="{{ $album->name }} - {{$album->artists->first()?->name}} - {{ settings('branding.site_name') }}"
/>
<meta property="og:url" content="{{ urls()->album($album) }}" />
<link rel="canonical" href="{{ urls()->album($album) }}" />

@if ($album->image)
    <meta property="og:image" content="{{ urls()->image($album->image) }}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="300" />
@endif

<meta property="og:description" content="{{ $album->name }} album by {{$album->artists->first()?->name}} on {{ settings('branding.site_name') }}" />
<meta name="description" content="{{ $album->name }} album by {{$album->artists->first()?->name}} on {{ settings('branding.site_name') }}" />
