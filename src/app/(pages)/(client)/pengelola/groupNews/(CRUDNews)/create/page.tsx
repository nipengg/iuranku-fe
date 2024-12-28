import Editor from "@/components/Editor";

export default function CreateNews() {
    return (
        <div className="text-black">
            <div className="flex">
                <h1 className="text-4xl font-bold">Create Group News</h1>
            </div>
            <div className="divider m-0" />

            <div className="flex flex-col space-y-4 my-4">
                <div className="flex items-center space-x-4">
                    <span className="label-text text-xl font-bold">
                        Judul Berita
                    </span>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-sm w-80"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <span className="label-text text-xl font-bold">
                        Gambar Berita
                    </span>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-sm w-80"
                    />
                </div>
            </div>

            {/* <Editor  /> */}
        </div>
    );
}
