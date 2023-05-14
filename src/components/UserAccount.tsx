import { useGlobalContext } from "../context/GlobalContext";
import "../styles/UserAccountStyle.css"


export default function UserAccount() {
    // Get the user info from the context
    const { userInfo } = useGlobalContext();

    // Get the necessary info from the user
    const { name, lastName, email, address } = userInfo;

    return <>
        <h2 className="user-name">{name} {lastName}</h2>
        <div className="user-info mt-4">
            <h3>Your email: </h3> <p>{email}</p>
            <h3>Your address: </h3> <p>{address}</p>
        </div>
    </>
}
