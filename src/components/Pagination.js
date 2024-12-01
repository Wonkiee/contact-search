import React from "react";

const Pagination = ({ pageCount, onPageChange }) => (
  <div>
    {[...Array(pageCount)].map((_, i) => (
      <button key={i} onClick={() => onPageChange(i)}>
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
