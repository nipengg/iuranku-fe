import React, { useState } from "react";
import Tabs from "../Tabs";
import { GroupMember } from "@/model/Master/GroupModel";
import MemberPaymentDetail from "./MemberPaymentDetail";

interface MemberDetailModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    groupId: string;
    member: GroupMember;
}

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
    isModalOpen,
    onClose,
    groupId,
    member
}) => {

    const [activeTab, setActiveTab] = useState("Keamanan");
    const tabs = ["Keamanan", "Kebersihan", "Kematian"];

    if (!isModalOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box w-[1100px] max-w-none overflow-visible">
                <h2 className="text-xl font-bold mb-4">Detail Member</h2>
                <div className="w-full max-w-screen-xl mx-auto p-4">
                    {/* User Info Section */}
                    <div className="flex flex-col items-start space-y-4 mb-6">
                        <h1 className="text-2xl font-bold">
                            {member.user?.name}
                        </h1>
                        <p className="text-sm text-gray-500">{member.user?.role} | {member.member_type?.member_type_name}</p>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex">
                                <span className="font-medium w-32">📞 Mobile Number</span>
                                <span className="ml-2 mr-2">:</span>
                                <strong>{member.user?.phone}</strong>
                            </p>
                            <p className="flex">
                                <span className="font-medium w-32">✉️ Email</span>
                                <span className="ml-2 mr-2">:</span>
                                <strong>{member.user?.email}</strong>
                            </p>
                            <p className="flex">
                                <span className="font-medium w-32">📍 Address</span>
                                <span className="ml-2 mr-2">:</span>
                                <strong>{member.user?.address}</strong>
                            </p>
                        </div>
                    </div>

                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                    <div className="overflow-x-auto">
                        <MemberPaymentDetail key={activeTab} groupId={groupId} member={member} typeTuition={activeTab} />
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailModal;
