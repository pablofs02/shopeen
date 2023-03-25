import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useGlobalContext } from "../context/GlobalContext";
import storeItems from "../data/noRatingProducts.json";
import { useEffect } from "react";
import Filter from "../components/Filter";
import '../styles/FilterStyle.css'

function Store() {
  const {minPrice, maxPrice, getSearchBarValue, selectedOptions} = useGlobalContext();


  // To add accesibility we could check if the filter is not empty and then add a string saying Filtered by: {filter}

  return <>
    <Filter/>
    <section className="cuerpo">
      <h1>Store</h1>
      <Row md={2} lg={3} xs={1} className="g-3">
        {storeItems
          .filter((item) =>
            item.title.toLowerCase().includes(getSearchBarValue().toLowerCase()) &&
            item.price >= minPrice && item.price <= maxPrice &&
            (selectedOptions.length === 0 || selectedOptions.includes(item.category.toLowerCase()))
          )
          .map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
      </Row>
    </section>
    </>
}

export default Store;
