import React from 'react';
import Class from './screens/Class';

import Home from "./screens/Home";
import Dashboard from './screens/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/dashboard" element={<Dashboard />}>
          </Route>
        <Route exact path="/class/:id" element={<Class />}>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
