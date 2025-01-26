import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import LoginButton from "./login";
import Profile from './profile';
import LogoutButton from './logout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
    <div className="App">
      <div className="title">
        StudySesh
      </div>
      <LoginButton />
      <LogoutButton />
      <div className="three-columns">
        <div className="column">Column 1</div>
        <div className="column">Column 2</div>
        <div className="column">Column 3</div>
      </div>
      <Profile />
    </div>
  );
}

export default App;
