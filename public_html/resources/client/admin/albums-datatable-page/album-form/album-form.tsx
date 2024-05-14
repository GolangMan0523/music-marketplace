import React, {Fragment} from 'react';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FormArtistPicker} from '@app/web-player/artists/artist-picker/form-artist-picker';
import {FormNormalizedModelChipField} from '@common/tags/form-normalized-model-chip-field';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {TAG_MODEL} from '@common/tags/tag';
import {GENRE_MODEL} from '@app/web-player/genres/genre';
import {useSettings} from '@common/core/settings/use-settings';
import {FormDatePicker} from '@common/ui/forms/input-field/date/date-picker/date-picker';
import {AlbumTracksForm} from '@app/admin/albums-datatable-page/album-form/album-tracks-form';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';

// AlbumForm will be wrapped in FileUploadProvider by parent component

interface AlbumFormProps {
  showExternalIdFields?: boolean;
}
export function AlbumForm({showExternalIdFields}: AlbumFormProps) {
  const {trans} = useTrans();
  const isMobile = useIsMobileMediaQuery();
  return (
    <Fragment>
      <div className="gap-24 md:flex">
        <div className="flex-shrink-0">
          <FormImageSelector
            name="image"
            diskPrefix="album_images"
            label={isMobile ? <Trans message="Image" /> : null}
            variant={isMobile ? 'input' : 'square'}
            previewSize="md:w-full md:w-224 md:aspect-square"
            stretchPreview
          />
        </div>
        <div className="mt-24 flex-auto md:mt-0">
          <FormTextField
            name="name"
            label={<Trans message="Name" />}
            className="mb-24"
            required
            autoFocus
          />
          <FormDatePicker
            name="release_date"
            label={<Trans message="Release date" />}
            className="mb-24"
            granularity="day"
          />
          <FormArtistPicker name="artists" className="mb-24" />
          <FormNormalizedModelChipField
            label={<Trans message="Genres" />}
            placeholder={trans(message('+Add genre'))}
            model={GENRE_MODEL}
            name="genres"
            allowCustomValue
            className="mb-24"
          />
          <FormNormalizedModelChipField
            label={<Trans message="Tags" />}
            placeholder={trans(message('+Add tag'))}
            model={TAG_MODEL}
            name="tags"
            allowCustomValue
            className="mb-24"
          />
          <FormTextField
            name="description"
            label={<Trans message="Description" />}
            inputElementType="textarea"
            rows={5}
            className="mb-24"
          />
          {showExternalIdFields && <SpotifyIdField />}
        </div>
      </div>
      <AlbumTracksForm />
    </Fragment>
  );
}

function SpotifyIdField() {
  const {spotify_is_setup} = useSettings();
  if (!spotify_is_setup) {
    return null;
  }
  return (
    <FormTextField
      name="spotify_id"
      label={<Trans message="Spotify ID" />}
      className="mb-24"
      minLength={22}
      maxLength={22}
    />
  );
}
