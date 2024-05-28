import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import SessionLeft from '../components/SessionLeft';
import NavigatorBar from '../components/NavigatorBar';
import APIService from '../auth/APIService';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useFriendsQuery, useHomepageQuery } from '../user/userApiSlice';


function Homepage() {
    const appUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            console.log("Bottom");
        }
    }, [])

    return (
        <Row>
            <Col xl={3} className='p-0 ' >
                <SessionLeft user={appUser} />
            </Col>
            <Col xl={9} className='p-0'>
                <div className='d-flex flex-column'>
                    <NavigatorBar user={appUser} />
                    <Container fluid className='ps-4' style={{ marginTop: "60px" }}>
                        <AcitivityPage />
                    </Container>
                </div>
            </Col>
        </Row>
    );
}

export default Homepage;
