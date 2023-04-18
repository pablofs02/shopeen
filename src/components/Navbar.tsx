import { useState } from "react";
import { Row, Button, Container, Col, Offcanvas, OverlayTrigger, Popover } from "react-bootstrap/";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import CartItem from "./CartItem";
import SearchBar from "./SearchBar";
import { useGlobalContext } from "../context/GlobalContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import UserAccount from "./UserAccount";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAcc, setShowAcc] = useState(false);
  const handleCloseAcc = () => setShowAcc(false);
  const handleShowAcc = () => setShowAcc(true);

  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => {
    setShowCart(false);
    setShowPopover(false);
  };

  const handleShowCart = () => setShowCart(true);

  const { cartItems, setCartItems } = useGlobalContext();

  const [showPopover, setShowPopover] = useState(false);

  const handleCleanCart = () => {
    setCartItems([]);
    setShowPopover(false);
  };

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = storeItems.find((storeItem) => storeItem.id === item.id)?.price;
    return acc + itemPrice! * item.quantity;
  }, 0);

  const confirmationCleanCart = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">Confirmation</Popover.Header>
      <Popover.Body>
        <p className="fs-6">
          <strong>Are you sure you want to clean your cart?</strong>
        </p>
        <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={() => {
            handleCleanCart();
            if (location.pathname === "/purchase") {
              navigate("/store");
            }
          }}>
            Confirm cleaning
          </Button>
          <Button variant="primary" onClick={() => setShowPopover(false)}>
            Cancel
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Container className="navbarTop">
        <Row md={4} lg={4} className="text-center">
          <Col className="hamburger-menu">
            <button className="hamburger-button" onClick={handleShow}>
              <img src="/src/assets/hamburger-menu.svg" alt="hamburger menu button" />
            </button>
          </Col>
          <Col className={location.pathname === "/" ? "active-page" : ""}>
            <Link to={"/"}>Home</Link>
          </Col>
          <Col className={location.pathname === "/store" ? "active-page" : ""}>
            <Link to={"/store"}>Store</Link>
          </Col>
          <Col className={location.pathname === "/about" ? "active-page" : ""}>
            <Link to={"/about"}>About</Link>
          </Col>
          <Col className={location.pathname === "/help" ? "active-page" : ""}>
            <Link to={"/help"}>Help</Link>
          </Col>
        </Row>

        {/* Offcanvas of hamburger menu navbar */}
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>Navigation options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc">
            <Link to={"/"} className={location.pathname === "/" ? "active-page" : ""} onClick={handleClose}>
              Home
            </Link>
            <Link to={"/store"} className={location.pathname === "/store" ? "active-page" : ""} onClick={handleClose}>
              Store
            </Link>
            <Link to={"/about"} className={location.pathname === "/about" ? "active-page" : ""} onClick={handleClose}>
              About
            </Link>
            <Link to={"/help"} className={location.pathname === "/help" ? "active-page" : ""} onClick={handleClose}>
              Help
            </Link>
          </Offcanvas.Body>
        </Offcanvas>

        {showCart || showAcc ? null : (
          <>
            <SearchBar></SearchBar>

            <div className="position-relative">
              <button onClick={handleShowCart} className="btn-icons">
                <img src="/src/assets/shopping_cart.svg" alt="shopping cart" />
              </button>
              {cartItems.length > 0 ? <div className="cart-amount">{cartItems.length}</div> : null}
            </div>

            <button onClick={handleShowAcc} className="btn-icons">
              <img src="/src/assets/account.svg" alt="my account" />
            </button>
          </>
        )}

        {/* Offcanvas of user cart */}
        <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>My cart</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="body-oc p-2 pt-0 mt-4">
            <div className="clean-button d-flex justify-content-between w-100">
              <h4 className="me-0 text-left">Items in cart: {cartItems.length}</h4>
              <OverlayTrigger trigger="click" placement="left" overlay={confirmationCleanCart} show={showPopover}>
                <Button
                  onClick={() => setShowPopover(true)}
                  disabled={cartItems.length === 0}
                  variant="danger"
                  className="">
                  Clean cart
                  <FaTrashAlt className="ms-2" />
                </Button>
              </OverlayTrigger>
            </div>
            <Container className="p-3">
              {cartItems.map((item) => (
                <CartItem key={item.id} id={item.id} quantity={item.quantity} showCart={showCart}></CartItem>
              ))}
            </Container>
          </Offcanvas.Body>
          <div className="total-price">
            <p>
              <strong>Total price: {formatCurrency(totalPrice)}</strong>
            </p>
            {cartItems.length > 0 ? (
              <Button
                className="p-1 d-flex justify-content-center align-items-center"
                onClick={() => {
                  handleCloseCart();
                  navigate("/purchase");
                }}>
                Proceed to checkout
                <BsFillCartCheckFill className="ms-2" />
              </Button>
            ) : null}
          </div>
        </Offcanvas>

        {/* Offcanvas of the user account */}
        <Offcanvas show={showAcc} onHide={handleCloseAcc} placement="end">
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>My account</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc">
            <UserAccount />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </>
  );
}

export default Navbar;
