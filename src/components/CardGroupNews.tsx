"use client";

import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import { GroupNews } from "@/model/Master/GroupNews";
import moment from "moment";

interface Props {
    groupId: string;
    groupNews: GroupNews;
    onDelete: (id: string, title: string) => void;
}

const CardGroupNews: React.FC<Props> = ({ groupId, groupNews, onDelete }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div>
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <div className="flex">
                        <h2 className="font-bold text-2xl mb-2">
                            <Link
                                href={`/group/${groupId}/news/${groupNews.id}`}
                            >
                                {groupNews.news_title}
                            </Link>
                        </h2>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Author: <strong>{groupNews.author.name}</strong>,{" "}
                        {moment(groupNews.created_at?.toString()).format(
                            "MMMM Do YYYY, h:mm:ss a"
                        )}
                    </p>
                </div>
                <div className="relative mt-4">
                    <button
                        onClick={toggleDropdown}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <FaEllipsisV className="text-lg" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border">
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        className="block w-full text-left p-2 text-sm hover:bg-gray-200"
                                        href={`/group/${groupId}/news/edit/${groupNews.id}`}
                                    >
                                        Edit
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="block w-full text-left p-2 text-sm hover:bg-gray-200"
                                        onClick={() =>
                                            onDelete(
                                                String(groupNews.id),
                                                groupNews.news_title
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="divider" />
        </div>
    );
};

export default CardGroupNews;
