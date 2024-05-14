<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="website" />

@if (isset($channel->config['seoTitle']))
    <title>{{ $channel->config['seoTitle'] }}</title>
    <meta property="og:title" content="{{ $channel->config['seoTitle'] }}" />
@else
    <title>{{ settings('branding.site_name') }}</title>
@endif

<meta property="og:url" content="{{ urls()->channel($channel) }}" />
<link rel="canonical" href="{{ urls()->channel($channel) }}" />

@if (isset($channel->config['seoDescription']))
    <meta
        property="og:description"
        content="{{ $channel->config['seoDescription'] }}"
    />
    <meta
        name="description"
        content="{{ $channel->config['seoDescription'] }}"
    />
@endif
