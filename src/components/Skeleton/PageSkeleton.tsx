import { Skeleton } from 'antd';

interface IPageSkeletonProps {

}

const PageSkeleton: React.FunctionComponent<IPageSkeletonProps> = (props) => {

    const { } = props;

    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton active className='mt-2' key={index} />
            ))}
        </>
    )
}

export default PageSkeleton