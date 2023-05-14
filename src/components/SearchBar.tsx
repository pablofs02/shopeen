import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFilterContext } from "../context/FilterContext";
import { ImCross } from "react-icons/im";
import search from "../assets/search.svg";

export default function SearchBar() {
    // We get the variables and functions from the context
    const { setSearch, setSearchBarInput, searchBarValue } = useFilterContext();
    
    // Function to change the location
    const navigate = useNavigate();

    // We get the input element
    useEffect(() => {
        setSearchBarInput(document.querySelector("input"));
    }, []);

    // Function to handle the change of the input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBarInput(e.target);
        setSearch(e.target.value);
        navigate("/ProyIU/store");
    };

    return (
        <>
            <div className={searchBarValue ? "searchBar hide-bg" : "searchBar"}>
                {searchBarValue ? (
                    <ImCross
                        onClick={() => {
                            setSearch("");
                        }}
                        title="Clear search"
                    />
                ) : null}

                <input title="Search bar" aria-label="Search bar" type="text" onChange={handleChange} />

                <img
                    src={search}
                    alt="search icon"
                    onClick={() => {navigate("/ProyIU/store");}}
                />
            </div>
        </>
    );
}
