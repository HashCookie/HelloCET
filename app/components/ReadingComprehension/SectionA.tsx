interface SectionAProps {
  passages: string[];
  options: Record<string, string>;
}

const SectionA = ({ passages, options }: SectionAProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section A</h3>
      <div className="space-y-4 mb-6 text-left">
        {passages.map((passage, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {passage}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="flex items-start space-x-2">
            <span className="font-semibold">{key}.</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionA;
