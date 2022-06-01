import {PeopleType} from "../mainConfig";
import {Button, Tag} from "antd";
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../tools";

export default function AdministratorsAccountControlDelNewUserColumn(forceUpdate:Function) {
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
            title: "用户名",
            dataIndex: "userName",
            key: "userName",
            render:(_:any,record:any)=>{
                return <a>{_}</a>
            }
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
