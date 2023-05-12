import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFilterContext } from "../context/FilterContext";
import { ImCross } from "react-icons/im";
import search from "../assets/search.svg";

export default function SearchBar() {
    const { setSearch, setSearchBarInput, searchBarValue } = useFilterContext();
    const navigate = useNavigate();

    useEffect(() => {
        setSearchBarInput(document.querySelector("input"));
    }, []);

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
