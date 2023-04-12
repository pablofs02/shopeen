import { useState } from "react";
import { Row, Button, Container, Col, Offcanvas } from "react-bootstrap/";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import About from "../pages/About";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Store from "../pages/Store";
import CartItem from "./CartItem";
import SearchBar from "./SearchBar";
import { useGlobalContext } from "../context/GlobalContext";

function Navbar() {
  const location = useLocation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAcc, setShowAcc] = useState(false);
  const handleCloseAcc = () => setShowAcc(false);
  const handleShowAcc = () => setShowAcc(true);

  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const { cartItems, setCartItems } = useGlobalContext();

  const handleCleanCart = () => {
    setCartItems([]);
  };

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
              <img
                src="/src/assets/shopping_cart.svg"
                alt="shopping cart"
                className="cursor-pointer"
                onClick={handleShowCart}
              />
              {cartItems.length > 0 ? <div className="cart-amount">{cartItems.length}</div> : null}
            </div>

            <img src="/src/assets/account.svg" alt="my account" onClick={handleShowAcc} />
          </>
        )}

        {/* Offcanvas of user cart */}
        <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>My cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc p-2">
            <h3>Number of items in cart: {cartItems.length}</h3>
            <Container className="p-3">
              {cartItems.map((item) => (
                <CartItem key={item.id} id={item.id} quantity={item.quantity}></CartItem>
              ))}
            </Container>
          </Offcanvas.Body>
          <div className="clean-cart">
            <button onClick={handleCleanCart}>Clean Cart</button>
          </div>
        </Offcanvas>

        {/* Offcanvas of the user account */}
        <Offcanvas show={showAcc} onHide={handleCloseAcc} placement="end">
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>My account</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc">
            <h3>Placeholder info about the account</h3>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </>
  );
}

export default Navbar;
