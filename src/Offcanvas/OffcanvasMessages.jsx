import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { ChatRightHeartFill, XLg } from "react-bootstrap-icons";
import ListFriend from "../ListFriend/ListFriend";
import ListGroups from "../ListGroup/ListGroups";

function OffcanvasMessages({show,handleClose}){
    const [typeSearch, setTypeSearch]=useState("Friends");
    const seachFiends= () => setTypeSearch("Friends");
    const seachGroups=()=>setTypeSearch("Groups");
    return (
        <Offcanvas show={show} placement="end">
            <Offcanvas.Header className="pb-0">
                <Offcanvas.Title style={{padding: "0.4rem 1.2rem"}} className="d-flex flex-row justify-content-between algin-items-center w-100 p-0">                                        
                    <div>
                        <ChatRightHeartFill fill="#8224e3" size={24} /> 
                        <span style={{fontSize: "18px",fontWeight: "bold",fontFamily:"monospace",marginLeft: "10px"}}>Messenger</span>
                    </div>
                    <Button onClick={handleClose} variant="link" className="me-2">
                        <XLg  fill="#8224e3" />
                    </Button>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                <hr/>
                <div className="d-flex flex-row">
                    <Button variant="link" className={"lsm "+(typeSearch === "Friends"?"active": "")} style={{textDecoration:"none"}} onClick={seachFiends}>
                        Friends
                    </Button>
                    <Button variant="link" className={"lsm "+(typeSearch === "Groups"?"active": "")} style={{textDecoration:"none"}} onClick={seachGroups}>
                        Groups
                    </Button>
                    
                </div>
                <Form  className="my-3">
                    <Form.Control type="text" placeholder={"Find "+typeSearch} className="rounded-pill" />
                </Form>
                {typeSearch === "Friends"?<ListFriend />:<ListGroups />}
            </Offcanvas.Body>
            
        </Offcanvas>
    );
}
export default OffcanvasMessages;