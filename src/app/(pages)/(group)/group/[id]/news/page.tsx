import CardGroupNews from "@/components/CardGroupNews";
import GroupList from "@/components/GroupList";
import Link from "next/link";

export default function News({ params }: { params: { id: string } }) {

    const baseUrl = `/group/${params.id}/news`;

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Group News</h1>
                    <Link href={baseUrl+"/create"} className="btn btn-success text-white btn-sm">
                        + Create News
                    </Link>
                </div>
                <div className="divider" />
                <CardGroupNews groupId={params.id} newsId="1" />
            </div>
        </>
    );
}