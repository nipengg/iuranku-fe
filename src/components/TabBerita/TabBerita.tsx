"use client";

const TabBerita = () => {
    const newsItems = [
        {
            tag: "Breaking",
            tagColor: "bg-green-500",
        },
        { tag: "Sports", tagColor: "bg-orange-500" },
        { tag: "News", tagColor: "bg-blue-500" },
    ];

    return (
        <div className="card bg-transparent shadow-md p-4 border flex-1">
            <div className="flex justify-between border-b pb-2 mb-4">
                <h2 className="font-bold text-lg">Tab Berita</h2>
            </div>
            <div className="space-y-4">
                {newsItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div>
                            <div className="flex">
                                <p className="font-semibold mr-3">
                                    Judul Berita
                                </p>
                                <div
                                    className={`badge text-white ${item.tagColor}`}
                                >
                                    {item.tag}
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabBerita;
