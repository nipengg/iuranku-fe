"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { RootState } from "@/lib/store";
import { User } from "@/model/Master/UserModel";
import { AuthState } from "@/model/redux/Auth";
import { useSelector } from "react-redux";

export default function GroupLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const baseUrl = `/group/${params.id}`;

    const authState: AuthState = useSelector((state: RootState) => state.auth);

    const roleAccess: Record<string, string[]> = {
        "Group Leader": [
            `${baseUrl}`,
            `${baseUrl}/member`,
            `${baseUrl}/news`,
            `${baseUrl}/tuition`,
            `${baseUrl}/tuition-payment`,
            `${baseUrl}/tuition-request`,
            `${baseUrl}/tuition-request-management`,
            `${baseUrl}/setting`,
        ],
        "Group Member": [
            `${baseUrl}`,
            `${baseUrl}/tuition-payment`,
            `${baseUrl}/tuition-request`,
        ],
    };

    const sidebarLinks = [
        { href: `${baseUrl}`, label: "Group Dashboard" },
        { href: `${baseUrl}/member`, label: "Members" },
        { href: `${baseUrl}/news`, label: "News" },
        { href: `${baseUrl}/tuition`, label: "Iuran Report" },
        { href: `${baseUrl}/tuition-payment`, label: "My Payment" },
        { href: `${baseUrl}/tuition-request`, label: "My Iuran Request" },
        {
            href: `${baseUrl}/tuition-request-management`,
            label: "Iuran Request Management",
        },
        { href: `${baseUrl}/setting`, label: "Group Settings" },
    ].filter((link) =>
        roleAccess[
            authState.groupMemberActive.member_type?.member_type_name || ""
        ]?.includes(link.href)
    );

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-50">
                    <Navbar />
                </header>
                <div className="flex flex-1">
                    <aside className="w-64 bg-gray-100 border-r">
                        <Sidebar links={sidebarLinks} />
                    </aside>
                    <main className="flex-1 container ml-6 mr-auto py-3.5">
                        {children}
                    </main>
                </div>
                <footer className="mt-auto">
                    <Footer />
                </footer>
            </div>
        </>
    );
}
