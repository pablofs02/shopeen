import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useGlobalContext } from "../context/GlobalContext";
import storeItems from "../data/noRatingProducts.json";
import { useEffect } from "react";

function Store() {
  const { getSearchBarValue } = useGlobalContext();


  // To add accesibility we could check if the filter is not empty and then add a string saying Filtered by: {filter}

  return (
    <section className="cuerpo">
      <h1>Store</h1>
      <Row md={2} lg={3} xs={1} className="g-3">
        {storeItems
          .filter((item) =>
            item.title.toLowerCase().includes(getSearchBarValue().toLowerCase())
          )
          .map((item) => (
            <Col key={item.id}>
              <StoreItem {...item}></StoreItem>
            </Col>
          ))}
      </Row>
    </section>
  );
}

export default Store;
