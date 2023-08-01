import { saveCaptions } from "./captionsManager";

export interface ConstantsType {
  BASE_URL: string;
  APP_CONFIG?: any;
  ADMIN_IMAGE_BASE_URL: string;
  USER_IMAGE_BASE_URL: string;
  FRONT_IMAGE_URL: string;
  ADMIN_IMAGE_URL: string;
  LOADER_IMAGE?: string; // Optional property for loader image
  LOADER_MESSAGE?: string; // Optional property for loader message
  DEFAULT_PLACEHOLDER_IMAGE?: string; // Optional property for default placeholder image
  INITIAL_CONFIG_API: string;
  CLIPART_IMAGE?: string; // Optional property for clipart image
  PRODUCT_IMAGE?: string; // Optional property for product image
  VARIANT_IMAGE?: string; // Optional property for variant image
  VIEW_IMAGE?: string; // Optional property for view image
  ATTRIBUTE_IMAGE?: string; // Optional property for attribute image
  STANDARD_KEY: string;
  DISPLAY_KEY: string;
  THUMBNAIL_KEY: string;
  ORIGINAL_KEY: string;
  USER_IMAGES_URL?: string;
  IMAGE_WIDGET: string;
  TEXT_WIDGET: string;
  IMAGE_EFFECT_URL: string;
}

export type ImageType = "original" | "thumbnail" | "standard";

export const Constants: ConstantsType = {
  BASE_URL: getBaseUrl(),
  ADMIN_IMAGE_BASE_URL: getImageUrl("images"),

  USER_IMAGE_BASE_URL: getImageUrl("designerimages"),
  ADMIN_IMAGE_URL: "",
  INITIAL_CONFIG_API: getBaseUrl() + "api/1/LaunchConfig/GetLaunchConfigData",
  CLIPART_IMAGE: "",
  PRODUCT_IMAGE: "",
  VARIANT_IMAGE: "",
  VIEW_IMAGE: "",
  ATTRIBUTE_IMAGE: "",
  STANDARD_KEY: "Standard",
  THUMBNAIL_KEY: "Thumbnail",
  DISPLAY_KEY: "Display",
  ORIGINAL_KEY: "Original",
  TEXT_WIDGET: "textbox",
  IMAGE_WIDGET: "image",
  FRONT_IMAGE_URL: "",
  IMAGE_EFFECT_URL: getImageEffectUrl()
};

function getBaseUrl(): string {
  switch (process.env.REACT_APP_ENV) {
    case "prod":
      return "https://test.artifi.net/";
    case "integrationdev":
      return "https://integrationdevapidesigner.artifi.net/";
    case "integration":
      return "https://integrationapidesigner.artifi.net/";
    case "stage":
      return "https://stageapidesigner.artifi.net/";
    default:
      return "http://localhost:3000";
  }
}
function getImageEffectUrl(): string {
  switch (process.env.REACT_APP_ENV) {
    case "prod":
      return "https://processor.artifi.net/";
    case "integrationdev":
      return "https://integrationdevprocessor.artifi.net/";
    case "integration":
      return "https://integrationprocessor.artifi.net//";
    case "stage":
      return "https://stageprocessor.artifi.net//";
    default:
      return "http://localhost:3000";
  }
}
export function getDesignerUrl(): string {
  switch (process.env.REACT_APP_ENV) {
    case "prod":
      return "https://designer.artifi.net/";
    case "integrationdev":
      return "https://integrationdesignerdev.artifi.net/";
    case "integration":
      return "https://integrationdesigner.artifi.net/";
    case "stage":
      return "https://stagedesigner.artifi.net//";
    default:
      return "http://localhost:3000";
  }
}

function getImageUrl(path: string): string {
  switch (process.env.REACT_APP_ENV) {
    case "prod":
      return `https://${path}.artifi.net/`;
    case "integrationdev":
      return `https://integrationdev${path}.artifi.net/`;
    case "integration":
      return `https://integration${path}.artifi.net/`;
    case "stage":
      return `https://stage${path}.artifi.net/`;
    default:
      return `http://localhost:${getPort(path)}`;
  }
}

