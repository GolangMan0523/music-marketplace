import {forwardRef, useImperativeHandle, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  CreateAlbumPayload,
  useCreateAlbum,
} from '@app/admin/albums-datatable-page/requests/use-create-album';
import {useFileUploadStore} from '@common/uploads/uploader/file-upload-provider';
import {useTrackUploader} from '@app/web-player/backstage/upload-page/use-track-uploader';
import {
  hydrateAlbumForm,
  mergeTrackFormValues,
} from '@app/admin/tracks-datatable-page/requests/use-extract-track-file-metadata';
import {Form} from '@common/ui/forms/form';
import {AlbumForm} from '@app/admin/albums-datatable-page/album-form/album-form';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import type {
  UploaderActions,
  UploaderProps,
} from '@app/web-player/backstage/upload-page/upload-page';
import {usePrimaryArtistForCurrentUser} from '@app/web-player/backstage/use-primary-artist-for-current-user';
import {useCurrentDateTime} from '@common/i18n/use-current-date-time';

export const AlbumUploader = forwardRef<UploaderActions, UploaderProps>(
  ({onUploadStart, onCancel, onCreate}, ref) => {
    const userArtist = usePrimaryArtistForCurrentUser();
    const now = useCurrentDateTime();
    const [isVisible, setIsVisible] = useState(false);
    const form = useForm<CreateAlbumPayload>({
      defaultValues: {
        tracks: [],
        artists: userArtist ? [userArtist] : [],
        release_date: now.toAbsoluteString(),
      },
    });
    const tracks = form.watch('tracks') || [];

    const abortUpload = useFileUploadStore(s => s.abortUpload);
    const uploadIsInProgress = !!useFileUploadStore(s => s.activeUploadsCount);
    const {openFilePicker, uploadTracks, validateUploads} = useTrackUploader({
      onUploadStart: data => {
        setIsVisible(true);
        form.setValue('tracks', [...form.getValues('tracks'), data]);
        onUploadStart();
      },
      onMetadataChange: (file, newData) => {
        hydrateAlbumForm(form, newData);
        form.setValue(
          'tracks',
          form.getValues('tracks').map(track => {
            return track.uploadId === file.id
              ? mergeTrackFormValues(newData, track)
              : track;
          }),
        );
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

    const createAlbum = useCreateAlbum(form);
    return isVisible ? (
      <Form
        className="rounded border p-14 md:p-24 mb-30 bg-background"
        form={form}
        onSubmit={newValues =>
          createAlbum.mutate(newValues, {
            onSuccess: response => {
              setIsVisible(false);
              form.reset();
              onCreate(response.album);
            },
          })
        }
      >
        <AlbumForm showExternalIdFields={false} />
        <div className="mt-24">
          <Button
            variant="text"
            onClick={() => {
              tracks.forEach(track => {
                abortUpload(track.uploadId);
              });
              form.reset();
              setIsVisible(false);
              onCancel();
            }}
            className="mr-10"
          >
            <Trans message="Cancel" />
          </Button>
          <Button
            type="submit"
            variant="flat"
            color="primary"
            disabled={uploadIsInProgress || createAlbum.isPending}
          >
            <Trans message="Save" />
          </Button>
        </div>
      </Form>
    ) : null;
  },
);
