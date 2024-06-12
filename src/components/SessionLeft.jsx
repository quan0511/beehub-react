import React, { useEffect, useState } from "react";
import {Image, ListGroup, Spinner } from "react-bootstrap";
import { Briefcase, CardImage, Cart3, ChatDots, Display,  JournalBookmark, Newspaper, People, Person, Play} from "react-bootstrap-icons";
import { Link, Navigate, useLocation } from "react-router-dom";
import APIService from "../features/APIService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import axios from "axios";
import { useUserQuery } from "../features/userApiSlice";
function SessionLeft ({appUser}){
    const location = useLocation();
    const reset = useSelector((state)=>state.user.reset);
    const {data: user, isLoading }= useUserQuery({id: appUser.id,reset:reset});
    useEffect(()=>{
        let childitem = document.getElementsByClassName("link-item");
        for (let index = 0; index < childitem.length; index++) {
            const element = childitem[index];
            console.log(element.getAttribute("href") == location.pathname)
            if(element.getAttribute("href") == location.pathname){
                element.parentNode.classList.add("active");
            } else {
                element.parentNode.classList.remove("active")
            }
        }
    },[location])
    if(user==null || isLoading){
        return <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "300px"}}>
            <Spinner animation="grow" />
        </div>
    }    
    return (
        <div className="d-none d-md-flex flex-column " style={{overflowY: "scroll",height: "100vh", position: "fixed", width: "inherit"}}>
            <div  style={{backgroundColor: "#383a45",backgroundImage:"linear-gradient(135deg, #4f5261 0%, #383a45 50%)",height: "400px", paddingTop: "4rem", textAlign:"center"}}>
                <Image className="mb-2" src="/assets/images/beehub-logo.svg"/>
                <h4 className="text-white fw-bold" style={{letterSpacing: 1.8}}>Beehub</h4>
                <p className="text-white">Social network</p>
                
                <div className="rounded-3 mx-auto px-5 py-4 shadow-sm sessionLeft2_profile" style={{width: "250px",height: "250px",backgroundColor: "#FFFFFF", marginTop: "1.2rem"}} >
                    <div className="d-flex flex-column align-items-center ">
                        <Link to={"/member/profile/"+user.username} className="text-decoration-none ">
                            { user.image!=null?
                                <Image src={user.image} style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                                :
                                (
                                    user.gender == 'female'? 
                                    <Image src={`${APIService.URL_REST_API}/files/user_female.png`} style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                                    :<Image src={`${APIService.URL_REST_API}/files/user_male.png`} style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                                )
                            }
                        <p className="h6 mt-2 text-black" style={{fontSize: "17px"}}>{user.fullname}</p></Link>
                        <span className="text-black-50 " style={{fontSize: "12px"}}>@{user.username}</span>
                    </div>
                    <hr/>
                    <ListGroup horizontal>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{user.friend_counter}<span className="d-block text-black-50">Friends</span></p>
                            
                        </ListGroup.Item>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">{user.group_counter}<span  className="d-block text-black-50">Groups</span></p>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center w-100 " style={{minHeight: "300px",marginTop: "40px"}}>
                <div style={{width: "250px"}}>
                <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-center">
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}} className="border-0">
                        <Link to="/" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><JournalBookmark size={30}/>
                        <span>Activities</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/people" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item">
                            <Person size={30}/>
                        <span>People</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/listgroup" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><People size={30}/>
                        <span>Groups</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/shop" className="d-flex flex-column align-items-center justify-content-center text-decoration-none link-item"><Cart3 size={30}/>
                        <span>Shop</span></Link>
                    </ListGroup.Item>
                </ListGroup>
                </div>
            </div>
        </div>
    );
}
export default SessionLeft;