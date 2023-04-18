import { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

interface CartButtonsProps {
  showCart: boolean;
}

function CartButtons(props: CartButtonsProps) {
  const { id, addItem, getQuantityCart, decreaseItemQuantity, removeItem, stock, showWarningRemove, setShowWarningRemove } =
    useContext(CartItemContext);

  const renderTooltip = <Tooltip>No more stock available</Tooltip>;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getQuantityCart(id) === stock && props.showCart);
  });

  const {cartItems} = useGlobalContext()

  const navigate = useNavigate()

  return (
    <div className="cart-buttons">
      {showWarningRemove ? (
        <div className="warning-buttons">
          <Button
            onClick={() => {
              removeItem(id);
              if (cartItems.length == 1 && location.pathname === "/purchase") {
                navigate("/store");
              }
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
              disabled={getQuantityCart(id) === stock}
              className="btn btn-primary"
              onClick={() => {
                if (getQuantityCart(id) === stock) return;
                addItem(id);
              }}>
              +
            </button>
          </OverlayTrigger>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (getQuantityCart(id) === 1) {
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
