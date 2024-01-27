import React, { useState } from "react";
import Writing from "./components/Writing/Writing";
import ListeningComprehension from "./components/ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./components/ReadingComprehension/ReadingComprehension";
import Translation from "./components/Translation/Translation";
import YearAndSetSelector from "./components/YearAndSetSelector";
// import ContactForm from "./pages/ContactForm";

function App() {
  const [basePath, setBasePath] = useState("");

  const handleSelect = (path) => {
    setBasePath(path);
  };
  return (
    <>
    {/* <ContactForm /> */}
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
