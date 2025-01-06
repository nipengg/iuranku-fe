"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function NotFound() {
    return (
        <>
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                        Eh, tunggu sebentar!
                    </h1>
                    <p className="text-lg text-gray-700 font-semibold">
                        Kamu tidak punya akses untuk menuju ke situs ini!
                    </p>
                    <p className="text-sm text-gray-600 mt-6">
                        Sepertinya user tidak memiliki role untuk mengakses web
                        ini. Anda bisa kembali ke halaman sebelumnya ya!
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Jika Anda merupakan seorang Admin atau orang yang
                        memiliki wewenang lebih, mohon lapor ke service center.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-6 px-6 py-3 bg-custom-green-primary text-white font-medium rounded-md shadow-md hover:bg-custom-green-dark transition duration-300"
                    >
                        Kembali ke Halaman Sebelumnya
                    </button>
                </div>
            </div>
            <footer className="mt-auto">
                <Footer />
            </footer>
        </>
    );
}
