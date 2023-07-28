export interface IUploadSettings {
  acceptFileTypes: string;
  allImageExtArr: string;
  allowedFileTypes: string;
  maxFileSize: number;
  imageDPI: number;
  dimension: { Width: number, Height: number }
}

export interface IUploadProps {
  onUploadSuccess: (imageData: any) => void;
  uploadType?: string;
  onUploadError?: (errorDetails: { message: string }) => void;
}

