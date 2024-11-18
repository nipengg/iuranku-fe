'use client';
import { AppDispatch, RootState } from '@/lib/store'
import { UserRegister, UserRegisterInitial } from '@/model/Master/UserModel';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-phone-input-2/lib/style.css'
import { register } from '@/lib/features/authSlice';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const RegisterGoogle = () => {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const auth = useSelector((state: RootState) => state.auth);

    const [registerForm, setRegisterForm] = useState<UserRegister>({ ...UserRegisterInitial });

    const handleChange = (e: any) => {
        setRegisterForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleRegister = (e: any) => {
        e.preventDefault();
        dispatch(register(registerForm)).then((res: any) => {
            if (res.error)
                throw res;

            if (res.payload.meta.code == StatusCodes.OK) {
                router.push('/dashboard');
                toast.success(`Welcome Back ${res.payload.result.user.name}`);
            }
        }).catch(function (err: any) {
            if (err.payload !== undefined) {
                toast.error(`Register Failed. ${err.payload.result.message}`);
            } else {
                toast.error(`Something went wrong...`);
            }
            
        });
    }

    const checkUserState = () => {
        if (user.name == "" || user.email == "") {
            router.back();
        } else {
            setRegisterForm((prevState) => ({
                ...prevState,
                name: user.name,
                email: user.email,
            }));
        }
    }

    useEffect(() => {
        checkUserState();
    }, [])

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-custom-green-primary">
            <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-white text-4xl">IuranKu</p>
                <p className="text-white text-sm">Easier with Us!</p>
            </div>

            <div className="flex flex-col items-center text-black bg-custom-yellow-primary md:w-7/12 p-8 m-8">
                <h1 className="text-2xl mb-4">Register</h1>
                <p className=" text-lg mb-4">Create your account</p>

                <div className="w-full">
                    <form className="flex flex-col">
                        <div className="mb-4">
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
                                placeholder="Enter your fullname"
                                value={registerForm.name}
                                disabled={auth.isLoading ? true : false}
                                readOnly
                            />
                        </div>

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
                                    placeholder="Enter your email"
                                    value={registerForm.email}
                                    disabled={auth.isLoading ? true : false}
                                    readOnly
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-2">
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
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    disabled={auth.isLoading ? true : false}
                                    required
                                />
                            </div>
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
                                        checked={registerForm.gender === "Male"}
                                        onChange={handleChange}
                                        disabled={auth.isLoading ? true : false}
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
                                        checked={registerForm.gender === "Female"}
                                        onChange={handleChange}
                                        disabled={auth.isLoading ? true : false}
                                        className="mr-2"
                                        required
                                    />
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
                                <label
                                    className="block  text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    disabled={auth.isLoading ? true : false}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-2">
                                <label
                                    className="block  text-sm font-bold mb-2"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    disabled={auth.isLoading ? true : false}
                                    required
                                />
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
                                    onChange={handleChange}
                                    disabled={auth.isLoading ? true : false}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 self-start"
                            type="submit"
                            onClick={handleRegister}
                            disabled={auth.isLoading ? true : false}
                        >
                            {auth.isLoading ? 'Loading...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterGoogle