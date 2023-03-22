import { createContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartButtons from "./CartButtons";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

function CartItem(props: CartItemProps) {
  const [count, setCount] = useState(1);

  return count > 0 ? (
    <Row>
      <Col>
        <Card className="cart-item">
          <Card.Img variant="top" src={props.image} height="125px" style={{ objectFit: "contain" }} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{formatCurrency(props.price * count)}</Card.Text>
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
