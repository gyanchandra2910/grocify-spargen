import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // Don't show pagination if there's only one page
  if (pages <= 1) return null;
  
  // Calculate which pages to show
  const MAX_PAGES_TO_SHOW = 5;
  let startPage = Math.max(1, page - Math.floor(MAX_PAGES_TO_SHOW / 2));
  let endPage = Math.min(pages, startPage + MAX_PAGES_TO_SHOW - 1);
  
  // Adjust if we're near the end
  if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
    startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
  }
  
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  
  return (
    <Pagination className="justify-content-center flex-wrap">
      {/* First Page */}
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/1`
              : `/page/1`
            : `/admin/productlist/1`
        }
      >
        <Pagination.First disabled={page === 1} />
      </LinkContainer>
      
      {/* Previous Page */}
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${page - 1}`
              : `/page/${page - 1}`
            : `/admin/productlist/${page - 1}`
        }
      >
        <Pagination.Prev disabled={page === 1} />
      </LinkContainer>
      
      {/* Show ellipsis if not starting from page 1 */}
      {startPage > 1 && <Pagination.Ellipsis disabled />}
      
      {/* Page numbers */}
      {pageNumbers.map((x) => (
        <LinkContainer
          key={x}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x}`
                : `/page/${x}`
              : `/admin/productlist/${x}`
          }
        >
          <Pagination.Item active={x === page}>{x}</Pagination.Item>
        </LinkContainer>
      ))}
      
      {/* Show ellipsis if not ending at the last page */}
      {endPage < pages && <Pagination.Ellipsis disabled />}
      
      {/* Next Page */}
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${page + 1}`
              : `/page/${page + 1}`
            : `/admin/productlist/${page + 1}`
        }
      >
        <Pagination.Next disabled={page === pages} />
      </LinkContainer>
      
      {/* Last Page */}
      <LinkContainer
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${pages}`
              : `/page/${pages}`
            : `/admin/productlist/${pages}`
        }
      >
        <Pagination.Last disabled={page === pages} />
      </LinkContainer>
    </Pagination>
  )
}

export default Paginate

