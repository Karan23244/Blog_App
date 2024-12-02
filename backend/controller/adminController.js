const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "secret_key";

exports.adminLogin = (req, res) => {
  const { username, password } = req.body;
  const adminQuery = "SELECT * FROM admin WHERE username = ?";

  db.query(adminQuery, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(400).json({ error: "Invalid credentials" });

    const admin = results[0];
    if (password !== admin.password) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin.id, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ user: { id: admin.id, name: admin.name }, role: "admin", token });
  });
};

// exports.login = (req,res) =>{

// }

// exports.signup =  (req, res) => {
//     const { name, email, password } = req.body;
  
//     const hashedPassword = bcrypt.hashSync(password, 10);
  
//     const query =
//       "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//     db.query(
//       query,
//       [name, email, hashedPassword],
//       (err, result) => {
//         if (err) {
//           return res.status(500).json({ error: "Signup failed" });
//         }
//         res.json({ message: "Signup successful" });
//       }
//     );
// }