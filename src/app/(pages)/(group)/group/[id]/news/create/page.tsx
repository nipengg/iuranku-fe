"use client";

import Editor from "@/components/Editor";
import { insertGroupNews } from "@/lib/features/groupNewsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import {
    InsertGroupNewsForm,
    InsertGroupNewsFormInitial,
} from "@/model/Master/GroupNews";
import { GroupNewsState } from "@/model/redux/GroupNews";
import { decryptData } from "@/utils/crypt";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CreateNews({ params }: { params: { id: string } }) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [form, setForm] = useState<InsertGroupNewsForm>({
        ...InsertGroupNewsFormInitial,
    });
    const user = useSelector((state: RootState) => state.auth.user);
    const groupNewsState: GroupNewsState = useSelector(
        (state: RootState) => state.groupNews
    );

    const handleChange = (e: any) => {
        if (e.target.name === "image") {
            setForm((prevState) => ({
                ...prevState,
                image: e.target.files ? e.target.files[0] : null,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    // Handle content change from the Editor
    const handleEditorChange = (value: string) => {
        setForm((prevState) => ({
            ...prevState,
            content: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const updatedForm: InsertGroupNewsForm = {
            ...form,
            author_id: user.id,
            group_id: Number.parseInt(
                decryptData(decodeURIComponent(params.id))
            ),
        };

        dispatch(insertGroupNews(updatedForm))
            .then((res: any) => {
                if (res.payload.meta.code == StatusCodes.OK) {
                    toast.success(`News Saved`);
                    router.push(`/group/${params.id}/news`);
                } else {
                    throw new Error(res.payload.result.message);
                }
            })
            .catch(function (err: any) {
                toast.error(
                    `Insert Data Failed. ${
                        err.payload?.result?.message || err.message
                    }`
                );
            });
    };

    return (
        <>
            <div className="text-black bg-white">
                <div className="flex mb-6">
                    <h1 className="text-4xl font-bold">Create Group News</h1>
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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
