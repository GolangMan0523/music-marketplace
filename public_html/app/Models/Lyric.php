<?php

namespace App\Models;

use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Str;

class Lyric extends BaseModel
{
    const MODEL_TYPE = 'lyric';

    protected $guarded = ['id'];

    protected $casts = [
        'id' => 'integer',
        'track_id' => 'integer',
        'is_synced' => 'boolean',
        'duration' => 'integer',
    ];

    public function track(): BelongsTo
    {
        return $this->belongsTo(Track::class);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
        ];
    }

    public static function filterableFields(): array
    {
        return ['id'];
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'description' => Str::limit($this->text),
        ];
    }
}
