import { ClipartConstants } from "../constants/ClipartConstant";
import { Constants, getAPIData } from "@artifi/common";
import { ClipartImageType } from "../type/ClipartType";

// A mock function to mimic making an async request for data
export async function fetchCliparts(
  ruleCode: string,
  folderCode: string,
  pageIndex: number,
  pageSize: number
): Promise<{
  clipartFamilyList: any;
  images: ClipartImageType[];
  totalImages: number;
}> {
  const clipartDetails: any = await getAPIData(ClipartConstants.CLIPART_API, {
    ruleCode,
    folderCode,
    pageIndex,
    pageSize,
  });
  const clipartImageList: ClipartImageType[] =
    clipartDetails.ClipartList.AssetList.map((item: ClipartImageType) => ({
      ...item,
      Original: `${Constants.CLIPART_IMAGE}${Constants.ORIGINAL_KEY}/${item.UniqueName}`,
      Thumbnail: `${Constants.CLIPART_IMAGE}${Constants.THUMBNAIL_KEY}/${item.UniqueName}`,
      Standard: `${Constants.CLIPART_IMAGE}${Constants.STANDARD_KEY}/${item.UniqueName}`,
    }));

  return {
    clipartFamilyList: clipartDetails.ClipartFamilyList,
    images: clipartImageList,
    totalImages: clipartDetails.ClipartList.AssetCount,
  };
}
