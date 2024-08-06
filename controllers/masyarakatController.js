const masyarakatModel = require("../models/masyarakatModel");

const createMasyarakat = async (req, res) => {
  const data = req.body;
  try {
    const result = await masyarakatModel.createMasyarakat(data);
    res.status(201).json({ id: result.insertId, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllMasyarakat = async (req, res) => {
  try {
    const results = await masyarakatModel.getAllMasyarakat();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMasyarakat = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await masyarakatModel.updateMasyarakat(id, data);
    res.json({
      message: "Masyarakat updated",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMasyarakat = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await masyarakatModel.deleteMasyarakat(id);
    res.json({
      message: "Masyarakat deleted",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMasyarakat,
  getAllMasyarakat,
  updateMasyarakat,
  deleteMasyarakat,
};
