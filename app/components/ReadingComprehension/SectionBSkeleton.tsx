const SectionBSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-64 mb-4"></div>

      <div className="space-y-4 mb-6">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="border-b pb-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionBSkeleton;
