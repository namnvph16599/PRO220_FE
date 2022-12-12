import React, { useEffect, useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Drawer, Form, Input, Switch } from 'antd';
import './showroom.css';
import UploadImage from '../../../components/UploadImage';
import * as Leaflet from 'leaflet';
// import * as maptiler from '@maptiler/geocoder'
const DrawerCreateShowroom = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState(null);
    const coordinates = useRef({
        latitude:'15.7939252',
        longitude:'105.9102589'
    })
    const handleClose = () => {
        onClose(false);
    };

    const onFinish = (values) => {
        const data = { ...values, url };
        // dispatch(createBannerAsync(data));
        console.log(data);
    };

    useEffect(()=>{
        var geocoder = new maptiler.Geocoder({
			input: 'search',
			key: 'CKlzQ1LLayVnG9v67Xs3'
		});
        // geocoder.on('select', (item)=> {
		// 	let coordinates = item.center
        //     console.log(coordinates);
        //     console.log(item.place_name);
    //   this.proAddress = item.place_name
    //   this.proLatitude = coordinates[1]
    //   this.proLongitude = coordinates[0]
    //   const longitude = this.proLongitude
    //   const latitude = this.proLatitude
      const container = Leaflet.DomUtil.get('map');
      console.log(container);
      console.log(coordinates.current);
      if (container != null) {
        container._leaflet_id = null;
      }
      const map =  Leaflet.map('map').setView([parseFloat(coordinates.current.latitude), parseFloat(coordinates.current.longitude)], 8);
      Leaflet.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=CKlzQ1LLayVnG9v67Xs3', {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          crossOrigin: true
        }).addTo(map)
      const marker = Leaflet.marker([parseFloat(coordinates.current.latitude), parseFloat(coordinates.current.longitude)]).addTo(map);
        marker.bindPopup(`<iframe  src='https://www.google.com/maps?q=${coordinates.current.latitude},${coordinates.current.longitude}+&output=embed' loading="lazy"></iframe>`);
    // })
    },[])
    return (
        <>
            <Drawer title="Thêm banner" placement="right" width="40%" onClose={handleClose} open={open}>
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
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875] w-full" placeholder="Nhập địa chỉ"   id='search'/>
                    </Form.Item>
                    <div className="input-group my-3">
                        <div id="map">
                        </div>
                    </div>
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
                        {/* <div className="input-group my-1">
                            <div className="input-group">
                                <input className="form-control" id="search"  />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-map"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="input-group my-3">
                            <div id="map">
                            </div>
                        </div> */}
                
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
