import Editor from "../Editor";

const GeneralSettings: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium w-40">
                Group Description
            </label>
            <div className="pb-4">
                {/* <Editor /> */}
            </div>
        </div>
    );
};

export default GeneralSettings;
