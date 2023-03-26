import { createContext, ReactNode, useContext, useState } from "react";

type FilterProviderProps = {
  children: ReactNode;
};

type FilterContext = {
  searchBarValue: string;
  setSearch: (s: string) => void;
  maxPrice: number;
  minPrice: number;
  selectedCategories: string[];
  maxPriceActive: number;
  minPriceActive: number;
  selectedCategoriesActive: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearCategory: () => void;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearRange: () => void;
  handleActiveFilter: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const FilterContext = createContext({} as FilterContext);

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [searchBarValue, setSearchBarValue] = useState("");

  function setSearch(s: string) {
    setSearchBarValue(s);
  }

  const [minPrice, setMinPrice] = useState(0); // This is the state that will hold the min price from the range
  const [maxPrice, setMaxPrice] = useState(10000); // This is the state that will hold the max price from the range

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // This is the state that will hold the selected options from the checkboxes

  const [minPriceActive, setMinPriceActive] = useState(0); // This is the state that will hold active the min price from the range
  const [maxPriceActive, setMaxPriceActive] = useState(10000); // This is the state that will hold active the max price from the range

  const [selectedCategoriesActive, setSelectedCategoriesActive] = useState<string[]>([]); // This is the state that will hold the active selected options from the checkboxes

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    setSelectedCategories((prevSelectedCategories) => {
      if (isChecked) {
        return [...prevSelectedCategories, option];
      } else {
        return prevSelectedCategories.filter((selectedOption) => selectedOption !== option);
      }
    });
  };

  const handleClearCategory = () => {
    setSelectedCategories([]);
  };

  const handleClearRange = () => {
    setMinPrice(0);
    setMaxPrice(10000);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(event.target.value));
  };

  const handleActiveFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isNaN(minPrice)) {
      setMinPriceActive(0);
    } else {
      setMinPriceActive(minPrice);
    }
    if (isNaN(maxPrice)) {
      setMaxPriceActive(10000);
    } else {
      setMaxPriceActive(maxPrice);
    }
    setSelectedCategoriesActive(selectedCategories);
  };

  return (
    <FilterContext.Provider
      value={{
        searchBarValue,
        setSearch,
        maxPrice,
        minPrice,
        selectedCategories,
        maxPriceActive,
        minPriceActive,
        selectedCategoriesActive,
        handleCheckboxChange,
        handleClearCategory,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleClearRange,
        handleActiveFilter,
      }}>
      {children}
    </FilterContext.Provider>
  );
}
