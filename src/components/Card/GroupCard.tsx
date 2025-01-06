import { GroupMember } from "@/model/Master/GroupModel";
import { useRouter } from "next/navigation";
import React from "react";
import { encryptData } from "@/utils/crypt";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setGroupMemberActive } from "@/lib/features/authSlice";

interface IGroupCardProps {
    groupMember: GroupMember;
}

const GroupCard: React.FunctionComponent<IGroupCardProps> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { groupMember } = props;

    const handleClick = () => {
        dispatch(setGroupMemberActive(groupMember));
        router.push(
            `/group/${encodeURIComponent(
                encryptData(String(groupMember.group?.id))
            )}`
        );
    };

    return (
        <>
            <div className="card w-64 bg-white shadow-md border flex flex-col">
                <figure>
                    <img
                        className="object-scale-down max-h-full drop-shadow-md rounded-md m-auto"
                        src="https://images.vexels.com/media/users/3/224226/isolated/preview/12aa6da3403a8773c0a1b27dd6a32c86-minimalistic-house-logo-by-vexels.png"
                        alt="logo"
                    />
                </figure>
                <div className="card-body p-4 flex flex-col justify-between flex-grow">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title text-lg font-bold">
                            {groupMember.group?.group_name}
                        </h2>
                    </div>
                    <p className="text-sm text-gray-600">
                        {groupMember.group?.group_description}
                    </p>
                    <p>
                        Role:{" "}
                        <span className="font-bold">
                            {groupMember.member_type?.member_type_name}
                        </span>
                    </p>
                    <button
                        onClick={() => handleClick()}
                        className="btn bg-custom-green-light btn-block mt-4 text-white"
                    >
                        View
                    </button>
                </div>
            </div>
        </>
    );
};

export default GroupCard;
