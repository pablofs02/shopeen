import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  return <div className="searchBar">
    <input type="text"/>
    <Link to={"/store"}>
      <img src="/src/assets/search.svg" alt="search icon" />
    </Link>
  </div>
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