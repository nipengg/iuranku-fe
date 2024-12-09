import React, { useEffect, useState } from "react";
import { menuGuestTabs, menuTabs } from "@/mocks/Sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logout());
        router.push("/login");
        toast.success("Logout Success!");
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-custom-green-primary border-b-2 border-amber-100 px-4 pl-6">
            {/* Left Section */}
            <div className="flex items-center flex-shrink-0 text-custom-yellow-primary">
                <Link href="/dashboard">
                    <span className="font-semibold text-2xl tracking-tight">
                        Iuranku
                    </span>
                </Link>
            </div>

            {/* Right Section */}
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex lg:items-center lg:ml-auto">
                    {user.id
                        ? menuTabs.map((menu: any, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={menu.url}
                                    className="block mt-4 lg:inline-block lg:mt-0 text-custom-yellow-primary hover:text-white mr-4"
                                >
                                    {menu.value}
                                </Link>
                            );
                        })
                        : menuGuestTabs.map((menu: any, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={menu.url}
                                    className="block mt-4 lg:inline-block lg:mt-0 text-custom-yellow-primary hover:text-white mr-4"
                                >
                                    {menu.value}
                                </Link>
                            );
                    })}
                    {
                        user.id ?
                            <button onClick={() => handleLogout()} className="block mt-4 lg:inline-block lg:mt-0 text-custom-yellow-primary hover:text-white mr-4s">Logout</button>
                            : ''
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
