import { useCallback, useEffect, useState } from "react";
import { getDataRequest } from "../../services/api";

const SearchFilter = ({ setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  async function loadFiltredUsers(searchTerm) {
    let {data} = await getDataRequest(searchTerm);
    setUsers(data);
  }

  function debounced(debounceFunc, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        debounceFunc.apply(this, args);
      }, timeout);
    };
  }

  const debounce = useCallback(debounced(loadFiltredUsers, 300), []);

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
