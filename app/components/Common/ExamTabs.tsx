interface TabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ title, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
      isActive
        ? "bg-white text-blue-600 border-t border-x border-gray-200"
        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
    }`}
  >
    {title}
  </button>
);

interface ExamTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ExamTabs = ({ activeTab, onTabChange }: ExamTabsProps) => {
  const tabs = [
    { id: "writing", title: "写作" },
    { id: "listening", title: "听力" },
    { id: "reading", title: "阅读" },
    { id: "translation", title: "翻译" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-2 justify-center">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            title={tab.title}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </nav>
    </div>
  );
};

export default ExamTabs;
