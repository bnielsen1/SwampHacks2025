import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
