export default function Features() {
  const features = [
    {
      title: "真题练习",
      description: "收录历年四六级考试真题,帮助你熟悉考试题型和难度",
      icon: "📚",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "AI 评分",
      description: "智能评分系统,为你的写作和翻译提供专业评价",
      icon: "🤖",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "专项训练",
      description: "针对听说读写译各项技能提供专门的练习",
      icon: "🎯",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "成绩分析",
      description: "详细的答题分析和进步追踪",
      icon: "📊",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-3xl text-transparent">
            特色功能
          </h2>
          <p className="mt-4 text-gray-600 text-xl">
            为你的四六级备考提供全方位支持
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              className="group relative rounded-xl border border-gray-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
              key={feature.title}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              />
              <div className="relative">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
