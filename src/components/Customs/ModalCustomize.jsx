import { Button, Modal } from 'antd';
import React from 'react';

const ModalCustomize = (props) => {
    const handleOkCancel = () => {
        props.onSubmit();
    };
    const handleCancel = () => {
        props.setShowModal();
    };
    return (
        <Modal
            title={props.title}
            open={props.showModal}
            onOk={handleOkCancel}
            onCancel={handleCancel}
            footer={
                <div>
                    <span>
                        <button
                            onClick={handleCancel}
                            type="button"
                            className="h-10 mr-2 px-4 text-dark border bg-[#ffffff]  hover:bg-[#efefef] font-medium rounded-lg text-base "
                        >
                            Hủy
                        </button>
                        <Button
                            onClick={handleOkCancel}
                            disabled={!props.value}
                            type="primary"
                            className="btn-primary h-10 px-4 text-white bg-![#02b875] hover:bg-[#09915f] hover:!text-white font-medium rounded-lg text-base "
                        >
                            OK
                        </Button>
                    </span>
                </div>
            }
        >
            {props.children}
        </Modal>
    );
};

export default ModalCustomize;