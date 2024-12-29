"use client";

import Link from "next/link";
import { News } from "@/model/Master/News";
import moment from "moment";

interface Props {
    news: News;
}

const CardNews: React.FC<Props> = ({ news }) => {

    return (
        <div>
            <div className="flex justify-between items-start">
                <div className="flex flex-col">

                    <div className="flex">
                        <h2 className="font-bold text-2xl mb-2">
                            <Link href={`/announcement/${news.id}`}>
                                {news.news_title}
                            </Link>
                        </h2>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Author: <strong>{news.author.name}</strong>, {moment(news.created_at?.toString()).format("MMMM Do YYYY, h:mm:ss a")}
                    </p>

                </div>

            </div>
            <div className="divider" />
        </div>
    );
};

export default CardNews;
