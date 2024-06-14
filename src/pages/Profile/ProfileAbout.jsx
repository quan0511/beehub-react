import React, { useEffect, useState } from "react";
import {Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import APIService from "../../features/APIService";
import { refresh } from "../../features/userSlice";
function ProfileAbout({user,appUser}) {
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [showDiv, setShowDiv ]=useState(true);
    
    useEffect(()=>{
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
            <Col xl={8} className="mx-auto profile-tab" >
                <div className="d-flex flex-column ">
                    { appUser.id ==  user.id?
                    <Card className="mb-3">
                    <Formik
                        validationSchema={Yup.object().shape({
                            bio: Yup.string().max(200, "Biography maximum 200 character")
                            })}
                        validateOnBlur={false}
                        initialValues={{
                                id: appUser.id,
                                bio: user.bio??"",
                            }}
                        onSubmit={async (values, { ...props }) => {
                            try {
                                const response = await axios.post(`${APIService.URL_REST_API}/update/bio-profile/${appUser.id}`,JSON.stringify(values),{
                                    headers: {
                                        Authorization: 'Bearer ' + token,
                                        "Content-Type": 'application/json',
                                        withCredentials: true
                                    }
                                });
                                console.log(response);
                                if (response.status == 200) {
                                    props.setErrors({})
                                    dispatch(refresh())
                                    setShowDiv(true);
                                    document.getElementById("bio").readOnly = true;
                                } else {
                                    console.error('An error occurred while submitting the form.');
                                }
                            } catch (error) {
                                console.error('An error occurred while submitting the form.', error);
                            }
                        }}
                    > {({ handleSubmit, handleChange, values, touched, errors,resetForm }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Card.Header className="d-flex flex-row justify-content-between">
                            <h4>Biography</h4>
                            <Button variant="secondary" onClick={()=> {
                                                        setShowDiv(!showDiv);
                                                        if(showDiv ){
                                                            document.getElementById("bio").readOnly = false;
                                                        }else{
                                                            document.getElementById("bio").readOnly = true;
                                                            resetForm()
                                                        }
                                                        }}>
                                <Pencil/>
                            </Button>
                        </Card.Header>
                        <Card.Body className="px-4">
                            <Form.Group className="mb-3" >
                                <Form.Control as="textarea" rows={3}  name="bio" id="bio"
                                        onChange={handleChange}  value={values.bio}  isValid={touched.bio && !errors.bio} readOnly />
                                {errors.bio && touched.bio && (
                                    <span className="text-danger">{errors.bio}</span>
                                )}  
                            </Form.Group>
                            {!showDiv?
                                <div className="d-flex flex-row">
                                    <Button variant="outline-secondary" type="reset" onClick={()=>resetForm()}>Reset</Button>
                                    <Button variant="outline-primary" type="submit" className="ms-3">Save change</Button>
                                </div>
                                :<></>
                            }
                        </Card.Body>
                        </Form>
                        )}
                        </Formik>
                    </Card>
                    :
                    <Card>
                        <Card.Header className="d-flex flex-row justify-content-between">
                        <h4>Biography</h4>
                        </Card.Header>
                        <Card.Body className="px-4">
                            <div>
                                {user.bio}
                            </div>
                        </Card.Body>
                    </Card>
                    }
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