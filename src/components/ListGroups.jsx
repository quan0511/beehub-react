import React from "react";
import { Badge, Image, ListGroup } from "react-bootstrap";
function ListGroups(){
    return (
        <ListGroup className=" w-100" >
            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#" className="">
                    <Image src="\assets\images\groups\lol.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Group 1                                                                                       
                    <Badge bg="primary" style={{float: "right",marginTop: "8px"}}>2 Newest Post</Badge>
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#" className="">
                    <Image src="\assets\images\groups\chess.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Group 2       
                </a>
            </ListGroup.Item>
        </ListGroup>
    );
}
export default ListGroups;