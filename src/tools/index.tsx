import {message, Modal} from "antd";
import axios from "axios";
import {
    AdministratorsAccountControl,
    AdministratorsSelectCourseMenuType,
    MessageMenuType, PeopleType,
    SpecificMenuType,
    StudentLeaveMenuType,
    StudentSelectCourseMenuType,
    TeacherAndAdministratorsLeaveMenuType,
    TeacherSelectCourseMenuType
} from "../components/Main/mainConfig";

export const isInEnum = (value:any,Enum:any):boolean=>{
    return Object.values(Enum).includes(value)
}

export const getPostUrl = (api:string):string =>{
    let defaultUrl = "http://120.77.12.35:8000"
    return defaultUrl + api
}


export const tellSuccess = (msg:string)=>{
    message.success(msg).then(() => {})
}

export const tellError = (msg:string)=>{
    message.error(msg).then(() => {})
}

export const tellWaring = (msg:string)=>{
    message.warning(msg).then(() => {})
}
//post请求
axios.interceptors.response.use(
    response => {
        return  response;
    },
    error => {
        tellError(error.message)
        return  Promise.reject(error);
    }
);
export const myPost = (url:string,data:any)=>{
    if (!data.userId){
        let {userId} = getUserInformation()
        data.userId = userId
    }
    return axios.post(getPostUrl(url), data, {
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage['token']
        }
    })
}


export const getUserInformation = ():{userId:string,userName:string,password:string}=>{
    return {
        userId :sessionStorage['userId'],
        userName:sessionStorage['userName'],
        password:sessionStorage['password']
    }
}

export const getSub = (specific:SpecificMenuType):number=>{
    switch (specific) {
        case AdministratorsAccountControl.addNewUser:
            return 2
        case AdministratorsAccountControl.delNewUser:
            return 3
        case AdministratorsAccountControl.viewNewUser:
            return 1
        case StudentLeaveMenuType.seeMyLeave:
            return 2
        case StudentLeaveMenuType.commitLeave:
            return 1
        case StudentSelectCourseMenuType.seeAll:
            return 1
        case StudentSelectCourseMenuType.delSelected:
            return 2
        case StudentSelectCourseMenuType.seeSelected:
            return 3
        case TeacherSelectCourseMenuType.selectAllTeach:
            return 1
        case TeacherSelectCourseMenuType.viewAllNeedTeach:
            return 2
        case TeacherSelectCourseMenuType.deleteSelectedTeach:
            return 3
        case TeacherAndAdministratorsLeaveMenuType.viewStuLeave:
            return 1
        case TeacherAndAdministratorsLeaveMenuType.examStuLeave:
            return 2
        case AdministratorsSelectCourseMenuType.addNewCourse:
            return 1
        case AdministratorsSelectCourseMenuType.delAddedCourse:
            return 2
        case AdministratorsSelectCourseMenuType.admViewCourse:
            return 3
        case AdministratorsSelectCourseMenuType.admViewStuCourse:
            return 4
        case MessageMenuType.seeAllReceive:
            return 1
        case MessageMenuType.writeMessage:
            return 2
        case MessageMenuType.seeAllSend:
            return 3
    }
    return 0
}


export function info(title:string,msg:JSX.Element) {
    Modal.info({
        title,
        content:msg,
        onOk() {},
    });
}

export function getTitle(people:PeopleType,specific:SpecificMenuType):string {
    switch (people) {
        case PeopleType.student: {
            if (isInEnum(specific,StudentSelectCourseMenuType)){
                return "选择课程"
            }else if (isInEnum(specific,StudentLeaveMenuType)){
                return "日常请假"
            }else if (isInEnum(specific,MessageMenuType)){
                return "邮件管理"
            }
            break
        }
        case PeopleType.teacher: {
            if (isInEnum(specific,TeacherSelectCourseMenuType)){
                return "课程相关"
            }else if (isInEnum(specific,TeacherAndAdministratorsLeaveMenuType)){
                return "请假相关"
            }else if (isInEnum(specific,MessageMenuType)){
                return "邮件管理"
            }
            break
        }
        case PeopleType.administrators: {
            if (isInEnum(specific,AdministratorsSelectCourseMenuType)){
                return "管理课程"
            }else if (isInEnum(specific,TeacherAndAdministratorsLeaveMenuType)){
                return "请假审批"
            }else if (isInEnum(specific,MessageMenuType)){
                return "邮件管理"
            }else if (isInEnum(specific,AdministratorsAccountControl)){
                return "账号管理"
            }
            break
        }
    }
    return ""
}
