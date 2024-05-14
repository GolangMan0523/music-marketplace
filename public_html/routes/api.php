<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\Artist\ArtistFollowersController;
use App\Http\Controllers\Artist\ArtistTracksController;
use App\Http\Controllers\ArtistAlbumsController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\BackstageRequestController;
use App\Http\Controllers\DownloadLocalTrackController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ImportMediaController;
use App\Http\Controllers\InsightsReportController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\LyricsController;
use App\Http\Controllers\MinutesLimitController;
use App\Http\Controllers\PlayerTracksController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistTracksController;
use App\Http\Controllers\PlaylistTracksOrderController;
use App\Http\Controllers\RadioController;
use App\Http\Controllers\RepostController;
use App\Http\Controllers\Search\AlbumSearchSuggestionsController;
use App\Http\Controllers\Search\ArtistSearchSuggestionsController;
use App\Http\Controllers\Search\SearchController;
use App\Http\Controllers\TagMediaController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\TrackFileMetadataController;
use App\Http\Controllers\TrackPlaysController;
use App\Http\Controllers\UserLibrary\UserLibraryAlbumsController;
use App\Http\Controllers\UserLibrary\UserLibraryArtistsController;
use App\Http\Controllers\UserLibrary\UserLibraryTracksController;
use App\Http\Controllers\UserProfile\UserPlaylistsController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\WaveController;
use App\Http\Controllers\YoutubeLogController;
use Common\Auth\Controllers\UserFollowedUsersController;
use Common\Auth\Controllers\UserFollowersController;
use Common\Channels\ChannelController;

