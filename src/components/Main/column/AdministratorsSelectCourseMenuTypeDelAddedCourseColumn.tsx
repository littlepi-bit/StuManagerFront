import {Button, Tag} from "antd";
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../tools";

export default function AdministratorsSelectCourseMenuTypeDelAddedCourseColumn(forceUpdate:Function) {
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
