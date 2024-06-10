function Pagination({ total, perPage, setCurrentPage, currentPage }) {
    let pages = []
    const lastPage = Math.ceil(total / perPage)
    for (let i = 1; i <= lastPage; i++) {
        pages.push(i)
    }

    if (pages.length <= 0) return

    return (
        <div className="card-tools">
            <ul className="pagination pagination-sm float-end">
                <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}>
                    <a onClick={() => setCurrentPage(--currentPage)} className="page-link" href="#">«</a>
                </li>
                { pages.map((page, index) => 
                    <li key={index} className={`page-item ${page == currentPage ? 'active': ''}`}>
                        <a onClick={() => setCurrentPage(page)} className="page-link" href="#">{page}</a>
                    </li>
                )}
                <li className={`page-item ${currentPage == lastPage ? 'disabled' : ''}`}>
                    <a onClick={() => setCurrentPage(++currentPage)} className="page-link" href="#">»</a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;