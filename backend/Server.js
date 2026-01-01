import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:  process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

//Aunthentication API 
// Signup API
app.post("/api/auth/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });
        res.json({ message: "Signup successful" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Login API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (result.length === 0) return res.status(400).json({ message: "Invalid email or password" });

    const user = result[0];
    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid email or password" });
    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, "healthmate_secret", { expiresIn: "1d" });
    res.json({ token, fullName: user.fullName, email: user.email });
  });
});
//auth
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "healthmate_secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


//BMI API
app.post("/api/bmi", auth, (req, res) => {
  const { bmi, category } = req.body;
  const user_id = req.user.id;

  if (!bmi || !category)
    return res.status(400).json({ message: "BMI and category are required" });

  const sql = `
    INSERT INTO bmi_records (user_id, bmi, category)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, bmi, category], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to save BMI" });
    }
    res.status(201).json({ message: "BMI saved successfully" });
  });
});

// DELETE BMI Record
app.delete("/api/bmi/:id", auth, (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM bmi_records WHERE id = ? AND user_id = ?`;

  db.query(sql, [id, req.user.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Delete failed" });
    }

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Record not found" });

    res.json({ message: "BMI record deleted successfully" });
  });
});

//Diet plan API
app.post("/api/dietplan", auth, (req, res) => {
  const user_id = req.user.id;
  const { goal, calories, protein, carbs, fats } = req.body;

  if (!goal || !calories || !protein || !carbs || !fats)
    return res.status(400).json({ message: "Missing fields" });

  const sql = `INSERT INTO diet_plans (user_id, goal, calories, protein, carbs, fats)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [user_id, goal, calories, protein, carbs, fats], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    res.json({ message: "Diet plan saved", id: result.insertId });
  });
});

// Get all diet plans for logged-in user
app.get("/api/dietplan", auth, (req, res) => {
  const user_id = req.user.id;
  const sql = "SELECT * FROM diet_plans WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });
    res.json(results);
  });
});

//Contact  API
app.post("/api/contact", (req, res) => {
  console.log("Received:", req.body); // Debug

  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const name = `${firstName} ${lastName}`;
  const query = "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";

  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("DB insert error:", err); // Log the exact DB error
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json({ message: "Message sent successfully!" });
  });
});


//Nutrition API
// Add Food Entry
app.post("/api/nutrition", auth, (req, res) => {
  const { food_name, calories, portion } = req.body;
  const user_id = req.user.id;

 const sql =
  "INSERT INTO nutrition (user_id, food_name, calories, `portion`) VALUES (?, ?, ?, ?)";


  db.query(sql, [user_id, food_name, calories, portion], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    const newFood = {
      id: result.insertId,
      user_id,
      food_name,
      calories,
      portion,
    };

    res.json(newFood);
  });
});



// Get Today's Food Entries
app.get("/api/nutrition", auth, (req, res) => {
  const query = "SELECT * FROM nutrition WHERE user_id = ? AND DATE(created_at) = CURDATE()";
  db.query(query, [req.user.id], (err, results) => {
    if (err) {
      console.error("Nutrition Fetch Error:", err);
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
});

// Delete Food Entry
app.delete("/api/nutrition/:id", auth, (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM nutrition WHERE id = ? AND user_id = ?";
  db.query(query, [id, req.user.id], (err, result) => {
    if (err) {
      console.error("Nutrition Delete Error:", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Deleted successfully" });
  });
});

//update nutrition
// PUT /api/nutrition/:id
// Update a nutrition entry
app.put("/api/nutrition/:id", auth, (req, res) => {
  const { id } = req.params;
  const { food_name, calories, portion } = req.body;

  console.log("PUT /nutrition/:id called", { id, body: req.body, user: req.user });

  if (!food_name || !calories || !portion) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const cal = parseInt(calories);
  if (isNaN(cal)) {
    return res.status(400).json({ error: "Calories must be a number" });
  }

  const sql = "UPDATE nutrition SET food_name=?, calories=?, `portion`=? WHERE id=? AND user_id=?";
  db.query(sql, [food_name, cal, portion, id, req.user.id], (err, result) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Food not found or not yours" });
    }

    res.json({ id: parseInt(id), food_name, calories: cal, portion });
  });
});



/* ============================
   Global Error Handler
============================ */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


















const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
console.log ("Connected to the backend ");
});