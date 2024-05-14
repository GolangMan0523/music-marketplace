import {useFieldArray, useFormContext} from 'react-hook-form';
import {
  CreateAlbumPayload,
  CreateAlbumPayloadTrack,
} from '@app/admin/albums-datatable-page/requests/use-create-album';
import React, {useRef} from 'react';
import {useFileUploadStore} from '@common/uploads/uploader/file-upload-provider';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {FileUploadIcon} from '@common/icons/material/FileUpload';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {IconButton} from '@common/ui/buttons/icon-button';
import {AddIcon} from '@common/icons/material/Add';
import {DragHandleIcon} from '@common/icons/material/DragHandle';
import {EditIcon} from '@common/icons/material/Edit';
import {CloseIcon} from '@common/icons/material/Close';
import {ProgressCircle} from '@common/ui/progress/progress-circle';
import {TrackUploadStatusText} from '@app/admin/tracks-datatable-page/track-form/track-upload-status-text';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {UpdateTrackDialog} from '@app/admin/tracks-datatable-page/track-form/update-track-dialog';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import musicImage from '@app/admin/tracks-datatable-page/music.svg';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {CreateTrackDialog} from '@app/admin/tracks-datatable-page/track-form/create-track-dialog';
import {DragPreviewRenderer} from '@common/ui/interactions/dnd/use-draggable';
import {DragPreview} from '@common/ui/interactions/dnd/drag-preview';
import {CreateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-create-track';
import {
  hydrateAlbumForm,
  mergeTrackFormValues,
} from '@app/admin/tracks-datatable-page/requests/use-extract-track-file-metadata';
import {useTrackUploader} from '@app/web-player/backstage/upload-page/use-track-uploader';
import {useTrackUpload} from '@app/web-player/backstage/upload-page/use-track-upload';
import {UpdateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-update-track';
import {useSortable} from '@common/ui/interactions/dnd/sortable/use-sortable';

export function AlbumTracksForm() {
  const form = useFormContext<CreateAlbumPayload>();
  const {watch, setValue, getValues} = form;
  const {fields, remove, prepend, move} = useFieldArray({
    name: 'tracks',
  });

  const updateTrack = (
    uploadId: string,
    newValues: Partial<CreateTrackPayload>,
  ) => {
    const index = getValues('tracks')?.findIndex(f => f.uploadId === uploadId);
    if (index != null) {
      setValue(
        `tracks.${index}`,
        mergeTrackFormValues(newValues, getValues(`tracks.${index}`)),
        {shouldDirty: true},
      );
    }
  };

  const {openFilePicker} = useTrackUploader({
    onUploadStart: data =>
      prepend(
        // newly uploaded track should inherit album artists, genres and tags
        mergeTrackFormValues(data, {
          artists: form.getValues('artists'),
          genres: form.getValues('genres'),
          tags: form.getValues('tags'),
        }),
      ),
    onMetadataChange: (file, newData) => {
      hydrateAlbumForm(form, newData);
      updateTrack(file.id, newData);
    },
  });

  const tracks = watch('tracks') || [];

  return (
    <div>
      <div className="flex items-center gap-12">
        <h2 className="my-24 text-xl font-semibold">
          <Trans message="Tracks" />
        </h2>
        <Button
          variant="outline"
          color="primary"
          size="xs"
          className="ml-auto"
          startIcon={<FileUploadIcon />}
          onClick={() => openFilePicker()}
        >
          <Trans message="Upload tracks" />
        </Button>
        <DialogTrigger
          type="modal"
          onClose={newTrack => {
            if (newTrack) {
              prepend(newTrack);
            }
          }}
        >
          <Tooltip label={<Trans message="Create track" />}>
            <IconButton variant="outline" color="primary" size="xs">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <CreateTrackDialog
            hideAlbumField
            defaultValues={{
              artists: watch('artists'),
              tags: watch('tags'),
              genres: watch('genres'),
            }}
          />
        </DialogTrigger>
      </div>
      {fields.map((field, index) => {
        const track = tracks[index];
        return (
          <TrackItem
            key={field.id}
            track={track}
            onRemove={() => remove(index)}
            onSort={(oldIndex, newIndex) => move(oldIndex, newIndex)}
            tracks={tracks}
            onUpdate={newValues => {
              updateTrack(track.uploadId, newValues);
            }}
          />
        );
      })}

      {!fields.length ? (
        <IllustratedMessage
          className="mt-40"
          image={<SvgImage src={musicImage} />}
          title={<Trans message="This album does not have any tracks yet" />}
        />
      ) : null}
    </div>
  );
}

interface TrackItemProps {
  track: CreateAlbumPayloadTrack;
  tracks: CreateAlbumPayloadTrack[];
  onRemove: () => void;
  onUpdate: (updatedTrack: UpdateTrackPayload | CreateTrackPayload) => void;
  onSort: (oldIndex: number, newIndex: number) => void;
}
function TrackItem({
  track,
  tracks,
  onRemove,
  onUpdate,
  onSort,
}: TrackItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<DragPreviewRenderer>(null);

  const abortUpload = useFileUploadStore(s => s.abortUpload);
  const activeUpload = useFileUploadStore(s => {
    return track.uploadId ? s.fileUploads.get(track.uploadId) : null;
  });
  const {isUploading, status} = useTrackUpload(track.uploadId);

  const {sortableProps} = useSortable({
    disabled: isUploading,
    ref,
    item: track,
    items: tracks,
    type: 'albumFormTrack',
    preview: previewRef,
    strategy: 'line',
    onSortEnd: (oldIndex, newIndex) => {
      onSort(oldIndex, newIndex);
    },
  });

  return (
    <div
      className="border-b border-t border-t-transparent py-4"
      ref={ref}
      {...sortableProps}
    >
      <div className="flex items-center text-sm">
        <IconButton className="mr-14 flex-shrink-0" disabled={isUploading}>
          <DragHandleIcon />
        </IconButton>
        <div className="flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.name}
        </div>
        {activeUpload && (
          <div className="mr-10 flex items-center">
            <TrackUploadStatusText
              fileUpload={activeUpload}
              status={status}
              className="mr-10"
            />
            <ProgressCircle
              isIndeterminate={status === 'processing'}
              value={activeUpload.percentage}
              size="sm"
            />
          </div>
        )}
        <DialogTrigger
          type="modal"
          onClose={updatedTrack => {
            if (updatedTrack) {
              onUpdate(updatedTrack);
            }
          }}
        >
          <Tooltip label={<Trans message="Edit track" />}>
            <IconButton
              className="ml-auto flex-shrink-0 text-muted"
              disabled={isUploading}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <UpdateTrackDialog track={track} hideAlbumField={true} />
        </DialogTrigger>
        <DialogTrigger
          type="modal"
          onClose={isConfirmed => {
            if (isConfirmed) {
              if (track.uploadId) {
                abortUpload(track.uploadId);
              }
              onRemove();
            }
          }}
        >
          <Tooltip label={<Trans message="Remove track" />}>
            <IconButton className="flex-shrink-0 text-muted">
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            isDanger
            title={<Trans message="Remove track" />}
            body={
              <Trans message="Are you sure you want to remove this track from the album?" />
            }
            confirm={<Trans message="Remove" />}
          />
        </DialogTrigger>
      </div>
      <RowDragPreview track={track} ref={previewRef} />
    </div>
  );
}

interface DragPreviewProps {
  track: CreateTrackPayload;
}
const RowDragPreview = React.forwardRef<DragPreviewRenderer, DragPreviewProps>(
  ({track}, ref) => {
    let content = track.name;
    if (track.artists?.length) {
      content += `- ${track.artists?.[0].name}`;
    }
    return (
      <DragPreview ref={ref}>
        {() => (
          <div className="rounded bg-chip p-8 text-sm shadow">{content}</div>
        )}
      </DragPreview>
    );
  },
);
