export default function Pagination({ page, onPreviousPage, onNextPage }) {
  return (
    <div className="pagination">
      <button onClick={onPreviousPage} disabled={page === 0}>
        Previous
      </button>
      <span>Page {page + 1}</span>
      <button onClick={onNextPage}>Next</button>
    </div>
  )
}
