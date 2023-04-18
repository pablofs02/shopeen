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
  showCart: boolean;
}

function CartItem(props: CartItemProps) {
  const item = storeItems.find((item) => item.id === props.id);

  const { getQuantityCart, addItem, decreaseItemQuantity, removeItem, boughtItemsQuantity } = useGlobalContext();

  const [showWarningRemove, setShowWarningRemove] = useState(false)

  const quantity = getQuantityCart(props.id);
  const quantityBought = boughtItemsQuantity.find((item) => item.id === props.id)?.quantity || 0;

  const id = props.id;
  const stock: number = item!.stock - quantityBought;

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
          <CartItemContext.Provider value={{ id, addItem, getQuantityCart, decreaseItemQuantity, removeItem, stock, showWarningRemove, setShowWarningRemove }}>
            <div className="count-buttons">
              <h5 className="me-auto">Quantity: {quantity}</h5>
              <CartButtons showCart={props.showCart}/>
            </div>
          </CartItemContext.Provider>
        </Card>
      </Col>
    </Row>
  );
}

export default CartItem;
