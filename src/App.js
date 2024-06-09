import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponent from './Components/FormComponent';
import DetailsComponent from './Components/DetailsComponent';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/details" element={<DetailsComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
