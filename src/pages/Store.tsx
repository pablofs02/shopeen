import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useGlobalContext } from "../context/GlobalContext";
import storeItems from "../data/noRatingProducts.json";
import Filter from "../components/Filter";
import "../styles/FilterStyle.css";
import { useFilterContext } from "../context/FilterContext";

function Store() {
  const { searchBarValue, minPriceActive, maxPriceActive, selectedCategoriesActive } = useFilterContext();

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
          <Filter />
        </div>
        <Row md={2} lg={3} xs={1} className="g-3">
          {storeItemsFiltered.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
          {storeItemsFiltered.length === 0 && (
            <div className="no-products">
              <h2>NO PRODUCTS FOUND</h2>
            </div>
          )}
        </Row>
      </section>
    </>
  );
}

export default Store;
