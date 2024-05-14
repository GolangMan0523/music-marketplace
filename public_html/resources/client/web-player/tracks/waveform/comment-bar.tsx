import {getUserImage} from '@app/web-player/users/user-image';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {useSlider} from '@common/ui/forms/slider/use-slider';
import {useAuth} from '@common/auth/use-auth';
import {useContext} from 'react';
import {Avatar} from '@common/ui/images/avatar';
import clsx from 'clsx';
import {useInteractOutside} from '@react-aria/interactions';
import {CommentBarContext} from '@app/web-player/tracks/waveform/comment-bar-context';
import {Comment} from '@common/comments/comment';
import {Track} from '@app/web-player/tracks/track';

interface CommentBarProps {
  comments: Comment[];
  track: Track;
}
export function CommentBar({comments, track}: CommentBarProps) {
  const {user, hasPermission} = useAuth();
  const {
    newCommentInputRef,
    newCommentPositionRef,
    markerIsVisible,
    setMarkerIsVisible,
    ...commentBarContext
  } = useContext(CommentBarContext);

  const disableCommenting =
    commentBarContext.disableCommenting || !hasPermission('comments.create');

  const {domProps, groupId, trackRef, getThumbPercent} = useSlider({
    onChange: () => {
      setMarkerIsVisible(true);
      newCommentPositionRef.current = getThumbPercent(0) * 100;
    },
    onChangeEnd: () => {
      newCommentInputRef.current?.focus();
    },
  });

  useInteractOutside({
    ref: trackRef,
    onInteractOutside: e => {
      if (!newCommentInputRef.current?.contains(e.target as HTMLElement)) {
        setMarkerIsVisible(false);
      }
    },
  });

  return (
    <div
      className={clsx(
        'absolute top-48 left-0 h-26 w-full isolate',
        !disableCommenting && 'cursor-pointer'
      )}
      ref={trackRef}
      {...(disableCommenting ? {} : domProps)}
      id={groupId}
    >
      {markerIsVisible ? (
        <div
          className="absolute top-0 left-0 z-20 overflow-hidden w-26 h-26 shadow-md -translate-x-1/2 cursor-move"
          style={{left: `${getThumbPercent(0) * 100}%`}}
        >
          <Avatar src={user?.avatar} size="w-full h-full" />
        </div>
      ) : null}
      {comments.map(comment => {
        if (!comment.user) return null;
        return (
          <DialogTrigger key={comment.id} type="popover" triggerOnHover>
            <div
              style={{left: `${Math.min(99, comment.position || 0)}%`}}
              className={clsx(
                'transition-opacity duration-300 ease-in-out absolute top-0 -translate-x-1/2 cursor-pointer',
                markerIsVisible ? 'opacity-40' : 'opacity-100'
              )}
            >
              <div
                className="bg-cover w-16 h-16 rounded shadow bg-chip"
                style={{backgroundImage: `url(${getUserImage(comment.user)})`}}
              />
            </div>
            <CommentDialog comment={comment} />
          </DialogTrigger>
        );
      })}
    </div>
  );
}

interface CommentDialogProps {
  comment: Comment;
}
function CommentDialog({comment}: CommentDialogProps) {
  return (
    <Dialog size="w-auto">
      <DialogBody padding="p-8">
        <div className="flex items-center gap-10">
          {comment.user && (
            <div className="text-primary">{comment.user.display_name}</div>
          )}
          <div>{comment.content}</div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
