import { getTuitionRequestById } from "@/lib/features/tuitionRequestSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { RequestTuition, RequestTuitionInitial } from "@/model/Master/RequestTuition";
import { StatusCodes } from "http-status-codes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Tabs from "../Tabs";
import { formatRupiah, getFirstDayOfMonth, getFirstDayOfMonthDate } from "@/utils/format";
import { getGroupTuitionSetting } from "@/lib/features/groupTuitionSettingSlice";
import { decryptData } from "@/utils/crypt";
import SpinnerCircle from "../Spinner/SpinnerCircle";
import { getTuitionByMemberId, insertTuition, setLoadingInsertTuition } from "@/lib/features/tuitionSlice";
import { InsertTuitionForm } from "@/model/Master/Tuition";

async function fetchGroupTuitionSetting(
    dispatch: AppDispatch,
    groupId: string,
    typeTuition: string,
    tuitionPeriod: number,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupTuitionSetting({ group_id: groupId, type_tuition: typeTuition, tuition_period: tuitionPeriod })
        );
        if (response.error) throw response;
        return response.payload;
    } catch (error) {
        throw error;
    }
}

async function fetchTuitionRequestById(
    dispatch: AppDispatch,
    requestId: number,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionRequestById({ request_tuition_id: requestId })
        );
        if (response.error) throw response;
        return response.payload;
    } catch (error) {
        throw error;
    }
}

async function fetchMemberTuition(
    dispatch: AppDispatch,
    memberId: number,
    typeTuition: string,
    period: number,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getTuitionByMemberId({ member_id: memberId, type_tuition: typeTuition, period: period })
        );
        if (response.error) throw response;
        return response.payload;
    } catch (error) {
        throw error;
    }
}

interface ManageTuitionModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    requestId: number;
    period: number;
    groupId: string;
    refreshTable: () => void;
}

