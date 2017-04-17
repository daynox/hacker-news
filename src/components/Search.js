import React from 'react';

const Search = ({searchTerm, onSearchChange, onSearchSubmit, children}) => (
  <form onSubmit={onSearchSubmit}>
    <input onChange={onSearchChange} type="text" value={searchTerm} />
    <button type="submit">
      {children}
    </button>
  </form>
);

export default Search;
