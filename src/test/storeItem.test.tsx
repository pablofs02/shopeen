import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react"
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
    stock: 4,
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

    test("should render the button to open the filter", () => {
        // We can use the screen object from the testing-library to get the elements we want to test
        expect(screen.getByText("Filter options...")).toBeDefined();
    });

    test("should not render the filter options when the button has not been clicked", () => {
        // It should not appear the filter options when the button has not been clicked
        expect(screen.queryByText("Price range")).toBeNull();
        expect(screen.queryByText("Category")).toBeNull();
    });

    test("should render the filter options when the button is clicked", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We check that the filter options are rendered
        expect(screen.getByText("Price range")).toBeDefined();
        expect(screen.getByText("Category")).toBeDefined();
        expect(screen.getAllByRole("checkbox")).toHaveLength(4);
        expect(screen.getAllByText("Clear")).toHaveLength(2);
    });

    test("should hide the filter options when the button apply filter is clicked", async () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We get the apply filter button and simulate a click event
        const applyButton = screen.getByText("Apply filter");
        fireEvent.click(applyButton);

        // We check that the filter options are not rendered
        await waitFor(() => {
            expect(screen.queryByText("Price range")).toBeNull();
            expect(screen.queryByText("Category")).toBeNull();
        });
    });

    test("should not be any values for the min and max price" , () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We check that the min and max price inputs have the default values
        const minPriceInput = screen.getByTitle("Enter a min price") as HTMLInputElement;
        const maxPriceInput = screen.getByTitle("Enter a max price") as HTMLInputElement;
        expect(minPriceInput.value).toBe('0');
        expect(maxPriceInput.value).toBe('10000');
    });

    test("should render a warning when one of the price inputs is empty" , () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We change the min price input value to empty
        const maxPriceInput = screen.getByTitle("Enter a max price");
        fireEvent.change(maxPriceInput, { target: { value: "" } });

        // We check that the warning is rendered
        expect(screen.getByText("Please fill out all fields")).toBeDefined();
    });

    test("should render a warning when the min price is greater than the max price" , () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We change the max price to a value lower than the min price
        const minPriceInput = screen.getByTitle("Enter a min price");
        const maxPriceInput = screen.getByTitle("Enter a max price");
        fireEvent.change(minPriceInput, { target: { value: "50" } });
        fireEvent.change(maxPriceInput, { target: { value: "10" } });

        // We check that the warning is rendered
        expect(screen.getByText("The max price should be greater than the min price")).toBeDefined();
    });

    test("should change the max and min price values when entered its value" , () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We change the max and min price values
        const minPriceInput = screen.getByTitle("Enter a min price") as HTMLInputElement;;
        const maxPriceInput = screen.getByTitle("Enter a max price") as HTMLInputElement;;
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });

        // We check that the values have changed
        expect(minPriceInput.value).toEqual("10");
        expect(maxPriceInput.value).toEqual("50");
    });

    test("should not check any category by default", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We check that the checkboxes are not checked
        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes.forEach(checkbox => {
            expect(checkbox.nodeValue).toBeFalsy();
        });
    });

    test("updates the selected categories", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We get the checkboxes
        const categoryInputs = screen.getAllByTitle("checkbox");
        const firstCategoryInput = categoryInputs[0] as HTMLInputElement;
        const secondCategoryInput = categoryInputs[1] as HTMLInputElement;
        const thirdCategoryInput = categoryInputs[2] as HTMLInputElement;
        const fourthCategoryInput = categoryInputs[3] as HTMLInputElement;

        // We check the first and second category
        fireEvent.click(firstCategoryInput);
        fireEvent.click(secondCategoryInput);

        // We check that the first and second category are checked and the third and fourth are not
        expect(firstCategoryInput.checked).toBeTruthy();
        expect(secondCategoryInput.checked).toBeTruthy();
        expect(thirdCategoryInput.checked).toBeFalsy();
        expect(fourthCategoryInput.checked).toBeFalsy();
    });

    test("should clear the price range when the button clear is clicked", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We change the max and min price values
        const minPriceInput = screen.getByTitle("Enter a min price") as HTMLInputElement;;
        const maxPriceInput = screen.getByTitle("Enter a max price") as HTMLInputElement;;
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });

        // We get the clear button and simulate a click event
        const clearButton = screen.getByTitle("clear price");
        fireEvent.click(clearButton);

        // We check that the values have changed to the default values
        expect(minPriceInput.value).toEqual("0");
        expect(maxPriceInput.value).toEqual("10000");
    });

    test("should clear the categories when the button clear is clicked", () => {
        // We get the button and simulate a click event
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        // We get the checkboxes
        const categoryInputs = screen.getAllByTitle("checkbox");
        const firstCategoryInput = categoryInputs[0] as HTMLInputElement;
        const secondCategoryInput = categoryInputs[1] as HTMLInputElement;
        const thirdCategoryInput = categoryInputs[2] as HTMLInputElement;
        const fourthCategoryInput = categoryInputs[3] as HTMLInputElement;

        // We check the first and second category
        fireEvent.click(firstCategoryInput);
        fireEvent.click(secondCategoryInput);

        // We get the clear button and simulate a click event
        const clearButton = screen.getByTitle("clear categories");
        fireEvent.click(clearButton);

        // We check that all the categories are not checked
        expect(firstCategoryInput.checked).toBeFalsy();
        expect(secondCategoryInput.checked).toBeFalsy();
        expect(thirdCategoryInput.checked).toBeFalsy();
        expect(fourthCategoryInput.checked).toBeFalsy();
    });

});
