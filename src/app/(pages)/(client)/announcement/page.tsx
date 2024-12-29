'use client';
import CardNews from "@/components/News/CardNews";
import SpinnerCircle from "@/components/Spinner/SpinnerCircle";
import { getNews } from "@/lib/features/newsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { News } from "@/model/Master/News";
import { NewsState } from "@/model/redux/News";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

async function fetchNews(
    dispatch: AppDispatch,
    page: number,
    take: number
): Promise<any> {
    try {
        const response: any = await dispatch(
            getNews({ page, take })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

export default function Announcement() {

    const dispatch = useDispatch<AppDispatch>();

    const [news, setNews] = useState<News[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const newsState: NewsState = useSelector(
        (state: RootState) => state.news
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        fetchNews(dispatch, currentPage, itemsPerPage).then((res) => {
            if (res.error) throw res;
            if (res.meta.code === StatusCodes.OK) {
                setNews(res.result.data || []);
                setTotalPages(res.result.total_page || 1);
            }
        })
            .catch((err) => {
                toast.error(`Get Data Failed. ${err.payload.result?.message}`);
            });
    }, [currentPage]);

    return (
        <div className="text-black">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Announcement</h1>
            </div>
            <div className="divider" />
            {newsState.isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <SpinnerCircle size="large" />
                </div>
            ) : (
                <>
                    {news.length > 0 ?
                        news.map((item: News, index) => (
                            <CardNews key={index} news={item} />
                        ))
                        :
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
        </div>
    );
}
