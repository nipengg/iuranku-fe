"use client";

import { useState } from "react";

export default function SectionHeadingWithTabs() {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = ["Joined Members", "Invited Members", "Leave Members"];
    const actions = [{ label: "Invite", action: () => console.log("Invite") }];

    return (
        <div className="container mx-auto pb-8">
            {/* Heading and Actions */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Member</h2>
                <div className="flex space-x-4">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300">
                <nav className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 text-lg ${
                                activeTab === tab
                                    ? "border-b-2 border-blue-600 text-blue-600"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "Joined Members" && (
                    <p>This is the Joined Members content.</p>
                )}
                {activeTab === "Invited Members" && (
                    <p>This is the Invited Members content.</p>
                )}
                {activeTab === "Leave Members" && (
                    <p>This is the Leave Members content.</p>
                )}
            </div>
        </div>
    );
}
