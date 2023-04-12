import { createContext, ReactNode, useContext, useState } from "react";
import products from "../data/products.json";

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  cartItems: CartItem[];
  addItem: (id: number) => void;
  getQuantity: (id: number) => number;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  setCartItems: (items: CartItem[]) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
};

type UserInfo = {
  name: string;
  lastName: string;
  email: string;
  address: string;
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
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John",
    lastName: "Cena",
    email: "johncena@example.com",
    address: "5th Avenue",
  });

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
        cartItems,
        addItem,
        getQuantity,
        decreaseItemQuantity,
        removeItem,
        setCartItems,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

  /**
   * This function return a list of random items.
   */
export function loadRandomItems() {
    let item1 = products[Math.floor(Math.random()*products.length)];
    let item2 = products[Math.floor(Math.random()*products.length)];
    let item3 = products[Math.floor(Math.random()*products.length)];
    return [item1, item2, item3];
}
