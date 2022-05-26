import React from 'react';
import Dynamic from "./Dynamic/Dynamic";
import LoginInput from "./LoginInput/LoginInput";
import "./index.scss"

const Login = () => {
    return (
        <div className={"Login"}>
            <Dynamic/>
            <LoginInput/>
        </div>
    );
};

export default Login;
