import { notification } from "antd";

export const notifications = (api,type,data)=>{
    const placement = 'topRight'
    return   api[type]({
                message: `${type}`,
                description: `${data}`,
                placement,
              });
}