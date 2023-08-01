
export interface ClipartImageType {
  Height: number;
  Id: number;
  ImageName: string;
  IsPrintImagePresent: boolean;
  IsProductionReady: boolean;
  PrintImageUniqueName: string | null;
  UniqueName: string;
  Width: number;
  Standard: string;
  Original: string;
  Thumbnail: string;
}

export interface SubcategorySelectorProps {
  categories: any;
  selectedCategory: any;
  onCategoryChange: (subcategory: string) => void;
}

export interface ClipartListProps {
  images: ClipartImageType[];
  allowClipartCaption: boolean;
  selectAction: any;
  isLoading: boolean;
  clipartListContainerRef: any;
}
