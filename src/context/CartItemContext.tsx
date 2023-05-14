import { createContext } from "react";

export const CartItemContext = createContext({} as {
    id: number, // This is the id of the product
    getQuantityCart: (id: number) => number, // This function returns the quantity of an item in the cart
    addItem: (id: number) => void, // This function adds an item to the cart
    decreaseItemQuantity: (id: number) => void, // This function decreases the quantity of an item in the cart
    removeItem: (id: number) => void, // This function removes an item from the cart
    stock: number, // This is the stock of the product
    showWarningRemove: boolean, // This is a boolean to know if the warning for removing an item is being shown
    setShowWarningRemove: (show: boolean) => void // This function changes the value of the showWarningRemove variable
});
