import LoadingSpinner from "./LoadingSpinner";

interface ExamSectionProps {
  title: string;
  isLoading: boolean;
  children: React.ReactNode;
}

const ExamSection = ({ title, isLoading, children }: ExamSectionProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ExamSection;
