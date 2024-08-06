const express = require("express");
const router = express.Router();
const db = require("../config/db");

const createMasyarakat = async (data) => {
  const sql = "INSERT INTO masyarakat (nama, nik, alamat, no_telp, email, password) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    const [results] = await db.query(sql, [data.nama, data.nik, data.alamat, data.no_telp, data.email, data.password]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAllMasyarakat = async () => {
  const sql = "SELECT * FROM masyarakat";
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (error) {
    throw error;
  }
};

const updateMasyarakat = async (id, data) => {
  let fields = [];
  let values = [];

  if (data.nama) {
    fields.push("nama = ?");
    values.push(data.nama);
  }
  if (data.nik) {
    fields.push("nik = ?");
    values.push(data.nik);
  }
  if (data.alamat) {
    fields.push("alamat = ?");
    values.push(data.alamat);
  }
  if (data.no_telp) {
    fields.push("no_telp = ?");
    values.push(data.no_telp);
  }
  if (data.email) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.password) {
    fields.push("password = ?");
    values.push(data.password);
  }

  // Add the id at the end of the values array
  values.push(id);

  const sql = `UPDATE masyarakat SET ${fields.join(", ")} WHERE id = ?`;
  try {
    const [results] = await db.query(sql, values);
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteMasyarakat = async (id) => {
  const sql = "DELETE FROM masyarakat WHERE id = ?";
  try {
    const [results] = await db.query(sql, [id]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMasyarakat,
  getAllMasyarakat,
  updateMasyarakat,
  deleteMasyarakat,
};
