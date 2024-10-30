const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-2 text-gray-600">加载中...</span>
    </div>
  );
};

export default LoadingSpinner;
