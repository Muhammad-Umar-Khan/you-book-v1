import { useCallback, useEffect, useState } from "react";
import { getData } from "../../services/api";

//can be moved inside the SearchFilter component;
function debounced(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const SearchFilter = ({ setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  async function loadFiltredUsers(searchTerm) {
    let response = await getData(searchTerm);
    setUsers(response.data);
  }

  const debounce = useCallback(debounced(loadFiltredUsers, 300), []);

  useEffect(() => {
    debounce(searchTerm);
  }, [searchTerm, debounce]);

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
