"use client";

import ExamSection from "@/app/components/Common/ExamSection";
import SubmitButton from "@/app/components/Common/SubmitButton";

interface PracticeWritingProps {
  isLoading?: boolean;
}

const PracticeWriting = ({ isLoading = false }: PracticeWritingProps) => {
  return (
    <ExamSection title="写作练习" isLoading={isLoading}>
      <div className="prose max-w-none mb-6 text-left">
        <h3 className="text-sm text-gray-500 mb-6 text-left">
          <span className="font-semibold">说明：</span>
          本部分为写作练习，你将看到一些常见的写作主题。请选择一个主题进行写作，时间为30分钟。
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TopicCard
            title="科技与生活"
            description="讨论科技如何改变了我们的日常生活"
          />
          <TopicCard
            title="环境保护"
            description="探讨环境问题和可能的解决方案"
          />
        </div>

        <div className="mt-8">
          <textarea
            id="practice-writing"
            rows={12}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="在此输入你的作文..."
          />
        </div>

        <SubmitButton section="writing" />
      </div>
    </ExamSection>
  );
};

const TopicCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
      <h4 className="font-medium text-lg mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default PracticeWriting;
