<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="music.playlist" />

<title>
    {{$playlist->name}} by {{$playlist->editors->first()->display_name}} - {{ settings('branding.site_name')}}
</title>
<meta
    property="og:title"
    content="{{$playlist->name}} by {{$playlist->editors->first()->display_name}} - {{ settings('branding.site_name')}}"
/>
<meta property="og:url" content="{{ urls()->playlist($playlist) }}" />
<link rel="canonical" href="{{ urls()->playlist($playlist) }}" />

@if ($image = $playlist->image)
    <meta property="og:image" content="{{urls()->image($image)}}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="300" />
@endif

@if($playlist->description)
    <meta property="og:description" content="{{$playlist->description}}" />
    <meta name="description" content="{{$playlist->description}}" />
@endif

<script type="application/ld+json">
    {!! collect([
        '@context' => 'http://schema.org',
        '@type' => 'MusicPlaylist',
        '@id' => urls()->playlist($playlist),
        'url' => urls()->playlist($playlist),
        'name' => $playlist->name,
        'numTracks' => $playlist->tracks_count,
        'image' => urls()->image($playlist->image),
        'description' => $playlist->description,
        'track' => $tracks->take(10)->map(function($track) {
            return collect([
                '@type' => 'MusicRecording',
                '@id' => urls()->track($track),
                'url' => urls()->track($track),
                'name' => $track->name,
                'datePublished' => $track->album?->release_date,
            ])->filter();
        }),
    ])->filter()->toJson() !!}
</script>


