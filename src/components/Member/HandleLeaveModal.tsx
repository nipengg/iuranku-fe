"use client"
import { useDispatch } from "react-redux";
import { GroupMember, LeaveGroupMember } from "@/model/Master/GroupModel";
import { AppDispatch } from "@/lib/store";
import { leaveGroup } from "@/lib/features/groupMemberSlice";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import { useState } from "react";

interface HandleLeaveProps {
    isOpen: boolean;
    onClose: () => void;
    groupMember: GroupMember;
    refreshTable: () => void;
}

const HandleLeave: React.FC<HandleLeaveProps> = ({ isOpen, onClose, groupMember, refreshTable }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [form, setForm] = useState({ 
        leave_note: ""
     });

     const handleChange = (e: any) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const handleKick = (groupMember: GroupMember, leaveNote: string) => {

        if (!groupMember.id) return;
        
        const form: LeaveGroupMember = {
            group_member_id: groupMember.id,
            leave_note: leaveNote
        };

        dispatch(leaveGroup(form))
            .then((res: any) => {
                if (res.payload.meta.code === StatusCodes.OK) {
                    toast.success(`Kick Success`);
                    refreshTable();
                }
            })
            .catch((err: any) => {
                toast.error(`Something went wrong. ${err.payload?.result?.error || err.message}`);
            });
        onClose();

    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box w-[600px] max-w-none overflow-visible">
                <h2 className="text-xl font-bold mb-4">Leave Member {groupMember.user?.name}</h2>
                <div className="mb-4">
                    <form className="space-y-6">
                        <div className="form-control">
                            <input
                                type="text"
                                name="leave_note"
                                onChange={handleChange}
                                placeholder="Leave Note"
                                className="input input-bordered input-md w-full"
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={() => handleKick(groupMember, form.leave_note)}
                        className="btn bg-custom-green-primary text-white"
                    >
                        Finalized Leave
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HandleLeave;
