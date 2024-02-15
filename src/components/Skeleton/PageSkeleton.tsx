import { Skeleton } from 'antd';

const PageSkeleton = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton active className='mt-2' key={index} />
            ))}
        </>
    )
}

export default PageSkeleton