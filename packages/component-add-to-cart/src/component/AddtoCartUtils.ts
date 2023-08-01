import {
  Constants,
  getPreviewUrl,
  postAPIData,
  sendArtifiAddToCartError,
  sendArtifiAddToCartSuccess,
  sendArtifiToCartJSONData,
} from "@chaitali-nagalkar-amla/common";
import {
  ADMIN_FOLDER_PATH_KEY,
  FRONT_FOLDER_PATH_KEY,
  IAddToCart,
  IProductView,
} from "../types/AddToCartTypes";
import {
  CANVAS,
  getSVGByViewData,
  widgetConstants,
} from "@chaitali-nagalkar-amla/editor";
import { ADD_TO_CART_API, OrderStatus } from "../constants/AddToCartConstants";

export async function addToCartDesign(
  editorData: any,
  productViewData: any,
  SKU: any
) {
  let editorViewsData = JSON.parse(JSON.stringify(editorData));
  let viewsData = getViewsData(editorViewsData, productViewData);
  const addToCartData: any = {
    Sku: SKU,
    WebApiClientKey: Constants.APP_CONFIG.WEB_API_CLIENT_KEY,
    WebsiteId: Constants.APP_CONFIG.WEBSITE_ID,
    CompanyPhysicalFolder: Constants.APP_CONFIG.COMPANY_PHYSICAL_FOLDER_NAME,
    DivisionPhysicalFolder: Constants.APP_CONFIG.DIVISION_PHYSICAL_FOLDER_NAME,
    CompanyId: Constants.APP_CONFIG.COMPANY_ID,
    DivisionId: Constants.APP_CONFIG.DIVISION_ID,
    ProductId: Constants.APP_CONFIG.PRODUCT_ID,
    UserId: Constants.APP_CONFIG.FRONT_APP_USER_ID,
    OrderStatus: OrderStatus.IN_PROGRESS,
    CustomizedProductId: Constants.APP_CONFIG.CUSTOMIZED_PRODUCT_ID || 0,
    IsReOrder: false,
    NoOfImprintColors: 0,
    InitializationMode: "REACT",
    Views: viewsData,
    IsGuest: Constants.APP_CONFIG.IS_GUEST,
    AdditionalDetails: [],
  };

  const data = await sendDataToAddToCart(addToCartData);

  editorViewsData = JSON.parse(JSON.stringify(editorData));
  let productViewsData = getProductViewsData(editorViewsData, productViewData);
  if (data && data.CustomizedProductId) {
    const addToCartJSONData = prepareAddToCartJSON(data, productViewsData, SKU);
    // sendArtifiToCartJSONData(addToCartJSONData);
    sendArtifiAddToCartSuccess(addToCartJSONData);
  }
  return addToCartData;
}

async function sendDataToAddToCart(addToCartData: any) {
  try {
    const data = await postAPIData(ADD_TO_CART_API, addToCartData);
    return data;
  } catch (e: any) {
    console.log("error", e.message);
    sendArtifiAddToCartError(e.message);
  }
}

function getProductViewsData(editorData: any, productViewData: any) {
  let views: any = [];

  for (let view in productViewData) {
    productViewData[view].DesignJson = editorData[view];

    const viewData: any = productViewData[view];

    views.push(viewData);
  }
  return views;
}

function getViewsData(editorData: any, productViewData: any) {
  let views: any = [];
  editorData = replaceImageSrc(editorData);
  let win: any = window;
  let canvasEditor = win[CANVAS];
  for (let view in productViewData) {
    productViewData[view].DesignJson = JSON.stringify(editorData[view]);
    const viewData: any = productViewData[view];
    delete viewData.ConstraintsJson;
    let editor = canvasEditor[viewData.Id];
    if (editor) {
      let sf: number = getSVGByViewData(viewData);
      viewData.Svg = editor.toSVG({
        xPosition: parseInt(viewData.CanvasX) * sf,
        yPosition: parseInt(viewData.CanvasY) * sf,
        printAreaWidth: viewData.PrintWidth,
        printAreaHeight: viewData.PrintHeight,
      });
    }
    views.push(viewData);
  }
  return views;
}
function replaceImageSrc(viewsData: any) {
  for (let view in viewsData) {
    let imageList = viewsData[view].objects;
    for (let image in imageList) {
      if (imageList[image].type == widgetConstants.IMAGE)
        if (imageList[image].libProp && imageList[image].libProp.photoId) {
          imageList[image] = getActualMyArtPath(imageList[image]);
        } else {
          imageList[image] = getActualClipartPath(imageList[image]);
        }
    }
  }

  return viewsData;
}

