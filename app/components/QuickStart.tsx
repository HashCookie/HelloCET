import Link from "next/link";

export default function QuickStart() {
  const examTypes = [
    {
      title: "CET4",
      description: "大学英语四级考试",
      href: "/cet4",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBorderColor: "hover:border-blue-300",
    },
    {
      title: "CET6",
      description: "大学英语六级考试",
      href: "/cet6",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverBorderColor: "hover:border-purple-300",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">开始练习</h2>
          <p className="mt-4 text-xl text-gray-600">选择你要备考的科目</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {examTypes.map((exam) => (
            <Link
              key={exam.title}
              href={exam.href}
              className={`block p-8 rounded-xl border-2 ${exam.bgColor} ${exam.borderColor} ${exam.hoverBorderColor} transition-colors`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {exam.title}
              </h3>
              <p className="text-gray-600">{exam.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
