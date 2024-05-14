@extends('common::prerender.base')

@section('head')
    @include($seoTagsView ?? 'seo.channel-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $channel->name }}</h1>

    <ul style="display: flex; flex-wrap: wrap">
        @foreach ($channel->content as $item)
            <li>
                @if ($item['model_type'] === 'channel')
                    @foreach ($item->content as $subItem)
                        @include($seoTagsView ?? 'seo.channel-page.channel-content', ['item' => $subItem])
                    @endforeach
                @else
                    @include($seoTagsView ?? 'seo.channel-page.channel-content', ['item' => $item])
                @endif
            </li>
        @endforeach
    </ul>
@endsection
