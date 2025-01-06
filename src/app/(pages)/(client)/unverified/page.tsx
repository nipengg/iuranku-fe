'use client';
import { sendEmailVerification } from '@/lib/features/authSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { User } from '@/model/Master/UserModel';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UnverifiedPage() {
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const userState: User = useSelector((state: RootState) => state.auth.user);

    const dispatch = useDispatch<AppDispatch>();

    const handleSendEmailVerification = (e: any) => {
        e.preventDefault();

        setIsSending(true);
        setMessage('');

        dispatch(sendEmailVerification())
            .then((res: any) => {
                if (res.payload.meta.code == StatusCodes.OK) {
                    setMessage('Verification email sent! Please check your inbox.');
                } else {
                    throw new Error(res.payload.result.message);
                }
            })
            .catch(function (err: any) {
                setMessage('Failed to send verification email. Please try again.');
            }).finally(function () {
                setIsSending(false);
            });
    };

    return (
        <>
            {userState.email_verified_at == null ?
                <>
                    <div className="text-black p-6 flex flex-col items-center justify-center">
                        <header className="text-2xl font-bold mb-4 text-center">Your account is unverified.</header>
                        <p className="mb-6 text-center">
                            Your account is not verified. Please click the button below to send a verification email.
                        </p>
                        <button
                            onClick={handleSendEmailVerification}
                            disabled={isSending}
                            className={`px-6 py-2 rounded ${isSending
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-custom-green-primary hover:bg-custom-green-light text-white'
                                }`}
                        >
                            {isSending ? 'Sending...' : 'Send Verification Email'}
                        </button>
                        {message && <p className="mt-4 text-green-600">{message}</p>}
                    </div>
                </>
                :
                <>
                    <div className="text-black p-6 flex flex-col items-center justify-center">
                        <header className="text-2xl font-bold mb-4 text-center">Account Verified</header>
                        <p className="mb-6 text-center">
                            Your account is already verified.
                        </p>
                        <button onClick={() => router.push('/dashboard')} className='px-6 py-2 rounded bg-custom-green-primary hover:bg-custom-green-light text-white'>
                            Back to dashboard
                        </button>
                    </div>
                </>
            }
        </>
    );
}
