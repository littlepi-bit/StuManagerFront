import {getUserInformation, myPost, tellError, tellSuccess} from "../../../tools";
import {Button} from "antd";

export default function TeacherSelectCourseMenuTypeDeleteSelectedTeachColumn(forceUpdate:Function) {
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
