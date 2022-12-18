import { Navigate } from 'react-router-dom';
import { Token } from '../../constants/auth';

const PrivateRouter = ({ children }) => {
    if (localStorage.getItem(Token.accessToken)) return <Navigate to="/" />;
    return children;
};

export default PrivateRouter;
