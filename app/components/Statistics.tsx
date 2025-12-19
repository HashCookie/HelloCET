export default function Statistics() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div className="group text-center">
            <div className="inline-block rounded-2xl border border-gray-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-5xl text-transparent">
                30+
              </div>
              <div className="font-medium text-gray-600">历年真题</div>
            </div>
          </div>
          <div className="group text-center">
            <div className="inline-block rounded-2xl border border-gray-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text font-bold text-5xl text-transparent">
                AI
              </div>
              <div className="font-medium text-gray-600">智能评分</div>
            </div>
          </div>
          <div className="group text-center">
            <div className="inline-block rounded-2xl border border-gray-100 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-5xl text-transparent">
                4
              </div>
              <div className="font-medium text-gray-600">题型练习</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
