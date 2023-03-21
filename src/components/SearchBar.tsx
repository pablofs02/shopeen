import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function SearchBar() {
  const { setFilter } = useGlobalContext();

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <div className="searchBar">
      <input type="text" onChange={handleChange} />
      <Link to={"/store"}>
        <img src="/src/assets/search.svg" alt="search icon" />
      </Link>
    </div>
  );
}

export default SearchBar;

//The below example will make an async request for the data only after the user has stopped typing for 500ms. This is a very common use case for debouncing.
/*
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Make an async request for the data
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
}
*/
