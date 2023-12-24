
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import Home from './Home';
import Bengin from './Bengin';
import Malignant from './Malignant';
import Normal from './Normal';
import First from './First';
import SignInSignUp from './SignInSignUp';
import ForgotPassword from './ForgotPassword';
import Infobengin from './Infobengin';



export default function App() {
 
  return (
    <Router>
     

      <div className="App">
     

        <Routes>
          <Route path="/signin-signup" element={<SignInSignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bengin" element={<Bengin />} />
          <Route path="/malignant" element={<Malignant />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/" element={<First />} />
          <Route path = "/forgotpassword" element={<ForgotPassword/>}/>
          <Route path = "/infobengin" element={<Infobengin/>}/>
        </Routes>
      </div>
    </Router>
  );
}

