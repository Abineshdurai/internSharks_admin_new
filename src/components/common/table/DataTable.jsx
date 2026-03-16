import "./DataTable.css";

export default function DataTable({
  columns = [],
  data = [],
  rowKey = "id",
  emptyText = "No data found",
  currentPage = 1,
  pageSize = 10,
  total = 0,
  onPageChange
}) {
  const gridTemplateColumns = columns.map((col) => col.width || "1fr").join(" ");

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

const getPages = () => {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return pages;
};

  return (
    <div className="dt-scroll">
      <div className="dt-wrap">
        <div
          className="dt-row dt-head"
          style={{ gridTemplateColumns }}
        >
          {columns.map((col) => (
            <div key={col.key} className="dt-cell dt-head-cell">
              {col.title}
            </div>
          ))}
        </div>

        {data.length === 0 ? (
          <div className="dt-empty">{emptyText}</div>
        ) : (
          data.map((item, index) => (
            <div
              key={item[rowKey] ?? index}
              className="dt-row"
              style={{ gridTemplateColumns }}
            >
              {columns.map((col) => (
                <div key={col.key} className="dt-cell">
                  {col.render ? col.render(item[col.key], item, index) : item[col.key]}
                </div>
              ))}
            </div>
          ))
        )}

       {total > 0 && (
  <div className="dt-pagination">

    <button
      className="dt-page-btn"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ‹
    </button>

    {getPages().map((page, index) =>
      page === "..." ? (
        <span key={index} className="dt-ellipsis">...</span>
      ) : (
        <button
          key={page}
          className={`dt-page-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      )
    )}

    <button
      className="dt-page-btn"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      ›
    </button>

  </div>
)}
      </div>
    </div>
  );
}