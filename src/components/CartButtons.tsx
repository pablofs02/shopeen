import { useContext, useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";

interface CartButtonsProps {
  showCart: boolean;
}

function CartButtons(props: CartButtonsProps) {
  const { id, addItem, getQuantity, decreaseItemQuantity, removeItem, stock } = useContext(CartItemContext);

  const renderTooltip = <Tooltip>No more stock available</Tooltip>;

  const [show, setShow] = useState(false);

  useEffect(() => {
      setShow(getQuantity(id) === stock && props.showCart);
  });

  return (
    <div className="cart-buttons">
      <OverlayTrigger show={show} placement="bottom" overlay={renderTooltip}>
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
