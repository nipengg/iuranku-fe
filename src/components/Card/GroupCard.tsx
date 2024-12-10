import { GroupMember } from "@/model/Master/GroupModel";
import { useRouter } from "next/navigation";
import crypt from "crypto-js";
import React from "react";
import { SECRET_KEY } from "@/constant";
import { encryptData } from "@/utils/crypt";

interface IGroupCardProps {
    groupMember: GroupMember;
}

const GroupCard: React.FunctionComponent<IGroupCardProps> = (props) => {
    const router = useRouter();
    const { groupMember } = props;

    return (
        <>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <img
                        className="object-scale-down max-h-full drop-shadow-md rounded-md m-auto"
                        src="https://images.vexels.com/media/users/3/224226/isolated/preview/12aa6da3403a8773c0a1b27dd6a32c86-minimalistic-house-logo-by-vexels.png"
                        alt="logo"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {groupMember.group?.group_name}
                    </h2>
                    <p>{groupMember.group?.group_description}</p>
                    <p>
                        Role:{" "}
                        <span className="font-bold">
                            {groupMember.member_type?.member_type_name}
                        </span>
                    </p>
                    <div className="card-actions justify-end mb-3">
                        <button
                            onClick={() =>
                                router.push(
                                    `/group/${encryptData(String(groupMember.group?.id))}`
                                )
                            }
                            className="btn btn-primary"
                        >
                            View Group
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupCard;
