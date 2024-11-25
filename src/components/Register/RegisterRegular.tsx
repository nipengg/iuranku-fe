"use client";
import React from "react";

const RegisterRegular = () => {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-custom-green-primary">
            {/* Left Section - Branding */}
            <div className="text-white flex-1 flex flex-col justify-center items-center font-semibold text-2xl">
                <p className="text-4xl">IuranKu</p>
                <p className="text-sm">Easier with Us!</p>
            </div>

            {/* Right Section - Form */}
            <div className="flex flex-col items-center text-black bg-amber-100 md:w-7/12 p-8 m-8">
                <h1 className="font-semibold text-3xl">Register</h1>
                <p className="text-sm mt-2 mb-4">Create your account!</p>
                <div className="divider p-0 m-0 mb-3" />
                <div className="w-full text-black">
                    <form className="flex flex-col">
                        {/* First and Last Name */}
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
                                <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="firstName"
                                >
                                    First Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-2">
                                <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="lastName"
                                >
                                    Last Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>

                        {/* Email and Phone */}
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
                                <label
                                    className="block text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-2">
                                <label
                                    className="block  text-sm font-bold mb-2"
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
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
                                        value="male"
                                        className="mr-2"
                                    />
                                    Male
                                </label>
                                <label className=" mr-4">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        className="mr-2"
                                    />
                                    Female
                                </label>
                            </div>
                        </div>

                        {/* Password and Confirm Password */}
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div className="w-full md:w-1/2 pr-0 md:pr-2 mb-4 md:mb-0">
                                <label
                                    className="block  text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2">
                                Address
                            </label>
                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Road/Street"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                                <div className="w-full md:w-1/3 pr-0 md:pr-2 mb-4 md:mb-0">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="w-full md:w-1/3 pr-0 md:pr-2 mb-4 md:mb-0">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Province"
                                    />
                                </div>
                                <div className="w-full md:w-1/3">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Postal Code"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 self-start text-white"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterRegular;
