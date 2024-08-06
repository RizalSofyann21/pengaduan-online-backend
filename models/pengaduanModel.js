const db = require('../config/db');

const createPengaduan = async (pengaduan) => {
  const [result] = await db.query('INSERT INTO pengaduan SET ?', pengaduan);
  return result.insertId;
};

const getAllPengaduan = async () => {
  const [results] = await db.query('SELECT * FROM pengaduan');
  return results;
};

const getPengaduanByMasyarakatId = async (masyarakat_id) => {
  const [results] = await db.query('SELECT * FROM pengaduan WHERE masyarakat_id = ?', [masyarakat_id]);
  return results;
};

const updatePengaduan = async (id, data) => {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = Object.values(data);
  values.push(id);

  const [result] = await db.query(`UPDATE pengaduan SET ${fields} WHERE id = ?`, values);
  return result.affectedRows;
};

const deletePengaduan = async (id) => {
  const [result] = await db.query('DELETE FROM pengaduan WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  createPengaduan,
  getAllPengaduan,
  getPengaduanByMasyarakatId,
  updatePengaduan,
  deletePengaduan,
};
