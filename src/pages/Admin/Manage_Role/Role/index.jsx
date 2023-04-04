import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Tag, Spin, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DrawerCreateRole from './DrawerCreateRole';
import { getAllRoleAsync } from '../../../../slices/role';
import { isEmpty } from 'lodash';
const index = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const Role = useSelector((state) => state.role.valueRole);
    const Loading = useSelector((state) => state.role.loading);
    const dispatch = useDispatch();
    const OpenShowDrawer = () => {
        setOpen(true);
        setAction('Create');
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={() => {
                            setAction('Edit');
                            setOpen(true);
                            setId(record);
                        }}
                    />
                </Space>
            ),
        },
    ];
    useEffect(() => {
        (() => {
            dispatch(getAllRoleAsync());
        })();
    }, []);
    useEffect(() => {
        (() => {
            let showdata = Role.map((item, index) => {
                return {
                    key: item.id,
                    name: item.name,
                    tags: ['cool', 'teacher'],
                };
            });
            const newData = showdata.filter((item) => item.name !== 'Admin');
            setData(newData);
        })();
    }, [Role]);
    return (
        <div>
            <div className="flex justify-between">
                <Button onClick={() => OpenShowDrawer()} className="btn-primary text-white mr-5" type="primary">
                    Thêm quyền
                </Button>
                <p className="p-5">
                    Số lượng: <span className="font-bold">{data?.length}</span>
                </p>
            </div>
            <>
                <Spin spinning={Loading}>
                    <Table columns={columns} dataSource={data} />
                    <DrawerCreateRole
                        open={open}
                        onClose={(data) => {
                            setOpen(data.open);
                            setAction(data.action);
                        }}
                        action={action}
                        id={!isEmpty(id) ? id : ''}
                    />
                </Spin>
            </>
        </div>
    );
};

export default index;
