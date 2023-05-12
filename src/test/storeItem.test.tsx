import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Filter from "../components/Filter";
import { describe } from "vitest";
import { FilterProvider, useFilterContext } from '../context/FilterContext';
import { useContext } from 'react';



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

    test("should hide the filter options when the button apply filter is clicked", async () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const applyButton = screen.getByText("Apply filter");
        fireEvent.click(applyButton);
        await waitFor(() => {
            expect(screen.queryByText("Price range")).toBeNull();
            expect(screen.queryByText("Category")).toBeNull();
          });
    });

    test("should not be any values for the min and max price" , () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const minPriceInput = screen.getByTitle("Enter a min price") as HTMLInputElement;
        const maxPriceInput = screen.getByTitle("Enter a max price") as HTMLInputElement;
        expect(minPriceInput.value).toBe('0');
        expect(maxPriceInput.value).toBe('10000');
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
        const minPriceInput = screen.getByTitle("Enter a min price") as HTMLInputElement;;
        const maxPriceInput = screen.getByTitle("Enter a max price") as HTMLInputElement;;
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });
        expect(minPriceInput.value).toEqual("10");
        expect(maxPriceInput.value).toEqual("50");        
    });
    
    test("should not check any category by default", () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes.forEach(checkbox => {
            expect(checkbox.nodeValue).toBeFalsy();
        });
    });

    test("updates the selected categories", () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        
        const categoryInputs = screen.getAllByTitle("checkbox");
        const firstCategoryInput = categoryInputs[0] as HTMLInputElement;
        const secondCategoryInput = categoryInputs[1] as HTMLInputElement;
        const thirdCategoryInput = categoryInputs[2] as HTMLInputElement;
        const fourthCategoryInput = categoryInputs[3] as HTMLInputElement;

        fireEvent.click(firstCategoryInput);
        fireEvent.click(secondCategoryInput);

        expect(firstCategoryInput.checked).toBeTruthy();
        expect(secondCategoryInput.checked).toBeTruthy();
        expect(thirdCategoryInput.checked).toBeFalsy();
        expect(fourthCategoryInput.checked).toBeFalsy();
    });

    test("should clear the price range when the button clear is clicked", () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);
        
        const minPriceInput = screen.getByTitle("Enter a min price") as HTMLInputElement;;
        const maxPriceInput = screen.getByTitle("Enter a max price") as HTMLInputElement;;
        fireEvent.change(minPriceInput, { target: { value: "10" } });
        fireEvent.change(maxPriceInput, { target: { value: "50" } });

        const clearButton = screen.getByTitle("clear price");
        fireEvent.click(clearButton);

        expect(minPriceInput.value).toEqual("0");
        expect(maxPriceInput.value).toEqual("10000");
    });

    test("should clear the categories when the button clear is clicked", () => {
        const button = screen.getByText("Filter options...");
        fireEvent.click(button);

        const categoryInputs = screen.getAllByTitle("checkbox");
        const firstCategoryInput = categoryInputs[0] as HTMLInputElement;
        const secondCategoryInput = categoryInputs[1] as HTMLInputElement;
        const thirdCategoryInput = categoryInputs[2] as HTMLInputElement;
        const fourthCategoryInput = categoryInputs[3] as HTMLInputElement;

        fireEvent.click(firstCategoryInput);
        fireEvent.click(secondCategoryInput);

        const clearButton = screen.getByTitle("clear categories");
        fireEvent.click(clearButton);

        expect(firstCategoryInput.checked).toBeFalsy();
        expect(secondCategoryInput.checked).toBeFalsy();
        expect(thirdCategoryInput.checked).toBeFalsy();
        expect(fourthCategoryInput.checked).toBeFalsy();
    });

});
