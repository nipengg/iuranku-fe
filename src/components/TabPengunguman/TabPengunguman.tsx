const TabPengunguman = () => {
    return (
        <div className="card bg-base-100 shadow-md border rounded-lg p-6 w-1/2">
            {/* Header */}
            <div className="flex justify-between border-b pb-3 mb-4">
                <p className="text-gray-600 font-medium">Kode Pengumuman</p>
                <h2 className="font-bold text-lg">Judul Pengumuman</h2>
                <p className="text-gray-600 font-medium">Date Pengumuman</p>
            </div>

            {/* Content Section */}
            <div className="flex space-x-6">
                {/* Left Text */}
                <div className="flex-1">
                    <p className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco..
                    </p>
                </div>

                {/* Image */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="/arcane1.jpg" // Replace with your image path
                        alt="Announcement"
                        width={350}
                        height={200}
                        className="rounded-sm shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default TabPengunguman;
