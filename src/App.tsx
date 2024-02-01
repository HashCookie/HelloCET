import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import YearAndSetSelector from "./components/YearAndSetSelector";
import Writing from "./components/Writing/Writing";
import ListeningComprehension from "./components/ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./components/ReadingComprehension/ReadingComprehension";
import Translation from "./components/Translation/Translation";
import ContactForm from "./pages/ContactForm";

function App() {
  const [basePath, setBasePath] = useState("");

  const handleSelect = (path: string) => {
    console.log("Selected basePath:", path);
    setBasePath(path);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/cet4"
          element={
            <YearAndSetSelector onSelect={handleSelect} testType="CET4" />
          }
        />
        <Route
          path="/cet6"
          element={
            <YearAndSetSelector onSelect={handleSelect} testType="CET6" />
          }
        />
        <Route path="/feedback" element={<ContactForm />} />
      </Routes>
      {basePath && (
        <>
          <Writing basePath={basePath} />
          <ListeningComprehension basePath={basePath} />
          <ReadingComprehension basePath={basePath} />
          <Translation basePath={basePath} />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
