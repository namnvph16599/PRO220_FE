import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { notification, Popconfirm ,Input, Space, Table, Row, Button, Spin, Tooltip} from 'antd';
import './showroom.css';
import DrawerCreateBanner from './DrawerCreateBanner';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { getAllShowroomAsync } from '../../../slices/showroom';
import Highlighter from 'react-highlight-words';
const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const ShowRoom = () => {
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const loadding = useSelector((state) => state.showroom.showrooms.loading);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const data = showrooms.map((showroom) => ({ ...showroom, key: showroom._id }));
    useEffect(() => {
        dispatch(getAllShowroomAsync());
    }, []);


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (
      selectedKeys,
      confirm,
      dataIndex,
    ) => {
      confirm()
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm,clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

    // const handleUpdateBanner = (data) => {
    //     dispatch(
    //         updateBannerAsync({
    //             _id: data._id,
    //             data: _.pick(data, ['name', 'url', 'enabled', 'redirectTo', 'priority']),
    //         }),
    //     );
    // };

    // const handleRemoveBannerByIds = (ids) => {
    //     dispatch(removeBannerByIdsAsync(ids)).then((res) => {
    //         const bannerRemoved = _.get(res, 'payload.data.dataDeleted', null);
    //         if (bannerRemoved) {
    //             noti(
    //                 NOTIFICATION_TYPE.SUCCESS,
    //                 'Xóa thành banner công!',
    //                 `Bạn đã xóa ${bannerRemoved.name}  thành công!`,
    //             );
    //         } else {
    //             const ids = _.get(res, 'payload.data.ids', null);
    //             noti(
    //                 NOTIFICATION_TYPE.SUCCESS,
    //                 'Xóa thành banner công!',
    //                 `Bạn đã xóa ${ids.length} banner  thành công!`,
    //             );
    //         }
    //     });
    // };

    const columns = [
        {
            title: 'Tên cửa hàng',
            dataIndex: 'name',
             key:'name',
            ellipsis: {
                showTitle: false,
              },
            ...getColumnSearchProps('name'),
            render: (name) => (
              <Tooltip placement="topLeft" title={name}>
                {name}
              </Tooltip>
            ) 
        },
        {
            title: 'Kho ảnh',
            // render: (url) => (
            //     <a target="_blank" href={url} className="text-[#02b875]">
            //         <img src={url} alt="" />
            //     </a>
            // ),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'address',
            key:'address',
            ellipsis: {
                showTitle: false,
              },
            ...getColumnSearchProps('address'),
            render: (address) => (
              <Tooltip placement="topLeft" title={address}>
                {address}
              </Tooltip>
            ),

        },
        {
            title: 'Liên hệ',
            dataIndex: 'phone',
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
                                handleRemoveBannerByIds([data._id]);
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
            {loadding ? (
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
                            onClick={() => {}}
                            className="focus:outline-none text-base text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            disabled={_.isEmpty(selectedRowKeys) ? true : false}
                        >
                            Xóa {_.isEmpty(selectedRowKeys) ? '' : _.get(selectedRowKeys, 'length', '') + ' showrooms'}
                        </Button>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5"
                        >
                            <PlusOutlined className="pr-2 text-white " />
                            Thêm
                        </button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </>
            )}
            {open && <DrawerCreateBanner open={open} onClose={setOpen} />}
        </div>
    );
};

export default ShowRoom;
