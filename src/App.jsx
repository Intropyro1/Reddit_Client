import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigate from "./NavigationComponent/Navigate.jsx";

import "./App.css";
import Home from "./HomeComponent/Home.jsx";
import About from "./AboutComponent/About.jsx";

function App() {
  return (
    <>
      <Router>
        <Navigate />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
