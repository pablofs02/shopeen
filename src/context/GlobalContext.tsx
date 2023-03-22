import { createContext, ReactNode, useContext, useState } from "react";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  setFilter: (s: string) => void;
  getSearchBarValue: () => string;
  cartItems: CartItem[];
  addToCart: (id: number) => void;
  getQuantity: (id: number) => number;
  decreaseQuantity: (id: number) => void;
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

  function getQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  }

  function addToCart(id: number) {
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

  function decreaseQuantity(id: number) {
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
        addToCart,
        getQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
