import { Constants } from "./constantsManager";

export function generateURL(apiCallUrl: string): string {
  return Constants.BASE_URL + apiCallUrl;
}

export function getEffectURL(apiCallUrl: string): string {
  return Constants.IMAGE_EFFECT_URL + apiCallUrl;
}
