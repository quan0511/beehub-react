import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import { Briefcase, CardImage, Cart3, ChatDots, Display, JournalBookmark, Newspaper, People, Person, Play } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
function Panel(){
    
    return (
        <div className="d-flex flex-column top-0 left-0 shadow " style={{width: "80px",height:"auto"}}>
            <div className="bg-dark" style={{height: "80px",padding: "1rem"}}>
                <Link to="/">
                    <Image src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg" fluid width="100%" />
                </Link>
            </div>
            <div className="bg-light position-sticky" style={{padding: "1rem",top:0}}>
            <ListGroup horizontal="md" className="my-2 flex-wrap justify-content-center">
                    <ListGroup.Item className="border-0 pb-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Activity 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><JournalBookmark size={20}/></a>
                    </OverlayTrigger>

                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Photos 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><CardImage size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Watch 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Play size={20}/></a></OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3 active">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Profile 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Person size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Groups 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><People size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Adverts 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Display size={20}/></a>
                        </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Shop 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Cart3 size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Jobs 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Briefcase size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Forums 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><ChatDots size={20}/></a>
                        </OverlayTrigger>
                    </ListGroup.Item>
                    <ListGroup.Item  className="border-0 py-3">
                    <OverlayTrigger delay={{ hide: 350, show: 300 }} 
                        overlay={(props) => ( 
                            <Tooltip {...props}> 
                               Blog 
                            </Tooltip> 
                        )} 
                        placement="right"
                    >
                        <a href="" ><Newspaper size={20}/></a>
                    </OverlayTrigger>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
}
export default Panel;