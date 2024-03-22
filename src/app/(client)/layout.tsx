import Navbar from "@/components/Navbar/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-3.5">
        {children}
      </div>
    </>
  )
}
