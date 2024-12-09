

export default function GroupMember({ params }: { params: { id: string } }) {

    const baseUrl = `/group/${params.id}/member`;

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Group Member</h1>

                </div>
                <div className="divider" />
            </div>
        </>
    );
}