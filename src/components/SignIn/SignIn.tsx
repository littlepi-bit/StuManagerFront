import React from 'react';
import "./index.scss"
import {Button, Form, Input, Radio, Select} from "antd";
import {PeopleType} from "../Main/mainConfig";
import {useToLogin, useToOptions} from "../../hooks/myRouter";
import {myPost, tellError, tellSuccess, tellWaring} from "../../tools";

const { Option } = Select;


const SignIn = () => {
    const toLogin = useToLogin()
    const toStuOptions = useToOptions(PeopleType.student)
    const toTeaOptions = useToOptions(PeopleType.teacher)
    const toAdmOptions = useToOptions(PeopleType.administrators)
    const onFinish = (values: any) => {
        console.log('Success:', values);
        let {userId,userName,userPassword,userPasswordAgain,peopleType,Q1,Q2,userEmail} = values
        if (userPassword === userPasswordAgain){
            myPost('/signIn', {
                userId,
                userName,
                password: userPassword,
                peopleType,

                userEmail,
                question1:Q1.question,
                question2:Q2.question,
                answer1:Q1.answer,
                answer2:Q2.answer
            }).then(r  =>{
                let {msg,status} = r.data
                if (status === "ok"){
                    tellSuccess(msg)
                    let {token} = r.data
                    //保存信息
                    sessionStorage['userId'] =userId
                    sessionStorage['userName'] =userName
                    sessionStorage['password'] =userPassword
                    sessionStorage['token'] = token
                    sessionStorage['peopleType'] = peopleType


                    //跳转
                    switch (peopleType as PeopleType) {
                        case PeopleType.student:{
                            toStuOptions()
                            break
                        }
                        case PeopleType.teacher:{
                            toTeaOptions()
                            break
                        }
                        case PeopleType.administrators:{
                            toAdmOptions()
                            break
                        }
                    }


                }else {
                    throw msg
                }
            }).catch((msg)=>{
                tellError(msg)
            })
            return true
        }else {
            tellWaring('两次密码输入得一致!')
            return  false
        }

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={"SignIn"}>
            <div className="container">
                <div className="form">
                    <h2 className="headline">
                        <div>
                            欢迎您加入我们学生管理系统
                        </div>

                    </h2>
                    <p className="description">着眼于学生的未来，把教育做到每一个人身上，把良好的道德品格和积极有为的进取心内化为每一个学生的精神理念。</p>

                    <Form
                        name="basic"

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        initialValues={{ modifier: 'public' }}
                    >
                        <Form.Item
                            rules={[{ required: true, message: '请选择您的身份!' }]}
                            label="身份选择" name="peopleType">
                            <Radio.Group>
                                <Radio.Button value={PeopleType.student}>{"学生"}</Radio.Button>
                                <Radio.Button value={PeopleType.teacher}>{"老师"}</Radio.Button>
                                <Radio.Button value={PeopleType.administrators}>{"管理员"}</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="userName"
                            label="用户名"
                            rules={[{ required: true, message: '请输入您的用户名!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="userId" label="用户Id"
                                   rules={[{ required: true, message: '请输入您的用户Id!' }]}
                        >
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item name="userEmail" label="用户邮箱"
                                   rules={[{ required: true, message: '请输入您的用户邮箱!' }]}
                        >
                            <Input type="email" />
                        </Form.Item>

                        {/*你最喜欢的宠物的名字?你毕业的中学名称?你最喜欢的颜色是?你最喜欢的电影名称是?你最喜欢的明星是?*/}
                        <Form.Item label="问题1">
                            <Input.Group compact>
                                <Form.Item
                                    name={['Q1', 'question']}
                                    noStyle
                                    rules={[{ required: true, message: '问题1必须选择!' }]}
                                >
                                    <Select  style={{width:"100%",marginBottom:20}}  placeholder="选择问题1">
                                        <Option value="你入读的第一所学校名称?">你入读的第一所学校名称?</Option>
                                        <Option value="你父亲的名字?">你父亲的名字?</Option>
                                        <Option value="你母亲的名字?">你母亲的名字?</Option>
                                        <Option value="你的出生地是哪里?">你的出生地是哪里?</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={['Q1', 'answer']}
                                    noStyle
                                    rules={[{ required: true, message: '问题1必须回答!' }]}
                                >
                                    <Input style={{ width: '100%' }} placeholder="输入问题1的答案！" />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                        <Form.Item label="问题2">
                            <Input.Group compact>
                                <Form.Item
                                    name={['Q2', 'question']}
                                    noStyle
                                    rules={[{ required: true, message: '问题2必须选择!' }]}
                                >
                                    <Select style={{width:"100%",marginBottom:20}} placeholder="选择问题2">
                                        <Option value="你最喜欢的宠物的名字?">你最喜欢的宠物的名字?</Option>
                                        <Option value="你最喜欢的颜色是?">你最喜欢的颜色是?</Option>
                                        <Option value="你最喜欢的电影名称是">你最喜欢的电影名称是?</Option>
                                        <Option value="你最喜欢的明星是?">你最喜欢的明星是?</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={['Q2', 'answer']}
                                    noStyle
                                    rules={[{ required: true, message: '问题2必须回答!' }]}
                                >
                                    <Input style={{ width: '100%' }} placeholder="输入问题2的答案！" />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item name="userPassword" label="用户密码"
                                   rules={[{ required: true, message: '请输入您的用户密码!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item name="userPasswordAgain" label="重复密码"
                                   rules={[{ required: true, message: '请重复密码!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item wrapperCol={{   }}>
                            <Button  type="primary" htmlType="submit">
                                立即注册
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="login">
                        <p>已经是用户了？ <span onClick={toLogin}>登录</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
