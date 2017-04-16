import React from 'react';

const Search = ({searchTerm, onSearchChange, children}) => {
  return (
    <form>
      {children}
      <input type="text" value={searchTerm} onChange={onSearchChange} />
    </form>
  );
};

export default Search;
