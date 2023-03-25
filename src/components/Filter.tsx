import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

function Filter() {
  const [show, setShow] = useState(false);

  const [minPrice, setMinPrice] = useState(0); // This is the state that will hold the min price from the range
  const [maxPrice, setMaxPrice] = useState(10000); // This is the state that will hold the max price from the range

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // This is the state that will hold the selected options from the checkboxes

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    setSelectedOptions((prevSelectedOptions) => {
      if (isChecked) {
        return [...prevSelectedOptions, option];
      } else {
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
      }
    });
  };

  const handleClearCategory = () => {
    setSelectedOptions([]);
  };

  const handleClearRange = () => {
    setMinPrice(0);
    setMaxPrice(10000);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setMinPrice(0);
    } else {
      setMinPrice(parseInt(event.target.value));
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setMaxPrice(0);
    } else {
      setMaxPrice(parseInt(event.target.value));
    }
  };

  return (
    <>
      <div className="filter">
        {show ? null : (
          <button
            className="show-filter"
            onClick={() => {
              setShow(true);
            }}>
            Filter options...
          </button>
        )}
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
              <button onClick={handleClearRange}>Clear</button>
            </div>
            <div className="filter-range-options">
              <span className="text-muted">Min €</span> <span className="text-muted">Max €</span>
              <input type="number" name="min" value={minPrice} onChange={handleMinPriceChange} placeholder="0" />
              <input type="number" name="max" value={maxPrice} onChange={handleMaxPriceChange} placeholder="10000" />
              <button
                onClick={() => {
                  console.log(`${minPrice} <-> ${maxPrice}`);
                }}>
                Filter
              </button>
            </div>
          </div>
          <div className="filter-category filters">
            <div className="filter-header">
              <h5>Category</h5>
              <button onClick={handleClearCategory}>Clear</button>
            </div>
            <div className="filter-category-options">
              {/* Men's clothing */}
              <div>
                <input
                  type="checkbox"
                  value="men's clothing"
                  checked={selectedOptions.includes("men's clothing")}
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
                  checked={selectedOptions.includes("jewelry")}
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
                  checked={selectedOptions.includes("electronics")}
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
                  checked={selectedOptions.includes("women's clothing")}
                  onChange={handleCheckboxChange}
                  id="women's clothing"
                />
                <label htmlFor="women's clothing">Women's clothing</label>
              </div>

              <button>Filter</button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Filter;
