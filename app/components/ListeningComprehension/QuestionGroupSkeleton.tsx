const QuestionGroupSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

      <div className="space-y-8">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border-b pb-6">
            <div className="h-4 bg-gray-200 rounded w-8 mb-4"></div>

            <div className="space-y-3">
              {[1, 2, 3, 4].map((optionIndex) => (
                <div key={optionIndex} className="flex items-start space-x-4">
                  <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroupSkeleton;
