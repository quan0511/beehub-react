import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
function ListFriend ({friends}){
    return (
        <ListGroup className=" w-100" >
            {friends.map((e)=>{
                let imageSrc = e.image !=null? e.image:(e.gender=='female'? "http://192.168.1.5:9001/api/files/user_female.png":"http://192.168.1.5:9001/api/files/user_male.png");
                return <ListGroup.Item className='text-start p-2 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                    <Link style={{
                        textDecoration: "none",
                        fontFamily: "Open Sans",
                        color: "#31363F",
                        fontSize: "17px",
                        fontWeight: "500"
                    }} >
                        <Image src={imageSrc} style={{marginRight: "15px",width:"37px",height: "37px"}} roundedCircle />
                        {e.fullname}
                    </Link>
                </ListGroup.Item>
            })}
            
        </ListGroup>
    );
}
export default ListFriend;