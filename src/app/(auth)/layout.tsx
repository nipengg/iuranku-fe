import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ToastContainer limit={3} autoClose={3000} />
      <div className="container mx-auto py-3.5">
        {children}
      </div>
    </>
  )
}
