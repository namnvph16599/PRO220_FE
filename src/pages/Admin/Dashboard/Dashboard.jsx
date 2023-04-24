import { ShopOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, DatePicker, Select, Space, TimePicker, Spin } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import CountUp from 'react-countup';
import { getAllUser } from '../../../api/account';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { getShowrooms } from '../../../api/showroom';
import { indexOf } from 'lodash';
const { Option } = Select;
const formatter = (value) => <CountUp end={value} separator="," />;
const Dashboard = () => {
    const [medal, setMedal] = useState([]);
    const [type, setType] = useState('month');
    const [loading, setLoading] = useState(true);
    const [countUser, setCountUser] = useState(0);
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [nameShowroom, setNameShowroom] = useState([]);
    const years = useRef();
    useEffect(() => {
        (async () => {
            const { data } = await getAllUser();
            setCountUser(data.length);
        })();
    }, []);
    const valueChage = async (value) => {
        setLoading(true);
        let a = 0;
        if (type == 'month') {
            a = await filterData(String(value.$M + 1), 'month', String(value.$y));
            setMonth(value.$M + 1);
            if (value.$y !== years.current) {
                setYear(value.$y);
                years.current = value.$y;
            }
        } else {
            a = await filterData('', 'year', String(value.$y));
            setYear(value.$y);
        }
        setLoading(false);
        setMedal(a);
    };
    useEffect(() => {
        (async () => {
            if (type == 'year') {
                setLoading(true);
                const a = await filterData('', 'year', String(dayjs().$y));
                setYear(new Date().getFullYear());
                setLoading(false);
                setMedal(a);
            } else if (type == 'month') {
                const start = new Date();
                setLoading(true);
                const a = await filterData(String(start.getMonth() + 1), 'month', String(start.getFullYear()));
                setMonth(new Date().getMonth() + 1);
                setYear(String(new Date().getFullYear()));
                years.current = String(new Date().getFullYear());
                setLoading(false);
                setMedal(a);
            }
        })();
    }, [type]);
    const filterData = async (start, status, year) => {
        const Datas = [];
        const showroo = await getShowrooms();
        const dataShowroom = showroo.data.map((item) => {
            return item._id;
        });
        const nameShowroom = showroo.data.map((item, index) => {
            console.log(item.name.split(' ')[0]);
            const dataName = item.name.split(' ');
            let name =''
            for (let i = 1; i < dataName.length; i++) {
                name += ' ' + dataName[i]
            }
            return name.trim();
        });
        setNameShowroom(nameShowroom);
        const showroomId = dataShowroom;
        const { data } = await axios.post('http://localhost:8080/api/orders-filter');

        const respon = data.filter((element) => {
            if (element.status == 5) {
                if (
                    element.tg_tra_xe &&
                    status == 'month' &&
                    element.tg_tra_xe.split('-')[1] == '0' + start &&
                    element.tg_tra_xe.split('-')[0] == year
                ) {
                    return element;
                } else if (element.tg_tra_xe && status == 'year' && element.appointmentSchedule.split('-')[0] == year) {
                    return element;
                }
            }
        });
        let total = 0;
        for (let i = 0; i < showroomId.length; i++) {
            for (let j = 0; j < respon.length; j++) {
                if (respon[j].showroomId == showroomId[i]) {
                    total += respon[j].total;
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
            <h2>
                {type == 'month' ? (
                    <span className="flex">
                        Doanh Thu theo tháng của năm{' '}
                        <span>
                            <Statistic
                                className="20px"
                                value={year}
                                precision={2}
                                formatter={(value) => <CountUp end={value} separator="" />}
                            />
                        </span>
                    </span>
                ) : (
                    <span className="flex">
                        Doanh Thu của năm
                        <Statistic
                            className="20px"
                            value={year}
                            precision={2}
                            formatter={(value) => <CountUp end={value} separator="" />}
                        />
                    </span>
                )}
            </h2>
            <React.Fragment>
                <div className="container-fluid mt-3 mb-3">
                    <Space>
                        <Select value={type} onChange={setType}>
                            <Option value="month">Month</Option>
                            <Option value="year">Year</Option>
                        </Select>
                        <DatePicker
                            type={type}
                            defaultValue={
                                type == 'year'
                                    ? dayjs(`${String(dayjs().$y)}`, 'YYYY')
                                    : dayjs(`${String(dayjs().$y)}/0${String(dayjs().$M + 1)}`, 'YYYY/MM')
                            }
                            format={type == 'year' ? 'YYYY' : 'YYYY/MM'}
                            picker={type}
                            onChange={(value) => valueChage(value)}
                        />
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
                                labels: nameShowroom,
                                title: {
                                    text: `${type == 'month' ? `Doanh thu tháng ${month}` : ''}`,
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
