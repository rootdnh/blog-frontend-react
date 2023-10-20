import { Pagination } from "react-bootstrap";

interface PaginationProps {
 maxPages: number;
 actualPage: number;
 changePage: (page: number) => void;
}

export function DefaultPagination({ maxPages, changePage, actualPage }: PaginationProps) {
 return (
  <Pagination className="d-flex justify-content-center relative mt-auto pt-3">
   {Array.from({ length: maxPages }).map((_, idx) => {
    let page = idx + 1;
    return (
     <Pagination.Item
      onClick={() => changePage(page)}
      key={`pagination-${page}`}
      active={actualPage === page}
     >
      {page}
     </Pagination.Item>
    );
   })}
  </Pagination>
 );
}
