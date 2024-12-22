"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppDispatch, RootState } from "@/lib/store";
import { getTuitionRequest } from "@/lib/features/tuitionRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { RequestTuitionState } from "@/model/redux/RequestTuition";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import { RequestTuition } from "@/model/Master/RequestTuition";
import { FaEllipsisV } from "react-icons/fa";
import SpinnerCircle from "@/components/Spinner/SpinnerCircle";
import { formatRupiah } from "@/utils/format";
import FilePreviewModal from "@/components/Modal/FilePreviewModal";
import moment from "moment";
import RequestTuitionModal from "@/components/RequestTuition/RequestTuitionModal";
import CancelRequestTuitionModal from "@/components/RequestTuition/CancelRequestTuitionModal";
import { decryptData } from "@/utils/crypt";

async function fetchTuitionRequest(
    dispatch: AppDispatch,
    userId: number,
    groupId: string,
    year: number,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionRequest({ user_id: userId, group_id: groupId, period: year, page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

export default function GroupTuitionRequest({
    params,
}: {
    params: { id: string };
}) {
    const baseUrl = `/group/${params.id}/tuition-request`;
    const dispatch = useDispatch<AppDispatch>();

    const tuitionRequestState: RequestTuitionState = useSelector(
        (state: RootState) => state.tuitionRequest
    );
    const user = useSelector((state: RootState) => state.auth.user);

    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const futureYears = 1;
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = Array.from({ length: currentYear + futureYears - startYear + 1 }, (_, index) => startYear + index);

    const [requestTuition, setRequestTuition] = useState<RequestTuition[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    // Image Modal
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [isModalFileOpen, setIsModalFileOpen] = useState(false);

    // Request Add Modal
    const [isModalRequestOpen, setIsModalRequestOpen] = useState(false);

    // Cancel Modal
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
    const [cancelId, setCancelId] = useState<number>(0)

    const fetchData = async (page: number) => {
        try {
            const res = await fetchTuitionRequest(
                dispatch,
                user.id,
                decryptData(decodeURIComponent(params.id)),
                selectedYear,
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

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, selectedYear]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(e.target.value));
    };

    const openImagePreview = (url: string) => {
        setImagePreviewUrl(url);
        setIsModalFileOpen(true);
    };

    const closeImagePreviewModal = () => {
        setIsModalFileOpen(false);
        setImagePreviewUrl("");
    };

    const openRequestModal = () => {
        setIsModalRequestOpen(true);
    };

    const closeRequestModal = () => {
        setIsModalRequestOpen(false);
    };

    const openCancelModal = (id: number) => {
        setCancelId(id);
        setIsModalCancelOpen(true);
    };

    const closeCancelModal = () => {
        setIsModalCancelOpen(false);
    };


    return (
        <>
            <div className="text-black">
                <div className="flex justify-between mb-4">
                    <h1 className="text-4xl font-bold">
                        My Tuition Request
                    </h1>

                    <div>
                        <select className="select select-bordered w-28 mr-3" name="tuition_period" value={selectedYear} onChange={handleChangePeriod}>
                            {years.map((yr) => (
                                <option key={yr} value={yr}>
                                    {yr}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => openRequestModal()}
                            className="btn btn-success text-white btn-sm"
                        >
                            + Send Request
                        </button>

                        <RequestTuitionModal
                            isModalOpen={isModalRequestOpen}
                            onClose={closeRequestModal}
                            user={user}
                            groupId={params.id}
                            refreshTable={() => fetchData(currentPage)}
                        />
                    </div>
                </div>
                <div className="divider m-0" />

                {tuitionRequestState.isLoading ? <SpinnerCircle size="large" /> :
                    <>
                        <div className="container mx-auto pb-6">
                            <div className="text-black">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nominal Amount</th>
                                            <th>Remark</th>
                                            <th>Status</th>
                                            <td>Requested Date</td>
                                            <th>File</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestTuition.length > 0 ? (
                                            requestTuition.map((requestTuition, index) => (
                                                <tr key={requestTuition.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>{formatRupiah(requestTuition.nominal)}</td>
                                                    <td>{requestTuition.remark}</td>
                                                    <td>{requestTuition.status}</td>
                                                    <td>{moment(requestTuition.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}</td>
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
                                                                    <button onClick={() => openCancelModal(requestTuition.id ?? 0)}>
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
                                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                                    No data available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

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


                            <CancelRequestTuitionModal
                                isModalOpen={isModalCancelOpen}
                                onClose={closeCancelModal}
                                requestId={cancelId}
                                refreshTable={() => fetchData(currentPage)}
                            />

                            <FilePreviewModal
                                isModalOpen={isModalFileOpen}
                                onClose={closeImagePreviewModal}
                                url={imagePreviewUrl}
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
}
