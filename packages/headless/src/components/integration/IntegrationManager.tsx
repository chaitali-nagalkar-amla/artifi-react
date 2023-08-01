import { addToCartDesign } from "@chaitali-nagalkar-amla/add-to-cart";
import {
  Constants,
  IntegrationConstants,
} from "@chaitali-nagalkar-amla/common";
import {
  changeSKU,
  getEditorData,
  getProductViewsData,
  getSelectedSKU,
  useSliceSelector,
} from "@chaitali-nagalkar-amla/editor";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";

export function IntegrationManager() {
  let editorData = useSliceSelector(getEditorData);
  const dispatch = useDispatch();
  const productViewData = useSliceSelector(getProductViewsData);
  const sku = useSliceSelector(getSelectedSKU);
  useEffect(() => {
    addWindowsEvents();
    // Clean up the event listener when the component unmounts
    return () => {
      removeWindowsEvents();
    };
  }, []);

  function addWindowsEvents() {
    window.addEventListener(
      IntegrationConstants.ARTIFI_CHANGE_SKU,
      changeSKUHnd
    );

    window.addEventListener(
      IntegrationConstants.ARTIFI_ADD_TO_CART,
      addToCartDesignHnd
    );
  }

  function removeWindowsEvents() {
    window.removeEventListener(
      IntegrationConstants.ARTIFI_CHANGE_SKU,
      changeSKUHnd
    );
    window.removeEventListener(
      IntegrationConstants.ARTIFI_ADD_TO_CART,
      addToCartDesignHnd
    );
  }

  function changeSKUHnd(e: any) {
    let sku = e.detail.sku;
    dispatch(changeSKU({ sku: sku }));
  }

  function addToCartDesignHnd() {
    addToCartDesign(editorData, productViewData, sku);
  }

  return <></>;
}
