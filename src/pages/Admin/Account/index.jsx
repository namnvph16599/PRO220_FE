import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Row, Space, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { useEffect } from 'react';
import { getAccounts, removeAccount } from '../../../api/account';
import { getAllShowroomAsync } from '../../../slices/showroom';
import CreateAccount from './CreateAccount';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';

const AccountManager = () => {
    useDocumentTitle('Quản lý thành viên');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleRefetch = async () => {
        setOpen(false);
        await getAllAccount();
    };

    const handleRemoveAccount = async (id) => {
        removeAccount(id)
            .then(async (res) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Xóa thành công!');
                await getAllAccount();
            })
            .catch((err) => {
                Notification(NOTIFICATION_TYPE.ERROR, err.message);
                console.log('remove-account', err);
            });
    };

    const getAllAccount = () => {
        getAccounts()
            .then(({ data: res }) => {
                const newData = res.map((item, index) => {
                    return {
                        key: item._id,
                        ...item,
                    };
                });
                setData(newData);

                console.log(55555, res);
            })
            .catch((err) => {
                console.log(8888, err);
            });
    };

    useEffect(() => {
        (() => getAllAccount())();
    }, []);

    useEffect(() => {
        if (showrooms.length === 0) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (name, data) => {
                return (
                    <Space>
                        <Avatar src={<img src={data.image} alt="avatar" />} />
                        <div>
                            <p className="font-semibold">{name}</p>
                        </div>
                    </Space>
                );
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'redirectTo',
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'showroomId',
            render: (showroomId) => {
                const showroom = showrooms.find((showroom) => showroom._id === showroomId);
                if (!showroom) return '';
                return showroom.name;
            },
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Row>
                        <Link to={data._id}>
                            <EditOutlined className="text-xl pr-4" />
                        </Link>
                        <Popconfirm
                            title={`Bạn chắc chắn muốn xóa ${data.name} không?`}
                            onConfirm={() => {
                                handleRemoveAccount([data._id]);
                            }}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined className="text-xl" />
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];

    return (
        <div className="banner-content">
            <div className="flex justify-between align-center pb-4">
                <div>
                    {/* <button className="pr-6" onClick={() => handleFilter()}>
                                <Tooltip title="Làm mới đơn hàng">
                                    <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                                </Tooltip>
                            </button>
                            <Filter
                                items={[
                                    {
                                        label: <Space align="center">Mã đơn hàng</Space>,
                                        key: '_id',
                                        name: 'Mã đơn hàng',
                                    },
                                    {
                                        label: <Space align="center">Trạng thái</Space>,
                                        key: 'status',
                                        type: 'select',
                                        mode: 'multiple',
                                        values: [
                                            {
                                                label: 'Hủy',
                                                value: 0,
                                            },
                                            {
                                                label: 'Chờ xác nhận',
                                                value: 1,
                                            },
                                            {
                                                label: 'Đã xác nhận',
                                                value: 2,
                                            },
                                            {
                                                label: 'Đang xử lý',
                                                value: 3,
                                            },
                                            {
                                                label: 'Thanh toán',
                                                value: 4,
                                            },
                                            {
                                                label: 'Hoàn thành',
                                                value: 5,
                                            },
                                        ],
                                        name: 'Trạng thái',
                                    },
                                    {
                                        label: <Space align="center">Tên khách hàng</Space>,
                                        key: 'name',
                                        type: 'string',
                                    },
                                    {
                                        label: <Space align="center">Số điện thoại</Space>,
                                        key: 'number_phone',
                                        name: 'Số điện thoại',
                                    },
                                    {
                                        label: <Space align="center">Biển kiểm soát</Space>,
                                        key: 'licensePlates',
                                        name: 'Biển kiểm soát',
                                    },
                                    {
                                        label: <Space align="center">Ngày tạo</Space>,
                                        key: 'createdAt',
                                        type: 'date',
                                        name: 'Ngày tạo',
                                    },
                                    {
                                        label: <Space align="center">Thời gian sửa chữa</Space>,
                                        key: 'appointmentSchedule',
                                        type: 'date',
                                        name: 'Thời gian sửa chữa',
                                    },
                                ]}
                                onFilter={handleFilter}
                            /> */}
                </div>
                <Button onClick={() => setOpen(true)} className="btn-primary text-white" type="primary">
                    Thêm thành viên
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
            {open && <CreateAccount open={open} onClose={setOpen} onRefetch={handleRefetch} />}
        </div>
    );
};

export default AccountManager;
