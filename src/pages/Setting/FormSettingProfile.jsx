import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import APIService from "../../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../auth/authSlice";
import { refresh } from "../../features/userSlice";


export const FormSettingProfile = ({user,setMessageToast})=>{
    const token = useSelector(selectCurrentToken);
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    const schema = Yup.object({
        fullname: Yup.string()
          .min(2, "Mininum 2 characters")
          .max(15, "Maximum 15 characters")
          .required("Required!"),
        username: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(15, "Maximum 15 characters")
        .required("Required!"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Required!"),
        phone: Yup.string()
            .required("Required Phone number")
            .matches(
                /^(84|0[35789])+([0-9]{8})$/,
                "Phone number is invalid"
              ),
      });

    const handleSubmit = async (values, { ...props }) => {
        let res1= await axios.get(APIService.URL_REST_API+"/check-user?username="+values.username,{
            headers: {
              Authorization: 'Bearer ' + token,
              withCredentials: true
            }
        });
        let res2 = await axios.get(APIService.URL_REST_API+"/check-email?email="+values.email,{
            headers: {
                Authorization: 'Bearer ' + token,
                withCredentials: true
            }
        });
        let checkUsername = res1.data;
        let checkEmail = res2.data;
        if(checkUsername && values.username!=user.username){
            props.setErrors({username : "Username exists! Try another"})
        }
        if(checkEmail && values.email!=user.email){
            props.setErrors({email : "Email exists! Try another"})
        }
        console.log(checkEmail && checkEmail );
        if((!checkEmail && !checkEmail )||(values.username==user.username && values.email==user.email) ){
            try {
                const response = await axios.post(`${APIService.URL_REST_API}/update/profile/${user.id}`,JSON.stringify(values),{
                    headers: {
                        Authorization: 'Bearer ' + token,
                        "Content-Type": 'application/json',
                        withCredentials: true
                    },
                })
                if (response.status == '200') {
                    console.log('Form submitted:', values);
                    // Perform actions after successfully handling the request here
                    setMessageToast(true);
                    props.setErrors({})
                    setTimeout(()=>{
                        dispatch(refresh());
                        window.location.reload();
                    },1000)
                } else {
                    console.error('An error occurred while submitting the form.');
                }
            } catch (error) {
            console.error('An error occurred while submitting the form.', error);
            }
        }
            // Set isSubmitting to false when the form submission is complete
            props.setSubmitting(false);
        }
    if(!user){
        return <Spinner animation="border" ></Spinner>
    }
    return (
        <Formik
                validationSchema={schema}
                initialValues={{
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    birthday: user.birthday,
                    gender: user.gender
                }}
                onSubmit={handleSubmit}
            > {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-4">
                <Form.Group as={Col}  className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control type="text" name="fullname" 
                            value={values.fullname} 
                            onChange={handleChange} 
                            isValid={touched.fullname && !errors.fullname} 
                            placeholder="Enter Fullname" />
                    {errors.fullname && touched.fullname && (
                        <span className="text-danger">{errors.fullname}</span>
                    )}
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            type="text" 
                            name="username"
                            placeholder="Enter Username"
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                            value={values.username} 
                        />
                    </InputGroup>
                    {errors.username && touched.username && (
                        <span className="text-danger">{errors.username}</span>
                    )}
                </Form.Group>

                <Form.Group  className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email"  
                        onChange={handleChange} 
                        value={values.email}
                        isInvalid={!!errors.email}
                        />
                    {errors.email && touched.email && (
                        <span className="text-danger">{errors.email}</span>
                    )}
                </Form.Group>
                <Form.Group  className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter Phone"
                                 onChange={handleChange} 
                                 value={values.phone} required
                                 isValid={touched.phone && !errors.phone}/>
                    {errors.phone && touched.phone && (
                        <span className="text-danger">{errors.phone}</span>
                    )}
                </Form.Group>
                <Form.Group  className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" value={values.birthday} onChange={handleChange}  />
                </Form.Group>
                <Form.Group  className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" onChange={handleChange} value={values.gender}>
                        <option value="female" >Female</option>
                        <option value="male" >Male</option>
                    </Form.Select>
                        
                </Form.Group>
                <Col xl={4}>
                    <Button variant="outline-primary" type="submit" id="buttonSaveProfile" >
                        Save changes
                    </Button>
                </Col>
            </Row>
        </Form>
        )}
        </Formik>
    );
} 