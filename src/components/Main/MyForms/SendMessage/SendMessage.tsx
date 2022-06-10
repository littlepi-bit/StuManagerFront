import {Button, Form, Input, Select} from 'antd';
import 'moment/locale/zh-cn';
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../../tools";
import moment from 'moment';
import React, {useEffect, useState} from "react";

const {Option} = Select
const SendMessage = () => {
    const [data,setData] = useState([])
    useEffect(
        ()=>{
            const {userId} = getUserInformation()
            //获取所有已经注册了的用户信息
            myPost('/viewAlreadyRegisteredUsers',{
                userId
            }).then(r=>{
                let temp:any = []
                r.data.forEach((each:any)=>{
                    if (each.userId === userId){
                        return
                    }else {
                        temp.push(each)
                    }
                })
                setData(temp)
            })
        }
        ,[]
    )
    const onFinish = (values: any) => {
        const {userId} = getUserInformation()
        console.log('Success:', values);
        let sendTime = moment().format("YYYY-MM-DD a hh:mm:ss")
        myPost('/sendMessage',{
            sendTime,
            sendMessage:values.sendMessage,
            fromId:userId,
            title:values.title,
            toId:values.toId
        }).then(r=>{
            let {message,status} = r.data
            if (status==="ok"){
                tellSuccess(message)
            }else {
                throw message
            }
        }).catch(message=>{
            tellError(message)
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="toId"
                label="收件人　"
                hasFeedback
                rules={[{ required: true, message: '请输入您要发送的对象!' }]}
            >
                <Select placeholder="请选择一个用户">
                    {
                        data.map(e=>{
                            let {userId,userName}  = e
                            const info = `${userName}(${userId})`
                            return <Option value={userId}>{info}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="邮件标题"
                name="title"
                rules={[{ required: true, message: '请输入您要发送的邮件标题!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="邮件内容"
                name="sendMessage"
                rules={[{ required: true, message: '请输入您的邮件内容!' }]}
            >
                <Input.TextArea />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    发送
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SendMessage;
