@extends('common::prerender.base')

@section('head')
    @include($seoTagsView ?? 'seo.artist-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $artist->name }}</h1>

    @if ($artist->profile->description) {
        {!! $artist->profile->description !!}
    @endif

    @if ($artist->image_small) {
        <img src="{{urls()->image($artist->image_small)}}" alt="">
    @endif

    <ul>
        @foreach($artist->genres as $genre)
            <li><a href="{{urls()->genre($genre)}}">{{$genre['name']}}</a></li>
        @endforeach
    </ul>

    @foreach($albums as $album)
        <h3><a href="{{ urls()->album($album) }}">{{ $album['name'] }}</a> - {{ $album['release_date'] }}</h3>

        <ul>
            @foreach($album['tracks'] as $track)
                <li><a href="{{ urls()->track($track)  }}">{{ $track['name'] }} - {{ $album['name'] }} - {{ $artist->name }}</a></li>
            @endforeach
        </ul>
    @endforeach

    @if($artist->similar)
        <h2>Similar Artists</h2>

        @foreach($artist->similar as $similarArtist)
            <h3><a href="{{ urls()->artist($similarArtist) }}">{{ $similarArtist['name'] }}</a></h3>
        @endforeach
    @endif
@endsection
