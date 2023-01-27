import React from 'react';
import './registration.css'
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Register from "../../components/auth/Register";
import Container from "../../components/container/Container";


const Registration = () => {
    return (
        <Container>
            <Register/>
        </Container>
    );
};

export default Registration;
