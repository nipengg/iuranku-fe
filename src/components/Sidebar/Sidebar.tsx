import { RootState } from "@/lib/store";
import { AuthState } from "@/model/redux/Auth";
import Link from "next/link";
import { useSelector } from "react-redux";

interface SidebarProps {
    links: { href: string; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
    const authState: AuthState = useSelector((state: RootState) => state.auth);

    return (
        <aside className="h-full min-h-screen w-64 bg-white text-gray-800 border-r">
            <nav className="p-4">
                <h1 className="text-xs mb-2">Role: {authState.groupMemberActive.member_type?.member_type_name}</h1>
                <span className="text-xs font-bold">Main</span>
                <ul className="space-y-4 mt-4">
                    {links.map((link, index) => (
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
