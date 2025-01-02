"use client";
import GroupCard from "@/components/Card/GroupCard";
import PageSkeleton from "@/components/Skeleton/PageSkeleton";
import TabBerita from "@/components/TabBerita/TabBerita";
import TabPengunguman from "@/components/TabPengunguman/TabPengunguman";
import compCaSlide from "@/components/CompCaSlide/CompCaSlide";
import { getGroupMember } from "@/lib/features/groupSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupMember } from "@/model/Master/GroupModel";
import { User } from "@/model/Master/UserModel";
import { GroupState } from "@/model/redux/Group";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CompCaSlide from "@/components/CompCaSlide/CompCaSlide";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

async function fetchGroupMember(
    dispatch: AppDispatch,
    userId: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupMember({ user_id: userId })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const userState: User = useSelector((state: RootState) => state.auth.user);
    const groupState: GroupState = useSelector(
        (state: RootState) => state.group
    );
    const [groupMember, setGroupMember] = useState<GroupMember[]>([]);

    useEffect(() => {
        fetchGroupMember(dispatch, userState.id)
            .then((res) => {
                if (res.error) throw res;

                if (res.meta.code == StatusCodes.OK) {
                    setGroupMember(res.result.groups || []);
                }
            })
            .catch(function (err) {
                toast.error(`Get Data Failed. ${err.payload.result?.message}`);
            });
    }, []);

    return (
        <>
            <h1 className="font-bold text-2xl mb-5">Your Groups</h1>
            {groupState.isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    {groupMember.length !== 0 ? (
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
                    ) : (
                        <>
                            <p>You haven&apos;t joined a group yet.</p>
                            <p>
                                Try visiting the Group Invitation page to view
                                any invitations.
                            </p>
                            <Link
                                href={`/invitation`}
                                className="btn bg-custom-green-primary text-white mt-6"
                            >
                                Group Invitation
                            </Link>
                        </>
                    )}
                </>
            )}
        </>
    );
}
