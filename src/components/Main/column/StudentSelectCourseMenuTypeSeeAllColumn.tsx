import {getUserInformation, myPost, tellError, tellSuccess} from "../../../tools";
import {Button} from "antd";

export default function StudentSelectCourseMenuTypeSeeAllColumn(forceUpdate:Function) {
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
