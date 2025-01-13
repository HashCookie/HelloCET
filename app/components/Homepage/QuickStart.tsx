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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
            开始练习
          </h2>
          <p className="mt-4 text-xl text-gray-600">选择你要备考的科目</p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {examTypes.map((exam) => (
            <Link
              key={exam.title}
              href={exam.href}
              className="group relative rounded-xl border border-gray-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${exam.gradient} rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />
              <div className="relative">
                <h3
                  className={`bg-gradient-to-r text-2xl font-bold ${exam.gradient} mb-2 bg-clip-text text-transparent`}
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
