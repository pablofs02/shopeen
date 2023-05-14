import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import storeItems from "../data/noRatingProducts.json";
import Filter from "../components/Filter";
import "../styles/FilterStyle.css";
import { useFilterContext } from "../context/FilterContext";

export default function Store() {
  // We get the variables and context from the filter context
  const { searchBarValue, minPriceActive, maxPriceActive, selectedCategoriesActive } = useFilterContext();

  // We filter the items of the store
  const storeItemsFiltered = storeItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchBarValue.toLowerCase()) &&
      item.price >= minPriceActive &&
      item.price <= maxPriceActive &&
      (selectedCategoriesActive.length === 0 || selectedCategoriesActive.includes(item.category.toLowerCase()))
  );


  return (
    <>
    <h1 className="page-header">Store</h1>
      <section className="cuerpo">
        <div className="bar">
          {/* Rendering the filter */}
          <Filter />
        </div>
        <Row md={2} lg={3} xs={1} className="g-3">
          {/* Showing each item */}
          {storeItemsFiltered.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
          {storeItemsFiltered.length === 0 && (
            <div className="no-products">
              <h2 tabIndex={0}>NO PRODUCTS FOUND</h2>
            </div>
          )}
        </Row>
      </section>
    </>
  );
}
