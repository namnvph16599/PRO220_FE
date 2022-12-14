import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, Form, Input, Switch, Spin } from 'antd';
import { createShowroomAsync } from '../../../slices/showroom';
import _ from 'lodash';
import './showroom.css';
import UploadImage from '../../../components/UploadImage';

const DrawerCreateShowroom = ({ open, onClose, reloading}) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.showroom.create.loading)
    const [url, setUrl] = useState(null);
    const [address,setAddress] = useState('')
    const coordinate = useRef({
        latitude:"",
        longitude:"",
        address:""
    })
    const handleClose = () => {
        onClose(false);
    };

    const getSearchValue = ()=>{
        const searchValue =  document.getElementById('search')
        coordinate.current.address = searchValue.value
    }

    useEffect(()=>{
        var geocoder = new maptiler.Geocoder({
			input: 'search',
			key: 'CKlzQ1LLayVnG9v67Xs3'
		});
        geocoder.on('select', (item)=> {
			let coordinates = item.center
            coordinate.current.latitude = coordinates[1]
            coordinate.current.longitude = coordinates[0]
            setAddress(coordinate.current.address)
        })
    },[])

    const onFinish = async(values) => {
        const data = { ...values, images:[url],longitude: _.toString(coordinate.current.longitude),latitude: _.toString(coordinate.current.latitude)};
        const resalts = await new  dispatch(createShowroomAsync(data));
        if(!loading){
            handleClose()
            reloading({
            reload:false
            })
        }
    };

    return (
        <>
            <Drawer title="Thêm banner" placement="right" width="40%" onClose={handleClose} open={open}>

                {loading && <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
                }
                <Form
                    id="form-add-banner"
                    className="form-add-banner bg-white px-6 max-w-screen-lg mx-auto"
                    name="booking-form"
                    layout={'vertical'}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<p className="text-base font-semibold">Tên cửa hàng</p>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập tên cửa hàng" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Liên hệ cửa hàng</p>}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập số điện thoại liên hệ" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Địa chỉ cửa hàng</p>}
                        name="address"
                        initialValue={address}
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875] w-full" placeholder="Nhập địa chỉ"  onChange={()=>getSearchValue()}    id='search'/>
                    </Form.Item>
                    <p className="text-base font-semibold">
                        <span className="text-[#ff4d4f]">*</span> Ảnh
                    </p>
                    <UploadImage onSendUrl={(value) => setUrl(value)} />
                    {!url && <div className="text-[#ff4d4f]">Vui lòng tải ảnh lên!</div>}
                    <div className="absolute bottom-0 flex align-center">
                        <Form.Item>
                            {url ? (
                                <button
                                    htmltype="submit"
                                    className="mr-4 h-10 text-white bg-[#02b875] hover:bg-[#09915f] hover:text-white focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                                >
                                    Thêm
                                </button>
                            ) : (
                                <Button type="dashed" disabled size="large" className="mr-4">
                                    Thêm
                                </Button>
                            )}
                        </Form.Item>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="h-10 text-[#ccc] bg-white hover:text-white hover:bg-[#02b875] border border-slate-300 border-solid focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                        >
                            Hủy
                        </button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};
export default DrawerCreateShowroom;
