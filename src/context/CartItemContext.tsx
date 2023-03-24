import { createContext } from "react";

export const CartItemContext = createContext({} as {id: number, getQuantity: (id: number) => number, addItem: (id: number) => void, decreaseItemQuantity: (id: number) => void, stock: number});