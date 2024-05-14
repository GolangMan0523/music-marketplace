<?php namespace App\Console\Commands;

use App\Models\Playlist;
use App\Models\User;
use Common\Auth\Permissions\Permission;
use Common\Localizations\Localization;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class ResetDemoAdminAccount extends Command
{
    protected $signature = 'demo:reset';
    protected $description = 'Reset admin account';

    public function __construct(
        protected Playlist $playlist,
        protected Localization $localization,
    ) {
        parent::__construct();
    }

    public function handle()
    {
        $admin = User::firstOrCreate([
            'email' => 'admin@admin.com',
        ]);

        $adminPermission = app(Permission::class)
            ->where('name', 'admin')
            ->first();

        $admin->avatar = null;
        $admin->username = null;
        $admin->first_name = null;
        $admin->last_name = null;
        $admin->password = 'admin';
        $admin->permissions()->sync($adminPermission->id);
        $admin->save();

        $admin->likedTracks()->detach();
        $admin->likedAlbums()->detach();
        $admin->likedArtists()->detach();

        $ids = $admin
            ->playlists()
            ->where('owner_id', $admin->id)
            ->select('playlists.id')
            ->pluck('id');
        $this->playlist->whereIn('id', $ids)->delete();
        DB::table('playlist_track')
            ->whereIn('playlist_id', $ids)
            ->delete();
        DB::table('playlist_user')
            ->whereIn('playlist_id', $ids)
            ->delete();

        //delete localizations
        $this->localization->get()->each(function (Localization $localization) {
            if (strtolower($localization->name) !== 'english') {
                $localization->delete();
            }
        });

        Artisan::call('cache:clear');

        $this->info('Demo site reset.');
    }
}
