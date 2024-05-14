<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="music.musician" />
<title>{{ $artist->name }} - {{ settings('branding.site_name') }}</title>
<meta
    property="og:title"
    content="{{ $artist->name }} - {{ settings('branding.site_name') }}"
/>
<meta property="og:url" content="{{ urls()->artist($artist) }}" />
<link rel="canonical" href="{{ urls()->artist($artist) }}" />

@if ($artist->image_small)
    <meta property="og:image" content="{{ urls()->image($artist->image_small) }}" />
    <meta property="og:width" content="100" />
    <meta property="og:height" content="667" />
@endif

@if ($artist->profile?->description)
    <meta property="og:description" content="{{ str($artist->profile->description)->limit(400) }}" />
    <meta name="description" content="{{ str($artist->profile->description)->limit(400) }}" />
@endif

<script type="application/ld+json">
    {!! collect([
        '@context' => 'http://schema.org',
        '@type' => 'MusicGroup',
        '@id' => urls()->artist($artist),
        'url' => urls()->artist($artist),
        'name' => $artist->name,
        'image' => urls()->image($artist->image_small),
        'description' => $artist->profile?->description,
    ])->filter()->toJson() !!}
</script>

