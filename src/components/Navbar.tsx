import { Row, Button, Container, Col } from "react-bootstrap/";
import { Routes, Route, Link } from "react-router-dom";
import About from "../pages/About";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Store from "../pages/Store";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <>
      <Container className="navbarTop">
        <Row>
          <Col>
            <Link to={"/"}>Home</Link>
          </Col>
          <Col>
            <Link to={"/about"}>About</Link>
          </Col>
          <Col>
            <Link to={"/store"}>Store</Link>
          </Col>
          <Col>
            <Link to={"/help"}>Help</Link>
          </Col>
        </Row>
        <SearchBar></SearchBar>
      </Container>
    </>
  );
}

export default Navbar;
