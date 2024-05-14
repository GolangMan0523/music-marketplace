<?php

namespace App\Models;

use Common\Core\BaseModel;
use Common\Search\Searchable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BackstageRequest extends BaseModel
{
    const MODEL_TYPE = 'backstageRequest';

    protected $guarded = ['id'];

     protected $casts = [
         'id' => 'integer',
         'user_id' => 'integer',
         'artist_id' => 'integer',
     ];

     public function user(): BelongsTo
     {
         return $this->belongsTo(User::class);
     }

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

     public function getDataAttribute() {
         if ($this->attributes['data']) {
             return json_decode($this->attributes['data'], true);
         }
         return $this->attributes['data'];
     }

    public static function filterableFields(): array
    {
        return [
            'id',
            'type',
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'artist_name' => $this->artist_name,
        ];
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->type,
            'description' => $this->artist_name,
        ];
    }

    public static function getModelTypeAttribute(): string
    {
        return Artist::MODEL_TYPE;
    }
}
