"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { StatusCodes } from "http-status-codes";
import { getGroupNews } from "@/lib/features/groupNewsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { GroupNewsState } from "@/model/redux/GroupNews";
import { GroupNews } from "@/model/Master/GroupNews";
import CardGroupNews from "@/components/CardGroupNews";
import DeleteNewsModal from "@/components/Modal/DeleteNewsModal";
import { deleteGroupNews } from "@/lib/features/groupNewsSlice";
import SpinnerCircle from "@/components/Spinner/SpinnerCircle";
import { decryptData } from "@/utils/crypt";
import Link from "next/link";

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

export default function News({ params }: { params: { id: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const baseUrl = `/group/${params.id}/news`;

    const groupNewsState: GroupNewsState = useSelector(
        (state: RootState) => state.groupNews
    );

    const [groupNews, setGroupNews] = useState<GroupNews[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
    const [newsTitle, setNewsTitle] = useState<string>("");

    const itemsPerPage = 5;

    useEffect(() => {
        fetchGroupNews(dispatch, decryptData(decodeURIComponent(params.id)), currentPage, itemsPerPage).then((res) => {
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

    const handleDelete = async (newsId: string) => {
        try {
            if (!newsId) return;
            await dispatch(deleteGroupNews({ group_news_id: newsId }));
            setIsModalOpen(false);

            fetchGroupNews(dispatch, decryptData(decodeURIComponent(params.id)), currentPage, itemsPerPage).then((res) => {
                if (res.error) throw res;
                if (res.meta.code === StatusCodes.OK) {
                    setGroupNews(res.result.data || []);
                    setTotalPages(res.result.total_page || 1);
                }
            })
                .catch((err) => {
                    toast.error(`Get Data Failed. ${err.payload.result?.message}`);
                });

            toast.success("Group News deleted successfully");
        } catch (err) {
            toast.error("Failed to delete Group News");
        }
    };

    const openDeleteModal = (id: string, title: string) => {
        setSelectedNewsId(id);
        setNewsTitle(title);
        setIsModalOpen(true);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="text-black">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Group News</h1>
                <Link href={`${baseUrl}/create`} className="btn btn-success text-white btn-sm">
                    + Create News
                </Link>
            </div>
            <div className="divider" />

            {groupNewsState.isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <SpinnerCircle size="large" />
                </div>
            ) : (
                <>
                    {groupNews.length > 0 ?
                        groupNews.map((item: GroupNews, index) => (
                            <CardGroupNews
                                key={index}
                                groupNews={item}
                                groupId={params.id}
                                onDelete={openDeleteModal}
                            />
                        )) :
                        <>No Data Available.</>
                    }
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
            )}

            {/* Modal Component */}
            <DeleteNewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => selectedNewsId && handleDelete(selectedNewsId)}
                newsTitle={newsTitle}
            />
        </div>
    );
}
