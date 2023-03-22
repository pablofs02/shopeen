import { createContext } from "react";

export const CartItemContext = createContext({} as {count: number, setCount: (n: number) => void});