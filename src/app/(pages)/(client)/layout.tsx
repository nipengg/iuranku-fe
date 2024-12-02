"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>

            <div className="flex flex-1">
                <aside className="w-64 bg-gray-100 border-r">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 container ml-6 mr-auto py-3.5">
                    {children}
                </main>
            </div>
            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
}
