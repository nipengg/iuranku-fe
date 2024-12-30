'use client';
import { editProfile, fetch, sendEmailVerification } from "@/lib/features/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { EditProfile, EditProfileInitial, User, UserInitial } from "@/model/Master/UserModel";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

async function fetchUser(
    dispatch: AppDispatch,
): Promise<any> {
    try {
        const response: any = await dispatch(
            fetch()
        );
        if (response.error) throw response;

        return response.payload;
    } catch (error) {
        throw error;
    }
}


export default function profilePage() {

    const dispatch = useDispatch<AppDispatch>();
    const [userFetch, setUserFetch] = useState<User>({ ...UserInitial });
    const [editForm, setEditForm] = useState<EditProfile>({ ...EditProfileInitial });

    const authState = useSelector((state: RootState) => state.auth);

    const handleChange = (e: any) => {
        setEditForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        dispatch(editProfile(editForm)).then((res: any) => {
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`Profile Updated`);
            } else {
                throw new Error(res.payload.result.message);
            }
        }).catch(function (err: any) {
            toast.error(`Update Data Failed. ${err.payload?.result?.message || err.message}`);
        });
    };

    const handleSendEmailVerification = (e: any) => {
        e.preventDefault();

        dispatch(sendEmailVerification()).then((res: any) => {
            if (res.payload.meta.code == StatusCodes.OK) {
                toast.success(`Email Verification Sent!`);
            } else {
                throw new Error(res.payload.result.message);
            }
        }).catch(function (err: any) {
            toast.error(`Sent Email Verification Failed. ${err.payload?.result?.message || err.message}`);
        });
    };

    useEffect(() => {
        fetchUser(dispatch).then((res) => {
            if (res.error) throw res;
            if (res.meta.code === StatusCodes.OK) {
                setUserFetch(res.result.user);
                setEditForm(res.result.user);
            }
        })
            .catch((err) => {
                toast.error(`Get Data Failed. ${err.payload.result?.message}`);
            });
    }, []);

    return (
        <div className="text-black">
            <div className="flex justify-between">
                <h1 className="flex text-2xl font-bold">Profile</h1>
                {
                    userFetch.email_verified_at == null ?
                        <button onClick={handleSendEmailVerification} className="btn bg-custom-green-primary text-white" disabled={authState.isLoading}>Send Email Verification</button> : null
                }
            </div>

            <div className="divider" />

            {/* Form Profile */}
            <div className="w-full">
                <form className="flex flex-col">

                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
                            <label
                                className="block  text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={userFetch.email}
                                disabled
                            />
                        </div>

                        <div className="w-full md:w-1/2 pl-0 md:pl-2">
                            <label
                                className="block text-sm font-bold mb-2"
                                htmlFor="Fullname"
                            >
                                Fullname
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your fullname"
                                value={editForm.name}
                                onChange={handleChange}
                                disabled={authState.isLoading}
                                required
                            />
                        </div>

                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="phone"
                        >
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="number"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={editForm.phone}
                            onChange={handleChange}
                            disabled={authState.isLoading}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2">
                            Gender
                        </label>
                        <div className="flex flex-row">
                            <label className=" mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={editForm.gender === "Male"}
                                    onChange={handleChange}
                                    disabled={authState.isLoading}
                                    className="mr-2"
                                    required
                                />
                                Male
                            </label>
                            <label className=" mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={editForm.gender === "Female"}
                                    onChange={handleChange}
                                    disabled={authState.isLoading}
                                    className="mr-2"
                                    required
                                />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2">
                            Address
                        </label>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={editForm.address}
                                onChange={handleChange}
                                disabled={authState.isLoading}
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 self-start"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={authState.isLoading}
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
