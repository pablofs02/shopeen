import { createContext, ReactNode, useContext, useState } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  setFilter: (s: string) => void;
  getSearchBarValue: () => string;
  cartItems: CartItem[];
  addItem: (id: number) => void;
  getQuantity: (id: number) => number;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  maxPrice: number;
  minPrice: number;
  selectedOptions: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearCategory: () => void;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearRange: () => void;

};

type CartItem = {
  id: number;
  quantity: number;
};

const GlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function setFilter(s: string) {
    setSearchBarValue(s);
  }

  function getSearchBarValue() {
    return searchBarValue;
  }

  /**
   * This function gets the quantity of an item in the cart
   * @param id Id of the item to get quantity of
   * @returns the quantity of the item in the cart
   */
  function getQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  }

  /**
   * This function adds an item to the cart or increases the quantity of the item if it already exists in the cart
   * @param id Id of the item to add to cart or increase quantity of
   */
  function addItem(id: number) {
    setCartItems((items) => {
      const item = items.find((item) => item.id === id);
      if (item) {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...items, { id, quantity: 1 }];
      }
    });
  }

  /**
   * This function decreases the quantity of an item in the cart or removes the item from the cart if the quantity is 1
   * @param id Id of the item to decrease quantity of
   */
  function decreaseItemQuantity(id: number) {
    setCartItems((items) => {
      const item = items.find((item) => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          return items.filter((item) => item.id !== id);
        }

        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      } else {
        return items;
      }
    });
  }

  /**
   * This function removes an item from the cart
   * @param id Id of the item to remove from the cart
   */
  function removeItem(id: number) {
    setCartItems((items) => {
      return items.filter((item) => item.id !== id);
    });
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
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
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
    <GlobalContext.Provider
      value={{
        setFilter,
        getSearchBarValue,
        cartItems,
        addItem,
        getQuantity,
        decreaseItemQuantity,
        removeItem,
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
    </GlobalContext.Provider>
  );
}
