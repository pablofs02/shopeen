import { createContext, useState } from "react";
import { Card } from "react-bootstrap";
import CartButtons from "./CartButtons";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

// Create a context for the number of items of this type
export const CartItemContext = createContext({} as {count: number, setCount: (n: number) => void});

function CartItem(props: CartItemProps) {
  const [count, setCount] = useState(0);

  return (
    <Card className="cart-item">
      <Card.Img variant="top" src={props.image} height="125px" style={{ objectFit: "contain" }} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.price}</Card.Text>
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
