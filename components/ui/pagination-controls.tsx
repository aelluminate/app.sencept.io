import { Table } from "@tanstack/react-table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shared/pagination/_index"

interface PaginationControlsProps<T> {
  table: Table<T>
}

export function PaginationControls<T>({ table }: PaginationControlsProps<T>) {
  return (
    <Pagination>
      <PaginationPrevious
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      />
      <PaginationContent>
        {table.getPageCount() > 1 && (
          <>
            {table.getPageOptions().map((page) => (
              <PaginationLink
                key={page}
                onClick={() => table.setPageIndex(page)}
                isActive={table.getState().pagination.pageIndex === page}
              >
                {page + 1}
              </PaginationLink>
            ))}
            {table.getPageCount() > 5 && <PaginationEllipsis />}
          </>
        )}
      </PaginationContent>
      <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
    </Pagination>
  )
}
