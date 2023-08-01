import React, { useState, useEffect, useRef } from "react";
import { ClipartCategories } from "./ClipartCategories";
import { ClipartList } from "./ClipartList";
import { clipartApi } from "../api/Api";
import { ClipartImageType } from "../type/ClipartType";
import {
  IClipartResponseData,
  IClipartProps,
} from "../type/ClipartComponentType";
import { ClipartConstants } from "../constants/ClipartConstant";
import { LazyLoaderIcon } from "../icons/Icons";
import { Constants } from "@chaitali-nagalkar-amla/common";

const Clipart: React.FC<IClipartProps> = ({ onSelect, ruleData }) => {
  const [categories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [clipartImages, setClipartImages] = useState<ClipartImageType[]>([]);
  const [totalImages, setTotalImages] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [pageIndex, setPage] = useState(1);
  const [ruleCode, setRuleCode] = useState(ruleData.ruleCode);
  const [isFetchNextClipartData, setFetchNextClipartData] = useState(false);
  const pageSizeConst = ClipartConstants.PAGE_SIZE;
  const clipartListContainerRef = useRef<HTMLDivElement>(null);
  const queryStr = Constants.APP_CONFIG.EXTRA_DETAILS;
  const clientCode = queryStr ? queryStr.clientCode : "";

  const { data, isFetching } = clipartApi.endpoints.GetCliparts.useQuery({
    clientCode: clientCode,
    ruleCode: ruleCode,
    folderCode: selectedCategory || "",
    pageIndex: pageIndex,
    pageSize: pageSizeConst,
  });

  useEffect(() => {
    // Set the initial clipart image data
    if (data && data.images && !isFetchNextClipartData) {
      setClipartInitialData(data);
    }
    // Update the initial clipart data with the data from the next page obtained.
    if (data && isFetchNextClipartData) {
      setClipartImages((prevImages: any) => [...prevImages, ...data.images]);
    }
    // If the user image data is empty, update the flag.
    if (data && data.images && data.images.length == 0) {
      setHasNext(false);
      setFetchNextClipartData(false);
    }
  }, [data]);

  //Set the initial clipart and category data.
  const setClipartInitialData = (data: IClipartResponseData) => {
    const { clipartFamilyList, images, totalImages } = data;
    setClipartImages(images);
    categories.length === 0 && setSubCategories(clipartFamilyList);
    setTotalImages(totalImages);
  };

  //Update rule code based on view and widget selection
  useEffect(() => {
    if (ruleCode != ruleData.ruleCode) {
      resetClipartCategoryData();
      setRuleCode(ruleData.ruleCode);
      setSelectedCategory("");
      setPage(1);
      setSubCategories([]);
    }
  }, [ruleCode, ruleData.ruleCode]);

  //Scroll
  useEffect(() => {
    const clipartListContainer = clipartListContainerRef.current;
    const handleScroll = () => {
      if (
        clipartListContainer &&
        clipartListContainer.scrollTop + clipartListContainer.clientHeight >=
          clipartListContainer.scrollHeight
      ) {
        // Load more clipart images
        setFetchNextClipartData(true);
      }
    };
    //Condition to determine whether or not to get data
    if (totalImages > pageSizeConst && hasNext && clipartListContainer) {
      clipartListContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (clipartListContainer) {
        clipartListContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [totalImages, hasNext, pageSizeConst]);

  useEffect(() => {
    //If the flag is set to "TRUE," the next clipart data will be retrieved based on the page index.
    if (isFetchNextClipartData) {
      //Condition to determine whether to fetch data or not
      if (totalImages >= clipartImages.length) {
        setPage(pageIndex + 1);
      }
      if (totalImages > 0 && totalImages == clipartImages.length) {
        setHasNext(false);
        setFetchNextClipartData(false);
      }
    }
  }, [isFetchNextClipartData]);

  //Reset the data for the selected clipart category
  const resetClipartCategoryData = () => {
    setClipartImages([]);
    setPage(1);
    setTotalImages(0);
    setHasNext(true);
    setFetchNextClipartData(false);
  };

  return ruleData && ruleData.cliparts && ruleData.cliparts.allow ? (
    <div data-art-container="image-category">
      {/* Clipart categories list */}
      {categories && categories.length > 1 ? (
        <ClipartCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(selectedCategoryId) => {
            resetClipartCategoryData();
            setSelectedCategory(selectedCategoryId);
          }}
        />
      ) : (
        <></>
      )}
      {/* Clipart image list */}
      {clipartImages && clipartImages.length > 0 ? (
        <ClipartList
          images={clipartImages}
          allowClipartCaption={true}
          selectAction={onSelect}
          isLoading={isFetching}
          clipartListContainerRef={clipartListContainerRef}
        />
      ) : (
        <>
          {isFetching && (
            <div className="h-20 flex justify-center items-center">
              <LazyLoaderIcon />
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Clipart;
