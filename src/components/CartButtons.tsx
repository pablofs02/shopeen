import { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

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
              if (cartItems.length == 1 && location.pathname === "/ProyIU/purchase") {
                navigate("/ProyIU/store");
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
            <Button
              className="d-flex justify-content-center align-items-center"
              variant={getQuantityCart(id) === stock ? "secondary" : "primary"}
              aria-disabled={getQuantityCart(id) === stock}
              onClick={() => {
                if (getQuantityCart(id) === stock) return;
                addItem(id);
              }}>
              <MdOutlineAdd title="Increase item quantity" />
            </Button>
          </OverlayTrigger>
          <Button
            className="d-flex justify-content-center align-items-center"
            variant="primary"
            onClick={() => {
              if (getQuantityCart(id) === 1) {
                setShowWarningRemove(true);
                return;
              }
              decreaseItemQuantity(id);
            }}>
            <MdOutlineRemove title="Decrease item quantity"/>
          </Button>

          <Button
            className="remove-item d-flex justify-content-center align-items-center"
            variant="danger"
            onClick={() => {
              setShowWarningRemove(true);
            }}>
            <RxCross1 title="Remove item from cart"/>
          </Button>
        </>
      )}
    </div>
  );
}

export default CartButtons;
