import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, message, Row, Menu, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderAsync } from '../../slices/order';
import _ from 'lodash';
import { getAllShowroomAsync } from '../../slices/showroom';
import { ORDER_STATUS } from '../../constants/order';
import { HOUR_DATE_TIME } from '../../constants/format';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { getUserOrder } from '../../api/order';
import { JwtDecode } from '../../utils/auth';

const Orders = () => {
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const user = JwtDecode();
    const [orderUser, setOrderUser] = useState([]);
    useEffect(() => {
        fetchOrderUser(user._id);
    }, []);

    const fetchOrderUser = async (id) => {
        try {
            const dataOrderUser = await getUserOrder(id);
            console.log(dataOrderUser);
            const handleOrderUser = dataOrderUser.data.map((order, index) => ({ key: index, ...order }));
            setOrderUser(handleOrderUser);
        } catch (error) {}
    };
    useEffect(() => {
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

    const handleUpdateOrders = (data) => {
        dispatch(
            updateOrderAsync({
                _id: data._id,
                data: _.pick(data, [
                    'name',
                    'address',
                    'number_phone',
                    'showroomId',
                    'serviceType',
                    'appointmentSchedule',
                    'description',
                    'price',
                    'subPrice',
                    'total',
                    'status',
                ]),
            }),
        );
    };
    const confirm = () => {
        message.info('Đơn hàng đã bị hủy');
    };
    const text = 'Bạn có muốn hủy đơn hàng không';
    const description = 'Delete the task';

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
            width: 100,
        },
        {
            title: 'Loại hình dịch vụ',
            dataIndex: 'serviceType',
            width: 150,
            render: (servviceType) => (servviceType ? 'Tại cửa hàng' : 'Tại nhà'),
        },
        {
            title: 'Thời gian đặt lịch',
            dataIndex: 'appointmentSchedule',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 100,
            render: (status, data) => ORDER_STATUS[status],
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            width: 150,
        },
        {
            title: '',
            width: 140,
            render: (data) => {
                return (
                    <Row>
                        <Link to={`${data._id}`}>
                            <Button type="primary">Chi tiết</Button>
                        </Link>
                        <Popconfirm
                            placement="top"
                            title={text}
                            description={description}
                            onConfirm={confirm}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="primary" danger>
                                Hủy
                            </Button>
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];

    const [current, setCurrent] = useState('tat-ca');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const items = [
        {
            label: 'Tất cả',
            key: 'tat-ca',
        },
        {
            label: 'Đã tiếp nhận lịch',
            key: 'Da-tiep-nhan-lich',
        },
        {
            label: 'Đang xử lý',
            key: 'dang-xu-ly',
        },
        {
            label: 'Xử lý xong',
            key: 'xu-ly-xong',
        },
        {
            label: 'Hoàn thành',
            key: 'hoan-thanh',
        },
        {
            label: 'Hủy',
            key: 'huy',
        },
    ];
    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Table
                columns={columns}
                dataSource={orderUser}
                scroll={{
                    x: 1300,
                }}
            />
        </div>
    );
};

export default Orders;
