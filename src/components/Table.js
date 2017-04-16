import React from 'react';

const isSearched = searchTerm => item =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table = ({list, searchTerm, onDismiss}) => {
  return (
    <div>
      {list.filter(isSearched(searchTerm)).map(item => (
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <spane>{item.points}</spane>
          <button type="button" onClick={() => onDismiss(item.objectID)}>
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

export default Table;
