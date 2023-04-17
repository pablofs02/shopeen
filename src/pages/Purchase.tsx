import { useGlobalContext } from "../context/GlobalContext";
import { PurchaseItem } from "../components/PurchaseItem";
import { Col, Row } from "react-bootstrap";

function Purchase() {
    const { cartItems } = useGlobalContext()

    return (
        <>
          <section className="cuerpo">
            <div className="bar">
              <h1>Purchase</h1>
            </div>
            <Row md={2} lg={3} xs={1} className="g-3">
              {cartItems.map((item:any) => (
                <Col key={item.id}>
                  <PurchaseItem {...item}  ></PurchaseItem>
                </Col>
              ))}
            </Row>
          </section>
        </>
      );
}

export default Purchase;