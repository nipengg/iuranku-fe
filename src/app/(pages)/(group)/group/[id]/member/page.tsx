"use client"
import { useState } from "react";
import InviteMemberModal from "@/components/Member/InviteMemberModal";
import SectionHeadingWithTabs from "@/components/Member/SectionHeadingWithTabs";
import { decryptData } from "@/utils/crypt";
import { inviteGroupApplication } from "@/lib/features/groupApplicationSlice";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GroupApplicationInvite } from "@/model/Master/GroupApplicationModel";
import { AppDispatch } from "@/lib/store";

export default function GroupMember({ params }: { params: { id: string } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inviteSuccess, setInviteSuccess] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInviteMember = (selectedMember: any) => {
    
        const inviteForm: GroupApplicationInvite = {
            user_id: selectedMember.value,
            group_id: Number.parseInt(decryptData(decodeURIComponent(params.id)))
        };
    
        dispatch(inviteGroupApplication(inviteForm)).then((res: any) => {    
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`User Invited`);
                setInviteSuccess(true);
            }
        }).catch(function (err: any) {
            if (err.payload !== undefined) {
                toast.error(`Invite Failed. ${err.payload.result.error}`);
            } else {
                toast.error(`Something went wrong...`);
            }
        });
    };

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Group Member</h1>
                    <button
                        className="btn btn-success text-white btn-sm"
                        onClick={handleOpenModal}
                    >
                        + Invite Member
                    </button>
                </div>
                <SectionHeadingWithTabs id={params.id} key={inviteSuccess ? "refreshed" : "initial"} />
            </div>
            <InviteMemberModal
                groupId={params.id}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onInvite={handleInviteMember}
            />
        </>
    );
}
