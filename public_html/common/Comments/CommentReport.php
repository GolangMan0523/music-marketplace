<?php

namespace Common\Comments;

use Illuminate\Database\Eloquent\Model;

class CommentReport extends Model
{
    protected $guarded = ['id'];
    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'comment_id' => 'integer',
    ];

    const MODEL_TYPE = 'comment_report';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
