import {Button, Tag} from "antd";
import {getUserInformation, info, myPost} from "../../../tools";

export default function MessageMenuTypeSeeAllReceiveColumn(forceUpdate:Function) {
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
            render:(_:any,record: any)=>{
                return `${record.fromName}(${record.fromId})`
            }
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
