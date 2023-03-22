import { createContext, useState } from "react";
import { Card } from "react-bootstrap";
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
  const [count, setCount] = useState(0);

  return (
    <Card className="cart-item">
      <Card.Img variant="top" src={props.image} height="125px" style={{ objectFit: "contain" }} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{formatCurrency(props.price*count)}</Card.Text>
      </Card.Body>
      <CartItemContext.Provider value={{count,setCount}}>
        <div className="count-buttons">
          <h1>{count}</h1>
          <CartButtons />
        </div>
      </CartItemContext.Provider>
    </Card>
  );
}

export default CartItem;
