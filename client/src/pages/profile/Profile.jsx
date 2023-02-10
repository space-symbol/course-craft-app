import React, {useContext, useState} from 'react';
import "./profile.css"
import Button from "../../components/button/Button";
import {uploadAvatar} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Profile = observer(() => {
    const [file, setFile] = useState('')
    const {user} = useContext(Context)
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData()
            data.append('id', user.getUser().id)
            data.append('img', file)
            uploadAvatar(data).then((res) => {
                user.setUser(res)
            }).catch(err => {
                console.log(err)
            })
        }}>
            <input onChange={(e) => setFile(e.target.files[0])} multiple={false} type="file" accept="image/*" />
            <Button attributes={{disabled: !file}} text="Сохранить" type="submit" />
        </form>
    );
})

export default Profile;
