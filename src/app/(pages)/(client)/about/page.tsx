"use client";

import PopUp from "@/components/PopUp";
import { useState } from "react";
const About: React.FC = () => {
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [isRejectModalOpen, setRejectModalOpen] = useState(false);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);

    return (
        <div className="p-6">
            <button
                className="btn btn-primary"
                onClick={() => setRequestModalOpen(true)}
            >
                Request PopUp
            </button>
            <button
                className="btn btn-secondary ml-4"
                onClick={() => setConfirmationModalOpen(true)}
            >
                Confirm PopUp
            </button>
            <button
                className="btn btn-secondary ml-4"
                onClick={() => setRejectModalOpen(true)}
            >
                Reject PopUp
            </button>
            <button
                className="btn btn-secondary ml-4"
                onClick={() => setSearchModalOpen(true)}
            >
                Search User PopUp
            </button>

            <PopUp
                isOpen={isRequestModalOpen}
                onClose={() => setRequestModalOpen(false)}
                title="Request Payment Process"
                footer={
                    <>
                        <button
                            className="btn btn-outline"
                            onClick={() => setRequestModalOpen(false)}
                        >
                            Back
                        </button>
                        <button className="btn btn-success">Request</button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Amount
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Amount"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Transfer File
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                        />
                    </div>
                </form>
            </PopUp>

            <PopUp
                isOpen={isConfirmationModalOpen}
                onClose={() => setConfirmationModalOpen(false)}
                title="Accept Confirmation"
                footer={
                    <>
                        <button
                            className="btn btn-outline"
                            onClick={() => setConfirmationModalOpen(false)}
                        >
                            Back
                        </button>
                        <button className="btn btn-success">Accept</button>
                    </>
                }
            >
                <p>Are you sure you want to join this group?</p>
            </PopUp>
            <PopUp
                isOpen={isRejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                title="Reject Confirmation"
                footer={
                    <>
                        <button
                            className="btn btn-outline"
                            onClick={() => setRejectModalOpen(false)}
                        >
                            Back
                        </button>
                        <button className="btn btn-error">Reject</button>
                    </>
                }
            >
                <p>Are you sure you want to reject this invitation?</p>
            </PopUp>
            <PopUp
                isOpen={isSearchModalOpen}
                onClose={() => setSearchModalOpen(false)}
                title="Search User to Invite"
                footer={
                    <>
                        <button
                            className="btn btn-outline"
                            onClick={() => setSearchModalOpen(false)}
                        >
                            Back
                        </button>
                        <button className="btn btn-success">Invite</button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            User (Name/Email)
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Search for user.."
                        />
                    </div>
                </form>
            </PopUp>
        </div>
    );
};
export default About;
