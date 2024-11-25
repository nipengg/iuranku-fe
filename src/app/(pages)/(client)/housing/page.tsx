import Image from "next/image";

export default function housingPage() {
    return (
        <div className="p-3 text-black">
            <h2 className="text-5xl font-semibold">Housing Information</h2>
            <div className="divider" />
            <div>
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="card rounded-box grid h-32 flex-grow border-gray-950">
                        <div>
                            {/* Nama Perusahaan */}
                            <h1>Nama Perusahaan</h1>
                            <h5>ID Perusahaan</h5>
                            <Image src="" alt=".." />
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="card rounded-box grid h-32 flex-grow border-gray-950">
                        <div>
                            {/* Owner Info */}
                            <div className="flex flex-row">
                                <h1>Diolah oleh: </h1>
                                <h2>PT.Wicaksono Karya Abadi</h2>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex-col">
                                    <Image src="" alt=".." />
                                    <h6>Pengelola Utama</h6>
                                </div>
                                <div className="flex-col">
                                    <Image src="" alt=".." />
                                    <h6>Penanggung Jawab Utama</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider " />
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
                <div className="divider m-0" />
                <div>
                    {/* Contact Information */}
                    <h1 className="font-bold block text-3xl mb-1">Contact</h1>
                    <h4>Nomor Whatsapp:</h4>
                    <h4>Social Media:</h4>
                    <div className="ml-6">
                        <h6>Instagram:</h6>
                        <h6>Youtube:</h6>
                        <h6>Twitter:</h6>
                        <h6>Facebook:</h6>
                        <h6>LinkedIn:</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}
