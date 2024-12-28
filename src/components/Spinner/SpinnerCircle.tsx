import { Spin } from 'antd';

interface Props {
    size: 'small' | 'default' | 'large'
}

const SpinnerCircle: React.FunctionComponent<Props> = ({ size }) => {
    return (
        <>
            <Spin size={size} />
        </>
    );
};

export default SpinnerCircle;
