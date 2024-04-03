export const dynamic = "force-dynamic";

export default async function User () {
    await new Promise((res) => setTimeout(res, 2000));
    return (
        <>
            <h1 className="font-bold">User Page</h1>
        </>
    )
}