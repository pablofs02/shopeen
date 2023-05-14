import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartButtons from "./CartButtons";
import storeItems from "../data/noRatingProducts.json";
import { useGlobalContext } from "../context/GlobalContext";

// The props for the component
interface CartItemProps {
  id: number; // The id of the product
  quantity: number; // The quantity of the product
  showCart: boolean; // If the cart is shown
}

export default function CartItem(props: CartItemProps) {
  // The item is the product with the id of the props
  const item = storeItems.find((item) => item.id === props.id);

  // The functions and variables are from the context
  const { getQuantityCart, addItem, decreaseItemQuantity, removeItem, boughtItemsQuantity } = useGlobalContext();

  // Variable to show the warning
  const [showWarningRemove, setShowWarningRemove] = useState(false)

  // Get the quantity of the item and the quantity bought 
  const quantity = getQuantityCart(props.id);
  const quantityBought = boughtItemsQuantity.find((item) => item.id === props.id)?.quantity || 0;

  // Get the stock of the item
  const id = props.id;
  const stock: number = item!.stock - quantityBought;

  // If the item doesn't exist or the quantity is 0, return null
  if (!item || quantity <= 0) return null;

  return (
    <Row className="mb-3">
      <Col>
        <Card className="cart-item">
          <Card.Img
            variant="top" src={item.image} height="100px" style={{ objectFit: "contain" }} />
          <Card.Body>
            <Card.Title tabIndex={0} >{item.title}</Card.Title> 
            <Card.Text tabIndex={0} className="text-muted">Total: {formatCurrency(item.price * quantity)}</Card.Text>
          </Card.Body>
          <CartItemContext.Provider value={{ id, addItem, getQuantityCart, decreaseItemQuantity, removeItem, stock, showWarningRemove, setShowWarningRemove }}>
            <div className="count-buttons">
              <h5 tabIndex={0} className="me-auto">Quantity: {quantity}</h5>
              <CartButtons showCart={props.showCart}/>
            </div>
          </CartItemContext.Provider>
        </Card>
      </Col>
    </Row>
  );
}
