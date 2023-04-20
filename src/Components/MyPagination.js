import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'



const MyPagination= ({items, activePage}) => {
  let paginationItems = [];
  console.log(items)
  for (let i = 1; i <= items; i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === activePage}>
      {i}
    </Pagination.Item>
    )
  }
  return (
    <div>
      <Pagination>
        {paginationItems}
      </Pagination>
    </div>
  )
}

export default MyPagination;
