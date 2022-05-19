import React from 'react';
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./components/Main/Main";
import "./App.less"
import { Navigate } from 'react-router-dom';
import Options from "./components/Options/Options";
import SignIn from "./components/SignIn/SignIn";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

const Redirect =()=>{
    return (
        <Navigate to="/login" />
    )
}


const App = () => {
    return (
        <BrowserRouter>
            <div className={"full"}>
                <Routes>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/sign-in' element={<SignIn/>} />
                    <Route path='/forget-password' element={<ForgetPassword/>} />
                    <Route path='/options/:people' element={<Options/>} />
                    <Route path='/main/:people/:specific' element={<Main/>} />
                    <Route path='/' element={<Redirect/>} />
                </Routes>
            </div>

        </BrowserRouter>

    );
};

export default App;
