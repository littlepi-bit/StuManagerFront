import {PeopleType} from "../mainConfig";
import {Tag} from "antd";

export default function AdministratorsAccountControlViewNewUserColumn() {
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
