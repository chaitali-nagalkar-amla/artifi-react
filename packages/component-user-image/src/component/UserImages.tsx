import React, { useState, useEffect, useRef } from "react";
import { deleteUserImage, userPhotoApi } from "../api/Api";
import { IUserImageType } from "../type/UserImageType";
import { DeleteImageIcon, LazyLoaderIcon } from "../icons/Icons";
import { IUserImageProps } from "../type/UserImageComponentType";
import { UserImageConstants } from "../constants/UserImageConstant";

const UserImages: React.FC<IUserImageProps> = ({ onSelectAction }) => {
  const [userImage, setUserImage] = useState<IUserImageType[]>([]);
  const [imagesAssetCount, setImagesAssetCount] = useState(0);
  const [isFetchNextUserImageData, setFetchNextUserImageData] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const userImageListContainerRef = useRef<HTMLDivElement>(null);
  const pageSizeConst = UserImageConstants.DEFAULT_PAGE_SIZE;

  const { data, isFetching } = userPhotoApi.endpoints.GetUserPhoto.useQuery({
    pageIndex: pageIndex,
    pageSize: pageSizeConst,
  });

  useEffect(() => {
    // Set the initial user image data
    if (
      data &&
      data.images &&
      data.images.length != 0 &&
      !isFetchNextUserImageData
    ) {
      setUserImage(data.images);
      setImagesAssetCount(data.totalImages);
    }
    // Update the initial user image data with the data from the next page obtained.
    if (data && isFetchNextUserImageData) {
      setUserImage((prevImages: any) => [...prevImages, ...data.images]);
    }

    // If the user image data is empty, update the flag.
    if (data && data.totalImages == 0 && data.images.length == 0) {
      setHasNext(false);
      setFetchNextUserImageData(false);
    }
  }, [data]);

  //Once the userImage state has been updated (new records added), reset the setFetchNextUserImageData flag.
  useEffect(() => {
    setFetchNextUserImageData(false);
  }, [userImage]);

  //Scroll
  useEffect(() => {
    const userImageListContainer = userImageListContainerRef.current;
    const handleScroll = () => {
      if (
        userImageListContainer &&
        userImageListContainer.scrollTop +
          userImageListContainer.clientHeight >=
          userImageListContainer.scrollHeight
      ) {
        //Retrieving the user image data while scrolling to the bottom
        setFetchNextUserImageData(true);
      }
    };
    //Condition to determine whether or not to get data
    if (userImageListContainer && hasNext) {
      userImageListContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (userImageListContainer) {
        userImageListContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNext]);

  useEffect(() => {
    //If the flag is set to "TRUE," the next user image data will be retrieved based on the page index.
    if (isFetchNextUserImageData) {
      //Condition to determine whether to fetch data or not
      if (imagesAssetCount > userImage.length) {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
      }
      if (
        (data && data.totalImages === 0) ||
        imagesAssetCount == userImage.length
      ) {
        setHasNext(false);
        setFetchNextUserImageData(false);
      }
    }
  }, [isFetchNextUserImageData]);

  //Delete the user image using the selected user photo id.
  const deleteImage = async (userPhotoId: number) => {
    let response = await deleteUserImage(userPhotoId);
    if (!response) {
      setUserImage((prevImages) =>
        prevImages.filter((userImages) => userImages.Id !== userPhotoId)
      );
      setImagesAssetCount((prevAssetCount) => prevAssetCount - 1);
    } else if (response && response.message) {
      console.log("error", response.message);
    }
  };

  return (
    <div
      ref={userImageListContainerRef}
      className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(73px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(72px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] max-h-64 overflow-x-hidden overflow-y-auto custom-scroll p-0.5"
    >
      {userImage ? (
        userImage.map((image: IUserImageType) => (
          <div
            key={image.Id}
            className="flex items-center justify-center pt-5 px-1.5 pb-1.5 relative shadow-md rounded-md border hover:border-blue-400 border-solid cursor-pointer h-20"
          >
            <button
              className="absolute right-[3px] top-[4px] cursor-pointer leading-[0]"
              type="button"
              title="Delete"
              data-delete-id={image.Id}
              data-action="delete"
              onClick={() => deleteImage(image.Id)}
            >
              <DeleteImageIcon />
            </button>
            <img
              src={image.ThumbnailUrl}
              className="max-h-14"
              onClick={() => {
                onSelectAction({
                  originalUrl: image.OriginalUrl,
                  src: image.StandardUrl,
                  originalHeight: image.Height,
                  originalWidth: image.Width,
                });
              }}
            />
          </div>
        ))
      ) : (
        <></>
      )}
      {isFetching && (
        <div className="h-20 flex justify-center items-center">
          <LazyLoaderIcon />
        </div>
      )}
    </div>
  );
};

export default UserImages;
