export interface IUploadFileData {
  DPI: number,
  Height: number,
  Id: number,
  ImageName: string,
  UniqueName: string,
  Width: number,
  Response: string
}
export interface IFileData {
  name: any,
  size: number,
  lastModified: number,
  webkitRelativePath: string,
  type: string,
  arrayBuffer: any,
  slice: any,
  stream: any,
  text: any
}
export interface ISettingData {
  acceptFileTypes: string,
  allImageExtArr: string,
  allowedFileTypes: string,
  imageDPI: number,
  maxFileSize: number,
}
export interface IFileValidationData {
  file: IFileData,
  settings: ISettingData,
}

