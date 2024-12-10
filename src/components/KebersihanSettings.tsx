const KebersihanSettings: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium w-52">
                    Tuition Value
                </label>
                <div className="relative w-full max-w-xs">
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                        Rp.
                    </span>
                    <input
                        type="number"
                        placeholder="Enter minimum"
                        className="input input-bordered input-sm pl-8 w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default KebersihanSettings;
