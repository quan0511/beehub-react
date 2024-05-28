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
        if(!loading) setLoading(true);
        axios.get(`${APIService.URL_REST_API}/user/${appUser.id}/get-group/${id}`).then((res)=>{
            setGroup(res.data);
            if(!res.data.public_group && res.data.member_role==null){
                setTab("about");
            }
        }).finally(()=>{
            if(group!=null){
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }
        })
    },[])
    return (
        <Row style={{minHeight: "800px",overflowX: "hidden",margin:0}}>
            <NavigatorBar />
            <Col xl={4} className="p-0 position-relative" >
             <SessionLeftGroup group={group}/>
            </Col>
            <Col xl={8} className="mx-auto">
                <Container fluid>
                    <Row>
                        <Col xl={12} className="p-0" style={{height: "350px",width: "100vw",position: "relative"}}>
                            {group.background_group !=null? 
                                <Image src={group.background_group} className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px"}}/>
                                : <div style={{height: "inherit",objectPosition: "center",width: "100%",borderRadius: "0 0 0 5px",backgroundColor: "rgb(57,59,70,0.5)",}}></div>
                            }
                            <div className="position-absolute"style={{top: "250px",left: "1rem",width: "90%"}} >
                                <div className="d-flex flex-column ps-5 bg-white rounded-3 shadow px-2 pt-3">
                                    {group.image_group!=null?
                                        <Image src={group.image_group}  className="object-fit-cover border-0 rounded position-absolute bg-white" style={{width: "220px", height: "220px",top:"-100px"}} />
                                        :
                                        <Image src={APIService.URL_REST_API+"/files/group_image.png"} className="object-fit-cover border-0 rounded position-absolute bg-white" style={{width: "220px", height: "220px",top:"-100px"}} />
                                    }
                                    <div style={{marginLeft: "240px", textAlign: "start",marginBottom: "50px"}}>
                                        <h2 style={{fontWeight: "900"}}>{group.groupname}</h2>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <p>{
                                                group.public_group?
                                                <span><GlobeAmericas /> Public group</span> 
                                                :<span><LockFill/> Private group</span>
                                            }<Dot/> {group.member_count} members</p>
                                            {group.member_role ==null?
                                            <Button variant="primary" style={{width: "100px",fontWeight: "bold"}}>Join</Button>
                                            :
                                            <Button variant="outline-danger" style={{width: "200px"}}>Leave Group</Button>
                                            }
                                        </div>
                                        <div className="d-flex flex-row mb-2 flex-nowrap align-items-end" style={{overflowX: "hidden"}}>
                                            {
                                                group.public_group?
                                                group.group_members.map((member,index)=>{
                                                    let urlImg = member.user_image ? member.user_image: (member.user_gender=='female'? APIService+"/files/user_female.png":APIService+"/files/user_male.png");
                                                    return <Image key={index} src={urlImg} width={40} roundedCircle />
                                                })
                                                :
                                                <></>
                                            }
                                            {
                                                group.public_group? 
                                                <Link color="secondary">
                                                    <ThreeDots width={40}/>
                                                </Link>
                                                :<></>
                                            }
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
       
    );
}