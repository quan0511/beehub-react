import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero";

function TopBar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate()

    const handleLinkNavigate = async (e, to) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(to)
    }
    return (
        <Navbar className="topbar">
            <Container fluid>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => setSidebarOpen(!sidebarOpen)} role="button"><List className="text-black" /></Nav.Link>
                    <Link to={'/admin'} className="nav-link d-none d-md-block fw-medium">Dashboard</Link>
                    <Link to={'/'} className="nav-link d-none d-md-block fw-medium">Activities</Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Item className="d-flex align-items-center me-4">
                        {/* <Form className="">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                            />
                        </Form> */}
                    </Nav.Item>
                    <Hero
                        img={"https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RgLVRluimRUQ7kNvgGJ3dOK&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYC_l9mz6D3hGtnGi07Zah4S62I1RMgwL0dWjggzvPO-4w&oe=6680C938"}
                        title={'Admin - The Administrator'}
                        timestamp={'May, 2024'}
                        linkTitle={'Profile'} linkUrl={''}
                    />
                </Nav>
            </Container>
        </Navbar>
    )
}

export default TopBar;