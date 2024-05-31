import { useState } from "react";
import SideBar from "./components/SideBar";
import NavBar from "./components/TopBar";

import "./Admin.css"
import { Outlet } from "react-router-dom";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 720)

    return (
        <div className="admin-wrapper">
            <div className="custom-container overflow-hidden">
                <div className={`app-wrapper ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapse'}`}>
                    <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <SideBar setSidebarOpen={setSidebarOpen}/>
                    <main className="admin-main">
                        <Outlet/>
                    </main>
                    <footer className="admin-footer">
                        <strong>
                            Copyright © 2024&nbsp;
                            <a href="" className="text-decoration-none" >beehub.aptech.vn</a>.
                        </strong>
                    </footer>
                    <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;