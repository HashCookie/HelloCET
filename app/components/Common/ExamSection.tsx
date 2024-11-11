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
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ExamSection;
