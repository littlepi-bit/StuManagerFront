import {Form, Input, Button} from 'antd';
import 'moment/locale/zh-cn';
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../../tools";
const AddCourse = () => {
    const onFinish = (values: any) => {
        const {userId,password} = getUserInformation()
        values.userId =userId
        values.password = password
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
                label="课程编号"
                name="courseId"
                rules={[{ required: true, message: '请输入需要添加课程的课程编号!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="课程名称"
                name="courseName"
                rules={[{ required: true, message: '请输入需要添加课程的课程名称!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="课程时间"
                name="courseTime"
                rules={[{ required: true, message: '请输入需要添加课程的课程时间!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="课程学时"
                name="courseValue"
                rules={[{ required: true, message: '请输入需要添加课程的课程学时!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="开课学院"
                name="courseCollege"
                rules={[{ required: true, message: '请输入需要添加课程的开课学院!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="任课教师"
                name="teacher"
                rules={[{ required: true, message: '请输入需要添加课程的任课教师!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="上课地址"
                name="place"
                rules={[{ required: true, message: '请输入需要添加课程的上课地址!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="最大容量"
                name="maxCapacity"
                rules={[{ required: true, message: '请输入需要添加课程的最大容量!' }]}
            >
                <Input />
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
