import Link from "next/link";

const Sidebar = () => {
    const sidebarLinks = [
        { href: "/about", label: "About" },
        { href: "/profile", label: "Profile" },
        { href: "/housing", label: "Housing" },
        { href: "/pengelola/addHousing", label: "Add Housing" },
        { href: "/pengelola/groupNews", label: "Housing News" },
        { href: "/pengelola/member", label: "Member" },
        { href: "/pengelola/payment", label: "Payment" },
        { href: "/profile", label: "Profile" },
    ];

    return (
        <aside className="h-full min-h-screen w-64 bg-white text-gray-800 border-r">
            <nav className="p-4">
                <h1 className="text-xs mb-2">Role: XXXX</h1>
                <span className="text-xs font-bold">Main</span>
                <ul className="space-y-4 mt-4">
                    {sidebarLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.href}
                                className="flex items-center p-2 rounded hover:bg-gray-200"
                            >
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
