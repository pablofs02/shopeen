import { createContext } from "react";

export const CartItemContext = createContext({} as {id: number, getQuantity: (id: number) => number, addToCart: (id: number) => void, decreaseQuantity: (id: number) => void});