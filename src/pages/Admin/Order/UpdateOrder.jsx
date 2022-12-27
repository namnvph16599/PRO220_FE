import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { OrderSlice, updateOrderAsync } from '../../../slices/order';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../../api/order';
import _ from 'lodash';
import dayjs from 'dayjs';
import SpinCustomize from '../../../components/Customs/Spin';
import { SEVICE_TYPE } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import StatusOrder from '../../../components/StatusOrder';
import './order.css';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

const disabledDate = (current) => {
    return current && current < dayjs().endOf('day').subtract(1, 'days');
};

const disabledDateTime = () => ({
    disabledHours: () => [...range(0, 7), ...range(12, 13), ...range(18, 24)],
    disabledMinutes: () => range(0),
    disabledSeconds: () => range(0, 60),
});

const UpdateOrder = () => {
    useDocumentTitle('Cập nhật đơn hàng');
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [order, setOrder] = useState({});
    const [date, setDate] = useState(dayjs().format(HOUR_DATE_TIME));
    const [initialValues, setInitialValues] = useState({});
    console.log(111, date);

    useEffect(() => {
        (async () => {
            const { data } = await getOrderById(id);
            setOrder(data);
            console.log('data', data);
            const { appointmentSchedule, ...dataOther } = data;
            console.log('appointmentSchedule', appointmentSchedule);
            setInitialValues({ ...dataOther, appointmentSchedule: dayjs(appointmentSchedule).format(HOUR_DATE_TIME) });
            setDate(dayjs(appointmentSchedule).format(HOUR_DATE_TIME));
        })();
    }, [id]);
    const onFinish = (data) => {
        console.log('data', data);
        // dispatch(
        //     updateOrderAsync({
        //         _id: order._id,
        //         data,
        //     }),
        // );
        // navigate('/admin/don-hang');
    };

    return (
        <div>
            {_.isEmpty(order) ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Form layout={'vertical'} initialValues={initialValues} name="nest-messages" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<p className="text-base font-semibold">Tên khách hàng</p>}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                    },
                                ]}
                            >
                                <Input className="h-10 text-base border-[#02b875]" />
                            </Form.Item>
                            <Form.Item
                                label={<p className="text-base font-semibold">Địa chỉ</p>}
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                    },
                                ]}
                            >
                                <Input className="h-10 text-base border-[#02b875]" />
                            </Form.Item>
                            <Form.Item
                                label={<p className="text-base font-semibold">Số điện thoại</p>}
                                name="number_phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                    },
                                ]}
                            >
                                <Input className="h-10 text-base border-[#02b875]" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="serviceType"
                                label={<p className="text-base font-semibold">Sửa chữa tại</p>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn.',
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Sửa chữa tại..."
                                    className="h-10 text-base border-[#02b875]"
                                >
                                    <Select.Option value={SEVICE_TYPE.SHOWROOM}>Tại cửa hàng.</Select.Option>
                                    <Select.Option value={SEVICE_TYPE.HOUSE}>Tại nhà.</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="aaa"
                                label={<p className="text-base font-semibold">Thời gian</p>}
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Vui lòng chọn thời gian!',
                                //     },
                                // ]}
                            >
                                <DatePicker
                                    size="large"
                                    className="w-full border-[#02b875]"
                                    placeholder="Vui lòng chọn thời gian"
                                    format={HOUR_DATE_TIME}
                                    value={date}
                                    disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    showToday
                                    showTime
                                />
                            </Form.Item>
                            <Form.Item label={<p className="text-base font-semibold">Phụ phí</p>} name="subPrice">
                                <Input className="h-10 text-base border-[#02b875]" type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="status" label={<p className="text-base font-semibold">Trạng thái</p>}>
                        <StatusOrder status={order.status} />
                    </Form.Item>
                    <Form.Item name="materialIds" label={<p className="text-base font-semibold">Vật tư sử dụng</p>}>
                        <Select
                            size="large"
                            placeholder="Chọn vật tư sử dụng..."
                            className="h-10 text-base border-[#02b875]"
                        >
                            <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                                Sửa chữa/ Bảo dưỡng tại cửa hàng.11111111
                            </Select.Option>
                            <Select.Option value={SEVICE_TYPE.HOUSE}>2222</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={<p className="text-base font-semibold">Mô tả</p>} name="description">
                        <Input.TextArea className="text-base border-[#02b875]" rows={2} placeholder="" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="text-white bg-[#02b875] w-full mb-8 mt-8 h-10 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default UpdateOrder;
