import { expect, test } from 'vitest';
import { render, screen } from "@testing-library/react"
import Filter from "../components/Filter";
import { describe } from "vitest";
import { FilterProvider } from '../context/FilterContext';

describe("Filter", () => {
    test("Filter", () => {
        
        render(
            <FilterProvider>
                <Filter />
            </FilterProvider>
        )
        expect(screen.getByText("Filter options...")).toBeDefined();
    })
});
