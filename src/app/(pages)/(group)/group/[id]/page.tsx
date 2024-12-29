'use client';
import TabBerita from "@/components/TabBerita/TabBerita";
import TabPengunguman from "@/components/TabPengunguman/TabPengunguman";
import { RootState } from "@/lib/store";
import { AuthState } from "@/model/redux/Auth";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { id: string } }) {
    const authState: AuthState = useSelector((state: RootState) => state.auth);
    return (
        <>
            <div className="text-black mt-2">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold">
                        Welcome Back, {authState.user.name}!
                    </h1>
                </div>
                <div className="divider" />
                {/* Tab */}
                <div className="space-y-8">
                    <div className="flex flex-row space-x-8">
                        <TabBerita groupId={params.id} />
                        <div className="w-1/2">
                            <div className="mb-6">
                                <span className="font-bold block">
                                    Perumahan:
                                </span>
                                <span className="block mt-2 text-justify">
                                    {authState.groupMemberActive.group?.group_name ?? '-'}
                                </span>
                            </div>

                            <div className="mb-6">
                                <span className="font-bold block">
                                    Deskripsi Perumahan:
                                </span>
                                <span className="block mt-2 text-justify">
                                    {authState.groupMemberActive.group?.group_description ?? '-'}
                                </span>
                            </div>

                            <div className="mb-6">
                                <span className="font-bold block">
                                    Alamat Perumahan:
                                </span>
                                <span className="block mt-2 text-justify">
                                    {authState.groupMemberActive.group?.group_address}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}