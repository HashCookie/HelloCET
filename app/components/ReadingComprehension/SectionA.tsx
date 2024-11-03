interface SectionAProps {
  passages: string[];
  options: Record<string, string>;
}

const SectionA = ({ passages, options }: SectionAProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Section A</h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        <span className="font-semibold">Directions:</span> In this section,
        there is a passage with ten blanks. You are required to select one word
        for each blank from a list of choices given in a word bank following the
        passage. Read the passage through carefully before making your choices.
        Each choice in the bank is identified by a letter. Please mark the
        corresponding letter for each item on Answer Sheet 2 with a single line
        through the centre. You may not use any of the words in the bank more
        than once.
      </h3>
      <h3 className="text-sm text-gray-600 mb-4 text-left">
        Questions 26 to 35 are based on the following passage.
      </h3>
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
