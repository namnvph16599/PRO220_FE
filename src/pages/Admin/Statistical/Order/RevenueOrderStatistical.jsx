import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Select } from 'antd';
import DatePickerByOptions from '../../../../components/Customs/DatePickerByOptions';
import { getOrderRevenue } from '../../../../api/order';
import { getAllShowroomAsync } from '../../../../slices/showroom';
import { setCategoriesByType } from '../../../../utils/statistical';

const defaultSeries = [
    {
        type: 'column',
        name: 'Chi phí',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        type: 'column',
        name: 'Doanh thu',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        type: 'column',
        name: 'Lợi nhuận',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        type: 'spline',
        name: 'Line doanh thu',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white',
        },
    },
];
const RevenueOrderStatistical = () => {
    useDocumentTitle('Thống kê doanh thu');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const [time, setTime] = useState(dayjs());
    const [type, setType] = useState('date');
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState(defaultSeries);
    const [data, setData] = useState([]);
    const [showroomIdSeleted, setShowroomIdSeleted] = useState();

    useEffect(() => {
        if (showrooms.length === 0) {
            dispatch(getAllShowroomAsync());
        }
        if (!showroomIdSeleted && showrooms.length > 0) {
            setShowroomIdSeleted(showrooms[0]._id);
        }
    }, [showrooms]);

    useEffect(() => {
        setCategoriesByType(type, time, setCategories);
        handleSetSeries();
    }, [data]);

    useEffect(() => {
        if (time && showroomIdSeleted) {
            getOrderRevenue({ type, time, showroomId: showroomIdSeleted })
                .then(({ data: res }) => {
                    console.log('res', res);
                    setData(res);
                })
                .catch((err) => {
                    console.log('getOrderRevenue', err);
                });
        }
    }, [time, showroomIdSeleted, type]);
    const handleChange = (value) => {
        setShowroomIdSeleted(value);
    };
    const handleSetSeries = () => {
        switch (type) {
            case 'date':
                const defaultSeriesClone = _.cloneDeep(defaultSeries);
                _.forEach(data, (item) => {
                    console.log('item', item);
                    const hour = dayjs(item.createdAt).hour();
                    console.log('hour', hour);
                    //tinh chi phi
                    const expense = _.reduce(
                        item.materials,
                        (total, material) => {
                            const totalMaterial = material.qty * material.price;
                            return total + totalMaterial;
                        },
                        0,
                    );
                    const idxExpense = `[0].data[${hour}]`;
                    const expensePrev = _.get(defaultSeriesClone, idxExpense, 0);
                    _.set(defaultSeriesClone, idxExpense, expensePrev + expense);
                    //tinh loi nhuan
                    const profit = item.total - expense;
                    console.log(111, profit);
                    //tinh doanh thu
                });
                setSeries(defaultSeriesClone);
                break;
            case 'week':
                const defaultSeriesWeek = [
                    {
                        name: 'Chưa thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        name: 'Đã thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0],
                    },
                ];
                _.forEach(data.paymented, (item) => {
                    const dayOfWeek = dayjs(item.createdAt).day();
                    const formatDayOfWeek = dayOfWeek ? dayOfWeek - 1 : 6;
                    const idx = `[1].data[${formatDayOfWeek}]`;
                    const valuePrev = _.get(defaultSeriesWeek, idx, 0);
                    _.set(defaultSeriesWeek, idx, valuePrev + _.get(item, 'total', 0));
                });
                _.forEach(data.not_payment, (item) => {
                    const dayOfWeek = dayjs(item.createdAt).day();
                    const formatDayOfWeek = dayOfWeek ? dayOfWeek - 1 : 6;
                    const idx = `[0].data[${formatDayOfWeek}]`;
                    const valuePrev = _.get(defaultSeriesWeek, idx, 0);
                    _.set(defaultSeriesWeek, idx, valuePrev + _.get(item, 'total', 0));
                });
                setSeries(defaultSeriesWeek);
                break;
            case 'month':
                const dayInMonth = dayjs(time).daysInMonth();
                const weekOfMonth = Math.ceil(dayInMonth / 7);
                const defaultSeriesMonths = [
                    {
                        name: 'Chưa thanh toán',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                    },
                    {
                        name: 'Đã thanh toán',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                    },
                ];
                _.forEach(data.paymented, (item) => {
                    const createdAtNumber = +dayjs(item.createdAt).format('DD');
                    let dayofmonth = 0;
                    if (createdAtNumber > 7 && createdAtNumber <= 14) dayofmonth = 1;
                    if (createdAtNumber > 14 && createdAtNumber <= 21) dayofmonth = 2;
                    if (createdAtNumber > 21 && createdAtNumber <= 28) dayofmonth = 3;
                    if (createdAtNumber > 28) dayofmonth = 4;
                    const idx = `[1].data[${dayofmonth}]`;
                    const valuePrev = _.get(defaultSeriesMonths, idx, 0);
                    _.set(defaultSeriesMonths, idx, valuePrev + _.get(item, 'total', 0));
                });
                _.forEach(data.not_payment, (item) => {
                    const createdAtNumber = +dayjs(item.createdAt).format('DD');
                    let dayofmonth = 0;
                    if (createdAtNumber > 7 && createdAtNumber <= 14) dayofmonth = 1;
                    if (createdAtNumber > 14 && createdAtNumber <= 21) dayofmonth = 2;
                    if (createdAtNumber > 21 && createdAtNumber <= 28) dayofmonth = 3;
                    if (createdAtNumber > 28) dayofmonth = 4;
                    const idx = `[0].data[${dayofmonth}]`;
                    const valuePrev = _.get(defaultSeriesMonths, idx, 0);
                    _.set(defaultSeriesMonths, idx, valuePrev + _.get(item, 'total', 0));
                });
                setSeries(defaultSeriesMonths);
                break;
            case 'year':
                const defaultSeriesYear = [
                    {
                        name: 'Chưa thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        name: 'Đã thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ];
                _.forEach(data.paymented, (item) => {
                    const createdAtFormat = dayjs(item.createdAt).format('MM') - 1;
                    const idx = `[1].data[${createdAtFormat}]`;
                    const valuePrev = _.get(defaultSeriesYear, idx, 0);
                    _.set(defaultSeriesYear, idx, valuePrev + _.get(item, 'total', 0));
                });
                _.forEach(data.not_payment, (item) => {
                    const createdAtFormat = dayjs(item.createdAt).format('MM') - 1;
                    const idx = `[0].data[${createdAtFormat}]`;
                    const valuePrev = _.get(defaultSeriesYear, idx, 0);
                    _.set(defaultSeriesYear, idx, valuePrev + _.get(item, 'total', 0));
                });
                setSeries(defaultSeriesYear);
                break;
            default:
                const defaultSeriesOptions = [
                    {
                        name: 'Chưa thanh toán',
                        data: [0],
                    },
                    {
                        name: 'Đã thanh toán',
                        data: [0],
                    },
                ];
                _.forEach(data.paymented, (item) => {
                    const idx = '[1].data[0]';
                    const valuePrev = _.get(defaultSeriesOptions, idx, 0);
                    _.set(defaultSeriesOptions, idx, valuePrev + _.get(item, 'total', 0));
                });
                _.forEach(data.not_payment, (item) => {
                    const idx = '[0].data[0]';
                    const valuePrev = _.get(defaultSeriesOptions, idx, 0);
                    _.set(defaultSeriesOptions, idx, valuePrev + _.get(item, 'total', 0));
                });
                setSeries(defaultSeriesOptions);
        }
    };
    return (
        <Fragment>
            <Select
                size="large"
                value={showroomIdSeleted}
                style={{
                    width: 400,
                }}
                onChange={handleChange}
                options={showrooms.map((showroom) => ({ value: showroom._id, label: showroom.name }))}
            />
            <div className="rounded border border-solid border-inherit p-6 my-4">
                <div className="flex justify-between items-center pb-4">
                    <div span={12}>
                        <h3 className="font-bold text-lg">Thống kê doanh thu</h3>
                    </div>
                    <div span={12}>
                        <DatePickerByOptions onChange={setTime} setType={setType} />
                    </div>
                </div>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            title: {
                                text: null,
                            },
                            xAxis: {
                                categories,
                            },
                            yAxis: {
                                title: {
                                    text: null,
                                },
                                labels: {
                                    formatter: function () {
                                        const value = this.value;
                                        if (!value) return value;
                                        const valueFormat = value.toLocaleString('en') + ' VNĐ';
                                        return valueFormat;
                                    },
                                },
                            },
                            // plotOptions: {
                            //     line: {
                            //         dataLabels: {
                            //             enabled: true,
                            //             formatter: function () {
                            //                 const value = this.y;
                            //                 if (!value) return '';
                            //                 const valueFormat = value.toLocaleString('en') + ' VNĐ';
                            //                 return valueFormat;
                            //             },
                            //         },
                            //         enableMouseTracking: false,
                            //     },
                            // },
                            tooltip: {
                                valueSuffix: ' million liters',
                            },
                            series,
                        }}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default RevenueOrderStatistical;
