import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import YearAndSetSelector from "./components/YearAndSetSelector";
import Writing from "./components/Writing/Writing";
import ListeningComprehension from "./components/ListeningComprehension/ListeningComprehension";
import ReadingComprehension from "./components/ReadingComprehension/ReadingComprehension";
import Translation from "./components/Translation/Translation";

function App() {
  const [basePath, setBasePath] = useState("");

  const handleSelect = (path) => {
    setBasePath(path);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/cet4"
          element={<YearAndSetSelector onSelect={handleSelect} />}
        />
        {/* 在这里可以添加更多路由 */}
      </Routes>
      {/* 当basePath被设置后，显示以下组件 */}
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
