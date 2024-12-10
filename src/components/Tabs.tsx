interface TabsProps {
    tabs: string[];
    onTabChange: (tab: string) => void;
    activeTab: string;
}

export default function Tabs({ tabs, onTabChange, activeTab }: TabsProps) {
    return (
        <div className="border-b border-gray-300">
            <nav className="flex space-x-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`py-2 px-4 text-lg ${
                            activeTab === tab
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
}
