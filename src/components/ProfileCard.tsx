import Image from "next/image";

interface ProfileCardProps {
    name: string;
    id: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    imageUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    id,
    email,
    phone,
    gender,
    address,
    imageUrl,
}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            {/* Profile Image */}
            <figure className="flex justify-center mt-4">
                <div className="w-16 h-36 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={96}
                        height={96}
                        className="rounded-full"
                    />
                </div>
            </figure>

            {/* Profile Details */}
            <div className="card-body items-center text-center p-4">
                <h2 className="card-title font-bold">{name}</h2>
                <p className="text-sm text-gray-500">{id}</p>

                <div className="space-y-2 mt-4 text-left">
                    <p className="text-sm">
                        <span className="font-medium">Email:</span> {email}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Nomor HP:</span> {phone}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Jenis Kelamin:</span>{" "}
                        {gender}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Alamat Lengkap:</span>{" "}
                        {address}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
