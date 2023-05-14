import { Button, Container, Offcanvas, Popover } from "react-bootstrap";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { formatCurrency } from "../utilities/formatCurrency";

// The props of this component are the following:
type CartOffcanvasProps = {
    showCart: boolean; // Whether the cart is shown or not
    handleCloseCart: () => void; // Function to close the cart
    cartItems: any[]; // The items in the cart
    showPopover: boolean; // Whether the popover is shown or not
    handleCleanCart: () => void; // Function to clean the cart
    location: any; // The location of the page
    navigate: (path: string) => void; // Function to navigate to another page
    setShowPopover: (value: boolean) => void; // Function to set the value of showPopover
    totalPrice: number; // The total price of the items in the cart
};

export default function CartOffcanvas(props: CartOffcanvasProps) {
    return (
        <Offcanvas aria-label="Shopping cart" show={props.showCart} onHide={props.handleCloseCart} placement="end">
            <Offcanvas.Header className="header-oc" closeButton>
                <Offcanvas.Title>My cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="body-oc p-2 pt-0 mt-4">
                <div className="clean-button d-flex justify-content-between w-100">
                    <h4 tabIndex={0} className="me-0 text-left">
                        Items in cart: {props.cartItems.length}
                    </h4>
                    {props.showPopover ? ( // Popover to confirm cleaning cart
                        <Popover id="popover-basic">
                            <Popover.Header as="h2">Confirmation</Popover.Header>
                            <Popover.Body>
                                <p className="fs-6">
                                    <strong tabIndex={0}>Are you sure you want to clean your cart?</strong>
                                </p>
                                <div className="d-flex justify-content-between">
                                    {/* Button to confirm the cleaning of the cart */}
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            props.handleCleanCart();
                                            if (location.pathname === "/ProyIU/purchase") {
                                                props.navigate("/ProyIU/store");
                                            }
                                        }}>
                                        Confirm cleaning
                                    </Button>
                                    {/* Button to cancel the cleaning of the cart */}
                                    <Button variant="primary" onClick={() => props.setShowPopover(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Popover.Body>
                        </Popover>
                    ) : (
                        // Button to clean the cart
                        <Button
                            onClick={() => props.setShowPopover(true)}
                            disabled={props.cartItems.length === 0}
                            variant="danger"
                            className="">
                            Clean cart
                            <FaTrashAlt className="ms-2" />
                        </Button>
                    )}
                </div>
                <Container className="p-3">
                    {/* Render each item in the cart */}
                    {props.cartItems.map((item) => (
                        <CartItem key={item.id} id={item.id} quantity={item.quantity} showCart={props.showCart}></CartItem>
                    ))}
                </Container>
            </Offcanvas.Body>
            <div className="total-price">
                <p>
                    <strong tabIndex={0}>Total price: {formatCurrency(props.totalPrice)}</strong>
                </p>
                {props.cartItems.length > 0 ? (
                    // Button to proceed to checkout
                    <Button
                        className="p-1 d-flex justify-content-center align-items-center"
                        onClick={() => {
                            props.handleCloseCart();
                            props.navigate("/ProyIU/purchase");
                        }}>
                        Proceed to checkout
                        <BsFillCartCheckFill className="ms-2" />
                    </Button>
                ) : null}
            </div>
        </Offcanvas>
    );
}
