<?php namespace App\Models;

use App\Traits\OrdersByPopularity;
use Carbon\Carbon;
use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;

class Artist extends BaseModel
{
    use OrdersByPopularity, HasFactory, Searchable;

    const MODEL_TYPE = 'artist';

    protected $casts = [
        'id' => 'integer',
        'spotify_popularity' => 'integer',
        'fully_scraped' => 'boolean',
        'verified' => 'boolean',
    ];
    protected $appends = ['model_type'];
    protected $guarded = ['id', 'views'];
    protected $hidden = [
        'pivot',
        'spotify_followers',
        'fully_scraped',
        'updated_at',
        'created_at',
        'spotify_id',
        'spotify_popularity',
        'views',
    ];

    public function albums(): BelongsToMany
    {
        return $this->belongsToMany(Album::class, 'artist_album');
    }

    public function topTracks()
    {
        return $this->belongsToMany(Track::class)
            ->withCount('plays')
            ->orderByPopularity('desc')
            ->with([
                'album',
                'artists' => function (BelongsToMany $builder) {
                    return $builder->select('artists.name', 'artists.id');
                },
            ])
            ->limit(20);
    }

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class)
            ->withCount('plays')
            ->orderByPopularity('desc')
            ->with([
                'album',
                'artists' => function (BelongsToMany $builder) {
                    return $builder->select('artists.name', 'artists.id');
                },
            ]);
    }

    public function similar()
    {
        return $this->belongsToMany(
            Artist::class,
            'similar_artists',
            'artist_id',
            'similar_id',
        )
            ->select(['artists.id', 'name', 'image_small'])
            ->orderByPopularity('desc');
    }

    public function genres(): MorphToMany
    {
        return $this->morphToMany(Genre::class, 'genreable')->select(
            'genres.name',
            'genres.id',
            'genres.display_name',
        );
    }

    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    public function profileImages(): HasMany
    {
        return $this->hasMany(ProfileImage::class);
    }

    public function links()
    {
        return $this->morphMany(ProfileLink::class, 'linkeable');
    }

    public function followers()
    {
        return $this->morphToMany(
            User::class,
            'likeable',
            'likes',
        )->withTimestamps();
    }

    public function likes(): BelongsToMany
    {
        return $this->morphToMany(
            User::class,
            'likeable',
            'likes',
        )->withTimestamps();
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image_small,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'spotify_id' => $this->spotify_id,
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'spotify_id'];
    }

    public function needsUpdating(): bool
    {
        if (!$this->exists || !$this->spotify_id) {
            return false;
        }
        if (settings('artist_provider') !== 'spotify') {
            return false;
        }
        if (!$this->fully_scraped) {
            return true;
        }

        $updateInterval = (int) settings('automation.artist_interval', 7);

        // 0 means that artist should never be updated from 3rd party sites
        if ($updateInterval === 0) {
            return false;
        }

        return !$this->updated_at ||
            $this->updated_at->addDays($updateInterval) <= Carbon::now();
    }

    public static function getModelTypeAttribute(): string
    {
        return Artist::MODEL_TYPE;
    }
}
