import { Constants, getAPIData, getAPIUrl } from "@artifi/common";
import {
  isCustomizedVariant,
  getEditorDataFromProductData,
  getViewData,
} from "../slice/editorSliceHelper";
import { IProductVariantData } from "../type/editorTypes";
import {
  GET_FONT_CSS_API_URL,
  GET_FONT_CSS_BY_DESIGN_ID_URL,
  PRODUCT_VIEWS_API_URL,
} from "../constants/productViewConstants";
import WebFont from "webfontloader";
import { resolve } from "dns";
import { widgetConstants } from "../constants/editorConstants";
/*method to load productVariant data from server
 */
export async function loadProductVariantData(
  sku: string,
  oldVariantData: IProductVariantData,
  editorData: any
) {
  //let productViewAPIPath = "http://localhost:8077/" + _sku + ".json";
  let designId = Constants.APP_CONFIG.CUSTOMIZED_PRODUCT_ID | 0;

  if (sku != Constants.APP_CONFIG.INITIAL_SKU) {
    designId = 0;
  }

  let variantData: any = await getAPIData(PRODUCT_VIEWS_API_URL, {
    sku,
    designId,
  });

  variantData = prepareProductVariantData(variantData);
  const isVariantCustomized = isCustomizedVariant(oldVariantData, variantData);

  if (!oldVariantData || isVariantCustomized) {
    variantData.sku = sku;
    variantData.editorData = getEditorDataFromProductData(variantData);

    variantData.viewsData = getViewData(variantData);

    return variantData;
  } else {
    variantData.editorData = editorData;
    variantData.viewsData = getViewData(variantData);
    variantData.sku = sku;
    return variantData;
  }
}

function prepareProductVariantData(variantData: any) {
  variantData.ProductViews.map((productView: any) => {
    productView.standardImageUrl =
      Constants.PRODUCT_IMAGE +
      Constants.STANDARD_KEY +
      "/" +
      productView.ImageUniqueName;

    productView.thumbnailImageUrl =
      Constants.PRODUCT_IMAGE +
      Constants.THUMBNAIL_KEY +
      "/" +
      productView.ImageUniqueName;
    productView.displayImageUrl =
      Constants.PRODUCT_IMAGE +
      Constants.DISPLAY_KEY +
      "/" +
      productView.ImageUniqueName;
  });

  variantData.Templates.map((template: any) => {
    template.ConstraintsJson = JSON.parse(template.ConstraintsJson);
    template.DesignJson = JSON.parse(template.DesignJson);
  });

  return variantData;
}

// export async function loadFontsByView(templateCode: string) {
//   let fontUrl = getAPIUrl(GET_FONT_CSS_API_URL, { templateCode: templateCode });
//   let fontLoaded = false;
//   await WebFont.load({
//     custom: {
//       families: ["RockWell"],
//       urls: [
//         "https://integrationdesigner.artifi.net/Designer/Services/GetSpecificFontCss?fontIds=2578&divisionPhysicalFolderName=4d840c81-6b06-4eb0-a11b-9f146f739888&companyPhysicalFolderName=137708DD-8198-4922-B167-0C90CA79F57F",
//       ],
//     },
//     fontactive: function (fontFamily) {
//       console.log("RockWell", fontFamily);
//       fontLoaded = true;
//       loadFont();
//     },
//   });

// }

export async function loadFontsByView(
  templateCode: string,
  viewData: any,
  sku: string
) {
  let fontLoaded = false;

  let fontUrl = getAPIUrl(GET_FONT_CSS_API_URL, {
    templateCode: templateCode,
  });

  if (
    sku == Constants.APP_CONFIG.INITIAL_SKU &&
    Constants.APP_CONFIG.CUSTOMIZED_PRODUCT_ID
  ) {
    fontUrl = getAPIUrl(GET_FONT_CSS_BY_DESIGN_ID_URL, {
      designId: Constants.APP_CONFIG.CUSTOMIZED_PRODUCT_ID | 0,
    });
  }

  let fontList = getFontList(viewData);
  const promise = new Promise<boolean>((resolve, reject) => {
    if (!fontList || fontList.length == 0) {
      resolve(fontLoaded);
    }

    WebFont.load({
      custom: {
        families: fontList,
        urls: [fontUrl],
      },
      active: function () {
        fontLoaded = true;
        resolve(fontLoaded);
      },
      inactive: function () {
        resolve(fontLoaded);
      },
      fontactive: function (familyName: any) {},
      fontinactive: function (familyName: any) {},
    });
  });
  return promise;
}

function getFontList(viewData: any) {
  if (viewData) {
    let textList = viewData.objects.filter((widget: any) => {
      return widget.type === widgetConstants.TEXTBOX;
    });
    let fontNamesArray = [];
    for (let key in textList) {
      if (textList[key]) {
        let fontName = textList[key].fontFamily + ":n4,i4,n7,i7";
        fontNamesArray.push(fontName);
      }
    }

    return fontNamesArray;
  }
}

export function getVariantDataOnSkuChange(
  oldVariantData: any,
  newVariantData: any,
  sku: string,
  editorData: any
) {
  const isVariantCustomized = isCustomizedVariant(
    oldVariantData,
    newVariantData
  );

  if (!oldVariantData || isVariantCustomized) {
    newVariantData.sku = sku;
    newVariantData.editorData = getEditorDataFromProductData(newVariantData);
    newVariantData.viewsData = getViewData(newVariantData);
    return newVariantData;
  } else {
    newVariantData.editorData = editorData;
    newVariantData.viewsData = getViewData(newVariantData);
    newVariantData.sku = sku;
    return newVariantData;
  }
}
