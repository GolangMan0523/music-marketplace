<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Repost extends Model
{
    protected $guarded = ['id'];

    public function repostable(): BelongsTo
    {
        return $this->morphTo()
            ->withCount('likes', 'reposts');
    }

//    public function getRepostableTypeAttribute($value)
//    {
//        if ($value === Album::class) {
//            return AlbumWithTracks::class;
//        } else {
//            return $value;
//        }
//    }
}
