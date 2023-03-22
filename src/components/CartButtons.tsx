import { useContext } from "react";
import { CartItemContext } from "../context/CartItemContext";


function CartButtons() {
    
    const {count, setCount} = useContext(CartItemContext);

    return (
    <div className="cart-buttons">
        <button className="btn btn-primary" onClick={() => {
          setCount(count + 1)
        }}>+</button>
        <button className="btn btn-danger" onClick={() => {
          if (count === 0) return;
          setCount(count - 1)
        }}>-</button>
    </div>
  );
}

export default CartButtons;