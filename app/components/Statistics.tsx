export default function Statistics() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div className="text-center group">
            <div className="inline-block p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                30+
              </div>
              <div className="text-gray-600 font-medium">历年真题</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="inline-block p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                AI
              </div>
              <div className="text-gray-600 font-medium">智能评分</div>
            </div>
          </div>
          <div className="text-center group">
            <div className="inline-block p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                4
              </div>
              <div className="text-gray-600 font-medium">题型练习</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
