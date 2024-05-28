import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AcitivityPage from './ActivityPage';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useFriendsQuery, useHomepageQuery } from '../user/userApiSlice';


function Homepage() {
    
    return (
        <Container fluid className='ps-4' style={{marginTop: "60px"}}>
            <AcitivityPage />
        </Container>
    );
}
export default Homepage;
