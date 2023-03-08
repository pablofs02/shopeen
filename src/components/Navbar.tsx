import { useState } from "react";
import { Row, Button, Container, Col, Offcanvas } from "react-bootstrap/";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import About from "../pages/About";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Store from "../pages/Store";
import SearchBar from "./SearchBar";

function Navbar() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="navbarTop">
        <Row md={2} lg={4} s={2} xs={1}>
          <Col className="hamburger-menu">
            <button className="hamburger-button" onClick={handleShow}>
              <img src="/src/assets/hamburger-menu.svg" alt="hamburger menu button" />
            </button>
          </Col>
          <Col>
            <Link to={"/"}  className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </Col>
          <Col>
            <Link to={"/about"} className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          </Col>
          <Col>
            <Link to={"/store"} className={location.pathname === '/store' ? 'active' : ''}>Store</Link>
          </Col>
          <Col>
            <Link to={"/help"} className={location.pathname === '/help' ? 'active' : ''}>Help</Link>
          </Col>
        </Row>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header className="header-oc" closeButton>
            <Offcanvas.Title>Navigation options</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="body-oc">
            <Link to={"/"}  className={location.pathname === '/' ? 'active' : ''} onClick={handleClose}>Home</Link>
            <Link to={"/about"} className={location.pathname === '/about' ? 'active' : ''} onClick={handleClose}>About</Link>
            <Link to={"/store"} className={location.pathname === '/store' ? 'active' : ''} onClick={handleClose}>Store</Link>
            <Link to={"/help"} className={location.pathname === '/help' ? 'active' : ''} onClick={handleClose}>Help</Link>
          </Offcanvas.Body>
        </Offcanvas>

        <SearchBar></SearchBar>

        <Link to={"/store"}>
          <img src="/src/assets/shopping_cart.svg" alt="shopping cart"/>
        </Link>
        <Link to={"/"}>
          <img src="/src/assets/account.svg" alt="my account"/>
        </Link>
      </Container>
    </>
  );
}

export default Navbar;
