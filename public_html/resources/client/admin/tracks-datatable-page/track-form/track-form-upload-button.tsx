import React, {useState} from 'react';
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {FileUploadIcon} from '@common/icons/material/FileUpload';
import {TrackUploadProgress} from '@app/admin/tracks-datatable-page/track-form/track-upload-progress';
import {useFormContext} from 'react-hook-form';
import {CreateTrackPayload} from '@app/admin/tracks-datatable-page/requests/use-create-track';
import {useTrackUploader} from '@app/web-player/backstage/upload-page/use-track-uploader';
import {useTrackUpload} from '@app/web-player/backstage/upload-page/use-track-upload';
import {useFileUploadStore} from '@common/uploads/uploader/file-upload-provider';
import {mergeTrackFormValues} from '@app/admin/tracks-datatable-page/requests/use-extract-track-file-metadata';

export function TrackFormUploadButton() {
  const [uploadId, setUploadId] = useState<string>();
  const {setValue, watch, getValues} = useFormContext<CreateTrackPayload>();
  const {openFilePicker} = useTrackUploader({
    onUploadStart: ({uploadId}) => setUploadId(uploadId),
    onMetadataChange: (file, newData) => {
      const mergedValues = mergeTrackFormValues(newData, getValues());
      Object.entries(mergedValues).forEach(([key, value]) =>
        setValue(key as keyof CreateTrackPayload, value, {shouldDirty: true})
      );
    },
  });
  const {status, isUploading, activeUpload} = useTrackUpload(uploadId);
  const {abortUpload, clearInactive} = useFileUploadStore();
  return (
    <div>
      <Button
        className="w-full"
        variant="flat"
        color="primary"
        startIcon={<FileUploadIcon />}
        disabled={isUploading}
        onClick={() => openFilePicker()}
      >
        {watch('src') ? (
          <Trans message="Replace file" />
        ) : (
          <Trans message="Upload file" />
        )}
      </Button>
      {activeUpload && (
        <TrackUploadProgress
          fileUpload={activeUpload}
          status={status}
          className="mt-24"
          onAbort={uploadId => {
            abortUpload(uploadId);
            clearInactive();
          }}
        />
      )}
    </div>
  );
}
