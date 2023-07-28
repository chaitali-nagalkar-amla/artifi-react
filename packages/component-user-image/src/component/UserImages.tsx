import React, { useState, useEffect } from "react";
import { deleteUserImage, fetchUserImages } from "../api/Api";
import { IUserImageType } from "../type/UserImageType";
import { DeleteImageIcon, LazyLoaderIcon } from "../icons/Icons";
import { IUserImageProps } from "../type/UserImageComponentType";
import { UserImageConstants } from "../constants/UserImageConstant";

const UserImages: React.FC<IUserImageProps> = ({ onSelectAction }) => {
  const [userImage, setUserImage] = useState<IUserImageType[]>([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isUserImageFetching, setUserImageFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = UserImageConstants.DEFAULT_PAGE_SIZE;

  const loadUserImageData = async () => {
    if (hasNext) {
      setIsLoading(true);
      try {
        const userImages = await fetchUserImages(pageSize, pageIndex);
        setUserImage((prevImages) => [...prevImages, ...userImages.images]);
        setTotalImages(userImages.totalImages);
        setPageIndex(pageIndex + 1);
        setUserImageFetching(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setUserImageFetching(false);
        setIsLoading(false);
      }
    }
  };

  const isScrolling = () => {
    const container = document.getElementById("user-image-list-container");
    if (container) {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        // Load more user image
        setUserImageFetching(true);
      }
    }
  };

  useEffect(() => {
    setUserImageFetching(true);
    const container = document.getElementById("user-image-list-container");
    if (container) {
      container.addEventListener("scroll", isScrolling);
    }
    return () => {
      if (container) {
        container.addEventListener("scroll", isScrolling);
      }
    };
  }, []);

  useEffect(() => {
    if (isUserImageFetching && hasNext) {
      if (totalImages >= userImage.length) {
        loadUserImageData();
      }
      if (totalImages > 0 && totalImages == userImage.length) {
        setIsLoading(false);
        setHasNext(false);
      }
    }
  }, [isUserImageFetching]);

  const deleteImage = async (userPhotoId: number) => {
    await deleteUserImage(userPhotoId);
  };

  return (
    <div
      id="user-image-list-container"
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
      {isLoading && (
        <div className="h-20 flex justify-center items-center"><LazyLoaderIcon /></div>
      )}
    </div>
  );
};

export default UserImages;
