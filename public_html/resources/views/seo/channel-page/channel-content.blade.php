@if ($item['model_type'] === 'artist')
    <figure>
        <img
            src="{{ $item['image_small'] }}"
            alt="{{ $item['name'] }} poster"
            width="270px"
        />
        <figcaption>
            <a href="{{ urls()->artist($item) }}">
                {{ $item['name'] }}
            </a>
        </figcaption>
    </figure>
@elseif($item['model_type'] === 'album')
    <div>
        <h2><a href="{{urls()->album($item)}}">{{$item['name']}}</a></h2>
        @if(isset($item['artists'][0]))
            <h3><a href="{{urls()->artist($item['artists'][0])}}">{{$item['artists'][0]['name']}}</a></h3>
        @endif
        @if(isset($item['image']))
            <img src="{{urls()->image($item['image'])}}" alt="Album image">
        @endif
    </div>
@elseif($item['model_type'] === 'track')
    <div>
        <h2><a href="{{urls()->track($item)}}">{{$item['name']}}</a></h2>
        @if(isset($item['artists'][0]))
            <h3><a href="{{urls()->artist($item['artists'][0])}}">{{$item['artists'][0]['name']}}</a></h3>
        @endif
        @if($image = $item['album']['image'] ?? $item['image'] ?? null)
            <img src="{{urls()->image($image)}}" alt="Track image">
        @endif
    </div>
@elseif($item['model_type'] === 'genre')
    <div>
        <h2><a href="{{urls()->genre($item)}}">{{$item['name']}}</a></h2>
        @if($item['image'])
            <img src="{{urls()->image($item['image'])}}" alt="Track image">
        @endif
    </div>
@elseif($item['model_type'] === 'playlist')
    <div>
        <h2><a href="{{urls()->playlist($item)}}">{{$item['name']}}</a></h2>
        @if(isset($item['users'][0]))
            <h3><a href="{{urls()->user($item['users'][0])}}">{{$item['users'][0]['display_name']}}</a></h3>
        @endif
        @if($item['image'])
            <img src="{{urls()->image($item['image'])}}" alt="Playlist image">
        @endif
    </div>
@elseif($item['model_type'] === 'user')
    <div>
        <h2><a href="{{urls()->user($item)}}">{{$item['display_name']}}</a></h2>
        @if($item['avatar'])
            <img src="{{urls()->image($item['avatar'])}}" alt="User image">
        @endif
    </div>
@endif
