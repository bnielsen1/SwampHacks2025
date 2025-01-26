import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import CourseSearch from './components/CourseSearch/CourseSearch';
import LibrarySearch from './components/LibrarySearch/LibrarySearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/course-search" element={<CourseSearch/>}/>
          <Route path="/library-search" element={<LibrarySearch/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
