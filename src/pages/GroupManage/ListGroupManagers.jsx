import React from "react";
import { Badge, Button, Form, Image, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import APIService from "../../features/APIService";
import { Link } from "react-router-dom";
export const ListGroupManagers = ({managers,handleButton, user_id})=>{
    
    return (
        <div className="d-flex flex-column">
            <h3>List members in groups</h3>
            <hr/>
            <InputGroup>
                <InputGroup.Text id="basic-addon2" style={{borderRight: 0, borderTopLeftRadius: "50rem", borderBottomLeftRadius: "50rem",backgroundColor: "#ffffff"}}>
                    <Search />
                </InputGroup.Text>
                <Form.Control style={{borderLeft: 0 , borderTopRightRadius: "50rem", borderBottomRightRadius: "50rem"}} 
                    placeholder="Search"
                    aria-describedby="basic-addon2"
                />
            </InputGroup>
            <div className="my-3" style={{borderTop: "2px solid grey"}}>
                {managers.map((user,index)=> {
                        let urlImg = user.user_image!=null ?user.user_image :( user.user_gender=='female'? `${APIService.URL_REST_API}/files/user_female.png`:`${APIService.URL_REST_API}/files/user_male.png`);
                        return <div key={index} className="my-3 pb-3 d-flex flex-row  justify-content-between align-items-center" style={{borderBottom: "1px solid grey"}}>
                            <div>
                                <Image src={urlImg} style={{width:"60px",height: "60px"}} roundedCircle />
                                <Link to={"/member/profile/"+user.username} className="fw-bold mx-4 text-decoration-none text-dark">{user.user_fullname}</Link>
                                {user.role == 'GROUP_CREATOR'?
                                <Badge bg="danger">Group Creator</Badge>
                                :<Badge bg="primary">Group Manager</Badge>
                                }
                            </div>
                            {
                                user.role !='GROUP_CREATOR'&& user.user_id != user_id ?
                                <Button variant="outline-danger" onClick={()=>{handleButton("REMOVE_MANAGER", user.user_id)}} >Remove from the group managers</Button>
                                :user.role !='GROUP_CREATOR'&& user.user_id == user_id?
                                <Button variant="outline-danger" onClick={()=>{handleButton("RETIRE", user.user_id)}} >Retire</Button>
                                :<></>
                            }
                        </div>
                    })}
            </div>
        </div>
    );
}