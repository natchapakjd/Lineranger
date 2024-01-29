const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  db.query(
    "SELECT * FROM member WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      const user = results[0];

      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
          { username: user.username, role: user.role, balance:user.balance},
          "your-secret-key",
          { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
      } catch (hashingError) {
        console.error("Hashing error:", hashingError);
        return res.status(500).json({ error: "Hashing error" });
      }
    }
  );
});


router.post("/register", async (req, res) => {
    const { username, password, pin } = req.body;
    console.log(req.body)
  
    db.query(
      "SELECT * FROM member WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ error: "Database error" });
        }
  
        if (results.length > 0) {
          return res.status(400).json({ error: "User already exists" });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
  
        // Insert the user into the database
        db.query(
          "INSERT INTO member SET ?",
          { username: username,role : "member", password: hashedPassword, balance: 0,pin : pin},
          (error, results) => {
            if (error) {
              console.error("Database error:", error);
              return res.status(500).json({ error: "Database error" , results});
            }
            console.log("User registered:", results);
            res.json({ message: "User registered" }); 
          }
        );
      }
    );
  });

module.exports = router;