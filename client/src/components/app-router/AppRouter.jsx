import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../../routes";
import {Context} from "../../index";
import {CARDS_ROUTE} from "../../utils/consts";

const AppRouter = () => {
    const {user} = useContext(Context)
    const isAuth = user.isAuth
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
               <Route path={path} element={<Component/>} key={path}/>
            )}
            {publicRoutes.map(({path, Component}) =>
               <Route path={path} element={<Component/>} key={path}/>
            )}
            <Route path='*' element={<Navigate to={CARDS_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;
