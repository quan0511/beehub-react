import React, { useState } from "react";
import { Formik } from 'formik';
import { Button, Col, Container,  Form,  Image,  Row, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import APIService from "../../features/APIService";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../auth/authSlice";
import { refresh } from "../../features/userSlice";
import { useUploadBgGroupMutation, useUploadImageGroupMutation } from "../../features/userApiSlice";
import BeehubSpinner from "../../components/BeehubSpinner";
export const GeneralSetting = ({user_id,group})=>{
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [bgGroup,setBgGroup ] = useState();
    const [imageGroup,setImageGround ] = useState();
    const [isLoadingImg,setIsLoadingImg] =useState(false);
    const [isLoadingBg,setIsLoadingBg] =useState(false);
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
                document.getElementById("img-upload").setAttribute("src",e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            setImageGround(input.files[0]);
            document.getElementById("submit-image").hidden= false;
        }
    }
    const readURLBg = (input)=> {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                document.getElementById("bg-upload").setAttribute("src",e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
            setBgGroup(input.files[0]);
            document.getElementById("submit-background").hidden= false;
        }
    }  
    const handleChangeImage =async (id_group)=>{
        try {
            // await uploadImage({id: user_id,image: imageGroup,id_group:id_group});
            var bodyFormData = new FormData();
                bodyFormData.append("id",id_group),
                bodyFormData.append('media',imageGroup);
                setIsLoadingImg(true);
            let response = await axios.post(`${APIService.URL_REST_API}/upload/group/image/${user_id}`,bodyFormData,{
                headers: {
                    Authorization: 'Bearer '+token,
                    withCredentials: true
                },
            });
            console.log(response.status==200);
            if(response.status==200){
                dispatch(refresh());
                setIsLoadingImg(false);
            }
        } catch (error) {
            console.log(error);
        }   
    }
    const handleChangeBackground =async (id_group)=>{
        try {
            var bodyFormData = new FormData();
                bodyFormData.append("id",id_group),
                bodyFormData.append('media',bgGroup);
                setIsLoadingBg(true);
            let response = await axios.post(`${APIService.URL_REST_API}/upload/group/background/${user_id}`,bodyFormData,{
                headers: {
                    Authorization: 'Bearer '+token,
                    withCredentials: true
                },
            });
            console.log(response);
            if(response.status==200){
                dispatch(refresh());
                setIsLoadingBg(false);
            }
            // await uploadBg({id: user_id,background: bgGroup,id_group:id_group});
        } catch (error) {
            console.log(error);
        }   
    }
    return (
    <div className="d-flex flex-column">
        <div>
            <label className="mb-2">Change Background</label>
            <div className="border rounded-2" style={{height: "150px",width: "100%"}}>
                {group.background_group !=null? 
                    <Image src={group.background_group} className="object-fit-cover" style={{height: "inherit",objectPosition: "center",width: "100%"}}/>
                    : <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                        <img id="bg-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}} />
                    </div>
                }
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <input type="file" name="background" id="background" className="form-control my-3" onChange={(e)=>readURLBg(e.target)} />
                <Button variant="primary" id="submit-background" className="me-2" hidden style={{width:"200px",marginLeft:"5px"}} onClick={()=>handleChangeBackground(group.id)}>Save Change</Button>
            </div>
                {isLoadingBg? <Spinner animation="border"/>:<></>}
        </div>
        <div>
            <label className="mb-2">Change Image</label>
            <div className="border rounded-2" style={{height: "150px",width: "150px"}}>
                {group.image_group !=null? 
                    <Image src={group.image_group} id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                    : <div style={{height: "inherit",objectPosition: "center",width: "100%",backgroundColor: "rgb(57,59,70,0.2)",}}>
                        <img id="img-upload"  style={{height: "inherit",width:"inherit",objectFit:"fill"}}/>
                    </div>
                }
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <input type="file" name="image" id="image" className="form-control my-3" onChange={(e)=>readURLImage(e.target)}  />
                <Button variant="primary" id="submit-image" className="me-2" hidden style={{width:"200px",marginLeft:"5px"}} onClick={()=>handleChangeImage(group.id)}>Save Change</Button>
            </div>
                {isLoadingImg? <Spinner animation="border"  />:<></>}
        </div>
        <div>
            <Formik
                validationSchema={schema}
                initialValues={{
                    id: group.id,
                    groupname: group.groupname,
                    description: group.description ??"",
                }}
                onSubmit={async (values, { ...props }) => {
                    try {
                        const response = await axios.post(`${APIService.URL_REST_API}/update/group/${user_id}`,JSON.stringify(values),{
                            headers: {
                                Authorization: 'Bearer ' + token,
                                "Content-Type": 'application/json',
                                withCredentials: true
                            }
                        });
                        if (response.status == '200') {
                            console.log('Form submitted:', values);
                            
                            props.setErrors({})
                            setTimeout(()=>{
                                dispatch(refresh())
                            },600)
                            props.resetForm();
                        } else {
                            console.error('An error occurred while submitting the form.');
                        }
                    } catch (error) {
                        console.error('An error occurred while submitting the form.', error);
                    }
                }}
            > {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
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
                    <Button type="submit">Submit</Button>
                </Form>)}
            </Formik>
        </div>
        </div>
    );
}