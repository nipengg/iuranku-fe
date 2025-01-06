"use client";

import { useState } from "react";
import JoinedMember from "./JoinedMember";
import InvitedMember from "./InvitedMember";
import LeaveMember from "./LeaveMember";

interface Props {
    id: string;
}

const SectionHeadingWithTabs: React.FunctionComponent<Props> = ({ id }) => {
    const [activeTab, setActiveTab] = useState("Joined Members");

    const tabs = ["Joined Members", "Invited Members", "Leave Members"];

    return (
        <div className="container mx-auto pb-8">
            <div className="border-b border-gray-300">
                <nav className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 text-lg ${
                                activeTab === tab
                                    ? "border-b-2 border-custom-green-primary text-custom-green-primary"
                                    : "text-custom-green-dark hover:text-custom-green-dark"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === "Joined Members" && <JoinedMember id={id} />}
                {activeTab === "Invited Members" && <InvitedMember id={id} />}
                {activeTab === "Leave Members" && <LeaveMember id={id} />}
            </div>
        </div>
    );
};

export default SectionHeadingWithTabs;
