import { generateURL } from "@artifi/common";

export const PRODUCT_VIEWS_API_URL = generateURL(
  "api/v1/ProductView/GetProductViews"
);

export const FRONT_FOLDER_PATH_KEY = "FrontFolderPathKey";
export const ADMIN_FOLDER_PATH_KEY = "AdminFolderPathKey";

export const GET_FONT_CSS_API_URL = generateURL(
  "api/v1/Font/GetFontCssByTemplateCode"
);

export const GET_FONT_CSS_BY_DESIGN_ID_URL = generateURL(
  "api/v1/Font/GetFontCssByDesignId"
);
