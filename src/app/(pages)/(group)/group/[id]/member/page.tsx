import SectionHeadingWithTabs from "@/components/Member/SectionHeadingWithTabs";

export default function GroupMember({ params }: { params: { id: string } }) {
    
    const baseUrl = `/group/${params.id}/member`;
    const actions = [{ label: "Invite", action: () => console.log("Invite") }];

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Group Member</h1>
                </div>
                <SectionHeadingWithTabs id={params.id} />
            </div>
        </>
    );
}
