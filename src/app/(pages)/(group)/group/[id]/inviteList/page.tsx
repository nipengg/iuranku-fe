"use client";

import MemberInviteList from "@/components/MemberInviteList";
import { useState } from "react";

export default function GroupMember({ params }: { params: { id: string } }) {
    const baseUrl = `/group/${params.id}/member`;
    return (
        <>
            <div className="text-black">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Group Invitation</h1>
                </div>
                <div className="container mx-auto pb-6">
                    <MemberInviteList />
                </div>
            </div>
        </>
    );
}
