import { Spin } from 'antd';

interface Props {
    size: 'small' | 'default' | 'large'
}

const SpinnerCircle: React.FunctionComponent<Props> = ({ size }) => {
    return (
        <>
            <div className="flex items-center justify-center h-64">
                <Spin size={size} />
            </div>

        </>
    );
};

export default SpinnerCircle;
