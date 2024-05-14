<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(ActiveSessionsSeeder::class);
        $this->call(AlbumsSeeder::class);
        $this->call(ArtistsSeeder::class);
        $this->call(ArtistAlbumSeeder::class);
        $this->call(ArtistBiosSeeder::class);
        $this->call(ArtistTrackSeeder::class);
        $this->call(BackstageRequestsSeeder::class);
        $this->call(BansSeeder::class);
        $this->call(BillingPlansSeeder::class);
        $this->call(ChannelablesSeeder::class);
        $this->call(ChannelsSeeder::class);
        $this->call(CommentsSeeder::class);
        $this->call(CommentReportsSeeder::class);
        $this->call(CommentVotesSeeder::class);
        $this->call(CssThemesSeeder::class);
        $this->call(CsvExportsSeeder::class);
        $this->call(CustomDomainsSeeder::class);
        $this->call(CustomPagesSeeder::class);
        $this->call(DefaultChannelsSeeder::class);
        $this->call(FailedJobsSeeder::class);
        $this->call(FileEntriesSeeder::class);
        $this->call(FileEntryModelsSeeder::class);
        $this->call(FollowsSeeder::class);
        $this->call(GenreablesSeeder::class);
        $this->call(GenresSeeder::class);
        $this->call(InvoicesSeeder::class);
        $this->call(JobsSeeder::class);
        $this->call(LikesSeeder::class);
        $this->call(LocalizationsSeeder::class);
        $this->call(LyricsSeeder::class);
        $this->call(MigrationsSeeder::class);
        $this->call(NotificationsSeeder::class);
        $this->call(NotificationSubscriptionsSeeder::class);
        $this->call(PasswordResetsSeeder::class);
        $this->call(PermissionablesSeeder::class);
        $this->call(PermissionsSeeder::class);
        $this->call(PersonalAccessTokensSeeder::class);
        $this->call(PlaylistsSeeder::class);
        $this->call(PlaylistTrackSeeder::class);
        $this->call(PlaylistUserSeeder::class);
        $this->call(PricesSeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(ProfileImagesSeeder::class);
        $this->call(ProfileLinksSeeder::class);
        $this->call(RepostsSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(SettingsSeeder::class);
        $this->call(SimilarArtistsSeeder::class);
        $this->call(SocialProfilesSeeder::class);
        $this->call(SubscriptionsSeeder::class);
        $this->call(TaggablesSeeder::class);
        $this->call(TagsSeeder::class);
        $this->call(TracksSeeder::class);
        $this->call(TrackPlaysSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(UsersOauthSeeder::class);
        $this->call(UserArtistSeeder::class);
        $this->call(UserProfilesSeeder::class);
        $this->call(UserRoleSeeder::class);
        $this->call(WorkspacesSeeder::class);
        $this->call(WorkspaceInvitesSeeder::class);
        $this->call(WorkspaceUserSeeder::class);
    }
}