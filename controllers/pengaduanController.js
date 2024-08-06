const pengaduanModel = require("../models/pengaduanModel");

const createPengaduan = async (req, res) => {
  const data = req.body;
  try {
    const id = await pengaduanModel.createPengaduan(data);
    res.status(201).json({ id, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPengaduan = async (req, res) => {
  try {
    const results = await pengaduanModel.getAllPengaduan();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPengaduanByMasyarakatId = async (req, res) => {
  const { masyarakat_id } = req.params;
  try {
    const results = await pengaduanModel.getPengaduanByMasyarakatId(
      masyarakat_id
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePengaduan = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const affectedRows = await pengaduanModel.updatePengaduan(id, data);
    res.json({
      message: "Pengaduan updated",
      affectedRows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePengaduan = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await pengaduanModel.deletePengaduan(id);
    res.json({
      message: "Pengaduan deleted",
      affectedRows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPengaduan,
  getAllPengaduan,
  getPengaduanByMasyarakatId,
  updatePengaduan,
  deletePengaduan,
};
