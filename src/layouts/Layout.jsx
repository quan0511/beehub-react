import React from "react";
import { Container} from "react-bootstrap";
import { Outlet } from "react-router-dom";
function Layout(){
    return (
        <Container className="p-0" fluid>
            <Outlet />
        </Container>
    );
}
export default Layout;