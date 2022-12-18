import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Switch, Table, Row, Button, Popconfirm, notification, Spin } from 'antd';
import { getOrdersAsync, removeOrderAsync, removeOrderByIdsAsync } from '../../../slices/order';
import CreateOrder from './CreateOrder';
import '../Banner/banner.css';
import { NOTIFICATION_TYPE } from '../../../constants/status';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const OrderManage = () => {
  const [open, setOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders.values);
    const loading = useSelector((state) => state.order.orders.loading)
    console.log('orders', orders);

    const data = orders.map((order) => ({ ...order, key: order._id }));
    console.log('data', data);

    useEffect(() => {
        dispatch(getOrdersAsync());
    }, []);

    const handleRemoveOrderByIds = (ids) => {
        dispatch(removeOrderByIdsAsync(ids)).then((res) => {
            const orderRemoved = _.get(res, 'payload.data.dataDeleted', null);
            if (orderRemoved) {
                noti(
                    NOTIFICATION_TYPE.SUCCESS,
                    'Xóa đơn hàng thành công!',
                    `Bạn đã xóa ${orderRemoved.name}  thành công!`,
                );
            } else {
                const ids = _.get(res, 'payload.data.ids', null);
                noti(
                    NOTIFICATION_TYPE.SUCCESS,
                    'Xóa đơn hàng thành công!',
                    `Bạn đã xóa ${ids.length} đơn hàng  thành công!`,
                );
            }
        });
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'addresses',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Sub Giá',
            dataIndex: 'subPrice',
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'eventId',
        },
        {
            title: 'Loại hình dịch vụ',
            dataIndex: 'serviceType',
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
        },{
            title: 'Tổng tiền',
            dataIndex: 'total',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (enabled, data) => (
                <Switch checked={enabled} onChange={(checked) => handleUpdateBanner({ ...data, enabled: checked })} />
            ),
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
                                handleRemoveOrderByIds([data._id]);
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
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>  
            ) : (
                <>
                    <div className="flex justify-between align-center pb-4">
                        <Button
                            size="large"
                            onClick={() => handleRemoveOrderByIds(selectedRowKeys)}
                            className="focus:outline-none text-base text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            disabled={_.isEmpty(selectedRowKeys) ? true : false}
                        >
                            Xóa {_.isEmpty(selectedRowKeys) ? '' : _.get(selectedRowKeys, 'length', '') + ' đơn hàng'}
                        </Button>
                        <Button
                            onClick={() => setOpen(true)}
                            className="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base "
                        >
                            <PlusOutlined className="pr-2 text-white " />
                            Thêm
                        </Button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </>
            )}
            {open && <CreateOrder open={open} onClose={() => setOpen(false)}/>}
        </div>
    );
};

export default OrderManage;