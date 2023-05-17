import { afterEach, expect, test } from 'vitest';
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

// Base object used on ALMOST every test
const item: StoreItemsProps = {
    id: 1,
    title: "Epic title",
    price: 420,
    description: "This item is just for a test",
    category: "",
    image: "https://imagenes.com/imagen123.png",
    stock: 2,
};

// Used to test the nostock functionality
const noStock: StoreItemsProps = {
    id: 2,
    title: "Epic title",
    price: 420,
    description: "This item is just for a test",
    category: "",
    image: "https://imagenes.com/imagen123.png",
    stock: 0,
};

describe("StoreItem", () => {
    // We can use the cleanup function from the testing-library to clean the DOM after each test
    afterEach(() => {
        cleanup();
    });

    test("Should render the button to add to cart at start", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We can use the screen object from the testing-library to get the elements we want to test
        expect(screen.getByText("+ Add to cart")).toBeDefined();
    });

    test("Should not render the button to remove from cart at start", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // It should not appear the remove from cart options when the button has not been clicked
        expect(screen.queryByText("- Remove from cart")).toBeNull();
    });

    test("Should render the remove from cart and not the add to cart button when clicked", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We get the button and simulate a click event
        const button = screen.getByText("+ Add to cart");
        fireEvent.click(button);

        // We check that the button text are rendered correctly
        expect(screen.queryByText("+ Add to cart")).toBeNull();
        expect(screen.queryByText("- Remove from cart")).toBeDefined();
    });

    test("Added to cart (localStorage) when clicked on add to cart button", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We check that there is the expected object in localStorage
        const cart = localStorage.getItem("cart")?.toString();
        expect(cart).toBe(JSON.stringify([{id:1,quantity:1}]));
    });

    test("Should render the add to cart and not the remove from cart button when clicked", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We get the button and simulate a click event
        const button = screen.getByText("- Remove from cart");
        fireEvent.click(button);

        // We check that the button text are rendered correctly
        expect(screen.queryByText("+ Add to cart")).toBeDefined();
        expect(screen.queryByText("- Remove from cart")).toBeNull();
    });

    test("Added to cart (localStorage) when clicked on add to cart button", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We check that there is the expected object in localStorage
        const cart = localStorage.getItem("cart")?.toString();
        expect(cart).toBe(JSON.stringify([]));
    });

    test("Should render the show more button at start", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // It should appear the show more option at start
        expect(screen.getByText("Show More")).toBeDefined();
    })

    test("Should not render the show less button at start", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // It should not appear the show less option when the button has not been clicked
        expect(screen.queryByText("Show Less")).toBeNull();
    })

    test("Should render the show less and not the show more button when clicked", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We get the button and simulate a click event
        const button = screen.getByText("Show More");
        fireEvent.click(button);

        // We check that the button text are rendered correctly
        expect(screen.queryByText("Show Less")).toBeDefined();
        expect(screen.queryByText("Show More")).toBeNull();
    })

    test("Should render the button as started when clicked on show less", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...item}></StoreItem>
            </GlobalProvider>
        );
        // We get the button and simulate a click event two times
        const button1 = screen.getByText("Show More");
        fireEvent.click(button1);
        const button = screen.getByText("Show Less");
        fireEvent.click(button);

        // We check that the button text are rendered correctly
        expect(screen.queryByText("Show More")).toBeDefined();
        expect(screen.queryByText("Show Less")).toBeNull();
    })

    test("Should be a tag of no stock and no add to cart button when quantity equals 0", () => {
        // We can use the render function from the testing-library to render the component we want to test
        render(
            <GlobalProvider>
                <StoreItem {...noStock}></StoreItem>
            </GlobalProvider>
        );
        // We check that it shows that there is the nostock message and not the add to cart button
        expect(screen.queryByText("There is no stock left.")).toBeDefined();
    })
});
