'use client';
import GroupCard from "@/components/Card/GroupCard";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import { getGroupMember } from "@/lib/features/groupSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupMember } from "@/model/Master/GroupModel";
import { User } from "@/model/Master/UserModel";
import { GroupState } from "@/model/redux/Group";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

async function fetchGroupMember(dispatch: AppDispatch, userId: number): Promise<any> {
    const response = await dispatch(getGroupMember({ user_id: userId }));
    return response.payload;
}

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const userState: User = useSelector((state: RootState) => state.auth.user);
    const groupState: GroupState = useSelector((state: RootState) => state.group);
    const [groupMember, setGroupMember] = useState<GroupMember[]>([]);

    useEffect(() => {
        fetchGroupMember(dispatch, userState.id).then((res) => {
            if (res?.meta?.code == StatusCodes.OK) {
                setGroupMember(res.result.groups || []);
            } else {
                toast.error(`Get Data Failed`);
            }
        });
    }, []);

    return (
        <>
            <h1 className="font-bold text-2xl mb-5">Dashboard Page</h1>
            {
                groupState.isLoading ? <PageSkeleton /> :
                    <>
                        <div className="grid grid-cols-3 gap-4">
                            {groupMember.map((item: GroupMember, index) => {
                                return (
                                    <div className="col-span-1" key={index}>
                                        <GroupCard groupMember={item} />
                                    </div>
                                );
                            })}
                        </div>
                    </>
            }
        </>
    )
}