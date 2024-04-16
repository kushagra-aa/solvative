import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
} from "./../Icons";
import "./index.css";

interface PaginationProps {
  totalItems: number; // Total number of items
  currentPage: number; // Current page number (1-based)
  pageSize: number; // Items per page
  pageSizeOptions: number[]; // Array of available page sizes
  onPageSizeChange: (size: number) => void; // Function to handle page size change
  onPageChange: (page: number) => void; // Function to handle page change
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const newTotalPages = Math.ceil(totalItems / pageSize);
    setTotalPages(newTotalPages);

    if (currentPage > newTotalPages && newTotalPages > 0) {
      onPageChange(newTotalPages);
    }
  }, [totalItems, currentPage, pageSize, onPageChange]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderPaginationNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`pagination-number ${
            currentPage === index + 1 ? "selected" : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ));
    }

    const firstPage = Math.max(currentPage - 2, 1);
    const lastPage = Math.min(currentPage + 2, totalPages);
    const pageNumbers = [...Array(lastPage - firstPage + 1)].map(
      (_, index) => firstPage + index
    );

    return pageNumbers.map((pageNumber, index) => (
      <button
        key={pageNumber}
        className={`pagination-number ${
          currentPage === pageNumber ? "selected" : ""
        }`}
        onClick={() => handlePageChange(pageNumber)}
        disabled={currentPage === index + 1}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button disabled={isFirstPage} onClick={() => handlePageChange(1)}>
          <DoubleChevronLeftIcon className="pagination-icon" />
        </button>
        <button
          disabled={isFirstPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeftIcon className="pagination-icon" />
        </button>
        {renderPaginationNumbers()}
        <button
          disabled={isLastPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRightIcon className="pagination-icon" />
        </button>
        <button
          disabled={isLastPage}
          onClick={() => handlePageChange(totalPages)}
        >
          <DoubleChevronRightIcon className="pagination-icon" />
        </button>
      </div>
      <div className="pagination-size">
        <select value={pageSize} onChange={handlePageSizeChange}>
          {pageSizeOptions.map((option) => (
            <option
              key={option}
              value={option.toString()}
              selected={option === pageSize}
            >
              {option} items/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
