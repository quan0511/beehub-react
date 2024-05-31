import React from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { Cart3, DoorOpen, GearFill, House, JournalBookmark, People, Person, PersonCircle } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../auth/authSlice";

export const OffcanvasSectionLeft =({show,handleClose})=>{
    const appUser= useSelector(selectCurrentUser);
    return (
        <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title >                                        
                  Beehub
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0" >
                <ListGroup >
                    <ListGroup.Item className="px-5 py-3"  >
                        <Link to={"/member/profile/"+appUser.username} className="text-decoration-none text-dark">
                            <PersonCircle size={20}/><span className="ms-3 fs-5">Profile</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-5 py-3"  >
                        <Link to="/" className="text-decoration-none text-dark">
                            <JournalBookmark size={20}/><span className="ms-3 fs-5">Homepage</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-5 py-3" >
                        <Link to="/people" className="text-decoration-none text-dark">
                            <Person size={20}/><span className="ms-3 fs-5">People</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-5 py-3"  >
                        <Link to="/listgroup" className="text-decoration-none text-dark">
                        <People size={20}/><span className="ms-3 fs-5">Groups</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-5 py-3" >
                        <Link to="/shop" className="text-decoration-none text-dark">
                        <Cart3 size={20}/><span className="ms-3 fs-5">Shop</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-5 py-3" >
                        <Link to="/member/account-setting" className="text-decoration-none text-dark">
                        <GearFill size={20}/><span className="ms-3 fs-5">Setting</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-5 py-3" >
                        <Link to="/signout" className="text-decoration-none text-dark">
                            <DoorOpen size={20}/><span className="ms-3 fs-5">Sign out</span>
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Offcanvas.Body>
            
        </Offcanvas>
    )
}