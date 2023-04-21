import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { createApiService } from '../../../api/service';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        await createApiService(values)
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm service thành công!')
        navigate('/admin/quan-ly-dich-vu')
        return;
    };
    return (
        <Form form={form} name="dynamic_form_complex" onFinish={onFinish} style={{ maxWidth: 600 }} autoComplete="off">
            <Form.Item name="serviceName" label="Dịch vụ" rules={[{ required: true, message: 'phải nhập dịch vụ!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="icon" label="Icon" rules={[{ required: true, message: 'phải nhập icon!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateService;
