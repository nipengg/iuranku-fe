import Image from "next/image";

export default function housingPage() {
    const contactInfo = [
        { name: "Instagram" },
        { name: "Youtube" },
        { name: "Twitter" },
        { name: "Facebook" },
        { name: "LinkedIn" },
    ];
    return (
        <div className="p-3 text-black">
            <h2 className="text-5xl font-semibold">Housing Information</h2>
            <div className="divider m-2" />
            <div>
                <div className="flex w-full flex-col lg:flex-row">
                    <div>
                        {/* Nama Perusahaan */}
                        <h1>Nama Perusahaan</h1>
                        <h5>ID Perusahaan</h5>
                        <Image
                            src="/cat1.png"
                            alt=".."
                            width={225}
                            height={225}
                            className="rounded-md border"
                        />
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-col items-center">
                        {/* Owner Info */}
                        <div className="flex flex-col items-center mb-4">
                            <h1 className="text-lg font-semibold">
                                Diolah oleh:
                            </h1>
                            <h2 className="text-xl">
                                PT. Wicaksono Karya Abadi
                            </h2>
                        </div>
                        <div className="flex flex-row items-center justify-center space-x-6">
                            <div className="flex flex-col items-center">
                                <Image
                                    src="/arcane1.jpg"
                                    alt="Pengelola Utama"
                                    height={225}
                                    width={350}
                                    className="rounded-md border"
                                />
                                <h6 className="mt-2">Pengelola Utama</h6>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image
                                    src="/arcane1.jpg"
                                    alt="Penanggung Jawab Utama"
                                    height={225}
                                    width={350}
                                    className="rounded-md border"
                                />
                                <h6 className="mt-2">Penanggung Jawab Utama</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider m-2" />
                <div>
                    <div className="mb-6">
                        <span className="font-bold block">Jumlah Cluster:</span>
                        <span className="block mt-2 text-justify">
                            Lorem ipsum dolor sit amet...
                        </span>
                    </div>

                    <div className="mb-6">
                        <span className="font-bold block">
                            Deskripsi Perumahan:
                        </span>
                        <span className="block mt-2 text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Orci ac auctor augue mauris
                            augue...
                        </span>
                    </div>

                    <div className="mb-6">
                        <span className="font-bold block">
                            Alamat Perumahan:
                        </span>
                        <span className="block mt-2 text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Orci ac auctor augue mauris
                            augue...
                        </span>
                    </div>
                </div>
                <div className="divider m-2" />
                <div>
                    {/* Contact Information */}
                    <h1 className="font-bold block text-3xl mb-1">Contact</h1>
                    <h4>Nomor Whatsapp:</h4>
                    <h4>Social Media:</h4>
                    <div className="ml-6 space-y-2">
                        {contactInfo.map((info, index) => (
                            <h6 key={index}>{info.name}:</h6>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
