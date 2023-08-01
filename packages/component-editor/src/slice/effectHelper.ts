import { Constants, getAPIUrl } from "@chaitali-nagalkar-amla/common";
import { EFFECTS_CONSTANT } from "../constants/effectsConstants";
import { getEffectURL } from "@chaitali-nagalkar-amla/common";
import { IImageEffectsProps } from "../type/effectsTypes";

export function getRemoveBackgroundFilter(
  widgetVoRemoveBackground: IImageEffectsProps
) {
  let removeBackGroundFilter: any = {};
  if (widgetVoRemoveBackground) {
    if (
      widgetVoRemoveBackground &&
      widgetVoRemoveBackground.data.effectSetting &&
      (widgetVoRemoveBackground.data.effectSetting.removeBackground ||
        widgetVoRemoveBackground.data.effectSetting.removeAll)
    ) {
      if (widgetVoRemoveBackground.data.effectSetting.removeBackground) {
        removeBackGroundFilter.type = EFFECTS_CONSTANT.REMOVE_BACKGROUND;
        removeBackGroundFilter.subType = EFFECTS_CONSTANT.REMOVE_BACKGROUND;
      }
      if (widgetVoRemoveBackground.data.effectSetting.removeAll) {
        removeBackGroundFilter.type = EFFECTS_CONSTANT.REMOVE_ALL;
        removeBackGroundFilter.subType = EFFECTS_CONSTANT.REMOVE_ALL;
      }
      removeBackGroundFilter.tolarance =
        widgetVoRemoveBackground.data.effectSetting.tolarance;
      removeBackGroundFilter.color =
        widgetVoRemoveBackground.data.effectSetting.color;
    }
  }
  return removeBackGroundFilter;
}
export function getBlackAndWhiteFilter(
  blackAndWhiteEffect: IImageEffectsProps
) {
  let remoteFilter: any = {};
  if (
    blackAndWhiteEffect &&
    (blackAndWhiteEffect.allow || blackAndWhiteEffect.applied)
  ) {
    if (blackAndWhiteEffect && blackAndWhiteEffect.data.threshold) {
      remoteFilter.threshold = blackAndWhiteEffect.data.threshold;
    }
    remoteFilter.type = EFFECTS_CONSTANT.BLACK_AND_WHITE;
    return remoteFilter;
  }
}
export function getTintFilter(effectInfo: IImageEffectsProps) {
  let remoteFilter: any = {};
  if (effectInfo.applied) {
    let effectProperties = effectInfo.data.effectSetting;
    if (effectProperties) {
      remoteFilter.color = effectProperties.color;
      remoteFilter.opacity = effectProperties.opacity;
      remoteFilter.type = EFFECTS_CONSTANT.TINT;
      remoteFilter.ColorType =
        effectProperties.ColorType || effectProperties.colorType;
    }
    return remoteFilter;
  }
}
export function getGrayScaleEffect(effectInfo: IImageEffectsProps) {
  let remoteFilter: any = {};
  if (effectInfo.applied) {
    remoteFilter.type = EFFECTS_CONSTANT.GRAY_SCALE;
  }
  return remoteFilter;
}
export function generateEffectUrl(
  customFilters: any,
  src: string,
  widgetData: any
) {
  let effectBaseUrl = getEffectURL("imageapi/1.0/Effects/Apply");
  let effectObject: any = {};
  effectObject.isClipart =
    widgetData && widgetData.ClipartId
      ? true
      : widgetData && widgetData.photoId
      ? false
      : false;

  let paramString = src.split("?")[1];
  if (paramString) {
    let queryString = new URLSearchParams(paramString);
    effectObject.imageUniqueName = queryString.get("imageUniqueName");
  } else {
    if (src.includes("\\")) {
      effectObject.imageUniqueName = src.substr(src.lastIndexOf("\\") + 1);
    } else {
      effectObject.imageUniqueName = src.substr(src.lastIndexOf("/") + 1);
    }
  }

  for (let i = 0; i < customFilters.length; i++) {
    if (
      customFilters[i].type == EFFECTS_CONSTANT.REMOVE_BACKGROUND &&
      customFilters[i].subType == EFFECTS_CONSTANT.REMOVE_BACKGROUND
    ) {
      effectObject.removeWhiteBackGround = true;
      effectObject.removeWhiteBackGroundTolarnce =
        customFilters[i].tolarance || customFilters[i].Tolarance
          ? customFilters[i].tolarance || customFilters[i].Tolarance
          : 10;
    }
    if (customFilters[i].type == EFFECTS_CONSTANT.BLACK_AND_WHITE) {
      effectObject.blackAndWhite = true;
      effectObject.blackAndWhiteTolarnce =
        customFilters[i].threshold || customFilters[i].Threshold
          ? customFilters[i].threshold || customFilters[i].Threshold
          : 15;
    }
    if (
      customFilters[i].type == EFFECTS_CONSTANT.REMOVE_ALL ||
      customFilters[i].subType == EFFECTS_CONSTANT.REMOVE_ALL
    ) {
      effectObject.removeAllWhite = true;
      effectObject.removeWhiteBackGroundTolarnce =
        customFilters[i].tolarance || customFilters[i].Tolarance
          ? customFilters[i].tolarance || customFilters[i].Tolarance
          : 10;
    }
    if (customFilters[i].type == EFFECTS_CONSTANT.GRAY_SCALE) {
      effectObject.grayScale = true;
    }
    if (customFilters[i].type == EFFECTS_CONSTANT.TINT) {
      let tintObject = {
        Color: customFilters[i].Color || customFilters[i].color,
        Opacity: customFilters[i].Opacity ? customFilters[i].Opacity : 1,
      };
      effectObject.tint = JSON.stringify(tintObject);
    }
  }
  let effectUrl = getAPIUrl(effectBaseUrl, effectObject);
  return effectUrl;
}
