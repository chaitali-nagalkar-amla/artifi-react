import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import i18next from "i18next";

export const serverCaptions: any = {};

export function saveCaptions(captionsData: any) {
  try {
    captionsData.map((caption: any) => {
      serverCaptions[caption.CaptionKey] = caption.CaptionValue;
    });
  } catch (error) {
    // Handle any errors during API call or initialization
  }
}

export function getServerCaptions() {
  return serverCaptions;
}

i18n.use(initReactI18next).init({
  lng: "server", // Set the default language
  partialBundledLanguages: true,
  fallbackLng: "local", // Fallback language if a translation is missing
  resources: {
    local: {
      translation: {},
    },
    server: {
      translation: getServerCaptions(),
    },
  },
});

export default i18n;

export function addTranslations(translations: any) {
  i18next.addResourceBundle("local", "translation", translations);
}
