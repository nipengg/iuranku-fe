import Image from "next/image";

export default function AddHousingAdmin() {
    return (
        <div className="p-3 text-black">
            <h1 className="text-5xl font-bold">Add Housing Information</h1>
            <div className="divider m-1" />
            <div>
                <h1 className="text-3xl mb-4">Housing Profile</h1>
                {/* Flex container to position image and form side by side */}
                <div className="flex flex-row justify-start items-center">
                    {/* Image under the heading */}
                    <div className="mr-8">
                        <Image
                            src="/housing-profile.png" // Add your image source here
                            alt="Housing Profile Image"
                            width="370"
                            height="350"
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    {/* Form beside the image, vertically centered */}
                    <div className="flex flex-col space-y-6">
                        <label className="form-control w-full max-w-xs">
                            <span className="font-bold">Nama Perumahan:</span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <div className="form-control w-full max-w-xs">
                            <span className="font-bold">Masukkan Foto:</span>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <div>
                <h1 className="text-3xl mb-4">Add Housing Organizer Detail</h1>
                <h2>Owned by : Wicaksono Foundation</h2>
                <div className="flex flex-row justify-start items-center">
                    <div className="flex flex-col items-center mr-8">
                        <Image
                            src="/housing-profile.png"
                            alt="Housing Profile Image"
                            width="200"
                            height="300"
                            className="rounded-lg shadow-md"
                        />
                        <p className="mt-2">test</p>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <Image
                            src="/housing-profile.png"
                            alt="Housing Profile Image"
                            width="200"
                            height="300"
                            className="rounded-lg shadow-md"
                        />
                        <p className="mt-2">test</p>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <label className="form-control w-full max-w-xs">
                            <span className="font-bold">Nama Perusahaan: </span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <span className="font-bold">
                                Pemilik Perusahaan:
                            </span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <span className="font-bold">
                                Organizer Utama Perumahan
                            </span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-sm w-full max-w-xs"
                            />
                        </label>
                        <div className="form-control w-full max-w-xs">
                            <span className="font-bold">Masukkan Foto:</span>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <span className="font-bold">Masukkan Foto:</span>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div>
                    <h2 className="text-3xl mb-4">Additional Informations</h2>
                    <label className="form-control w-full max-w-xs mb-4">
                        <span className="font-bold">Jumlah Cluster:</span>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <label className="form-control w-full max-w-xs mb-4">
                        <span className="font-bold">Deskripsi Perumahan:</span>
                        <textarea
                            placeholder="Bio"
                            className="textarea textarea-bordered textarea-md w-full max-w-xs"
                        ></textarea>
                    </label>
                    <label className="form-control w-full max-w-xs mb-4">
                        <span className="font-bold">Address:</span>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                </div>
                <div className="divider" />
                <div>
                    <h2 className="text-3xl mb-4">Contact</h2>
                    <label className="form-control w-full max-w-xs mb-4">
                        <span className="font-bold">Nomor Whatsapp:</span>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <label className="form-control w-full max-w-xs mb-4">
                        <span className="font-bold">Sosial Media:</span>
                        <div className="ml-8 mt-2">
                            <span className="font-bold">Instagram:</span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-2"
                            />
                            <span className="font-bold">Twitter:</span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-2"
                            />
                            <span className="font-bold">Youtube:</span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-2"
                            />
                            <span className="font-bold">LinkedIn:</span>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs mb-2"
                            />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
