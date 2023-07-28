import { Constants } from "./constantsManager";

export function generateURL(apiCallUrl: string): string {
  return Constants.BASE_URL + apiCallUrl;
}
