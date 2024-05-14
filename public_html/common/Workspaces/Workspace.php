<?php

namespace Common\Workspaces;

use App\Models\User;
use App\Workspaces\WorkspaceRelationships;
use Auth;
use Common\Core\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workspace extends BaseModel
{
    use WorkspaceRelationships, HasFactory;

    const MODEL_TYPE = 'workspace';

    protected $guarded = ['id'];

    protected $casts = [
        'id' => 'integer',
        'owner_id' => 'integer',
    ];

    public function invites(): HasMany
    {
        return $this->hasMany(WorkspaceInvite::class)
            ->join('roles', 'roles.id', '=', 'workspace_invites.role_id')
            ->select([
                'workspace_invites.id',
                'workspace_invites.workspace_id',
                'roles.name as role_name',
                'workspace_invites.email',
                'workspace_invites.role_id',
                'email',
                'avatar',
            ]);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id')->select([
            'id',
            'email',
            'first_name',
            'last_name',
            'avatar',
        ]);
    }

    public function members()
    {
        return $this->hasMany(WorkspaceMember::class)
            ->join('roles', 'roles.id', '=', 'workspace_user.role_id', 'left')
            ->join('users', 'users.id', '=', 'workspace_user.user_id')
            ->select([
                'roles.name as role_name',
                'users.email',
                'workspace_user.workspace_id',
                'workspace_user.created_at as joined_at',
                'workspace_user.role_id',
                'workspace_user.is_owner',
                'workspace_user.id as member_id',
                'users.id',
                'users.first_name',
                'users.last_name',
                'users.avatar',
            ]);
    }

    public function isMember(User $user): bool
    {
        return $this->members()
            ->where('user_id', $user->id)
            ->exists();
    }

    public function isOwner(User $user): bool
    {
        return $this->owner_id === $user->id;
    }

    public function findMember(User $user): WorkspaceMember
    {
        return $this->members()
            ->where('user_id', $user->id)
            ->first();
    }

    public function scopeForUser(Builder $builder, int $userId): Builder
    {
        return $builder
            ->where('owner_id', $userId)
            ->orWhereHas('members', function (Builder $builder) use ($userId) {
                return $builder->where('workspace_user.user_id', $userId);
            });
    }

    public function setCurrentUserAndOwner(): self
    {
        $this->setRelation(
            'owner',
            $this->members->where('is_owner', true)->first(),
        );
        $this->currentUser = $this->members->where('id', Auth::id())->first();
        $this->unsetRelation('members');

        // load workspace permissions for current user in case front-end needs it
        if (
            app(ActiveWorkspace::class)->id === $this->id &&
            $this->currentUser &&
            !$this->currentUser->relationLoaded('permissions')
        ) {
            $this->currentUser->load('permissions');
        }

        return $this;
    }

    public function toNormalizedArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'model_type' => self::MODEL_TYPE,
        ];
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => $this->created_at->timestamp ?? '_null',
            'updated_at' => $this->updated_at->timestamp ?? '_null',
        ];
    }

    public static function filterableFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }

    protected static function newFactory(): WorkspaceFactory
    {
        return WorkspaceFactory::new();
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }
}
