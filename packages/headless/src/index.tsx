import { render } from "react-dom";
import { Provider } from "react-redux";

import { updateConfig, updateInitializeConfig } from "./slice/configSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import {
  Constants,
  updateInitialConfig,
  updateCompanyFolderAndDivisionFolder,
  updateLaunchConfigData,
  getAPIData,
  sendArtifiLaunchingError,
  IntegrationConstants,
  getPreviewUrl,
} from "@chaitali-nagalkar-amla/common";

import { InitializeConfigType } from "./type/Type";
import App from "./App";

// Fetch the keys and dispatch the updateConfig action before rendering the app
const win: any = window;

win["Artifi"] = {};
win["Artifi"]["initialize"] = async (
  initializeConfig: InitializeConfigType
) => {
  try {
    updateInitialConfig(initializeConfig);

    try {
      const launchConfigData: any = await getAPIData(
        Constants.INITIAL_CONFIG_API,
        {
          isGuest: initializeConfig.isGuest,
          sku: initializeConfig.sku,
          userId: initializeConfig.userId,
        }
      );
      if (launchConfigData) {
        updateLaunchConfigData(launchConfigData);
        updateCompanyFolderAndDivisionFolder(
          launchConfigData.CompanyPhysicalFolderName,
          launchConfigData.DivisionPhysicalFolderName
        );

        store.dispatch(updateInitializeConfig(initializeConfig));
        store.dispatch(updateConfig(launchConfigData));
      }
    } catch (e: any) {
      sendArtifiLaunchingError(e.message);
    }
    setTimeout(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("artifi")
      );
    });
  } catch (error) {
    console.error("Error fetching dynamic data:", error);
  }
};
win["Artifi"]["changeSKU"] = (sku: string) => {
  if (sku) {
    const eventData = { sku: sku };
    const event = new CustomEvent(IntegrationConstants.ARTIFI_CHANGE_SKU, {
      detail: eventData,
    });
    window.dispatchEvent(event);
  }
};

win["Artifi"]["addToCart"] = () => {
  const event = new CustomEvent(IntegrationConstants.ARTIFI_ADD_TO_CART);
  window.dispatchEvent(event);
};

win["Artifi"]["openPreviewInPopup"] = (integrationValues: any) => {
  let url = getPreviewUrl(integrationValues);

  let artifiWindow: any = window.open(
    url,
    "",
    "width=" +
      (integrationValues.width || 500) +
      ",height=" +
      (integrationValues.height || 500)
  );
  artifiWindow.opener = null;
};

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
