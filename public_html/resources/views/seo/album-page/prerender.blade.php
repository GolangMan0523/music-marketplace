@extends('common::prerender.base')

@section('head')
    @include($seoTagsView ?? 'seo.album-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $album->name }}</h1>

    <p>"{{ $album->name }} album by {{$album->artists->first()?->name}} on {{ settings('branding.site_name') }}"</p>

    @if ($album->image) {
        <img src="{{urls()->image($album->image)}}" alt="">
    @endif

    <p>{{__('Release Date')}}: {{$album->release_date}}</p>

    @foreach($album->tracks as $track)
        <li><a href="{{ urls()->track($track) }}">{{ $track['name'] }}</a></li>
    @endforeach
@endsection
