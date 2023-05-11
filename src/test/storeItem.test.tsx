import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react"
import Filter from "../components/Filter";
import { describe } from "vitest";
import { FilterProvider } from '../context/FilterContext';

describe("Filter", () => {
    
    beforeEach(() => {
        render(
            <FilterProvider>
                <Filter />
            </FilterProvider>
        );
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });
    
    test("should render the button to open the filter", () => {
        expect(screen.getByText("Filter options...")).toBeDefined();
        expect(screen.getByText("Filter options...").tagName).toBe("BUTTON");
        expect(screen.getByText("Filter options...").getAttribute("class")).toBe("show-filter");
    });

    test("should not render the filter options when the button has not been clicked", () => {
        expect(screen.queryByText("Price range")).toBeNull();
        expect(screen.queryByText("Category")).toBeNull();
    });

    test("should render the filter options when the button is clicked", () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        expect(screen.getByText("Price range")).toBeDefined();
        expect(screen.getByText("Category")).toBeDefined();
        expect(screen.getAllByRole("checkbox")).toHaveLength(4);
        expect(screen.getAllByText("Clear")).toHaveLength(2);
    });

    test("should not be any values for the min and max price" , () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const minPriceInput = screen.getByTitle("Enter a min price");
        const maxPriceInput = screen.getByTitle("Enter a max price");
        expect(minPriceInput.nodeValue).toBeNull();
        expect(maxPriceInput.nodeValue).toBeNull();
    });

    test("should render a warning when one of the price inputs is empty" , () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const maxPriceInput = screen.getByTitle("Enter a max price");
        fireEvent.change(maxPriceInput, { target: { value: "" } });
        expect(screen.getByText("Please fill out all fields")).toBeDefined();
    });

    test("should render a warning when the min price is greater than the max price" , () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const minPriceInput = screen.getByTitle("Enter a min price");
        const maxPriceInput = screen.getByTitle("Enter a max price");
        fireEvent.change(minPriceInput, { target: { value: "50" } });
        fireEvent.change(maxPriceInput, { target: { value: "10" } });
        expect(screen.getByText("The max price should be greater than the min price")).toBeDefined();
    });

    test("should change the max and min price values when entered its value" , () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const minPriceInput = screen.getByTitle("Enter a min price");
        const maxPriceInput = screen.getByTitle("Enter a max price");
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });
        
        const applyButton = screen.getByText("Filter");
        fireEvent.click(applyButton);

        expect(minPriceInput.nodeValue).toEqual("10");
        expect(maxPriceInput.nodeValue).toEqual("50");
    });
    
    test("should not check any category by default", () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes.forEach(checkbox => {
            expect(checkbox.nodeValue).toBeFalsy();
        });
    });

});

/*


    test("updates the min and max price range values", () => {
        render(
            <FilterProvider>
                <Filter />
            </FilterProvider>
        );
        
        const minPriceInput = screen.getByLabelText("Min price:");
        const maxPriceInput = screen.getByLabelText("Max price:");
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });
        expect(minPriceInput.value).toEqual("10");
        expect(maxPriceInput.value).toEqual("50");
    });

    test("updates the selected categories", () => {
        render(
            <FilterProvider>
                <Filter />
            </FilterProvider>
        );
        
        const categoryInputs = screen.getAllByLabelText("category-checkbox");
        const firstCategoryInput = categoryInputs[0];
        const secondCategoryInput = categoryInputs[1];

        fireEvent.click(firstCategoryInput);
        expect(firstCategoryInput.checked).toBeTruthy();
        expect(secondCategoryInput.checked).toBeFalsy();

        fireEvent.click(secondCategoryInput);
        expect(firstCategoryInput.checked).toBeTruthy();
        expect(secondCategoryInput.checked).toBeTruthy();
    });

    test("clears the filter values", () => {
        render(
            <FilterProvider>
                <Filter />
            </FilterProvider>
        );
        
        const searchBarInput = screen.getByPlaceholderText("Search products...");
        fireEvent.change(searchBarInput, { target: { value: "test" } });

        const minPriceInput = screen.getByLabelText("Min price:");
        const maxPriceInput = screen.getByLabelText("Max price:");
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });

        const categoryInputs = screen.getAllByLabelText("category-checkbox");
        const firstCategoryInput = categoryInputs[0];
        const secondCategoryInput = categoryInputs[1];
        fireEvent.click(firstCategoryInput);
        fireEvent.click(secondCategoryInput);

        const clearButton = screen.getByText("Clear");
        fireEvent.click(clearButton);

        expect(searchBarInput.value).toEqual("");
        expect(minPriceInput.value).toEqual("");
        expect(maxPriceInput.value).toEqual("");
        expect(firstCategoryInput.checked).toBeFalsy();
        expect(secondCategoryInput.checked).toBeFalsy();
    });
});

*/