import { createContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartButtons from "./CartButtons";
import storeItems from "../data/noRatingProducts.json";
import { useGlobalContext } from "../context/GlobalContext";

interface CartItemProps {
  id: number;
  quantity: number;
}

function CartItem(props: CartItemProps) {
  const item = storeItems.find((item) => item.id === props.id);

  const { getQuantity, addItem, decreaseItemQuantity } = useGlobalContext();

  const quantity = getQuantity(props.id);

  const id = props.id;
  const stock: number = item!.stock;

  if (!item || quantity <= 0) return null;

  return (
    <Row className="mb-3">
      <Col>
        <Card className="cart-item">
          <Card.Img variant="top" src={item.image} height="100px" style={{ objectFit: "contain" }} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text className="text-muted">Total: {formatCurrency(item.price * quantity)}</Card.Text>
          </Card.Body>
          <CartItemContext.Provider value={{ id, addItem, getQuantity, decreaseItemQuantity, stock }}>
            <div className="count-buttons">
              <h5>Quantity: {quantity}</h5>
              <CartButtons />
            </div>
          </CartItemContext.Provider>
        </Card>
      </Col>
    </Row>
  );
}

export default CartItem;
