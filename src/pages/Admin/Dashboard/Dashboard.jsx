import { ArrowUpOutlined, ShopOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, DatePicker, Select, Space, TimePicker, Spin } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import CountUp from 'react-countup';
import { getAllUser } from '../../../api/account';
import dayjs from 'dayjs';
import { JwtDecode } from '../../../utils/auth';
const { Option } = Select;
const formatter = (value) => <CountUp end={value} separator="," />;
const Dashboard = () => {
    const [medal, setMedal] = useState([]);
    const [type, setType] = useState('month');
    const [loading, setLoading] = useState(true);
    const [countUser,setCountUser] = useState(0)
    const [month,setMonth] = useState()
    useEffect(() => {
        (async () => {
            const countryname = [];
            const getmedal = [];
            const start = new Date();
            const a = await filterData(String(start.getMonth() + 1),'month');
            const { data } = await getAllUser();
            setMonth(new Date().getMonth() + 1)
            setCountUser(data.length)
            setLoading(false);
            setMedal(a);
        })();
    }, []);
    const valueChage = async (value) => {
        console.log(value);
        setMonth(value.$M + 1)
        setLoading(true);
        const a = await filterData(String(value.$M + 1),'month');
        setLoading(false);
        setMedal(a);
    };
    useEffect(()=>{
        (async()=>{
            if(type=='year'){
                const a = await filterData(String(dayjs().$y),'year');
            }
        })()
    },[type])
    // useEffect(()=>{
    //     if(JwtDecode.role == "Quản "){

    //     }
    // },[])
    const filterData = async (start,status) => {
        console.log(status);
        const Datas = [];
        const showroomId = [
            '640063b3393e2aa18a790374',
            '640efa1a44a5320d4809e85d',
            '640efaa144a5320d4809e879',
            '640efb7544a5320d4809e895',
            '640efce444a5320d4809e8c9',
        ];
        const { data } = await axios.post('http://localhost:8080/api/orders-filter');
        const respon = data.filter((element) => {
            if (element.status == 5) {
                if (element.tg_tra_xe && status =='month' && element.tg_tra_xe.split('-')[1] == '0' + start) {
                    return element;
                }else if(element.tg_tra_xe && status =='year' && element.tg_tra_xe.split('-')[0] == '2023'){
                    console.log('year',element);
                    return element;
                }
            }
        });
        let total = 0;
        for (let i = 0; i < showroomId.length; i++) {
            for (let j = 0; j < respon.length; j++) {
                if (respon[j].showroomId == showroomId[i]) {
                    total += respon[j].totalWithVat;
                }
            }
            Datas.push(total);
            total = 0;
        }
        return Datas;
    };
    return (
        <>
            <Row gutter={16} className="flex">
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Account User"
                            value={countUser}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            formatter={formatter}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Account Manager"
                            value={5}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            formatter={formatter}
                            prefix={<UserAddOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Showroom"
                            value={5}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            formatter={formatter}
                            prefix={<ShopOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <React.Fragment>
                <div className="container-fluid mt-3 mb-3">
                    <h2 className="text-left">{`Doanh thu theo tháng của năm ${String(new Date().getFullYear())}`} </h2>
                    <Space>
                        <Select value={type} onChange={setType}>
                            <Option value="month">Month</Option>
                            <Option value="year">Year</Option>
                        </Select>
                         <DatePicker type={type} defaultValue={type=='year'?dayjs(`${String(dayjs().$y)}`, 'YYYY'):dayjs(`${String(dayjs().$y)}/0${String(dayjs().$M+1)}`, 'YYYY/MM')} format={type=='year'?'YYYY':'YYYY/MM'} picker={type} onChange={(value) => valueChage(value)}/>
                    </Space>
                    {loading ? (
                        <div className="w-[50%] h-[300px] flex justify-center items-center">
                            <Spin spinning={true} tip="Loading..."></Spin>
                        </div>
                    ) : (
                        <Chart
                            type="donut"
                            width={'55%'}
                            height={550}
                            series={medal}
                            options={{
                                labels: [
                                    'Cửa hàng Hoàng Quốc Việt',
                                    'Cửa hàng Dodoris Trịnh Văn Bô',
                                    'cửa hàng Dodoris Phạm Văn Đồng',
                                    'cửa hàng Dodoris Thái Hà',
                                    'Dodoris Lê Trong Tấn',
                                ],
                                title: {
                                    text: `Doanh thu tháng : ${month}`,
                                },

                                plotOptions: {
                                    pie: {
                                        donut: {
                                            labels: {
                                                show: true,
                                                total: {
                                                    show: true,
                                                    showAlways: true,
                                                    label: `Doanh thu`,
                                                    fontSize: 30,
                                                    color: '#f90000',
                                                    formatter: function (w) {
                                                        return (
                                                            w.globals.seriesTotals
                                                                .reduce((a, b) => {
                                                                    const total = a + b;
                                                                    return total;
                                                                }, 0)
                                                                .toLocaleString('en') + ' VNĐ'
                                                        );
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },

                                tooltip: {
                                    shared: false,
                                    y: {
                                        formatter: function (val) {
                                            return val.toLocaleString('en') + ' VNĐ';
                                        },
                                    },
                                    x: {
                                        formatter: function (val) {
                                            return val.toLocaleString('en') + ' VNĐ';
                                        },
                                    },
                                },
                                dataLabels: {
                                    enabled: true,
                                },
                            }}
                        />
                    )}
                </div>
            </React.Fragment>
        </>
    );
};

export default Dashboard;
