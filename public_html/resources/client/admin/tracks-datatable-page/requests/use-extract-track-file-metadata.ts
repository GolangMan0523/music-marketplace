import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {Album} from '@app/web-player/albums/album';
import {Artist} from '@app/web-player/artists/artist';
import {FileEntry} from '@common/uploads/file-entry';
import {CreateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-create-track';
import {NormalizedModel} from '@common/datatable/filters/normalized-model';
import {UseFormReturn} from 'react-hook-form';
import {CreateAlbumPayload} from '@app/admin/albums-datatable-page/requests/use-create-album';

export type ExtractedTrackMetadata = Partial<CreateTrackPayload> & {
  release_date?: string;
  album_name?: string;
};

interface Response extends BackendResponse {
  metadata: {
    title?: string;
    album?: Album;
    album_name?: string;
    artist?: Artist;
    artist_name?: string;
    genres?: string[];
    duration?: number;
    release_date?: string;
    comment?: string;
    image?: FileEntry;
    lyrics?: string;
  };
}

interface Payload {
  fileEntryId: number;
  autoMatchAlbum?: boolean;
}

export function useExtractTackFileMetadata() {
  return useMutation({
    mutationFn: (payload: Payload) => extractMeta(payload),
    onError: err => showHttpErrorToast(err),
  });
}

function extractMeta(payload: Payload): Promise<ExtractedTrackMetadata> {
  return apiClient
    .post<Response>(`tracks/${payload.fileEntryId}/extract-metadata`, payload)
    .then(r => metadataToFormValues(r.data));
}

function metadataToFormValues(response: Response): ExtractedTrackMetadata {
  const values: ExtractedTrackMetadata = {
    name: response.metadata.title,
    duration: response.metadata.duration,
    genres: response.metadata.genres || [],
    description: response.metadata.comment,
    lyric: response.metadata.lyrics,
    release_date: response.metadata.release_date,
    album_name: response.metadata.album_name,
  };
  if (response.metadata.album) {
    values.album_id = response.metadata.album.id;
  }
  if (response.metadata.artist) {
    values.artists = [response.metadata.artist];
  }
  if (response.metadata.image) {
    values.image = response.metadata.image.url;
  }
  return values;
}

export function hydrateAlbumForm(
  form: UseFormReturn<CreateAlbumPayload>,
  data: ExtractedTrackMetadata,
) {
  if (!form.getValues('artists')?.length && data.artists) {
    form.setValue('artists', data.artists);
  }
  if (!form.getValues('image') && data.image) {
    form.setValue('image', data.image);
  }
  if (data.release_date) {
    form.setValue('release_date', data.release_date);
  }
  if (data.genres?.length) {
    form.setValue(
      'genres',
      // @ts-ignore
      mergeArraysWithoutDuplicates(form.getValues('genres'), data.genres),
    );
  }
  if (!form.getValues('name') && data.album_name) {
    form.setValue('name', data.album_name);
  }
}

type Values = Partial<CreateTrackPayload>;
export function mergeTrackFormValues<
  T extends Values = Values,
  E extends Values = Values,
>(newValues: T, oldValues: E): T & E {
  return {
    ...oldValues,
    ...newValues,
    artists: mergeArraysWithoutDuplicates(oldValues.artists, newValues.artists),
    genres: mergeArraysWithoutDuplicates(
      oldValues.genres as NormalizedModel[],
      newValues.genres as NormalizedModel[],
      'name',
    ),
    tags: mergeArraysWithoutDuplicates(oldValues.tags, newValues.tags, 'name'),
  };
}

function mergeArraysWithoutDuplicates(
  oldValues: NormalizedModel[] = [],
  newValues: NormalizedModel[] = [],
  key: keyof NormalizedModel = 'id',
) {
  newValues = newValues.filter(
    nv => !oldValues.find(ov => ov[key] === nv[key]),
  );
  return [...oldValues, ...newValues];
}
