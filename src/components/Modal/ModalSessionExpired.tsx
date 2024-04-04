import { Modal } from 'antd';
import { StatusCodes } from 'http-status-codes';
import React, { useState } from 'react'

export function redirectSessionExpired(errMsg: string): any {
    if (errMsg.indexOf(StatusCodes.UNAUTHORIZED.toString())) {
        window.location.href = '/login';
    }
}

interface IModalSessionExpired {
    isModalOpenParam: boolean
}

const ModalSessionExpired: React.FunctionComponent<IModalSessionExpired> = (props) => {

    const { isModalOpenParam } = props

    const [isModalOpen, setIsModalOpen] = useState(isModalOpenParam);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default ModalSessionExpired