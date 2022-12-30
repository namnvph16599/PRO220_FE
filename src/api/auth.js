import instance from './instance';

const URL = "/accounts"

export const login = async (data) => {
    return instance.post('/login', data);
};
export const register = (data) => {
    return instance.post('/register', data);
};

export const getAccounts = (filter) => {
    return instance.get(URL, {
        params: {
            filter
        }
    })
};