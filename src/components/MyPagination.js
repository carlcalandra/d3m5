import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import "../styles/MyPagination.css";

const MyPagination = ({ items, activePage, setActivePage }) => {
  let paginationItems = [];
  for (let i = 1; i <= items; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === activePage}
        onClick={() => setActivePage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>
        <Pagination.First
          onClick={() => setActivePage(1)}
          disabled={activePage === 1}
        />
        <Pagination.Prev
          onClick={() => setActivePage((prev) => (prev -= 1))}
          disabled={activePage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => setActivePage((prev) => (prev += 1))}
          disabled={activePage === items}
        />
        <Pagination.Last
          onClick={() => setActivePage(items)}
          disabled={activePage === items}
        />
      </Pagination>
    </div>
  );
};

export default MyPagination;
