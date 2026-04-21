
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function CompanyPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 58;
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    if (currentPage > 3) {
      pageNumbers.push(1);
    }
    
    // Show ellipsis if needed
    if (currentPage > 4) {
      pageNumbers.push("ellipsis-start");
    }
    
    // Show pages around current page
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 3) {
      pageNumbers.push("ellipsis-end");
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => handlePageChange(Number(page))}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
