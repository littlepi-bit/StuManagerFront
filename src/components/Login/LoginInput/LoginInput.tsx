import React, {useEffect, useRef} from 'react';
import "./index.scss"
import {useToForgotPassword, useToOptions, useToSignIn} from "../../../hooks/myRouter";
import {PeopleType} from "../../Main/mainConfig";
import {myPost, tellError, tellSuccess} from "../../../tools";


const LoginInput:React.FC = () => {
    //记住我
    let beforeUserId = localStorage['userId']

    if (beforeUserId === ""||beforeUserId === undefined) {
        beforeUserId = ""
    }
    let beforeUserPassword = localStorage['password']
    if (beforeUserPassword === ""||beforeUserPassword === undefined) {
        beforeUserPassword = ""
    }

    useEffect(
        ()=>{
            if (beforeUserPassword.length && beforeUserId.length){
                rememberValue.current.checked = true
                tellSuccess('已经自动填写您的账号信息！')
            }
        }
        ,[]
    )


    const toStuOptions = useToOptions(PeopleType.student)
    const toTeaOptions = useToOptions(PeopleType.teacher)
    const toAdmOptions = useToOptions(PeopleType.administrators)
    const toSignIn = useToSignIn()
    const toForgetPassword = useToForgotPassword()
    const userIdValue:any = useRef()
    const passwordValue:any = useRef()
    const rememberValue:any = useRef()
    const tryLogin = ()=>{
        // @ts-ignore
        const  userId = userIdValue.current.value; const password = passwordValue.current.value
        const needRemember = rememberValue.current.checked

        myPost('/loginCheck',{
            userId,
            password
        }).then(r => {
            let {msg,peopleType,userName,token} = r.data
            if (msg === "ok"){
                //记住我
                if (needRemember) {
                    localStorage['userId'] = userId
                    localStorage['password'] = password
                }else {
                    localStorage['userId'] = ""
                    localStorage['password'] = ""
                }


                sessionStorage['userId'] = userId
                sessionStorage['password'] = password
                sessionStorage['userName'] = userName
                sessionStorage['token'] = token
                tellSuccess('登录成功!')
                switch (peopleType as PeopleType) {
                    case PeopleType.student:{
                        toStuOptions()
                        break
                    }
                    case PeopleType.teacher:{
                        toTeaOptions()
                        break
                    }
                    case PeopleType.administrators:{
                        toAdmOptions()
                        break
                    }
                }
            }else {
                throw msg
            }
        }).catch((msg)=>{
            tellError(msg)
        })
    }


    return (
        <div className={"LoginInput"}>
            <div className="form">
                <div className="hello">欢迎回来</div>
                <div className="use">
                    <span className="line"/>
                    <span className="info">使用用户ID密码登录</span>
                    <span className="line"/>
                </div>
                <div className="input">
                    <div className="label">用户ID</div>
                    <input defaultValue =  {beforeUserId} ref={userIdValue} placeholder={"请输入用户ID"} type="text"/>
                </div>
                <div className="input">
                    <div className="label">密码</div>
                    <input onKeyDown={e=>{
                        if (e.key === 'Enter'){
                            tryLogin()
                        }
                    }}  defaultValue = {beforeUserPassword} ref={passwordValue} placeholder={"请输入密码"} type="password"/>
                </div>
                <div className="remember">
                    <div className="left">
                        <input ref={rememberValue} type="checkbox"/>
                        <div className="label">记住我</div>
                    </div>
                    <div className="right">
                        <div onClick={toForgetPassword} className="forget">忘记密码?</div>
                    </div>
                </div>
                <button className="commit" onClick={tryLogin}>登录</button>
                <div className="tips">
                    <div className="msg">还没有账号?</div>
                    <div onClick={toSignIn} className="deal">立即注册</div>
                </div>
            </div>

        </div>
    );
};

export default LoginInput;
