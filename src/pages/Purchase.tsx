import { useGlobalContext } from "../context/GlobalContext";
import PurchaseItem from "../components/PurchaseItem";
import { Button, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import { useEffect, useState } from "react";
import { useFilterContext } from "../context/FilterContext";

export default function Purchase() {
  // We get the variables and context from the global context
  const { cartItems, setCartItems, boughtItems, setBoughtItems } = useGlobalContext();

  // We set the state of the popover
  const [showPopover, setShowPopover] = useState(false);

  // We calculate the total price of the items in the cart
  const totalPrice: number = cartItems.reduce((acc, item) => {
    const itemPrice = storeItems.find((storeItem) => storeItem.id === item.id)?.price;
    return acc + itemPrice! * item.quantity;
  }, 0);

  // Cleaning the filter options
  const {handleClearCategory, handleClearRange} = useFilterContext();

    useEffect(() => {
        handleClearRange();
        handleClearCategory();
    }, []);

  // We handle the purchase
  const handleFinishPurchase = () => {
    const id: number = boughtItems.length;
    setBoughtItems([...boughtItems, { [id]: cartItems }]);
    setCartItems([]);
    setShowPopover(false);
  };

  // We create the popover
  const confirmationPurchase = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">Confirmation</Popover.Header>
      <Popover.Body>
        <p className="fs-6">
          <strong tabIndex={3} >Are you sure you want purchase the items?</strong>
        </p>
        <div className="d-flex justify-content-between">
          {/* Button to confirm the purchase */}
          <Button tabIndex={4} variant="primary" onClick={handleFinishPurchase}>
            Confirm purchase
          </Button>
          {/* Button for cancel the confirmation of the purchase */}
          <Button tabIndex={5} variant="danger" onClick={() => setShowPopover(false)}>
            Cancel
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );


  return (
    <>
      <h1 tabIndex={1} className="page-header">Purchase</h1>

      {cartItems.length > 0 ? (
        <div className="subtotal">
          <p>
            <strong tabIndex={1} >Total price: {formatCurrency(totalPrice)}</strong>
          </p>
          {/* Button to finish the purchase */}
          <OverlayTrigger trigger="click" placement="right" overlay={confirmationPurchase} show={showPopover}>
                <Button
                  tabIndex={2}
                  onClick={() => setShowPopover(true)}
                  variant="warning"
                  className="">
                  Finish purchase
                </Button>
          </OverlayTrigger>
        </div>
      ) : (
        <div className="purchase-finished">
          <h3 tabIndex={1}>Purchase finished correctly</h3>
        </div>
      )}
      <section className="cuerpo mt-4">
        <Row md={2} lg={3} xs={1} className="g-3">
          {/* Showing each items to purchase */}
          {cartItems.map((item: any) => (
            <Col key={item.id}>
              <PurchaseItem {...item}></PurchaseItem>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}
