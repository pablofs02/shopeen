import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useGlobalContext } from "../context/GlobalContext";
import CartItem from "../components/CartItem";

function Purchase() {
    const { cartItems } = useGlobalContext()

    return (
        <>
          <section className="cuerpo">
            <div className="bar">
              <h1>Store</h1>
            </div>
            <Row md={2} lg={3} xs={1} className="g-3">
              {cartItems.map((item) => (
                <Col key={item.id}>
                  <CartItem id={item.id} quantity={item.quantity} showCart></CartItem>
                </Col>
              ))}
            </Row>
          </section>
        </>
      );
}

export default Purchase;