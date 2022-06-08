import React, {useEffect, useState} from 'react';
import "./index.scss"
import {useOptionsRoute, useToLogin} from "../../hooks/myRouter";
import {useParams} from "react-router-dom";
import {PeopleType} from "../Main/mainConfig";
import {AboutCourseIcon, AboutLeaveIcon, AboutMsgIcon, AccountControlIcon} from "../../icons";
import {getUserInformation, myPost,tellError} from "../../tools";

interface configForOptions {
    title:string,
    tips:string,
    icon:JSX.Element
}

const getOptionConfig = (people:PeopleType):configForOptions[]=>{
    switch (people) {
        case PeopleType.student :{
            return [
                {
                    title: "选择课程",
                    tips: "学生可以在这个板块完成选课方面工作",
                    icon: <AboutCourseIcon />
                },
                {
                    icon: <AboutLeaveIcon />,
                    title: "日常请假",
                    tips: "学生可以在这个板块填写请假单，申请请假"
                },
                {
                    icon: <AboutMsgIcon />,
                    title: "邮件管理",
                    tips: "学生可以在这个板块写邮件，查看收件，查看已发送邮件等"
                }
            ]
        }
        case PeopleType.teacher: {
            return [
                {
                    title: "课程相关",
                    tips: "老师可以在这个板块选择自己要上的课程",
                    icon: <AboutCourseIcon />
                },
                {
                    icon: <AboutLeaveIcon />,
                    title: "请假相关",
                    tips: "老师可以在这个板块查看学生请假情况，并且审批，同时也可以申请请假"
                },
                {
                    icon: <AboutMsgIcon />,
                    title: "邮件管理",
                    tips: "老师可以在这个板块写邮件，查看收件，查看已发送邮件等"
                }
            ]
        }
        case PeopleType.administrators:{
            return [
                {
                    title: "管理课程",
                    tips: "管理员可以在这个板块完成添加，删除，修改课程的操作",
                    icon: <AboutCourseIcon />
                },
                {
                    icon: <AboutLeaveIcon />,
                    title: "请假审批",
                    tips: "管理员可以在这个板块查看学生请假情况，并且审批"
                },
                {
                    icon: <AboutMsgIcon />,
                    title: "邮件管理",
                    tips: "管理员可以在这个板块写邮件，查看收件，查看已发送邮件等"
                },
                {
                    icon:<AccountControlIcon/>,
                    title:"账号管理",
                    tips:"管理员可以在这里管理所有类角色的账号信息"
                }
            ]
        }
    }
    return []
}

const getAppellation = (people:PeopleType):string => {
    switch (people) {
        case PeopleType.student:{
            return "学生"
        }
        case PeopleType.teacher:{
            return "老师"
        }
        case PeopleType.administrators:{
            return "管理员"
        }
    }
}
const Options = () => {
    const params = useParams()
    const toMain = useOptionsRoute(params.people)
    const toLogin = useToLogin()

    const config = getOptionConfig(params.people as PeopleType)
    const appellation = getAppellation(params.people as PeopleType)
    const [rotated,changeRotate] = useState(false)
    const {userId,userName} = getUserInformation()
    useEffect(
        ()=>{
            // 先判断你是否是正常方式登录
            if (!sessionStorage['userId']||!sessionStorage['password']){
                tellError('抱歉，您还没有登录！')
                toLogin()
            }
            if (sessionStorage['peopleType'] !== params.people){
                tellError('无权访问!')
                toLogin()
            }
            let now = rotated
            let loop = setInterval(()=>{
               now = !now
               changeRotate(now)
            },6000)
            return ()=>{
               clearInterval(loop)
            }
        },[]
    )
    return (
        <div className={"Options"}>
            <div className="left">

                <div className="left_inner">
                    <div className="cards-wrapper">
                        <div className="card-container">
                            <div  className={"card "+(rotated?"rotated":"")}>
                                <div className="card-contents card-front">
                                    <div className="card-depth">
                                        <h2>欢迎你，尊敬的{appellation}</h2>
                                        <hr/>
                                        <p>{userId} {userName}</p>
                                    </div>
                                </div>
                                <div className="card-contents card-back">
                                    <div className="card-depth">
                                        <h2>欢迎你，尊敬的{appellation}</h2>
                                        <hr/>
                                        <p>{userId} {userName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button  className="download">
                        <i className="icon ion-eye">
                        </i>
                        <span>
						右 边 选 择 您 需 要 的 操 作
					</span>
                    </button>
                    <button  className="follow" onClick={()=>{
                        myPost('/exitLogin',{

                        }).then(r=>{
                            toLogin()
                        })
                    }}>
                        <i className="icon ">
                        </i>
                        <span>
						退出登录
					</span>
                    </button>
                </div>
            </div>
            <div className="right">
                <div className="app">
                    <div className="app_inner">
                        {config.map(
                            (e,index)=>{
                                return <>
                                    <input defaultChecked={index === 0} id={`tab-${index+1}`} name="buttons" type="radio"/>
                                    <label htmlFor={`tab-${index+1}`}>
                                        <div className="app_inner__tab">
                                            <h2>
                                                <i className="icon ion-android-alarm-clock">
                                                </i>
                                                {e.title}
                                            </h2>
                                            <div className="tab_left">
                                                <i className="big icon ion-android-color-palette">
                                                </i>
                                                <div className="tab_left__image">
                                                    {e.icon}
                                                </div>
                                            </div>
                                            <div className="tab_right">

                                                <p>
                                                    {e.tips}
                                                </p>
                                                <button onClick={()=>{toMain(index+1)}}>
                                                    进入板块
                                                </button>
                                            </div>
                                        </div>
                                    </label>
                                </>
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Options;
