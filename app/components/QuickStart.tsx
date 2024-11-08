import Link from "next/link";

export default function QuickStart() {
  const examTypes = [
    {
      title: "CET4",
      description: "大学英语四级考试",
      href: "/cet4",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      title: "CET6",
      description: "大学英语六级考试",
      href: "/cet6",
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            开始练习
          </h2>
          <p className="mt-4 text-xl text-gray-600">选择你要备考的科目</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {examTypes.map((exam) => (
            <Link
              key={exam.title}
              href={exam.href}
              className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${exam.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
              />
              <div className="relative">
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r ${exam.gradient} bg-clip-text text-transparent mb-2`}
                >
                  {exam.title}
                </h3>
                <p className="text-gray-600">{exam.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
