import { Row, Button, Container, Col } from "react-bootstrap/";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import About from "../pages/About";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Store from "../pages/Store";
import SearchBar from "./SearchBar";

function Navbar() {
  const location = useLocation();
  
  return (
    <>
      <Container className="navbarTop">
        <Row>
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
