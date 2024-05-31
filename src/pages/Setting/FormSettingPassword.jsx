import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from "axios";
import APIService from "../../features/APIService";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../auth/authSlice";
import { refresh } from "../../features/userSlice";
export const FormSettingPassword = ({user, setMessageToast})=>{
    const [validated, setValidated] = useState(false);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const reset = useSelector((state)=>state.user.reset);
    const schema2 = Yup.object({
        newPassword: Yup.string()
          .min(6, "Minimum 6 characters")
          .required("Required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Password's not match")
            .required("Required!"),
        currentPassword: Yup.string()
            .required("Require input current password to change new password")
    });
    if(!user){
        return <Spinner animation="border" ></Spinner>
    }
    return (
        <Formik
                validationSchema={schema2}
                initialValues={{
                    newPassword: '',
                    confirmPassword: '',
                    currentPassword: "",
                }}
                onSubmit={async (values, {...props})=>{
                    
                    let res1= await axios.get(`${APIService.URL_REST_API}/check-password/${user.id}?password=${values.currentPassword}`,{
                        headers: {
                            Authorization: 'Bearer ' + token,
                            withCredentials: true
                        }
                    });
                    let check= res1.data;
                    if(check){
                        try {
                            const response = await axios.post(`${APIService.URL_REST_API}/update/profile/password/${user.id}`,values.newPassword,{
                                headers: {
                                    Authorization: 'Bearer ' + token,
                                    "Content-Type": 'text/plain',
                                    withCredentials: true
                                },
                            })
                        if (response.status == '200') {
                            console.log('Form submitted:', values);
                            // Perform actions after successfully handling the request here
                            setMessageToast(true);
                            props.setErrors({})
                            setTimeout(()=>{
                                dispatch(refresh())
                            },1000)
                        } else {
                            console.error('An error occurred while submitting the form.');
                        }
                        } catch (error) {
                        console.error('An error occurred while submitting the form.', error);
                        }
                    
                        // Set isSubmitting to false when the form submission is complete
                        props.setSubmitting(false);
                    }
                }}
            > {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-4  ">
                <Form.Group  className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="newPassword" placeholder="Enter new password"
                                onChange={handleChange} 
                                value={values.newPassword}
                                isInvalid={touched.newPassword & !errors.newPassword}
                                />
                    {errors.newPassword && touched.newPassword && (
                        <span className="text-danger">{errors.newPassword}</span>
                    )}
                </Form.Group>
                <Form.Group  className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Enter confirm password"
                                onChange={handleChange} 
                                value={values.confirmPassword}
                                isInvalid={touched.confirmPassword& !errors.confirmPassword}
                                />
                     {errors.confirmPassword && touched.confirmPassword && (
                        <span className="text-danger">{errors.confirmPassword}</span>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" name="currentPassword" placeholder="Required enter current password" 
                                onChange={handleChange} 
                                value={values.currentPassword}
                                isInvalid={!!errors.currentPassword}
                                />
                    {errors.currentPassword && touched.currentPassword && (
                        <span className="text-danger">{errors.currentPassword}</span>
                    )}
                </Form.Group>
                
                <Col xl={4}>
                    <Button variant="outline-primary" type="submit" id="buttonSave" >
                        Save changes
                    </Button>
                </Col>
            </Row>
        </Form>
        )}
    </Formik>
    );
}