Route::group(['prefix' => 'v1', 'middleware' => ['optionalAuth:sanctum', 'verified']], function() {
    // SEARCH
    Route::get('search/audio/{trackId}/{artistName}/{trackName}', [SearchController::class, 'searchAudio']);
    Route::get('search', [SearchController::class, 'index']);
    Route::get('search/model/{modelType}', [SearchController::class, 'searchSingleModelType']);
    Route::get('search/suggestions/artist', [ArtistSearchSuggestionsController::class, 'index']);
    Route::get('search/suggestions/artist/{id}', [ArtistSearchSuggestionsController::class, 'show']);
    Route::get('search/suggestions/album', [AlbumSearchSuggestionsController::class, 'index']);
    Route::get('search/suggestions/album/{id}', [AlbumSearchSuggestionsController::class, 'show']);

    // CHANNELS
    Route::post('channel/{channel}/update-content', [ChannelController::class, 'updateContent']);
    Route::get('channel/search-for-addable-content', [ChannelController::class, 'searchForAddableContent']);
    Route::post('channel/reset-to-default', [ChannelController::class, 'resetToDefault']);
    Route::apiResource('channel', '\Common\Channels\ChannelController')->except(['destroy']);
    Route::delete('channel/{ids}', [ChannelController::class, 'destroy']);

    // PLAYLISTS
    Route::get('playlists/{id}', [PlaylistController::class, 'show']);
    Route::get('playlists', [PlaylistController::class, 'index']);
    Route::put('playlists/{playlist}', [PlaylistController::class, 'update']);
    Route::post('playlists', [PlaylistController::class, 'store']);
    Route::delete('playlists/{ids}', [PlaylistController::class, 'destroy']);
    Route::post('playlists/{id}/follow', [UserPlaylistsController::class, 'follow']);
    Route::post('playlists/{id}/unfollow', [UserPlaylistsController::class, 'unfollow']);
    Route::get('playlists/{id}/tracks', [PlaylistTracksController::class, 'index']);
    Route::post('playlists/{id}/tracks/add', [PlaylistTracksController::class, 'add']);
    Route::post('playlists/{id}/tracks/remove', [PlaylistTracksController::class, 'remove']);
    Route::post('playlists/{playlist}/tracks/order', [PlaylistTracksOrderController::class, 'change']);

    // ARTISTS
    Route::get('artists', [ArtistController::class, 'index']);
    Route::post('artists', [ArtistController::class, 'store']);
    Route::put('artists/{artist}', [ArtistController::class, 'update']);
    Route::get('artists/{artist}', [ArtistController::class, 'show']);
    Route::delete('artists/{ids}', [ArtistController::class, 'destroy']);
    Route::get('artists/{artist}/tracks', [ArtistTracksController::class, 'index']);
    Route::get('artists/{artist}/albums', [ArtistAlbumsController::class, 'index']);
    Route::get('artists/{artist}/followers', [ArtistFollowersController::class, 'index']);

    // ALBUMS
    Route::get('albums', [AlbumController::class, 'index']);
    Route::get('albums/{album}', [AlbumController::class, 'show']);
    Route::post('albums', [AlbumController::class, 'store']);
    Route::put('albums/{album}', [AlbumController::class, 'update']);
    Route::delete('albums/{ids}', [AlbumController::class, 'destroy']);

    // TRACKS
    Route::get('tracks/{track}/wave', [WaveController::class, 'show']);
    Route::get('tracks', [TrackController::class, 'index']);
    Route::get('tracks/{id}/download', [DownloadLocalTrackController::class, 'download']);
    Route::post('tracks', [TrackController::class, 'store']);
    Route::put('tracks/{id}', [TrackController::class, 'update']);
    Route::get('tracks/{track}', [TrackController::class, 'show']);
    Route::delete('tracks/{ids}', [TrackController::class, 'destroy']);
    Route::post('tracks/{fileEntry}/extract-metadata', [TrackFileMetadataController::class, 'extract']);

    // TRACK PLAYS
    Route::post('player/tracks', [PlayerTracksController::class, 'index']);
    Route::get('tracks/plays/{userId}', [TrackPlaysController::class, 'index']);
    Route::post('tracks/plays/{track}/log', [TrackPlaysController::class, 'create']);

    // LYRICS
    Route::get('lyrics', [LyricsController::class, 'index']);
    Route::post('lyrics', [LyricsController::class, 'store']);
    Route::delete('lyrics/{ids}', [LyricsController::class, 'destroy']);
    Route::get('tracks/{id}/lyrics', [LyricsController::class, 'show']);
    Route::put('lyrics/{id}', [LyricsController::class, 'update']);

    // RADIO
    Route::get('radio/{type}/{id}', [RadioController::class, 'getRecommendations']);

    // TAGS
    Route::get('tags/{tagName}/tracks', [TagMediaController::class, 'tracks']);
    Route::get('tags/{tagName}/albums', [TagMediaController::class, 'albums']);

    // GENRES
    Route::get('genres', [GenreController::class, 'index']);
    Route::post('genres', [GenreController::class, 'store']);
    Route::put('genres/{id}', [GenreController::class, 'update']);
    Route::delete('genres/{ids}', [GenreController::class, 'destroy']);
    Route::get('genres/{name}', [GenreController::class, 'show']);

    // USER PROFILE
    Route::get('user-profile/{user}', [UserProfileController::class, 'show'])->withoutMiddleware('verified');
    Route::get('users/{user}/minutes-left', MinutesLimitController::class);
    Route::get('users/{user}/liked-tracks', [UserLibraryTracksController::class, 'index']);
    Route::get('users/{user}/liked-albums', [UserLibraryAlbumsController::class, 'index']);
    Route::get('users/{user}/liked-artists', [UserLibraryArtistsController::class, 'index']);
    Route::get('users/{user}/playlists', [UserPlaylistsController::class, 'index']);
    Route::get('users/{user}/followers', [UserFollowersController::class, 'index']);
    Route::get('users/{user}/followed-users', [UserFollowedUsersController::class, 'index']);
    Route::put('users/profile/update', [UserProfileController::class, 'update']);
    Route::post('users/me/add-to-library', [UserLibraryTracksController::class, 'addToLibrary']);
    Route::post('users/me/remove-from-library', [UserLibraryTracksController::class, 'removeFromLibrary']);

    // USER FOLLOWERS
    Route::post('users/{id}/follow', [UserFollowersController::class, 'follow']);
    Route::post('users/{id}/unfollow', [UserFollowersController::class, 'unfollow']);

    // REPOSTS
    Route::get('users/{user}/reposts', [RepostController::class, 'index']);
    Route::post('reposts/toggle', [RepostController::class, 'toggle']);

    // BACKSTAGE REQUESTS
    Route::post('backstage-request/{backstageRequest}/approve', [BackstageRequestController::class, 'approve']);
    Route::post('backstage-request/{backstageRequest}/deny', [BackstageRequestController::class, 'deny']);
    Route::apiResource('backstage-request', BackstageRequestController::class);

    // REPORTS
    Route::get('reports/insights', InsightsReportController::class);

    // YOUTUBE
    Route::post('youtube/log-client-error', [YoutubeLogController::class, 'store']);

    // IMPORT
    Route::post('import-media/single-item', [ImportMediaController::class, 'import']);

    // LANDING
    Route::get('landing/artists', [LandingPageController::class, 'artists']);
});


