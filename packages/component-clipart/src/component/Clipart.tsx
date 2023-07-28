import React, { useState, useEffect } from "react";
import { ClipartCategories } from "./ClipartCategories";
import { ClipartList } from "./ClipartList";
import { fetchCliparts } from "../api/Api";
import { ClipartImageType } from "../type/ClipartType";
import { IClipartProps } from "../type/ClipartComponentType";
import { ClipartConstants } from "../constants/ClipartConstant";

const Clipart: React.FC<IClipartProps> = ({ onSelect, ruleData }) => {
  const [categories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [clipartImages, setClipartImages] = useState<ClipartImageType[]>([]);
  const [defaultCategory, setDefaultCategory] = useState("");
  const [totalImages, setTotalImages] = useState(0);
  const [isFetchingClipartData, setFetchingClipartData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [pageIndex, setPage] = useState(1);
  const pageSizeConst = ClipartConstants.PAGE_SIZE;

  //var container: any;

  const fetchInitialClipartData = async () => {
    if (hasNext) {
      setIsLoading(true);
      try {
        const clipartData = await fetchCliparts(
          ruleData.ruleCode,
          "",
          pageIndex,
          pageSizeConst
        );
        const { clipartFamilyList, images, totalImages } = clipartData;
        setClipartImages((prevImages: any) => [...prevImages, ...images]);
        setSubCategories(clipartFamilyList);
        setDefaultCategory(clipartFamilyList[0].Id);
        setTotalImages(totalImages);
        setPage(pageIndex + 1);
        setFetchingClipartData(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setFetchingClipartData(false);
        setIsLoading(false);
      }
    }
  };

  const isScrolling = () => {
    const container = document.getElementById("clipart-list-container");
    if (container) {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        // Load more user image
        setFetchingClipartData(true);
      }
    }
  };

  useEffect(() => {
    setFetchingClipartData(true);
    const container = document.getElementById("clipart-list-container");
    if (container) {
      container.addEventListener("scroll", isScrolling);
    }
    return () => {
      if (container) {
        container.addEventListener("scroll", isScrolling);
      }
    };
  }, [totalImages]);

  useEffect(() => {
    if (isFetchingClipartData) {
      if (totalImages >= clipartImages.length) {
        fetchInitialClipartData();
      }
      if (totalImages > 0 && totalImages == clipartImages.length) {
        setIsLoading(false);
        setHasNext(false);
      }
    }
  }, [isFetchingClipartData]);

  //Select clipart category
  useEffect(() => {
    if (selectedCategory) {
      fetchCategoryImages(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategoryImages = async (category: string) => {
    try {
      const clipartData = await fetchCliparts(
        ruleData.ruleCode,
        category,
        pageIndex,
        pageSizeConst
      );
      const { images, totalImages } = clipartData;
      setTotalImages(totalImages);
      setClipartImages([...images]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const resetClipartCategoryData = () => {
    setPage(1);
    setTotalImages(0);
  }
  return ruleData && ruleData.cliparts && ruleData.cliparts.allow ? (
    <div data-art-container="image-category">
      {/* Clipart categories list */}
      {categories && categories.length > 1 ? (
        <ClipartCategories
          categories={categories}
          selectedCategory={selectedCategory || defaultCategory}
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
          isLoading={isLoading}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Clipart;
