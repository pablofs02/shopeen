import { useContext } from "react";
import { CartItemContext } from "../context/CartItemContext";


function CartButtons() {
    
    const { id, addItem, getQuantity, decreaseItemQuantity, stock } = useContext(CartItemContext);

    return (
    <div className="cart-buttons">
        {getQuantity(id) === stock ? <p className="alert text-danger">Out of stock</p> : null}
        <button disabled={getQuantity(id) === stock} className="btn btn-primary" onClick={() => {
          if (getQuantity(id) === stock) return;
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