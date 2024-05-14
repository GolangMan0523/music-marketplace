@extends('common::prerender.base')

@section('head')
    @include($seoTagsView ?? 'seo.track-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $track->name }}</h1>

    <p>{{ $track->name }} a song by {{$track->artists->first()?->name}} on {{ settings('branding.site_name') }}</p>

    @if ($image = $track->image ?: $track->album?->image)
        <img src="{{urls()->image($image)}}" alt="">
    @endif

    @if($track->album)
        <ul class="tracks">
            @foreach($track->album->tracks as $track)
                <li>
                    <figure>
                        <img src="{{ urls()->image($track['album']['image'])}}">
                        <figcaption>
                            <a href="{{urls()->track($track)}}">{{$track['name']}}</a> by
                            @foreach($track['album']['artists'] as $artist)
                                <a href="{{urls()->artist($artist)}}">{{$artist['name']}}</a>,
                            @endforeach
                        </figcaption>
                    </figure>
                </li>
            @endforeach
        </ul>
    @endif
@endsection
