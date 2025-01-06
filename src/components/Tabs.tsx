interface TabsProps {
    tabs: string[];
    onTabChange: (tab: string) => void;
    activeTab: string;
}

export default function Tabs({ tabs, onTabChange, activeTab }: TabsProps) {
    return (
        <nav className="border-b border-gray-300 flex space-x-4">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`py-2 px-4 text-sm ${
                        activeTab === tab
                            ? "border-b-2 border-custom-green-primary text-custom-green-primary"
                            : "text-custom-green-dark hover:text-custom-green-dark"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </nav>
    );
}
