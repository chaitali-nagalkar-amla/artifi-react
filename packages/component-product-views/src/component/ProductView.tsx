import React, { useState } from "react";
import {
  changeGroup,
  changeView,
  getActiveGroupId,
  getActiveViewId,
  getAllViewsData,
  useSliceSelector,
} from "@artifi/editor";
import { useDispatch } from "react-redux";

interface ProductViewProps {}

const ProductView: React.FC<ProductViewProps> = ({}) => {
  const dispatch = useDispatch();
  const viewsList = useSliceSelector(getAllViewsData);

  const activeViewId = useSliceSelector(getActiveViewId);
  const activeGroupId = useSliceSelector(getActiveGroupId);

  return (
    <>
      {" "}
      {viewsList && viewsList && viewsList.length > 1 ? (
        viewsList.map((view: any, index: any) => (
          <div key={index}>
            {view.GroupId ? (
              <div
                className={`w-24 text-center mb-3 border p-2 cursor-pointer rounded hover:border-blue-400 ${
                  view.GroupId === activeGroupId ? "border-blue-400" : ""
                }`}
                onClick={(e) => {
                  dispatch(changeGroup({ groupId: view.GroupId }));
                }}
              >
                <img src={view.thumbnailImageUrl} className="h-14 m-auto" />
                <p>{view.GroupName}</p>
              </div>
            ) : (
              <div
                className={`w-24 text-center mb-3 border p-2 cursor-pointer rounded hover:border-blue-400 ${
                  view.Views[0].Id === activeViewId ? "border-blue-400" : ""
                }`}
                onClick={(e) => {
                  dispatch(changeView({ viewId: view.Views[0].Id }));
                }}
              >
                <img src={view.thumbnailImageUrl} className="h-14 m-auto" />
                <p>{view.Views[0].Name}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductView;
