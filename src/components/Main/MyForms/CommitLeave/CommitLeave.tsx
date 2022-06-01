import {Button, Form, Input, Select} from 'antd';
import 'moment/locale/zh-cn';
import {useEffect, useState} from "react";
import {getUserInformation, myPost, tellError, tellSuccess} from "../../../../tools";

const { Option } = Select;

const CommitLeave:React.FC<{
    peopleType:string
}> = ({peopleType}) => {
    const onFinish = (values: any) => {
        const {userId} = getUserInformation()
        console.log('Success:', values);
        myPost('/commitLeave',{
            leaveTime:values.leaveTime+selectTime,
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
    const [courses,changeCourses] = useState<any>([])
    const [selectTime,changeSelectTime] = useState<any>("请先选择一门课程!")

    const onChange = (e:any) => {
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].key === e){
                console.log(courses[i])
                changeSelectTime(courses[i].courseTime)
                break
            }
        }
    }
    useEffect(()=>{
        const {userId} = getUserInformation()
        const api = peopleType === "student"?"/viewSelectedCourse":'/viewAllNeedTeach'
        myPost(api,{
            userId
        }).then(r=>{
            let out = r.data.map((e: { key: any; courseId: any; courseName: any;courseTime:any })=>{
                return {key:e.key,courseId:e.courseId,courseName:e.courseName,courseTime:e.courseTime}
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
                <Select
                    placeholder="选择要请假的周次"
                    optionFilterProp="children"
                    style={{width:"50%"}}
                >
                    {
                        new Array(18).fill(0).map((_:any,index:number)=>{
                            const info =`第${index+1}周`
                            return  <Option key={info}  value={info}>{info}</Option>
                        })
                    }
                </Select>
                <Input value={selectTime} style={{width:"50%"}} disabled></Input>
            </Form.Item>
            <Form.Item
                label="请假课程"
                name="leaveCourseId"
                hasFeedback
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
