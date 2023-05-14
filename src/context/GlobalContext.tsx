import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import noRatingProducts from "../data/noRatingProducts.json";

let products = noRatingProducts;

// This is the context that will hold the global state of the app
type GlobalProviderProps = {
  children: ReactNode;
};

// This is the type of the context
type GlobalContext = {
  boughtItemsQuantity: BoughtItemsQuantity[];
  boughtItems: Purchase[];
  setBoughtItems: (items: Purchase[]) => void; 
  cartItems: CartItem[];
  addItem: (id: number) => void;
  searchItem: (title: string) => void;
  getQuantityCart: (id: number) => number;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  setCartItems: (items: CartItem[]) => void;
  userInfo: UserInfo; 
  setUserInfo: (userInfo: UserInfo) => void;
};

// This is the type of the user info
type UserInfo = {
  name: string; // This is the name of the user
  lastName: string; // This is the last name of the user
  email: string; // This is the email of the user
  address: string; // This is the address of the user
};

// This is the type of the items in the cart
type CartItem = {
  id: number; // This is the id of the item
  quantity: number; // This is the quantity of the item
};

// This is the type of the items bought
type Purchase = {
  [key: number]: CartItem[]; // This is the id of the purchase and the items bought
};

// This is the type of the items bought and the quantity of each item
type BoughtItemsQuantity = {
  id: number;
  quantity: number;
};

const GlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  // We get the cart and bought items from local storage
  const cartLocalStorage = localStorage.getItem("cart");
  const boughtItemsLocalStorage = localStorage.getItem("boughtItems");

  // We set the states of the cart and bought items
  const [boughtItemsQuantity, setBoughtItemsQuantity] = useState<BoughtItemsQuantity[]>([]);

  // We set the states of the cart and bought items
  const [boughtItems, setBoughtItems] = useState<Purchase[]>(
    boughtItemsLocalStorage ? JSON.parse(boughtItemsLocalStorage) : []
  );

  // We set the state of the cart
  const [cartItems, setCartItems] = useState<CartItem[]>(cartLocalStorage ? JSON.parse(cartLocalStorage) : []);

  // We set the state of the user info
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John",
    lastName: "Cena",
    email: "johncena@example.com",
    address: "5th Avenue",
  });

  // We set the state of the bought items quantity
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // We set the state of the bought items quantity
  useEffect(() => {
    localStorage.setItem("boughtItems", JSON.stringify(boughtItems));
    setBoughtItemsQuantity([]);
    setBoughtItemsQuantity(getQuantityBought());
  }, [boughtItems]);

  /**
   * Function that gets the quantity of each item bought
   * @returns the quantity of each item bought
   */
  function getQuantityBought() {
    const result: BoughtItemsQuantity[] = [];
    boughtItems.forEach((item) => {
      const itemArray = Object.values(item)[0];
      itemArray.forEach((item) => {
        const itemIndex = result.findIndex((resultItem) => resultItem.id === item.id);
        if (itemIndex !== -1) {
          result[itemIndex].quantity += item.quantity;
        } else {
          result.push({ id: item.id, quantity: item.quantity });
        }
      });
    });
    return result;
  }

  /**
   * This function gets the quantity of an item in the cart
   * @param id Id of the item to get quantity of
   * @returns the quantity of the item in the cart
   */
  function getQuantityCart(id: number) {
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
   * This function change the page to the Store to search for the indicated product
   * @param id Id of the item to search on the store
   */
  function searchItem(title: string) {
    console.log(title);
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
        boughtItemsQuantity,
        boughtItems,
        setBoughtItems,
        cartItems,
        addItem,
        searchItem,
        getQuantityCart,
        decreaseItemQuantity,
        removeItem,
        setCartItems,
        userInfo,
        setUserInfo,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

/**
 * This function return a list of recommended items
 * @returns a list of recommended items
 */
export function loadRecommendations() {
  let items = products;
  let res = [];
  let elem = items[0];
  for (let i = 0; i < 3; i++) {
    do {
      let num = Math.floor(Math.random() * items.length);
      elem = items[num];
    } while (
      res.filter((x) => {
        return x.id == elem.id;
      }).length != 0 ||
      elem.stock <= 0
    );
    items = items.filter((x) => {
      return x != elem;
    });
    res.push(elem);
  }
  return res;
}

/**
 * This function return a list of bestseller items
 * @returns a list of bestseller items
 */
export function loadBestsellers() {
  let items = products;
  let res = [];
  let elem = items[0];
  for (let i = 0; i < 3; i++) {
    do {
      let num = Math.floor(Math.random() * items.length);
      elem = items[num];
    } while (
      res.filter((x) => {
        return x.id == elem.id;
      }).length != 0
    );
    items = items.filter((x) => {
      return x != elem;
    });
    res.push(elem);
  }
  return res;
}

/**
 * This function return a list of onstock items
 * @returns a list of items that are on stock
 */
export function loadOnStock() {
  let items = products;
  let res = [];
  let elem = items[0];
  for (let i = 0; i < 3; i++) {
    do {
      let num = Math.floor(Math.random() * items.length);
      elem = items[num];
    } while (elem.stock <= 0);
    items = items.filter((x) => {
      return x != elem;
    });
    res.push(elem);
  }
  return res;
}
