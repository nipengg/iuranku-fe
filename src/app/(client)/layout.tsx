'use client';
import Navbar from "@/components/Navbar/Navbar";
import { logout } from "@/lib/features/authSlice";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    toast.success('Logout Success!');
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-3.5">
        <button onClick={() => handleLogout()}>Logout</button>
        {children}
      </div>
    </>
  )
}
