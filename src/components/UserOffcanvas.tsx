import { Offcanvas } from "react-bootstrap";
import UserAccount from "./UserAccount";

// The props of the component
type UserOffcanvasProps = {
    showAcc: boolean; // Whether the offcanvas is shown or not
    handleCloseAcc: () => void; // Function to close the offcanvas
}

export default function UserOffcanvas(props: UserOffcanvasProps) {
    return (
        <Offcanvas show={props.showAcc} onHide={props.handleCloseAcc} placement="end">
            <Offcanvas.Header className="header-oc" closeButton>
                <Offcanvas.Title>My account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="body-oc">
                <UserAccount />
            </Offcanvas.Body>
        </Offcanvas>
    );
}
