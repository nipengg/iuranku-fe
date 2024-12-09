import Editor from "@/components/Editor";

export default function CreateNews({ params }: { params: { id: string } }) {

    return (
        <>
            <div className="text-black p-6 bg-white">
                <div className="flex mb-6">
                    <h1 className="text-4xl font-bold">Create Group News</h1>
                </div>
                <div className="divider m-0" />

                <form className="space-y-6">
                    {/* Title Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-bold">Judul Berita</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-md w-full"
                        />
                    </div>

                    {/* Image Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-bold">Gambar Berita</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-md w-full"
                        />
                    </div>

                    {/* Text Editor */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-bold">Konten Berita</span>
                        </label>
                        <Editor />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control">
                        <button className="btn btn-primary w-full text-lg mt-10">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}