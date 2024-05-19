import React from "react";
import { Image, ListGroup } from "react-bootstrap";
function ListFriend (){
    return (
        <ListGroup className=" w-100" >
            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\fuxuan3.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Friends 1                                                                                       
                    <span className="d-inlineblock " style={{fontSize: "10px",float: "right", marginTop: "18px"}} >
                        Online 15 minutes
                    </span>
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0 ' >
            <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\90b475134e034c4a276dd70323161d5f_597349425002811025.webp" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Friends 2    
                    <span className="d-inlineblock " style={{fontSize: "10px",float: "right", marginTop: "18px"}} >
                        Online 25 minutes
                    </span>                                                                                   
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start  p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
            <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\bw-1.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Friends 3  
                    <span className="d-inlineblock " style={{fontSize: "10px",float: "right", marginTop: "18px"}} >
                        Online 15 days
                    </span>                                                                                    
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
            <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\huohuo-6.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Friends 4 
                    <span className="d-inlineblock " style={{fontSize: "10px",float: "right", marginTop: "18px"}} >
                        Online 2 minutes
                    </span>                                                                                      
                </a>
            </ListGroup.Item>
            

            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0 ' >
            <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\jingliu.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Friends 5  
                    <span className="d-inlineblock " style={{fontSize: "10px",float: "right", marginTop: "18px"}} >
                        Online 10 minutes
                    </span>                                                                                       
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0 ' >
                <a style={{
                    textDecoration: "none",
                    fontFamily: "Open Sans",
                    color: "#31363F",
                    fontSize: "17px",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\sp-4.png" style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                    Friends 6  
                    <span className="d-inlineblock " style={{fontSize: "10px",float: "right", marginTop: "18px"}} >
                        Online 1 hour
                    </span>                                                                                   
                </a>
            </ListGroup.Item>
        </ListGroup>
    );
}
export default ListFriend;