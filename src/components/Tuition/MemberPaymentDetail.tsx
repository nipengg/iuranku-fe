"use client";
import { MONTHS_CONSTAN } from "@/constant";
import { getTuitionMemberDetail } from "@/lib/features/tuitionSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupMember } from "@/model/Master/GroupModel";
import { TuitionMemberDetail } from "@/model/Master/Tuition";
import { TuitionState } from "@/model/redux/Tuition";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";


async function fetchTuitionMemberDetailRequest(
    dispatch: AppDispatch,
    memberId: string,
    typeTuition: string,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionMemberDetail({ member_id: memberId, type_tuition: typeTuition })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

interface MemberPaymentDetailProps {
    groupId: string;
    member: GroupMember;
    typeTuition: string;
}

const MemberPaymentDetail: React.FC<MemberPaymentDetailProps> = ({
    groupId,
    member,
    typeTuition,
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [tuitionMember, setTuitionMember] = useState<TuitionMemberDetail[]>([]);

    const tuitionState: TuitionState = useSelector(
        (state: RootState) => state.tuition
    );

    const fetchData = async () => {
        try {
            const res = await fetchTuitionMemberDetailRequest(
                dispatch,
                member.id?.toString() || "",
                typeTuition,
            );

            if (res.meta.code === StatusCodes.OK) {
                setTuitionMember(res.result.data || []);
            } else {
                throw new Error(res.result.message);
            }
        } catch (err: any) {
            toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full max-w-screen-lg mt-4">

            {tuitionState.isLoadingMemberDetail ? <SpinnerCircle size="large" /> :
                <>
                    {/* Table */}
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Year</th>
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
                                    <td>{item.year}</td>
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
                </>}
        </div>
    );
};

export default MemberPaymentDetail;
