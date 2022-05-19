import React, {useState} from 'react';
import "./index.scss"
import {Button, Form, Input} from "antd";
import {useToLogin} from "../../hooks/myRouter";
import {getUserInformation, myPost, tellError, tellSuccess, tellWaring} from "../../tools";

const ForgetPassword = () => {
    const toLogin = useToLogin()
    const [hasViewQuestion,changeHasViewQuestion]= useState(false)
    const [questions,changeQuestions] = useState({question1:"",question2:""})
    const onFinish = (values: any) => {
        console.log('Success:', values);
        const {userId} = getUserInformation()
        if (!hasViewQuestion){
            myPost('/getQuestion',{
                userId
            }).then(r=>{
                let {msg,status,question1,question2} = r.data
                if (status === 'ok'){
                    tellSuccess(msg)
                    changeHasViewQuestion(true)
                    changeQuestions({question1 ,question2 })
                }else {
                    throw msg
                }
            }).catch((msg)=>{
                tellError(msg)
            })
        }else {
            let {userId,userPassword,userPasswordAgain,Q1,Q2} = values
            if (userPassword === userPasswordAgain){
                myPost('/changePassword',{
                    userId,
                    question1: questions.question1,
                    question2: questions.question2,
                    answer1: Q1.answer,
                    answer2: Q2.answer,
                    newPassword: userPassword
                }).then(r=>{
                    let {msg,status} = r.data
                    if (status === 'ok'){
                        tellSuccess(msg)
                        tellSuccess('请重新登录！')
                        toLogin()
                    }else {
                        throw msg
                    }
                }).catch((msg)=>{
                    tellError(msg)
                })
            }else {
                tellWaring('两次密码输入得一致!')
            }
        }

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if (!hasViewQuestion){
        return    <div className={"ForgetPassword"}>
            <div className="container">
                <div className="form">
                    <h2 className="headline">
                        <div>
                            在这里修改密码
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

                        <Form.Item name="userId" label="用户Id"
                                   rules={[{ required: true, message: '请输入您的用户Id!' }]}
                        >
                            <Input type="textarea" />
                        </Form.Item>
                        <Form.Item wrapperCol={{   }}>
                            <Button  type="primary" htmlType={"submit"} >
                                获取问题
                            </Button>
                        </Form.Item>

                    </Form>

                    <div className="login">
                        <p> <span onClick={toLogin}>返回登录</span></p>
                    </div>
                </div>
            </div>

        </div>
    }else {
        return    <div className={"ForgetPassword"}>
            <div className="container">
                <div className="form">
                    <h2 className="headline">
                        <div>
                            在这里修改密码
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

                        <Form.Item name="userId" label="用户Id"
                                   rules={[{ required: true, message: '请输入您的用户Id!' }]}
                        >
                            <Input type="textarea" />
                        </Form.Item>


                        <Form.Item label={`问题1:  ${questions.question1}`}>

                            <Form.Item
                                name={['Q1', 'answer']}
                                noStyle
                                rules={[{ required: true, message: '问题1必须回答!' }]}
                            >
                                <Input style={{ width: '100%' }} placeholder="输入问题1的答案！" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label={`问题2:  ${questions.question2}`}>


                            <Form.Item
                                name={['Q2', 'answer']}
                                noStyle
                                rules={[{ required: true, message: '问题2必须回答!' }]}
                            >
                                <Input style={{ width: '100%' }} placeholder="输入问题2的答案！" />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item name="userPassword" label="新用户密码"
                                   rules={[{ required: true, message: '请输入您的用户密码!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item name="userPasswordAgain" label="重复新密码"
                                   rules={[{ required: true, message: '请重复密码!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item wrapperCol={{   }}>
                            <Button  type="primary" htmlType="submit">
                                修改密码
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="login">
                        <p> <span onClick={toLogin}>返回登录</span></p>
                    </div>
                </div>
            </div>

        </div>
    }

};

export default ForgetPassword;
