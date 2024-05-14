<?php namespace App\Models;

use App\Traits\OrdersByPopularity;
use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;
use Str;

class Playlist extends BaseModel
{
    use OrdersByPopularity, Searchable;

    const MODEL_TYPE = 'playlist';

    protected $guarded = ['id', 'owner_id'];
    protected $hidden = [
        'pivot',
        'updated_at',
        'spotify_id',
        'description',
        'views',
    ];
    protected $appends = ['model_type'];

    protected $casts = [
        'id' => 'integer',
        'owner_id' => 'integer',
        'public' => 'boolean',
        'collaborative' => 'boolean',
    ];

    public function getImageAttribute($value)
    {
        if (!$value || Str::contains($value, 'images/default')) {
            return null;
        }
        return $value;
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function editors(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->where('editor', true)
            ->withPivotValue(['editor' => true])
            ->compact();
    }

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class);
    }

    public function scopeCompact(Builder $query): Builder
    {
        return $query->select(
            'playlists.id',
            'playlists.name',
            'playlists.collaborative',
            'playlists.owner_id',
        );
    }

    public function toNormalizedArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'description' => $this->description,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
        ];
    }

    public function shouldBeSearchable(): bool
    {
        return $this->exists && $this->public;
    }

    public static function filterableFields(): array
    {
        return ['id'];
    }

    public static function getModelTypeAttribute(): string
    {
        return Playlist::MODEL_TYPE;
    }
}
