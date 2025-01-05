"use client";

interface HousingCardProps {
    image: string;
    title: string;
    address: string;
    notification: number;
    onViewClick: () => void;
}

const HousingCard: React.FC<HousingCardProps> = ({
    image,
    title,
    address,
    notification,
    onViewClick,
}) => {
    return (
        <div className="card w-64 bg-white shadow-md border flex flex-col">
            <figure>
                <img src={image} alt={title} className="rounded-t-md" />
            </figure>
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
                <div className="flex items-center justify-between">
                    <h2 className="card-title text-lg font-bold">{title}</h2>
                    {notification > 0 && (
                        <div className="badge badge-error text-white ml-2">
                            {notification}
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-600">{address}</p>

                <button
                    onClick={onViewClick}
                    className="btn btn-success btn-block mt-4"
                >
                    View
                </button>
            </div>
        </div>
    );
};

export default HousingCard;
