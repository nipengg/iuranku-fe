"use client"
import HandleInvitationModal from "@/components/Invitation/HandleInvitationModal";
import AcceptModal from "@/components/Invitation/HandleInvitationModal";
import SpinnerCircle from "@/components/Spinner/SpinnerCircle";
import { getGroupApplication, handleGroupApplication } from "@/lib/features/groupApplicationSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupApplication, GroupApplicationHandle } from "@/model/Master/GroupApplicationModel";
import { GroupApplicationState } from "@/model/redux/GroupApplication";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

async function fetchGroupApplicationInvited(
    dispatch: AppDispatch,
    userId: number,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupApplication({ user_id: userId, status: "Pending", page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}


const Invitation: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<{
        isAccept: boolean;
        title: string;
        content: string;
        onConfirm: () => void;
    }>({
        isAccept: false,
        title: "",
        content: "",
        onConfirm: () => { },
    });

    const [groupApplications, setGroupApplications] = useState<GroupApplication[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const dispatch = useDispatch<AppDispatch>();
    const groupApplicationState: GroupApplicationState = useSelector(
        (state: RootState) => state.groupApplication
    );
    const user = useSelector((state: RootState) => state.auth.user);

    const fetchData = async (page: number) => {
        try {
            const res = await fetchGroupApplicationInvited(dispatch, user.id, page, itemsPerPage);
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

    const handleOpenModal = (applicationId: number, action: "accept" | "reject") => {
        const isAccept = action === "accept";
        setModalConfig({
            isAccept: isAccept,
            title: isAccept ? "Accept Invitation" : "Reject Invitation",
            content: isAccept
                ? "Are you sure you want to accept this invitation?"
                : "Are you sure you want to reject this invitation?",
            onConfirm: () => handleGroupApplicationAction(applicationId, isAccept ? "Accepted" : "Rejected"),
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleGroupApplicationAction = (applicationId: number, status: string) => {
        const form: GroupApplicationHandle = {
            status,
            group_application_id: applicationId,
        };

        dispatch(handleGroupApplication(form))
            .then((res: any) => {
                if (res.payload.meta.code === StatusCodes.OK) {
                    toast.success(`Application ${status}`);
                    fetchData(currentPage);
                }
            })
            .catch((err: any) => {
                toast.error(`Something went wrong. ${err.payload?.result?.error || err.message}`);
            });
        closeModal();
    };

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Group Invitation</h1>
                </div>
                <div className="divider" />

                {groupApplicationState.isLoading ? <SpinnerCircle size="large" /> :
                    <div className="overflow-x-auto text-black">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Group Name</th>
                                    <th>Address</th>
                                    <th>Invited Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupApplications.length > 0 ? (
                                    groupApplications.map((application, index) => (
                                        <tr key={application.id}>
                                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                            <td>{application.group?.group_name}</td>
                                            <td>{application.group?.group_address}</td>
                                            <td>{moment(application.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss")}</td>
                                            <td>
                                                <div className="dropdown dropdown-left">
                                                    <button className="btn btn-ghost btn-sm">
                                                        <FaEllipsisV className="text-lg" />
                                                    </button>
                                                    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                        <li>
                                                            <button onClick={() => handleOpenModal(application.id ?? 0, "accept")}>
                                                                Accept
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => handleOpenModal(application.id ?? 0, "reject")}>
                                                                Reject
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-gray-500">
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

                        <HandleInvitationModal
                            isOpen={isModalOpen}
                            title={modalConfig.title}
                            onClose={closeModal}
                            onConfirm={modalConfig.onConfirm}
                            isAccept={modalConfig.isAccept}
                        >
                            {modalConfig.content}
                        </HandleInvitationModal>
                    </div>
                }
            </div>
        </>
    )
}

export default Invitation