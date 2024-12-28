"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { getTuitionRequest } from "@/lib/features/tuitionRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { StatusCodes } from "http-status-codes";
import { RequestTuition } from "@/model/Master/RequestTuition";
import { decryptData } from "@/utils/crypt";
import { toast } from "react-toastify";
import { formatRupiah } from "@/utils/format";
import moment from "moment";
import { FaEllipsisV } from "react-icons/fa";
import FilePreviewModal from "../Modal/FilePreviewModal";
import { RequestTuitionState } from "@/model/redux/RequestTuition";
import SpinnerCircle from "../Spinner/SpinnerCircle";

interface Props {
    groupId: string;
    period: number;
}

async function fetchTuitionRequest(
    dispatch: AppDispatch,
    groupId: string,
    year: number,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionRequest({ group_id: groupId, period: year, status: "Fully Approved", page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

const ManageTuitionModal = lazy(() => import("./ManageTuitionModal"));

const RequestManagement: React.FC<Props> = ({ groupId, period }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [requestTuition, setRequestTuition] = useState<RequestTuition[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    // Image Modal
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [isModalFileOpen, setIsModalFileOpen] = useState(false);

    // Handled Modal
    const [isModalHandleOpen, setIsModalHandleOpen] = useState(false);
    const [handleId, setHandleId] = useState<number>(0);

    const openHandleModal = (id: number) => {
        setHandleId(id);
        setIsModalHandleOpen(true);
    };

    const closeHandleModal = () => {
        setIsModalHandleOpen(false);
    };


    const tuitionRequestState: RequestTuitionState = useSelector(
        (state: RootState) => state.tuitionRequest
    );

    const fetchData = async (page: number) => {
        try {
            const res = await fetchTuitionRequest(
                dispatch,
                decryptData(decodeURIComponent(groupId)),
                period,
                page,
                itemsPerPage
            );

            if (res.meta.code === StatusCodes.OK) {
                setRequestTuition(res.result.data || []);
                setTotalPages(res.result.total_page || 1);
            } else {
                throw new Error(res.result.message);
            }
        } catch (err: any) {
            toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
        }
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const openImagePreview = (url: string) => {
        setImagePreviewUrl(url);
        setIsModalFileOpen(true);
    };

    const closeImagePreviewModal = () => {
        setIsModalFileOpen(false);
        setImagePreviewUrl("");
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [period]);

    return (
        <>
            <div className="text-black">
                <div className="container mx-auto pb-6">
                    <div className="text-black">
                        {
                            tuitionRequestState.isLoading ? <SpinnerCircle size="large" /> :
                                <>
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Member</th>
                                                <th>Nominal Amount</th>
                                                <th>Remark</th>
                                                <th>Status</th>
                                                <td>Requested Date</td>
                                                <td>Approve Date</td>
                                                <th>File</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requestTuition.length > 0 ? (
                                                requestTuition.map((requestTuition, index) => (
                                                    <tr key={requestTuition.id}>
                                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                        <td>{requestTuition.member.user?.name}</td>
                                                        <td>{formatRupiah(requestTuition.nominal)}</td>
                                                        <td>{requestTuition.remark}</td>
                                                        <td>{requestTuition.status}</td>
                                                        <td>{moment(requestTuition.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                                        <td>{moment(requestTuition.updated_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}</td>
                                                        <td>
                                                            {requestTuition.file && (
                                                                <button
                                                                    onClick={() => openImagePreview(requestTuition.file)}
                                                                    className="btn bg-custom-green-primary text-white"
                                                                >
                                                                    Preview
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="dropdown dropdown-left">
                                                                <button className="btn btn-ghost btn-sm">
                                                                    <span className="material-icons"><FaEllipsisV className="text-lg" /></span>
                                                                </button>
                                                                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                                    <li>
                                                                        <button  onClick={() => openHandleModal(requestTuition.id ?? 0)}>
                                                                            Manage
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="text-center py-4 text-gray-500">
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
                                </>
                        }
                    </div>

                    {/* Lazy-loaded Manage Tuition Modal */}
                    {isModalHandleOpen && (
                        <Suspense fallback={<SpinnerCircle size="large" />}>
                            <ManageTuitionModal
                                isModalOpen={isModalHandleOpen}
                                onClose={closeHandleModal}
                                requestId={handleId}
                                period={period}
                                groupId={groupId}
                                refreshTable={() => fetchData(currentPage)}
                            />
                        </Suspense>
                    )}

                    <FilePreviewModal
                        isModalOpen={isModalFileOpen}
                        onClose={closeImagePreviewModal}
                        url={imagePreviewUrl}
                    />
                </div>
            </div>
        </>
    );
}

export default RequestManagement;