<?php namespace App\Http\Controllers\UserLibrary;

use App\Models\User;
use Auth;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;

class UserLibraryAlbumsController extends BaseController
{
    public function index(User $user = null)
    {
        $user = $user ?? Auth::user();

        $this->authorize('show', $user);

        $builder = $user
            ->likedAlbums()
            ->with('artists')
            ->limit(30);

        $params = request()->all();
        $params['orderBy'] = request()->get('orderBy', 'likes.created_at');
        $params['orderDir'] = request()->get('orderDir', 'desc');

        $pagination = (new Datasource($builder, $params))->paginate();

        return $this->success(['pagination' => $pagination]);
    }
}
