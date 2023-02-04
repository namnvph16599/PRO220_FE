import { Steps } from 'antd'
import React from 'react'

const OrderCancel = ({status}) => {
  console.log(status);
  
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
                        title: 'Đã Hủy',
                    }
                ]}
            />
    </div>
  )
}

export default OrderCancel