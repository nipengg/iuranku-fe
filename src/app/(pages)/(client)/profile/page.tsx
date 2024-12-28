import ProfileCard from "@/components/ProfileCard";

export default function profilePage() {
    return (
        <div className="text-black">
            <h1>Profile</h1>
            <ProfileCard
                name="Nama User"
                id="ID User"
                email="email@domain.com"
                phone="123-456-789"
                gender="Laki-laki"
                address="Alamat Jalan 123, Kota"
                imageUrl="/profile-image.jpg"
            />

            <div>
                <h1>Nama User</h1>
                <h5>ID User</h5>
            </div>

            {/* Form Profile */}
            <div>
                <label className="block text-sm font-bold mb-2" htmlFor="Nama">
                    Nama
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="Masukkan nama anda!"
                />
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Masukkan email anda!"
                />
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                        Gender
                    </label>
                    <div className="flex flex-row">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className=" mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">
                        Address
                    </label>
                    <div className="mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Road/Street"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div className="w-full md:w-1/3 pr-0 md:pr-2 mb-4 md:mb-0">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="City"
                            />
                        </div>
                        <div className="w-full md:w-1/3 pr-0 md:pr-2 mb-4 md:mb-0">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Province"
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 self-start"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
