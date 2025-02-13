import { TUITION_TYPE, TuitionTypeKey } from "@/constant";
import { getGroupTuitionSetting, insertUpdateGroupTuitionSetting } from "@/lib/features/groupTuitionSettingSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupTuitionSetting, GroupTuitionSettingInitial, InsertUpdateGroupTuitionSetting } from "@/model/Master/GroupTuitionSetting";
import { GroupTuitionSettingState } from "@/model/redux/GroupTuitionSetting";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";

interface SettingsProps {
    tuitionTypeKey: TuitionTypeKey
    groupId: string
}

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

const TuitionSettings: React.FC<SettingsProps> = ({ tuitionTypeKey, groupId }) => {

    const tuitionType = TUITION_TYPE[tuitionTypeKey];
    const dispatch = useDispatch<AppDispatch>();

    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const futureYears = 1;
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = Array.from({ length: currentYear + futureYears - startYear + 1 }, (_, index) => startYear + index);

    const groupTuitionSettingState: GroupTuitionSettingState = useSelector(
        (state: RootState) => state.groupTuitionSetting
    );

    const [tuitionSetting, setTuitionSetting] = useState<GroupTuitionSetting>({ ...GroupTuitionSettingInitial });

    const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(e.target.value));
    };

    const handleChange = (e: any) => {
        setTuitionSetting((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const fetchData = async () => {
        try {
            const res = await fetchGroupTuitionSetting(
                dispatch,
                decryptData(decodeURIComponent(groupId)),
                tuitionType.tuitionName,
                selectedYear
            );

            if (res.meta.code === StatusCodes.OK) {
                setTuitionSetting(res.result.data || GroupTuitionSettingInitial);
            } else {
                throw new Error(res.result.message);
            }
        } catch (err: any) {
            toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
        }
    };

    const handleInsertUpdateGroupTuitionSetting = () => {
        const form: InsertUpdateGroupTuitionSetting = {
            group_tuition_setting_id: tuitionSetting.id,
            group_id: Number(decryptData(decodeURIComponent(groupId))),
            tuition_value: tuitionSetting.tuition_value,
            tuition_period: selectedYear,
            type_tuition: tuitionType.tuitionName,
        };

        dispatch(insertUpdateGroupTuitionSetting(form)).then((res: any) => {
            if (res.error) throw res;
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`Setting Saved`);
                fetchData();
            }
        }).catch(function (err: any) {
            console.log(err);
            if (err.payload !== undefined) {
                toast.error(`Save Failed. ${err.payload.result.error}`);
            } else {
                toast.error(`Something went wrong...`);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    return (
        <div className="flex flex-col space-y-4 ml-4">
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium w-52">
                    Period
                </label>
                <div className="relative w-full max-w-xs">
                    <select className="select select-bordered w-28" name="tuition_period" value={selectedYear} onChange={handleChangePeriod}>
                        {years.map((yr) => (
                            <option key={yr} value={yr}>
                                {yr}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {groupTuitionSettingState.isLoading ? <SpinnerCircle size="large" /> :
                <>
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium w-52">
                            Contribution Value
                        </label>
                        <div className="relative w-full max-w-xs">
                            <label className="input input-bordered flex items-center gap-2">
                                Rp.
                                <input type="text" value={tuitionSetting.tuition_value} onChange={handleChange} name="tuition_value" className="grow" placeholder="Amount" readOnly={tuitionSetting.type_tuition?.tuition_for_period_count > 0} />
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div
                            className={`mt-3 ${tuitionSetting.type_tuition?.tuition_for_period_count > 0 ? "tooltip text-left" : ""}`}
                            data-tip={tuitionSetting.type_tuition?.tuition_for_period_count > 0 ? "Tuition already exists for this period." : ""}>
                            <button
                                onClick={handleInsertUpdateGroupTuitionSetting}
                                className="btn bg-custom-green-primary text-white btn-sm btn-wide"
                                disabled={tuitionSetting.type_tuition?.tuition_for_period_count > 0}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                </>
            }
        </div>
    );
};

export default TuitionSettings;
