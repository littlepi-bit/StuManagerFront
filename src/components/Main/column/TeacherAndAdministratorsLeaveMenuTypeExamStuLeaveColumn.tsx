import {Button, Tag} from "antd";
import {getUserInformation, info, myPost, tellError, tellSuccess} from "../../../tools";

export default function TeacherAndAdministratorsLeaveMenuTypeExamStuLeaveColumn() {
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
