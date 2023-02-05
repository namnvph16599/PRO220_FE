import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, message, Row, Menu, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getAllShowroomAsync } from '../../slices/showroom'
import { ORDER_STATUS } from '../../constants/order';
import { HOUR_DATE_TIME } from '../../constants/format';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getUserOrder , updateOrderUser} from '../../api/order';
import { JwtDecode } from '../../utils/auth';

const ListOrder = (props) => {
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const user = JwtDecode();
    const [orderUser, setOrderUser] = useState([]);
    useEffect(() => {
        fetchOrderUser(user._id);
    }, [props.status]);

    const fetchOrderUser = async (id) => {
        try {
            const dataOrderUser = await getUserOrder(id);
            const handleOrderUser = dataOrderUser.data.map((order, index) => ({ key: index, ...order }));
            if(props.status === ""){
                setOrderUser(handleOrderUser);
            }else{
                const filterData = handleOrderUser.filter((order)=>order.status == props.status)
                setOrderUser(filterData)
            }
         
        } catch (error) {}
    };

    useEffect(() => {
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

    
    const confirm = async (data) => {
        await updateOrderUser(data)
        message.info('Đơn hàng đã bị hủy');
        setTimeout(()=> fetchOrderUser(user._id),1000)

    };
    const text = 'Bạn có muốn hủy đơn hàng không';
    const description = 'Delete the task';

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
            width: 150,
        },
        {
            title: 'Thời gian',
            dataIndex: 'appointmentSchedule',
            width: 100,
            render: (date) => moment(date).format(HOUR_DATE_TIME),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 150,
            render: (status) => ORDER_STATUS[status],
        },
        {
            title: '',
            width: 200,
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
                            onConfirm={()=>confirm(data)}
                            okText="Có"
                            cancelText="Không"
                        >
                            {data.status == 1 && (
                                <Button  type="primary" danger>
                                    Hủy
                                </Button>
                            )}
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];

    
    return (
        <div>
            <Table
                columns={columns}
                dataSource={orderUser}
                // scroll={{
                //     x: 1300,
                // }}
            />
        </div>
    );
}

export default ListOrder