import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

export const FormSettingProfile = (user)=>{
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
      console.log(user);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mt-4">
                <Form.Group as={Col} controlId="formName" className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control type="text" name="fullname" placeholder="Enter Fullname" value={user["user"].fullname} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPassword">
                    <Form.Label>Username</Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                        type="text" 
                        placeholder="Enter Username"
                        aria-label="Username"
                        value={user["user"].username} required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter Email" value={user["user"].email} required/>
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" placeholder="Enter Phone" value={user["user"].phone} required/>
                </Form.Group>
                <Form.Group controlId="formBirthday" className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" value={user["user"].birthday} required />
                </Form.Group>
                <Form.Group controlId="formGender"  className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" value={user["user"].gender}>
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
    );
} 