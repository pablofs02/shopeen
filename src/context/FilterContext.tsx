import { createContext, ReactNode, useContext, useState } from "react";

// This is the context that will hold the global state of the filter
type FilterProviderProps = {
  children: ReactNode;
};

// This is the type of the context
type FilterContext = {
  searchBarInput: any;
  setSearchBarInput: (s:any) => void;
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
  setMinPrice: (n: number) => void;
  setMaxPrice: (n: number) => void;
  setSelectedCategories: (s: string[]) => void;
  setMinPriceActive: (n: number) => void;
  setMaxPriceActive: (n: number) => void;
  setSelectedCategoriesActive: (s: string[]) => void;
};

const FilterContext = createContext({} as FilterContext);

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: FilterProviderProps) {
  // We get the cart and bought items from local storage
  const [searchBarInput, setSearchBarInput] = useState<React.InputHTMLAttributes<HTMLInputElement>>({});
  const [searchBarValue, setSearchBarValue] = useState("");

  // This function sets the search bar value
  function setSearch(s: string) {
    searchBarInput.value = s;
    setSearchBarValue(s);
  }

  const [minPrice, setMinPrice] = useState(0); // This is the state that will hold the min price from the range
  const [maxPrice, setMaxPrice] = useState(10000); // This is the state that will hold the max price from the range

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // This is the state that will hold the selected options from the checkboxes

  const [minPriceActive, setMinPriceActive] = useState(0); // This is the state that will hold active the min price from the range
  const [maxPriceActive, setMaxPriceActive] = useState(10000); // This is the state that will hold active the max price from the range

  const [selectedCategoriesActive, setSelectedCategoriesActive] = useState<string[]>([]); // This is the state that will hold the active selected options from the checkboxes

  /**
   * This function handles the change of the checkboxes
   * @param event This is the event that is triggered when a checkbox is clicked
   */
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

  /**
   * This function clears the selected categoriesd
   */
  const handleClearCategory = () => {
    setSelectedCategories([]);
    setSelectedCategoriesActive([]);
  };

  /**
   * This function clears the selected price range
   */
  const handleClearRange = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setMaxPriceActive(10000);
    setMinPriceActive(0);
  };

  /**
   * This function sets the active values of the filter
   * @param event This is the event that is triggered when the filter button is clicked
   */
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseInt(event.target.value));
  };

  /**
   *  This function sets the active values of the filter
   * @param event This is the event that is triggered when the filter button is clicked
   */
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(event.target.value));
  };

  /**
   * This function sets the active values of the filter
   */
  const handleActiveFilter = () => {
    if (isNaN(minPrice) || minPrice > maxPrice) {
      setMinPriceActive(0);
    } else {
      setMinPriceActive(minPrice);
    }

    if (isNaN(maxPrice) || maxPrice < minPrice) {
      setMaxPriceActive(10000);
    } else {
      setMaxPriceActive(maxPrice);
    }
    setSelectedCategoriesActive(selectedCategories);
  };

  return (
    <FilterContext.Provider
      value={{
        searchBarInput,
        setSearchBarInput,
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
        setMinPrice,
        setMaxPrice,
        setSelectedCategories,
        setMinPriceActive,
        setMaxPriceActive,
        setSelectedCategoriesActive,
      }}>
      {children}
    </FilterContext.Provider>
  );
}
