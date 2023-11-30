import React, { useState } from "react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Add validation logic here if needed

    if (formData.newPassword !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }



    try {
      const response = await fetch("http://localhost:3001/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        alert("Password update failed");
      }
    } catch (error) {
      console.error("Error during password update:", error);
      alert("Password update failed");
    }

    // Clear the form data
    setFormData({
      username: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword ;
