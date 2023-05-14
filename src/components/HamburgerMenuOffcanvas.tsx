import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

// The props of the component
type HamburgerMenuOffcanvasProps = {
    show: boolean; // Whether the offcanvas is shown or not
    handleClose: () => void; // Function to close the offcanvas
    location: any; // The location of the page
}

export default function HamburgerMenuOffcanvas(props: HamburgerMenuOffcanvasProps) {
    return (
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header className="header-oc" closeButton>
                <Offcanvas.Title>Navigation options</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="body-oc">
                {/* Link to the Home page */}
                <Link
                    to={"/ProyIU/"}
                    className={location.pathname === "/ProyIU/" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Home
                </Link>
                {/* Link to the Store page */}
                <Link
                    to={"/ProyIU/store"}
                    className={location.pathname === "/ProyIU/store" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Store
                </Link>
                {/* Link to the About page */}
                <Link
                    to={"/ProyIU/about"}
                    className={location.pathname === "/ProyIU/about" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    About
                </Link>
                {/* Link to the Help page */}
                <Link
                    to={"/ProyIU/help"}
                    className={location.pathname === "/ProyIU/help" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Help
                </Link>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
