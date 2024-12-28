"use client";

interface HousingCardProps {
    image: string; // Path to the image
    title: string; // Title of the housing
    notification: number; // Number of notifications
    onViewClick: () => void; // Function to handle the view button click
}

const HousingCard: React.FC<HousingCardProps> = ({
    image,
    title,
    notification,
    onViewClick,
}) => {
    return (
        <div className="card w-64 bg-white shadow-md border flex flex-col">
            {/* Image */}
            <figure>
                <img src={image} alt={title} className="rounded-t-md" />
            </figure>

            {/* Card Body */}
            <div className="card-body p-4 flex flex-col justify-between flex-grow">
                <div className="flex justify-between items-center">
                    <h2 className="card-title text-lg font-bold">{title}</h2>

                    {/* Notification */}
                    {notification > 0 && (
                        <div className="badge badge-error text-white">
                            {notification}
                        </div>
                    )}
                </div>

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
