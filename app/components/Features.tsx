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
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-white" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            特色功能
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            为你的四六级备考提供全方位支持
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
              />
              <div className="relative">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
