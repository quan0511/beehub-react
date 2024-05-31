import { Link } from "react-router-dom";

function ContentHeader({ title }) {
    return (
        <div className="admin-content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <h3 className="mb-0">{ title }</h3>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-end">
                            {title !== 'Dashboard' && <li className="breadcrumb-item"><Link to={'/admin'}>Dashboard</Link></li>}
                            <li className="breadcrumb-item active">{ title }</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentHeader;