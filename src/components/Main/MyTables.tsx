import {
    AdministratorsAccountControl,
    AdministratorsSelectCourseMenuType,
    MessageMenuType,
    MyAllColumnsType,
    PeopleType,
    SpecificMenuType,
    StudentLeaveMenuType,
    StudentSelectCourseMenuType,
    TeacherAndAdministratorsLeaveMenuType,
    TeacherSelectCourseMenuType
} from "./mainConfig";
import React from "react";
import {getUserInformation, myPost} from "../../tools";
import {AxiosResponse} from "axios";

import TeacherSelectCourseMenuTypeViewAllNeedTeachColumn
    from "./column/TeacherSelectCourseMenuTypeViewAllNeedTeachColumn";
import TeacherSelectCourseMenuTypeSelectAllTeachColumn from "./column/TeacherSelectCourseMenuTypeSelectAllTeachColumn";
import MessageMenuTypeSeeAllReceiveColumn from "./column/MessageMenuTypeSeeAllReceiveColumn";
import TeacherAndAdministratorsLeaveMenuTypeViewStuLeaveColumn
    from "./column/TeacherAndAdministratorsLeaveMenuTypeViewStuLeaveColumn";
import TeacherAndAdministratorsLeaveMenuTypeExamStuLeaveColumn
    from "./column/TeacherAndAdministratorsLeaveMenuTypeExamStuLeaveColumn";
import TeacherSelectCourseMenuTypeDeleteSelectedTeachColumn
    from "./column/TeacherSelectCourseMenuTypeDeleteSelectedTeachColumn";
import MessageMenuTypeSeeAllSendColumn from "./column/MessageMenuTypeSeeAllSendColumn";
import AdministratorsSelectCourseMenuTypeAdmViewCourseColumn
    from "./column/AdministratorsSelectCourseMenuTypeAdmViewCourseColumn";
import AdministratorsSelectCourseMenuTypeDelAddedCourseColumn
    from "./column/AdministratorsSelectCourseMenuTypeDelAddedCourseColumn";
import AdministratorsAccountControlViewNewUserColumn from "./column/AdministratorsAccountControlViewNewUserColumn";
import AdministratorsAccountControlDelNewUserColumn from "./column/AdministratorsAccountControlDelNewUserColumn";
import StudentLeaveMenuTypeSeeMyLeaveColumn from "./column/StudentLeaveMenuTypeSeeMyLeaveColumn";
import StudentSelectCourseMenuTypeSeeAllColumn from "./column/StudentSelectCourseMenuTypeSeeAllColumn";
import StudentSelectCourseMenuTypeDelSelectedColumn from "./column/StudentSelectCourseMenuTypeDelSelectedColumn";
import StudentSelectCourseMenuTypeSeeSelectedColumn from "./column/StudentSelectCourseMenuTypeSeeSelectedColumn";


export const getColumns = (type:PeopleType, specificType:SpecificMenuType,forceUpdate:Function):MyAllColumnsType =>{

    switch (type) {
        case PeopleType.teacher: {
            switch (specificType) {
                case TeacherAndAdministratorsLeaveMenuType.viewStuLeave: {
                    return TeacherAndAdministratorsLeaveMenuTypeViewStuLeaveColumn()
                }
                case TeacherAndAdministratorsLeaveMenuType.examStuLeave: {
                    return TeacherAndAdministratorsLeaveMenuTypeExamStuLeaveColumn()
                }
                case TeacherSelectCourseMenuType.deleteSelectedTeach :{
                    return TeacherSelectCourseMenuTypeDeleteSelectedTeachColumn(forceUpdate)
                }
                case TeacherSelectCourseMenuType.viewAllNeedTeach :{
                    return TeacherSelectCourseMenuTypeViewAllNeedTeachColumn()
                }
                case TeacherSelectCourseMenuType.selectAllTeach :{
                    return TeacherSelectCourseMenuTypeSelectAllTeachColumn(forceUpdate)
                }
                case MessageMenuType.seeAllReceive: {
                    return MessageMenuTypeSeeAllReceiveColumn(forceUpdate)
                }
                case MessageMenuType.writeMessage:
                    break;
                case MessageMenuType.seeAllSend: {
                    return MessageMenuTypeSeeAllSendColumn()
                }
            }
        }
            break;
        case PeopleType.administrators: {
            switch (specificType) {
                case AdministratorsSelectCourseMenuType.admViewCourse: {
                    return AdministratorsSelectCourseMenuTypeAdmViewCourseColumn()
                }
                case AdministratorsSelectCourseMenuType.delAddedCourse: {
                    return AdministratorsSelectCourseMenuTypeDelAddedCourseColumn(forceUpdate)
                }
                case MessageMenuType.seeAllReceive: {
                    return MessageMenuTypeSeeAllReceiveColumn(forceUpdate)
                }
                case MessageMenuType.writeMessage:
                    break;
                case MessageMenuType.seeAllSend: {
                    return MessageMenuTypeSeeAllSendColumn()
                }
                case TeacherAndAdministratorsLeaveMenuType.viewStuLeave: {
                    return TeacherAndAdministratorsLeaveMenuTypeViewStuLeaveColumn()
                }
                case TeacherAndAdministratorsLeaveMenuType.examStuLeave: {
                    return TeacherAndAdministratorsLeaveMenuTypeExamStuLeaveColumn()
                }
                case AdministratorsAccountControl.viewNewUser :{
                    return AdministratorsAccountControlViewNewUserColumn()
                }
                case AdministratorsAccountControl.delNewUser :{
                    return AdministratorsAccountControlDelNewUserColumn(forceUpdate)
                }
            }
        }
            break;
        case PeopleType.student :{
            switch (specificType) {
                case StudentLeaveMenuType.commitLeave:
                    break;
                case StudentLeaveMenuType.seeMyLeave: {
                    return StudentLeaveMenuTypeSeeMyLeaveColumn()
                }
                case MessageMenuType.seeAllReceive: {
                    return MessageMenuTypeSeeAllReceiveColumn(forceUpdate)
                }
                case MessageMenuType.writeMessage:
                    break;
                case MessageMenuType.seeAllSend: {
                    return  MessageMenuTypeSeeAllSendColumn()
                }
                case StudentSelectCourseMenuType.seeAll :{
                    return StudentSelectCourseMenuTypeSeeAllColumn(forceUpdate)
                }
                case StudentSelectCourseMenuType.delSelected:{
                    return StudentSelectCourseMenuTypeDelSelectedColumn(forceUpdate)
                }
                case StudentSelectCourseMenuType.seeSelected:{
                    return StudentSelectCourseMenuTypeSeeSelectedColumn()
                }
            }
            break
        }
    }
    return []
}

