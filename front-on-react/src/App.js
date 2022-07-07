import React from "react";

import { Routes, Route
} from "react-router-dom";


import MainContent from './MainContent';



function App() {
  return (
    <Routes>
        <Route exact path="/" element={<MainContent/>} />
    </Routes>
  );
}

export default App;
