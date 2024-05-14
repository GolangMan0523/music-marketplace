import {
  NewCommentForm,
  NewCommentFormProps,
} from '@common/comments/new-comment-form';
import React, {useContext} from 'react';
import {CommentBarContext} from '@app/web-player/tracks/waveform/comment-bar-context';
import {invalidateWaveData} from '@app/web-player/tracks/requests/use-track-wave-data';
import {useAuth} from '@common/auth/use-auth';

export function CommentBarNewCommentForm({
  commentable,
  className,
}: NewCommentFormProps) {
  const {isLoggedIn} = useAuth();
  const {newCommentInputRef, newCommentPositionRef, setMarkerIsVisible} =
    useContext(CommentBarContext);

  if (!isLoggedIn) return null;

  return (
    <NewCommentForm
      inputRef={newCommentInputRef}
      className={className}
      commentable={commentable}
      payload={{position: newCommentPositionRef.current}}
      onSuccess={() => {
        setMarkerIsVisible(false);
        invalidateWaveData(commentable.id);
      }}
    />
  );
}
