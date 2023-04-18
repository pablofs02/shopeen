import { createContext } from "react";

export const CartItemContext = createContext({} as {
    id: number,
    getQuantityCart: (id: number) => number,
    addItem: (id: number) => void,
    decreaseItemQuantity: (id: number) => void,
    removeItem: (id: number) => void,
    stock: number,
    showWarningRemove: boolean,
    setShowWarningRemove: (show: boolean) => void
});
