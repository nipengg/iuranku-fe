"use client";
import { MONTHS_CONSTAN } from "@/constant";
import { AppDispatch, RootState } from "@/lib/store";
import { TuitionState } from "@/model/redux/Tuition";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";
import { GroupMember, GroupMemberInitial } from "@/model/Master/GroupModel";
import { getTuitionMemberPayment } from "@/lib/features/tuitionSlice";
import { User } from "@/model/Master/UserModel";
import { MonthlyStatus, Tuition, TuitionInitial, TuitionMemberPayment } from "@/model/Master/Tuition";
import { formatRupiah } from "@/utils/format";
import TuitionPaymentDetailModal from "./TuitionPaymentDetailModal";
import { FaEllipsisV } from "react-icons/fa";

async function fetchTuitionMemberPayment(
    dispatch: AppDispatch,
    userId: number,
    groupId: string,
    year: number,
    typeTuition: string,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionMemberPayment({ user_id: userId, group_id: groupId, period: year, type_tuition: typeTuition })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

interface TuitionPaymentProps {
    groupId: string;
    typeTuition: string;
    year: number;
}

const TuitionPayment: React.FC<TuitionPaymentProps> = ({
    groupId,
    typeTuition,
    year,
}) => {

    const dispatch = useDispatch<AppDispatch>();

    const [tuitionPayment, setTuitionPayment] = useState<TuitionMemberPayment>();

    const [isModalPaymentDetailOpen, setIsModalPaymentDetail] = useState(false);
    const [modalPaymentDetail, setModalPaymentDetail] = useState<Tuition[]>([]);

    const openModalPaymentDetail = (tuition: Tuition[]) => {
        setModalPaymentDetail(tuition);
        setIsModalPaymentDetail(true);
    };

    const closeModalPaymentDetail = () => {
        setIsModalPaymentDetail(false);
    };


    const tuitionState: TuitionState = useSelector(
        (state: RootState) => state.tuition
    );
    const user: User = useSelector((state: RootState) => state.auth.user);

    const fetchData = async () => {
        try {
            const res = await fetchTuitionMemberPayment(
                dispatch,
                user.id,
                decryptData(decodeURIComponent(groupId)),
                year,
                typeTuition,
            );

            if (res.meta.code === StatusCodes.OK) {
                setTuitionPayment(res.result.data || []);
                console.log(res.result.data);
            } else {
                throw new Error(res.result.message);
            }
        } catch (err: any) {
            toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, [year]);

    return (
        <div className="overflow-x-auto p-6">

            {tuitionState.isLoading ? <SpinnerCircle size="large" /> :
                <>
                    {/* Table */}
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Month</th>
                                <th className="text-left">Tuition Amount</th>
                                <th className="text-left">Paid</th>
                                <th className="text-left">Transaction Count</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tuitionPayment?.monthlyStatus.map((item: MonthlyStatus, index) => {
                                return (
                                    <tr key={index} className={(item.paidAmount >= item.tuitionAmount) && item.tuitionAmount != 0 ? "bg-green-100" : "bg-yellow-50"}>
                                        <td>{MONTHS_CONSTAN[item.month - 1]}</td>
                                        <td>{formatRupiah(item.tuitionAmount)}</td>
                                        <td>{formatRupiah(item.paidAmount)}</td>
                                        <td>{item.tuition.length} Transaction</td>
                                        <td>
                                            <div className="dropdown dropdown-left">
                                                <button className="btn btn-ghost btn-sm">
                                                    <span className="material-icons"><FaEllipsisV className="text-lg" /></span>
                                                </button>
                                                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                    <li>
                                                        <button onClick={() => openModalPaymentDetail(item.tuition)}>
                                                            Detail
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    {
                                        tuitionPayment !== undefined ?
                                            formatRupiah(Object.values(tuitionPayment?.monthlyStatus).reduce((a, b) => a + b.tuitionAmount, 0)) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        tuitionPayment !== undefined ?
                                            formatRupiah(Object.values(tuitionPayment?.monthlyStatus).reduce((a, b) => a + b.paidAmount, 0)) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        tuitionPayment !== undefined ?
                                            Object.values(tuitionPayment?.monthlyStatus).reduce((a, b) => a + b.tuition.length, 0) + " Transaction" : 0 + "Transaction"
                                    }
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <TuitionPaymentDetailModal isModalOpen={isModalPaymentDetailOpen} onClose={closeModalPaymentDetail} tuitions={modalPaymentDetail} />
                </>
            }
        </div>
    );
};

export default TuitionPayment;
