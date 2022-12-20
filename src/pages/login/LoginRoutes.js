import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import React from "react";


export function LoginRoutes() {
    return (
        <Routes>
            <Route index element={<Navigate to="/login/signin" replace={true}/>}/>
            <Route path="signin" element={<SignIn/>}></Route>
            <Route path="signup" element={<SignUp/>}></Route>
        </Routes>
    );
}