const ManageTuitionModal: React.FC<ManageTuitionModalProps> = ({
    isModalOpen,
    onClose,
    requestId,
    period,
    groupId,
    refreshTable,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const tuitionState = useSelector((state: RootState) => state.tuition);
    const [activeTab, setActiveTab] = useState("Keamanan");
    const tabs = ["Keamanan", "Kebersihan", "Kematian"];

    // State for loading indicator
    const [loading, setLoading] = useState<boolean>(true);
    const [isRequestFetched, setIsRequestFetched] = useState<boolean>(false);

    // Data Request Tuition
    const [requestTuition, setRequestTuition] = useState<RequestTuition>({ ...RequestTuitionInitial });

    // State to hold tuition amounts dynamically fetched
    const [tuitionAmounts, setTuitionAmounts] = useState<Record<string, number>>({});

    // Remaining Balance
    const [remainingBalance, setRemainingBalance] = useState<number>(0);

    // Data Amount Yang Harus Di bayar setiap Bulannya
    const [tuitionAmountMonth, setTuitionAmountMonth] = useState<number[][]>([
        new Array(12).fill(0), // Iuran Keamanan
        new Array(12).fill(0), // Iuran Kebersihan
        new Array(12).fill(0), // Iuran Kematian
    ]);

    // Data yang belum di bayar
    const [unpaidAmounts, setUnpaidAmounts] = useState<number[][]>([
        new Array(12).fill(0), // Iuran Keamanan
        new Array(12).fill(0), // Iuran Kebersihan
        new Array(12).fill(0), // Iuran Kematian
    ]);

    // Data amount yang di check tiap bulan
    const [checkedAmountMonth, setCheckedAmountMonth] = useState<number[][]>([
        new Array(12).fill(0), // Iuran Keamanan
        new Array(12).fill(0), // Iuran Kebersihan
        new Array(12).fill(0), // Iuran Kematian
    ]);

    // Data Checklist Tiap Bulan
    const [checkedMonths, setCheckedMonths] = useState<boolean[][]>([
        new Array(12).fill(false), // Iuran Keamanan
        new Array(12).fill(false), // Iuran Kebersihan
        new Array(12).fill(false), // Iuran Kematian
    ]);

    // Ambil Total Check Amount Month
    const getTotal = () => {
        return checkedAmountMonth.reduce((total, row) => {
            return total + row.reduce((rowSum, value) => rowSum + value, 0);
        }, 0);
    };

    const handleCheckboxChange = (index: number) => {
        const tabIndex = tabs.indexOf(activeTab);
        const updatedCheckedAmountMonth = [...checkedAmountMonth];
        const updatedCheckedMonths = [...checkedMonths];
        const updatedUnpaidAmounts = [...unpaidAmounts];
        const updatedTuitionAmountMonth = [...tuitionAmountMonth];

        const tuitionAmountMonthVal = updatedTuitionAmountMonth[tabIndex][index];

        // If the current checkbox is checked, and the user tries to uncheck it
        if (checkedMonths[tabIndex][index]) {

            // Uncheck
            updatedCheckedMonths[tabIndex][index] = false;

            // Balikin Unpaid Amount
            updatedUnpaidAmounts[tabIndex][index] = tuitionAmountMonthVal;

            // Set Check Jadi 0 karena uncheck
            const restoreBalance = updatedCheckedAmountMonth[tabIndex][index];
            updatedCheckedAmountMonth[tabIndex][index] = 0;

            // Kurangi remaining balance dengan jumlah yang dibayar
            const newRemainingBalance = remainingBalance + restoreBalance;

            setCheckedMonths(updatedCheckedMonths);
            setRemainingBalance(newRemainingBalance);
            setUnpaidAmounts(updatedUnpaidAmounts);
            setCheckedAmountMonth(updatedCheckedAmountMonth);
        } else {

            // Yang Harus Di bayar
            let amountToPay = tuitionAmountMonthVal;

            // Check balance bayar full/partial, kalo partial jumlah bayar jadi pake sisa balance yang ada
            if (remainingBalance < tuitionAmountMonthVal) {
                // Update harga yang harus di bayar
                amountToPay = remainingBalance;
                toast.warn("Remaining balance is insufficient for full payment. Paying partial amount.");
            }

            // Kalau Balance masih ada, bisa bayar full/partial
            if (remainingBalance > 0) {

                // Update Checked Amount Month berdasarkan yang bisa di bayar
                updatedCheckedAmountMonth[tabIndex][index] = amountToPay;

                // Checked
                updatedCheckedMonths[tabIndex][index] = true;

                // Set Unpaid
                updatedUnpaidAmounts[tabIndex][index] -= amountToPay;

                // Kurang Remaining Balance dengan yang di bayar
                const newRemainingBalance = remainingBalance - amountToPay;

                setCheckedAmountMonth(updatedCheckedAmountMonth);
                setCheckedMonths(updatedCheckedMonths);
                setRemainingBalance(newRemainingBalance);
                setUnpaidAmounts(updatedUnpaidAmounts);
            } else {
                toast.error("Insufficient balance for this selection.");
            }
        }

        console.log(checkedAmountMonth)
    };

    // Fetch the data for the tuition request
    const fetchDataRequest = async () => {
        try {
            dispatch(setLoadingInsertTuition(true));
            const res = await fetchTuitionRequestById(dispatch, requestId);
            if (res.meta.code === StatusCodes.OK) {
                setRequestTuition(res.result.data || RequestTuitionInitial);
                setIsRequestFetched(true);
            } else {
                throw new Error(res.result.message);
            }
        } catch (err: any) {
            toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
        }
    };

    // Fetch the group tuition settings for all types
    const fetchTuitionSettings = async () => {
        if (!isRequestFetched) return
        try {
            const fetchedTuitionAmounts: Record<string, number> = {};
            const fetchedUnpaidAmounts: number[][] = [
                new Array(12).fill(0),
                new Array(12).fill(0),
                new Array(12).fill(0),
            ];
            const fetchedTuitionAmountMonth: number[][] = [
                new Array(12).fill(0),
                new Array(12).fill(0),
                new Array(12).fill(0),
            ];
            const fetchedCheckedAmountMonth: number[][] = [
                new Array(12).fill(0),
                new Array(12).fill(0),
                new Array(12).fill(0),
            ];

            // Fetch data for each type (Keamanan, Kebersihan, Kematian)
            let paidAmount = 0;
            for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                const tab = tabs[tabIndex];
                const data = await fetchGroupTuitionSetting(dispatch, decryptData(decodeURIComponent(groupId)), tab, period);

                // Update tuitionAmounts based on response
                fetchedTuitionAmounts[tab] = data.result.data.tuition_value;

                // Fetch member tuition data for each type
                const tuitionData = await fetchMemberTuition(dispatch, requestTuition.member.id || 0, tab, period);

                if (tuitionData.meta.code === StatusCodes.OK) {
                    // Create new arrays to prevent direct mutation of state
                    const updatedUnpaidAmounts = [...fetchedUnpaidAmounts[tabIndex]];
                    const updatedTuitionAmountMonth = [...fetchedTuitionAmountMonth[tabIndex]];
                    const updatedCheckedAmountMonth = [...fetchedCheckedAmountMonth[tabIndex]];
                    const updatedCheckedMonths = [...checkedMonths[tabIndex]];

                    // Initially, set all months to the tuition value
                    updatedUnpaidAmounts.fill(fetchedTuitionAmounts[tab], 0, 12);
                    updatedTuitionAmountMonth.fill(fetchedTuitionAmounts[tab], 0, 12);
                    updatedCheckedAmountMonth.fill(fetchedTuitionAmounts[tab], 0, 12);

                    // Process paid months
                    tuitionData.result.data.forEach((tuition: any) => {

                        if (tuition.request_tuition_id == requestTuition.id) {
                            paidAmount += tuition.nominal;
                        }

                        const monthIndex = new Date(tuition.period).getMonth();

                        // Mark the month as paid
                        updatedUnpaidAmounts[monthIndex] -= tuition.nominal;
                        updatedTuitionAmountMonth[monthIndex] -= tuition.nominal;

                        // If Fully Paid
                        if (updatedTuitionAmountMonth[monthIndex] <= 0 && updatedUnpaidAmounts[monthIndex] <= 0) {
                            updatedCheckedMonths[monthIndex] = true; // Mark as checked
                        }
                    });

                    // Update the state with the modified unpaid amounts and checked months
                    fetchedUnpaidAmounts[tabIndex] = updatedUnpaidAmounts;
                    fetchedTuitionAmountMonth[tabIndex] = updatedTuitionAmountMonth;
                    checkedMonths[tabIndex] = updatedCheckedMonths;
                }
            }

            // Set the fetched tuition amounts and unpaid amounts
            setRemainingBalance(requestTuition.nominal - paidAmount);
            setTuitionAmounts(fetchedTuitionAmounts);
            setTuitionAmountMonth(fetchedTuitionAmountMonth);
            setUnpaidAmounts(fetchedUnpaidAmounts);
            setCheckedAmountMonth(fetchedCheckedAmountMonth);
            setLoading(false); // Set loading to false when fetching is done
            dispatch(setLoadingInsertTuition(false));
        } catch (err: any) {
            toast.error(`Failed to fetch Contribution settings. ${err.message}`);
            setLoading(false); // Set loading to false even if there's an error
        }
    };

    const insertTuitionHandle = () => {

        if (requestTuition.id != 0 && requestTuition.id != null && requestTuition.member.id != 0 && requestTuition.member.id != null) {

            dispatch(setLoadingInsertTuition(true));

            const payloads: InsertTuitionForm[] = [];

            checkedMonths.forEach((tuitionType, typeIndex) => {
                tuitionType.forEach((isChecked, monthIndex) => {
                    if (isChecked && checkedAmountMonth[typeIndex][monthIndex] > 0) {
                        const amount = checkedAmountMonth[typeIndex][monthIndex];
                        const month = monthIndex + 1;
        
                        // Create the payload object
                        const payload: InsertTuitionForm = {
                            request_tuition_id: requestTuition.id || 0,
                            member_id: requestTuition.member.id || 0,
                            type_tuition: tabs[typeIndex],
                            nominal: amount,
                            period: getFirstDayOfMonthDate(period, month),
                        };

                        console.log(payload);
        
                        payloads.push(payload);
                    }
                });
            });

            dispatch(insertTuition(payloads)).then((res: any) => {
                if (res.payload.meta.code == StatusCodes.OK) {
                    onClose();
                    toast.success(`Contribution Saved`);
                }
            }).catch(function (err: any) {
                if (err.payload !== undefined) {
                    toast.error(`Insert Failed. ${err.payload.result.error}`);
                } else {
                    toast.error(`Something went wrong...`);
                }
            }).finally(function () {
                dispatch(setLoadingInsertTuition(false));
            });
        }
    };

    useEffect(() => {
        fetchDataRequest();
    }, [requestId]);

    useEffect(() => {
        fetchTuitionSettings();
    }, [isRequestFetched, groupId, period]);

    if (!isModalOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box w-[1000px] max-w-none overflow-auto hide-scrollbar">
                <h2 className="text-xl font-bold mb-4">Manage Contribution</h2>
                <div>Nominal Amount: {formatRupiah(requestTuition.nominal)}</div>
                <div>Nominal Amount Checked: {formatRupiah(getTotal())}</div>
                <div>Remaining Balance: {formatRupiah(remainingBalance)}</div>

                <div className="container mx-auto pb-6">
                    {/* Loading message */}
                    {loading ? (
                        <div className="text-center">
                            <SpinnerCircle size="large" />
                        </div>
                    ) : (
                        <>
                            {/* Tabs Component */}
                            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
                            <div className="mt-6 h-[420px] overflow-auto hide-scrollbar">
                                {tabs.map((tab, tabIndex) => (
                                    activeTab === tab && (
                                        <div key={tabIndex}>
                                            <table className="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th>Month</th>
                                                        <th>Contribution Amount</th>
                                                        <th>Amount to be Paid</th>
                                                        <th>Selected</th>
                                                        <th>Unpaid</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: 12 }).map((_, index) => {
                                                        const month = new Date(2024, index).toLocaleString('default', { month: 'long' });
                                                        const tuitionAmount = tuitionAmounts[tab] || 0;
                                                        const tuitionAmountMonthVal = tuitionAmountMonth[tabIndex][index];
                                                        const unpaidAmount = unpaidAmounts[tabIndex][index];
                                                        return (
                                                            <tr key={index}>
                                                                <td>{month}</td>
                                                                <td>{formatRupiah(tuitionAmount)}</td>
                                                                <td>{formatRupiah(tuitionAmountMonthVal)}</td>
                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={checkedMonths[tabIndex][index]}
                                                                        disabled={tuitionAmountMonthVal == 0 ? true : false}
                                                                        onChange={() => handleCheckboxChange(index)}
                                                                    />
                                                                </td>
                                                                <td>{formatRupiah(unpaidAmount)}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose} disabled={tuitionState.isLoadingInsertTuition}>
                        Close
                    </button>
                    <button className="btn bg-custom-green-primary text-white" onClick={insertTuitionHandle} disabled={tuitionState.isLoadingInsertTuition}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageTuitionModal;
