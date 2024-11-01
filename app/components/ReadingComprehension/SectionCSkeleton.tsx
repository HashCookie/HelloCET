const SectionCSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>

      {/* Passage One */}
      <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-96 mb-4"></div>

      <div className="mb-8">
        {/* 文章段落占位符 */}
        <div className="space-y-4 mb-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>

        {/* 问题占位符 */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="border-b pb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((optionIndex) => (
                  <div key={optionIndex} className="flex items-start space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Passage Two - 结构与 Passage One 相同 */}
      <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-96 mb-4"></div>

      <div className="mb-8">
        <div className="space-y-4 mb-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="border-b pb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((optionIndex) => (
                  <div key={optionIndex} className="flex items-start space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCSkeleton;
