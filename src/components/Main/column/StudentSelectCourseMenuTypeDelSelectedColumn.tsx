import {getUserInformation, myPost, tellError, tellSuccess} from "../../../tools";
import {Button} from "antd";

export default function StudentSelectCourseMenuTypeDelSelectedColumn(forceUpdate:Function) {
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
