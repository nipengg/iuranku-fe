import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Providers } from "./provider";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from "@/constant";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iuranku",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AntdRegistry>
            <Providers>
              <ToastContainer limit={3} autoClose={3000} />
              {children}
            </Providers>
          </AntdRegistry>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
