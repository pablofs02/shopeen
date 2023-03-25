import { createContext, ReactNode, useContext, useState } from "react";

type FilterProviderProps = {
  children: ReactNode;
};

type FilterContext = {
  searchBarValue: string;
  setSearch: (s: string) => void;
  maxPrice: number;
  minPrice: number;
  selectedOptions: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearCategory: () => void;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearRange: () => void;
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

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // This is the state that will hold the selected options from the checkboxes

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    setSelectedOptions((prevSelectedOptions) => {
      if (isChecked) {
        return [...prevSelectedOptions, option];
      } else {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      }
    });
  };

  const handleClearCategory = () => {
    setSelectedOptions([]);
  };

  const handleClearRange = () => {
    setMinPrice(0);
    setMaxPrice(10000);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setMinPrice(0);
    } else {
      setMinPrice(parseInt(event.target.value));
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setMaxPrice(0);
    } else {
      setMaxPrice(parseInt(event.target.value));
    }
  };

  return (
    <FilterContext.Provider
      value={{
        searchBarValue,
        setSearch,
        maxPrice,
        minPrice,
        selectedOptions,
        handleCheckboxChange,
        handleClearCategory,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleClearRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
