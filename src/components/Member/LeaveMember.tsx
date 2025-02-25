"use client"
import { getGroupMembers } from "@/lib/features/groupMemberSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupMember } from "@/model/Master/GroupModel";
import { GroupMemberState } from "@/model/redux/GroupMember";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";
import moment from "moment";

interface Props {
    id: string;
}

async function fetchGroupMembers(
    dispatch: AppDispatch,
    groupId: string,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupMembers({ group_id: groupId, status: "Inactive", page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

const LeaveMember: React.FunctionComponent<Props> = ({ id }) => {
    const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const dispatch = useDispatch<AppDispatch>();
    const groupMembersState: GroupMemberState = useSelector(
        (state: RootState) => state.groupMember
    );

    const fetchData = async (page: number) => {
        try {
            const res = await fetchGroupMembers(
                dispatch,
                decryptData(decodeURIComponent(id)),
                page,
                itemsPerPage
            );

            if (res.meta.code === StatusCodes.OK) {
                setGroupMembers(res.result.data || []);
                setTotalPages(res.result.total_page || 1);
            } else {
                throw new Error(res.result.message);
            }
        } catch (err: any) {
            toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (groupMembersState.isLoading) return <SpinnerCircle size="large" />;

    return (
        <div className="overflow-x-auto text-black">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Member Type</th>
                        <th>Joined Date</th>
                        <th>Leave Date</th>
                        <th>Leave Note</th>
                    </tr>
                </thead>
                <tbody>
                    {groupMembers.length > 0 ? (
                        groupMembers.map((member, index) => (
                            <tr key={member.id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>{member.user?.name}</td>
                                <td>{member.user?.address}</td>
                                <td>{member.member_type?.member_type_name}</td>
                                <td>{moment(member.join_date?.toString()).format("MMMM Do YYYY, h:mm:ss")}</td>
                                <td>{moment(member.leave_date?.toString()).format("MMMM Do YYYY, h:mm:ss")}</td>
                                <td>{member.leave_note}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="join mt-4 flex justify-center">
                <button
                    className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                <button className="join-item btn">
                    Page {currentPage} of {totalPages}
                </button>
                <button
                    className={`join-item btn ${currentPage === totalPages ? "btn-disabled" : ""}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default LeaveMember;