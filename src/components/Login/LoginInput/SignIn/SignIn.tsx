import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import {PeopleType} from "../../../Main/mainConfig";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => boolean;
    onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({visible, onCreate, onCancel,}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="注册一个新的账号"
            okText="注册!"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        if ( onCreate(values)){ form.resetFields();}
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
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
            </Form>
        </Modal>
    );
};


export default CollectionCreateForm;
