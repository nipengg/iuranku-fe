"use client";
import { MONTHS_CONSTAN } from "@/constant";
import { getTuitionMember } from "@/lib/features/tuitionSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { TuitionMember } from "@/model/Master/Tuition";
import { TuitionState } from "@/model/redux/Tuition";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";
import { GroupMember, GroupMemberInitial } from "@/model/Master/GroupModel";

const MemberDetailModal = lazy(() => import("./MemberDetailModal"));

async function fetchTuitionMemberRequest(
    dispatch: AppDispatch,
    groupId: string,
    year: number,
    typeTuition: string,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionMember({ group_id: groupId, period: year, type_tuition: typeTuition, page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

interface TuitionMemberProps {
    groupId: string;
    typeTuition: string;
}

const MemberPaymentTable: React.FC<TuitionMemberProps> = ({
    groupId,
    typeTuition,
}) => {

    const dispatch = useDispatch<AppDispatch>();

    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const futureYears = 1;
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = Array.from({ length: currentYear + futureYears - startYear + 1 }, (_, index) => startYear + index);

    const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(e.target.value));
    };

    const tuitionState: TuitionState = useSelector(
        (state: RootState) => state.tuition
    );

    const [tuitionMember, setTuitionMember] = useState<TuitionMember[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const [isModalMemberOpen, setIsModalMemberOpen] = useState(false);
    const [modalMemberDetail, setModalMemberDetail] = useState<GroupMember>({ ...GroupMemberInitial });

    const openModalMember = (member: GroupMember) => {
        setModalMemberDetail(member);
        setIsModalMemberOpen(true);
    };

    const closeModalMember = () => {
        setIsModalMemberOpen(false);
    };

    const fetchData = async (page: number) => {
        try {
            const res = await fetchTuitionMemberRequest(
                dispatch,
                decryptData(decodeURIComponent(groupId)),
                selectedYear,
                typeTuition,
                page,
                itemsPerPage
            );

            if (res.meta.code === StatusCodes.OK) {
                setTuitionMember(res.result.data || []);
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

    return (
        <div className="overflow-x-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <select className="select select-bordered w-28 mr-3" name="tuition_period" value={selectedYear} onChange={handleChangePeriod}>
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>
            </div>

            {tuitionState.isLoading ? <SpinnerCircle size="large" /> :
                <>
                    {/* Table */}
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-left">User</th>
                                {MONTHS_CONSTAN.map((month) => (
                                    <th key={month} className="text-center">
                                        {month}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tuitionMember.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href="#" onClick={() => openModalMember(item.member)}  className="text-gray-500 hover:text-blue-500 underline">{item.member.user?.name}</a>
                                    </td>
                                    {MONTHS_CONSTAN.map((_, monthIndex) => (
                                        <td key={monthIndex} className="text-center">
                                            {item.monthlyStatus[monthIndex + 1] ? (
                                                <span className="text-green-500">✔</span>
                                            ) : (
                                                <span className="text-red-500">✘</span>
                                            )}
                                        </td>
                                    ))}
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

                    <MemberDetailModal isModalOpen={isModalMemberOpen} groupId={groupId} onClose={closeModalMember} member={modalMemberDetail} />
                </>
            }
        </div>
    );
};

export default MemberPaymentTable;
