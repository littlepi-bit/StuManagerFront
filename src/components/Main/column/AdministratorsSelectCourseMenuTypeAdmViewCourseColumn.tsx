import {Button, Table} from "antd";
import {info, myPost} from "../../../tools";
import React from "react";


const columns = [
    {
        title: '用户Id',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: '性别',
        dataIndex: 'userSex',
        key: 'userSex',
    },
    {
        title: "班级",
        dataIndex: "userClass",
        key: "userClass"
    }
];


export default function AdministratorsSelectCourseMenuTypeAdmViewCourseColumn() {
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
            render:(courseId:any)=>{
                console.log(courseId)
                return <a>{courseId}</a>
            }
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
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            render:(_:any,record: any)=>{
                let {courseId} = record
                const viewStu = () => {
                    myPost('/viewAllStuInACourse',{
                        courseId
                    }).then(r=>{
                        info(
                            '选择该课的同学列表如下',
                            <Table dataSource={r.data} columns={columns} />
                        )
                    })
                }
                return <Button onClick={viewStu} type={"primary"}>查看选课人员</Button>
            }
        }
    ]
}
