import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Avatar, Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { DATE_FORMAT } from '../../constants/format';
import { search } from '../../api/showroom';
import './booking.css';
import { checkPhoneinSystem, createBannerByCustomer } from '../../api/order';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { getAllShowroomAsync } from '../../slices/showroom';
import { R_NUMBER_PHONE } from '../../constants/regex';
import { disabledDate, disabledDateBooking, disabledDateTime, setHourISODate } from '../../utils/date';
import ModalCustomize from '../../components/Customs/ModalCustomize';
import ShowformModal from './showformModal';
import ShowroomModal from './showroomModal';
import { useNavigate } from 'react-router-dom';
import HourPicker from '../../components/HourPicker';
import dayjs from 'dayjs';
import app from '../Register/fisebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ModalOtp } from '../Booking/modalOTP';
import { JwtDecode } from '../../utils/auth';
import ServiceType from './serviceType';

const auth = getAuth(app);

const onCaptchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
            size: 'invisible',
            callback: (response) => response,
        },
        auth,
    );
};

const formatErrorMessageSendOTP = (message) => {
    switch (message) {
        case 'reCAPTCHA has already been rendered in this element':
            return 'ReCapCha đã tồn tại! Vui lòng tải lại trang.';
        case 'Firebase: Error (auth/too-many-requests).':
        case 'Firebase: Exceeded quota. (auth/quota-exceeded).':
            return 'Nhận mã OTP xác thực quá nhiều!';
        case 'Firebase: Error (auth/invalid-verification-code).':
            return 'Mã OTP không hợp lệ vui lòng nhập lại!';
        case 'Firebase: Invalid format. (auth/invalid-phone-number).':
            return 'Số điện thoại không hợp lệ';
        case 'Firebase: Error (auth/code-expired).':
            return 'Hết thời gian xác thực OTP!';
        default:
            message;
    }
};