export const waitData = (type:PeopleType, specificType:SpecificMenuType):Promise<AxiosResponse> =>{
    const {userId,password} = getUserInformation()
    switch (type) {
        case PeopleType.student:{
            switch (specificType) {

                case StudentSelectCourseMenuType.seeAll:{
                    return myPost('/viewAllCourse', {})
                }
                case StudentSelectCourseMenuType.delSelected:{
                    return myPost('/viewSelectedCourse',{
                        userId
                    })
                }
                case StudentSelectCourseMenuType.seeSelected:{
                    return myPost('/viewSelectedCourse',{
                        userId
                    })
                }
                case StudentLeaveMenuType.seeMyLeave:{
                    return myPost('/viewMyLeave',{
                        userId
                    })
                }
                case MessageMenuType.seeAllReceive: {
                    return myPost('/viewAllReceived',{
                        userId
                    })
                }
                case MessageMenuType.seeAllSend: {
                    return myPost('/viewAllSended',{
                        userId
                    })
                }

            }
            break
        }
        case PeopleType.administrators:{
            switch (specificType) {
                case AdministratorsSelectCourseMenuType.admViewCourse: {
                    return myPost('/viewAllCourse',{

                    })
                }
                case AdministratorsSelectCourseMenuType.delAddedCourse: {
                    return myPost('/viewInitialCourse',{
                        userId,
                        password
                    })
                }
                case MessageMenuType.seeAllReceive: {
                    return myPost('/viewAllReceived',{
                        userId
                    })
                }
                case MessageMenuType.seeAllSend: {
                    return myPost('/viewAllSended',{
                        userId
                    })
                }
                case TeacherAndAdministratorsLeaveMenuType.viewStuLeave: {
                    return myPost('/viewStuLeave',{
                        userId
                    })
                }
                case TeacherAndAdministratorsLeaveMenuType.examStuLeave: {
                    return myPost('/viewStuLeave',{
                        userId
                    })
                }
                case AdministratorsAccountControl.viewNewUser :{
                    return myPost('/viewUser',{
                        userId
                    })
                }
                case AdministratorsAccountControl.delNewUser :{
                    return myPost('/viewUser',{
                        userId
                    })
                }
            }
            break
        }
        case PeopleType.teacher: {
            switch (specificType) {
                case TeacherAndAdministratorsLeaveMenuType.viewStuLeave: {
                    return myPost('/viewStuLeaveByTeacher',{
                        userId
                    })
                }
                case TeacherAndAdministratorsLeaveMenuType.examStuLeave: {
                    return myPost('/viewStuLeaveByTeacher',{
                        userId
                    })
                }
                case TeacherSelectCourseMenuType.deleteSelectedTeach :{
                    return myPost('/viewAllNeedTeach',{
                        userId
                    })
                }
                case TeacherSelectCourseMenuType.viewAllNeedTeach :{
                    return myPost('/viewAllNeedTeach',{
                        userId
                    })
                }
                case TeacherSelectCourseMenuType.selectAllTeach :{
                    return myPost('/viewAllTeachCourse',{
                        userId
                    })
                }
                case MessageMenuType.seeAllReceive: {
                    return myPost('/viewAllReceived',{
                        userId
                    })
                }
                case MessageMenuType.seeAllSend: {
                    return myPost('/viewAllSended',{
                        userId
                    })
                }
            }
            break
        }
    }
    return myPost('/',{})
}

