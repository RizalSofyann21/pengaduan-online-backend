const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findAdminByEmail } = require("../models/adminModel");

const secretKey = "kunci_rahasia_anda";

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await findAdminByEmail(email);
    if (!admin) {
      console.log("Admin not found with email:", email);
      return res
        .status(401)
        .json({ success: false, message: "Email atau password tidak valid" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Password does not match for email:", email);
      return res
        .status(401)
        .json({ success: false, message: "Email atau password tidak valid" });
    }

    const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Kesalahan server" });
  }
}

module.exports = { login };
