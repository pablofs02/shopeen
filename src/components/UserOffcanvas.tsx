import { Offcanvas } from "react-bootstrap";
import UserAccount from "./UserAccount";

type UserOffcanvasProps = {
    showAcc: boolean;
    handleCloseAcc: () => void;
}

function UserOffcanvas(props: UserOffcanvasProps) {
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

export default UserOffcanvas;