import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import _ from 'lodash';
import dayjs from 'dayjs';
import { DATE_FORMAT, HOUR_DATE_TIME } from '../../../constants/format';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { R_EMAIL, R_NUMBER, R_NUMBER_PHONE } from '../../../constants/regex';
import { checkPhoneinSystem, createOrder } from '../../../api/order';
import { disabledDate, disabledDateTime, setHourISODate } from '../../../utils/date';
import { Notification } from '../../../utils/notifications';
import { getApiService } from '../../../api/service';
import SpinCustomize from '../../../components/Customs/Spin';
import HourPicker from '../../../components/HourPicker';

const CreateOrder = () => {
    const navigate = useNavigate();
    const { showroomId } = useSelector((state) => state.user.currentUser.values);
    const [date, setDate] = useState(dayjs().add(1, 'day'));
    const [hour, setHour] = useState('8:00');
    const [loading, setLoading] = useState(false);
    const [isShowroom, setIsShowroom] = useState(true);
    const [initialValues, setInitialValues] = useState({});
    const [service_type, setService_type] = useState([]);
    const [services, setServices] = useState([]);
    const serviceSelect = useRef('');
    const [isPhone, setIsPhone] = useState(false);
    const [isValidatePhone, setIsValidatePhone] = useState(false);
    const [isTyping, setIsisTyping] = useState(false);
    const [disable, setDisable] = useState(false);
    const [numberPhone, setNumberPhone] = useState();

    const handleService = (data_id) => {
        const dataFind = services.find((service) => service._id == data_id);
        serviceSelect.current = dataFind.serviceName;
    };

    const fetchService = async () => {
        const dataService = await getApiService();
        setServices(dataService?.data);
    };

    const onFinish = (data) => {
        setLoading(true);
        const appointmentSchedule = setHourISODate(date, hour);

        createOrder({
            ...data,
            appointmentSchedule,
            isCustomer: false,
            seen: true,
            serviceType: serviceSelect.current,
            showroomId,
            status: 2,
        })
            .then(() => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm đơn hàng thành công!');
                navigate('/admin/don-hang');
            })
            .catch((error) => {
                Notification(NOTIFICATION_TYPE.ERROR, 'Thêm đơn hàng thất bại!', error.message || '');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChangeSelect = (value) => {
        setService_type(value);
    };

    useEffect(() => {
        fetchService();
    }, []);

    const validatePhone = (phone) => {
        setNumberPhone(phone);
        if (phone.match(R_NUMBER_PHONE)) {
            setIsValidatePhone(true);
        } else {
            setIsValidatePhone(false);
            setIsisTyping(true);
        }
    };

    const fetchIsPhone = async (phoneNumber) => {
        setLoading(true);
        const { data } = await checkPhoneinSystem({ number_phone: phoneNumber });
        setLoading(false);
        setIsPhone(true);
        if (data.isPhoneInSystem) {
            setDisable(true);
            setInitialValues({
                name: data.name,
                number_phone: data.number_phone,
                email: data.email,
            });
        } else {
            setInitialValues({
                number_phone: phoneNumber,
            });
        }
    };

    return (
        <div>
            {isPhone || (
                <>
                    <div>
                        <Input
                            placeholder="Nhập vào số điện thoại của khách hàng"
                            className="w-[50%]"
                            onChange={(e) => validatePhone(e.target.value)}
                            onPressEnter={(e) => fetchIsPhone(e.target.value)}
                        />
                        <Button type="primary" className="ml-2 btn-primary" onClick={() => fetchIsPhone(numberPhone)}>
                            Tiếp tục
                        </Button>
                    </div>
                    {isTyping && (
                        <>
                            {isValidatePhone || (
                                <span className="py-2 text-red-600">Lỗi không đúng định dạng số điện thoại</span>
                            )}
                        </>
                    )}
                </>
            )}

            {isPhone && (
                <Form
                    layout={'vertical'}
                    name="nest-messages"
                    onFinish={onFinish}
                    disabled={!showroomId}
                    initialValues={initialValues}
                >
                    <Row className="pt-8 font-mono" gutter={[8, 16]} wrap>
                        <Col span={12}>
                            <Col span={24}>
                                <Col span={24} className="pb-6">
                                    <Avatar
                                        size={34}
                                        icon={<p className="text-base font-semibold leading-8">1</p>}
                                        style={{ backgroundColor: '#02b875' }}
                                    />
                                    <span className="text-base pl-4 font-medium">Thông tin khách hàng</span>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label={<p className="text-base font-semibold">Họ tên</p>}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="h-10 text-base border-[#02b875]"
                                            placeholder="Nguyen Van A"
                                            disabled={disable}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label={<p className="text-base font-semibold">Số điện thoại</p>}
                                        name="number_phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                            {
                                                pattern: R_NUMBER_PHONE,
                                                message: 'Số điện thoại không đúng định dạng.',
                                            },
                                        ]}
                                    >
                                        <Input className="h-10 text-base border-[#02b875]" disabled={disable} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label={<p className="text-base font-semibold">Email</p>}
                                        name="email"
                                        rules={[
                                            {
                                                pattern: R_EMAIL,
                                                message: 'Email không đúng định dạng.',
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="email"
                                            className="h-10 text-base border-[#02b875]"
                                            placeholder="vidu@gmail.com"
                                            disabled={disable}
                                        />
                                    </Form.Item>
                                </Col>
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={24}>
                                <Col span={24} className="pb-6">
                                    <Avatar
                                        size={34}
                                        icon={<p className="text-base font-semibold leading-8">2</p>}
                                        style={{ backgroundColor: '#02b875' }}
                                    />
                                    <span className="text-base pl-4 font-medium">Dịch vụ</span>
                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name="serviceType"
                                        label={<p className="text-base font-semibold">Dịch vụ sửa chữa</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                        ]}
                                    >
                                        <Select
                                            size="large"
                                            placeholder="Dịch vụ sửa chữa..."
                                            className="h-10 text-base border-[#02b875]"
                                            onSelect={(value) => handleService(value)}
                                        >
                                            {services.map((service) => (
                                                <Select.Option key={service._id} value={service._id}>
                                                    {service.serviceName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {isShowroom ? null : (
                                        <>
                                            <Form.Item
                                                label={<p className="text-base font-semibold">Địa chỉ cụ thể</p>}
                                                name="address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Quý khách vui lòng không để trống trường thông tin này.',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea
                                                    className="text-base border-[#02b875]"
                                                    rows={2}
                                                    placeholder=""
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={<p className="text-base font-semibold">Vấn đề cụ thể</p>}
                                                name="service_type"
                                                rules={[
                                                    {
                                                        required: service_type.length == 0 ? true : false,
                                                        message:
                                                            'Quý khách vui lòng không để trống trường thông tin này.',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    value={service_type}
                                                    size="large"
                                                    style={{ width: '100%' }}
                                                    placeholder="chọn vấn đề bạn gặp phải"
                                                    onChange={handleChangeSelect}
                                                    options={[
                                                        { value: 'thay_xam', label: 'Thay xăm' },
                                                        { value: 'thay_binh', label: 'Thay bình điện' },
                                                        { value: 'thay_lốp', label: 'Thay lốp' },
                                                    ]}
                                                    optionLabelProp="label"
                                                />
                                            </Form.Item>
                                        </>
                                    )}
                                </Col>
                                {!isShowroom ? null : (
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={
                                                    <p className="text-base font-semibold">
                                                        <span className="text-[#ff4d4f] text-base">* </span>Ngày
                                                    </p>
                                                }
                                            >
                                                <DatePicker
                                                    size="large"
                                                    defaultValue={date}
                                                    format={DATE_FORMAT}
                                                    mode="date"
                                                    disabledDate={(current) => disabledDateBooking(current)}
                                                    className="w-full border-[#02b875]"
                                                    placeholder="Ngày"
                                                    showToday
                                                    onChange={(dateValue, dateString) => setDate(dateValue)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={
                                                    <p className="text-base font-semibold">
                                                        <span className="text-[#ff4d4f] text-base">* </span>Giờ
                                                    </p>
                                                }
                                            >
                                                <HourPicker
                                                    datePicker={date}
                                                    onChange={(value) => setHour(value)}
                                                    format={'HH'}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}

                                <Col span={24}>
                                    <Form.Item
                                        name="description"
                                        label={<p className="text-base font-semibold">Ghi chú</p>}
                                    >
                                        <Input.TextArea
                                            className="text-base border-[#02b875]"
                                            rows={4}
                                            placeholder="Cụ thể yêu cầu với Dodoris"
                                        />
                                    </Form.Item>
                                </Col>
                            </Col>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button
                            htmlType="submit"
                            disabled={loading}
                            loading={loading}
                            className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                        >
                            Thêm đơn hàng
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default CreateOrder;
