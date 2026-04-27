export default function Pagination({ page, totalPages, onPageChange, onPreviousPage, onNextPage }) {
  const startPage = Math.max(0, page - 2)
  const endPage = Math.min(totalPages - 1, page + 2)
  const visiblePages = []

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    visiblePages.push(pageNumber)
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(0)} disabled={page === 0}>
        First
      </button>
      <button onClick={onPreviousPage} disabled={page === 0}>
        Prev
      </button>

      {startPage > 0 && (
        <>
          <button className="page-button" onClick={() => onPageChange(0)}>
            1
          </button>
          {startPage > 1 && <span className="pagination-dots">...</span>}
        </>
      )}

      {visiblePages.map(pageNumber => (
        <button
          key={pageNumber}
          className={pageNumber === page ? "page-button active" : "page-button"}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}

      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && <span className="pagination-dots">...</span>}
          <button className="page-button" onClick={() => onPageChange(totalPages - 1)}>
            {totalPages}
          </button>
        </>
      )}

      <button onClick={onNextPage} disabled={page === totalPages - 1}>
        Next
      </button>
      <button onClick={() => onPageChange(totalPages - 1)} disabled={page === totalPages - 1}>
        Last
      </button>
    </div>
  )
}