function getPort(path: string): number {
  switch (path) {
    case "images":
      return 9000;
    case "designerimages":
      return 5000;
    default:
      return 3000;
  }
}
export function updateInitialConfig(appConfig: any) {
  Constants.APP_CONFIG = {
    WEB_API_CLIENT_KEY: appConfig.webApiClientKey,
    WEBSITE_ID: appConfig.websiteId,
    USER_ID: appConfig.userId,
    IS_GUEST: appConfig.isGuest,
    INITIAL_SKU: appConfig.sku,
    CUSTOMIZED_PRODUCT_ID: appConfig.customizedProductId,
    EXTRA_DETAILS: appConfig.extraDetails ? appConfig.extraDetails : ""
  };
}

export function updateLaunchConfigData(launchData: any) {
  Constants.APP_CONFIG.COMPANY_ID = launchData.CompanyId;
  Constants.APP_CONFIG.COMPANY_PHYSICAL_FOLDER_NAME =
    launchData.CompanyPhysicalFolderName;
  Constants.APP_CONFIG.DIVISION_ID = launchData.DivisionId;
  Constants.APP_CONFIG.DIVISION_PHYSICAL_FOLDER_NAME =
    launchData.DivisionPhysicalFolderName;
  Constants.APP_CONFIG.FRONT_APP_USER_ID = launchData.FrontAppUserId;
  Constants.APP_CONFIG.PRODUCT_VARIANT_ID = launchData.ProductVariantId;
  Constants.APP_CONFIG.PRODUCT_ID = launchData.ProductId;
  saveCaptions(launchData.CaptionsData);
}

export function updateCompanyFolderAndDivisionFolder(
  companyPhysicalFolderName: string,
  divisionPhysicalFolderName: string
) {
  try {
    Constants.ADMIN_IMAGE_URL = `${Constants.ADMIN_IMAGE_BASE_URL}UserImages/${companyPhysicalFolderName}/${divisionPhysicalFolderName}/`;
    Constants.FRONT_IMAGE_URL = `${Constants.BASE_URL}UserPhoto/${companyPhysicalFolderName}/Photos/`;
    Constants.USER_IMAGES_URL = `${Constants.USER_IMAGE_BASE_URL}UserPhoto/${companyPhysicalFolderName}/Photos/`;
    Constants.CLIPART_IMAGE = `${Constants.ADMIN_IMAGE_BASE_URL}UserImages/${companyPhysicalFolderName}/${divisionPhysicalFolderName}/Cliparts/`;
    Constants.PRODUCT_IMAGE = `${Constants.ADMIN_IMAGE_BASE_URL}UserImages/${companyPhysicalFolderName}/${divisionPhysicalFolderName}/Products/`;
    Constants.VARIANT_IMAGE = `${Constants.BASE_URL}UserImages/${companyPhysicalFolderName}/${divisionPhysicalFolderName}/Variant/`;
    Constants.VIEW_IMAGE = `${Constants.BASE_URL}UserImages/${companyPhysicalFolderName}/${divisionPhysicalFolderName}/View/`;
    Constants.ATTRIBUTE_IMAGE = `${Constants.BASE_URL}UserImages/${companyPhysicalFolderName}/${divisionPhysicalFolderName}/Attribute/`;

    // Other initialization logic
  } catch (error) {
    // Handle any errors during API call or initialization
  }
}

export function getUserImageURL(
  imageName: string,
  type: ImageType = "standard"
): string {
  switch (type) {
    case "standard":
      return `${Constants.PRODUCT_IMAGE}/Standard/${imageName}`;
    case "original":
      return `${Constants.PRODUCT_IMAGE}/Original/${imageName}`;
    case "thumbnail":
      return `${Constants.PRODUCT_IMAGE}/Thumbnail/${imageName}`;
    default:
      return "";
  }
}

export function getClipartImageURL(
  imageName: string,
  type: ImageType = "standard"
): string {
  switch (type) {
    case "standard":
      return `${Constants.CLIPART_IMAGE}/Standard/${imageName}`;
    case "original":
      return `${Constants.CLIPART_IMAGE}/Original/${imageName}`;
    case "thumbnail":
      return `${Constants.CLIPART_IMAGE}/Thumbnail/${imageName}`;
    default:
      return "";
  }
}

export function getURL(key: string): string {
  const constantList: any = Constants;
  return constantList[key] || "";
}

export function getConstants(): ConstantsType {
  return Constants;
}

export function convertStringToBoolean(value: string) {
  if (value === "1" || value.toLowerCase() === "true") {
    return true;
  } else if (value === "0" || value.toLowerCase() === "false") {
    return false;
  }
}
