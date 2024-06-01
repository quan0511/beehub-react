import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Search, ThreeDots } from "react-bootstrap-icons";
import ListFriend from "./ListFriend";
import { useFriendsQuery } from "../features/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
function SessionRight(){
    const user = useSelector(selectCurrentUser);
    const reset = useSelector((state)=>state.user.reset);
    const {data: friends, isLoading} = useFriendsQuery({id: user.id,reset:reset});
    return (
        <div className="d-flex flex-column justify-content-start align-items-start mt-5"  style={{overflowY: "scroll", overflowX: "hidden",height: "100vh", position: "fixed", width: "inherit"}}>
            <Row className="mb-2 w-100 pb-2 bg-white" style={{zIndex: "4"}}>
                <Col xl={8} className="text-start ps-3" style={{fontSize: "17px",fontWeight:"600"}}>Contact</Col>
                <Col xl={2} className="mx-auto d-flex flex-row justify-content-between align-items-center" >
                    <Search size={16} />
                    <ThreeDots size={16}/>
                </Col>
            </Row>
            {isLoading || friends==null?
                <Spinner animation="grow" />
            :<ListFriend friends={friends} />
            }
            
        </div>
    );
}
export default SessionRight;