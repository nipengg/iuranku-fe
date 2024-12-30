import React, { useEffect, useState } from "react";
import { menuGuestTabs, menuTabs } from "@/mocks/Sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice";
import { toast } from "react-toastify";
import { FaArrowDown, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                        })
                    }
                    <div className="text-white">
                        | &nbsp; &nbsp;
                    </div>
                    {user.id && (
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    className="block mt-4 lg:inline-block lg:mt-0 text-custom-yellow-primary hover:text-white mr-4"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <div className="flex flex-row">
                                        <div className="flex">
                                            {user.name}
                                        </div>
                                        <FaChevronDown className={`ml-2 mt-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                            }`} />
                                    </div>


                                </button>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                >
                                    <div className="py-1" role="none">
                                        {/* Edit Profile */}
                                        <Link
                                            href="/profile"
                                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Edit Profile
                                        </Link>
                                        {/* Logout */}
                                        <button
                                            onClick={() => handleLogout()}
                                            className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
