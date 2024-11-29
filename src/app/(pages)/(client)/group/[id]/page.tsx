export default function Page ({ params }: { params: { id: string } }) {
    return (
        <>
            <h1 className="font-bold">Group Page {params.id}</h1>
        </>
    );
}