import { Row, Button, Container, Col } from "react-bootstrap/";
import { Routes, Route, Link } from "react-router-dom";
import About from "../pages/About";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Store from "../pages/Store";

function Navbar() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
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
      </Container>
    </>
  );
}

export default Navbar;
