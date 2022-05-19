import {Form, Input, Button,  Radio} from 'antd';
import 'moment/locale/zh-cn';
import React from "react";
import { myPost, tellError, tellSuccess} from "../../../../tools";
import {PeopleType} from "../../mainConfig";


const AddUser = () => {
    const onFinish = (values: any) => {
        myPost('/addUser',values).then(r=>{
            let {status,msg} = r.data
            if (status === 'ok'){
                tellSuccess(msg)
            }else {
                throw msg
            }
        }).catch(msg=>{
            tellError(msg)
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
        >
            <Form.Item
                label="用户Id"
                name="userId"
                rules={[{ required: true, message: '请输入需要添加用户的用户编号!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="用户名"
                name="userName"
                rules={[{ required: true, message: '请输入需要添加用户的用户名!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: '请选择您的身份!' }]}
                label="身份选择" name="peopleType">
                <Radio.Group>
                    <Radio.Button value={PeopleType.student}>{"学生"}</Radio.Button>
                    <Radio.Button value={PeopleType.teacher}>{"老师"}</Radio.Button>
                    <Radio.Button value={PeopleType.administrators}>{"管理员"}</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    添加该用户
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUser;
