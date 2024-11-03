"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import { useState } from "react";

interface TopicCardProps {
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const TopicCard = ({
  title,
  description,
  isSelected,
  onClick,
}: TopicCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? "border-blue-500 bg-blue-50" : "hover:border-blue-500"
      }`}
    >
      <h4 className="font-medium text-lg mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default function PracticeWriting() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const topics = [
    {
      title: "科技与生活",
      description: "讨论科技如何改变了我们的日常生活",
    },
    {
      title: "环境保护",
      description: "探讨环境问题和可能的解决方案",
    },
  ];

  return (
    <ExamSection title="写作练习" isLoading={false}>
      <div className="prose max-w-none mb-6 text-left">
        <h3 className="text-sm text-gray-500 mb-6 text-left">
          <span className="font-semibold">说明：</span>
          本部分为写作练习，你将看到一些常见的写作主题。请选择一个主题进行写作，时间为30分钟。
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {topics.map((topic) => (
            <TopicCard
              key={topic.title}
              title={topic.title}
              description={topic.description}
              isSelected={selectedTopic === topic.title}
              onClick={() => setSelectedTopic(topic.title)}
            />
          ))}
        </div>

        <div className="mt-8">
          <textarea
            id="practice-writing"
            rows={12}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="在此输入你的作文..."
          />
        </div>
      </div>
    </ExamSection>
  );
}
