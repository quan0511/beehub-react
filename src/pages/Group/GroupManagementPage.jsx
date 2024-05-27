import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavigatorBar from "../../components/NavigatorBar";
import SessionLeftGroup from "../../components/SessionLeftGroup";
import { Dot, GlobeAmericas, LockFill, ThreeDots } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export const GroupManagementPage=({appUser})=>{
    const [loading, setLoading]=useState(true);
    const [group, setGroup] = useState();
    useEffect(()=>{
        // if(!loading) setLoading(true);
        // axios.get(`${APIService.URL_REST_API}/user/${appUser.id}/get-group/${id}`).then((res)=>{
        //     setGroup(res.data);
        //     if(!res.data.public_group && res.data.member_role==null){
        //         setTab("about");
        //     }
        // }).finally(()=>{
        //     if(group!=null){
        //         setTimeout(() => {
        //             setLoading(false);
        //         }, 200);
        //     }
        // })
    },[])
    return (
            <Row>
                <Col xl={8} className="p-5" style={{height: "350px",width: "100vw",position: "relative"}}>
                <div className="d-flex align-items-start" style={{padding: "100px 10px 100px 20px"}}>
                        <div className="nav flex-column nav-underline me-3 border-end pe-4 flex-fill" id="myTab" role="tablist" aria-orientation="vertical">
                            <h4>Settings</h4>
                            <hr/>
                            <button className="nav-link text-start text-black fs-5 active" id="v-tabs-general-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-general" type="button" role="tab" aria-controls="v-tabs-general" aria-selected="true">General Setting</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-members-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-members" type="button" role="tab" aria-controls="v-tabs-members" aria-selected="false">Manage Members</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-admin-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-admin" type="button" role="tab" aria-controls="v-tabs-admin" aria-selected="false">Manage Administrators</button>
                            <button className="nav-link text-start text-black fs-5" id="v-tabs-report-tab" data-bs-toggle="tab" data-bs-target="#v-tabs-report" type="button" role="tab" aria-controls="v-tabs-report" aria-selected="false">List Reports</button>
                        </div>
                        <div className="tab-content " id="myTabContent" style={{width: "800px"}}>
                            <div className="tab-pane fade show active text-start px-5" id="v-tabs-general" role="tabpanel" aria-labelledby="v-tabs-general" tabIndex="0">
                                <h3>General Setting</h3>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-members" role="tabpanel" aria-labelledby="v-tabs-members" tabIndex="0">
                            <h3>List member</h3>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-admin" role="tabpanel" aria-labelledby="v-tabs-admin" tabIndex="0">
                                <h3>List Admin</h3>
                            </div>
                            <div className="tab-pane fade text-start px-5" id="v-tabs-report" role="tabpanel" aria-labelledby="v-tabs-report" tabIndex="0">
                               <h3>List Reports</h3>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
    );
}