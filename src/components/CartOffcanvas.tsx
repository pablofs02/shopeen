import { Button, Container, Offcanvas, Popover } from "react-bootstrap";
import CartItem from "./CartItem";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { formatCurrency } from "../utilities/formatCurrency";

type CartOffcanvasProps = {
    showCart: boolean;
    handleCloseCart: () => void;
    cartItems: any[];
    showPopover: boolean;
    handleCleanCart: () => void;
    location: any;
    navigate: (path: string) => void;
    setShowPopover: (value: boolean) => void;
    totalPrice: number;
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
                                    <Button variant="primary" onClick={() => props.setShowPopover(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Popover.Body>
                        </Popover>
                    ) : (
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
