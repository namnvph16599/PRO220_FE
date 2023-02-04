import { useEffect, useState } from 'react';
import { Steps } from 'antd';
import OrderProcessing from './StatusOrder/OrderProcessing';
import OrderCancel from './StatusOrder/OrderCancel';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../api/order';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
    const { id } = useParams();
    const [dataOrderDetail, setDataOrderDetail] = useState({
        status: '',
    });
    useEffect(() => {
        (async () => {
            const { data } = await getOrderById(id);
            setDataOrderDetail(data);
        })();
    }, [id]);
    return (
        <div>
            {dataOrderDetail.status === '' && <h1>Loading</h1>}
            {dataOrderDetail.status !== 0 && <OrderProcessing status={dataOrderDetail.status} />}
            {dataOrderDetail.status === 0 && <OrderCancel status={dataOrderDetail.status} />}
        </div>
    );
};

export default OrderDetail;
