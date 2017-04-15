import React, {Component} from 'react';

const Search = props => {
  const {searchTerm, onSearchChange, children} = props;
  return (
    <form>
      {children}
      <input type="text" value={searchTerm} onChange={onSearchChange} />
    </form>
  );
};

export default Search;
