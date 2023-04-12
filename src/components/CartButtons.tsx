import { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";

function CartButtons() {
  const { id, addItem, getQuantity, decreaseItemQuantity, removeItem, stock } = useContext(CartItemContext);

  const renderTooltip = <Tooltip>No more stock available</Tooltip>;

  return (
    <div className="cart-buttons">
      <OverlayTrigger show={getQuantity(id) === stock} placement="bottom" overlay={renderTooltip}>
        <button
          disabled={getQuantity(id) === stock}
          className="btn btn-primary"
          onClick={() => {
            if (getQuantity(id) === stock) return;
            addItem(id);
          }}>
          +
        </button>
      </OverlayTrigger>
      <button
        className="btn btn-primary"
        onClick={() => {
          if (getQuantity(id) === 0) return;
          decreaseItemQuantity(id);
        }}>
        -
      </button>
      <button
        className="btn btn-danger remove-item"
        onClick={() => {
          removeItem(id);
        }}>
        x
      </button>
    </div>
  );
}

export default CartButtons;
