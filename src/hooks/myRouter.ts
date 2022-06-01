import {useNavigate} from 'react-router-dom';
import {
    AdministratorsAccountControl,
    AdministratorsSelectCourseMenuType,
    MessageMenuType,
    PeopleType,
    SpecificMenuType,
    StudentLeaveMenuType,
    StudentSelectCourseMenuType,
    TeacherAndAdministratorsLeaveMenuType,
    TeacherSelectCourseMenuType
} from "../components/Main/mainConfig";
import {isInEnum} from "../tools";

export const useToOptions = (people:PeopleType)=>{
    const navigate = useNavigate();
    return ()=>navigate(`/options/${people}`)
}

export const useToLogin= ()=>{
    const navigate = useNavigate();
    return ()=>navigate('/login')
}
export const useToSignIn= ()=>{
    const navigate = useNavigate();
    return ()=>navigate('/sign-in')
}

export const useToForgotPassword = ()=>{
    const navigate = useNavigate();
    return ()=>navigate('/forget-password')
}
//options内route
export const useOptionsRoute = (people: string | undefined)=>{
    const navigate = useNavigate();
    return (key:number) =>{
        switch (people) {
            case PeopleType.teacher:{
                switch (key) {
                    case 1:{
                        return navigate(`/main/${people}/${TeacherSelectCourseMenuType.selectAllTeach}`)
                    }
                    case 2:{
                        return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.viewStuLeave}`)
                    }
                    case 3:{
                        return navigate(`/main/${people}/${MessageMenuType.seeAllReceive}`)
                    }
                }
                break
            }
            case PeopleType.administrators:{
                switch (key) {
                    case 1:{
                        return navigate(`/main/${people}/${AdministratorsSelectCourseMenuType.addNewCourse}`)
                    }
                    case 2:{
                        return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.viewStuLeave}`)
                    }
                    case 3:{
                        return navigate(`/main/${people}/${MessageMenuType.seeAllReceive}`)
                    }
                    case 4:{
                        return navigate(`/main/${people}/${AdministratorsAccountControl.viewNewUser}`)
                    }
                }
                break
            }
            case PeopleType.student :{
                switch (key) {
                    case 1:{
                        return navigate(`/main/${people}/${StudentSelectCourseMenuType.seeAll}`)
                    }
                    case 2:{
                        return navigate(`/main/${people}/${StudentLeaveMenuType.commitLeave}`)
                    }
                    case 3:{
                        return navigate(`/main/${people}/${MessageMenuType.seeAllReceive}`)
                    }
                }


            }
        }
    }
}
export const useMainRoute = (people:PeopleType, specific:SpecificMenuType):Function=>{
    const navigate = useNavigate();
    return (key:string) =>{
        switch (people) {
            case PeopleType.teacher:{
                if (isInEnum(specific,TeacherSelectCourseMenuType)) {
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${TeacherSelectCourseMenuType.selectAllTeach}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${TeacherSelectCourseMenuType.deleteSelectedTeach}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${TeacherSelectCourseMenuType.viewAllNeedTeach}`)

                        }
                    }

                    break
                }
                else if (isInEnum(specific,TeacherAndAdministratorsLeaveMenuType)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.examStuLeave}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.viewStuLeave}`)
                        }
                        case "sub3":{
                            return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.teaCommitLeave}`)                        }
                    }
                }
                else if (isInEnum(specific,MessageMenuType)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${MessageMenuType.seeAllReceive}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${MessageMenuType.writeMessage}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${MessageMenuType.seeAllSend}`)

                        }
                    }
                }
                break
            }
            case PeopleType.administrators:{
                if (isInEnum(specific,AdministratorsSelectCourseMenuType)) {
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${AdministratorsSelectCourseMenuType.addNewCourse}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${AdministratorsSelectCourseMenuType.delAddedCourse}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${AdministratorsSelectCourseMenuType.admViewCourse}`)
                        }
                        case "sub4":{
                            return navigate(`/main/${people}/${AdministratorsSelectCourseMenuType.admViewStuCourse}`)
                        }
                    }

                    break
                }
                else if (isInEnum(specific,TeacherAndAdministratorsLeaveMenuType)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.viewStuLeave}`)

                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${TeacherAndAdministratorsLeaveMenuType.examStuLeave}`)

                        }

                    }
                }
                else if (isInEnum(specific,MessageMenuType)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${MessageMenuType.seeAllReceive}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${MessageMenuType.writeMessage}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${MessageMenuType.seeAllSend}`)

                        }
                    }
                }else if (isInEnum(specific,AdministratorsAccountControl)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${AdministratorsAccountControl.viewNewUser}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${AdministratorsAccountControl.addNewUser}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${AdministratorsAccountControl.delNewUser}`)

                        }

                    }
                }
                break
            }
            case PeopleType.student :{
                if (isInEnum(specific,StudentSelectCourseMenuType)) {
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${StudentSelectCourseMenuType.seeAll}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${StudentSelectCourseMenuType.delSelected}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${StudentSelectCourseMenuType.seeSelected}`)

                        }
                    }

                    break
                }
                else if (isInEnum(specific,StudentLeaveMenuType)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${StudentLeaveMenuType.commitLeave}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${StudentLeaveMenuType.seeMyLeave}`)
                        }

                    }
                }
                else if (isInEnum(specific,MessageMenuType)){
                    switch (key) {
                        case "sub1":{
                            return navigate(`/main/${people}/${MessageMenuType.seeAllReceive}`)
                        }
                        case "sub2":{
                            return navigate(`/main/${people}/${MessageMenuType.writeMessage}`)
                        }
                        case "sub3":{

                            return navigate(`/main/${people}/${MessageMenuType.seeAllSend}`)

                        }
                    }
                }
            }
        }
    }

}

