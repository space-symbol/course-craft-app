import React from 'react';
import './login.css'
import SignIn from "../../components/auth/SignIn";
import Container from "../../components/container/Container";

const Auth = () => {
    return (
        <Container>
            <SignIn/>
        </Container>
    );
};

export default Auth;
