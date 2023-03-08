import jwtDecode from 'jwt-decode';
import _ from 'lodash';
export const JwtDecode = () => {
    if (localStorage.getItem('accessToken')) {
        return jwtDecode(localStorage.getItem('accessToken'));
    }
    return null;
};

export const checkAuth = () => {
    const userDecode = JwtDecode();
    const role = _.get(userDecode, 'roleId', null);
    if (!role) return false;
    return true;
};
