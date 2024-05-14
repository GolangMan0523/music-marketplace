@extends('common::prerender.base')

@section('head')
    @include($seoTagsView ?? 'seo.playlist-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $playlist->name }}</h1>

    <p>{{$playlist->description}}</p>

    @if ($image = $playlist->image)
        <img src="{{urls()->image($image)}}" alt="">
    @endif

    @foreach($tracks as $track)
        <li><a href="{{ urls()->track($track) }}">{{ $track['name'] }}</a></li>
    @endforeach
@endsection
