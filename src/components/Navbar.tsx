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
  // Get the location
  const location = useLocation();

  // Variable to show the hamburger menu and handlers to show and hide it
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Variable to show the user menu and handlers to show and hide it
  const [showAcc, setShowAcc] = useState(false);
  const handleCloseAcc = () => setShowAcc(false);
  const handleShowAcc = () => setShowAcc(true);

  // Variable to show the cart and handlers to show and hide it
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => {
    setShowCart(false);
    setShowPopover(false);
  };
  const handleShowCart = () => setShowCart(true);

  // Get the cart items and the function to set them from the context
  const { cartItems, setCartItems } = useGlobalContext();

  // Get the popover state and the function to set it from the context
  const [showPopover, setShowPopover] = useState(false);

  // Function to handle the cleaning of the cart
  const handleCleanCart = () => {
    setCartItems([]);
    setShowPopover(false);
  };

  // Function to navigate to another page
  const navigate = useNavigate();

  // We calculate the total price of the cart
  const totalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = storeItems.find(
      (storeItem) => storeItem.id === item.id
    )?.price;
    return acc + itemPrice! * item.quantity;
  }, 0);

  return (
    <>
      <Container className="navbarTop">
        <img src={logo} alt="shopeen logo" className="logo"></img>
        <Row md={4} lg={4} className="text-center">
          {/* THe hamburger menu for when the screen is small */}
          <Col className="hamburger-menu">
            <button tabIndex={0} className="hamburger-button" onClick={handleShow}>
              <img
                src={hamburger}
                alt="hamburger menu button"
              />
            </button>
          </Col>
          {/* Link to the Home page */}
          <Col className={location.pathname === "/ProyIU/" ? "active-page" : ""}>
            <Link to={"/ProyIU/"}>Home</Link>
          </Col>
          {/* Link to the Store page */}
          <Col className={location.pathname === "/ProyIU/store" ? "active-page" : ""}>
            <Link to={"/ProyIU/store"}>Store</Link>
          </Col>
          {/* Link to the About page */}
          <Col className={location.pathname === "/ProyIU/about" ? "active-page" : ""}>
            <Link to={"/ProyIU/about"}>About</Link>
          </Col>
          {/* Link to the Help page */}
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
