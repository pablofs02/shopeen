import { useEffect, useState } from "react";

function SearchBar() {
  return (
    <input
      type="text"
      className="searchBar"
    />
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