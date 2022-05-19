import {Form, Input, Button, Checkbox, DatePicker, Select} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useEffect, useState} from "react";
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../../tools";
import moment from 'moment';

const { Option } = Select;

const SendMessage = () => {
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
    const onChange = () => {

    }


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
                label="收件人　"
                name="toId"
                rules={[{ required: true, message: '请输入您要发送的对象!' }]}
            >
                <Input/>
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
