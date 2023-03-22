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

  return (
    <>
      <Container className="navbarTop">
        <Row md={4} lg={4} className="text-center">
          <Col className="hamburger-menu">
            <button className="hamburger-button" onClick={handleShow}>
              <img src="/src/assets/hamburger-menu.svg" alt="hamburger menu button" />
            </button>
          </Col>
          <Col>
            <Link to={"/"} className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </Col>
          <Col>
            <Link to={"/store"} className={location.pathname === "/store" ? "active" : ""}>
              Store
            </Link>
          </Col>
          <Col>
            <Link to={"/about"} className={location.pathname === "/about" ? "active" : ""}>
              About
            </Link>
          </Col>
          <Col>
            <Link to={"/help"} className={location.pathname === "/help" ? "active" : ""}>
              Help
            </Link>
          </Col>
        </Row>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>Navigation options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc">
            <Link to={"/"} className={location.pathname === "/" ? "active" : ""} onClick={handleClose}>
              Home
            </Link>
            <Link to={"/store"} className={location.pathname === "/store" ? "active" : ""} onClick={handleClose}>
              Store
            </Link>
            <Link to={"/about"} className={location.pathname === "/about" ? "active" : ""} onClick={handleClose}>
              About
            </Link>
            <Link to={"/help"} className={location.pathname === "/help" ? "active" : ""} onClick={handleClose}>
              Help
            </Link>
          </Offcanvas.Body>
        </Offcanvas>

        <SearchBar></SearchBar>

        <img
          src="/src/assets/shopping_cart.svg"
          alt="shopping cart"
          className="cursor-pointer"
          onClick={handleShowCart}
        />

        <img src="/src/assets/account.svg" alt="my account" onClick={handleShowAcc} />

        {/* Placeholder show */}
        <Offcanvas show={true} onHide={handleCloseCart} placement="end">
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>My cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc p-2">
            <h3>Placeholder info about the cart</h3>
            <Container>
              <Row>
                <Col>
                  <CartItem
                    id={1}
                    title={"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"}
                    price={109.95}
                    image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"></CartItem>
                </Col>
              </Row>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>

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
