export interface ISubcategorySelector {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (subcategory: string) => void;
}

export interface IClipartCategory {
  Id: number;
  Name: string;
}

export interface IClipartProps {
  onSelect: (imageValue: any) => void;
  ruleData: any;
}

export interface IClipartResponseData {
  clipartFamilyList: [];
  images: [];
  totalImages: number;
}
