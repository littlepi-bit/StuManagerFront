import {Button, Form, Input, Radio, Select} from 'antd';
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
const { Option } = Select;
const college = ['土木工程学院', '机械工程学院', '电气工程学院', '信息科学与技术学院', '交通运输与物流学院', '计算机与人工智能学院', '经济管理学院', '外国语学院', '材料科学与工程学院', '地球科学与环境工程学院', '建筑学院', '物理科学与技术学院', '人文学院', '公共管理学院', '设计艺术学院', '生命科学与工程学院', '力学与航空航天学院', '数学学院', '马克思主义学院', '心理研究与咨询中心', '利兹学院', '茅以升学院', '智慧城市与交通学院', '少数民族预科', '体育学院', '图书馆', '医学院', '武装部、军事教研室', '附属中学', '工程训练中心', '国际合作与交流处（港澳台事务办公室）', '国际教育学院', '教务处（茅以升学院）']

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
                            name="userSex"
                            label="学生性别"
                            hasFeedback
                            rules={[{ required: true, message: '请输入需要添加用户的性别!' }]}
                        >
                            <Select placeholder="请选择一个性别">
                                {
                                    ['男','女'].map(e=>{
                                        const info = e
                                        return <Option value={info}>{info}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={"学生年级"}
                            name="userGrade"
                            rules={[{ required: true, message: '请输入需要添加用户的年级!' }, ({  }) => ({
                                validator(_, value) {
                                    if (!value||(value.toString().length === 4) ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('这个地方规定好了4位数字'));
                                },
                            }),]}
                        >
                            <Input type={"number"} />
                        </Form.Item>
                        <Form.Item
                            name="userCollege"
                            label="学生学院"
                            hasFeedback
                            rules={[{ required: true, message: '请输入需要添加用户的学院!' }]}
                        >
                            <Select placeholder="请选择一个学院">
                                {
                                    college.map(e=>{
                                        return <Option value={e}>{e}</Option>
                                    })
                                }
                            </Select>
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
                            name="userSex"
                            label="教师性别"
                            hasFeedback
                            rules={[{ required: true, message: '请输入需要添加用户的性别!' }]}
                        >
                            <Select placeholder="请选择一个性别">
                                {
                                    ['男','女'].map(e=>{
                                        const info = e
                                        return <Option value={info}>{info}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="教师职称"
                            name="userTitle"
                            hasFeedback
                            rules={[{ required: true, message: '请输入需要添加用户的职位!' }]}
                        >
                            <Select placeholder="请选择一个职位">
                                {
                                    ['教授','副教授','讲师'].map(e=>{
                                        const info = e
                                        return <Option value={info}>{info}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="userCollege"
                            label="教师学院"
                            hasFeedback
                            rules={[{ required: true, message: '请输入需要添加用户的学院!' }]}
                        >
                            <Select placeholder="请选择一个学院">
                                {
                                    college.map(e=>{
                                        return <Option value={e}>{e}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </>:<>
                        <Form.Item
                            name="userType"
                            label="管理员类型"
                            hasFeedback
                            rules={[{ required: true, message: '请输入需要添加用户的类型!' }]}
                        >
                            <Select placeholder="请选择一个类型">
                                {
                                    ['日常管理员','系统管理员'].map(e=>{
                                        return <Option value={e}>{e}</Option>
                                    })
                                }
                            </Select>
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
