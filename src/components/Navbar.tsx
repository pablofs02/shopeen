import { Row, Button, Container, Col } from "react-bootstrap/"
import { Routes, Route, Link } from "react-router-dom"
import About from "./About"
import Help from "./Help"
import Home from "./Home"
import Store from "./Store"

function Navbar() {
    return <>
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
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/store" element={<Store/>}></Route>
            <Route path="/help" element={<Help/>}></Route>
        </Routes>
    </>
}

export default Navbar
