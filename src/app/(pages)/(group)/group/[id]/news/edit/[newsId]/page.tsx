"use client";

import Editor from "@/components/Editor";
import {
    getGroupNewsDetail,
    updateGroupNews,
} from "@/lib/features/groupNewsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { UpdateGroupNewsForm } from "@/model/Master/GroupNews";
import { GroupNewsState } from "@/model/redux/GroupNews";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EditNews({
    params,
}: {
    params: { id: string; newsId: string };
}) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [form, setForm] = useState<UpdateGroupNewsForm | null>(null);
    const groupNewsState: GroupNewsState = useSelector(
        (state: RootState) => state.groupNews
    );

    useEffect(() => {
        dispatch(getGroupNewsDetail({ group_news_id: params.newsId }))
            .then((res: any) => {
                if (res.payload.meta.code === StatusCodes.OK) {
                    setForm(res.payload.result.data);
                } else {
                    toast.error("Failed to load news data.");
                }
            })
            .catch((err: any) => {
                console.error(err);
                toast.error("Error fetching news.");
            });
    }, [dispatch, params.newsId]);

    const handleChange = (e: any) => {
        if (e.target.name === "image") {
            setForm((prevState) =>
                prevState
                    ? {
                          ...prevState,
                          image: e.target.files ? e.target.files[0] : null,
                      }
                    : null
            );
        } else {
            setForm((prevState) =>
                prevState
                    ? {
                          ...prevState,
                          [e.target.name]: e.target.value,
                      }
                    : null
            );
        }

        console.log(form);
    };

    const handleEditorChange = (value: string) => {
        setForm((prevState) =>
            prevState
                ? {
                      ...prevState,
                      content: value,
                  }
                : null
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!form) {
            toast.error("Form data is missing.");
            return;
        }

        const updatedForm: UpdateGroupNewsForm = {
            ...form,
            group_news_id: Number.parseInt(params.newsId),
        };

        dispatch(updateGroupNews(updatedForm))
            .then((res: any) => {
                if (res.payload.meta.code === StatusCodes.OK) {
                    toast.success("News updated successfully!");
                    router.push(`/group/${params.id}/news/${params.newsId}`);
                }
            })
            .catch((err: any) => {
                console.error(err);
                toast.error("Failed to update news.");
            });
    };

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="text-black bg-white">
                <div className="flex mb-6">
                    <h1 className="text-4xl font-bold">Edit Group News</h1>
                </div>
                <div className="divider m-0" />

                <form className="space-y-6">
                    {/* Title Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-bold">
                                Judul Berita
                            </span>
                        </label>
                        <input
                            type="text"
                            name="news_title"
                            value={form.news_title}
                            placeholder="Type here"
                            className="input input-bordered input-md w-full"
                            onChange={handleChange}
                            disabled={groupNewsState.isLoading ? true : false}
                        />
                    </div>

                    {/* Image Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-bold">
                                Gambar Berita
                            </span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            className="file-input file-input-bordered file-input-md w-full"
                            onChange={handleChange}
                            disabled={groupNewsState.isLoading ? true : false}
                        />
                    </div>

                    {/* Text Editor */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-bold">
                                Konten Berita
                            </span>
                        </label>
                        <Editor
                            value={form.content}
                            readOnly={groupNewsState.isLoading}
                            onChange={handleEditorChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control">
                        <button
                            className="btn bg-custom-green-primary w-1/12 text-lg mt-10 text-white hover:text-black"
                            onClick={handleSubmit}
                            disabled={groupNewsState.isLoading ? true : false}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
