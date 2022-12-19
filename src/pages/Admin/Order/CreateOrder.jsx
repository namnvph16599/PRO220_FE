import React from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import { createOrderAsync } from '../../../slices/order';
import { useDispatch } from 'react-redux';


const CreateOrder = (props) => {
  const handleClose = () => {
    props.onClose();
  };
  const dispatch = useDispatch();
  const onFinish = (data) => {
    const result = { ...data }
    dispatch(createOrderAsync(result));   
  }
  
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
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
        </Form.Item>
        <Form.Item
          label={<p className="text-base font-semibold">Địa chỉ</p>}
          name="addresses"
          rules={[
            {
              required: true,
              message: 'Quý khách vui lòng không để trống trường thông tin này.',
            },
          ]}
        >
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
        </Form.Item>
        <Form.Item
          label={<p className="text-base font-semibold">Số điện thoại</p>}
          name="phone"
          rules={[
            {
              required: true,
              message: 'Quý khách vui lòng không để trống trường thông tin này.',
            },
          ]}
        >
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
        </Form.Item>
        <Form.Item
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
        </Form.Item>
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
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
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
          label={<p className="text-base font-semibold">Loại hình dịch vụ</p>}
          name="serviceType"
          rules={[
            {
              required: true,
              message: 'Quý khách vui lòng không để trống trường thông tin này.',
            },
          ]}
        >
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
        </Form.Item>
        <Form.Item
          label={<p className="text-base font-semibold">Ngày</p>}
          name="date"
          rules={[
            {
              required: true,
              message: 'Quý khách vui lòng không để trống trường thông tin này.',
            },
          ]}
        >
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
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
          <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
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
  )
}

export default CreateOrder