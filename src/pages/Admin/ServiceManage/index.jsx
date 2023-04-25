import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { getApiService, getApiSubService, removeApiServiceById } from '../../../api/service';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate } from 'react-router-dom';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../../../constants/permission';
import PermissionCheck from '../../../components/permission/PermissionCheck';

const ServiceManager = () => {
    useDocumentTitle('Quản lý dịch vụ');
    const navigate = useNavigate();
    const [service, setService] = useState([]);

    useEffect(() => {
        (async () => {
            const serviceData = await getApiService();
            setService(serviceData.data);
        })();
    }, []);

    const Remove = (i) => {
        removeApiServiceById(i.key);
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Xóa service thành công!');
        window.location.href = '/admin/quan-ly-dich-vu';
    };
    const columns = [
        { title: 'Dịch vụ', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            key: 'operation',
            render: (record, index) => {
                return (
                    <Space size="middle">
                        <PermissionCheck
                            permissionHas={{ label: PERMISSION_LABLEL.SERVICE_MANAGE, code: PERMISSION_TYPE.UPDATE }}
                        >
                            <Link to={`/admin/sua-dich-vu/${record.key}`}>Cập nhật</Link>
                        </PermissionCheck>

                        <PermissionCheck
                            permissionHas={{ label: PERMISSION_LABLEL.SERVICE_MANAGE, code: PERMISSION_TYPE.DELETE }}
                        >
                            <Button
                                type="primary"
                                onClick={() => {
                                    Remove(record);
                                }}
                                danger
                            >
                                Xóa
                            </Button>
                        </PermissionCheck>
                    </Space>
                );
            },
        },
    ];

    const data = [];
    for (let i = 0; i < service.length; ++i) {
        data.push({
            key: service[i]._id,
            name: service[i].serviceName,
        });
    }

    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ServiceManager;
