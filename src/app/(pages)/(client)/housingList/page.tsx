"use client";
import HousingCard from "@/components/HousingCard";

interface HousingData {
    id: number;
    image: string;
    title: string;
    notification: number;
}

const HousingPage: React.FC = () => {
    const housingData: HousingData[] = [
        {
            id: 1,
            image: "/cat1.png",
            title: "Perumahan Alam Barkah",
            notification: 2,
        },
        {
            id: 2,
            image: "/cat1.png",
            title: "Green Living Residence",
            notification: 0,
        },
        {
            id: 3,
            image: "/cat1.png",
            title: "Citra Land Housing",
            notification: 5,
        },
        {
            id: 4,
            image: "/cat1.png",
            title: "The Grand Estate",
            notification: 0,
        },
    ];

    const handleViewClick = (id: number) => {
        alert(`Viewing details for housing ID: ${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Your Group</h1>
            {/* Card Flexbox */}
            <div className="flex flex-wrap gap-6">
                {housingData.map((house) => (
                    <HousingCard
                        key={house.id}
                        image={house.image}
                        title={house.title}
                        notification={house.notification}
                        onViewClick={() => handleViewClick(house.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HousingPage;
