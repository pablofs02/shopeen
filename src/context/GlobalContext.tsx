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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
