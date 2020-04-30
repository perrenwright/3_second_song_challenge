import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
        props.searchValueSetter(searchValue);
    }, [searchValue, props]);

  return (
    <div>
    { props.gameState === null &&
      <form className="search">
        {/*eslint-disable-next-line*/}
        <input role = 'form1'
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
      </form>
    }
    </div>
    );
}

export default SearchBar;