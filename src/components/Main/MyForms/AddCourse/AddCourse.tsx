import {Button, Form, Input, InputNumber, Select} from 'antd';
import 'moment/locale/zh-cn';
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../../tools";
import {useEffect, useState} from "react";

const { Option } = Select;
const AddCourse = () => {
    const onFinish = (values: any) => {
        const {userId,password} = getUserInformation()
        values.userId =userId
        values.password = password
        let {week,sectionNumber} = values.courseTime
        values.courseTime = `${week}${sectionNumber}`
        let {pre,back} = values.place
        values.place = `${pre}${back}`
        console.log(values)
        myPost('/addCourse',values).then(r=>{
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

    const week = [
        "一",
        "二",
        "三",
        "四",
        "五",
    ]

    const college = ['土木工程学院', '机械工程学院', '电气工程学院', '信息科学与技术学院', '交通运输与物流学院', '计算机与人工智能学院', '经济管理学院', '外国语学院', '材料科学与工程学院', '地球科学与环境工程学院', '建筑学院', '物理科学与技术学院', '人文学院', '公共管理学院', '设计艺术学院', '生命科学与工程学院', '力学与航空航天学院', '数学学院', '马克思主义学院', '心理研究与咨询中心', '利兹学院', '茅以升学院', '智慧城市与交通学院', '少数民族预科', '体育学院', '图书馆', '医学院', '武装部、军事教研室', '附属中学', '工程训练中心', '国际合作与交流处（港澳台事务办公室）', '国际教育学院', '教务处（茅以升学院）']
    const pre = [
        '犀浦',
        '九里',
        '峨眉'
    ]
    const [teachers,setTeachers] = useState([])
    useEffect(
        ()=>{
            const {userId} = getUserInformation()
            myPost('/getTeachers',{
                userId
            }).then(r=>{
                setTeachers(r.data)
            })
        }
        ,[]
    )
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/*<Form.Item*/}
            {/*    label="课程编号"*/}
            {/*    name="courseId"*/}
            {/*    rules={[{ required: true, message: '请输入需要添加课程的课程编号!' }]}*/}
            {/*>*/}
            {/*    <Input/>*/}
            {/*</Form.Item>*/}
            <Form.Item
                label="课程名称"
                name="courseName"
                rules={[{ required: true, message: '请输入需要添加课程的课程名称!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label="课程时间">
                <Input.Group compact>
                    <Form.Item
                        name={['courseTime', 'week']}
                        noStyle
                        rules={[{ required: true, message: '请输入周数' }]}
                    >
                        <Select placeholder="选择周数">
                            {
                                new Array(5).fill(0).map((e,index)=>{
                                    return  <Option value={"周"+week[index]}>周{week[index]}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['courseTime', 'sectionNumber']}
                        noStyle
                        rules={[{ required: true, message: '请输入节数' }]}
                    >
                        <Select placeholder="选择第几讲">
                            {
                                new Array(13).fill(0).map((e,index)=>{
                                    return  <Option value={`第${index+1}讲`}>第{index+1}讲</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Input.Group>
            </Form.Item>



            <Form.Item label=" 课程学时"
            >
                <Form.Item name="courseValue" noStyle
                           rules={[{ required: true, message: '请输入需要添加课程的课程学时!' }]}
                >
                    <InputNumber min={1} max={10} />
                </Form.Item>
                <span className="ant-form-text"> 个学时</span>
            </Form.Item>


            <Form.Item
                name="courseCollege"
                label="开课学院"
                hasFeedback
                rules={[{ required: true, message: '请输入需要添加课程的开课学院!' }]}
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
                name="teacher"
                label="任课教师"
                hasFeedback
                rules={[{ required: true, message: '请输入需要添加课程的任课教师!' }]}
            >
                <Select placeholder="请选择一个教师">
                    {
                        teachers.map(e=>{
                            let {userId,userName}  = e
                            const info = `${userName}(${userId})`
                            return <Option value={info}>{info}</Option>
                        })
                    }
                </Select>
            </Form.Item>



            <Form.Item  label="上课地址">
                <Input.Group compact>
                    <Form.Item
                        name={['place', 'pre']}
                        noStyle
                        rules={[{ required: true, message: '请输入校区' }]}
                    >
                        <Select placeholder="选择校区">
                            {
                                pre.map((e)=>{
                                    return  <Option value={e}>{e}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['place', 'back']}
                        rules={[{ required: true, message: '请输入教室' }, ({  }) => ({
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
                </Input.Group>
            </Form.Item>

            <Form.Item label=" 最大容量"
            >
                <Form.Item name="maxCapacity" noStyle
                           rules={[{ required: true, message: '请输入需要添加课程的最大容量!' }]}
                >
                    <InputNumber min={1} max={200} />
                </Form.Item>
                <span className="ant-form-text">人</span>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    添加该课程
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddCourse;
