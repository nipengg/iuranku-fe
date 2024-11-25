export default function Home() {
    return (
        <div className="text-black">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Group News</h1>
                <button className="btn btn-success text-white btn-sm w-1/5">
                    + Create News
                </button>
            </div>
            <div className="divider" />
            <div>
                <h2 className="font-bold text-2xl mb-2">News 1.2</h2>
                <div className="flex justify-between">
                    <p className="mr-20 text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestiae ad voluptas earum quidem quibusdam laboriosam,
                        illo similique, quae asperiores ipsam, veniam id!
                        Voluptatibus delectus accusamus corrupti labore pariatur
                        architecto quasi.
                    </p>
                    <button className="btn btn-warning w-1/12">Edit</button>
                </div>
                <div className="divider" />
            </div>
        </div>
    );
}
