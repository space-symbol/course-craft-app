import React from 'react';
import "./profile.css"
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";

const Profile = () => {
    return (
        <Container>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log(e)
            }}>
                <input multiple={false} type="file" accept="image/*"/>
                <Button text="Сохранить" type="submit"/>
            </form>
        </Container>
    );
};

export default Profile;
