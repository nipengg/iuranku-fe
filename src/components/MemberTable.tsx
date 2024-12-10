import React from "react";

const MemberTable: React.FC = () => {
    const members = [
        {
            id: 1,
            fullName: "Sherleen",
            address: "Bogor Blok I No 1",
            joinedDate: "03 January 2024",
        },
        {
            id: 2,
            fullName: "Daniel",
            address: "Bogor Blok I No 2",
            joinedDate: "03 February 2024",
        },
        {
            id: 3,
            fullName: "WK",
            address: "Bogor Blok I No 3",
            joinedDate: "03 March 2024",
        },
        {
            id: 4,
            fullName: "Damar",
            address: "Bogor Blok I No 4",
            joinedDate: "03 April 2024",
        },
        {
            id: 5,
            fullName: "Neville",
            address: "Bogor Blok I No 5",
            joinedDate: "03 May 2024",
        },
        {
            id: 6,
            fullName: "Nyoman",
            address: "Bogor Blok I No 6",
            joinedDate: "03 June 2024",
        },
        {
            id: 7,
            fullName: "Kelly",
            address: "Bogor Blok I No 7",
            joinedDate: "03 July 2024",
        },
    ];

    return (
        <div className="overflow-x-auto text-black mt-6">
            <table className="table table-zebra w-full">
                {/* Table Head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {members.map((member, index) => (
                        <tr key={member.id}>
                            <th>{index + 1}</th>
                            <td>{member.fullName}</td>
                            <td>{member.address}</td>
                            <td>{member.joinedDate}</td>
                            <td>
                                <div className="flex space-x-2">
                                    <button className="btn btn-sm btn-success">
                                        View
                                    </button>
                                    <button className="btn btn-sm btn-error">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <div className="join">
                    <button className="join-item btn btn-sm">«</button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button key={page} className="join-item btn btn-sm">
                            {page}
                        </button>
                    ))}
                    <button className="join-item btn btn-sm">»</button>
                </div>
            </div>
        </div>
    );
};

export default MemberTable;
