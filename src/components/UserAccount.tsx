import { useGlobalContext } from "../context/GlobalContext";
import "../styles/UserAccountStyle.css"


export default function UserAccount() {
    const { userInfo } = useGlobalContext();

    const { name, lastName, email, address } = userInfo;

    return <>
        <h2 className="user-name">{name} {lastName}</h2>
        <div className="user-info mt-4">
            <h3>Your email: </h3> <p>{email}</p>
            <h3>Your address: </h3> <p>{address}</p>
        </div>
    </>
}
