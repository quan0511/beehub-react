import { useEffect } from "react";
import { People, Shop, Speedometer } from "react-bootstrap-icons";
import { BsPostcard } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

function SideBar({ setSidebarOpen }) {
    const location = useLocation()
    
    useEffect(() => {
        if (window.innerWidth <= 720) setSidebarOpen(false)
    }, [location])

    return ( 
        <aside className="sidebar bg-body-secondary">
            <div className="sidebar-brand fw-bold">
                Beehub
            </div>
            <div className="sidebar-wrapper p-1">
                <nav className="mt-2">
                    <ul className="nav sidebar-menu flex-column">
                        <li className="nav-item">
                            <Link to={'/admin'} className={`nav-link ${location.pathname == '/admin' && 'active'}`} ><Speedometer className="me-2"/> Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/admin/reports'} className={`nav-link ${location.pathname == '/admin/reports' && 'active'}`}><GoReport className="me-2"/> Reports</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/admin/users'} className={`nav-link ${location.pathname == '/admin/users' && 'active'}`}><People className="me-2"/> Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/admin/posts'} className={`nav-link ${location.pathname == '/admin/posts' && 'active'}`}><BsPostcard className="me-2"/> Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/admin/shop'} className={`nav-link ${location.pathname == '/admin/shop' && 'active'}`}><Shop className="me-2"/> Shop</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
     );
}

export default SideBar;