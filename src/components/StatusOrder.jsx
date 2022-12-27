import { Button, Input, Modal, Steps } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';

const items = [
    {
        title: 'Chờ xác nhận',
        // subTitle: '00:00:05',
        status: 'process',
        // description: 'This is a description.',
    },
    {
        title: 'Đã tiếp nhận lịch',
        // subTitle: '00:01:02',
        status: 'process',
    },
    {
        title: 'Đang xử lý',
        // subTitle: 'waiting for longlong time',
        status: 'process',
    },
    {
        title: 'Thanh toán',
        // subTitle: 'waiting for longlong time',
        status: 'process',
    },
    {
        title: 'Hoàn thành',
        // subTitle: 'waiting for longlong time',
        status: 'finish',
    },
    {
        title: 'Hủy',
        // subTitle: 'waiting for longlong time',
        status: 'error',
        description: 'This is a description.',
    },
];

const StatusOrder = (props) => {
    const [prev, setPrev] = useState(props.status);
    const [current, setCurrent] = useState(props.status);
    const [textCancel, setTextCancel] = useState('');
    const [showModal, setShowModal] = useState(null);
    useEffect(() => {
        setCurrent(props.status);
        setPrev(props.status);
    }, [props.status]);

    const onChange = (value) => {
        setPrev(current);
        setCurrent(value);
    };

    const handleOkCancel = () => {
        setShowModal(null);
    };
    const handleCancel = () => {
        setShowModal(null);
    };

    const handleChangeStatus = () => {
        if (!current) {
            setShowModal('cancel');
        }
    };
    return (
        <div className="status-content py-4">
            <Steps
                type="navigation"
                current={current}
                onChange={onChange}
                className="site-navigation-steps"
                items={[
                    {
                        title: 'Hủy',
                        // subTitle: 'waiting for longlong time',
                        status: 'error',
                        description: 'This is a description.',
                    },
                    {
                        title: 'Chờ xác nhận',
                        // subTitle: '00:00:05',
                        status: 'process',
                        description: 'Check lại thông tin đơn hàng.',
                    },
                    {
                        title: 'Đã tiếp nhận lịch',
                        // subTitle: '00:01:02',
                        status: 'process',
                    },
                    {
                        title: 'Đang xử lý',
                        // subTitle: 'waiting for longlong time',
                        status: 'process',
                    },
                    {
                        title: 'Thanh toán',
                        // subTitle: 'waiting for longlong time',
                        status: 'process',
                    },
                    {
                        title: 'Hoàn thành',
                        // subTitle: 'waiting for longlong time',
                        status: 'finish',
                    },
                ]}
            />
            <div className="pt-4 flex justify-end">
                {props.status !== current && (
                    <button
                        onClick={handleChangeStatus}
                        type="button"
                        className="h-10 px-4 text-white bg-[#02b875] hover:bg-[#09915f] hover:!text-white font-medium rounded-lg text-base "
                    >
                        Chuyển trạng thái
                    </button>
                )}
            </div>
            {showModal === 'cancel' && (
                <Modal title="Hủy đơn hàng" open={showModal} onOk={handleOkCancel} onCancel={handleCancel}>
                    <p className="text-base font-semibold py-2">Nhập lý do</p>
                    <Input
                        type="text"
                        className="h-10 text-base border-[#02b875]"
                        onChange={(text) => setTextCancel(text)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default StatusOrder;
