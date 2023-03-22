import { useContext } from "react";
import { CartItemContext } from "../context/CartItemContext";


function CartButtons() {
    
    const { id, addToCart, getQuantity, decreaseQuantity } = useContext(CartItemContext);

    return (
    <div className="cart-buttons">
        <button className="btn btn-primary" onClick={() => {
          addToCart(id)
        }}>+</button>
        <button className="btn btn-danger" onClick={() => {
          if (getQuantity(id) === 0) return;
          decreaseQuantity(id);
        }}>-</button>
    </div>
  );
}

export default CartButtons;