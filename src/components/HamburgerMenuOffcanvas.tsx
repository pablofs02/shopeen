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
                    to={"/shopeen/"}
                    className={location.pathname === "/shopeen/" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Home
                </Link>
                {/* Link to the Store page */}
                <Link
                    to={"/shopeen/store"}
                    className={location.pathname === "/shopeen/store" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Store
                </Link>
                {/* Link to the About page */}
                <Link
                    to={"/shopeen/about"}
                    className={location.pathname === "/shopeen/about" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    About
                </Link>
                {/* Link to the Help page */}
                <Link
                    to={"/shopeen/help"}
                    className={location.pathname === "/shopeen/help" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Help
                </Link>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
