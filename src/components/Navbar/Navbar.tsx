import React, { useState } from "react";
import { menuGuestTabs, menuTabs } from "@/mocks/Sidebar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice";
import { toast } from "react-toastify";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = async () => {
        await dispatch(logout());
        router.push("/login");
        toast.success("Logout Success!");
    };

    return (
        <nav className="bg-custom-green-primary border-b-2 border-amber-100 px-4">
            <div className="flex items-center justify-between">
                <Link href="/dashboard">
                    <span className="font-semibold text-2xl tracking-tight text-custom-yellow-primary">
                        Iuranku
                    </span>
                </Link>

                {/* For Mobile */}
                <button
                    className="lg:hidden text-custom-yellow-primary focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                {/* For Desktop */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                    {(user.id ? menuTabs : menuGuestTabs).map(
                        (menu: any, index) => (
                            <Link
                                key={index}
                                href={menu.url}
                                className="text-custom-yellow-primary hover:text-white text-sm"
                            >
                                {menu.value}
                            </Link>
                        )
                    )}

                    {user.id > 0 && (
                        <>
                            <span className="text-white">|</span>
                            <div className="relative">
                                {/* Dropdown Button */}
                                <button
                                    type="button"
                                    className="flex items-center text-custom-yellow-primary hover:text-white"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                >
                                    <span>{user.name}</span>
                                    <FaChevronDown
                                        className={`ml-2 transition-transform ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                    >
                                        <div className="py-1" role="none">
                                            <Link
                                                href="/profile"
                                                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden space-y-4 mt-4">
                    {(user.id ? menuTabs : menuGuestTabs).map(
                        (menu: any, index) => (
                            <Link
                                key={index}
                                href={menu.url}
                                className="block text-custom-yellow-primary hover:text-white text-sm"
                            >
                                {menu.value}
                            </Link>
                        )
                    )}

                    {user.id > 0 && (
                        <div className="space-y-2 text-sm ">
                            <Link
                                href="/profile"
                                className="block text-custom-yellow-primary hover:text-white"
                            >
                                Edit Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block text-custom-yellow-primary hover:text-white w-full text-left pt-2 pb-2"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
