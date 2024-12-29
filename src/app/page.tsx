"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="relative isolate min-h-screen px-10 pt-2 lg:px-8 bg-custom-green-primary text-amber-100">
                <Navbar />
                {/* <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
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
        </div> */}
                {/* <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div> */}
                {/* Flex container for text and image */}
                <div className="flex flex-col md:flex-row mb-8">
                    {/* Text section */}
                    <div className="md:w-1/2 md:pr-8">
                        <h1 className="font-bold text-4xl md:text-6xl pt-10 md:pt-20">
                            Mempermudah kebutuhan rumah anda!
                        </h1>
                        <h2 className="font-light text-lg md:text-xl pt-6 md:pt-14 text-white">
                            Menggabungkan semua jasa, dan mempermudah kehidupan
                            para warga dalam 1 website!
                        </h2>
                        <div className="flex justify-center md:justify-start pt-8 md:pt-14">
                            <button className="bg-amber-100 hover:bg-amber-200 text-green-950 text-opacity-85 font-bold py-2 px-8 rounded mt-4">
                                Hubungi Kami!
                            </button>
                        </div>
                    </div>

                    {/* Image section */}
                    <div className="md:w-1/2 pt-10 md:pt-20">
                        <Image
                            src="/perumahan.jpg"
                            alt="Service Image"
                            height={350}
                            width={900}
                            className="border"
                        />
                    </div>
                </div>
                <div className="bg-amber-100 text-black pb-6 rounded-lg">
                    <div className="flex flex-col md:flex-row w-full ">
                        {/* Meet Our Founders Section */}
                        <div className="w-full flex flex-col items-center text-center mb-6 mt-12">
                            {/* Title */}
                            <h1 className="text-2lg md:text-xl font-bold mb-4 border-b-2 border-custom-green-primary px-3 pb-1">
                                Meet Our Founders!
                                {/* <div className="divider m-0" /> */}
                            </h1>
                            {/* Founders */}
                            <div className="flex justify-center space-x-8">
                                {/* Founder 1 */}
                                <div className="flex flex-col items-center">
                                    <Image
                                        src="/photo/neville-profile.jpg"
                                        alt="Nevil"
                                        width={225}
                                        height={400}
                                        className="rounded-md border reverse"
                                    />
                                    <p className="mt-2">Neville</p>
                                </div>
                                {/* Founder 2 */}
                                <div className="flex flex-col items-center">
                                    <Image
                                        src="/photo/damar-profile.jpg"
                                        alt="Damar"
                                        width={225}
                                        height={400}
                                        className="rounded-md border"
                                    />
                                    <p className="mt-2">Damar</p>
                                </div>
                            </div>
                        </div>

                        {/* Apa itu IuranKu Section */}
                        <div className="w-full flex flex-col items-center px-4 text-center mt-12">
                            <h1 className="text-lg md:text-xl font-bold mb-4 border-b-2 border-custom-green-primary px-3 pb-1">
                                Apa itu IuranKu?
                                {/* <div className="divider m-0" /> */}
                            </h1>
                            <p className="max-w-3xl">
                                IuranKu adalah platform pembayaran Iuran yang
                                dibuat untuk membantu para warga-warga yang
                                memiliki hak penuh terhadap kepemilikan
                                rumahnya.
                            </p>
                            <p className="mt-2 max-w-3xl">
                                IuranKu mampu membantu diberbagai aspek
                                kehidupan perumahan yang banyak orang alami,
                                seperti kebersihan dan keamanan, mempermudah
                                proses yang sering terjadi di kehidupan
                                masyarakat.
                            </p>
                        </div>
                    </div>
                    <div className="divider fill-black mx-12" />
                    <div className="flex flex-col items-center mt-7">
                        {/* Title and Text Section */}
                        <div className="text-center max-w-6xl mb-10 px-4">
                            <h1 className="text-2xl font-bold mb-4">
                                Bagaimana cara kerjanya?
                            </h1>
                            <div className="text-sm">
                                <p>
                                    Sesuai dengan motto kami “Easier with us”,
                                    kami bertujuan untuk mempermudah kehidupan
                                    warga-warga Indonesia yang memiliki status
                                    hak milik bangunan atau rumah di suatu
                                    perumahan. Di berbagai perumahan, tentu saja
                                    akan ada biaya tambahan yang akan membuat
                                    kehidupan para warga lebih aman dan tentram.
                                </p>
                                <p className="mt-4">
                                    Namun, hal ini juga membuat para warga
                                    bingung dengan bagian administrasinya.
                                    Dengan berbagai jasa yang di berikan pihak
                                    perumahan, tidak adanya sentralisasi atau
                                    pusat yang memberikan arahan mengenai
                                    jasa-jasa yang di berikan.
                                </p>
                                <p className="mt-4">
                                    Kami hadir sebagai penengah dan pihak ketiga
                                    yang akan mempermudah kehidupan para warga
                                    yang tinggal di perumahan. Dengan
                                    keterbukaannya para warga terhadap produk
                                    ini, kami jamin bahwa anda berada di tangan
                                    yang benar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-10" />
            </div>
            <Footer />
        </>
    );
}
