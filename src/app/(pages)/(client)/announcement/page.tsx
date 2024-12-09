export default function Announcement() {
    return (
        <div className="flex flex-col items-start">
            <div className="w-full">
                <h1 className="text-sm">Announcement Page</h1>
                <h1 className="font-bold text-3xl">Title Announcement Page</h1>
                <div className="divider m-2" />
            </div>
            <div className="w-full flex items-start">
                <div className="flex flex-col text-xs space-y-4">
                    <div className="flex space-x-4">
                        <h2>Date Announcement</h2>
                        <h2>-</h2>
                        <h2>Code Announcement</h2>
                    </div>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet error alias asperiores. Id consequuntur ullam
                        molestiae blanditiis perspiciatis, nihil cupiditate ex
                        iure fugit at assumenda accusamus tempora mollitia ab
                        quisquam.
                    </p>
                </div>
                <img
                    src="/mariicon.png"
                    alt="mari"
                    width={400}
                    height={600}
                    className="rounded-md ml-4"
                />
            </div>
        </div>
    );
}
