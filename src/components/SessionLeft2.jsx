import React from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import { BookmarkFill, Cast, Clock, PeopleFill, PersonCircle, ShopWindow } from 'react-bootstrap-icons';
function SessionLeft2(){
    return (
        <ListGroup>
            <ListGroup.Item className='text-start ms-3 p-3 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    color: "#163020",
                    fontSize: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "500"
                }} href="#">
                    <Image src="\assets\images\user\meme-6.jpg" style={{width:"30px",height: "30px", marginRight: "15px"}} roundedCircle />
                    
                    Cat Tuong                                                                                      
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start  ms-3 p-3 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    color: "#163020",
                    fontSize: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "500"
                }} href="#">
                    <PeopleFill style={{
                        marginRight: "15px",
                    }} size={30} fill='#8224E3' />
                    Friends                                                                                      
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start  ms-3 p-3 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    color: "#163020",
                    fontSize: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "500"
                }} href="#">
                    <Clock style={{
                        marginRight: "15px",
                    }} size={30} fill='#8224E3' />
                    Memories                                                                              
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start ms-3 p-3 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    color: "#163020",
                    fontSize: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "500"
                }} href="#">
                    <ShopWindow style={{
                        marginRight: "15px",
                    }} size={30} fill='#8224E3' />
                     Marketplace                                                                             
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start ms-3 p-3 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    color: "#163020",
                    fontSize: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "500"
                }} href="#">
                    <BookmarkFill style={{
                        marginRight: "15px",
                    }} size={30} fill='#8224E3' />
                     Saved                                                                           
                </a>
            </ListGroup.Item>
            <ListGroup.Item className='text-start  ms-3 p-3 border-bottom-1 border-start-0 border-end-0 border-top-0' >
                <a style={{
                    textDecoration: "none",
                    color: "#163020",
                    fontSize: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "500"
                }} href="#">
                    <Cast style={{
                        marginRight: "15px",
                    }} size={30} fill='#8224E3' />
                     Video                                                                           
                </a>
            </ListGroup.Item>
        </ListGroup>
    );
}
export default SessionLeft2;