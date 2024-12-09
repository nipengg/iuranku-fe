import CompCaSlide from "@/components/CompCaSlide/CompCaSlide";
import TabBerita from "@/components/TabBerita/TabBerita";
import TabPengunguman from "@/components/TabPengunguman/TabPengunguman";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <div className="text-black mt-2">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold">
                        Welcome Back, User!
                    </h1>
                </div>
                <div className="divider" />
                <CompCaSlide />
                {/* Tab */}
                <div className="space-y-8">
                    <div className="flex space-x-8">
                        <TabPengunguman />
                        <TabBerita />
                    </div>
                </div>
            </div>
        </>
    );
}