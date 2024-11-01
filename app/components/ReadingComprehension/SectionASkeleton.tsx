const SectionASkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-4 mb-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="h-4 bg-gray-200 rounded w-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionASkeleton;
