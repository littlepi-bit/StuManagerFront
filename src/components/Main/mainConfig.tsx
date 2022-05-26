import {ColumnsType} from "antd/es/table";

/*       全局 begin       */
export interface myMenuItem {  //左边的导航区数据结构
    icon:JSX.Element,
    label:string
}

export enum PeopleType { //菜单的类型
    student="student",
    teacher="teacher",
    administrators="administrators"
}

export type SpecificMenuType =
/*学生*/StudentLeaveMenuType|StudentSelectCourseMenuType|
    /*老师*/TeacherSelectCourseMenuType|TeacherAndAdministratorsLeaveMenuType|
    /*管理员*/AdministratorsSelectCourseMenuType|AdministratorsAccountControl|
    /*全局*/MessageMenuType

export type MyAllColumnsType =
    /*学生*/ColumnsType<ColumnsTypeStudentSelectCourseSeeAll>|ColumnsType<ColumnsTypeStudentViewMyLeave>|
    /*管理员*/ColumnsType<ColumnsTypeDelAddedCourse>|
    /*全局*/ColumnsType<ColumnsTypeSeeAllReceive>|ColumnsType<ColumnsTypeSeeAllSend>

export enum MessageMenuType {
    seeAllReceive = "seeAllReceive",
    writeMessage = "writeMessage",
    seeAllSend = "seeAllSend"
}

export interface ColumnsTypeSeeAllReceive {
    key:string,
    fromId:string,
    sendTime:string,
    sendMessage:string,
    hasRead:boolean,
    title:string
}
export interface ColumnsTypeSeeAllSend {
    key:string,
    toId:string,
    sendTime:string,
    sendMessage:string,
    title:string
}
/*       全局 end      */



/*       学生 begin      */


export enum StudentLeaveMenuType  {   //学生请假菜单的类型
    commitLeave = "commitLeave",
    seeMyLeave = "seeMyLeave"
}
export enum StudentSelectCourseMenuType { //学生选课菜单的类型
    seeAll="seeAll",
    delSelected = "delSelected",
    seeSelected ="seeSelected"
}

export interface ColumnsTypeStudentSelectCourseSeeAll { //学生选课查看全部
    key:string,
    courseId:string,
    courseName:string,
    courseTime:string,
    courseValue:number,
    teacher:string,
    place:string,
    capacity:string,
    hasSelected:boolean
}

export interface  ColumnsTypeStudentViewMyLeave{
    key:string,
    leaveCourseId:string,
    leaveCourseName:string,
    leaveTime:string,
    leaveReason:string,
    teacher:string,
    place:string
    hasPassed:boolean
}


/*       学生 end       */


/*       老师 begin      */
export enum TeacherSelectCourseMenuType {
    selectAllTeach = "selectAllTeach",
    viewAllNeedTeach = "viewAllNeedTeach",
    deleteSelectedTeach = "deleteSelectedTeach"
}
export enum TeacherAndAdministratorsLeaveMenuType {
    viewStuLeave = "viewStuLeave",
    examStuLeave = "examStuLeave"
}


/*       老师 end       */


/*       管理员 begin      */
export enum AdministratorsSelectCourseMenuType {
    addNewCourse = "addNewCourse",
    delAddedCourse = "delAddedCourse",
    admViewCourse = "admViewCourse",
    admViewStuCourse = "admViewStuCourse"
}
export enum AdministratorsAccountControl {

    addNewUser = "addNewUser",
    delNewUser = "delNewUser",
    viewNewUser = "viewNewUser"
}

export interface  ColumnsTypeDelAddedCourse{
    key:string,
    courseId:string,
    courseName:string,
    courseTime:string,
    courseValue:number,
    teacher:string,
    place:string,
    capacity:string,
    hasAgreed:string
}


/*       管理员 end       */