const BookingPage = () => {
    useDocumentTitle('Đặt lịch');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser.values);
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const isLogged = useSelector((state) => state.user.isLogged);
    const [loadingInital, setLoadingInital] = useState(true);
    const [creatingBooking, setCreatingBooking] = useState(false);
    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(dayjs().add(1, 'day'));
    const [hour, setHour] = useState('8:00');
    const [showroomsFilter, setShowroomsFilter] = useState([]);
    const [filter, setFilter] = useState('');
    const [initialValues, setInitialValues] = useState();
    const searchTemp = useRef(null);
    const [open, setOpenModal] = useState(false);
    const [address, setAddress] = useState('');
    const [serviceType, setServiceType] = useState([]);
    const [otp, setOtp] = useState('');
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [openOpt, setOpenOtp] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const jwt = JwtDecode();
    const [openMoadl, setOpentModal] = useState(false);
    const [numberPhone, setNumberPhone] = useState(0);
    const [openText, setOpenText] = useState(false);
    const [isServiceEmpty, setIsServiceEmpty] = useState(true);
    const verifyCode = () => {
        setLoadingVerify(true);
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                setOpenOtp(false);
                setOpenText(true);
            })
            .catch((error) => {
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra!', formatErrorMessageSendOTP(error.message));
                if (formatErrorMessageSendOTP(error.message) === 'Hết thời gian xác thực OTP!') {
                    setOtp('');
                }
            })
            .finally(() => {
                setLoadingVerify(false);
            });
    };

    const onSignInSubmit = (phoneNumber) => {
        onCaptchVerify();
        const phoneConvert = '+84' + phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneConvert, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setOpenOtp(true);
            })
            .catch((error) => {
                Notification(
                    NOTIFICATION_TYPE.ERROR,
                    'Đã có lỗi xảy ra! Vui lòng thử lại',
                    formatErrorMessageSendOTP(error.message),
                );
            });
    };

    useEffect(() => {
        //call api get showroom
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
        if (!_.isEmpty(showrooms)) {
            setShowroomsFilter(showrooms);
        }
    }, [showrooms]);

    const onFinish = (values) => {
        setCreatingBooking(true);
        if (_.isEmpty(serviceType)) setIsServiceEmpty(true);
        const myDate = setHourISODate(date, hour);
        createBannerByCustomer({
            ...values,
            appointmentSchedule: myDate,
            address,
            serviceType: serviceType?.serviceName,
            accountId: user._id ? user._id : initialValues.accountId,
            showroomId: filter._id || null,
        })
            .then(({ data }) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Bạn đã đặt lịch thành công!');
                if (isLogged) {
                    navigate(`/cai-dat/quan-ly-don-hang/${data._id}`);
                    return null;
                }
                navigate('/');
            })
            .catch((error) => {
                Notification(NOTIFICATION_TYPE.ERROR, error.message);
            })
            .finally(() => {
                setCreatingBooking(false);
            });
    };

    const handleSearch = (value) => {
        if (!value) {
            setShowroomsFilter(showrooms);
            return;
        }
        if (searchTemp.current) {
            clearTimeout(searchTemp.current);
            searchTemp.current = null;
        }
        searchTemp.current = setTimeout(async () => {
            const { data } = await search(value);
            setShowroomsFilter(data);
        }, 300);
    };

    const handleChange = (newValue) => {
        setFilter(newValue);
        setOpenModal(false);
    };

    const handlCheckedtext = () => {};

    const handlChecked = async () => {
        if (numberPhone !== 0) {
            const { data } = await checkPhoneinSystem({ number_phone: numberPhone });
            if (!data.isPhoneInSystem) {
                setOpentModal(false);
                onSignInSubmit(numberPhone);
            } else {
                setOpentModal(false);
                setInitialValues(_.omit(data, ['isPhoneInSystem']));
                setIsOpenForm(true);
            }
        }
    };

    const onCheckfinish = (value) => {
        if (value !== '') {
            const values = {
                number_phone: numberPhone,
                name: value,
            };
            setOpenText(false);
            setInitialValues(values);
            setIsOpenForm(true);
        }
    };

    const handlOk = async (value) => {
        setNumberPhone(value);
    };
    useEffect(() => {
        (() => {
            if (!jwt) {
                setLoadingInital(true);
                setOpentModal(true);
                window.scrollTo(0, 0);
            } else {
                setInitialValues(jwt);
                setIsOpenForm(true);
            }
        })();
    }, []);

    return (
        <div className="">
            {isOpenForm ? (
                <div className="w-full content-booking-form py-16">
                    <Form
                        className="bg-white px-6 max-w-screen-lg mx-auto rounded py-5"
                        name="booking-form"
                        layout={'vertical'}
                        initialValues={initialValues}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h1 className="text-center text-xl font-semibold text-[#1f2125] pt-8 ">ĐẶT LỊCH DỊCH VỤ</h1>
                        <Row className="pt-8 font-mono" gutter={[8, 16]} wrap>
                            <Col
                                xs={{
                                    span: 24,
                                }}
                                lg={{
                                    span: 12,
                                }}
                            >
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
                                                disabled
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Số điện thoại</p>}
                                            name="number_phone"
                                        >
                                            <Input className="h-10 text-base border-[#02b875]" disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Email</p>}
                                            name="email"
                                        >
                                            <Input
                                                type="email"
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="vidu@gmail.com"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
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
                                            name="serviceSelect"
                                            rules={[
                                                {
                                                    required: isServiceEmpty,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <ServiceType
                                                serviceSelect={serviceType}
                                                getService={setServiceType}
                                                handleEmpty={setIsServiceEmpty}
                                            />
                                        </Form.Item>
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
                            <Col
                                xs={{
                                    span: 24,
                                }}
                                lg={{
                                    span: 12,
                                }}
                            >
                                <Col span={24}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8">3</p>}
                                            style={{ backgroundColor: '#02b875' }}
                                        />
                                        <span className="text-base pl-4 font-medium">Địa điểm và Thời gian</span>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="showroomId"
                                            label={<p className="text-base font-semibold">Cửa hàng</p>}
                                            rules={[
                                                {
                                                    required: filter == '' ? true : false,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <>
                                                <div
                                                    className="!cursor-pointer flex items-center border rounded-md border-[#02b875]"
                                                    onClick={() => setOpenModal(true)}
                                                >
                                                    <Input
                                                        type="text"
                                                        value={filter == '' ? '' : filter.name + ' - ' + filter.address}
                                                        disabled={true}
                                                        placeholder="Chọn cửa hàng sửa chữa"
                                                        className="!cursor-pointer !bg-white py-2 relative !text-black text-base"
                                                    />
                                                    {filter == '' && (
                                                        <div className="right-3 absolute">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                className="bi bi-caret-right-fill"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <ModalCustomize
                                                    showModal={open}
                                                    footer={null}
                                                    setShowModal={() => setOpenModal(false)}
                                                >
                                                    <ShowroomModal setSelectShowroom={handleChange} />
                                                </ModalCustomize>
                                            </>
                                        </Form.Item>
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
                                </Col>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={creatingBooking}
                                loading={creatingBooking}
                                className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:!text-white hover:out
                 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                            >
                                Đặt lịch
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <>
                    <div className="w-full content-booking py-16">
                        {loadingInital && (
                            <>
                                {!openText && (
                                    <ModalCustomize
                                        showModal={openMoadl}
                                        footer={true}
                                        setShowModal={() => {
                                            setOpentModal(false);
                                            navigate('/');
                                        }}
                                        onSubmit={handlChecked}
                                    >
                                        <ShowformModal
                                            onValue={(item) => handlOk(item)}
                                            title={'Nhập số điện thoại'}
                                            status={'phone'}
                                        />
                                    </ModalCustomize>
                                )}
                                <ModalCustomize
                                    showModal={openText}
                                    footer={true}
                                    setShowModal={() => setOpenText(false)}
                                    onSubmit={handlCheckedtext}
                                >
                                    <ShowformModal
                                        onValue={(item) => onCheckfinish(item)}
                                        title={'Nhập tên của bạn'}
                                        status={'text'}
                                    />
                                </ModalCustomize>
                            </>
                        )}
                        <ModalCustomize showModal={openOpt} footer={null} setShowModal={() => setOpenOtp(false)}>
                            <ModalOtp otp={otp} setOtp={setOtp} verifyCode={verifyCode} loadingVerify={loadingVerify} />
                        </ModalCustomize>
                        <div id="sign-in-button"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookingPage;
