"use client";

import { getGroupNews } from "@/lib/features/groupNewsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupNews } from "@/model/Master/GroupNews";
import { GroupNewsState } from "@/model/redux/GroupNews";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerCircle from "../Spinner/SpinnerCircle";

async function fetchGroupNews(
    dispatch: AppDispatch,
    groupId: string,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupNews({ group_id: groupId, page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

interface Props {
    groupId: string;
}

const TabBerita: React.FC<Props> = ({ groupId }) => {

    const dispatch = useDispatch<AppDispatch>();

    const [groupNews, setGroupNews] = useState<GroupNews[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 3;

    const groupNewsState: GroupNewsState = useSelector(
        (state: RootState) => state.groupNews
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        fetchGroupNews(dispatch, decryptData(decodeURIComponent(groupId)), currentPage, itemsPerPage).then((res) => {
            if (res.error) throw res;
            if (res.meta.code === StatusCodes.OK) {
                setGroupNews(res.result.data || []);
                setTotalPages(res.result.total_page || 1);
            }
        })
            .catch((err) => {
                toast.error(`Get Data Failed. ${err.payload.result?.message}`);
            });
    }, [currentPage]);

    return (
        <div className="card bg-transparent shadow-md p-4 border flex-1">
            <div className="flex justify-between border-b pb-2 mb-4">
                <h2 className="font-bold text-lg">Tab Berita</h2>
            </div>
            <div className="space-y-4">

                {
                    groupNewsState.isLoading ? <SpinnerCircle size="large" /> :
                        groupNews.length > 0 ? groupNews.map((item, index) => (
                            <>
                                <div key={index} className="flex items-center space-x-4">
                                    <div>
                                        <div className="flex">
                                            <p className="font-semibold mr-3">
                                                <Link href={`/group/${groupId}/news/${item.id}`}>
                                                    {item.news_title}
                                                </Link>
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Author: <strong>{item.author.name}</strong>, {moment(item.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={handlePreviousPage}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Previous
                                    </button>
                                    <span>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={handleNextPage}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )) : <>No Data Available.</>
                }
            </div>
        </div>
    );
};

export default TabBerita;
