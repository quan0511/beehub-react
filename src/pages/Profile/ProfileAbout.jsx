import React, { useEffect } from "react";
import {Button, Card, Col, Row, Table } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";

function ProfileAbout({user}) {
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    useEffect(()=>{
        console.log(user.user_settings);
        if(user!=null && user.user_settings.length>0){
            for (let index = 0; index < user.user_settings.length; index++) {
                const setting = user.user_settings[index];
                switch (setting.setting_item) {
                    case "phone":
                        if(setting.setting_type=="HIDDEN"){
                            document.getElementById("userPhone").innerText = "";
                        }
                        break;
                    case "birthday":
                        if(setting.setting_type=="HIDDEN"){
                            document.getElementById("userBirthday").innerText = "";
                        }
                        break;
                    case "email":
                        if(setting.setting_type=="HIDDEN"){
                            document.getElementById("userEmail").innerText = "";
                        }
                        break;
                    case "gender":
                        if(setting.setting_type=="HIDDEN"){
                            document.getElementById("userGender").innerText = "";
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    },[])
    return (
        <Row className="mb-5">
            <Col xl={8} className="mx-auto" style={{marginTop: "150px", minHeight:"450px"}}>
                <div className="d-flex flex-column ">
                    <Card className="mb-3">
                        <Card.Header className="d-flex flex-row justify-content-between">
                            <h4>Biography</h4>
                            <Button variant="secondary">
                                <Pencil/>
                            </Button>
                        </Card.Header>
                        <Card.Body className="px-4">
                            {user.bio}
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Header className="d-flex flex-row justify-content-between">
                            <h4>Profile</h4>
                        </Card.Header>
                        <Card.Body className="px-4">
                            <Table borderless >
                                <tbody>
                                    <tr>
                                        <td>Fullname</td>
                                        <td>{user.fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td id="userGender">{user.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Birthday</td>
                                        <td id="userBirthday">{user.birthday}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td id="userEmail">{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone number</td>
                                        <td id="userPhone">{user.phone}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </Row>
    );
}
export default ProfileAbout;