import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { OrderSlice, updateOrderAsync } from '../../../slices/order';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../../api/order';
import _ from 'lodash';
import SpinCustomize from '../../../components/Customs/Spin';
import { ORDER_STATUS, SEVICE_TYPE, VEHICLE_TYPE } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import StatusOrder from './StatusOrder';
import './order.css';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { disabledDate, disabledDateTime } from '../../../utils/date';

const UpdateOrder = () => {
    useDocumentTitle('Cập nhật đơn hàng');
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [order, setOrder] = useState({});
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await getOrderById(id);
            setOrder(data);
        })();
    }, [id]);
    useEffect(() => {
        if (!_.isEmpty(order)) {
            const { appointmentSchedule, ...orderOther } = order;
            setInitialValues({ ...orderOther, appointmentSchedule: dayjs(appointmentSchedule) });
        }
    }, [order]);
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
            {_.isEmpty(initialValues) ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Form
                    layout={'vertical'}
                    initialValues={initialValues}
                    name="nest-messages"
                    onFinish={onFinish}
                    disabled={order.status > 2}
                >
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
                                label={<p className="text-base font-semibold">Địa chỉ sửa chữa </p>}
                                name="address"
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
                                label={<p className="text-base font-semibold">Biển kiểm soát</p>}
                                name="licensePlates"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                    },
                                ]}
                            >
                                <Input className="h-10 text-base border-[#02b875]" />
                            </Form.Item>
                            <Form.Item name="vehicleType" label={<p className="text-base font-semibold">Loại xe</p>}>
                                <Select size="large" className="h-10 text-base border-[#02b875]">
                                    {VEHICLE_TYPE.map((item) => (
                                        <Select.Option key={item.value} value={item.value} label={item.label}>
                                            {item.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label={<p className="text-base font-semibold">Số km xe đã chạy</p>} name="km">
                                <Input className="h-10 text-base border-[#02b875]" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="status"
                        label={
                            <p className="text-base font-semibold">
                                Trạng thái :{' '}
                                <span className="text-lg text-[#02b875] font-semibold">
                                    {ORDER_STATUS[order.status]}
                                </span>
                            </p>
                        }
                    >
                        <StatusOrder
                            // status={2}
                            status={order.status}
                            // description={'haloooo'}
                        />
                    </Form.Item>
                    <Row gutter={16}>
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
                                name="appointmentSchedule"
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
                                    disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    showToday
                                    showTime
                                />
                            </Form.Item>
                            <Form.Item label={<p className="text-base font-semibold">Mô tả</p>} name="description">
                                <Input.TextArea className="text-base border-[#02b875]" rows={2} placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="materialIds"
                                label={<p className="text-base font-semibold">Vật tư sử dụng</p>}
                            >
                                <Select
                                    size="large"
                                    placeholder="Chọn vật tư sử dụng..."
                                    className="h-10 text-base border-[#02b875]"
                                    mode="multiple"
                                    disabled
                                >
                                    <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                                        Sửa chữa/ Bảo dưỡng tại cửa hàng.11111111
                                    </Select.Option>
                                    <Select.Option value={SEVICE_TYPE.HOUSE}>2222</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label={<p className="text-base font-semibold">Phụ phí</p>} name="subPrice">
                                <Input className="h-10 text-base border-[#02b875]" type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button
                            htmlType="submit"
                            // disabled={creatingBooking}
                            // loading={creatingBooking}
                            className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
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
