import instance from './instance';

export const search = (value) => {
    return instance.get(`/showroom/search?`, { params: { value } });
};
