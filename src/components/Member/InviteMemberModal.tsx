import AsyncSelect from "react-select/async";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { findMembers } from "@/lib/features/groupMemberSlice";
import { StatusCodes } from "http-status-codes";
import { decryptData } from "@/utils/crypt";

interface InviteMemberModalProps {
    isOpen: boolean;
    groupId: string;
    onClose: () => void;
    onInvite: (selectedMemberId: string) => void;
}

async function findMembersFetch(
    dispatch: AppDispatch,
    search_value: string,
    groupId: string,
): Promise<any> {
    try {
        const response: any = await dispatch(findMembers({ search_value: search_value, group_id: groupId }));
        if (response.error) throw response;
        return response.payload;
    } catch (error) {
        throw error;
    }
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, onClose, onInvite, groupId }) => {

    const dispatch = useDispatch();
    const [selectedMember, setSelectedMember] = useState(null);

    const loadOptions = async (inputValue: string) => {
        try {
            const res = await findMembersFetch(dispatch, inputValue, decryptData(decodeURIComponent(groupId)));

            if (res.meta.code === StatusCodes.OK) {
                const data = res.result.data;
                return data.map((member: { id: string; name: string; email: string }) => ({
                    value: member.id,
                    label: `${member.name} (${member.email})`,
                }));
            } else {
                throw new Error(res.result.message);
            }
        } catch (error) {
            console.error("Failed to fetch members:", error);
            return [];
        }
    };

    const handleChange = (selectedOption: any) => {
        setSelectedMember(selectedOption);
    };

    const handleInvite = () => {
        if (selectedMember) {
            onInvite(selectedMember);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box w-[600px] max-w-none overflow-visible">
                <h2 className="text-xl font-bold mb-4">Invite Member</h2>
                <div className="mb-4">
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder="Search for a member..."
                    />
                </div>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn bg-custom-green-primary text-white"
                        onClick={handleInvite}
                        disabled={!selectedMember}
                    >
                        Invite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteMemberModal;
