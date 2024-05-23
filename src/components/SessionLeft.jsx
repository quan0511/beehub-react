import React from "react";
import {Image, ListGroup } from "react-bootstrap";
import { Briefcase, CardImage, Cart3, ChatDots, Display,  JournalBookmark, Newspaper, People, Person, Play} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function SessionLeft (){
    return (
        <div className="d-flex flex-column " style={{overflowY: "scroll",height: "100vh", position: "fixed", width: "inherit"}}>
            <div style={{backgroundColor: "#383a45",backgroundImage:"linear-gradient(135deg, #4f5261 0%, #383a45 50%)",height: "400px", paddingTop: "4rem", display: "block",textAlign:"center"}}>
                <Image src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-vertical.svg"/>
                
                <div className="rounded-3 mx-auto px-5 py-4 shadow-sm sessionLeft2_profile" style={{width: "250px",height: "250px",backgroundColor: "#FFFFFF", marginTop: "1.2rem"}} >
                    <div className="d-flex flex-column align-items-center ">
                        <Link to="/member/profile" className="text-decoration-none "><Image src="\assets\images\user\meme-6.jpg" style={{width:"50px",height: "50px",marginLeft: "auto",marginRight: "auto"}} roundedCircle className="d-block" />
                        <p className="h6 mt-2 text-black" style={{fontSize: "17px"}}>Cat Tuong</p></Link>
                        <span className="text-black-50 " style={{fontSize: "12px"}}>Member</span>
                    </div>
                    <hr/>
                    <ListGroup horizontal>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">7<span className="d-block text-black-50">Friends</span></p>
                            
                        </ListGroup.Item>
                        <ListGroup.Item className="w-50 border-0">
                            <p className="text-center">22<span  className="d-block text-black-50">Groups</span></p>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center w-100 " style={{minHeight: "300px", padding: "90px 16px 10px 16px",marginTop: "120px"}}>
                <div style={{width: "250px"}}>
                <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-center">
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}} className="border-0 active">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><JournalBookmark size={20}/>
                        <span>Acitivity</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><CardImage size={20}/>
                        <span>Photos</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><Play size={20}/>
                        <span>Watch</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <Link to="/people" className="d-flex flex-column align-items-center justify-content-center text-decoration-none">
                            <Person size={20}/>
                        <span>People</span></Link>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><People size={20}/>
                        <span>Groups</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><Display size={20}/>
                        <span>Adverts</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><Cart3 size={20}/>
                        <span>Shop</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><Briefcase size={20}/>
                        <span>Jobs</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><ChatDots size={20}/>
                        <span>Forums</span></a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{width: "97px", height: "84px", padding: "16px 4px"}}  className="border-0">
                        <a href="" className="d-flex flex-column align-items-center justify-content-center text-decoration-none"><Newspaper size={20}/>
                        <span>Blog</span></a>
                    </ListGroup.Item>
                </ListGroup>
                </div>
            </div>
        </div>
    );
}
export default SessionLeft;