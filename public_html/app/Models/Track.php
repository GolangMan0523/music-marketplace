<?php namespace App\Models;

use App\Traits\OrdersByPopularity;
use Common\Comments\Comment;
use Common\Core\BaseModel;
use Common\Tags\Tag;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;

class Track extends BaseModel
{
    use OrdersByPopularity, HasFactory, Searchable;

    const MODEL_TYPE = 'track';

    protected $guarded = ['id', 'formatted_duration', 'plays', 'lyric'];

    protected $hidden = [
        'fully_scraped',
        'temp_id',
        'album_id',
        'spotify_id',
        'updated_at',
        'user_id',
        'description',
    ];

    protected $casts = [
        'id' => 'integer',
        'album_id' => 'integer',
        'number' => 'integer',
        'spotify_popularity' => 'integer',
        'duration' => 'integer',
        'position' => 'integer',
        'added_at' => 'datetime',
    ];

    protected $appends = ['model_type'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        if (!requestIsFromFrontend()) {
            $this->hidden[] = 'src';
            $this->hidden[] = 'spotify_popularity';
        }
    }

    public function likes(): BelongsToMany
    {
        return $this->morphToMany(
            User::class,
            'likeable',
            'likes',
        )->withTimestamps();
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable')->orderBy(
            'created_at',
            'desc',
        );
    }

    public function reposts(): MorphMany
    {
        return $this->morphMany(Repost::class, 'repostable');
    }

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }

    public function artists(): BelongsToMany
    {
        return $this->belongsToMany(Artist::class)->select([
            'artists.id',
            'artists.name',
            'artists.image_small',
        ]);
    }

    public function plays(): HasMany
    {
        return $this->hasMany(TrackPlay::class);
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->select(
            'tags.name',
            'tags.display_name',
            'tags.id',
        );
    }

    public function genres(): MorphToMany
    {
        return $this->morphToMany(Genre::class, 'genreable')->select(
            'genres.name',
            'genres.display_name',
            'genres.id',
            'genres.image',
        );
    }

    public function playlists(): BelongsToMany
    {
        return $this->belongsToMany(Playlist::class)->withPivot('position');
    }

    public function lyric(): HasOne
    {
        return $this->hasOne(Lyric::class);
    }

    protected function src(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                $endpoint = config('common.site.file_preview_endpoint');
                if (
                    $value &&
                    $endpoint &&
                    str_contains($value, 'storage/track_media') &&
                    str_contains($value, 'https://')
                ) {
                    return preg_replace(
                        '/https:\/\/.*?(\/storage\/track_media\/(.+?\.[a-z0-9]+))/',
                        "$endpoint$1",
                        $value,
                    );
                }
                return $value;
            },
        );
    }

    public function srcIsLocal(): bool
    {
        return $this->getSourceFileEntryId() !== null;
    }

    public function getSourceFileEntryId(): ?string
    {
        if (!$this->exists || !$this->src) {
            return null;
        }
        preg_match(
            '/.*?\/?storage\/track_media\/(.+?\.[a-z0-9]+)/',
            $this->src,
            $matches,
        );
        return $matches[1] ?? null;
    }

    public function getWaveStorageDisk(): Filesystem
    {
        return Storage::disk(config('common.site.wave_storage_disk'));
    }

    public function toNormalizedArray(): array
    {
        $image = $this->image;
        if (!$image && $this->relationLoaded('album')) {
            $image = $this->album?->image;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $image,
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
            'album' => $this->album?->name,
            'spotify_id' => $this->spotify_id,
            'artists' => $this->artists->pluck('name'),
            'tags' => $this->tags->pluck('display_name'),
        ];
    }

    protected function makeAllSearchableUsing($query)
    {
        return $query->with(['artists', 'album']);
    }

    public static function filterableFields(): array
    {
        return ['id', 'spotify_id'];
    }

    public static function getModelTypeAttribute(): string
    {
        return Track::MODEL_TYPE;
    }
}
