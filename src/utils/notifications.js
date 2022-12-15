import { notification } from 'antd';

export const Notification = (type, data) => {
    const placement = 'topRight';
    return notification[type]({
        message: `${type}`,
        description: `${data}`,
        placement,
    });
};
