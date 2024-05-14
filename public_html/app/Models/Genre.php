<?php namespace App\Models;

use App\Traits\OrdersByPopularity;
use Common\Tags\Tag;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Collection;

class Genre extends Tag
{
    use OrdersByPopularity;

    const MODEL_TYPE = 'genre';
    protected $table = 'genres';
    protected $guarded = ['id'];
    protected $hidden = ['pivot'];
    protected $appends = ['model_type'];

    public function artists(): MorphToMany
    {
        return $this->morphedByMany(Artist::class, 'genreable');
    }

    public function tracks(): MorphToMany
    {
        return $this->morphedByMany(Track::class, 'genreable');
    }

    public function albums(): MorphToMany
    {
        return $this->morphedByMany(Album::class, 'genreable');
    }

    public function insertOrRetrieve(
        array|Collection $tags,
        ?string $type = 'custom',
        ?int $userId = null,
    ): Collection {
        // genre tables has no "type" column
        return parent::insertOrRetrieve($tags, null);
    }

    public function toNormalizedArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->display_name ?: $this->name,
            'image' => $this->image,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'display_name' => $this->display_name,
        ];
    }

    public static function filterableFields(): array
    {
        return ['id'];
    }

    public static function getModelTypeAttribute(): string
    {
        return Genre::MODEL_TYPE;
    }
}
