export interface IAddToCart {
  orderStatus?: string;
  customizedProductId?: null | number;
  folderName?: string;
  isReOrder?: boolean;
  noOfImprintColors?: number;
  initializationMode?: "REACT";
  views: any;
  companyId?: number;
  divisionId?: number;
  rendererType?: "IRS" | "CRS";

  additionalDetails?: { key: string; value: string }[];
}

export const FRONT_FOLDER_PATH_KEY = "FrontFolderPathKey";
export const ADMIN_FOLDER_PATH_KEY = "AdminFolderPathKey";

export interface IProductView {
  Name: string;
  ImageUniqueName: string;
  IsPublic: boolean;
  CanvasWidth: string;
  CanvasHeight: string;
  PrintWidth: any;
  PrintHeight: any;
  CanvasX: string;
  CanvasY: string;
  TemplateCode: string;
  DisplayImageUniqueName: any;
  DisplayImageUrl: any;
  DisplayName: any;
  Id: number;
  Code: string;
  TemplateId: number;
  IsHidden: boolean;
  DesignJSON: string;
}
