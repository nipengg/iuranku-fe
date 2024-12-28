import GroupList from "@/components/GroupList";

export default function groupNews() {
    return (
        <div className="text-black">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Group News</h1>
                <button className="btn btn-success text-white btn-sm w-1/5">
                    + Create News
                </button>
            </div>
            <div className="divider" />
            <GroupList />
        </div>
    );
}
