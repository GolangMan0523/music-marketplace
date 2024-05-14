import {TrackUploadStatus} from '@app/admin/tracks-datatable-page/track-form/track-upload-progress';
import {useFileUploadStore} from '@common/uploads/uploader/file-upload-provider';
import {TrackUploadMeta} from '@app/web-player/backstage/upload-page/use-track-uploader';

export function useTrackUpload(uploadId: string | undefined) {
  const upload = useFileUploadStore(s =>
    uploadId ? s.fileUploads.get(uploadId) : null
  );

  let isUploading = false;
  let status: TrackUploadStatus;

  if (upload) {
    const meta = upload.meta as TrackUploadMeta | undefined;
    const isProcessing = meta?.isExtractingMetadata || meta?.isGeneratingWave;

    isUploading =
      upload?.status === 'pending' ||
      upload?.status === 'inProgress' ||
      !!isProcessing;

    status =
      upload?.status === 'completed' && isProcessing
        ? 'processing'
        : upload?.status;
  }

  return {isUploading, status, activeUpload: upload};
}
