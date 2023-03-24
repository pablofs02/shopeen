import { useContext } from "react";
import { CartItemContext } from "../context/CartItemContext";


function CartButtons() {
    
    const { id, addItem, getQuantity, decreaseItemQuantity } = useContext(CartItemContext);

    return (
    <div className="cart-buttons">
        <button className="btn btn-primary" onClick={() => {
          addItem(id)
        }}>+</button>
        <button className="btn btn-danger" onClick={() => {
          if (getQuantity(id) === 0) return;
          decreaseItemQuantity(id);
        }}>-</button>
    </div>
  );
}

export default CartButtons;