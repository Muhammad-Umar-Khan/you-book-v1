import { useCallback, useEffect, useState } from "react";
import { getData } from "../../services/api";
import styled from "styled-components";

const Input = styled.input`
  padding: 5px;
  border: 2px solid blue;
  height: 40px;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const SearchFilter = ({ setUsers }) => {
  const [search, setSearch] = useState("");

  async function loadFiltredUsers(search) {
    let { data } = await getData(search);
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
// eslint-disable-next-line
  const debounce = useCallback(debounced(loadFiltredUsers, 300), []);

  useEffect(() => {
    debounce(search);
  }, [search, debounce]);

  return (
    <div className="search">
      <Input
        type="text"
        placeholder="Search"
        onChange={(event) => setSearch(event?.target?.value)}
        value={search}
      />
    </div>
  );
};

export default SearchFilter;
