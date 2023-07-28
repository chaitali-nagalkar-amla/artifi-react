import React, { ChangeEvent } from "react";
import { SubcategorySelectorProps } from "../type/ClipartType";
import { IClipartCategory } from "../type/ClipartComponentType";


export const ClipartCategories: React.FC<SubcategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const handleSubcategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
  };
  return (
    <div className="mb-3">
      <select
        className="w-full h-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedCategory}
        onChange={handleSubcategoryChange}
      >
        {categories ? categories.map((subcategory: IClipartCategory) => (
          <option key={subcategory.Id} value={subcategory.Id}>
            {subcategory.Name}
          </option>
        )) : <></>}
      </select>
    </div>
  );
};