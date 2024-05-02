'use client'
import Navbar from "@/components/Navbar/Navbar";
import { clearUserState, fetch } from "@/lib/features/authSlice";
import { AppDispatch } from "@/lib/store";
import { checkToken } from "@/utils/userSession";
import { StatusCodes } from "http-status-codes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8 bg-custom-green-primary">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative bg-custom-green-primary" ></div>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-custom-yellow-primary sm:text-6xl">Mempermudah kebutuhan rumah anda!</h1>
            <p className="mt-6 text-lg leading-8 text-custom-yellow-primary">Menggabungkan semua jasa, dan mempermudah kehidupan para warga dalam 1 website!</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register" className="rounded-md bg-custom-yellow-primary text-custom-green-primary px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-custom-yellow-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Join Up!</Link>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
