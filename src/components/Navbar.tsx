import { useState } from "react";
import {
  Row,
  Button,
  Container,
  Col,
  Popover,
} from "react-bootstrap/";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useGlobalContext } from "../context/GlobalContext";
import storeItems from "../data/products.json";
import { useNavigate } from "react-router-dom";
import hamburger from "../assets/hamburger-menu.svg";
import account from "../assets/account.svg";
import shopping_cart from "../assets/shopping_cart.svg";
import logo from "../assets/shopeen.svg";
import HamburgerMenuOffcanvas from "./HamburgerMenuOffcanvas";
import CartOffcanvas from "./CartOffcanvas";
import UserOffcanvas from "./UserOffcanvas";

export default function Navbar() {
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
    const itemPrice = storeItems.find(
      (storeItem) => storeItem.id === item.id
    )?.price;
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
          <Button
            variant="danger"
            onClick={() => {
              handleCleanCart();
              if (location.pathname === "/ProyIU/purchase") {
                navigate("/ProyIU/store");
              }
            }}
          >
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
        <img src={logo} alt="shopeen logo" className="logo"></img>
        <Row md={4} lg={4} className="text-center">
          <Col className="hamburger-menu">
            <button className="hamburger-button" onClick={handleShow}>
              <img
                src={hamburger}
                alt="hamburger menu button"
              />
            </button>
          </Col>
          <Col className={location.pathname === "/ProyIU/" ? "active-page" : ""}>
            <Link to={"/ProyIU/"}>Home</Link>
          </Col>
          <Col className={location.pathname === "/ProyIU/store" ? "active-page" : ""}>
            <Link to={"/ProyIU/store"}>Store</Link>
          </Col>
          <Col className={location.pathname === "/ProyIU/about" ? "active-page" : ""}>
            <Link to={"/ProyIU/about"}>About</Link>
          </Col>
          <Col className={location.pathname === "/ProyIU/help" ? "active-page" : ""}>
            <Link to={"/ProyIU/help"}>Help</Link>
          </Col>
        </Row>

        {/* Offcanvas of hamburger menu navbar */}
        <HamburgerMenuOffcanvas show={show} handleClose={handleClose} location={location}/>

        {showCart || showAcc ? null : (
          <>
            <SearchBar></SearchBar>

            <div className="position-relative">
              <button onClick={handleShowCart} className="btn-icons">
                <img src={shopping_cart} alt="shopping cart" />
              </button>
              {cartItems.length > 0 ? (
                <div className="cart-amount">{cartItems.length}</div>
              ) : null}
            </div>

            <button onClick={handleShowAcc} className="btn-icons">
              <img src={account} alt="my account" />
            </button>
          </>
        )}

        {/* Offcanvas of user cart */}
        <CartOffcanvas showCart={showCart} handleCloseCart={handleCloseCart} cartItems={cartItems} showPopover={showPopover} handleCleanCart={handleCleanCart} location={location} navigate={navigate} setShowPopover={setShowPopover} totalPrice={totalPrice} />

        {/* Offcanvas of the user account */}
        <UserOffcanvas showAcc={showAcc} handleCloseAcc={handleCloseAcc} />
      </Container>
    </>
  );
}
