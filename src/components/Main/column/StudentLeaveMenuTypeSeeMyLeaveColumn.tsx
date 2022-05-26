import {Button, Tag} from "antd";
import {info} from "../../../tools";

export default function StudentLeaveMenuTypeSeeMyLeaveColumn() {
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
