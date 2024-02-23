import React, { useState } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './index.css'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
               <Route path='/'element={<Home/>}/> 
                <Route path='/dashboard' element={<Dashboard />} /> 
                    <Route path='/landing' element={<Landing />} /> 
            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
