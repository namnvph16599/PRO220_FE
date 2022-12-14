import instance from './instance';

const URL = '/showrooms';

export const getShowrooms = () => {
    return instance.get(URL);
};

export const createShowroom = (data) => {
    return instance.post(URL, data);
};

export const getShowroomById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const removeShowroomById = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const removeShowroomByIds = (ids = []) => {
    return instance.delete(URL, { data: { ids } });
};

export const updateShowroom = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};
