
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Home from './Home';
import Bengin from './Bengin';
import Malignant from './Malignant';
import Normal from './Normal';
import First from './First';

import SignInSignUp from './SignInSignUp';



export default function App() {
 
  return (
    <Router>
     

      <div className="App">
     

        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bengin" element={<Bengin />} />
          <Route path="/malignant" element={<Malignant />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/first" element={<First />} />


        </Routes>
      </div>
    </Router>
  );
}

