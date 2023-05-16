import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import StoreItem from "../components/StoreItem";
import { describe } from "vitest";
import { GlobalProvider } from '../context/GlobalContext';

type StoreItemsProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
};

const item: StoreItemsProps = {
    id: 1,
    title: "Epic title",
    price: 420,
    description: "This item is just for a test",
    category: "",
    image: "https://imagenes.com/imagen123.png",
    stock: 2,
};

describe("StoreItem", () => {
    // We can use the render function from the testing-library to render the component we want to test
    beforeEach(() => {
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
    });

    // We can use the cleanup function from the testing-library to clean the DOM after each test
    afterEach(() => {
        cleanup();
    });

    test("Should render the button to add to cart at start", () => {
        // We can use the screen object from the testing-library to get the elements we want to test
        expect(screen.getByText("+ Add to cart")).toBeDefined();
    });

    test("Should not render the button to remove from cart at start", () => {
        // It should not appear the remove from cart options when the button has not been clicked
        expect(screen.queryByText("- Remove from cart")).toBeNull();
    });

    test("Should render the remove from cart and not the add to cart button when clicked", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("+ Add to cart");
        fireEvent.click(button);

        // We check that the button text are rendered correctly
        expect(screen.queryByText("+ Add to cart")).toBeNull();
        expect(screen.queryByText("- Remove from cart")).toBeDefined();
    });

    test("Added to cart when clicked on add to cart button", () => {
        const cart = localStorage.getItem("cart")?.toString();
        expect(cart).toBe(JSON.stringify([{id:1,quantity:1}]));
    });

    test("Should render the add to cart and not the remove from cart button when clicked", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("- Remove from cart");
        fireEvent.click(button);

        // We check that the button text are rendered correctly
        expect(screen.queryByText("+ Add to cart")).toBeDefined();
        expect(screen.queryByText("- Remove from cart")).toBeNull();
    });

    test("Added to cart when clicked on add to cart button", () => {
        const cart = localStorage.getItem("cart")?.toString();
        expect(cart).toBe(JSON.stringify([]));
    });
});
