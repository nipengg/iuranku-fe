import Editor from "./Editor";

const GeneralSettings: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium w-52">
                    Minimum of Group Member
                </label>
                <input
                    type="number"
                    placeholder="Enter minimum"
                    className="input input-bordered input-sm w-full max-w-xs"
                />
            </div>
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium w-52">
                    Maximum of Group Member
                </label>
                <input
                    type="number"
                    placeholder="Enter maximum"
                    className="input input-bordered input-sm w-full max-w-xs"
                />
            </div>
            <label className="text-sm font-medium w-40">
                Group Description
            </label>
            <div className="pb-4">
                <Editor />
            </div>
        </div>
    );
};

export default GeneralSettings;
