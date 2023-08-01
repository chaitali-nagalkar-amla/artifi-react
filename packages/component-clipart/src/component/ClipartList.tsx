import { ClipartImageType, ClipartListProps } from "../type/ClipartType";
import { LazyLoaderIcon } from "../icons/Icons";
export const ClipartList: React.FC<ClipartListProps> = ({
  images,
  allowClipartCaption,
  selectAction,
  isLoading,
  clipartListContainerRef,
}) => {
  return (
    <>
      {images ? (
        <div
          ref={clipartListContainerRef}
          className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(73px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(72px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] max-h-64 overflow-x-hidden overflow-y-auto custom-scroll p-0.5"
        >
          {images ? (
            images.map((image: ClipartImageType) => (
              <div
                key={image.Id}
                className="flex h-20 p-1.5 flex-col justify-around shadow-md rounded-md border hover:border-blue-400 border-solid cursor-pointer text-center"
                onClick={() => {
                  selectAction({
                    originalUrl: image.Original,
                    src: image.Standard,
                    originalHeight: image.Height,
                    originalWidth: image.Width,
                    libProp: { "ClipartId": image.Id, "photoId": null }
                  });
                }}
              >
                <img
                  className="m-auto max-h-12"
                  src={image.Thumbnail}
                  alt={image.ImageName}
                  title={image.ImageName}
                />
                {allowClipartCaption ? (
                  <p className="truncate text-[10px]" title={image.ImageName}>
                    {image.ImageName}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
          {isLoading && (
            <div className="h-20 flex justify-center items-center">
              <LazyLoaderIcon />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
