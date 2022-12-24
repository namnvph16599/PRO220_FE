import React, { useState } from 'react';
import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { createOrderAsync } from '../../../slices/order';
import { useDispatch } from 'react-redux';
import { SEVICE_TYPE } from '../../../constants/orther';
import { HOUR_DATE_TIME } from '../../../constants/format';

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

const CreateOrder = (props) => {
    const [date, setDate] = useState(new Date());
    const handleClose = () => {
        props.onClose();
    };
    const dispatch = useDispatch();
    const onFinish = (data) => {
        const result = { ...data };
        dispatch(createOrderAsync(result));
    };

    return (
        <Drawer title="Thêm đơn hàng" width="40%" placement="right" onClose={handleClose} open={props.open}>
            <Form layout={'vertical'} name="nest-messages" onFinish={onFinish}>
                <Form.Item
                    label={<p className="text-base font-semibold">Tên đơn hàng</p>}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả" />
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
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả" />
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
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả" />
                </Form.Item>
                {/* <Form.Item
          label={<p className="text-base font-semibold">Giá</p>}
          name="price"
          type="number"
          rules={[
            {
              required: true,
              message: 'Quý khách vui lòng không để trống trường thông tin này.',
            },
          ]}
        >
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
        </Form.Item> */}
                <Form.Item
                    label={<p className="text-base font-semibold">Giá phục vụ thêm</p>}
                    name="subPrice"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả" />
                </Form.Item>
                {/* <Form.Item
          label={<p className="text-base font-semibold">Tên sự kiện</p>}
          name="eventId"
          rules={[
            {
              required: true,
              message: 'Quý khách vui lòng không để trống trường thông tin này.',
            },
          ]}
        >
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
        </Form.Item> */}
                <Form.Item
                    name="serviceType"
                    label={<p className="text-base font-semibold">Loại hình dịch vụ</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn dịch vụ.',
                        },
                    ]}
                    initialValue={SEVICE_TYPE.SHOWROOM}
                >
                    <Select size="large" placeholder="Sửa chữa tại..." className="h-10 text-base border-[#02b875]">
                        <Select.Option value={SEVICE_TYPE.SHOWROOM}>Sửa chữa/ Bảo dưỡng tại cửa hàng.</Select.Option>
                        <Select.Option value={SEVICE_TYPE.HOUSE}>Sửa chữa/ Bảo dưỡng tại nhà.</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="appointmentSchedule"
                    label={<p className="text-base font-semibold">Thời gian tiếp nhận</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn thời gian!',
                        },
                    ]}
                >
                    <DatePicker
                        size="large"
                        className="w-full border-[#02b875]"
                        placeholder="Vui lòng chọn thời gian"
                        format={HOUR_DATE_TIME}
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                        showToday
                        value={date}
                        onChange={(date, dateString) => {
                            const dateStringConvert = new Date(dateString);
                            setDate(dateStringConvert);
                        }}
                        showTime
                    />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Mô tả</p>}
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="text-white bg-[#02b875] w-full mb-8 mt-8 h-10 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                    >
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default CreateOrder;
