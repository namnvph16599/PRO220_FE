import { Button, Form, Input, Select, Space, Spin } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';
import { getApiServiceById, updateApiService } from '../../../api/service';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateService = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        (async () => {
            const { data } = await getApiServiceById(id);
            setInitialValues(data);
        })();
    }, [id]);
    const onFinish = async (values) => {
        await updateApiService(id, values)
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Sửa service thành công!')
        navigate('/admin/quan-ly-dich-vu')
        return;
    };

    return (
        <div>
            {_.isEmpty(initialValues) ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <Form form={form} initialValues={initialValues} name="dynamic_form_complex" onFinish={onFinish} style={{ maxWidth: 600 }} autoComplete="off">
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
            )}
        </div>
    );
};

export default UpdateService;
