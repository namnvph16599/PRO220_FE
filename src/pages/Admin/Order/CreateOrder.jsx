import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, DatePicker, Form, Input, notification, Row, Select } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { createOrderAsync } from '../../../slices/order';
import { searchAccountId } from '../../../api/order';
import { getAllAccountsAsync } from '../../../slices/user';
import { SEVICE_TYPE } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { getAllShowroomAsync } from '../../../slices/showroom';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

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

const CreateOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const user = useSelector((state) => state.user.currentUser.value);
    console.log(user);
    const [date, setDate] = useState(new Date());
    const [accountFilter, setAccountFilter] = useState([]);
    const [filterUser, setFilterUser] = useState('');
    const [filterShowroom, setFilterShowroom] = useState('');
    const [showroomsFilter, setShowroomsFilter] = useState([]);
    const searchTemp = useRef(null);
    useEffect(() => {
        //call api get showroom
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
        if (!_.isEmpty(showrooms)) {
            setShowroomsFilter(showrooms);
        }
    }, [showrooms]);
    useEffect(() => {
        //call api get account
        if (_.isEmpty(user)) {
            dispatch(getAllAccountsAsync());
        }
        if (!_.isEmpty(user)) {
            setAccountFilter(user);
        }
    }, [user]);
    const onFinish = (data) => {
        console.log(data);
        dispatch(
            createOrderAsync({
                ...data,
            }),
        )
            .then(() => {
                noti(NOTIFICATION_TYPE.SUCCESS, 'Thêm đơn hàng thành công!');
                navigate('/admin/don-hang');
            })
            .catch((error) => {
                noti(NOTIFICATION_TYPE.ERROR, 'Thêm đơn hàng thất bại!');
            }),
            navigate('/admin/don-hang');
    };
    // const handleSearch = (value) => {
    //     if (!value) {
    //         setAccountFilter(user);
    //         return;
    //     }
    //     if (searchTemp.current) {
    //         clearTimeout(searchTemp.current);
    //         searchTemp.current = null;
    //     }
    //     searchTemp.current = setTimeout(async () => {
    //         const { data } = await searchAccountId(value);
    //         setAccountFilter(user);
    //     }, 300);
    // };
    const handleChangeUser = (newValue) => {
        setFilterUser(newValue);
    };
    const handleChangeShowroom = (newValue) => {
        setFilterShowroom(newValue);
    };

    return (
        <div>
            <Form layout={'vertical'} name="nest-messages" onFinish={onFinish}>
                <Row className="pt-8 font-mono" gutter={[8, 16]} wrap>
                    <Col span={12}>
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
                        {/* <Form.Item
                    name="accountId"
                    label={<p className="text-base font-semibold">Tên khách hàng</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập account.',
                        },
                    ]}
                >
                    <Select
                        size="large"
                        value={filterUser}
                        placeholder="Tìm kiếm accountId theo tên khách hàng."
                        className="h-10 text-base border-[#02b875]"
                        optionLabelProp="label"
                        showSearch
                        // onSearch={handleSearch}
                        onChange={handleChangeUser}
                        filterOption={false}
                    >
                        {_.map(accountFilter, (account) => (
                            <Select.Option value={account._id} key={account._id} label={account.name}>
                                <div span={24}>
                                    <div span={24}>
                                        <span className="text-base font-medium text-[#02b875]">{account.name}</span>
                                    </div>
                                    <div span={24}>
                                        <span className="font-medium">{account._id}</span>
                                    </div>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item> */}
                        <Form.Item
                            name="showroomId"
                            label={<p className="text-base font-semibold">Showroom</p>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng showroom sửa chữa/bảo dưỡng.',
                                },
                            ]}
                        >
                            <Select
                                size="large"
                                value={filterShowroom}
                                placeholder="Tìm kiếm showroom theo tên, địa chỉ."
                                className="h-10 text-base border-[#02b875]"
                                optionLabelProp="label"
                                showSearch
                                // onSearch={handleSearch}
                                onChange={handleChangeShowroom}
                                filterOption={false}
                            >
                                {_.map(showroomsFilter, (showroom) => (
                                    <Select.Option
                                        value={showroom._id}
                                        key={showroom._id}
                                        label={showroom.name + ' - ' + showroom.address}
                                    >
                                        <div span={24}>
                                            <div span={24}>
                                                <span className="text-base font-medium text-[#02b875]">
                                                    {showroom.name}
                                                </span>
                                            </div>
                                            <div span={24}>
                                                <span className="font-medium">{showroom.address}</span>
                                            </div>
                                        </div>
                                    </Select.Option>
                                ))}
                            </Select>
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
                            <Input className="number_phone h-10 text-base border-[#02b875]" placeholder="Nhập mô tả" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<p className="text-base font-semibold">Phụ phí</p>}
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
                            <Select
                                size="large"
                                placeholder="Sửa chữa tại..."
                                className="h-10 text-base border-[#02b875]"
                            >
                                <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                                    Sửa chữa/ Bảo dưỡng tại cửa hàng.
                                </Select.Option>
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
                    </Col>
                </Row>
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
        </div>
    );
};

export default CreateOrder;
