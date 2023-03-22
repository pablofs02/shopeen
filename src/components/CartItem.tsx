import { createContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartButtons from "./CartButtons";
import storeItems from "../data/noRatingProducts.json";

interface CartItemProps {
  id: number;
  quantity: number;
}

function CartItem(props: CartItemProps) {
  const [count, setCount] = useState(1);

  const item = storeItems.find(item => item.id === props.id)

  if(!item) return null;

  return count > 0 ? (
    <Row>
      <Col>
        <Card className="cart-item">
          <Card.Img variant="top" src={item.image} height="100px" style={{ objectFit: "contain" }} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{formatCurrency(item.price * count)}</Card.Text>
          </Card.Body>
          <CartItemContext.Provider value={{ count, setCount }}>
            <div className="count-buttons">
              <h2>{count}</h2>
              <CartButtons />
            </div>
          </CartItemContext.Provider>
        </Card>
      </Col>
    </Row>
  ) : null;
}

export default CartItem;
