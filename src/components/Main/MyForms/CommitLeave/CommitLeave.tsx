import {Button, DatePicker, Form, Input, Select} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {useEffect, useState} from "react";
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../../tools";

const { Option } = Select;

const CommitLeave = () => {
    const onFinish = (values: any) => {
        const {userId} = getUserInformation()
        console.log('Success:', values);
        myPost('/commitLeave',{
            leaveTime:values.leaveTime.format('YYYY-MM-DD'),
            leaveCourseId:values.leaveCourseId,
            leaveReason:values.leaveReason,
            userId
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
    const [courses,changeCourses] = useState([])
    useEffect(()=>{
        const {userId} = getUserInformation()
        myPost('/viewSelectedCourse',{
            userId
        }).then(r=>{
            let out = r.data.map((e: { key: any; courseId: any; courseName: any; })=>{
                return {key:e.key,courseId:e.courseId,courseName:e.courseName}
            })
            changeCourses(out)
        })

    },[])

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
                label="请假时间"
                name="leaveTime"
                rules={[{ required: true, message: '请输入您的请假范围!' }]}
            >
                <DatePicker locale={locale} />
            </Form.Item>
            <Form.Item
                label="请假课程"
                name="leaveCourseId"
                rules={[{ required: true, message: '请选择您的请假课程!' }]}
            >
                <Select
                    placeholder="选择要请假的课程"
                    optionFilterProp="children"
                    onChange={onChange}

                >
                    {courses.map((e:{courseId:string,key:string,courseName:string})=>{
                        return  <Option key={e.key} value={e.courseId}>{e.courseName}</Option>
                    })}
                </Select>
            </Form.Item>

            <Form.Item
                label="请假理由"
                name="leaveReason"
                rules={[{ required: true, message: '请输入您的请假理由!' }]}
            >
                <Input.TextArea />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CommitLeave;
