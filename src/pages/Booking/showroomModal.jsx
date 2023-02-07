import React, { useEffect, useRef, useState } from 'react';
import { Button, Select, Input } from 'antd';
import { getDistrict } from '../../api/district';
import _ from 'lodash';
import { searchInListShowroom } from '../../api/showroom';

const ShowroomModal = () => {
    const [zone, setZone] = useState([]);
    const [selectZone, setSelectZone] = useState('----chọn tất cả-------');
    const [dataToPreview, setDataToPreview] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [userLocation, setUserLocation] = useState({});

    const fetchAPIFilter = async () => {
        const getDataSearch = await searchInListShowroom({
            district: selectZone == '----chọn tất cả-------' ? '' : selectZone,
            address: searchText,
        });
    };

    const fetchApiDistrict = async () => {
        try {
            const dataDistrict = await getDistrict();
            setZone(dataDistrict.data);
        } catch (error) {}
    };

    const filterDataView = (dataFilter) => {
        console.log('filter data when user want to filter data');
    };

    const findUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            console.log('Latitude: ' + lat + ' Longitude: ' + lon);
        });
    };

    findUserLocation();

    useEffect(() => {
        fetchApiDistrict();
    }, []);

    useEffect(() => {
        fetchAPIFilter();
    }, [selectZone, searchText]);

    return (
        <div className="mt-6">
            <p className="flex justify-center font-bold text-lg py-2">Chọn chi nhánh</p>
            <div>
                {/* selectiom */}
                <Select
                    size="large"
                    className="h-10 w-full text-base border-[#02b875]"
                    defaultValue="----chọn tất cả----"
                    onSelect={(value) => setSelectZone(value)}
                    value={selectZone}
                >
                    {_.map(zone, (district) => (
                        <Select.Option value={district._id} key={district._id} label={district.name}>
                            <div span={24}>
                                <div span={24}>
                                    <span className="text-base font-medium text-[#02b875]">{district.name}</span>
                                </div>
                            </div>
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div>
                <p className="font-bold text-lg py-3">Khu vực:</p>
                <div className="flex flex-wrap gap-2 ">
                    {_.map(zone, (district) => (
                        <Button type="primary" key={district._id} onClick={() => setSelectZone(district._id)}>
                            {district.name}
                        </Button>
                    ))}
                    <Button type="primary" onClick={() => console.log('search cửa hàng gàn nhất')}>
                        Cửa Hàng Gần Nhất
                    </Button>
                </div>
            </div>
            <div>
                <p className="font-bold text-lg py-3">Địa chỉ:</p>
                <Input
                    placeholder="Tìm kiếm cửa hàng"
                    className="h-10 border-[#02b875]"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <hr className="my-1" />
                <div className="w-full h-60  overflow-y-scroll">
                    <div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                        <div className="my-3 grid grid-cols-5 place-items-center">
                            <img
                                src="https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png"
                                alt=""
                                className="w-[50px] h-[50px]"
                            />
                            <div className="col-span-4">
                                <span className="font-bold text-[16px]">Số 297 Lương Ngọc Quyến, TP Thái Nguyên</span>
                                <p>Hệ thống sửa chữa xe máy Dodoris</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowroomModal;
