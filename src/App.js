// src/App.js

import React from 'react';
import Header from './components/header';
import Main from './components/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Make sure to import your custom styles
import './App.css';

function App() {
  return (
    <>
      <div>
        <Header />
      </div>

      <div>
        <Main />
      </div>
    </>
  );
}

export default App;
