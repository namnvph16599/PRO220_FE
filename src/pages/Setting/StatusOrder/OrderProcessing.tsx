import React from 'react'
import { Steps } from 'antd';
const OrderProcessing = ({status}) => {
  return (
    <div>
        <Steps
                current={status}
                percent={60}
                items={[
                    {
                        title: 'Chờ xác nhận',
                    },
                    {
                        title: 'Đã tiếp nhận lịch',
                    },
                    {
                        title: 'Đăng xử ý',
                    },
                    {
                        title: 'Xử ký xong',
                    },
                    {
                        title: 'Thanh toán',
                    },
                    {
                        title: 'Hoàn thành',
                    },
                ]}
            />
    </div>
  )
}

export default OrderProcessing