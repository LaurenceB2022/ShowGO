import './App.css';
import 'C:/Users/XSapp/Desktop/react-workspace/showgo-management/src/index.css';
import React, {useState} from 'react';
import NavBar from './Components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Routers from './Components/Routers';

function App() {

  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <>
          <Routers />
        </>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
