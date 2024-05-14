<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Like extends Model
{
    const UPDATED_AT = null;
    protected $guarded = ['id'];
    protected $casts = ['user_id' => 'int', 'likeable_id' => 'int'];

    public function track(): MorphOne
    {
        return $this->morphOne(Track::class, 'likeable');
    }
}
