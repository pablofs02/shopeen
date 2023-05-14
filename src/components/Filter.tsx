import { useState, useEffect } from "react";
import { Alert, Offcanvas } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";
import { useFilterContext } from "../context/FilterContext";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function Filter() {
    // Variable and function to show the filter
    const [show, setShow] = useState(false);

    // Variables and functions from the context
    const {
        minPrice, // Minimum price of the range that is being shown
        maxPrice, // Maximum price of the range that is being shown
        minPriceActive, // Minimum price of the range 
        maxPriceActive, // Maximum price of the range 
        selectedCategories, // Categories that are selected
        handleCheckboxChange, // Function to handle the change of a checkbox
        handleClearCategory, // Function to clear the selected categories
        handleClearRange, // Function to clear the selected range
        handleMaxPriceChange, // Function to handle the change of the maximum price
        handleMinPriceChange, // Function to handle the change of the minimum price
        handleActiveFilter, // Function to handle the active filter
    } = useFilterContext(); 

    // Clear the filter when the component is mounted
    useEffect(() => {
        handleClearRange();
        handleClearCategory();
    }, []);

    return (
        <>
            <div className="filter">
                <>
                    {/* Button to show the filter options */}
                    <button
                        className="show-filter"
                        onClick={() => {
                            setShow(true);
                        }}>
                        Filter options...
                        {!show ? <AiFillCaretRight /> : <AiFillCaretDown />}
                    </button>
                    {/* Showing the selected categories and price range */}
                    <span tabIndex={0} className="selected ms-4">
                        {minPriceActive > 0 || maxPriceActive < 10000 ? (
                            <>
                                <span>{"Price range: " + minPriceActive + "€ - " + maxPriceActive + "€"}</span>
                                <br />
                            </>
                        ) : null}
                        {selectedCategories.length && !show
                            ? "Categories selected: " + selectedCategories.join(", ")
                            : null}
                    </span>
                </>
            </div>
            <Offcanvas
                show={show}
                onHide={() => {
                    setShow(!show);
                }}
                scroll={true}
                backdrop={false}
                className="filter-offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="filter-options p-0">
                    <div className="filter-range filters">
                        <div className="filter-header">
                            <h5>Price range</h5>
                            {/* Button for clearing the price range */}
                            <button aria-label="Clear price range" onClick={handleClearRange}>
                                Clear
                            </button>
                        </div>
                        <div className="filter-range-options">
                            {/* The maximum and minumum prices */}
                            <span className="text-muted">Min €</span> <span className="text-muted">Max €</span>
                            <input
                                type="number"
                                name="min"
                                placeholder={minPrice.toString()}
                                onChange={handleMinPriceChange}
                                min="0"
                                aria-label="Enter a min price"
                                role="textbox"
                                aria-multiline="false"
                            />
                            <input
                                type="number"
                                name="max"
                                placeholder={maxPrice.toString()}
                                onChange={handleMaxPriceChange}
                                min="0"
                                aria-label="Enter a max price"
                                role="textbox"
                                aria-multiline="false"
                            />
                        </div>
                        {/* Alert for when the min price is greater than the max price or when one of the inputs is empty*/}
                        {minPrice > maxPrice || isNaN(minPrice) || isNaN(maxPrice) ? (
                            <div tabIndex={0} className="mt-3 alert-red">
                                {minPrice > maxPrice ? (
                                    <span>The max price should be greater than the min price</span>
                                ) : (
                                    <span>Please fill out all fields</span>
                                )}
                            </div>
                        ) : null}
                    </div>
                    <div className="filter-category filters">
                        <div className="filter-header">
                            <h5>Category</h5>
                            {/* Button for clearing the categories */}
                            <button aria-label="Clear categories" onClick={handleClearCategory}>
                                Clear
                            </button>
                        </div>
                        <div className="filter-category-options">
                            {/* Men's clothing */}
                            <div>
                                <input
                                    type="checkbox"
                                    value="men's clothing"
                                    checked={selectedCategories.includes("men's clothing")}
                                    onChange={handleCheckboxChange}
                                    id="men's clothing"
                                />
                                <label htmlFor="men's clothing">Men's clothing</label>
                            </div>

                            {/* Jewelry */}
                            <div>
                                <input
                                    type="checkbox"
                                    value="jewelry"
                                    checked={selectedCategories.includes("jewelry")}
                                    onChange={handleCheckboxChange}
                                    id="jewelry"
                                />
                                <label htmlFor="jewelry">Jewelry</label>
                            </div>

                            {/* Electronics */}
                            <div>
                                <input
                                    type="checkbox"
                                    value="electronics"
                                    checked={selectedCategories.includes("electronics")}
                                    onChange={handleCheckboxChange}
                                    id="electronics"
                                />
                                <label htmlFor="electronics">Electronics</label>
                            </div>

                            {/* Women's clothing */}
                            <div>
                                <input
                                    type="checkbox"
                                    value="women's clothing"
                                    checked={selectedCategories.includes("women's clothing")}
                                    onChange={handleCheckboxChange}
                                    id="women's clothing"
                                />
                                <label htmlFor="women's clothing">Women's clothing</label>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
                <div className="filter-button">
                    {/* Button for apply the filter options */}
                    <button
                        onClick={(e) => {
                            if (minPrice <= maxPrice) {
                                handleActiveFilter(e);
                                setShow(false);
                            }
                        }}>
                        Apply filter
                    </button>
                </div>
            </Offcanvas>
        </>
    );
}

export default Filter;
