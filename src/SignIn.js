// import React from "react";
// import { useNavigate } from "react-router-dom";

// function SignInForm() {
//   const navigate = useNavigate();

//   const [state, setState] = React.useState({
//     email: "",
//     password: ""

//   });

//   const[showPassword,setShowPassword] = React.useState(false);

//   const handleChange = (evt) => {
//     const value = evt.target.value;
//     setState({
//       ...state,
//       [evt.target.name]: value
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword)=> !prevShowPassword);
//   };

//   const handleOnSubmit = async (evt) => {
//     evt.preventDefault();

//     const { email, password } = state;

//     try {
//       const response = await fetch("http://localhost:3001/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message);

//         if(result.success){
//           // Navigate to the home page upon successful sign-in
//           navigate("/home");
//         }

        
//       } else {
//         alert("Sign-in failed");
//       }
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       alert("Sign-in failed");
//     }

//     // Clear the input values
//     setState({
//       ...state,
//       email: "",
//       password: ""
//     });
//   };

//   return (
//     <div className="form-container sign-in-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Sign in</h1>
//         <div className="social-container">
//           <a href="#" className="social">
//             <i className="fab fa-facebook-f" />
//           </a>
//           <a href="#" className="social">
//             <i className="fab fa-google-plus-g" />
//           </a>
//           <a href="#" className="social">
//             <i className="fab fa-linkedin-in" />
//           </a>
//         </div>
//         <span>or use your account</span>
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//         />
       
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={state.password}
//             onChange={handleChange}
//           />
//           <i
//             className={`password-toggle-icon ${
//               showPassword ? "fas fa-eye" : "fas fa-eye-slash" 
//             }`}
//             onClick={togglePasswordVisibility}
//           />
          
       
//         <a href="#">Forgot your password?</a>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }
// export default SignInForm;


import React from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await fetch("http://localhost:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);

        if (result.success) {
          // Navigate to the home page upon successful sign-in
          navigate("/home");
        }
      } else {
        alert("Sign-in failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed");
    }

    // Clear the input values
    setState({
      ...state,
      email: "",
      password: ""
    });
  };

  const handleForgotPassword = (evt) => {
    evt.preventDefault();
    // Navigate to the forgot password page
    navigate("/forgotpassword");
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <i
          className={`password-toggle-icon ${
            showPassword ? "fas fa-eye" : "fas fa-eye-slash"
          }`}
          onClick={togglePasswordVisibility}
        />

        <a href="#" onClick={handleForgotPassword}>
          Forgot your password?
        </a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
