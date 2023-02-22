import { useCallback, useEffect, useState } from "react";
import { getData } from "../../services/api";

const SearchFilter = ({ setUsers }) => {
  const [search, setSearch] = useState("");

  async function loadFiltredUsers(search) {
    let {data} = await getData(search);
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
    debounce(search);
  }, [search]);

  return (
    <input
      type="text"
      placeholder="Search"
      onChange={(event) => setSearch(event?.target?.value)}
      value={search}
    />
  );
};

export default SearchFilter;
