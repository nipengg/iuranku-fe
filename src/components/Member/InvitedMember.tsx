import { getGroupApplication } from "@/lib/features/groupApplicationSlice";
import { getGroupMember } from "@/lib/features/groupSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupApplication } from "@/model/Master/GroupApplicationModel";
import { GroupApplicationState } from "@/model/redux/GroupApplication";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";
import moment from "moment";

interface Props {
    id: string
}

async function fetchGroupApplicationInvited(
    dispatch: AppDispatch,
    groupId: string,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupApplication({ group_id: groupId, status: "Pending", page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}


const InvitedMember: FunctionComponent<Props> = ({ id }) => {
    const [groupApplications, setGroupApplications] = useState<GroupApplication[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const dispatch = useDispatch<AppDispatch>();
    const groupApplicationState: GroupApplicationState = useSelector(
        (state: RootState) => state.groupApplication
    );

    const fetchData = async (page: number) => {
        try {
            const res = await fetchGroupApplicationInvited(dispatch, decryptData(decodeURIComponent(id)), page, itemsPerPage);
            if (res.meta.code === StatusCodes.OK) {
                setGroupApplications(res.result.data || []);
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

    if (groupApplicationState.isLoading) return <SpinnerCircle size="large" />;

    return (
        <div className="overflow-x-auto text-black">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Invited Date</th>
                    </tr>
                </thead>
                <tbody>
                    {groupApplications.map((application, index) => (
                        <tr key={application.id}>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{application.user?.name}</td>
                            <td>{application.user?.address}</td>
                            <td>{moment(application.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss")}</td>
                        </tr>
                    ))}
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
}

export default InvitedMember;