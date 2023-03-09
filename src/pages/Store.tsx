import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/noRatingProducts.json";

function Store() {
  return (
    <section className="cuerpo">
      <h1>Store</h1>
      <Row md={2} lg={3} xs={1} className="g-3">
      {storeItems.map((item) => (
        <Col key={item.id}>
          <StoreItem {...item}></StoreItem>
        </Col>
      ))}
      </Row>
    </section>
  );
}

export default Store;
