
import { Modal } from 'antd';
import React, { useState } from 'react'

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