function getActualClipartPath(widget: any) {
  if (widget && widget.src && widget.src.includes(Constants.ADMIN_IMAGE_URL)) {
    widget.src = widget.src.replace(
      Constants.ADMIN_IMAGE_URL,
      ADMIN_FOLDER_PATH_KEY
    );
    widget.originalUrl = widget.originalUrl.replace(
      Constants.ADMIN_IMAGE_URL,
      ADMIN_FOLDER_PATH_KEY
    );
  }
  return widget;
}

function getActualMyArtPath(widget: any) {
  if (widget && widget.src && widget.src.includes(Constants.FRONT_IMAGE_URL)) {
    widget.src = widget.src.replace(
      Constants.FRONT_IMAGE_URL,
      FRONT_FOLDER_PATH_KEY
    );
    widget.originalUrl = widget.originalUrl.replace(
      Constants.FRONT_IMAGE_URL,
      FRONT_FOLDER_PATH_KEY
    );
  }
  return widget;
}

function prepareAddToCartJSON(
  addedToCartData: any,
  viewsData: any,
  sku: string
) {
  let customizedProductId = addedToCartData.CustomizedProductId;

  const addToCartData: any = {
    sku: sku,
    designId: customizedProductId,
  };

  let customizedData: any = [];
  for (let viewIndex in viewsData) {
    let viewData: any = {};
    viewData.viewName = viewsData[viewIndex].Name;
    viewData.viewCode = viewsData[viewIndex].Code;

    viewData.image = getImgData(viewsData[viewIndex]);

    viewData.text = getTextData(viewsData[viewIndex]);

    customizedData.push(viewData);
  }
  addToCartData.designData = customizedData;

  addToCartData.previewThumbnailImages = addedToCartData.ThumbnailPreviewImages;

  addToCartData.previewStandardImages = addedToCartData.StandardPreviewImages;

  let previewData = {
    sku,
    userId: Constants.APP_CONFIG.USER_ID,
    websiteId: Constants.APP_CONFIG.WEBSITE_ID,
    webApiClientKey: Constants.APP_CONFIG.WEB_API_CLIENT_KEY,
    designId: customizedProductId,
  };

  addToCartData.previewUrl = getPreviewUrl(previewData);

  return addToCartData;
}

/*method to get text widget data  */
function getTextData(viewData: any) {
  let widgetList = viewData.DesignJson.objects;

  let textListData: any = [];
  for (let widget in widgetList) {
    if (widgetList[widget].type == widgetConstants.TEXTBOX) {
      let textData: any = {};
      textData.widget_key = widgetList[widget].widget_key
        ? widgetList[widget].widget_key
        : "";
      textData.text = widgetList[widget].text;

      textData.color = widgetList[widget].fill;

      textData.fontSize = parseInt(widgetList[widget].fontSize);

      textData.fontFamily = widgetList[widget].fontFamily;
      textListData.push(textData);
    }
  }
  return textListData;
}

/*method to get image widget data  */
function getImgData(viewData: any) {
  let widgetList = viewData.DesignJson.objects;

  let imageListData: any = [];

  for (let widget in widgetList) {
    if (widgetList[widget].type == widgetConstants.IMAGE) {
      let imageData: any = {};
      imageData.widget_key = widgetList[widget].widget_key
        ? widgetList[widget].widget_key
        : "";
      imageData.src = widgetList[widget].src;
      imageData.src = imageData.src.replace(
        Constants.THUMBNAIL_KEY,
        Constants.STANDARD_KEY
      );
      imageListData.push(imageData);
    }
  }
  return imageListData;
}
