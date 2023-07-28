import {
  IntegrationConstants,
  PreviewAPI,
} from "./constants/IntegrationConstants";
import { getDesignerUrl } from "./constantsManager";

export function sendArtifiInitialized() {
  sendEventData(IntegrationConstants.ARTIFI_INITIALIZED);
}
export function sendArtifiWidgetUpdated(widgetData: any) {
  sendEventData(IntegrationConstants.WIDGET_UPDATED, widgetData);
}
export function sendArtifiWidgetAdded(widgetData: any) {
  sendEventData(IntegrationConstants.WIDGET_ADDED, widgetData);
}

export function sendArtifiWidgetDeleted(widgetData: any) {
  sendEventData(IntegrationConstants.WIDGET_DELETED, widgetData);
}
export function sendArtifiAddToCartError(message: any) {
  sendEventData(IntegrationConstants.ADD_TO_CART_ERROR, { message: message });
}

export function sendArtifiAddToCartSuccess(data: any) {
  sendEventData(IntegrationConstants.ADD_TO_CART_SUCCESS, data);
}

export function sendArtifiAddToCartInitialized() {
  sendEventData(IntegrationConstants.ADD_TO_CART_SUCCESS);
}
export function sendArtifiSKUChanged(sku: any) {
  sendEventData(IntegrationConstants.SKU_CHANGED, sku);
}

export function sendArtifiToCartJSONData(data: any) {
  sendEventData(IntegrationConstants.SEND_ADD_TO_CART_DATA, data);
}

export function sendArtifiLaunchingError(data?: any) {
  sendEventData(IntegrationConstants.ARTIFI_LAUNCHING_ERROR, {
    message: data,
  });
}

export function sendArtifiViewChanged(data?: any) {
  sendEventData(IntegrationConstants.ARTIFI_VIEW_CHANGED, data);
}

function sendEventData(eventName: string, data?: any) {
  const eventData = { data: data };
  const event = new CustomEvent(eventName, {
    detail: eventData,
  });

  window.dispatchEvent(event);
}

export function getPreviewUrl(previewData: any) {
  let url =
    getDesignerUrl() +
    PreviewAPI +
    "?personalization=" +
    btoa(
      "?productCode=" +
        previewData.sku +
        "&userId=" +
        previewData.userId +
        "" +
        "&websiteId=" +
        previewData.websiteId +
        "&webApiClientKey=" +
        previewData.webApiClientKey +
        "&customizedProductId=" +
        previewData.designId
    );
  return url;
}
