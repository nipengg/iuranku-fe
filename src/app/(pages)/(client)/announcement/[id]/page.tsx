'use client';
import SpinnerCircle from "@/components/Spinner/SpinnerCircle";
import { getNewsDetail } from "@/lib/features/newsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { News, NewsInitial } from "@/model/Master/News";
import { NewsState } from "@/model/redux/News";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

async function fetchNewsDetail(
    dispatch: AppDispatch,
    newsId: string,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getNewsDetail({ news_id: newsId })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

export default function AnnouncementDetail({ params }: { params: { id: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const [news, setNews] = useState<News>(NewsInitial);

    const newsState: NewsState = useSelector(
        (state: RootState) => state.news
    );


    useEffect(() => {
        fetchNewsDetail(dispatch, params.id)
            .then((res) => {
                if (res.error) throw res;

                if (res.meta.code === StatusCodes.OK && res.result.data) {
                    setNews(res.result.data);
                } else {
                    throw new Error('No news data found');
                }
            })
            .catch((err) => {
                toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
            });
    }, [params.id]);

    if (newsState.isLoading) {
        return (
            <SpinnerCircle size="large" />
        );
    }

    return (
        <div className="flex flex-col items-start">
            <div className="w-full">
                <h1 className="text-sm">Announcement Page</h1>
                <h1 className="font-bold text-3xl">{news.news_title}</h1>
                <h2 className="text-sm">
                    by {" "} <strong>{news.author.name}</strong> on{" "}
                    <strong>{moment(news.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}</strong>
                </h2>
                <div className="divider m-2" />
            </div>
            <div className="w-full flex items-start">
                <div className="flex flex-col text-xs space-y-4">

                    <p className="text-sm">
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}
