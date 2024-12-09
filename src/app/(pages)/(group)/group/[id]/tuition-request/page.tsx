import PaymentTable from "@/components/PaymentTable";

export default function GroupTuitionRequest({
    params,
}: {
    params: { id: string };
}) {
    const baseUrl = `/group/${params.id}/setting`;

    return (
        <>
            <div className="text-black">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">
                        Group Tuition Request
                    </h1>
                </div>
                <div className="divider" />
                <PaymentTable />
            </div>
        </>
    );
}
