import React from 'react';
import LoginButton from "./login";
import Profile from './profile';
import LogoutButton from './logout';
import './App.css';

function App() {
  return (
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
