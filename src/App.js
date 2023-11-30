
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './styles.css';
// import SignInForm from './SignIn';
// import SignUpForm from './SignUp';
// import Home from './Home';
// import Bengin from './Bengin';
// import Malignant from './Malignant';
// import Normal from './Normal';
// import ForgotPassword from "./ForgotPassword";


// export default function App() {
//   const [type, setType] = useState('signIn');

//   const handleOnClick = (text) => {
//     setType(text);
//   };

//   const containerClass = 'container ' + (type === 'signUp' ? 'right-panel-active' : '');

//   return (
//     <Router>
//       <div className="App">
//         <h2>Sign in/up Form</h2>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div className={containerClass} id="container">
//                 <SignUpForm />
//                 <SignInForm />
//                 <div className="overlay-container">
//                   <div className="overlay">
//                     <div className="overlay-panel overlay-left">
//                       <h1>Welcome Back!</h1>
//                       <p>
//                         To keep connected with us please login with your personal info
//                       </p>
//                       <button
//                         className="ghost"
//                         id="signIn"
//                         onClick={() => handleOnClick('signIn')}
//                       >
//                         Sign In
//                       </button>
//                     </div>
//                     <div className="overlay-panel overlay-right">
//                       <h1>Hello, Friend!</h1>
//                       <p>Enter your personal details and start the journey with us</p>
//                       <button
//                         className="ghost "
//                         id="signUp"
//                         onClick={() => handleOnClick('signUp')}
//                       >
//                         Sign Up
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             }
//           />
//           <Route path="/home" element={<Home />} />
//           <Route path="/bengin" element={<Bengin />} />
//           <Route path="/malignant" element={<Malignant />} />
//           <Route path="/normal" element={<Normal />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import SignInForm from './SignIn';
import SignUpForm from './SignUp';
import Home from './Home';
import Bengin from './Bengin';
import Malignant from './Malignant';
import Normal from './Normal';
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component

export default function App() {
  const [type, setType] = useState('signIn');

  const handleOnClick = (text) => {
    setType(text);
  };

  const containerClass = 'container ' + (type === 'signUp' ? 'right-panel-active' : '');

  return (
    <Router>
      <div className="App">
        <h2>Sign in/up Form</h2>
        <Routes>
          <Route
            path="/"
            element={
              <div className={containerClass} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-left">
                      <h1>Welcome Back!</h1>
                      <p>
                        To keep connected with us please login with your personal info
                      </p>
                      <button
                        className="ghost"
                        id="signIn"
                        onClick={() => handleOnClick('signIn')}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                      <h1>Hello, Friend!</h1>
                      <p>Enter your personal details and start the journey with us</p>
                      <button
                        className="ghost "
                        id="signUp"
                        onClick={() => handleOnClick('signUp')}
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/bengin" element={<Bengin />} />
          <Route path="/malignant" element={<Malignant />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} /> {/* Include ForgotPassword route */}
        </Routes>
      </div>
    </Router>
  );
}
