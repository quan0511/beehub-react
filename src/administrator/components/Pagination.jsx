function Pagination() {
    return (
        <div className="card-tools">
            <ul className="pagination pagination-sm float-end">
                <li className="page-item">
                    <a className="page-link" href="#">«</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">»</a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;