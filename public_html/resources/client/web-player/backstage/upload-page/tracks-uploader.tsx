import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {useFileUploadStore} from '@common/uploads/uploader/file-upload-provider';
import {
  TrackUploadPayload,
  useTrackUploader,
} from '@app/web-player/backstage/upload-page/use-track-uploader';
import {mergeTrackFormValues} from '@app/admin/tracks-datatable-page/requests/use-extract-track-file-metadata';
import {
  UploaderActions,
  UploaderProps,
} from '@app/web-player/backstage/upload-page/upload-page';
import {Track} from '@app/web-player/tracks/track';
import {useForm} from 'react-hook-form';
import {useCreateTrack} from '@app/admin/tracks-datatable-page/requests/use-create-track';
import {useTrackUpload} from '@app/web-player/backstage/upload-page/use-track-upload';
import {TrackUploadProgress} from '@app/admin/tracks-datatable-page/track-form/track-upload-progress';
import {Form} from '@common/ui/forms/form';
import {TrackForm} from '@app/admin/tracks-datatable-page/track-form/track-form';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {usePrimaryArtistForCurrentUser} from '@app/web-player/backstage/use-primary-artist-for-current-user';

export const TracksUploader = forwardRef<UploaderActions, UploaderProps>(
  ({onUploadStart, onCancel, onCreate}, ref) => {
    const userArtist = usePrimaryArtistForCurrentUser();
    const abortUpload = useFileUploadStore(s => s.abortUpload);
    const [tracks, setTracks] = useState<TrackUploadPayload[]>([]);

    const {openFilePicker, uploadTracks, validateUploads} = useTrackUploader({
      onUploadStart: data => {
        setTracks(prev => {
          if (userArtist) {
            return [...prev, {...data, artists: [userArtist]}];
          }
          return [...prev, data];
        });
        onUploadStart();
      },
      onMetadataChange: (file, newData) => {
        setTracks(allTracks => {
          return allTracks.map(track => {
            return track.uploadId === file.id
              ? mergeTrackFormValues(newData, track)
              : track;
          });
        });
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        openFilePicker,
        uploadTracks,
        validateUploads,
      }),
      [openFilePicker, uploadTracks, validateUploads],
    );

    return (
      <div className="w-full">
        {tracks.map(track => (
          <TrackUploadItem
            key={track.uploadId}
            track={track}
            onCreate={createdTrack => {
              // hide upload form for this track
              setTracks(prev =>
                prev.filter(t => t.uploadId !== track.uploadId),
              );
              onCreate(createdTrack);
            }}
            onRemove={() => {
              setTracks(prev => {
                const newTracks = prev.filter(
                  t => t.uploadId !== track.uploadId,
                );
                // only invoke "onCancel" if every uploaded track has been removed, so upload mode can be unlocked
                if (!newTracks.length) {
                  onCancel();
                }
                return newTracks;
              });
              abortUpload(track.uploadId);
            }}
          />
        ))}
      </div>
    );
  },
);

interface TrackUploadItemProps {
  track: TrackUploadPayload;
  onRemove: () => void;
  onCreate: (track: Track) => void;
}
const TrackUploadItem = memo(
  ({track, onRemove, onCreate}: TrackUploadItemProps) => {
    const form = useForm<TrackUploadPayload>({
      defaultValues: track,
    });
    const createTrack = useCreateTrack(form);
    const activeUpload = useFileUploadStore(s =>
      s.fileUploads.get(track.uploadId),
    );
    const {isUploading, status} = useTrackUpload(track.uploadId);

    useEffect(() => {
      form.reset(track);
    }, [track, form]);

    const uploadProgress =
      isUploading && activeUpload ? (
        <TrackUploadProgress fileUpload={activeUpload} status={status} />
      ) : null;

    return (
      <Form
        form={form}
        onSubmit={values => {
          createTrack.mutate(values, {
            onSuccess: response => onCreate(response.track),
          });
        }}
        className="rounded border p-14 md:p-24 mb-30 bg-background"
      >
        <TrackForm uploadButton={uploadProgress} showExternalIdFields={false} />
        <Button variant="text" onClick={() => onRemove()} className="mr-10">
          <Trans message="Cancel" />
        </Button>
        <Button
          type="submit"
          variant="flat"
          color="primary"
          disabled={createTrack.isPending || !form.watch('src')}
        >
          <Trans message="Save" />
        </Button>
      </Form>
    );
  },
);
