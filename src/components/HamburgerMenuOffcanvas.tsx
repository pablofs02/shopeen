import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

type HamburgerMenuOffcanvasProps = {
    show: boolean;
    handleClose: () => void;
    location: any;
}

export default function HamburgerMenuOffcanvas(props: HamburgerMenuOffcanvasProps) {
    return (
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header className="header-oc" closeButton>
                <Offcanvas.Title>Navigation options</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="body-oc">
                <Link
                    to={"/ProyIU/"}
                    className={location.pathname === "/ProyIU/" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Home
                </Link>
                <Link
                    to={"/ProyIU/store"}
                    className={location.pathname === "/ProyIU/store" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    Store
                </Link>
                <Link
                    to={"/ProyIU/about"}
                    className={location.pathname === "/ProyIU/about" ? "active-page" : ""}
                    onClick={props.handleClose}>
                    About
                </Link>
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
