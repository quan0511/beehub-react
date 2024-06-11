import Pagination from './Pagination';
import './FullWidthTable.css'

function FullWidthTable({ title, children, header, total, perPage, setCurrentPage, currentPage }) {

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={total} perPage={perPage}/>
            </div>
            <div className="card-body overflow-x-auto p-0">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {header.map((h, i) => 
                                <th key={i} style={h.style}>{h.content}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
            <div className="card-footer clearfix">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} total={total} perPage={perPage}/>
            </div>

        </div>
    );
}

export default FullWidthTable;