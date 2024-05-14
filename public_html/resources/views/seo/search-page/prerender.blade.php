@extends('common::prerender.base')

@section('head')
    @include($seoTagsView ?? 'seo.search-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $album->name }}</h1>

    <h2>{{__('Artists')}}</h2>
    <ul class="artists">
        @foreach($results['artists'] as $artist)
            <li>
                <figure>
                    <img src="{{$artist['image_small']}}">
                    <figcaption><a href="{{urls()->artist($artist)}}">{{$artist['name']}}</a></figcaption>
                </figure>
            </li>
        @endforeach
    </ul>

    <h2>{{__('Albums')}}</h2>
    <ul class="albums">
        @foreach($results['albums'] as $album)
            <li>
                <figure>
                    <img src="{{$album['image']}}">
                    <figcaption><a href="{{urls()->album($album)}}">{{$album['name']}}</a></figcaption>
                </figure>
            </li>
        @endforeach
    </ul>

    <h2>{{__('Tracks')}}</h2>
    <ul class="tracks">
        @foreach($results['tracks'] as $track)
            @isset($track['album'])
                <li>
                    <figure>
                        <img src="{{$album['album']['image']}}">
                        <figcaption>
                            <a href="{{urls()->track($track)}}">{{$track['name']}}</a> by
                            <a href="{{urls()->artist($track['album']['artist'])}}">{{$track['album']['artist']['name']}}</a>
                        </figcaption>
                    </figure>
                </li>
            @endisset
        @endforeach
    </ul>

    <h2>{{__('Playlists')}}</h2>
    <ul class="playlists">
        @foreach($results['playlists'] as $playlist)
            <li>
                <figure>
                    <img src="{{$playlist['image']}}">
                    <figcaption><a href="{{urls()->playlist($playlist)}}">{{$playlist['name']}}</a></figcaption>
                </figure>
            </li>
        @endforeach
    </ul>

    <h2>{{__('Users')}}</h2>
    <ul class="users">
        @foreach($results['users'] as $user)
            <li>
                <figure>
                    <img src="{{$user['avatar']}}">
                    <figcaption><a href="{{urls()->user($user)}}">{{$user['display_name']}}</a></figcaption>
                </figure>
            </li>
        @endforeach
    </ul>
@endsection
