import {
  Editor,
  changeSKU,
  getAllViewsData,
  useSliceSelector,
} from "@artifi/editor";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { TextAreaWithUpdate } from "./components/text/TextAreaWithUpdate";
import { UserImageWithUpdateAndAdd } from "./components/image/UserImageWithUpdateAndAdd";
import { UserImageUploadWithUpdateAndAdd } from "./components/image/UserImageUploadWithUpdateAndAdd";
import { ClipartImageWithUpdate } from "./components/image/ClipartImageWithUpdate";
import { BoldWithUpdate } from "./components/text/BoldWithUpdate";
import { ItalicWithUpdate } from "./components/text/ItalicWithUpdate";
import { FontSizeWithUpdate } from "./components/text/FontSizeWithUpdate";
import { FontFamilyWithUpdate } from "./components/text/FontFamilyWithUpdate";
import { TextColorWithUpdate } from "./components/text/TextColorWithUpdate";
import { TextAlignmentWithUpdate } from "./components/text/TextAlignmentWithUpdate";
import { TextControlsWithUpdate } from "./components/text/TextControlsWithUpdate";
import { TextWidgetList } from "./components/text/TextWidgetList";
import { TextListWidgetControls } from "./components/text/TextListWidgetControls";
import { ImageWidgetListWithUpdate } from "./components/image/ImageWidgetListWithUpdate";
import { ProductView } from "@artifi/product-views";
import { AddToCart } from "@artifi/add-to-cart";
import { Constants, IntegrationConstants } from "@artifi/common";
import { AddTextWidget } from "./components/text/AddTextWidget";
import { AddTextWidgetWithArea } from "./components/text/AddTextWidgetWithArea";

import { addToCartDesign } from "@artifi/add-to-cart";
import { IntegrationManager } from "./components/integration/IntegrationManager";
export default function App() {
  const editor = document.getElementById("artifi-editor");

  const productViews = document.getElementById("artifi-product-views");
  const addToCartButton = document.getElementById("artifi-add-to-cart");
  const dispatch = useDispatch();
  const viewsList = useSliceSelector(getAllViewsData);

  useEffect(() => {
    dispatch(changeSKU({ sku: Constants.APP_CONFIG.INITIAL_SKU }));

    // Clean up the event listener when the component unmounts
    return () => {};
  }, []);

  return (
    <>
      {editor && createPortal(<Editor></Editor>, editor!)}

      {productViews && createPortal(<ProductView></ProductView>, productViews!)}
      {addToCartButton &&
        createPortal(<AddToCart></AddToCart>, addToCartButton!)}

      {viewsList && viewsList.length ? (
        <>
          <IntegrationManager></IntegrationManager>
          <TextWidgetList></TextWidgetList>

          <TextAreaWithUpdate></TextAreaWithUpdate>
          <BoldWithUpdate></BoldWithUpdate>
          <ItalicWithUpdate></ItalicWithUpdate>
          <FontSizeWithUpdate></FontSizeWithUpdate>
          <FontFamilyWithUpdate></FontFamilyWithUpdate>
          <TextColorWithUpdate></TextColorWithUpdate>
          <TextAlignmentWithUpdate></TextAlignmentWithUpdate>
          <TextControlsWithUpdate></TextControlsWithUpdate>
          <TextListWidgetControls></TextListWidgetControls>
          <AddTextWidget></AddTextWidget>
          <AddTextWidgetWithArea></AddTextWidgetWithArea>
        </>
      ) : (
        ""
      )}
      {viewsList && viewsList.length ? (
        <>
          <ImageWidgetListWithUpdate></ImageWidgetListWithUpdate>
          <ClipartImageWithUpdate></ClipartImageWithUpdate>
        </>
      ) : (
        ""
      )}

      {viewsList && viewsList.length ? (
        <>
          <UserImageUploadWithUpdateAndAdd></UserImageUploadWithUpdateAndAdd>
          <UserImageWithUpdateAndAdd></UserImageWithUpdateAndAdd>
        </>
      ) : (
        ""
      )}

      {/* {userImages && createPortal(<UserImages />, userImages)} */}

      {/* {userImages && createPortal(<UserImages />, userImages)} */}
    </>
  );
}
