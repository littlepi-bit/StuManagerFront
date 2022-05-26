import {Button, Form, Input, Radio} from 'antd';
import 'moment/locale/zh-cn';
import React, {useEffect, useRef, useState} from "react";
import {myPost, tellError, tellSuccess} from "../../../../tools";
import {PeopleType} from "../../mainConfig";

enum MyState {
    pending,
    student,
    teacher,
    administrator
}

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
    const button = useRef<any>()
    useEffect(
        ()=>{
            if (button.current){
                console.log(button.current.input.click())
            }
        },[]
    )
    const [state,setState] = useState<MyState>(MyState.pending)
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
            {
                state === MyState.pending?<></>:
                    state === MyState.student?<>
                        <Form.Item
                            label="学生性别"
                            name="userSex"
                            rules={[{ required: true, message: '请输入需要添加用户的性别!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="学生年级"
                            name="userGrade"
                            rules={[{ required: true, message: '请输入需要添加用户的年级!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="学生学院"
                            name="userCollege"
                            rules={[{ required: true, message: '请输入需要添加用户的学院!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="学生专业"
                            name="userMajor"
                            rules={[{ required: true, message: '请输入需要添加用户的专业!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="学生班级"
                            name="userClass"
                            rules={[{ required: true, message: '请输入需要添加用户的班级!' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </>:state === MyState.teacher?<>
                        <Form.Item
                            label="教师性别"
                            name="userSex"
                            rules={[{ required: true, message: '请输入需要添加用户的性别!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="教师职位"
                            name="userTitle"
                            rules={[{ required: true, message: '请输入需要添加用户的职位!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="教师学院"
                            name="userCollege"
                            rules={[{ required: true, message: '请输入需要添加用户的学院!' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </>:<>
                        <Form.Item
                            label="管理员类型"
                            name="userType"
                            rules={[{ required: true, message: '请输入需要添加用户的类型!' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </>
            }
            <Form.Item
                rules={[{ required: true, message: '请选择您的身份!' }]}
                label="身份选择" name="peopleType">
                <Radio.Group>
                    <Radio.Button ref={button} onClick={()=>{setState(MyState.student)}}  value={PeopleType.student}>{"学生"}</Radio.Button>
                    <Radio.Button onClick={()=>{setState(MyState.teacher)}}  value={PeopleType.teacher}>{"老师"}</Radio.Button>
                    <Radio.Button onClick={()=>{setState(MyState.administrator)}}  value={PeopleType.administrators}>{"管理员"}</Radio.Button>
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
