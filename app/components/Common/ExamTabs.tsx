interface TabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ title, isActive, onClick }: TabProps) => (
  <button
    className={`rounded-t-lg px-4 py-2 font-medium transition-colors ${
      isActive
        ? "border-gray-200 border-x border-t bg-white text-blue-600"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    }`}
    onClick={onClick}
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
    <div className="border-gray-200 border-b">
      <nav className="flex justify-center space-x-2">
        {tabs.map((tab) => (
          <Tab
            isActive={activeTab === tab.id}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            title={tab.title}
          />
        ))}
      </nav>
    </div>
  );
};

export default ExamTabs;
