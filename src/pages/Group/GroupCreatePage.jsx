import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../auth/authSlice";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useCreateGroupMutation } from "../../features/userApiSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APIService from "../../features/APIService";
export const GroupCreatePage =()=>{
    const appUser = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const navigator = useNavigate();
    const [bgGroup,setBgGroup ] = useState();
    const [imageGroup,setImageGround ] = useState();
    const [createGroup,{isLoading,isSuccess, isError}] = useCreateGroupMutation();
    
    const schema = Yup.object().shape({
        groupname: Yup.string()
                .required("Required!")
                .min(2, "Mininum 2 characters"),
        description: Yup.string().max(200, "Description maximum 200 character")
      });
      const readURLImage = (input)=> {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                console.log(e.target.result);
                document.getElementById("img-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            setImageGround(input.files[0]);
        }
    }
    const readURLBg = (input)=> {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                console.log(e.target.result);
                document.getElementById("bg-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            setBgGroup(input.files[0]);
        }
    } 
    const handleSubmit = async (values, { ...props }) => {
        
        var bodyFormData = new FormData();
        bodyFormData.append("groupname",values.groupname);
        bodyFormData.append("description", values.description);
        bodyFormData.append("public_group",values.public);
        bodyFormData.append('background',bgGroup??null);
        bodyFormData.append("image", imageGroup??null);
        document.getElementById("loading").style.display = "block";
        try {
        //    let response = await createGroup({id:appUser.id,data: bodyFormData});
            let response = await axios.post(`${APIService.URL_REST_API}/user/create-group/${appUser.id}`,bodyFormData,{
            headers: {
                Authorization: 'Bearer '+token,
                withCredentials: true
            },
            });
           if(response.data !=null){
            //    console.log("data: "+response.data);
            navigator("/group/"+response.data);
            document.getElementById("loading").style.display = "none";
           }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container >
            <Row className="group-manage-page" style={{marginBottom: "100px"}}>
                <Col xl={10} lg={10} md={11} sm={11} className="mx-auto">
                    <h2>Create Own Group</h2>
                    <hr/>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            groupname: "",
                            description: "",
                            public:"true",
                        }}
                        onSubmit={handleSubmit}
                    > {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-2">Change Background</label>
                                <div className="border rounded-2" style={{height: "150px",width: "100%"}}>
                                     <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                                        <img id="bg-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <input type="file" name="background" id="background" className="form-control my-3" onChange={(e)=>readURLBg(e.target)} />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2">Change Image</label>
                                <div className="border rounded-2" style={{height: "150px",width: "150px"}}>
                                    <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                                            <img id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <input type="file" name="image" id="image" className="form-control my-3" onChange={(e)=>readURLImage(e.target)}  />
                                </div>
                            </div>
                            <Form.Group className="mb-3" controlId="groupnname">
                                <Form.Label>Group Name</Form.Label>
                                <Form.Control  name="groupname" 
                                        value={values.groupname} 
                                        onChange={handleChange} 
                                        isValid={touched.groupname && !errors.groupname} />
                                {errors.groupname && touched.groupname && (
                                    <span className="text-danger">{errors.groupname}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label >Description</Form.Label>
                                <Form.Control as="textarea" rows={3}  name="description" 
                                        onChange={handleChange}  value={values.description}  isValid={touched.description && !errors.description} />
                                {errors.description && touched.description && (
                                    <span className="text-danger">{errors.description}</span>
                                )}  
                            </Form.Group>
                            <Form.Select defaultValue={values.public} onChange={handleChange}   className="mb-3" >
                                <option value="true">Public</option>
                                <option value="false">Private</option>
                            </Form.Select>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <Button type="submit">Submit</Button>
                                <div id="loading" style={{display: "none"}}>
                                    <Spinner animation="border"/> Wait a minutes
                                </div>
                            </div>
                        </Form>)}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}