"use client";

import React, { useState } from "react";

interface Invitation {
    id: number;
    groupName: string;
    address: string;
    invitedDate: string;
}

const MemberInviteList: React.FC = () => {
    const [data, setData] = useState<Invitation[]>([
        {
            id: 1,
            groupName: "Perumahan Alam Barkah",
            address: "Bogor Blok I No 1",
            invitedDate: "03 January 2024",
        },
        {
            id: 2,
            groupName: "Perumahan Griya Soka",
            address: "Bogor Blok I No 2",
            invitedDate: "03 February 2024",
        },
        {
            id: 3,
            groupName: "Bukit Bogor Raya",
            address: "Bogor Blok I No 3",
            invitedDate: "03 March 2024",
        },
        {
            id: 4,
            groupName: "PIK Avenue",
            address: "Bogor Blok I No 4",
            invitedDate: "03 April 2024",
        },
        {
            id: 5,
            groupName: "Bogor Nirwana Raya",
            address: "Bogor Blok I No 5",
            invitedDate: "03 May 2024",
        },
        {
            id: 6,
            groupName: "Villa Duta Bogor",
            address: "Bogor Blok I No 6",
            invitedDate: "03 June 2024",
        },
        {
            id: 7,
            groupName: "Bangbarung Perum",
            address: "Bogor Blok I No 7",
            invitedDate: "03 July 2024",
        },
        {
            id: 8,
            groupName: "Arya",
            address: "Bogor Blok I No 8",
            invitedDate: "03 August 2024",
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleCancel = (id: number) => {
        alert(`Canceling invitation for group ID: ${id}`);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="overflow-x-auto mt-6">
            <table className="table w-full text-black">
                {/* Table Head */}
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Address</th>
                        <th>Invited Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.groupName}</td>
                            <td>{item.address}</td>
                            <td>{item.invitedDate}</td>
                            <td>
                                <div className="flex space-x-2">
                                    <button className="btn btn-success btn-sm">
                                        View
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleCancel(item.id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <div className="join">
                    <button
                        className="join-item btn"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                    >
                        «
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                className={`join-item btn ${
                                    page === currentPage ? "btn-active" : ""
                                }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        )
                    )}
                    <button
                        className="join-item btn"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberInviteList;
