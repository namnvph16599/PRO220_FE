import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/locale/vi_VN';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { ModalProvider } from './contexts/ModalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider locale={vi_VN}>
            <BrowserRouter>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </BrowserRouter>
        </ConfigProvider>
    </Provider>,
);
