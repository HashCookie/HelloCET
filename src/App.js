import React, { useState } from 'react';
import Writing from './components/Writing/Writing';
import ListeningComprehension from './components/ListeningComprehension/ListeningComprehension';
import ReadingComprehension from './components/ReadingComprehension/ReadingComprehension';
import Translation from './components/Translation/Translation';
import YearAndSetSelector from './components/YearAndSetSelector';

function App() {
  const [basePath, setBasePath] = useState('');

  const handleSelect = (path) => {
    setBasePath(path);
  };

  return (
    <>
      <YearAndSetSelector onSelect={handleSelect} />
      {basePath && (
        <>
          <Writing basePath={basePath} />
          <ListeningComprehension basePath={basePath} />
          <ReadingComprehension basePath={basePath} />
          <Translation basePath={basePath} />
        </>
      )}
    </>
  );
}

export default App;
