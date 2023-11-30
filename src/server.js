const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Install this package using npm install bcrypt

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "capstone",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});
// Sign-up route
app.post("/signup", async (req, res) => {
    console.log("hitting api");
    const { name, email, password } = req.body;
  
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Perform the database insertion
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error("Error during sign-up:", err);
        console.error("SQL Query:", sql);
        console.error("Query Parameters:", [name, email, hashedPassword]);
        res.status(500).json({ success: false, message: "Sign-up failed" });
      } else {
        console.log("Sign-up successful. Rows affected:", results.affectedRows);
        res.json({ success: true, message: "Sign-up successful" });
      }
    });
  });

// Sign-in route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let match = false; // Declare match outside of the block

  // Perform the database query
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Error during sign-in:", err);
        res.status(500).json({ success: false, message: "Sign-in failed" });
      } else {
        if (results.length > 0) {
          // Compare the provided password with the hashed password from the database
          match = await bcrypt.compare(password, results[0].password);
          if (match) {
            res.json({ success: true, message: "Sign-in successful" });
          } else {
            res.json({ success: false, message: "Incorrect password" });
          }
        } else {
          res.json({ success: false, message: "User not found" });
        }
      }
      if (!match) {
        // Do not redirect to the home page if the password is incorrect
        return;
      }
    }
  );
});

// Add this route to handle forgot password requests
// app.post("/forgotpassword", async (req, res) => {
//   const { username, newPassword, confirmPassword } = req.body;

//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({ success: false, message: "Passwords do not match" });
//   }

//   // Add validation logic here to check if newPassword and confirmPassword match

//   try {
//     // Hash the new password before updating it in the database
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     const updateSql = "UPDATE users SET password = ? WHERE username = ?";
//     db.query(updateSql, [hashedPassword, username], (err, results) => {
//       if (err) {
//         console.error("Error during password update:", err);
//         res.status(500).json({ success: false, message: "Password update failed" });
//       } else {
//         console.log("Password update successful. Rows affected:", results.affectedRows);
//         res.json({ success: true, message: "Password update successful" });
//       }
//     });
//   } catch (error) {
//     console.error("Error during password update:", error);
//     res.status(500).json({ success: false, message: "Password update failed" });
//   }
// });

// In your server.js or routes file
app.post("/forgotpassword", async (req, res) => {
  const { username, newPassword, confirmPassword } = req.body;

  // Perform validation checks
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  // Hash the new password before storing it in the database
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Implement logic to update the password in the database
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  db.query(sql, [hashedPassword, username], (err, results) => {
    if (err) {
      console.error("Error updating password:", err);
      return res.status(500).json({ success: false, message: "Password update failed" });
    }

    // Check if any rows were affected (username exists)
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Respond with success
    res.json({ success: true, message: "Password updated successfully" });
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
