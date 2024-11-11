const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"></div>
      <span className="ml-2 text-gray-600">加载中...</span>
    </div>
  );
};

export default LoadingSpinner;
