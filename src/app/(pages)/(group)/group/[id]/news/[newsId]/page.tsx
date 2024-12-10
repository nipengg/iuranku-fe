"use client"
import { BACKEND_STORAGE } from "@/constant";
import { getGroupNewsDetail } from "@/lib/features/groupNewsSlice";
import { AppDispatch } from "@/lib/store";
import { GroupNews, GroupNewsInitial } from "@/model/Master/GroupNews";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/navigation";

async function fetchGroupNewsDetail(
    dispatch: AppDispatch,
    groupNewsId: string,
): Promise<any> {
    try {
        const response: any = await dispatch(
            getGroupNewsDetail({ group_news_id: groupNewsId })
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}

export default function DetailNews({ params }: { params: { id: string, newsId: string } }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [groupNews, setGroupNews] = useState<GroupNews>(GroupNewsInitial);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track error message

    useEffect(() => {
        fetchGroupNewsDetail(dispatch, params.newsId)
            .then((res) => {
                if (res.error) throw res;

                if (res.meta.code === StatusCodes.OK && res.result.data) {
                    setGroupNews(res.result.data);
                    setLoading(false);
                } else {
                    throw new Error('No news data found');
                }
            })
            .catch((err) => {
                setLoading(false);
                setError('Failed to load news detail. Please try again later.');
                toast.error(`Get Data Failed. ${err.payload?.result?.message || err.message}`);
            });
    }, [params.newsId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span>Loading...</span> {/* You can add a spinner here */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-bold">{error}</h2>
                    <button
                        onClick={() => router.push(`/group/${params.id}`)}
                        className="btn btn-primary mt-4"
                    >
                        Go back to Group News
                    </button>
                </div>
            </div>
        );
    }

    if (!groupNews) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-bold">No news found!</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start">
            <div className="w-full">
                <h1 className="text-sm">News Page</h1>
                <h1 className="font-bold text-3xl">{groupNews.news_title}</h1>
                <div className="divider m-2" />
            </div>
            <div className="w-full flex items-start">
                <div className="flex flex-col text-xs space-y-4">
                    <div className="flex space-x-4">
                        <h2>
                            by <strong>{groupNews.author.name}</strong> on{" "}
                            <strong>{moment(groupNews.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}</strong>
                        </h2>
                    </div>
                    <p className="text-sm">
                        <div dangerouslySetInnerHTML={{ __html: groupNews.content }} />
                    </p>
                </div>
                <img
                    src={BACKEND_STORAGE + groupNews.image}
                    alt="News Image"
                    width={400}
                    height={600}
                    className="rounded-md ml-4"
                />
            </div>
        </div>
    );
}
