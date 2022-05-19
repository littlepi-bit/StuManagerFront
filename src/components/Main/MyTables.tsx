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
import {Button, Modal, Tag} from "antd";
import React from "react";
import {getUserInformation, myPost, tellError, tellSuccess} from "../../tools";
import {AxiosResponse} from "axios";

function info(title:string,msg:JSX.Element) {
    Modal.info({
        title,
        content:msg,
        onOk() {},
    });
}

export const getColumns = (type:PeopleType, specificType:SpecificMenuType,forceUpdate:Function):MyAllColumnsType =>{

    switch (type) {
        case PeopleType.teacher: {
            switch (specificType) {
                case TeacherAndAdministratorsLeaveMenuType.viewStuLeave: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"申请用户Id",
                            dataIndex:"applicantId",
                            key:"applicantId"
                        },
                        {
                            title:"申请用户名",
                            dataIndex:"applicantName",
                            key:"applicantName"
                        },
                        {
                            title:"课程编号",
                            dataIndex:"leaveCourseId",
                            key:"leaveCourseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"leaveCourseName",
                            key:"leaveCourseName",
                        },
                        {
                            title:"请假时间",
                            dataIndex:"leaveTime",
                            key:"leaveTime"
                        },

                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {leaveReason} = record
                                const showReason = () => {
                                    info("请假理由为",
                                        <>
                                            <div>{leaveReason}</div>
                                        </>
                                    )
                                }
                                return <>
                                    <Button  onClick={showReason} type={"primary"} >查看理由</Button>
                                </>
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"status",
                            key:"status",
                            render:(_:any,record:any)=>{
                                let {teacherIdea} = record

                                if (teacherIdea === "pending"){
                                    return <Tag color="orange">等待老师审核</Tag>
                                }else if (teacherIdea === "true"){
                                    return <Tag color="#87d068">老师已通过</Tag>
                                }else {
                                    return <Tag color="#f50">老师已拒绝</Tag>
                                }
                            }
                        }
                    ]

                }
                case TeacherAndAdministratorsLeaveMenuType.examStuLeave: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"申请用户Id",
                            dataIndex:"applicantId",
                            key:"applicantId"
                        },
                        {
                            title:"申请用户名",
                            dataIndex:"applicantName",
                            key:"applicantName"
                        },
                        {
                            title:"课程编号",
                            dataIndex:"leaveCourseId",
                            key:"leaveCourseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"leaveCourseName",
                            key:"leaveCourseName",
                        },
                        {
                            title:"请假时间",
                            dataIndex:"leaveTime",
                            key:"leaveTime"
                        },

                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {leaveReason} = record
                                const showReason = () => {
                                    info("请假理由为",
                                        <>
                                            <div>{leaveReason}</div>
                                        </>
                                    )
                                }
                                return <>
                                    <Button  onClick={showReason} type={"primary"} >查看理由</Button>
                                </>
                            }
                        },
                        {
                            title:"审核",
                            dataIndex:"check",
                            key:"check",
                            render:(_:any,record:any)=>{
                                let {leaveId} = record
                                let {userId} = getUserInformation()
                                const examIt = (out:string) => {
                                    myPost('/examLeaveByTeacher',{
                                        userId,
                                        leaveId,
                                        out
                                    }).then(r=>{
                                        let {msg,status} = r.data
                                        if (status === "ok"){
                                            tellSuccess(msg)
                                        }else {
                                            throw msg
                                        }
                                    }).catch(msg=>{
                                        tellError(msg)
                                    })
                                }


                                return <>
                                    <Button style={{marginRight:20}}  onClick={()=>examIt('pass')} type={"primary"} >审核通过</Button>
                                    <Button   onClick={()=>examIt('refuse')} type={"primary" } danger >拒绝通过</Button>
                                </>
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"status",
                            key:"status",
                            render:(_:any,record:any)=>{
                                let {teacherIdea} = record

                                if (teacherIdea === "pending"){
                                    return <Tag color="orange">等待老师审核</Tag>
                                }else if (teacherIdea === "true"){
                                    return <Tag color="#87d068">老师已通过</Tag>
                                }else {
                                    return <Tag color="#f50">老师已拒绝</Tag>
                                }
                            }

                        }
                    ]

                }
                case TeacherSelectCourseMenuType.deleteSelectedTeach :{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"最大容量",
                            dataIndex:"maxCapacity",
                            key:"maxCapacity",
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {userId} = getUserInformation()
                                let {courseId} = record
                                const choose = (attitude:string) => {
                                    myPost('/whetherTeaching',{
                                        userId,
                                        courseId,
                                        attitude
                                    }).then(r=>{
                                        let {msg,status} = r.data
                                        if (status === "ok"){
                                            tellSuccess(msg)
                                            forceUpdate()
                                        } else {
                                            throw msg
                                        }
                                    }).catch((msg)=>{
                                        tellError(msg)
                                    })
                                }
                                return <>
                                    <Button onClick={()=>choose('reject')} danger type={"primary"}>拒绝该课程</Button>
                                </>
                            }
                        }
                    ]

                }
                case TeacherSelectCourseMenuType.viewAllNeedTeach :{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"最大容量",
                            dataIndex:"maxCapacity",
                            key:"maxCapacity",
                        }
                    ]

                }
                case TeacherSelectCourseMenuType.selectAllTeach :{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasAgreed",
                            key:"hasAgreed",
                            render:(hasAgreed:string)=>{
                                if (hasAgreed === "true"){
                                    return <Tag color="#87d068">已经确认上课</Tag>
                                }else if (hasAgreed === "false"){
                                    return <Tag color="#f50">已经拒绝上课</Tag>
                                }else {
                                    return <Tag color="orange">还未回应</Tag>
                                }
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"最大容量",
                            dataIndex:"maxCapacity",
                            key:"maxCapacity",
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {userId} = getUserInformation()
                                let {courseId} = record
                                const choose = (attitude:string) => {
                                    myPost('/whetherTeaching',{
                                        userId,
                                        courseId,
                                        attitude
                                    }).then(r=>{
                                        let {msg,status} = r.data
                                        if (status === "ok"){
                                            tellSuccess(msg)
                                            forceUpdate()
                                        } else {
                                            throw msg
                                        }
                                    }).catch((msg)=>{
                                        tellError(msg)
                                    })
                                }
                                return <>
                                    <Button style={{marginRight:20}} onClick={()=>choose('pass')} type={"primary"}>选择该课程</Button>
                                    <Button onClick={()=>choose('reject')} danger type={"primary"}>拒绝该课程</Button>
                                </>
                            }
                        }
                    ]


                }
                case MessageMenuType.seeAllReceive: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasRead",
                            key:"hasRead",
                            render:(_:any,record:any)=>{
                                let {hasRead} = record
                                if (hasRead){
                                    return <Tag color="#87d068">已读</Tag>
                                }else {
                                    return <Tag color="orange">未读</Tag>
                                }
                            }
                        },
                        {
                            title:"邮件标题",
                            dataIndex:"title",
                            key:"title"
                        },
                        {
                            title:"发件人",
                            dataIndex:"fromId",
                            key:"fromId",
                        },
                        {
                            title:"发送时间",
                            dataIndex:"sendTime",
                            key:"sendTime"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {sendMessage,hasRead,messageId,title} = record
                                const {userId} = getUserInformation()
                                const showReason = () => {
                                    if (!hasRead){
                                        myPost('/readMessage',{
                                            userId,
                                            messageId
                                        }).then(()=>{
                                            forceUpdate()
                                        })
                                    }
                                    info("邮件内容为",
                                        <>
                                            <h1>{title}</h1>
                                            <hr/>
                                            <div>{sendMessage}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看邮件</Button>
                            }
                        }
                    ]
                }
                case MessageMenuType.writeMessage:
                    break;
                case MessageMenuType.seeAllSend: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasRead",
                            key:"hasRead",
                            render:(_:any,record:any)=>{
                                let {hasRead} = record
                                if (hasRead){
                                    return <Tag color="#87d068">已读</Tag>
                                }else {
                                    return <Tag color="orange">未读</Tag>
                                }
                            }
                        },

                        {
                            title:"邮件标题",
                            dataIndex:"title",
                            key:"title"
                        },
                        {
                            title:"收件人",
                            dataIndex:"toId",
                            key:"toId",
                        },
                        {
                            title:"发送时间",
                            dataIndex:"sendTime",
                            key:"sendTime"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {sendMessage,title} = record
                                const showReason = () => {
                                    info("邮件内容为",
                                        <>
                                            <h1>{title}</h1>
                                            <hr/>
                                            <div>{sendMessage}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看邮件</Button>
                            }
                        }
                    ]
                }
            }
        }
            break;
        case PeopleType.administrators: {
            switch (specificType) {
                case AdministratorsSelectCourseMenuType.admViewCourse: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"容量",
                            dataIndex:"capacity",
                            key:"capacity",
                        }
                    ]

                }
                case AdministratorsSelectCourseMenuType.delAddedCourse: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasAgreed",
                            key:"hasAgreed",
                            render:(hasAgreed:string)=>{
                                if (hasAgreed === "true"){
                                    return <Tag color="#87d068">老师已经确认</Tag>
                                }else if (hasAgreed === "false"){
                                    return <Tag color="#f50">老师已经拒绝</Tag>
                                }else {
                                    return <Tag color="orange">老师还未回应</Tag>
                                }
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"最大容量",
                            dataIndex:"maxCapacity",
                            key:"maxCapacity",
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {userId} = getUserInformation()
                                let {courseId} = record
                                const deleteIt = () => {
                                    myPost('/deleteCourse',{
                                        userId,
                                        courseId
                                    }).then(r=>{
                                        let {msg,status} = r.data
                                        if (status === "ok"){
                                            tellSuccess(msg)
                                            forceUpdate()
                                        } else {
                                            throw msg
                                        }
                                    }).catch((msg)=>{
                                        tellError(msg)
                                    })
                                }
                                return <Button onClick={deleteIt} danger type={"primary"}>删除该课程</Button>
                            }
                        }
                    ]

                }
                case MessageMenuType.seeAllReceive: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasRead",
                            key:"hasRead",
                            render:(_:any,record:any)=>{
                                let {hasRead} = record
                                if (hasRead){
                                    return <Tag color="#87d068">已读</Tag>
                                }else {
                                    return <Tag color="orange">未读</Tag>
                                }
                            }
                        },
                        {
                            title:"邮件标题",
                            dataIndex:"title",
                            key:"title"
                        },
                        {
                            title:"发件人",
                            dataIndex:"fromId",
                            key:"fromId",
                        },
                        {
                            title:"发送时间",
                            dataIndex:"sendTime",
                            key:"sendTime"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {sendMessage,hasRead,messageId,title} = record
                                const {userId} = getUserInformation()
                                const showReason = () => {
                                    if (!hasRead){
                                        myPost('/readMessage',{
                                            userId,
                                            messageId
                                        }).then(()=>{
                                            forceUpdate()
                                        })
                                    }
                                    info("邮件内容为",
                                        <>
                                            <h1>{title}</h1>
                                            <hr/>
                                            <div>{sendMessage}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看邮件</Button>
                            }
                        }
                    ]
                }
                case MessageMenuType.writeMessage:
                    break;
                case MessageMenuType.seeAllSend: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasRead",
                            key:"hasRead",
                            render:(_:any,record:any)=>{
                                let {hasRead} = record
                                if (hasRead){
                                    return <Tag color="#87d068">已读</Tag>
                                }else {
                                    return <Tag color="orange">未读</Tag>
                                }
                            }
                        },

                        {
                            title:"邮件标题",
                            dataIndex:"title",
                            key:"title"
                        },
                        {
                            title:"收件人",
                            dataIndex:"toId",
                            key:"toId",
                        },
                        {
                            title:"发送时间",
                            dataIndex:"sendTime",
                            key:"sendTime"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {sendMessage,title} = record
                                const showReason = () => {
                                    info("邮件内容为",
                                        <>
                                            <h1>{title}</h1>
                                            <hr/>
                                            <div>{sendMessage}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看邮件</Button>
                            }
                        }
                    ]
                }
                case TeacherAndAdministratorsLeaveMenuType.viewStuLeave: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"申请用户Id",
                            dataIndex:"applicantId",
                            key:"applicantId"
                        },
                        {
                            title:"申请用户名",
                            dataIndex:"applicantName",
                            key:"applicantName"
                        },
                        {
                            title:"课程编号",
                            dataIndex:"leaveCourseId",
                            key:"leaveCourseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"leaveCourseName",
                            key:"leaveCourseName",
                        },
                        {
                            title:"请假时间",
                            dataIndex:"leaveTime",
                            key:"leaveTime"
                        },

                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {leaveReason} = record
                                const showReason = () => {
                                    info("请假理由为",
                                        <>
                                            <div>{leaveReason}</div>
                                        </>
                                    )
                                }
                                return <>
                                    <Button  onClick={showReason} type={"primary"} >查看理由</Button>
                                </>
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"status",
                            key:"status",
                            render:(_:any,record:any)=>{
                                let {teacherIdea,administratorIdea} = record
                                if (administratorIdea === "false"){
                                    return <Tag color="#f50">管理员已拒绝</Tag>
                                }
                                if (administratorIdea === "pending"){
                                    return <Tag color="orange">等待审核中</Tag>
                                }

                                if (administratorIdea === "true"){
                                    if (teacherIdea === "pending"){
                                        return <Tag color="orange">等待老师审核</Tag>
                                    }else if (teacherIdea === "true"){
                                        return <Tag color="#87d068">老师已通过</Tag>
                                    }else {
                                        return <Tag color="#f50">老师已拒绝</Tag>
                                    }
                                }
                            }
                        }
                    ]

                }
                case TeacherAndAdministratorsLeaveMenuType.examStuLeave: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"申请用户Id",
                            dataIndex:"applicantId",
                            key:"applicantId"
                        },
                        {
                            title:"申请用户名",
                            dataIndex:"applicantName",
                            key:"applicantName"
                        },
                        {
                            title:"课程编号",
                            dataIndex:"leaveCourseId",
                            key:"leaveCourseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"leaveCourseName",
                            key:"leaveCourseName",
                        },
                        {
                            title:"请假时间",
                            dataIndex:"leaveTime",
                            key:"leaveTime"
                        },

                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {leaveReason} = record
                                const showReason = () => {
                                    info("请假理由为",
                                        <>
                                            <div>{leaveReason}</div>
                                        </>
                                    )
                                }
                                return <>
                                    <Button  onClick={showReason} type={"primary"} >查看理由</Button>
                                </>
                            }
                        },
                        {
                            title:"审核",
                            dataIndex:"check",
                            key:"check",
                            render:(_:any,record:any)=>{
                                let {leaveId} = record
                                let {userId} = getUserInformation()
                                const examIt = (out:string) => {
                                    myPost('/examLeave',{
                                        userId,
                                        leaveId,
                                        out
                                    }).then(r=>{
                                        let {msg,status} = r.data
                                        if (status === "ok"){
                                            tellSuccess(msg)
                                        }else {
                                            throw msg
                                        }
                                    }).catch(msg=>{
                                        tellError(msg)
                                    })
                                }


                                return <>
                                    <Button style={{marginRight:20}}  onClick={()=>examIt('pass')} type={"primary"} >审核通过</Button>
                                    <Button   onClick={()=>examIt('refuse')} type={"primary" } danger >拒绝通过</Button>
                                </>
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"status",
                            key:"status",
                            render:(_:any,record:any)=>{
                                let {teacherIdea,administratorIdea} = record
                                if (administratorIdea === "false"){
                                    return <Tag color="#f50">管理员已拒绝</Tag>
                                }
                                if (administratorIdea === "pending"){
                                    return <Tag color="orange">等待审核中</Tag>
                                }

                                if (administratorIdea === "true"){
                                    if (teacherIdea === "pending"){
                                        return <Tag color="orange">等待老师审核</Tag>
                                    }else if (teacherIdea === "true"){
                                        return <Tag color="#87d068">老师已通过</Tag>
                                    }else {
                                        return <Tag color="#f50">老师已拒绝</Tag>
                                    }
                                }
                            }

                        }
                    ]

                }
                case AdministratorsAccountControl.viewNewUser :{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"身份",
                            dataIndex:"peopleType",
                            key:"peopleType",
                            render:(peopleType:string)=>{
                                switch (peopleType) {
                                    case PeopleType.student :{
                                        return <a>学生</a>
                                    }
                                    case PeopleType.teacher :{
                                        return <a>老师</a>
                                    }
                                    case PeopleType.administrators :{
                                        return <a>管理员</a>
                                    }
                                }
                                return <a>外星人</a>
                            }
                        },
                        {
                            title:"用户Id",
                            dataIndex:"userId",
                            key:"userId"
                        },
                        {
                            title:"是否注册",
                            dataIndex:"hasSignIn",
                            key:"hasSignIn",
                            render:(_:any,record:any)=>{
                                let {hasSignIn} = record
                                if (hasSignIn){
                                    return <Tag color="#87d068">已经注册</Tag>
                                }else {
                                    return <Tag color="orange">还未注册</Tag>
                                }
                            }
                        }
                    ]
                }
                case AdministratorsAccountControl.delNewUser :{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"身份",
                            dataIndex:"peopleType",
                            key:"peopleType",
                            render:(peopleType:string)=>{
                                switch (peopleType) {
                                    case PeopleType.student :{
                                        return <a>学生</a>
                                    }
                                    case PeopleType.teacher :{
                                        return <a>老师</a>
                                    }
                                    case PeopleType.administrators :{
                                        return <a>管理员</a>
                                    }
                                }
                                return <a>外星人</a>
                            }
                        },
                        {
                            title:"用户Id",
                            dataIndex:"userId",
                            key:"userId"
                        },
                        {
                            title:"是否注册",
                            dataIndex:"hasSignIn",
                            key:"hasSignIn",
                            render:(_:any,record:any)=>{
                                let {hasSignIn} = record
                                if (hasSignIn){
                                    return <Tag color="#87d068">已经注册</Tag>
                                }else {
                                    return <Tag color="orange">还未注册</Tag>
                                }
                            }
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {userId} = getUserInformation()
                                const deleteIt = () => {
                                    myPost('/delUser',{
                                        userId:userId,
                                        delUserId:record.userId
                                    }).then(r=>{
                                        let {msg,status} = r.data

                                        //尝试修复 删除直接不显示的 bug
                                        if (!msg||!status){return}

                                        if (status === "ok"){
                                            tellSuccess(msg)
                                            forceUpdate()
                                        } else {
                                            throw msg
                                        }
                                    }).catch((msg)=>{
                                        tellError(msg)
                                    })
                                }
                                return <Button onClick={deleteIt} danger type={"primary"}>删除该用户</Button>
                            }
                        }
                    ]

                }
            }
        }
            break;
        case PeopleType.student :{
            switch (specificType) {
                case StudentLeaveMenuType.commitLeave:
                    break;
                case StudentLeaveMenuType.seeMyLeave: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"leaveCourseId",
                            key:"leaveCourseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"leaveCourseName",
                            key:"leaveCourseName",
                        },
                        {
                            title:"请假时间",
                            dataIndex:"leaveTime",
                            key:"leaveTime"
                        },

                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {leaveReason} = record
                                const showReason = () => {
                                    info("请假理由为",
                                        <>
                                            <div>{leaveReason}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看理由</Button>
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"status",
                            key:"status",
                            render:(_:any,record:any)=>{
                                let {teacherIdea,administratorIdea} = record
                                if (teacherIdea === "true" && administratorIdea === "true"){
                                    return <Tag color="#87d068">已通过</Tag>
                                }else if (teacherIdea === "false" || administratorIdea === "false"){
                                    return <Tag color="#f50">未通过</Tag>
                                }else {
                                    return <Tag color="orange">审核中</Tag>
                                }
                            }
                        }
                    ]


                }


                case MessageMenuType.seeAllReceive: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasRead",
                            key:"hasRead",
                            render:(_:any,record:any)=>{
                                let {hasRead} = record
                                if (hasRead){
                                    return <Tag color="#87d068">已读</Tag>
                                }else {
                                    return <Tag color="orange">未读</Tag>
                                }
                            }
                        },
                        {
                          title:"邮件标题",
                          dataIndex:"title",
                          key:"title"
                        },
                        {
                            title:"发件人",
                            dataIndex:"fromId",
                            key:"fromId",
                        },
                        {
                            title:"发送时间",
                            dataIndex:"sendTime",
                            key:"sendTime"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {sendMessage,hasRead,messageId,title} = record
                                const {userId} = getUserInformation()
                                const showReason = () => {
                                    if (!hasRead){
                                        myPost('/readMessage',{
                                            userId,
                                            messageId
                                        }).then(()=>{
                                            forceUpdate()
                                        })
                                    }
                                    info("邮件内容为",
                                        <>
                                            <h1>{title}</h1>
                                            <hr/>
                                            <div>{sendMessage}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看邮件</Button>
                            }
                        }
                    ]
                }
                case MessageMenuType.writeMessage:
                    break;
                case MessageMenuType.seeAllSend: {
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"状态",
                            dataIndex:"hasRead",
                            key:"hasRead",
                            render:(_:any,record:any)=>{
                                let {hasRead} = record
                                if (hasRead){
                                    return <Tag color="#87d068">已读</Tag>
                                }else {
                                    return <Tag color="orange">未读</Tag>
                                }
                            }
                        },

                        {
                            title:"邮件标题",
                                dataIndex:"title",
                            key:"title"
                        },
                        {
                            title:"收件人",
                            dataIndex:"toId",
                            key:"toId",
                        },
                        {
                            title:"发送时间",
                            dataIndex:"sendTime",
                            key:"sendTime"
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {sendMessage,title} = record
                                const showReason = () => {
                                    info("邮件内容为",
                                        <>
                                            <h1>{title}</h1>
                                            <hr/>
                                            <div>{sendMessage}</div>
                                        </>
                                    )
                                }
                                return <Button onClick={showReason} type={"primary"} >查看邮件</Button>
                            }
                        }
                    ]
                }
                case StudentSelectCourseMenuType.seeAll :{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"容量",
                            dataIndex:"capacity",
                            key:"capacity",
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {courseId,hasSelected} = record
                                const {userId} = getUserInformation()
                                const selectIt = ()=>{
                                    myPost('/selectCourse',{
                                        userId,
                                        courseId
                                    }).then(r=>{
                                        let {status,message} = r.data
                                        if (status === "ok"){
                                            tellSuccess(message)
                                            forceUpdate()
                                        }else {
                                            throw message
                                        }
                                    }).catch(message=>{
                                        tellError(message)
                                    })
                                }
                                return hasSelected?
                                    <Button disabled >已经选择</Button>:
                                    <Button onClick={selectIt} type={"primary"}>添加选课</Button>
                            }
                        }
                    ]
                }
                case StudentSelectCourseMenuType.delSelected:{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"容量",
                            dataIndex:"capacity",
                            key:"capacity",
                        },
                        {
                            title:"操作",
                            dataIndex:"operation",
                            key:"operation",
                            render:(_:any,record:any)=>{
                                let {userId} = getUserInformation()
                                let {courseId} = record
                                const deleteIt = () => {
                                    myPost('/deleteSelectedCourse',{
                                        userId,
                                        courseId
                                    }).then(r=>{
                                        let {message,status} = r.data

                                        //尝试修复 删除直接不显示的 bug
                                        if (!message||!status){return}

                                        if (status === "ok"){
                                            tellSuccess(message)
                                            forceUpdate()
                                        } else {
                                            throw message
                                        }
                                    }).catch((msg)=>{
                                        tellError(msg)
                                    })
                                }
                                return <Button onClick={deleteIt} danger type={"primary"}>删除选课</Button>
                            }
                        }
                    ]
                }
                case StudentSelectCourseMenuType.seeSelected:{
                    return [
                        {
                            title:"序号",
                            dataIndex:"rank",
                            key:"rank",
                            render:(_:any,record:any,index:any)=>{
                                return index+1
                            }
                        },
                        {
                            title:"课程编号",
                            dataIndex:"courseId",
                            key:"courseId",
                        },
                        {
                            title:"开课学院",
                            dataIndex:"courseCollege",
                            key:"courseCollege",
                        },
                        {
                            title:"课程名称",
                            dataIndex:"courseName",
                            key:"courseName",
                        },
                        {
                            title:"课程时间",
                            dataIndex:"courseTime",
                            key:"courseTime"
                        },
                        {
                            title:"学时",
                            dataIndex:"courseValue",
                            key:"courseValue"
                        },
                        {
                            title:"教师",
                            dataIndex:"teacher",
                            key:"teacher"
                        },
                        {
                            title:"地址",
                            dataIndex:"place",
                            key:"place"
                        },
                        {
                            title:"容量",
                            dataIndex:"capacity",
                            key:"capacity",
                        }

                    ]

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

