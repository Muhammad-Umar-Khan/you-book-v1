import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./SearchFilter.css";

//can be moved inside the SearchFilter component;
function debounced(func, timeout = 300) {
  let timer;
  return (...args) => {
    console.log(args);
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const SearchFilter = ({ setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  async function loadFiltredUsers(searchTerm) {
    let response = await axios.get(
      `https://jsonplaceholder.typicode.com/users?q=${searchTerm}`
    );
    setUsers(response.data);
  }

  const debounce = useCallback(debounced(loadFiltredUsers, 500), []);

  useEffect(() => {
    debounce(searchTerm);
  }, [searchTerm]);

  return (
    <input
      type="text"
      placeholder="Search"
      onChange={(event) => setSearchTerm(event?.target?.value)}
      value={searchTerm}
    />
  );
};

export default SearchFilter;
