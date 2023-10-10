import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TechRoundTask from "./tech-round-task";
import PageNotFound from "./page-not-found";

import "bootstrap/dist/css/bootstrap.css";

// import "../src/style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<TechRoundTask></TechRoundTask>}></Route>


        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;