export default function homePage() {
    const newsItems = [
        { title: "Judul Berita", tag: "Breaking", tagColor: "bg-green-500" },
        { title: "Judul Berita", tag: "Sports", tagColor: "bg-orange-500" },
        { title: "Judul Berita", tag: "News", tagColor: "bg-blue-500" },
    ];

    return (
        <div className="text-black">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold">Welcome Back, User!</h1>
            </div>
            <div className="divider" />
            <h1>Home</h1>
            <div>
                <div className="carousel w-full rounded-xl mb-10">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide2" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide3" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide4" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide1" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tab */}
            <div className="p-8 space-y-8">
                <div className="card bg-transparent shadow-md p-4 border">
                    <div className="flex justify-between border-b pb-2 mb-4">
                        <h2 className="font-bold text-lg">Tab Pengumuman</h2>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 space-y-2">
                            <p className="font-semibold">Kode Pengumuman</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod...
                            </p>
                        </div>
                        <div className="w-1/3 flex justify-center">
                            <img
                                src="/image-placeholder.jpg"
                                alt="Announcement"
                                className="rounded-md shadow"
                            />
                        </div>
                        <div className="w-1/3 space-y-2">
                            <p className="font-semibold">Data Pengumuman</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod...
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" flex-col">
                    <div className="card bg-transparent shadow-md p-4 border">
                        <div className="flex justify-between border-b pb-2 mb-4">
                            <h2 className="font-bold text-lg">Tab Berita</h2>
                        </div>
                        <div className="space-y-4">
                            {newsItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4"
                                >
                                    <img
                                        src="/news-image-placeholder.jpg"
                                        alt="News"
                                        className="w-12 h-12 rounded-md"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {item.title}
                                        </p>
                                        <div
                                            className={`badge ${item.tagColor} text-white text-xs`}
                                        >
                                            {item.tag}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
