import React, { useState } from "react";
import { addToCartDesign } from "./AddtoCartUtils";
import { AddToCartIcon, LoaderIcon } from "../icons/Icons";

interface AddToCartProps {}
import {
  getEditorData,
  getProductViewsData,
  useSliceSelector,
  getSelectedSKU,
} from "@chaitali-nagalkar-amla/editor";

import { Constants } from "@chaitali-nagalkar-amla/common";

import { useTranslation } from "react-i18next";

// i18n.js

export const AddToCart: React.FC<AddToCartProps> = ({}) => {
  let editorData = useSliceSelector(getEditorData);

  const { t } = useTranslation();
  console.log("add to cart changes 3");
  const productViewData = useSliceSelector(getProductViewsData);

  const [isLoading, setIsLoading] = useState(false);

  const customizedProductId = Constants.APP_CONFIG.CUSTOMIZED_PRODUCT_ID | 0;

  const SKU = useSliceSelector(getSelectedSKU);
  const addToCartCaption = customizedProductId
    ? t("UPDATE_CART")
    : t("ADD_TO_CART");

  async function addToCartDesignHnd() {
    setIsLoading(true);
    const addToCartData = await addToCartDesign(
      editorData,
      productViewData,
      SKU
    );
    setIsLoading(false);
  }

  return (
    <>
      <button
        className="button hover:bg-gray-700 px-6 pb-[6px] pt-2 text-md uppercase leading-normal text-white w-full bg-black flex justify-center items-center relative"
        onClick={addToCartDesignHnd}
        title={addToCartCaption}
        data-test-selector="add-to-cart-btn"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderIcon />
        ) : (
          <>
            <AddToCartIcon />
          </>
        )}
        <span className="pl-2.5">{addToCartCaption}</span>
      </button>
    </>
  );
};
