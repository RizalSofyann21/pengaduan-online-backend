const express = require("express");
const router = express.Router();
const db = require("../config/db");
const pool = require("../config/db");

async function findAdminByEmail(email) {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM admin WHERE email = ?AND password = ?",
    [email, password]
  );
  connection.release();
  return rows[0];
}

// async function createAdmin(email, hashedPassword) {
//   const connection = await pool.getConnection();
//   await connection.execute('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hashedPassword]);
//   connection.release();
// }

module.exports = { findAdminByEmail };
