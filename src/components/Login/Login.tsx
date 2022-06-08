import React, {useEffect} from 'react';
import Dynamic from "./Dynamic/Dynamic";
import LoginInput from "./LoginInput/LoginInput";
import "./index.scss"
import {myPost} from "../../tools";
import {PeopleType} from "../Main/mainConfig";
import {useToOptions} from "../../hooks/myRouter";

const Login = () => {
    const toStuOption = useToOptions(PeopleType.student)
    const toTeaOption = useToOptions(PeopleType.teacher)
    const toAdmOption = useToOptions(PeopleType.administrators)
    useEffect(
        ()=>{

            myPost('/autoLogin',{}).then(r=>{
                let {flag,peopleType,userId,password,userName,token} = r.data // 如果有cookie验证就返回true
                if(flag){

                    sessionStorage['userId'] = userId
                    sessionStorage['password'] = password
                    sessionStorage['userName'] = userName
                    sessionStorage['token'] = token
                    sessionStorage['peopleType'] = peopleType
                    switch (peopleType) {
                        case PeopleType.student:
                            toStuOption()
                            break;

                        case PeopleType.teacher:
                            toTeaOption()
                            break

                        case PeopleType.administrators:
                            toAdmOption()
                            break

                        default:

                            break;
                    }
                }
            })
        }
        ,[])

    return (
        <div className={"Login"}>
            <Dynamic/>
            <LoginInput/>
        </div>
    );
};

export default Login;
