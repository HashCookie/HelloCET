interface TabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ title, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
      isActive
        ? "border-x border-t border-gray-200 bg-white text-blue-600"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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
      <nav className="flex justify-center space-x-2">
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
