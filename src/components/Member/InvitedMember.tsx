import { getGroupApplication, handleGroupApplication } from "@/lib/features/groupApplicationSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupApplication, GroupApplicationHandle } from "@/model/Master/GroupApplicationModel";
import { GroupApplicationState } from "@/model/redux/GroupApplication";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";
import moment from "moment";
import { FaEllipsisV } from "react-icons/fa";
import CancelModal from "./CancelInviteModal";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationToCancel, setApplicationToCancel] = useState<number>(0);

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

    const handleOpenModalCancel = (applicationId: number) => {
        setApplicationToCancel(applicationId);
        setIsModalOpen(true);
    };

    const handleCancelMember = (selectedApplicationId: number) => {
        const cancelForm: GroupApplicationHandle = {
            status: "Canceled",
            group_application_id: selectedApplicationId
        };

        dispatch(handleGroupApplication(cancelForm)).then((res: any) => {    
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`Application Canceled`);
                fetchData(currentPage);
            }
        }).catch(function (err: any) {
            console.log(err);
            if (err.payload !== undefined) {
                toast.error(`Canceled Failed. ${err.payload.result.error}`);
            } else {
                toast.error(`Something went wrong...`);
            }
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setApplicationToCancel(0);
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {groupApplications.length > 0 ? (
                        groupApplications.map((application, index) => (
                            <tr key={application.id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>{application.user?.name}</td>
                                <td>{application.user?.address}</td>
                                <td>{moment(application.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss")}</td>
                                <td>
                                    <div className="dropdown dropdown-left">
                                        <button className="btn btn-ghost btn-sm">
                                            <FaEllipsisV className="text-lg" />
                                        </button>
                                        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                            <li>
                                                <button onClick={() => handleOpenModalCancel(application.id ?? 0)}>
                                                    Cancel
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

            <CancelModal
                isModalOpen={isModalOpen}
                onClose={closeModal}
                onConfirmCancel={handleCancelMember}
                applicationId={applicationToCancel}
            />
        </div>
    );
};

export default InvitedMember;
