<?php namespace App\Models;

use App\Traits\OrdersByPopularity;
use Common\Comments\Comment;
use Common\Core\BaseModel;
use Common\Settings\Settings;
use Common\Tags\Tag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;

class Album extends BaseModel
{
    use OrdersByPopularity, HasFactory, Searchable;

    const MODEL_TYPE = 'album';

    protected $casts = [
        'id' => 'integer',
        'fully_scraped' => 'boolean',
        'spotify_popularity' => 'integer',
        'owner_id' => 'integer',
        'plays' => 'integer',
        'views' => 'integer',
        'release_date' => 'date',
    ];

    protected $guarded = ['id', 'views'];
    protected $hidden = [
        'artist_type',
        'pivot',
        'fully_scraped',
        'temp_id',
        'artist_id',
        'views',
        'spotify_id',
        'description',
        'updated_at',
    ];
    protected $appends = ['model_type'];

    public function artists(): BelongsToMany
    {
        return $this->belongsToMany(Artist::class, 'artist_album')
            ->select(['artists.id', 'artists.name', 'artists.image_small'])
            ->orderBy('artist_album.primary', 'desc');
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->orderBy(
            'created_at',
            'desc',
        );
    }

    /**
     * @return MorphMany
     */
    public function reposts()
    {
        return $this->morphMany(Repost::class, 'repostable');
    }

    /**
     * @return BelongsToMany
     */
    public function likes()
    {
        return $this->morphToMany(
            User::class,
            'likeable',
            'likes',
        )->withTimestamps();
    }

    public function tracks(): HasMany
    {
        return $this->hasMany(Track::class, 'album_id')->orderBy('number');
    }

    /**
     * @return HasManyThrough
     */
    public function plays()
    {
        return $this->hasManyThrough(TrackPlay::class, Track::class);
    }

    /**
     * @return MorphToMany
     */
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')->select(
            'tags.name',
            'tags.display_name',
            'tags.id',
        );
    }

    /**
     * @return MorphToMany
     */
    public function genres()
    {
        return $this->morphToMany(Genre::class, 'genreable')->select(
            'genres.name',
            'genres.id',
        );
    }

    public function needsUpdating(): bool
    {
        if (!$this->exists || !$this->spotify_id) {
            return false;
        }
        if (settings('album_provider') !== 'spotify') {
            return false;
        }

        if (!$this->fully_scraped) {
            return true;
        }
        if (!$this->tracks || $this->tracks->isEmpty()) {
            return true;
        }

        return false;
    }

    public function addPopularityToTracks()
    {
        $settings = app(Settings::class);
        $highestPlaysCount = $this->tracks->pluck('plays')->max();

        $this->tracks->map(function (Track $track) use (
            $highestPlaysCount,
            $settings,
        ) {
            if ($settings->get('artist_provider') === 'spotify') {
                $track->popularity = $track->spotify_popularity ?: 50;
            } elseif ($highestPlaysCount) {
                $track->popularity = $track->plays / ($highestPlaysCount / 100);
            } else {
                $track->popularity = 50;
            }
            return $track;
        });
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'description' => $this->relationLoaded('artists')
                ? $this->artists->pluck('name')->implode(', ')
                : null,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'spotify_id' => $this->spotify_id,
            'artists' => $this->artists->pluck('name'),
            'tags' => $this->tags->pluck('display_name'),
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'spotify_id'];
    }

    protected function makeAllSearchableUsing($query)
    {
        return $query->with('artists');
    }

    public static function getModelTypeAttribute(): string
    {
        return Album::MODEL_TYPE;
    }
}
