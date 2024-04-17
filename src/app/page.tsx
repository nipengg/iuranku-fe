'use client'
import Navbar from "@/components/Navbar/Navbar";
import { clearUserState, fetch } from "@/lib/features/authSlice";
import { AppDispatch } from "@/lib/store";
import { checkToken } from "@/utils/userSession";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
