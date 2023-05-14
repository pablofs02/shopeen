import { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CartItemContext } from "../context/CartItemContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

// Props for the CartButtons component
interface CartButtonsProps {
  showCart: boolean; // Boolean to know if the cart is being shown
}

export default function CartButtons(props: CartButtonsProps) {
  
  // Get the necessary functions and variables from the context
  const { id, addItem, getQuantityCart, decreaseItemQuantity, removeItem, stock, showWarningRemove, setShowWarningRemove } =
    useContext(CartItemContext);

  // Warning for when the user tries to add more items than the stock  
  const renderTooltip = <Tooltip>No more stock available</Tooltip>;

  // Variable to show the warning
  const [show, setShow] = useState(false);

  // Update the show variable when the quantity of the item changes
  useEffect(() => {
    setShow(getQuantityCart(id) === stock && props.showCart);
  });

  // Get the cart items 
  const {cartItems} = useGlobalContext()

  // Function to change the location
  const navigate = useNavigate()

  return (
    <div className="cart-buttons">
      {showWarningRemove ? (
        <div className="warning-buttons">
          {/* Button for finally removing the item */}
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

          {/* Button for keeping the item */}
          <Button
            onClick={() => {
              setShowWarningRemove(false);
            }}>
            Keep
          </Button>
        </div>
      ) : (
        <>
          {/* Button for increasing the item quantity */}
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

          {/* Button for decreasing the item from the cart */}
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

          {/* Button to remove the item from the cart */}
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
