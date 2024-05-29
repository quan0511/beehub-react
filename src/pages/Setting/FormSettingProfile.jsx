import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import { Formik } from 'formik'
export const FormSettingProfile = ({user})=>{
    const [validated, setValidated] = useState(false);
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
                // "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                "Phone number is invalid"
              ),
        // password: Yup.string()
        //   .min(8, "Minimum 8 characters")
        //   .required("Required!"),
        // confirm_password: Yup.string()
        //   .oneOf([Yup.ref("password")], "Password's not match")
        //   .required("Required!")
      });
    console.log(user)
    if(!user){
        <Spinner animation="border" ></Spinner>
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
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            > {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-4">
                <Form.Group as={Col} controlId="formName" className="mb-3">
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
                    <InputGroup controlId="formUsername">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                            type="text" 
                            name="username"
                            placeholder="Enter Username"
                            onChange={handleChange}
                            value={values.username} 
                        />
                    </InputGroup>
                    {errors.username && touched.username && (
                        <span className="text-danger">{errors.username}</span>
                    )}
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email"  onChange={handleChange} value={values.email}/>
                    {errors.email && touched.email && (
                        <span className="text-danger">{errors.email}</span>
                    )}
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter Phone" onChange={handleChange} value={values.phone} required/>
                    {errors.phone && touched.phone && (
                        <span className="text-danger">{errors.phone}</span>
                    )}
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" value={values.birthday}  />
                </Form.Group>
                <Form.Group controlId="formGender"  className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" value={values.gender}>
                        <option value="female" >Female</option>
                        <option value="male" >Male</option>
                    </Form.Select>
                        
                </Form.Group>
                <Col xl={4}>
                    <Button variant="outline-primary" type="submit" className="button-save">
                        Save changes
                    </Button>
                </Col>
            </Row>
        </Form>
        )}
        </Formik>
    );
} 