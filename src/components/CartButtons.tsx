import { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";

interface CartButtonsProps {
  showCart: boolean;
}

function CartButtons(props: CartButtonsProps) {
  const { id, addItem, getQuantity, decreaseItemQuantity, removeItem, stock, showWarningRemove, setShowWarningRemove } =
    useContext(CartItemContext);

  const renderTooltip = <Tooltip>No more stock available</Tooltip>;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getQuantity(id) === stock && props.showCart);
  });

  return (
    <div className="cart-buttons">
      {showWarningRemove ? (
        <div className="warning-buttons">
          <Button
            onClick={() => {
              removeItem(id);
            }}
            variant="danger">
            Remove
          </Button>
          <Button
            onClick={() => {
              setShowWarningRemove(false);
            }}>
            Keep
          </Button>
        </div>
      ) : (
        <>
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
              if (getQuantity(id) === 1) {
                setShowWarningRemove(true);
                return;
              }
              decreaseItemQuantity(id);
            }}>
            -
          </button>

          <button
            className="btn btn-danger remove-item"
            onClick={() => {
              setShowWarningRemove(true);
            }}>
            x
          </button>
        </>
      )}
    </div>
  );
}

export default CartButtons;
